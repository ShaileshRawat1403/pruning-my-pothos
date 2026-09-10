#!/usr/bin/env node
/**
 * validate-languageops-recipes.mjs
 *
 * Validates that all bundled recipes in .agents/skills/pruningmypothos-editorial/recipes/
 * conform to the LanguageOps canonical Recipe Schema and Referential Integrity contract:
 * - schema_version: \d+\.\d+
 * - id: recipe.[a-z0-9_-]+
 * - filename matches: recipe.<name> -> <name>.yaml
 * - valid intents from LanguageOps registry
 * - valid context_profiles from LanguageOps registry
 * - valid recommended_primitives from LanguageOps registry/packs
 * - valid avoid_anti_patterns from LanguageOps registry/packs
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = process.cwd();
const RECIPES_DIR = path.resolve(ROOT, ".agents/skills/pruningmypothos-editorial/recipes");

export const KNOWN_INTENTS = new Set([
  "intent.answer",
  "intent.explain",
  "intent.rewrite",
  "intent.review",
  "intent.clarify",
  "intent.reflect",
  "intent.respond-professionally",
]);

export const KNOWN_CONTEXT_PROFILES = new Set([
  "context-profile.technical-explanation",
  "context-profile.reflective-writing",
  "context-profile.natural-conversation",
  "context-profile.professional-response",
  "context-profile.linkedin-post",
]);

export const KNOWN_PRIMITIVES = new Set([
  "primitive.audience-fit",
  "primitive.cadence-variation",
  "primitive.clarification-before-assumption",
  "primitive.clause-balance",
  "primitive.compression",
  "primitive.context-awareness",
  "primitive.direct-answer",
  "primitive.evidence-before-claim",
  "primitive.example-when-needed",
  "primitive.meaning-preservation",
  "primitive.natural-connective-tissue",
  "primitive.one-main-idea-per-sentence",
  "primitive.paragraph-progression",
  "primitive.parallel-structure",
  "primitive.plain-language",
  "primitive.restraint",
  "primitive.selective-expansion",
  "primitive.sentence-opening-variation",
  "primitive.specificity",
  "primitive.stop-after-resolution",
  "primitive.strong-verb-preference",
  "primitive.subject-clarity",
  "primitive.uncertainty-preservation",
  // Nuance Navigator Pack primitives
  "primitive.controlled-contrast",
  "primitive.earned-anaphora",
  "primitive.measured-metaphor",
  "primitive.minimalist-close",
  "primitive.restrained-humour",
]);

export const KNOWN_ANTI_PATTERNS = new Set([
  "anti-pattern.abstract-ending",
  "anti-pattern.academic-distancing",
  "anti-pattern.adverbial-padding",
  "anti-pattern.cliche-reliance",
  "anti-pattern.conceptual-vagueness",
  "anti-pattern.connective-density-overuse",
  "anti-pattern.delve-reliance",
  "anti-pattern.didactic-tone",
  "anti-pattern.excessive-bulleting",
  "anti-pattern.false-urgency",
  "anti-pattern.forced-parallelism",
  "anti-pattern.fragmented-paragraph-structure",
  "anti-pattern.hedging-overuse",
  "anti-pattern.hyperbolic-intro",
  "anti-pattern.long-clause-pileup",
  "anti-pattern.nominalization-bloat",
  "anti-pattern.noun-stack-overload",
  "anti-pattern.over-transitioning",
  "anti-pattern.passive-voice-escape",
  "anti-pattern.redundant-doublets",
  "anti-pattern.repeated-sentence-opening",
  "anti-pattern.robotic-empathy",
  "anti-pattern.short-sentence-staccato",
  "anti-pattern.soft-vagueness",
  "anti-pattern.structure-without-progression",
  "anti-pattern.summary-wrap",
  "anti-pattern.sycophantic-agreement",
  "anti-pattern.tapestry-metaphor",
  "anti-pattern.throat-clearing",
  "anti-pattern.weak-verb-chain",
  "anti-pattern.word-count-padding",
  // AI-isms & Banned Packs
  "anti-pattern.confessional-opener",
  "anti-pattern.false-pivot-question",
  "anti-pattern.manufactured-stillness",
  "anti-pattern.ai-vocabulary-cluster",
  "anti-pattern.false-range-construction",
  "anti-pattern.legacy-importance-puffery",
  "anti-pattern.mechanical-synonym-cycling",
  "anti-pattern.narrator-as-analyst",
  "anti-pattern.negative-parallelism",
  "anti-pattern.promotional-brochure-language",
  "anti-pattern.staccato-fragment-streak",
  "anti-pattern.trailing-participle-pileup",
  "anti-pattern.triple-beat-list-overuse",
  "anti-pattern.forced-wit",
]);

export async function validateRecipeFile(filePath) {
  const issues = [];
  const fileName = path.basename(filePath);
  const raw = await fs.readFile(filePath, "utf8");
  let data;
  try {
    data = yaml.load(raw);
  } catch (err) {
    return [`YAML parse error: ${err.message}`];
  }

  if (typeof data !== "object" || data === null) {
    return ["Recipe root must be an object."];
  }

  // Schema Version
  if (!data.schema_version || !/^\d+\.\d+$/.test(String(data.schema_version))) {
    issues.push(`Invalid or missing schema_version: "${data.schema_version}" (expected ^\\d+\\.\\d+$)`);
  }

  // ID
  if (!data.id || !/^recipe\.[a-z0-9_-]+$/.test(data.id)) {
    issues.push(`Invalid or missing id: "${data.id}" (expected ^recipe\\.[a-z0-9_-]+$)`);
  } else {
    const expectedFileName = `${data.id.split(".").slice(1).join(".")}.yaml`;
    if (fileName !== expectedFileName) {
      issues.push(`Filename mismatch: recipe id "${data.id}" requires filename "${expectedFileName}", got "${fileName}"`);
    }
  }

  // Name & Description
  if (typeof data.name !== "string" || data.name.trim().length === 0) {
    issues.push("Recipe requires non-empty string name.");
  }
  if (typeof data.description !== "string" || data.description.trim().length === 0) {
    issues.push("Recipe requires non-empty string description.");
  }

  // Intents
  if (!Array.isArray(data.intents) || data.intents.length === 0) {
    issues.push("Recipe must declare at least one intent in 'intents'.");
  } else {
    for (const intent of data.intents) {
      if (!KNOWN_INTENTS.has(intent)) {
        issues.push(`Referential integrity error: unknown Intent "${intent}"`);
      }
    }
  }

  // Context Profiles
  if (!Array.isArray(data.context_profiles) || data.context_profiles.length === 0) {
    issues.push("Recipe must declare at least one context profile in 'context_profiles'.");
  } else {
    for (const cp of data.context_profiles) {
      if (!KNOWN_CONTEXT_PROFILES.has(cp)) {
        issues.push(`Referential integrity error: unknown Context Profile "${cp}"`);
      }
    }
  }

  // Recommended Primitives
  if (!Array.isArray(data.recommended_primitives) || data.recommended_primitives.length === 0) {
    issues.push("Recipe must declare at least one recommended primitive in 'recommended_primitives'.");
  } else {
    for (const prim of data.recommended_primitives) {
      if (!KNOWN_PRIMITIVES.has(prim)) {
        issues.push(`Referential integrity error: unknown Primitive "${prim}"`);
      }
    }
  }

  // Avoid Anti-Patterns
  if (!Array.isArray(data.avoid_anti_patterns) || data.avoid_anti_patterns.length === 0) {
    issues.push("Recipe must declare at least one avoided anti-pattern in 'avoid_anti_patterns'.");
  } else {
    for (const ap of data.avoid_anti_patterns) {
      if (!KNOWN_ANTI_PATTERNS.has(ap)) {
        issues.push(`Referential integrity error: unknown Anti-Pattern "${ap}"`);
      }
    }
  }

  // Protected Primitives (Optional)
  if (data.protected_primitives) {
    if (!Array.isArray(data.protected_primitives)) {
      issues.push("protected_primitives must be an array");
    } else {
      for (const prim of data.protected_primitives) {
        if (!KNOWN_PRIMITIVES.has(prim)) {
          issues.push(`Referential integrity error in protected_primitives: unknown Primitive "${prim}"`);
        }
      }
    }
  }

  // Tolerated Anti-Patterns (Optional)
  if (data.tolerated_anti_patterns) {
    if (!Array.isArray(data.tolerated_anti_patterns)) {
      issues.push("tolerated_anti_patterns must be an array");
    } else {
      const avoidSet = new Set(data.avoid_anti_patterns || []);
      for (const ap of data.tolerated_anti_patterns) {
        if (!KNOWN_ANTI_PATTERNS.has(ap)) {
          issues.push(`Referential integrity error in tolerated_anti_patterns: unknown Anti-Pattern "${ap}"`);
        }
        if (avoidSet.has(ap)) {
          issues.push(`Contradiction: recipe both avoids and tolerates "${ap}"`);
        }
      }
    }
  }

  return issues;
}

export async function validateAllRecipes() {
  const entries = await fs.readdir(RECIPES_DIR);
  const yamlFiles = entries.filter((e) => e.endsWith(".yaml") || e.endsWith(".yml"));
  const allResults = [];

  for (const file of yamlFiles) {
    const filePath = path.join(RECIPES_DIR, file);
    const issues = await validateRecipeFile(filePath);
    allResults.push({ file, issues });
  }

  return allResults;
}

async function main() {
  console.log("\n── Validating LanguageOps Recipe Compatibility ──\n");
  const results = await validateAllRecipes();
  let failed = false;

  for (const r of results) {
    if (r.issues.length === 0) {
      console.log(`  ✓ ${r.file} passes LanguageOps recipe schema & referential integrity`);
    } else {
      failed = true;
      console.error(`  ✗ FAIL: ${r.file}`);
      for (const issue of r.issues) {
        console.error(`     - ${issue}`);
      }
    }
  }

  console.log("");
  if (failed) {
    process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
