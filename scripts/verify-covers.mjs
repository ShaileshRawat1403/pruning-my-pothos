#!/usr/bin/env node
// Static, local-only check over cover art (heroImage/coverUrl) across content
// collections. Exists because of a real incident: a new systems article
// shipped pointing at another article's cover file (copy-paste in
// frontmatter), and a different cover's auto-generated label text was
// truncated into a dangling word ("AI MODEL ACTUALLY"). Both slipped through
// review because nothing checked them. This script exists to make sure that
// doesn't happen silently again.
//
// Checks (blocking, exit 1 on failure):
//   1. Every local heroImage/coverUrl referenced in frontmatter points at a
//      file that actually exists under public/ (external http(s) URLs, e.g.
//      Apple Music album art on shelf/music entries, are skipped -- checking
//      those live belongs in verify-deploy.mjs-style tooling, not here).
//   2. No two different *systems* docs reference the exact same cover file.
//      Systems docs each get one dedicated generated cover -- a collision
//      there means one doc's frontmatter was never pointed at its own file
//      (this is exactly the bug that shipped once already).
//
// Checks (advisory, warning only, does not fail the build):
//   3. The SVG's main title-label <text> doesn't end on a dangling word
//      (an article, preposition, or adverb) that reads as a truncated
//      fragment rather than a complete label.
//   4. Two *shelf* docs share a cover. Shelf legitimately reuses covers
//      sometimes (a category placeholder like books-reading-stack.svg, or
//      two tracks off the same album sharing official art), so this is
//      surfaced for a human to glance at rather than blocking CI.

import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'src/content');
const PUBLIC_ROOT = path.join(ROOT, 'public');

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

// Words a title-label shouldn't dangle on. Not exhaustive -- this is a
// heuristic tripwire for human review, not a grammar engine.
const DANGLING_END_WORDS = new Set([
  'a', 'an', 'the', 'of', 'in', 'on', 'to', 'for', 'with', 'and', 'or', 'but',
  'is', 'are', 'was', 'were', 'be', 'as', 'by', 'at', 'it', 'its', 'that',
  'this', 'actually', 'really', 'very', 'quite', 'just', 'so', 'not',
]);

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(dir, exts) {
  const out = [];
  async function walk(current) {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (exts.some((ext) => entry.name.endsWith(ext))) {
        out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

function extractFrontmatterField(raw, field) {
  const fm = raw.match(FRONTMATTER_RE);
  if (!fm) return null;
  const re = new RegExp(`^${field}:\\s*["']?([^"'\\r\\n]+)["']?\\s*$`, 'm');
  const match = fm[1].match(re);
  return match ? match[1].trim() : null;
}

function extractTitle(raw) {
  const fm = raw.match(FRONTMATTER_RE);
  if (!fm) return null;
  const match = fm[1].match(/^title:\s*["']?([^"'\r\n]+)["']?\s*$/m);
  return match ? match[1].trim() : null;
}

function labelLooksTruncated(labelText) {
  const words = labelText.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  const last = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, '');
  return DANGLING_END_WORDS.has(last);
}

async function checkCoverLabel(svgPath) {
  if (!svgPath.endsWith('.svg')) return null;
  let content;
  try {
    content = await fs.readFile(svgPath, 'utf8');
  } catch {
    return null;
  }
  // The convention across this site's covers is a bold, centered <text> at
  // y="155.0" as the main title label. Fall back to the last bold text if
  // that exact convention isn't matched.
  const boldTexts = [...content.matchAll(/<text[^>]*font-weight="700"[^>]*>([^<]+)<\/text>/g)].map((m) => m[1]);
  if (boldTexts.length === 0) return null;
  const label = boldTexts[boldTexts.length - 1];
  return labelLooksTruncated(label) ? label : null;
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(value);
}

async function main() {
  const failures = [];
  const warnings = [];
  // One shared usage map across both collections: a systems doc borrowing a
  // shelf doc's cover (or vice versa) is the same class of bug as two
  // systems docs sharing one -- it just wouldn't show up if tracked
  // per-collection. Severity is decided per group below.
  /** @type {Map<string, {rel: string, collection: 'systems' | 'shelf'}[]>} */
  const coverUsage = new Map();

  function recordUsage(cover, rel, collection) {
    const list = coverUsage.get(cover) ?? [];
    list.push({ rel, collection });
    coverUsage.set(cover, list);
  }

  // systems: *.mdx directly under src/content/systems, heroImage field
  const systemsFiles = await collectFiles(path.join(CONTENT_ROOT, 'systems'), ['.mdx']);
  for (const file of systemsFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const rel = path.relative(ROOT, file);
    const heroImage = extractFrontmatterField(raw, 'heroImage');
    if (!heroImage) {
      warnings.push(`${rel}: no heroImage set`);
      continue;
    }
    if (isExternalUrl(heroImage)) continue;

    recordUsage(heroImage, rel, 'systems');

    const onDisk = path.join(PUBLIC_ROOT, heroImage.replace(/^\//, ''));
    if (!(await exists(onDisk))) {
      failures.push(`${rel}: heroImage "${heroImage}" does not exist under public/`);
      continue;
    }

    const title = extractTitle(raw);
    const badLabel = await checkCoverLabel(onDisk);
    if (badLabel) {
      warnings.push(`${rel}: cover label "${badLabel}" ends on a dangling word (title: "${title ?? '?'}") -- review for readability`);
    }
  }

  // shelf: *.md nested under src/content/shelf, coverUrl field
  const shelfFiles = await collectFiles(path.join(CONTENT_ROOT, 'shelf'), ['.md']);
  for (const file of shelfFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const rel = path.relative(ROOT, file);
    const coverUrl = extractFrontmatterField(raw, 'coverUrl');
    if (!coverUrl) continue; // lint-content-consistency.mjs already enforces presence
    if (isExternalUrl(coverUrl)) continue; // e.g. Apple Music album art

    recordUsage(coverUrl, rel, 'shelf');

    const onDisk = path.join(PUBLIC_ROOT, coverUrl.replace(/^\//, ''));
    if (!(await exists(onDisk))) {
      failures.push(`${rel}: coverUrl "${coverUrl}" does not exist under public/`);
    }
  }

  for (const [cover, usedBy] of coverUsage) {
    if (usedBy.length <= 1) continue;
    const involvesSystems = usedBy.some((u) => u.collection === 'systems');
    const list = usedBy.map((u) => u.rel).join('\n    ');
    if (involvesSystems) {
      failures.push(`Cover "${cover}" is reused by ${usedBy.length} content files, including a systems doc (each systems doc should have one dedicated cover):\n    ${list}`);
    } else {
      warnings.push(`Cover "${cover}" is reused by ${usedBy.length} shelf docs -- confirm this is intentional (e.g. same-album tracks or a category placeholder):\n    ${list}`);
    }
  }

  console.log(`Checked ${systemsFiles.length} systems docs and ${shelfFiles.length} shelf docs, ${coverUsage.size} distinct local covers referenced.\n`);

  if (warnings.length > 0) {
    console.log(`${warnings.length} advisory warning(s) (non-blocking):`);
    for (const w of warnings) console.log(`  - ${w}`);
    console.log('');
  }

  if (failures.length > 0) {
    console.error(`FAILED: ${failures.length} cover consistency issue(s):`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exitCode = 1;
    return;
  }

  console.log('OK: no missing or reused covers found.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
