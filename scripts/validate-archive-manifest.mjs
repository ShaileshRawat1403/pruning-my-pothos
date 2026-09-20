/**
 * Archive Disposition Manifest validator.
 *
 * The manifest is the structural execution authority for the Systems archive
 * migration: it records, per source page, whether the page survives, where it
 * goes, and where its old URL should point. This script proves the file is
 * internally consistent before anything irreversible is done with it.
 *
 * Two kinds of redirect target, validated two different ways:
 *   systems-slug  semantically, against a surviving manifest entry
 *   path          physically, against a route present in the built out/ tree
 *
 * Totals are recomputed rather than compared against expected constants, so
 * this validator stays correct as structural work changes the counts.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, "docs", "ARCHIVE_DISPOSITION_MANIFEST.json");
const OUT = path.join(ROOT, "out");

const REDIRECT_STATUSES = ["not-applicable", "resolved", "none", "pending"];
const TARGET_TYPES = ["systems-slug", "path"];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const failures = [];
const notes = [];
const fail = (msg) => failures.push(msg);

function recount(entries, field) {
  const counts = {};
  for (const e of entries) counts[e[field]] = (counts[e[field]] || 0) + 1;
  return counts;
}

function compareTotals(label, declared, recomputed) {
  const keys = new Set([...Object.keys(declared || {}), ...Object.keys(recomputed)]);
  for (const k of keys) {
    const d = (declared || {})[k] ?? 0;
    const r = recomputed[k] ?? 0;
    if (d !== r) fail(`${label}: declared ${k}=${d} but entries contain ${r}`);
  }
}

async function routeExists(target) {
  // "/shelf/local-experiments/" -> out/shelf/local-experiments/index.html
  const rel = target.replace(/^\/+/, "").replace(/\/+$/, "");
  const candidates = rel
    ? [path.join(OUT, rel, "index.html"), path.join(OUT, `${rel}.html`)]
    : [path.join(OUT, "index.html")];
  for (const c of candidates) {
    try {
      await fs.access(c);
      return c;
    } catch {
      /* try next */
    }
  }
  return null;
}

async function main() {
  let manifest;
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch (e) {
    console.error(`Cannot read or parse ${path.relative(ROOT, MANIFEST)}: ${e.message}`);
    process.exit(1);
  }

  const entries = manifest.entries || [];
  const bySlug = new Map();

  // ── structural integrity ──────────────────────────────────────────────────
  if (manifest.sourceCount !== entries.length) {
    fail(`sourceCount is ${manifest.sourceCount} but there are ${entries.length} entries`);
  }
  for (const e of entries) {
    if (bySlug.has(e.slug)) fail(`duplicate slug: ${e.slug}`);
    bySlug.set(e.slug, e);
  }

  compareTotals("dispositionTotals", manifest.dispositionTotals, recount(entries, "disposition"));
  compareTotals("statusTotals", manifest.statusTotals, recount(entries, "status"));
  compareTotals("redirectStatusTotals", manifest.redirectStatusTotals, recount(entries, "redirectStatus"));

  // ── per-entry redirect contract ───────────────────────────────────────────
  const pathTargets = [];

  for (const e of entries) {
    const { slug, redirectStatus: rs, redirect, redirectTargetType: tt, keepUrl } = e;

    if (!REDIRECT_STATUSES.includes(rs)) {
      fail(`${slug}: redirectStatus "${rs}" is not one of ${REDIRECT_STATUSES.join(", ")}`);
      continue;
    }

    if (rs === "resolved") {
      if (keepUrl !== false) fail(`${slug}: resolved requires keepUrl:false`);
      if (!redirect) fail(`${slug}: resolved requires a non-null redirect`);
      if (!TARGET_TYPES.includes(tt)) {
        fail(`${slug}: resolved requires redirectTargetType to be one of ${TARGET_TYPES.join(", ")}`);
        continue;
      }

      if (tt === "systems-slug") {
        if (!SLUG_RE.test(redirect)) {
          fail(`${slug}: systems-slug target "${redirect}" is not a valid slug`);
          continue;
        }
        const dest = bySlug.get(redirect);
        if (!dest) {
          fail(`${slug}: systems-slug target "${redirect}" is not a manifest entry`);
        } else if (dest.keepUrl !== true) {
          // A redirect into a page that is itself leaving is a chain, or worse
          // a future 404. This is the invariant the whole file exists to hold.
          fail(`${slug}: redirects to "${redirect}", which does not keep its URL`);
        }
      } else {
        if (!redirect.startsWith("/")) fail(`${slug}: path target "${redirect}" must start with "/"`);
        if (/[?#]/.test(redirect)) fail(`${slug}: path target "${redirect}" must not contain a query or fragment`);
        if (redirect.includes("..")) fail(`${slug}: path target "${redirect}" must not contain ".."`);
        pathTargets.push([slug, redirect]);
      }
    } else {
      // not-applicable | none | pending all carry no destination.
      if (redirect !== null) fail(`${slug}: ${rs} requires redirect:null`);
      if (tt !== null && tt !== undefined) fail(`${slug}: ${rs} requires redirectTargetType:null`);
      if (rs === "not-applicable" && keepUrl !== true) fail(`${slug}: not-applicable requires keepUrl:true`);
      if (rs === "none" && keepUrl !== false) fail(`${slug}: none requires keepUrl:false`);
      if (rs === "pending") {
        if (keepUrl !== false) fail(`${slug}: pending requires keepUrl:false`);
        if (e.status !== "structural-pending") fail(`${slug}: pending requires status:structural-pending`);
      }
    }

    if (keepUrl === true && redirect) fail(`${slug}: keeps its URL but declares a redirect`);
  }

  // ── chains and cycles ─────────────────────────────────────────────────────
  // A surviving destination terminates the walk. Anything else is a chain.
  for (const e of entries) {
    if (e.redirectTargetType !== "systems-slug") continue;
    const seen = [e.slug];
    let cur = e.redirect;
    while (cur) {
      if (seen.includes(cur)) {
        fail(`redirect cycle: ${[...seen, cur].join(" -> ")}`);
        break;
      }
      seen.push(cur);
      const next = bySlug.get(cur);
      if (!next || next.keepUrl === true) break;
      if (next.redirectTargetType !== "systems-slug") break;
      fail(`redirect chain: ${[...seen, next.redirect].join(" -> ")}`);
      cur = next.redirect;
    }
  }

  // ── path targets, proven against the build ────────────────────────────────
  if (pathTargets.length > 0) {
    let built = true;
    try {
      await fs.access(OUT);
    } catch {
      built = false;
    }
    if (!built) {
      fail(
        `${pathTargets.length} redirect(s) target a site path, but out/ does not exist. ` +
          `Run "npm run build" first so path targets can be verified against real routes.`
      );
    } else {
      for (const [slug, target] of pathTargets) {
        const hit = await routeExists(target);
        if (hit) notes.push(`${slug} -> ${target} resolves to ${path.relative(ROOT, hit)}`);
        else fail(`${slug}: path target "${target}" has no built route under out/`);
      }
    }
  }

  // ── report ────────────────────────────────────────────────────────────────
  const label = `${entries.length} entries, schema ${manifest.schemaVersion}`;
  if (failures.length > 0) {
    console.error(`\n✗ Archive manifest validation FAILED (${label})\n`);
    for (const f of failures) console.error(`  - ${f}`);
    console.error("");
    process.exit(1);
  }
  console.log(`\n✓ Archive manifest valid (${label})`);
  for (const n of notes) console.log(`  ${n}`);
  const counts = recount(entries, "redirectStatus");
  console.log(
    `  redirects: ${counts.resolved || 0} resolved, ${counts["not-applicable"] || 0} not-applicable, ` +
      `${counts.none || 0} none, ${counts.pending || 0} pending\n`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
