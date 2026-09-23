import type { Visual } from "../visual-types";

/**
 * visual-fixtures.ts — one representative instance of every generated renderer.
 *
 * Exists so a renderer change can be inspected at 390px and 1440px from one
 * deterministic place, instead of hunting through articles or temporarily
 * mutating content to see what a change did.
 *
 * This is development scaffolding, not content. Nothing here is published, none
 * of it makes a claim about the world, and the copy is deliberately generic so
 * it is never mistaken for an editorial position. Real visuals live in the
 * frontmatter of the article that owns them.
 */
export const VISUAL_FIXTURES: Visual[] = [
  {
    id: "fixture-sequence",
    purpose: "sequence",
    renderAs: "generated-sequence",
    takeaway: "A sequence runs horizontally on desktop and vertically on a phone.",
    caption: "Four steps, to exercise wrapping and the flow connector.",
    alt: "A four step sequence: request, authorize, execute, verify, each following the previous one.",
    evidenceRole: "explanatory",
    data: {
      steps: [
        { id: "s1", label: "Request", note: "A proposal, not an effect" },
        { id: "s2", label: "Authorize", note: "Permitted here and now?" },
        { id: "s3", label: "Execute" },
        { id: "s4", label: "Verify", note: "Did the intended change happen?" },
      ],
    },
  },
  {
    id: "fixture-layers",
    purpose: "layers",
    renderAs: "generated-layers",
    takeaway: "Layers stack, and the highlighted one is named as well as coloured.",
    caption: "Three layers with the middle one in focus.",
    alt: "Three stacked layers: interface above, orchestration in focus in the middle, model below.",
    evidenceRole: "explanatory",
    data: {
      layers: [
        { id: "l1", label: "Interface", note: "What a person sees" },
        { id: "l2", label: "Orchestration", note: "What decides the next step", highlighted: true },
        { id: "l3", label: "Model" },
      ],
    },
  },
  {
    id: "fixture-boundary",
    purpose: "boundary",
    renderAs: "generated-boundary",
    takeaway: "A boundary separates what a thing establishes from what it does not.",
    caption: "Two partitions either side of a labelled crossing.",
    alt: "A boundary with three items inside the model and three items supplied by the surrounding application.",
    evidenceRole: "explanatory",
    data: {
      inside: { label: "The model", items: ["Ranks likely continuations", "Fixed after training"] },
      outside: { label: "The application", items: ["Retrieval", "Tool calls", "Policy"] },
      boundaryLabel: "What the file does",
    },
  },
  {
    id: "fixture-comparison",
    purpose: "comparison",
    renderAs: "generated-comparison",
    takeaway: "A comparison contrasts two options a reader might choose between.",
    caption: "Two columns with a connector, to check the regression boundary.",
    alt: "A comparison of a fixed sequence against a path selected during the run.",
    evidenceRole: "explanatory",
    data: {
      before: { label: "Fixed in advance", items: ["Your program holds the order", "Branches written before the run"] },
      after: { label: "Selected during the run", items: ["The model picks the next step", "The path can change"] },
      diffNote: "The difference is who chooses the next step.",
    },
  },
  {
    id: "fixture-decision",
    purpose: "decision",
    renderAs: "generated-decision",
    takeaway: "A decision shows where a judgment changes which path is taken.",
    caption: "One question, a precondition, and two branches.",
    alt: "A decision on whether a proposed action is permitted, with a permitted branch and a refused branch.",
    evidenceRole: "explanatory",
    data: {
      question: "Is this action permitted here and now?",
      precondition: "The request is well-formed and names a known operation.",
      branches: [
        { id: "b1", label: "Permitted", outcome: "The operation runs, and something confirms the effect.", note: "Returning success is not the same as the effect happening." },
        { id: "b2", label: "Refused", outcome: "Nothing runs, and the refusal is recorded with its reason." },
      ],
    },
  },
  {
    id: "fixture-evidence-map",
    purpose: "evidence-map",
    renderAs: "generated-evidence-map",
    takeaway: "An evidence map shows what a judgment actually rests on.",
    caption: "Three supports at each strength, including one never collected.",
    alt: "A judgment supported by one direct observation, one partial observation, and one that was not collected.",
    evidenceRole: "explanatory",
    data: {
      judgment: "This system is ready for the exposure being asked for.",
      supports: [
        { id: "e1", label: "Passes its test suite", strength: "direct" },
        { id: "e2", label: "Reviewed against a fixed set of past failures", strength: "partial", note: "The set covers three of the five known modes." },
        { id: "e3", label: "Behaviour observed with real users", strength: "absent", note: "Nobody has run it outside a test environment." },
      ],
      gap: "None of this establishes what happens when the upstream source is stale.",
    },
  },
  {
    id: "fixture-state-change",
    purpose: "state-change",
    renderAs: "generated-state-change",
    takeaway: "A state change shows what survives a crossing and what does not.",
    caption: "Before and after a boundary, with preserved and lost state attached to the crossing.",
    alt: "State before and after a session boundary, listing what crosses unchanged and what does not cross.",
    evidenceRole: "explanatory",
    data: {
      boundary: "Session ends",
      before: { label: "While the session runs", items: ["Full conversation in context", "Working assumptions held in memory"] },
      after: { label: "When work resumes", items: ["Only what was written down", "Whatever the next actor can reconstruct"] },
      preserved: ["What is currently true", "Which constraints still apply"],
      lost: ["Reasoning that was never recorded", "Decisions later reversed but not marked"],
    },
  },
];
