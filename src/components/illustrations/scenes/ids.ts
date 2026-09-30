/**
 * The declared visuals (frontmatter `visuals[].id`) that have a scroll scene
 * drawn for them. Kept apart from the drawings so a server component can ask
 * "is there a scene?" without pulling the drawings into its bundle.
 */
export const SCENE_IDS = new Set([
  "text-becomes-integers",
  "one-step-of-generation",
  "six-stages-to-a-grounded-answer",
  "instruction-and-contract",
  "governed-execution-pipeline",
  "present-approval-judgment",
  "what-each-check-establishes",
  "what-crosses-the-handoff",
  "ready-for-what",
  "runtime-choice-comparison",
  "tool-use-loop",
  "what-writes-the-parameters",
  "local-success-is-not-system-success",
  "requested-done-worked",
  "what-is-in-the-window",
  "a-phrase-or-a-package",
  "the-five-minute-version",
  "three-questions-for-a-record",
  "three-things-not-one",
  "a-mood-or-a-step",
  "close-in-wording-opposite-in-answer",
  "what-a-publisher-holds",
  "four-questions-five-words",
  "five-checks-each-establishing-less",
  "three-quiet-degradations",
  "six-fields-of-an-instruction-spec",
  "resident-or-invoked",
  "the-pipeline-runs-one-way",
]);
