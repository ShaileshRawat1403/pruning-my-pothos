#!/usr/bin/env node
/**
 * websiteops-conform — the bridge between a flowright ContentOps packet and
 * the pruningmypothos publish contract.
 *
 * A flowright packet is a valid *proposal*. The live site enforces more than
 * the packet carries: exact frontmatter per collection, an editorial body
 * structure, and (for systems) a unique cover image. This script conforms the
 * packet deterministically, generates what is safe to generate, validates
 * against the real schema, runs the same structural checks CI runs, and prints
 * a publish-readiness report. It never publishes. It stages; a human promotes,
 * opens a PR, and merges. That merge is the stop sign.
 *
 * Usage:
 *   node scripts/websiteops-conform.mjs --in <packet.mdx> --collection <systems|self|sentences> [options]
 *
 * Options:
 *   --collection <name>   systems | self | sentences        (required)
 *   --in <path>           packet .mdx/.md file               (required)
 *   --slug <slug>         override slug (default: from title)
 *   --date <YYYY-MM-DD>   publishDate (default: packet updatedAt/publishDate/today)
 *   --enrich              apply safe structural conforming (wrap lead paragraph)
 *   --promote             copy the conformed file into src/content and run full CI gates
 *
 * Default (no --promote): writes to .websiteops/staged/<collection>/ and reports.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import matter from "gray-matter";
import { COLLECTIONS, SUPPORTED, slugify } from "./content-contract.mjs";

const ROOT = process.cwd();
const TODAY = new Date().toISOString().slice(0, 10);

import { fileURLToPath } from "node:url";

// ── args ──────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const a = { enrich: false, promote: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--enrich") a.enrich = true;
    else if (k === "--promote") a.promote = true;
    else if (k.startsWith("--")) a[k.slice(2)] = argv[++i];
  }
  return a;
}

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

// ── conform frontmatter ──────────────────────────────────────────────────────
const toYmd = (v) =>
  v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v).slice(0, 10) : v;

export const V1_PRESERVED_KEYS = [
  "schemaVersion",
  "contentKind",
  "readerIntent",
  "readerOutcome",
  "thesis",
  "boundary",
  "practice",
  "provenance",
  "language",
];

export function conformFrontmatter(collection, data, slug, customDate) {
  const publishDate = customDate || toYmd(data.publishDate) || toYmd(data.updatedAt) || TODAY;
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const isV1 = data.schemaVersion === "1.0";

  const v1Entries = Object.fromEntries(
    V1_PRESERVED_KEYS.filter((key) => data[key] !== undefined).map((key) => [key, data[key]])
  );

  if (collection === "systems") {
    return {
      ...Object.fromEntries(
        [
          "seoTitle",
          "featured",
          "contentType",
          "readingTime",
          "difficulty",
          "shortAnswer",
          "analogy",
          "figure",
          "practice",
          "evidence",
          "related",
          "useValue",
          "boundary",
        ]
          .filter((key) => data[key] !== undefined)
          .map((key) => [key, data[key]])
      ),
      ...v1Entries,
      title: data.title,
      description: data.description ?? "",
      ...(data.category ? { category: data.category } : isV1 ? {} : { category: "Explanations" }),
      tags,
      publishDate,
      updatedAt: toYmd(data.updatedAt) || publishDate,
      heroImage: data.heroImage || `/covers/systems/${slug}.svg`,
      heroImageAlt: data.heroImageAlt || `Cover illustration for ${data.title}`,
      proofPoints: Array.isArray(data.proofPoints) ? data.proofPoints : [],
      faq: Array.isArray(data.faq) ? data.faq : [],
    };
  }
  if (collection === "self") {
    return {
      ...v1Entries,
      title: data.title,
      description: data.description ?? data.summary ?? "",
      publishDate,
      tags,
      ...(data.heroImage ? { heroImage: data.heroImage } : {}),
      ...(data.heroImageAlt ? { heroImageAlt: data.heroImageAlt } : {}),
    };
  }
  // sentences
  return {
    title: data.title,
    summary: data.summary ?? data.description ?? "",
    category: data.category,
    tags,
  };
}

// ── safe structural enrichment (deterministic, opt-in) ───────────────────────
function enrichBody(collection, body) {
  if (!(collection === "self" || collection === "systems")) return body;
  if (/<p class="lead">/i.test(body)) return body;
  // Wrap the first non-empty paragraph as the lead.
  const lines = body.replace(/^\n+/, "").split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  const start = i;
  while (i < lines.length && lines[i].trim() !== "") i++;
  const para = lines.slice(start, i).join(" ").trim();
  if (!para || para.startsWith("<") || para.startsWith("#")) return body;
  const wrapped = `<p class="lead">${para}</p>`;
  return [...lines.slice(0, start), wrapped, ...lines.slice(i)].join("\n").replace(/^\n+/, "") + "";
}

// ── cover generation (systems only) ──────────────────────────────────────────
function coverSvg(title, category) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // wrap title to ~18 chars/line, max 4 lines
  const words = String(title).split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 18 && cur) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  const shown = lines.slice(0, 4);
  const tspans = shown
    .map((l, i) => `<tspan x="72" dy="${i === 0 ? 0 : 70}">${esc(l)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#14110b"/>
  <rect x="0" y="0" width="1200" height="6" fill="#b5402f"/>
  <g font-family="Georgia, 'Times New Roman', serif" fill="#efe5cf">
    <text x="72" y="120" font-family="monospace" font-size="20" letter-spacing="6" fill="#c79a3e">SANS SERIF SYSTEMS</text>
    <text x="72" y="300" font-size="66" font-weight="600">${tspans}</text>
  </g>
  <text x="72" y="560" font-family="monospace" font-size="22" letter-spacing="3" fill="#837457">${esc(String(category || "").toUpperCase())}</text>
  <text x="1128" y="560" text-anchor="end" font-family="monospace" font-size="18" fill="#6d8a9c">pruningmypothos.com</text>
</svg>
`;
}

// ── gate runner ──────────────────────────────────────────────────────────────
function runGate(script) {
  const r = spawnSync("node", [path.join("scripts", script)], { cwd: ROOT, encoding: "utf8" });
  return { ok: r.status === 0, out: (r.stdout || "") + (r.stderr || "") };
}

// ── main CLI runner ──────────────────────────────────────────────────────────
async function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.in) fail("Missing --in <packet file>");
  if (!args.collection) fail("Missing --collection <systems|self|sentences>");
  if (!SUPPORTED.includes(args.collection)) {
    fail(`Unsupported collection "${args.collection}". Use ${SUPPORTED.join(", ")}.`);
  }

  const collection = args.collection;
  const raw = await fs.readFile(path.resolve(args.in), "utf8");
  const parsed = matter(raw);
  if (!parsed.data?.title) fail("Packet has no title in frontmatter.");

  const slug = args.slug ? slugify(args.slug) : slugify(parsed.data.title);
  const fm = conformFrontmatter(collection, parsed.data, slug, args.date);

  // validate frontmatter
  const result = COLLECTIONS[collection].schema.safeParse(fm);
  const fmIssues = result.success
    ? []
    : result.error.issues.map((e) => `${e.path.join(".") || "(root)"}: ${e.message}`);

  // body (optionally enriched)
  let body = parsed.content.replace(/^\s+/, "");
  if (args.enrich) body = enrichBody(collection, body);
  const composed = matter.stringify(body, fm);
  const bodyIssues = COLLECTIONS[collection].body(composed, body);

  // cover (systems) — only touch public/ on --promote; otherwise stage it
  let coverNote = "";
  if (COLLECTIONS[collection].needsCover) {
    const coverRel = fm.heroImage.replace(/^\//, "");
    const coverAbs = path.join(ROOT, "public", coverRel);
    try {
      await fs.access(coverAbs);
      coverNote = `exists: ${fm.heroImage}`;
    } catch {
      const svg = coverSvg(fm.title, fm.category);
      if (args.promote) {
        await fs.mkdir(path.dirname(coverAbs), { recursive: true });
        await fs.writeFile(coverAbs, svg, "utf8");
        coverNote = `generated: ${fm.heroImage}`;
      } else {
        const stagedCover = path.join(ROOT, ".websiteops", "staged", "covers", coverRel);
        await fs.mkdir(path.dirname(stagedCover), { recursive: true });
        await fs.writeFile(stagedCover, svg, "utf8");
        coverNote = `staged (promote to place at ${fm.heroImage})`;
      }
    }
  }

  // write (staged by default)
  const filename = `${slug}${COLLECTIONS[collection].ext}`;
  const stagedDir = path.join(ROOT, ".websiteops", "staged", collection);
  await fs.mkdir(stagedDir, { recursive: true });
  const stagedPath = path.join(stagedDir, filename);
  await fs.writeFile(stagedPath, composed, "utf8");

  let promotedPath = null;
  if (args.promote) {
    const destDir = path.join(ROOT, "src", "content", collection);
    await fs.mkdir(destDir, { recursive: true });
    promotedPath = path.join(destDir, filename);
    await fs.writeFile(promotedPath, composed, "utf8");
  }

  // report
  const line = "─".repeat(60);
  console.log(`\n${line}\n  websiteops conform · ${collection} · ${slug}\n${line}`);
  console.log(`  packet:     ${args.in}`);
  console.log(`  staged:     ${path.relative(ROOT, stagedPath)}`);
  if (coverNote) console.log(`  cover:      ${coverNote}`);
  console.log(`  frontmatter ${fmIssues.length ? "✗" : "✓"}${fmIssues.length ? "" : " valid"}`);
  fmIssues.forEach((i) => console.log(`     - ${i}`));
  console.log(`  body shape  ${bodyIssues.length ? "✗" : "✓"}${bodyIssues.length ? "" : " passes " + collection + " structure"}`);
  bodyIssues.forEach((i) => console.log(`     - ${i}`));

  let gatesOk = true;
  if (args.promote) {
    console.log(`  promoted:   ${path.relative(ROOT, promotedPath)}`);
    console.log(`\n  running CI gates over the collection...`);
    for (const s of ["lint-content-consistency.mjs", "lint-systems-consistency.mjs", "verify-covers.mjs"]) {
      const { ok, out } = runGate(s);
      gatesOk = gatesOk && ok;
      console.log(`    ${ok ? "✓" : "✗"} ${s}`);
      if (!ok) out.split("\n").filter(Boolean).slice(0, 12).forEach((l) => console.log(`        ${l}`));
    }
  }

  const ready = fmIssues.length === 0 && bodyIssues.length === 0 && (!args.promote || gatesOk);
  console.log(`\n  ${ready ? "✓ READY" : "✗ NOT READY"} — ${ready
    ? (args.promote ? "gates green; open a PR and merge to publish." : "conforms; run again with --promote to place it and run gates.")
    : "resolve the items above (the drafting step must supply the missing structure)."}`);
  console.log(`${line}\n`);
  process.exit(ready ? 0 : 1);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  runCli().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
