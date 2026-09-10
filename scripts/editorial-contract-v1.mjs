/**
 * PMP Editorial Contract v1 — Authoritative Schema & Integrity Rules
 *
 * Enforces the publication philosophy of Pruning My Pothos:
 * "Sans Serif Sentiments: Clarity should survive complexity;
 *  absence of excess so the human signal remains."
 *
 * This module defines:
 * 1. sourceSchema: Inspectable source evidence (repository, external, paper, benchmark)
 * 2. claimSchema: Consequential claim declarations with epistemic typing and author attestation
 * 3. provenanceSchema: Document primary mode + source/claim referential integrity
 * 4. boundarySchema: Where a concept helps and where it stops
 * 5. practiceSchema: Concrete steps, verification, and failure checks for playbooks
 * 6. Claim-to-prose normalization and verification helpers
 */

import { z } from "zod";

export const SYSTEMS_CONTENT_KINDS = ["explainer", "field-note", "playbook"];
export const SELF_CONTENT_KINDS = ["essay", "field-note"];
export const ALL_V1_CONTENT_KINDS = ["explainer", "field-note", "playbook", "essay"];

export const PROVENANCE_MODES = [
  "observed",
  "repository",
  "external",
  "illustrative",
  "synthesis",
];

const SHA_40_RE = /^[0-9a-f]{40}$/i;
const ID_RE = /^[a-z0-9_-]+$/i;

// ── 1. SOURCE SCHEMA ──────────────────────────────────────────────────────────
export const sourceSchema = z
  .object({
    id: z.string().regex(ID_RE, "Source ID must be alphanumeric or kebab-case (e.g. dax-runtime)"),
    type: z.enum(["repository", "external", "benchmark", "paper"]),
    url: z.string().url("Source url must be a syntactically valid URL"),
    path: z.string().optional(),
    ref: z.string().optional(),
    citation: z.string().optional(),
  })
  .superRefine((s, ctx) => {
    if (s.type === "repository") {
      if (!s.path) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Repository source "${s.id}" requires a file path (path)`,
          path: ["path"],
        });
      }
      if (!s.ref || !SHA_40_RE.test(s.ref)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Repository source "${s.id}" requires an immutable 40-character git commit SHA in ref (found: "${s.ref || ""}")`,
          path: ["ref"],
        });
      }
    }
  });

// ── 2. CLAIM SCHEMA ───────────────────────────────────────────────────────────
export const claimSchema = z
  .object({
    statement: z.string().min(10, "Claim statement must be at least 10 characters"),
    kind: z.enum(["observed", "repository", "external", "illustrative", "synthesis"]),
    sources: z.array(z.string()).optional(),
    attestation: z.literal("author").optional(),
  })
  .superRefine((c, ctx) => {
    if (c.kind === "repository" || c.kind === "external") {
      if (!Array.isArray(c.sources) || c.sources.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Claim of kind "${c.kind}" must reference at least one source ID in sources`,
          path: ["sources"],
        });
      }
    }
    if (c.kind === "observed") {
      if (c.attestation !== "author") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Claim of kind "observed" requires attestation: "author" (generic team attestation is not permitted)`,
          path: ["attestation"],
        });
      }
    }
  });

// ── 3. PROVENANCE SCHEMA ──────────────────────────────────────────────────────
export const provenanceSchema = z
  .object({
    primary: z.enum(["observed", "repository", "external", "illustrative", "synthesis"]),
    statement: z.string().optional(),
    sources: z.array(sourceSchema).optional().default([]),
    claims: z.array(claimSchema).optional().default([]),
  })
  .superRefine((p, ctx) => {
    if (p.primary === "observed") {
      if (!p.statement || p.statement.trim().length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Primary provenance "observed" requires an author context statement (at least 10 characters)`,
          path: ["statement"],
        });
      }
    }

    const sources = p.sources || [];
    const claims = p.claims || [];

    // Referential integrity check 1: duplicate source IDs
    const seenIds = new Set();
    const sourceMap = new Map();
    for (let i = 0; i < sources.length; i++) {
      const src = sources[i];
      if (seenIds.has(src.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate source ID "${src.id}" declared in provenance.sources`,
          path: ["sources", i, "id"],
        });
      } else {
        seenIds.add(src.id);
        sourceMap.set(src.id, src);
      }
    }

    // Referential integrity check 2: resolving claim references & epistemic compatibility
    for (let i = 0; i < claims.length; i++) {
      const c = claims[i];
      const claimSources = c.sources || [];
      for (const sid of claimSources) {
        if (!sourceMap.has(sid)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Claim references unknown source ID "${sid}" (not found in provenance.sources)`,
            path: ["claims", i, "sources"],
          });
        } else {
          const src = sourceMap.get(sid);
          // Epistemic compatibility
          if (c.kind === "repository" && src.type !== "repository") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Repository claim "${c.statement}" references non-repository source "${sid}" (type: ${src.type})`,
              path: ["claims", i, "sources"],
            });
          }
          if (
            c.kind === "external" &&
            !["external", "paper", "benchmark"].includes(src.type)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `External claim "${c.statement}" references incompatible source "${sid}" (type: ${src.type})`,
              path: ["claims", i, "sources"],
            });
          }
        }
      }
    }
  });

// ── 4. BOUNDARY SCHEMA ────────────────────────────────────────────────────────
export const boundarySchema = z.object({
  is: z.string().min(10, "boundary.is must describe what the concept/system is (min 10 chars)"),
  isNot: z.string().min(10, "boundary.isNot must describe what it does not guarantee (min 10 chars)"),
  mattersWhen: z.string().min(10, "boundary.mattersWhen must describe when the boundary matters (min 10 chars)"),
});

// ── 5. PRACTICE SCHEMA (FOR PLAYBOOKS) ─────────────────────────────────────────
export const practiceStepSchema = z.union([
  z.string().min(5),
  z.object({
    title: z.string().min(3),
    detail: z.string().min(10),
  }),
]);

export const practiceSchema = z.object({
  title: z.string().optional(),
  steps: z.array(practiceStepSchema).min(2, "Playbook practice must contain at least 2 steps"),
  verification: z.string().min(10, "Playbook practice requires verification instructions (min 10 chars)"),
  failureCheck: z.string().min(10, "Playbook practice requires failureCheck instructions (min 10 chars)"),
});

// ── 6. V1 EDITORIAL CONTRACT FIELDS ───────────────────────────────────────────
export const editorialContractV1Fields = {
  schemaVersion: z.literal("1.0"),
  contentKind: z.enum(["explainer", "field-note", "playbook", "essay"]),
  readerIntent: z.enum(["understand", "inspect", "use", "reflect"]),
  readerOutcome: z.string().min(20, "readerOutcome must describe reader capability/insight (min 20 chars)"),
  thesis: z.string().min(10, "thesis must state the core argument (min 10 chars)"),
  boundary: boundarySchema.optional(),
  practice: practiceSchema.optional(),
  provenance: provenanceSchema,
  language: z
    .object({
      profile: z.string().default("sans-serif-sentiments"),
      recipe: z
        .enum([
          "pmp-systems-explainer",
          "pmp-field-note",
          "pmp-teardown",
          "pmp-playbook",
          "pmp-sentiment",
        ])
        .optional(),
    })
    .optional(),
};

// ── 7. PROSE NORMALIZATION & CLAIM TRACEABILITY ────────────────────────────────
export function normalizeProse(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[#*_`~[\]()<>\\-]/g, " ")
    .replace(/['’"“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Verifies that each declared claim statement corresponds to an actual
 * assertion in the body prose.
 */
export function verifyClaimProseMapping(claims, rawBody) {
  const issues = [];
  if (!Array.isArray(claims) || claims.length === 0) return issues;

  const normalizedBody = normalizeProse(rawBody);

  for (const claim of claims) {
    const normalizedClaim = normalizeProse(claim.statement);
    if (!normalizedClaim) continue;

    // Check exact substring match first
    if (normalizedBody.includes(normalizedClaim)) {
      continue;
    }

    // Fallback: check if significant words (>= 4 chars) appear in close proximity
    const words = normalizedClaim.split(" ").filter((w) => w.length >= 4);
    if (words.length >= 3) {
      const matchCount = words.filter((w) => normalizedBody.includes(w)).length;
      if (matchCount / words.length >= 0.75) {
        continue;
      }
    }

    issues.push(
      `Claim statement not found in article body: "${claim.statement.slice(0, 70)}..."`
    );
  }

  return issues;
}
