/**
 * content-contract — the single source of truth for what makes a post
 * publishable on pruningmypothos.
 *
 * Both the verifier (scripts/websiteops-conform.mjs) and the generator
 * (flowright's ContentOps drafting step) should target THIS contract, so the
 * rule for "a publishable post" lives in exactly one place. The values here
 * are kept identical to the CI gates in lint-systems-consistency.mjs and
 * lint-content-consistency.mjs; if you change a gate, change it here too (or
 * migrate those scripts to import this module).
 */

import { z } from "zod";

const WORD_RE = /[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g;
export const countWords = (s) => (String(s).match(WORD_RE) || []).length;

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const editorial = {
  featured: z.boolean().optional(),
  contentType: z.string().optional(),
  readingTime: z.number().optional(),
  difficulty: z.string().optional(),
};

// ── systems ──────────────────────────────────────────────────────────────────
const systems = {
  ext: ".mdx",
  dir: "src/content/systems",
  minWords: 800,
  needsCover: true,
  categories: ["Explanations", "Concepts", "How-things-fit-together"],
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.enum(["Explanations", "Concepts", "How-things-fit-together"]).optional(),
      tags: z.array(z.string()).default([]),
      publishDate: z.string().optional(),
      updatedAt: z.string().optional(),
      heroImage: z.string().optional(),
      heroImageAlt: z.string().optional(),
      proofPoints: z.array(z.string()).default([]),
      faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
      ...editorial,
    })
    .passthrough(),
  body(raw, body) {
    const isV1 = /schemaVersion:\s*["']1\.0["']/.test(raw);
    const issues = [];

    if (isV1) {
      // ── PMP Editorial Contract v1 Structural Gate ──
      // Prohibit formulaic placeholder headings
      if (/^##\s+Act\s+(?:I|II|III)\b/mi.test(raw)) {
        issues.push("v1 prohibits formulaic Act headings (## Act I/II/III); use descriptive headings");
      }
      if (/^##\s+(?:Introduction|Conclusion|Deep Dive)\b/mi.test(raw)) {
        issues.push("v1 prohibits generic meta-headings (## Introduction/Conclusion/Deep Dive)");
      }
      return issues;
    }

    const w = countWords(body);
    if (w < 800) issues.push(`body < 800 words (found ${w})`);
    if (!/\*\*Key takeaways\*\*/i.test(raw)) issues.push("missing **Key takeaways** block");
    if (!/id=["']toc-anchor["']/i.test(raw)) issues.push('missing id="toc-anchor"');
    if (!/<nav\s+class=["']toc["']/i.test(raw)) issues.push('missing <nav class="toc">');
    if (!/^##\s+Act I\b/mi.test(raw)) issues.push("missing ## Act I heading");
    if (!/^##\s+Act II\b/mi.test(raw)) issues.push("missing ## Act II heading");
    if (!/^##\s+Act III\b/mi.test(raw)) issues.push("missing ## Act III heading");
    if (!/<aside\s+class=["'][^"']*callout/i.test(raw)) issues.push('missing <aside class="callout">');
    if (!/<span\s+class=["']highlight["']>/i.test(raw)) issues.push('missing <span class="highlight">');
    return issues;
  },
};

// ── self ─────────────────────────────────────────────────────────────────────
const self = {
  ext: ".md",
  dir: "src/content/self",
  minWords: 140,
  needsCover: false,
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      publishDate: z.string(),
      tags: z.array(z.string()).default([]),
      heroImage: z.string().optional(),
      heroImageAlt: z.string().optional(),
      ...editorial,
    })
    .passthrough(),
  body(raw, body) {
    const isV1 = /schemaVersion:\s*["']1\.0["']/.test(raw);
    const issues = [];

    if (isV1) {
      if (/^##\s+(?:Introduction|Conclusion|Deep Dive)\b/mi.test(raw)) {
        issues.push("v1 prohibits generic meta-headings (## Introduction/Conclusion/Deep Dive)");
      }
      return issues;
    }

    if (!/<p class="lead">/i.test(raw)) issues.push('missing <p class="lead"> lead paragraph');
    if (!(/class="highlight"/i.test(raw) || /<figure\b/i.test(raw))) issues.push("missing highlight or figure");
    const w = countWords(body);
    if (w < 140) issues.push(`body < 140 words (found ${w})`);
    return issues;
  },
};

// ── sentences ────────────────────────────────────────────────────────────────
const sentences = {
  ext: ".md",
  dir: "src/content/sentences",
  minWords: 28,
  needsCover: false,
  categories: ["Attention", "Meaning", "Judgment"],
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(["Attention", "Meaning", "Judgment"]),
    tags: z.array(z.string()).default([]),
    ...editorial,
  }),
  body(raw, body) {
    const issues = [];
    const w = countWords(body);
    if (w < 28) issues.push(`body < 28 words (found ${w})`);
    return issues;
  },
};

export const COLLECTIONS = { systems, self, sentences };
export const SUPPORTED = Object.keys(COLLECTIONS);
