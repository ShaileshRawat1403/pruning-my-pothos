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
import { promises as fs, existsSync } from "node:fs";
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

  // Test 14: LanguageOps recipe validation against pinned snapshot
  const recipeResults = await validateAllRecipes();
  const allRecipesValid = recipeResults.length > 0 && recipeResults.every((r) => r.issues.length === 0);
  assert(
    allRecipesValid,
    `Test 14: all 5 LanguageOps recipes conform strictly to pinned LanguageOps contract snapshot (41f24f1)`
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

  // Test 20: Valid comparative frequency with declared empirical source -> structural pass
  const compSourcedPath = path.resolve(ROOT, "tests/fixtures/valid-comparative-frequency-declared-source.mdx");
  const compSourcedIssues = await validateV1File(compSourcedPath, ["explainer", "field-note", "playbook"]);
  assert(
    compSourcedIssues.length === 0,
    `Test 20: valid-comparative-frequency-declared-source.mdx satisfies structural contract for declared empirical sources`
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

  // Test 25: Extension scan: v1 Systems .md format validated
  const sysMdPath = path.resolve(ROOT, "tests/fixtures/valid-v1-systems.md");
  const sysMdIssues = await validateV1File(sysMdPath, ["explainer", "field-note", "playbook"]);
  assert(
    sysMdIssues.length === 0,
    `Test 25: v1 Systems .md format is validated and passes structural contract`
  );

  // Test 26: Extension scan: v1 Self .mdx format validated
  const selfMdxPath = path.resolve(ROOT, "tests/fixtures/valid-v1-self.mdx");
  const selfMdxIssues = await validateV1File(selfMdxPath, ["essay", "field-note"]);
  assert(
    selfMdxIssues.length === 0,
    `Test 26: v1 Self .mdx format is validated and passes structural contract`
  );

  // Test 27: Cross-collection scoping: Self + explainer rejected
  const selfExplainerRes = spawnSync(
    "node",
    ["scripts/lint-editorial-v1.mjs", "--file", "tests/fixtures/invalid-self-explainer.md", "--collection", "self"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert(
    selfExplainerRes.status === 1 && (selfExplainerRes.stderr + selfExplainerRes.stdout).includes('Invalid contentKind "explainer" for collection'),
    `Test 27: Self collection + contentKind 'explainer' is rejected by collection scoping`
  );

  // Test 28: Cross-collection scoping: Systems + essay rejected
  const sysEssayRes = spawnSync(
    "node",
    ["scripts/lint-editorial-v1.mjs", "--file", "tests/fixtures/invalid-systems-essay.mdx", "--collection", "systems"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert(
    sysEssayRes.status === 1 && (sysEssayRes.stderr + sysEssayRes.stdout).includes('Invalid contentKind "essay" for collection'),
    `Test 28: Systems collection + contentKind 'essay' is rejected by collection scoping`
  );

  // Test 29: Duplicate trigger phrase unbacked incident rejected
  const dupTriggerPath = path.resolve(ROOT, "tests/fixtures/invalid-duplicate-trigger-unbacked-incident.md");
  const dupTriggerIssues = await validateV1File(dupTriggerPath, ["essay", "field-note"]);
  assert(
    dupTriggerIssues.some((i) => i.includes("Epistemic violation") && i.includes("database corruption")),
    `Test 29: duplicate trigger phrase incident is rejected when assertion does not map to author-attested claim`
  );

  // Test 30: Partially unbacked comparative frequency assertions rejected
  const partialCompPath = path.resolve(ROOT, "tests/fixtures/invalid-partial-unbacked-comparative.mdx");
  const partialCompIssues = await validateV1File(partialCompPath, ["explainer", "field-note", "playbook"]);
  assert(
    partialCompIssues.some((i) => i.includes("Comparative frequency statement") && i.includes("Each comparative assertion must map")),
    `Test 30: unbacked comparative frequency assertion is rejected even when document has another backed comparative claim`
  );

  // Test 31: WebsiteOps transactional promotion leaves src/content untouched on failure
  const targetPromoteFile = path.resolve(ROOT, "src/content/systems/unmatched-claim-example.mdx");
  try { await fs.unlink(targetPromoteFile); } catch {}

  const promoteNegRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/invalid-unmatched-claim.mdx", "--collection", "systems", "--promote"],
    { cwd: ROOT, encoding: "utf8" }
  );
  const fileExistsAfterFailedPromote = existsSync(targetPromoteFile);
  assert(
    promoteNegRes.status === 1 && promoteNegRes.stdout.includes("NOT READY") && !fileExistsAfterFailedPromote,
    `Test 31: websiteops-conform with --promote leaves src/content untouched when prerequisite gate fails`
  );

  // Test 32: Prohibited Vale prose pattern actively blocks WebsiteOps
  const valeBlockRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/invalid-vale-prose-pattern.mdx", "--collection", "systems"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert(
    valeBlockRes.status === 1 &&
      /vale v1 gate\s+✗\s*fails/.test(valeBlockRes.stdout) &&
      valeBlockRes.stdout.includes("NOT READY"),
    `Test 32: prohibited Vale prose pattern actively blocks WebsiteOps from marking draft READY`
  );

  // Test 33: Vale unavailable fails closed and blocks WebsiteOps from marking draft READY
  const valeMissingRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/valid-v1-explainer.mdx", "--collection", "systems"],
    { cwd: ROOT, encoding: "utf8", env: { ...process.env, VALE_FORCE_MISSING: "1" } }
  );
  assert(
    valeMissingRes.status === 1 &&
      /vale v1 gate\s+✗\s*fails/.test(valeMissingRes.stdout) &&
      valeMissingRes.stdout.includes("NOT READY"),
    `Test 33: WebsiteOps v1 validation with Vale unavailable fails closed and does NOT report READY`
  );

  // Test 34: Reject unsupported values passed to --collection
  const invalidCollRes = spawnSync(
    "node",
    ["scripts/lint-editorial-v1.mjs", "--file", "tests/fixtures/valid-v1-explainer.mdx", "--collection", "unsupported-collection"],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert(
    invalidCollRes.status === 1 &&
      (invalidCollRes.stderr + invalidCollRes.stdout).includes('Unsupported collection "unsupported-collection"'),
    `Test 34: unsupported collection passed to lint-editorial-v1.mjs is rejected with code 1`
  );

  // Test 35: Safe promotion rollback A: new file + downstream gate failure -> new file absent after rollback
  const destNewArticle = path.resolve(ROOT, "src/content/systems/downstream-fail-duplicate-cover.mdx");
  try { await fs.unlink(destNewArticle); } catch {}

  const rollbackNewRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/downstream-fail-duplicate-cover.mdx", "--collection", "systems", "--promote"],
    { cwd: ROOT, encoding: "utf8" }
  );
  const newArticleExistsAfterRollback = existsSync(destNewArticle);
  assert(
    rollbackNewRes.status === 1 &&
      rollbackNewRes.stdout.includes("NOT READY") &&
      rollbackNewRes.stdout.includes("rollback") &&
      !newArticleExistsAfterRollback,
    `Test 35: safe rollback A: new file is absent after post-promotion downstream gate failure`
  );

  // Test 36: Safe promotion rollback B: existing file + downstream gate failure -> original bytes restored exactly
  const destExistingArticle = path.resolve(ROOT, "src/content/systems/test-rollback-existing-target.mdx");
  const originalArticleContent = "--- original article bytes before failed promote ---";
  await fs.writeFile(destExistingArticle, originalArticleContent, "utf8");

  const rollbackExistingRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/downstream-fail-duplicate-cover.mdx", "--collection", "systems", "--slug", "test-rollback-existing-target", "--promote"],
    { cwd: ROOT, encoding: "utf8" }
  );
  const restoredArticleContent = await fs.readFile(destExistingArticle, "utf8");
  try { await fs.unlink(destExistingArticle); } catch {}
  assert(
    rollbackExistingRes.status === 1 &&
      rollbackExistingRes.stdout.includes("NOT READY") &&
      rollbackExistingRes.stdout.includes("restored original article") &&
      restoredArticleContent === originalArticleContent,
    `Test 36: safe rollback B: existing article content is restored exactly after downstream gate failure`
  );

  // Test 37: Safe promotion rollback C: public cover state restored exactly after downstream gate failure
  const testCoverNewPath = path.resolve(ROOT, "public/covers/systems/test-rollback-cover-temp.svg");
  const testCoverExistingPath = path.resolve(ROOT, "public/covers/systems/test-rollback-cover-existing.svg");
  const tempBrokenSelf = path.resolve(ROOT, "src/content/self/temp-broken-downstream.md");
  try { await fs.unlink(testCoverNewPath); } catch {}
  try { await fs.unlink(tempBrokenSelf); } catch {}

  // Plant downstream gate failure
  await fs.writeFile(tempBrokenSelf, "broken content without valid frontmatter or word count", "utf8");

  // Part C1: New generated cover rollback (cover was absent before promote; must be removed after rollback)
  const rollbackCoverNewRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/valid-v1-explainer.mdx", "--collection", "systems", "--slug", "test-rollback-cover-temp", "--promote"],
    { cwd: ROOT, encoding: "utf8" }
  );
  const newCoverExistsAfterRollback = existsSync(testCoverNewPath);
  try { await fs.unlink(path.resolve(ROOT, "src/content/systems/test-rollback-cover-temp.mdx")); } catch {}

  // Part C2: Existing public cover rollback (cover existed before promote; original bytes must be restored)
  const originalCoverBytes = "<svg>ORIGINAL_COVER_BYTES_EXISTS</svg>";
  await fs.writeFile(testCoverExistingPath, originalCoverBytes, "utf8");

  const rollbackCoverExistingRes = spawnSync(
    "node",
    ["scripts/websiteops-conform.mjs", "--in", "tests/fixtures/valid-v1-explainer.mdx", "--collection", "systems", "--slug", "test-rollback-cover-existing", "--promote"],
    { cwd: ROOT, encoding: "utf8" }
  );
  const restoredCoverBytes = await fs.readFile(testCoverExistingPath, "utf8");

  // Clean up test state
  try { await fs.unlink(tempBrokenSelf); } catch {}
  try { await fs.unlink(testCoverExistingPath); } catch {}
  try { await fs.unlink(path.resolve(ROOT, "src/content/systems/test-rollback-cover-existing.mdx")); } catch {}

  assert(
    rollbackCoverNewRes.status === 1 &&
      rollbackCoverExistingRes.status === 1 &&
      !newCoverExistsAfterRollback &&
      restoredCoverBytes === originalCoverBytes,
    `Test 37: safe rollback C: generated public cover is cleanly removed and existing cover is restored exactly after downstream failure`
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
