/**
 * Archive Disposition Manifest validator.
 *
 * The manifest is the structural execution authority for the Systems archive
 * migration: it records, per source page, whether the page survives, where it
 * goes, and where its old URL should point. This script proves the file is
 * internally consistent before anything irreversible is done with it.
 *
 * Five layers are checked:
 *   1. the manifest itself       internally consistent, no chains, no cycles
 *   2. public/.htaccess          implements exactly what the manifest intends
 *   3. surviving repository refs no content still links to an exiting URL
 *   4. source files on disk      survivors present, retired sources absent
 *   5. built output              survivor routes present, retired routes gone,
 *                                sitemap correct, no rendered link to an exit
 *
 * Layers 4 and 5 key off `status`, not off a hardcoded end state: an exiting
 * entry may legitimately still have its source while it is structural-pending.
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
const HTACCESS = path.join(ROOT, "public", ".htaccess");
const OUT_HTACCESS = path.join(OUT, ".htaccess");
const BEGIN = "# BEGIN PMP ARCHIVE REDIRECTS";
const END = "# END PMP ARCHIVE REDIRECTS";
// Where user-facing content lives. .htaccess is excluded deliberately: its
// rule patterns name exiting URLs by design, which is the opposite of a defect.
const CONTENT_ROOTS = ["src"];
const SYSTEMS_DIR = path.join(ROOT, "src", "content", "systems");
const SITEMAP = path.join(OUT, "sitemap.xml");

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

function resolvedForReadiness(entries) {
  return entries.filter((e) => e.redirectStatus === "resolved");
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

  // ── layer 2: public/.htaccess implements the manifest ────────────────────
  const resolved = entries
    .filter((e) => e.redirectStatus === "resolved")
    .sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  const expected = resolved.map((e) => {
    const dest = e.redirectTargetType === "systems-slug" ? `/systems/${e.redirect}/` : e.redirect;
    return `RewriteRule ^systems/${e.slug}/?$ ${dest} [R=301,L]`;
  });

  let htaccess = null;
  try {
    htaccess = await fs.readFile(HTACCESS, "utf8");
  } catch {
    fail(`cannot read ${path.relative(ROOT, HTACCESS)}`);
  }

  if (htaccess !== null) {
    const begins = htaccess.split(BEGIN).length - 1;
    const ends = htaccess.split(END).length - 1;
    if (begins !== 1 || ends !== 1) {
      fail(`managed block markers must appear exactly once each (found ${begins} BEGIN, ${ends} END)`);
    } else {
      const block = htaccess.split(BEGIN)[1].split(END)[0];
      const actual = block.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("RewriteRule"));

      if (actual.length !== expected.length) {
        fail(`managed block has ${actual.length} rules, manifest expects ${expected.length}`);
      }
      const seen = new Set();
      for (const line of actual) {
        const m = line.match(/^RewriteRule \^systems\/([a-z0-9-]+)\/\?\$/);
        if (!m) {
          fail(`managed rule is not a recognised archive redirect: ${line}`);
          continue;
        }
        if (seen.has(m[1])) fail(`duplicate managed rule for source slug: ${m[1]}`);
        seen.add(m[1]);
        const entry = bySlug.get(m[1]);
        if (!entry) fail(`managed rule for "${m[1]}", which is not a manifest entry`);
        else if (entry.redirectStatus !== "resolved") {
          fail(`managed rule for "${m[1]}", whose redirectStatus is "${entry.redirectStatus}" and must have no rule`);
        }
      }
      for (const e of resolved) {
        if (!seen.has(e.slug)) fail(`no managed rule for resolved redirect: ${e.slug}`);
      }
      // Exact line-for-line comparison catches wrong destinations and bad order.
      for (let i = 0; i < Math.max(actual.length, expected.length); i++) {
        if (actual[i] !== expected[i]) {
          fail(`managed block line ${i + 1} differs from manifest\n      expected: ${expected[i] ?? "(none)"}\n      actual:   ${actual[i] ?? "(none)"}`);
          break;
        }
      }
    }

    // Whole-file safety: no rule anywhere may land on a page that is leaving.
    for (const line of htaccess.split("\n")) {
      const t = line.trim();
      if (t.startsWith("#") || !t.startsWith("RewriteRule")) continue;
      const m = t.match(/\s\/systems\/([a-z0-9-]+)\/\s/);
      if (!m) continue;
      const dest = bySlug.get(m[1]);
      if (dest && dest.keepUrl === false) {
        fail(`.htaccess rule targets an exiting page: ${t}`);
      }
    }
  }

  // ── layer 2b: the deploy artifact carries the redirect map ────────────────
  try {
    await fs.access(OUT);
    const a = await fs.readFile(HTACCESS, "utf8");
    let b;
    try {
      b = await fs.readFile(OUT_HTACCESS, "utf8");
    } catch {
      fail(`out/.htaccess is missing; the build did not carry the redirect map into the deploy artifact`);
    }
    if (b !== undefined && a !== b) {
      fail(`out/.htaccess differs from public/.htaccess; rebuild before deploying`);
    }
  } catch {
    /* out/ absence already reported by the path-target check when relevant */
  }

  // ── layer 3: no surviving content links to an exiting URL ─────────────────
  const exiting = new Set(entries.filter((e) => e.keepUrl === false).map((e) => e.slug));
  const stale = [];
  async function walk(dir) {
    let items;
    try {
      items = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const it of items) {
      const full = path.join(dir, it.name);
      if (it.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!/\.(mdx?|tsx?|jsx?|json)$/.test(it.name)) continue;
      const rel = path.relative(ROOT, full);
      // A retiring page linking to another retiring page is not a defect:
      // both disappear together in the same operation.
      const base = it.name.replace(/\.[^.]+$/, "");
      if (rel.startsWith(path.join("src", "content", "systems")) && exiting.has(base)) continue;
      const text = await fs.readFile(full, "utf8");
      text.split("\n").forEach((line, i) => {
        // Trailing slash is optional: trailingSlash:true normalises at build
        // time, so a source href without one still resolves to the same route.
        const re = /\/systems\/([a-z0-9-]+)(?:\/|(?=["'`\s)\]]))/g;
        let m;
        while ((m = re.exec(line)) !== null) {
          if (exiting.has(m[1])) stale.push(`${rel}:${i + 1} links to exiting /systems/${m[1]}/`);
        }
      });
    }
  }
  for (const root of CONTENT_ROOTS) await walk(path.join(ROOT, root));
  for (const s of stale) fail(s);

  // ── layer 4: source files on disk match the manifest ─────────────────────
  let onDisk = [];
  try {
    onDisk = (await fs.readdir(SYSTEMS_DIR)).filter((f) => f.endsWith(".mdx")).map((f) => f.slice(0, -4));
  } catch {
    fail(`cannot read ${path.relative(ROOT, SYSTEMS_DIR)}`);
  }
  const present = new Set(onDisk);
  const survivors = entries.filter((e) => e.keepUrl === true);

  for (const e of entries) {
    if (e.keepUrl === true) {
      if (!present.has(e.slug)) fail(`${e.slug}: survives, but src/content/systems/${e.slug}.mdx is missing`);
    } else if (e.status === "implemented") {
      if (present.has(e.slug)) fail(`${e.slug}: retired, but src/content/systems/${e.slug}.mdx still exists`);
    }
    // keepUrl:false + structural-pending: source may still exist, retirement pending.
  }
  for (const slug of onDisk) {
    if (!bySlug.has(slug)) notes.push(`src/content/systems/${slug}.mdx is not a manifest entry (new page since migration)`);
  }
  if (onDisk.length !== survivors.length) {
    const pendingExits = entries.filter((e) => e.keepUrl === false && e.status !== "implemented").length;
    if (onDisk.length !== survivors.length + pendingExits) {
      fail(`${onDisk.length} Systems sources on disk, but the manifest accounts for ${survivors.length} survivors plus ${pendingExits} not-yet-retired exits`);
    }
  }

  // ── layer 5: built output ─────────────────────────────────────────────────
  let built = true;
  try {
    await fs.access(OUT);
  } catch {
    built = false;
  }

  if (built) {
    for (const e of entries) {
      const route = path.join(OUT, "systems", e.slug, "index.html");
      let exists = true;
      try {
        await fs.access(route);
      } catch {
        exists = false;
      }
      if (e.keepUrl === true && !exists) fail(`${e.slug}: survives, but out/systems/${e.slug}/index.html was not generated`);
      if (e.keepUrl === false && e.status === "implemented" && exists) {
        fail(`${e.slug}: retired, but out/systems/${e.slug}/index.html still exists`);
      }
    }

    // Sitemap: survivors listed, exits absent.
    let sitemap = null;
    try {
      sitemap = await fs.readFile(SITEMAP, "utf8");
    } catch {
      fail("out/sitemap.xml is missing");
    }
    if (sitemap) {
      for (const e of entries) {
        const listed = sitemap.includes(`/systems/${e.slug}/<`);
        if (e.keepUrl === true && !listed) fail(`${e.slug}: survives, but is absent from the sitemap`);
        if (e.keepUrl === false && e.status === "implemented" && listed) {
          fail(`${e.slug}: retired, but still appears in the sitemap`);
        }
      }
      for (const e of entries) {
        if (e.redirectTargetType === "path" && !sitemap.includes(`${e.redirect}<`)) {
          notes.push(`${e.redirect} is not in the sitemap (redirect destination, not required to be listed)`);
        }
      }
    }

    // No rendered page may still link to a retired route. This catches
    // generated discovery surfaces that no source file greps for.
    const retiredSlugs = new Set(entries.filter((e) => e.keepUrl === false && e.status === "implemented").map((e) => e.slug));
    if (retiredSlugs.size > 0) {
      const staleHtml = [];
      async function walkOut(dir) {
        let items;
        try {
          items = await fs.readdir(dir, { withFileTypes: true });
        } catch {
          return;
        }
        for (const it of items) {
          const full = path.join(dir, it.name);
          if (it.isDirectory()) {
            await walkOut(full);
            continue;
          }
          if (!it.name.endsWith(".html")) continue;
          const html = await fs.readFile(full, "utf8");
          for (const slug of retiredSlugs) {
            for (const href of [`/systems/${slug}/`, `/systems/${slug}`]) {
              if (html.includes(`href="${href}"`) || html.includes(`href='${href}'`)) {
                staleHtml.push(`${path.relative(ROOT, full)} links to retired ${href}`);
                break;
              }
            }
          }
        }
      }
      await walkOut(OUT);
      for (const h of staleHtml.slice(0, 20)) fail(h);
      if (staleHtml.length > 20) fail(`...and ${staleHtml.length - 20} more rendered links to retired routes`);
    }

    // Redirect readiness: source route gone, rule present, destination built.
    let ready = 0;
    for (const e of resolvedForReadiness(entries)) {
      if (e.status !== "implemented") continue;
      let srcGone = true;
      try {
        await fs.access(path.join(OUT, "systems", e.slug, "index.html"));
        srcGone = false;
      } catch {
        /* absent, as required */
      }
      let destOk = false;
      if (e.redirectTargetType === "systems-slug") {
        try {
          await fs.access(path.join(OUT, "systems", e.redirect, "index.html"));
          destOk = true;
        } catch {
          /* missing */
        }
      } else {
        destOk = (await routeExists(e.redirect)) !== null;
      }
      if (srcGone && destOk) ready++;
      else fail(`${e.slug}: redirect not ready (source route ${srcGone ? "absent" : "STILL PRESENT"}, destination ${destOk ? "present" : "MISSING"})`);
    }
    if (ready > 0) notes.push(`${ready} retired route(s) absent with a rule and a live destination`);
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
      `${counts.none || 0} none, ${counts.pending || 0} pending`
  );
  console.log(`  .htaccess: ${expected.length} managed rules match the manifest`);
  console.log(`  references: 0 surviving files link to an exiting Systems URL`);
  console.log(`  sources:    ${entries.filter((e) => e.keepUrl === true).length} survivors on disk, ${entries.filter((e) => e.keepUrl === false && e.status === "implemented").length} retired sources absent\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
