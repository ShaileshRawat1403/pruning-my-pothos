#!/usr/bin/env node
/**
 * lint-editorial-v1.mjs — Blocking CI Gate for PMP Editorial Contract v1
 *
 * Validates:
 * 1. Schema correctness for all schemaVersion: "1.0" documents
 * 2. Source referential integrity (unique source IDs, resolving claim references, 40-char commit SHAs)
 * 3. Epistemic source compatibility (repository claims -> repository sources, external -> external)
 * 4. Claim-to-prose mapping (declared claims must match body prose assertions)
 * 5. Epistemic legality (first-person incidents strictly require observed provenance + author attestation)
 * 6. Semantic requirements per contentKind (explainer boundaries, playbook practice blocks)
 *
 * Usage:
 *   node scripts/lint-editorial-v1.mjs
 *   node scripts/lint-editorial-v1.mjs --file src/content/systems/my-post.mdx
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  editorialContractV1Fields,
  SYSTEMS_CONTENT_KINDS,
  SELF_CONTENT_KINDS,
  verifyClaimProseMapping,
  normalizeProse,
} from "./editorial-contract-v1.mjs";
import { z } from "zod";

const ROOT = process.cwd();
const TARGET_DIRS = [
  { dir: "src/content/systems", exts: [".md", ".mdx"], allowedKinds: SYSTEMS_CONTENT_KINDS, collection: "systems" },
  { dir: "src/content/self", exts: [".md", ".mdx"], allowedKinds: SELF_CONTENT_KINDS, collection: "self" },
];

// Candidate incident regexes (Vale = signal, Validator = judgment)
const INCIDENT_PATTERNS = [
  /\b[Ll]ast week,?\s+(?:we|I)\s+(?:received|noticed|discovered|hit)\b/g,
  /\b[Ii]n our production (?:cluster|environment|database)\b/g,
  /\b[Aa]t my company\b/g,
  /\b(?:we|I) ended up (?:raising|lowering|changing) the threshold\b/g,
  /\b[Ww]e received a bug report\b/g,
];

// Unanchored comparative frequency regex
const UNANCHORED_FREQUENCY_PATTERNS = [
  /\bfails? (?:more|less) often than\b/gi,
];

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--file" && argv[i + 1]) {
      args.file = argv[++i];
    } else if (argv[i] === "--collection" && argv[i + 1]) {
      args.collection = argv[++i];
    }
  }
  return args;
}

async function collectFiles(dirPath, exts = [".md", ".mdx"]) {
  const absDir = path.resolve(ROOT, dirPath);
  try {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && exts.some((ext) => e.name.endsWith(ext)))
      .map((e) => path.join(absDir, e.name));
  } catch {
    return [];
  }
}

export async function validateV1File(filePath, allowedKinds) {
  const issues = [];
  const raw = await fs.readFile(filePath, "utf8");
  
  let parsed;
  try {
    parsed = matter(raw);
  } catch (err) {
    return [`Failed to parse frontmatter: ${err.message}`];
  }

  const { data, content: body } = parsed;

  // Only validate v1 documents
  if (data.schemaVersion !== "1.0") {
    return [];
  }

  // 1. Content kind scoping per collection
  if (allowedKinds && !allowedKinds.includes(data.contentKind)) {
    issues.push(
      `Invalid contentKind "${data.contentKind}" for collection. Permitted kinds: ${allowedKinds.join(", ")}`
    );
  }

  // 2. Strict Zod schema validation
  const v1Schema = z.object(editorialContractV1Fields).passthrough();
  const schemaResult = v1Schema.safeParse(data);
  if (!schemaResult.success) {
    for (const err of schemaResult.error.issues) {
      issues.push(`Schema error at ${err.path.join(".")}: ${err.message}`);
    }
  }

  // 3. Content kind semantic milestones
  if (data.contentKind === "explainer") {
    if (!data.boundary || !data.boundary.is || !data.boundary.isNot || !data.boundary.mattersWhen) {
      issues.push("Explainer requires complete boundary object: boundary.is, boundary.isNot, boundary.mattersWhen");
    }
    if (!data.shortAnswer || typeof data.shortAnswer !== "string" || data.shortAnswer.trim().length < 80 || data.shortAnswer.trim().length > 700) {
      issues.push("Explainer requires shortAnswer (between 80 and 700 characters)");
    }
  } else if (data.contentKind === "field-note") {
    const hasAuthorObserved =
      data.provenance?.primary === "observed" &&
      Array.isArray(data.provenance?.claims) &&
      data.provenance.claims.some(
        (c) => c.kind === "observed" && c.attestation === "author"
      );
    if (!hasAuthorObserved) {
      issues.push(
        "Field-note requires primary: 'observed' and at least one claim of kind 'observed' with attestation: 'author'."
      );
    }
  } else if (data.contentKind === "playbook") {
    if (!data.practice || !Array.isArray(data.practice.steps) || data.practice.steps.length < 2) {
      issues.push("Playbook requires practice block with at least 2 steps");
    }
    if (!data.practice?.verification) {
      issues.push("Playbook practice requires verification instructions (practice.verification)");
    }
    if (!data.practice?.failureCheck) {
      issues.push("Playbook practice requires failureCheck instructions (practice.failureCheck)");
    }
  }

  // 4. Claim-to-prose mapping
  if (data.provenance && Array.isArray(data.provenance.claims)) {
    const mappingIssues = verifyClaimProseMapping(data.provenance.claims, body);
    issues.push(...mappingIssues);
  }

  // 5. Epistemic legality (incident phrasing check bound to specific observed claim)
  const authorObservedClaims = Array.isArray(data.provenance?.claims)
    ? data.provenance.claims.filter((c) => c.kind === "observed" && c.attestation === "author")
    : [];

  for (const pattern of INCIDENT_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(body)) !== null) {
      const sentenceStart = Math.max(
        0,
        body.lastIndexOf("\n", match.index),
        body.lastIndexOf(".", match.index) + 1,
        body.lastIndexOf("!", match.index) + 1,
        body.lastIndexOf("?", match.index) + 1
      );
      const nextPeriod = body.indexOf(".", match.index);
      const nextExcl = body.indexOf("!", match.index);
      const nextQ = body.indexOf("?", match.index);
      const nextNewline = body.indexOf("\n", match.index);
      const candidates = [nextPeriod, nextExcl, nextQ, nextNewline, body.length].filter((pos) => pos !== -1);
      const sentenceEnd = Math.min(...candidates);
      const sentence = body.slice(sentenceStart, sentenceEnd).trim();
      const normalizedSentence = normalizeProse(sentence);

      // Require that the author-attested observed claim covers this specific assertion
      const matchingClaim = authorObservedClaims.find((c) => {
        const normClaim = normalizeProse(c.statement);
        return (
          normalizedSentence.includes(normClaim) ||
          normClaim.includes(normalizedSentence)
        );
      });

      if (!matchingClaim) {
        issues.push(
          `Epistemic violation: Body contains first-person incident narrative ("${match[0]}") in "${sentence.slice(0, 140)}" that is not covered by any author-attested observed claim.`
        );
      }
    }
  }

  // 6. Comparative frequency qualification check (each assertion bound to its own empirical claim)
  for (const pattern of UNANCHORED_FREQUENCY_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(body)) !== null) {
      const sentenceStart = Math.max(
        0,
        body.lastIndexOf("\n", match.index),
        body.lastIndexOf(".", match.index) + 1,
        body.lastIndexOf("!", match.index) + 1,
        body.lastIndexOf("?", match.index) + 1
      );
      const nextPeriod = body.indexOf(".", match.index);
      const nextExcl = body.indexOf("!", match.index);
      const nextQ = body.indexOf("?", match.index);
      const nextNewline = body.indexOf("\n", match.index);
      const candidates = [nextPeriod, nextExcl, nextQ, nextNewline, body.length].filter((pos) => pos !== -1);
      const sentenceEnd = Math.min(...candidates);
      const sentence = body.slice(sentenceStart, sentenceEnd).trim();
      const normalizedSentence = normalizeProse(sentence);

      const empiricalSupportingClaims = Array.isArray(data.provenance?.claims)
        ? data.provenance.claims.filter(
            (c) =>
              (c.kind === "repository" || c.kind === "external") &&
              Array.isArray(c.sources) &&
              c.sources.length > 0 &&
              /(?:more|less) often/i.test(c.statement)
          )
        : [];

      const matchingEmpiricalClaim = empiricalSupportingClaims.find((c) => {
        const normClaim = normalizeProse(c.statement);
        return normalizedSentence.includes(normClaim) || normClaim.includes(normalizedSentence);
      });

      if (!matchingEmpiricalClaim) {
        issues.push(
          `Epistemic assertion: Comparative frequency statement ("${match[0]}") in "${sentence.slice(0, 140)}" requires empirical source backing (repository or external claim referencing an inspectable source). Each comparative assertion must map to its own source-backed claim.`
        );
      }
    }
  }

  return issues;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let filesToTest = [];

  if (args.file) {
    let allowedKinds = [...SYSTEMS_CONTENT_KINDS, ...SELF_CONTENT_KINDS];
    if (args.collection) {
      if (args.collection === "systems") {
        allowedKinds = SYSTEMS_CONTENT_KINDS;
      } else if (args.collection === "self") {
        allowedKinds = SELF_CONTENT_KINDS;
      } else {
        console.error(`\n[ERROR] Unsupported collection "${args.collection}". Allowed: "systems", "self".\n`);
        process.exit(1);
      }
    } else {
      // Deduce collection from file path if possible
      const normPath = path.resolve(ROOT, args.file);
      if (normPath.includes("/content/systems/") || normPath.includes("/staged/systems/")) {
        allowedKinds = SYSTEMS_CONTENT_KINDS;
      } else if (normPath.includes("/content/self/") || normPath.includes("/staged/self/")) {
        allowedKinds = SELF_CONTENT_KINDS;
      }
    }
    filesToTest = [{ path: path.resolve(ROOT, args.file), allowedKinds }];
  } else {
    for (const target of TARGET_DIRS) {
      const files = await collectFiles(target.dir, target.exts);
      for (const file of files) {
        filesToTest.push({ path: file, allowedKinds: target.allowedKinds });
      }
    }
  }

  let totalV1Files = 0;
  const failures = [];

  for (const target of filesToTest) {
    const raw = await fs.readFile(target.path, "utf8");
    if (!/schemaVersion:\s*["']1\.0["']/.test(raw)) {
      continue;
    }
    totalV1Files++;
    const issues = await validateV1File(target.path, target.allowedKinds);
    if (issues.length > 0) {
      failures.push({
        file: path.relative(ROOT, target.path),
        issues,
      });
    }
  }

  console.log(`\n── PMP Editorial Contract v1 Gate ──`);
  console.log(`Inspected ${totalV1Files} document(s) declaring schemaVersion: "1.0".`);

  if (failures.length === 0) {
    console.log(`✓ All v1 documents passed structural, referential, and epistemic validation.\n`);
    return;
  }

  console.error(`\n✗ PMP Editorial Contract v1 validation FAILED on ${failures.length} document(s):\n`);
  for (const failure of failures) {
    console.error(`File: ${failure.file}`);
    for (const issue of failure.issues) {
      console.error(`  - ${issue}`);
    }
    console.error("");
  }

  process.exitCode = 1;
}

main().catch((err) => {
  console.error("Unexpected error in lint-editorial-v1:", err);
  process.exit(1);
});
