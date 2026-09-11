#!/usr/bin/env node
/**
 * audit-editorial-integrity.mjs — Archive Editorial Integrity Audit
 *
 * Scans all existing systems and self articles and produces a categorized
 * triage report in docs/EDITORIAL_AUDIT.md.
 *
 * Classification:
 * - Green: No integrity risk detected by the current automated checks.
 * - Amber: Useful content, but certainty or evidence needs qualification.
 * - Red: Cannot currently be published as asserted under the evidence available
 *        to the validator (e.g. unverified first-person incident claims, unanchored metrics).
 * - Illustrative: Assigned ONLY when the document explicitly declares that an example,
 *                 worked scenario, or figure is illustrative. (Does not guess).
 *
 * IMPORTANT: This script NEVER rewrites or modifies content. It reports only.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = process.cwd();
const OUTPUT_FILE = path.resolve(ROOT, "docs/EDITORIAL_AUDIT.md");

export const CONTENT_EXTENSIONS = [".md", ".mdx"];

export const DEFAULT_AUDIT_TARGETS = [
  { collection: "systems", dir: "src/content/systems", exts: CONTENT_EXTENSIONS },
  { collection: "self", dir: "src/content/self", exts: CONTENT_EXTENSIONS },
];

const INCIDENT_SIGNALS = [
  { pattern: /\b[Ll]ast week,?\s+(?:we|I)\s+(?:received|noticed|discovered|hit)\b/g, label: "first-person incident opener ('Last week we/I received...')" },
  { pattern: /\b[Ii]n our production (?:cluster|environment|database)\b/g, label: "production environment claim ('in our production...')" },
  { pattern: /\b[Aa]t my company\b/g, label: "company incident claim ('at my company...')" },
  { pattern: /\b(?:we|I) ended up (?:raising|lowering|changing) the threshold\b/g, label: "unanchored operational action ('we ended up raising the threshold...')" },
  { pattern: /\b[Ww]e received a bug report\b/g, label: "unverified incident ('we received a bug report...')" },
];

const CERTAINTY_SIGNALS = [
  { pattern: /\bfails? (?:more|less) often than\b/gi, label: "comparative frequency assertion ('more/less often than')" },
  { pattern: /\b100% (?:guarantee|safe|reliable|eliminated|test pass|test coverage)\b/gi, label: "categorical absolute metric (100%)" },
  { pattern: /\bthe only way to\b/gi, label: "dogmatic absolute ('the only way to')" },
  { pattern: /\bcompletely prevents? (?:all)?\b/gi, label: "unqualified absolute ('completely prevents')" },
  { pattern: /\bzero hallucination\b/gi, label: "absolute marketing claim ('zero hallucination')" },
];

const PLACEHOLDER_HEADINGS = [
  { pattern: /^##\s+Act\s+(?:I|II|III)\b/mi, label: "syntactic Act heading ('## Act I/II/III')" },
  { pattern: /^##\s+(?:Introduction|Conclusion|Deep Dive)\b/mi, label: "generic placeholder heading ('## Introduction/Conclusion/Deep Dive')" },
];

/**
 * Reusable content-file discovery helper.
 * Discovers all files matching specified extensions (default: .md and .mdx).
 */
export async function collectContentFiles(dirPath, exts = CONTENT_EXTENSIONS) {
  const absDir = path.isAbsolute(dirPath) ? dirPath : path.resolve(ROOT, dirPath);
  try {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && exts.some((ext) => e.name.endsWith(ext)))
      .map((e) => path.join(absDir, e.name))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

/**
 * Returns a document-relative link from the generated report file to the content file.
 * Portable across machines, GitHub UI, and coding agents without machine-local paths.
 */
export function getDocRelativeLink(filePath, targetOutputFile = OUTPUT_FILE) {
  const absFile = path.isAbsolute(filePath) ? filePath : path.resolve(ROOT, filePath);
  const docDir = path.dirname(path.isAbsolute(targetOutputFile) ? targetOutputFile : path.resolve(ROOT, targetOutputFile));
  const rel = path.relative(docDir, absFile);
  return rel.replace(/\\/g, "/");
}

/**
 * Retrieves the immutable repository revision (git commit SHA).
 * Deterministic: consecutive runs on the same revision yield identical provenance.
 */
export function getSourceRevision() {
  if (process.env.SOURCE_REVISION && process.env.SOURCE_REVISION.trim()) {
    return process.env.SOURCE_REVISION.trim();
  }
  try {
    const sha = execSync("git rev-parse HEAD", {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return sha || "unknown";
  } catch {
    return "unknown";
  }
}

function findMatches(lines, signals) {
  const matches = [];
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    for (const { pattern, label } of signals) {
      pattern.lastIndex = 0;
      const m = pattern.exec(line);
      if (m) {
        matches.push({
          line: lineNum + 1,
          label,
          snippet: m[0],
          context: line.trim(),
        });
      }
    }
  }
  return matches;
}

export function evaluateDocument(filePath, raw, collection) {
  let parsed;
  try {
    parsed = matter(raw);
  } catch (err) {
    return {
      filePath: path.relative(ROOT, filePath).replace(/\\/g, "/"),
      slug: path.basename(filePath, path.extname(filePath)),
      collection,
      title: path.basename(filePath, path.extname(filePath)),
      status: "Red",
      reasons: [`Frontmatter parse error: ${err.message}`],
      excerpts: [],
      declaredIllustrative: false,
      isV1: false,
      hasBoundary: false,
      hasUseValue: false,
    };
  }

  const { data } = parsed;
  const lines = raw.split("\n");
  const slug = path.basename(filePath, path.extname(filePath));

  const isV1 = data.schemaVersion === "1.0";
  const primaryProvenance = data.provenance?.primary;
  const isObserved = primaryProvenance === "observed";

  // Check if explicitly declared illustrative in frontmatter or figure
  const explicitlyIllustrative =
    primaryProvenance === "illustrative" ||
    (typeof data.figure?.caption === "string" && /illustrative/i.test(data.figure.caption)) ||
    (Array.isArray(data.provenance?.claims) && data.provenance.claims.some((c) => c.kind === "illustrative"));

  const incidentMatches = findMatches(lines, INCIDENT_SIGNALS);
  const certaintyMatches = findMatches(lines, CERTAINTY_SIGNALS);
  const headingMatches = findMatches(lines, PLACEHOLDER_HEADINGS);

  const reasons = [];
  const excerpts = [];

  // Incident evaluations
  if (incidentMatches.length > 0) {
    for (const m of incidentMatches) {
      excerpts.push(`L${m.line}: "${m.snippet}" — ${m.label}`);
    }
    if (!isObserved) {
      reasons.push(
        `First-person incident language detected without 'observed' provenance declaration or author attestation`
      );
    }
  }

  // Certainty evaluations
  if (certaintyMatches.length > 0) {
    for (const m of certaintyMatches) {
      excerpts.push(`L${m.line}: "${m.snippet}" — ${m.label}`);
    }
    reasons.push(`Unanchored empirical certainty or comparative frequency assertions`);
  }

  // Legacy heading evaluation
  if (headingMatches.length > 0) {
    for (const m of headingMatches) {
      excerpts.push(`L${m.line}: "${m.snippet}" — ${m.label}`);
    }
  }

  // Determine status (Strict non-guessing)
  let status = "Green";

  if (incidentMatches.length > 0 && !isObserved) {
    // Cannot currently be published as asserted under evidence available
    status = "Red";
  } else if (certaintyMatches.length > 0 || (isV1 && headingMatches.length > 0)) {
    status = "Amber";
  } else if (explicitlyIllustrative) {
    status = "Illustrative";
  } else if (headingMatches.length > 0 && !isV1) {
    // Legacy post with Act I-III, but claims are otherwise clean
    status = "Amber";
    reasons.push("Legacy Act I-III syntax template (candidate for v1 migration)");
  }

  return {
    filePath: path.relative(ROOT, filePath).replace(/\\/g, "/"),
    slug,
    collection,
    title: data.title || slug,
    status,
    reasons,
    excerpts,
    declaredIllustrative: explicitlyIllustrative,
    isV1,
    hasBoundary: Boolean(data.boundary),
    hasUseValue: Boolean(data.useValue || data.readerOutcome),
  };
}

export function generateAuditMarkdown(results, { sourceRevision, outputFile = OUTPUT_FILE }) {
  const counts = {
    Total: results.length,
    Green: results.filter((r) => r.status === "Green").length,
    Amber: results.filter((r) => r.status === "Amber").length,
    Red: results.filter((r) => r.status === "Red").length,
    Illustrative: results.filter((r) => r.status === "Illustrative").length,
  };

  let md = `# Editorial Integrity Audit Report\n\n`;
  md += `Source revision: ${sourceRevision}\n`;
  md += `Status: Read-only diagnostic of the existing article archive.\n\n`;
  md += `## Status Definitions\n\n`;
  md += `- **Green**: No integrity risk detected by the current automated checks.\n`;
  md += `- **Amber**: Useful content, but certainty, comparative claims, or evidence need qualification.\n`;
  md += `- **Red**: Cannot currently be published as asserted under the evidence available to the validator (e.g. unverified first-person incidents, unanchored metrics).\n`;
  md += `- **Illustrative**: Explicitly declared in frontmatter/markup as an illustrative example or constructed scenario.\n\n`;

  md += `## Summary Register\n\n`;
  md += `| Total Articles | Green | Amber | Red | Illustrative |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;
  md += `| ${counts.Total} | ${counts.Green} | ${counts.Amber} | ${counts.Red} | ${counts.Illustrative} |\n\n`;

  // High-Priority Triage Queue (Red + Amber)
  const redArticles = results.filter((r) => r.status === "Red");
  const amberArticles = results.filter((r) => r.status === "Amber");

  md += `## High-Priority Review Queue (Red)\n\n`;
  md += `Articles containing first-person incident assertions or ungrounded empirical claims that require author attestation or illustrative reframing:\n\n`;

  if (redArticles.length === 0) {
    md += `*None detected.*\n\n`;
  } else {
    for (const a of redArticles) {
      const relLink = getDocRelativeLink(a.filePath, outputFile);
      md += `### [${a.title}](${relLink})\n`;
      md += `- **File**: \`${a.filePath}\` (${a.collection})\n`;
      md += `- **Status**: 🔴 **Red**\n`;
      md += `- **Diagnostic Issues**:\n`;
      for (const r of a.reasons) md += `  - ${r}\n`;
      if (a.excerpts.length > 0) {
        md += `- **Flagged Excerpts**:\n`;
        for (const e of a.excerpts) md += `  - \`${e}\`\n`;
      }
      md += `- **Action Required**: Decide whether incident genuinely occurred (add \`provenance.primary: observed\` + \`attestation: author\`) or reframe as an explicit illustrative scenario.\n\n`;
    }
  }

  md += `## Qualification Queue (Amber)\n\n`;
  md += `Articles with solid conceptual foundations that need qualified phrasing (e.g. comparative frequency assertions) or removal of legacy template constraints:\n\n`;

  for (const a of amberArticles) {
    const relLink = getDocRelativeLink(a.filePath, outputFile);
    md += `- **[${a.title}](${relLink})** (\`${a.filePath}\`)\n`;
    for (const r of a.reasons) md += `  - *Issue*: ${r}\n`;
    if (a.excerpts.length > 0) {
      for (const e of a.excerpts.slice(0, 3)) md += `  - *Excerpt*: \`${e}\`\n`;
    }
  }
  md += `\n`;

  md += `## Full Archive Status Table\n\n`;
  md += `| Collection | Slug | Status | Contract | Boundary | Key Diagnostic |\n`;
  md += `| :--- | :--- | :---: | :---: | :---: | :--- |\n`;
  for (const a of results) {
    const relLink = getDocRelativeLink(a.filePath, outputFile);
    const statusIcon = a.status === "Green" ? "🟢 Green" : a.status === "Amber" ? "🟡 Amber" : a.status === "Red" ? "🔴 Red" : "🔵 Illustrative";
    const v1Tag = a.isV1 ? "v1.0" : "Legacy";
    const boundaryTag = a.hasBoundary ? "Yes" : "None";
    const issueSummary = a.reasons.length > 0 ? a.reasons[0] : "Clean";
    md += `| ${a.collection} | [${a.slug}](${relLink}) | ${statusIcon} | ${v1Tag} | ${boundaryTag} | ${issueSummary} |\n`;
  }
  md += `\n`;

  return { md, counts };
}

export async function auditArchive(targets = DEFAULT_AUDIT_TARGETS, options = {}) {
  const outputFile = options.outputFile ? path.resolve(ROOT, options.outputFile) : OUTPUT_FILE;
  const sourceRevision = options.sourceRevision || getSourceRevision();

  const results = [];
  for (const target of targets) {
    const files = await collectContentFiles(target.dir, target.exts || CONTENT_EXTENSIONS);
    for (const file of files) {
      const raw = await fs.readFile(file, "utf8");
      results.push(evaluateDocument(file, raw, target.collection));
    }
  }

  // Stable sort by collection then slug
  results.sort((a, b) => {
    if (a.collection !== b.collection) {
      return a.collection.localeCompare(b.collection);
    }
    return a.slug.localeCompare(b.slug);
  });

  const { md, counts } = generateAuditMarkdown(results, { sourceRevision, outputFile });

  if (options.write !== false) {
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, md, "utf8");
  }

  return { results, counts, markdown: md, outputFile, sourceRevision };
}

async function main() {
  console.log("\n── Running Archive Editorial Integrity Audit ──\n");
  const { counts, outputFile } = await auditArchive();

  console.log(`Audited ${counts.Total} articles across systems and self:`);
  console.log(`  🟢 Green:        ${counts.Green}`);
  console.log(`  🟡 Amber:        ${counts.Amber}`);
  console.log(`  🔴 Red:          ${counts.Red}`);
  console.log(`  🔵 Illustrative: ${counts.Illustrative}\n`);
  console.log(`✓ Audit report successfully written to ${path.relative(ROOT, outputFile)}\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((err) => {
    console.error("Audit failed:", err);
    process.exit(1);
  });
}
