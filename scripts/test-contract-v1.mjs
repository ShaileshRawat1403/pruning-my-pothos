#!/usr/bin/env node
/**
 * test-contract-v1.mjs — Comprehensive Regression Test Suite for PMP Editorial Contract v1
 *
 * Test Cases:
 *  1. Valid v1 explainer passes with 0 issues
 *  2. Unverified incident phrasing in unobserved document is rejected
 *  3. Dangling source reference is rejected
 *  4. Mutable git ref (not 40-char SHA) is rejected
 *  5. Claim not in body prose is rejected (unmatched claim)
 *  6. Repository claim referencing non-repository source is rejected
 *  7. External claim referencing incompatible source is rejected
 *  8. Observed claim without author attestation is rejected
 *  9. Partial v1 document (missing boundary / readerOutcome) is rejected
 * 10. Playbook missing practice.verification is rejected
 * 11. Playbook missing practice.failureCheck is rejected
 * 12. Valid author-attested field note passes cleanly
 * 13. websiteops-conform preserves all v1 metadata fields without loss
 */

import { validateV1File } from "./lint-editorial-v1.mjs";
import { conformFrontmatter, V1_PRESERVED_KEYS } from "./websiteops-conform.mjs";
import { validateAllRecipes } from "./validate-languageops-recipes.mjs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();

async function runTests() {
  console.log("\n── Running PMP Editorial Contract v1 Regression Test Suite ──\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  // Test 1: Valid v1 explainer
  const validPath = path.resolve(ROOT, "tests/fixtures/valid-v1-explainer.mdx");
  const validIssues = await validateV1File(validPath, ["explainer", "field-note", "playbook"]);
  assert(
    validIssues.length === 0,
    `Test 1: valid-v1-explainer.mdx passes cleanly (found ${validIssues.length} issues)`
  );

  // Test 2: Invalid unverified incident phrasing
  const incidentPath = path.resolve(ROOT, "tests/fixtures/invalid-unverified-incident.md");
  const incidentIssues = await validateV1File(incidentPath, ["essay", "field-note"]);
  assert(
    incidentIssues.some((i) => i.includes("Epistemic violation")),
    `Test 2: invalid-unverified-incident.md triggers epistemic violation for unverified incident phrasing`
  );

  // Test 3: Invalid dangling source
  const danglingPath = path.resolve(ROOT, "tests/fixtures/invalid-dangling-source.mdx");
  const danglingIssues = await validateV1File(danglingPath, ["explainer", "field-note", "playbook"]);
  assert(
    danglingIssues.some((i) => i.includes("unknown source ID") || i.includes("non-existent-source-id")),
    `Test 3: invalid-dangling-source.mdx triggers source referential integrity error for unknown source ID`
  );

  // Test 4: Invalid mutable ref
  const mutablePath = path.resolve(ROOT, "tests/fixtures/invalid-mutable-ref.mdx");
  const mutableIssues = await validateV1File(mutablePath, ["explainer", "field-note", "playbook"]);
  assert(
    mutableIssues.some((i) => i.includes("40-character git commit SHA")),
    `Test 4: invalid-mutable-ref.mdx triggers repository contract error for mutable branch ref`
  );

  // Test 5: Claim not in prose -> reject
  const unmatchedPath = path.resolve(ROOT, "tests/fixtures/invalid-unmatched-claim.mdx");
  const unmatchedIssues = await validateV1File(unmatchedPath, ["explainer", "field-note", "playbook"]);
  assert(
    unmatchedIssues.some((i) => i.includes("Claim statement not found in article body")),
    `Test 5: invalid-unmatched-claim.mdx rejected because declared claim is not in body prose`
  );

  // Test 6: Repository claim to non-repo source -> reject
  const repoNonRepoPath = path.resolve(ROOT, "tests/fixtures/invalid-repo-claim-non-repo-source.mdx");
  const repoNonRepoIssues = await validateV1File(repoNonRepoPath, ["explainer", "field-note", "playbook"]);
  assert(
    repoNonRepoIssues.some((i) => i.includes("references non-repository source")),
    `Test 6: invalid-repo-claim-non-repo-source.mdx rejected because repository claim references non-repo source`
  );

  // Test 7: External claim to incompatible source -> reject
  const extIncompatPath = path.resolve(ROOT, "tests/fixtures/invalid-external-claim-incompatible-source.mdx");
  const extIncompatIssues = await validateV1File(extIncompatPath, ["explainer", "field-note", "playbook"]);
  assert(
    extIncompatIssues.some((i) => i.includes("references incompatible source")),
    `Test 7: invalid-external-claim-incompatible-source.mdx rejected because external claim references incompatible source`
  );

  // Test 8: Observed claim without author attestation -> reject
  const observedWithoutAuthorPath = path.resolve(ROOT, "tests/fixtures/invalid-observed-without-author.mdx");
  const observedWithoutAuthorIssues = await validateV1File(observedWithoutAuthorPath, ["explainer", "field-note", "playbook"]);
  assert(
    observedWithoutAuthorIssues.some((i) => i.includes('requires attestation: "author"')),
    `Test 8: invalid-observed-without-author.mdx rejected because observed claim lacks author attestation`
  );

  // Test 9: Partial v1 document -> reject (missing boundary or readerOutcome)
  const partialV1Path = path.resolve(ROOT, "tests/fixtures/invalid-partial-v1-missing-fields.mdx");
  const partialV1Issues = await validateV1File(partialV1Path, ["explainer", "field-note", "playbook"]);
  assert(
    partialV1Issues.some((i) => i.includes("readerOutcome") || i.includes("boundary")),
    `Test 9: invalid-partial-v1-missing-fields.mdx rejected because required v1 fields are missing`
  );

  // Test 10: Playbook missing verification -> reject
  const playbookMissingVerifPath = path.resolve(ROOT, "tests/fixtures/invalid-playbook-missing-verification.mdx");
  const playbookMissingVerifIssues = await validateV1File(playbookMissingVerifPath, ["explainer", "field-note", "playbook"]);
  assert(
    playbookMissingVerifIssues.some((i) => i.includes("verification")),
    `Test 10: invalid-playbook-missing-verification.mdx rejected because playbook practice lacks verification`
  );

  // Test 11: Playbook missing failureCheck -> reject
  const playbookMissingFailCheckPath = path.resolve(ROOT, "tests/fixtures/invalid-playbook-missing-failure-check.mdx");
  const playbookMissingFailCheckIssues = await validateV1File(playbookMissingFailCheckPath, ["explainer", "field-note", "playbook"]);
  assert(
    playbookMissingFailCheckIssues.some((i) => i.includes("failureCheck")),
    `Test 11: invalid-playbook-missing-failure-check.mdx rejected because playbook practice lacks failureCheck`
  );

  // Test 12: Valid author-attested field note -> pass
  const validFieldNotePath = path.resolve(ROOT, "tests/fixtures/valid-v1-field-note.md");
  const validFieldNoteIssues = await validateV1File(validFieldNotePath, ["essay", "field-note"]);
  assert(
    validFieldNoteIssues.length === 0,
    `Test 12: valid-v1-field-note.md passes cleanly with 0 issues`
  );

  // Test 13: websiteops v1 metadata preservation
  const mockV1Packet = {
    title: "Testing Conformed v1 Packet",
    description: "Verifies that websiteops-conform preserves all v1 fields.",
    schemaVersion: "1.0",
    contentKind: "explainer",
    readerIntent: "understand",
    readerOutcome: "Verify complete metadata preservation across pipelines.",
    thesis: "Conform pipelines must preserve authorial provenance without loss.",
    shortAnswer: "A policy-governed runtime moves authorization out of the prompt and into a deterministic host supervisor. The model proposes tool calls, but the host environment verifies permissions against immutable rules before execution begins.",
    boundary: {
      is: "A test boundary description.",
      isNot: "Production systems code.",
      mattersWhen: "Testing conformity preservation.",
    },
    practice: {
      steps: ["Step 1 description", "Step 2 description"],
      verification: "Confirm stdout returns success code zero.",
      failureCheck: "Check stderr for silent failures.",
    },
    provenance: {
      primary: "synthesis",
      sources: [
        { id: "ext-1", type: "external", url: "https://example.com/docs" },
      ],
      claims: [
        { statement: "Conform pipelines must preserve authorial provenance without loss.", kind: "external", sources: ["ext-1"] },
      ],
    },
    language: {
      profile: "sans-serif-sentiments",
      recipe: "pmp-systems-explainer",
    },
  };

  const conformedSystems = conformFrontmatter("systems", mockV1Packet, "testing-conformed-v1-packet");
  const conformedSelf = conformFrontmatter("self", mockV1Packet, "testing-conformed-v1-packet");

  const preservedKeysSystems = V1_PRESERVED_KEYS.every((k) => conformedSystems[k] !== undefined);
  const preservedKeysSelf = ["schemaVersion", "contentKind", "readerIntent", "readerOutcome", "thesis", "boundary", "provenance", "language"].every(
    (k) => conformedSelf[k] !== undefined
  );
  const noForcedCategory = conformedSystems.category === undefined;

  assert(
    preservedKeysSystems && preservedKeysSelf && noForcedCategory,
    `Test 13: websiteops-conform preserves all v1 metadata keys without loss (systems & self) and does not force legacy category on v1`
  );

  // Test 14: LanguageOps recipe validation
  const recipeResults = await validateAllRecipes();
  const allRecipesValid = recipeResults.length > 0 && recipeResults.every((r) => r.issues.length === 0);
  assert(
    allRecipesValid,
    `Test 14: all 5 LanguageOps recipes conform strictly to canonical schema & referential integrity`
  );

  // Test 15: Invalid fuzzy word scattering -> reject
  const fuzzyPath = path.resolve(ROOT, "tests/fixtures/invalid-fuzzy-word-claim.mdx");
  const fuzzyIssues = await validateV1File(fuzzyPath, ["explainer", "field-note", "playbook"]);
  assert(
    fuzzyIssues.some((i) => i.includes("Claim statement not found in article body")),
    `Test 15: invalid-fuzzy-word-claim.mdx rejected because scattered words do not satisfy contiguous assertion`
  );

  // Test 16: Invalid unrelated incident in observed document -> reject
  const unrelatedIncidentPath = path.resolve(ROOT, "tests/fixtures/invalid-unrelated-incident.md");
  const unrelatedIncidentIssues = await validateV1File(unrelatedIncidentPath, ["essay", "field-note"]);
  assert(
    unrelatedIncidentIssues.some((i) => i.includes("Epistemic violation") && i.includes("we received a bug report")),
    `Test 16: invalid-unrelated-incident.md rejected because unbacked incident is not covered by author-attested claim`
  );

  // Test 17: Invalid field-note with synthesis provenance -> reject
  const fieldNoteSynthPath = path.resolve(ROOT, "tests/fixtures/invalid-fieldnote-synthesis.md");
  const fieldNoteSynthIssues = await validateV1File(fieldNoteSynthPath, ["essay", "field-note"]);
  assert(
    fieldNoteSynthIssues.some((i) => i.includes("field-note requires primary: 'observed'") || i.includes("Field-note requires primary")),
    `Test 17: invalid-fieldnote-synthesis.md rejected because field-note lacks author-attested observed provenance`
  );

  // Test 18: Invalid comparative frequency backed only by synthesis -> reject
  const compSynthPath = path.resolve(ROOT, "tests/fixtures/invalid-comparative-frequency-synthesis.mdx");
  const compSynthIssues = await validateV1File(compSynthPath, ["explainer", "field-note", "playbook"]);
  assert(
    compSynthIssues.some((i) => i.includes("Comparative frequency statement") && i.includes("requires empirical source backing")),
    `Test 18: invalid-comparative-frequency-synthesis.mdx rejected because comparative frequency cannot be authorized by synthesis`
  );

  // Test 19: Invalid comparative frequency backed only by observed experience -> reject
  const compObsPath = path.resolve(ROOT, "tests/fixtures/invalid-comparative-frequency-observed.mdx");
  const compObsIssues = await validateV1File(compObsPath, ["explainer", "field-note", "playbook"]);
  assert(
    compObsIssues.some((i) => i.includes("Comparative frequency statement") && i.includes("requires empirical source backing")),
    `Test 19: invalid-comparative-frequency-observed.mdx rejected because comparative frequency cannot be authorized by observed experience alone`
  );

  // Test 20: Valid comparative frequency backed by empirical benchmark source -> pass
  const compSourcedPath = path.resolve(ROOT, "tests/fixtures/valid-comparative-frequency-sourced.mdx");
  const compSourcedIssues = await validateV1File(compSourcedPath, ["explainer", "field-note", "playbook"]);
  assert(
    compSourcedIssues.length === 0,
    `Test 20: valid-comparative-frequency-sourced.mdx passes cleanly with empirical benchmark source backing`
  );

  // Test 21: Invalid explainer missing shortAnswer -> reject
  const missingShortAnswerPath = path.resolve(ROOT, "tests/fixtures/invalid-explainer-missing-short-answer.mdx");
  const missingShortAnswerIssues = await validateV1File(missingShortAnswerPath, ["explainer", "field-note", "playbook"]);
  assert(
    missingShortAnswerIssues.some((i) => i.includes("shortAnswer")),
    `Test 21: invalid-explainer-missing-short-answer.mdx rejected because explainer lacks mandatory shortAnswer field`
  );

  // Test 22: WebsiteOps negative path 1 (unmatched claim)
  const conformNegRes1 = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/invalid-unmatched-claim.mdx", "--collection", "systems"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert(
    conformNegRes1.status === 1 && conformNegRes1.stdout.includes("NOT READY"),
    `Test 22: websiteops-conform negative path 1 (unmatched claim) exits with code 1 and reports NOT READY`
  );

  // Test 23: WebsiteOps negative path 2 (dangling source)
  const conformNegRes2 = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/invalid-dangling-source.mdx", "--collection", "systems"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert(
    conformNegRes2.status === 1 && conformNegRes2.stdout.includes("NOT READY"),
    `Test 23: websiteops-conform negative path 2 (dangling source) exits with code 1 and reports NOT READY`
  );

  // Test 24: WebsiteOps positive path (valid v1 explainer)
  const conformPosRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/valid-v1-explainer.mdx", "--collection", "systems"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert(
    conformPosRes.status === 0 && conformPosRes.stdout.includes("READY"),
    `Test 24: websiteops-conform positive path (valid v1 explainer) exits with code 0 and reports READY`
  );

  console.log(`\nRegression Suite Results: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test suite error:", err);
  process.exit(1);
});
