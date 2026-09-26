import type { Deck, DeckFrame } from "./types";
import { MODEL_GAGS, RAG_GAGS, PROMPT_GAGS, GOVERNED_GAGS, HITL_GAGS, EVAL_GAGS, HANDOFF_GAGS, READY_GAGS } from "./gags";
import { deck as whatAModelIs } from "./what-an-ai-model-actually-is";
import { deck as rag } from "./retrieval-augmented-generation-in-plain-terms";
import { deck as prompting } from "./prompting-is-not-the-skill-you-think-it-is";
import { deck as governedExecution } from "./from-agent-intent-to-governed-execution";
import { deck as humanInTheLoop } from "./human-in-the-loop-is-a-system-design-choice";
import { deck as evaluation } from "./evaluation-is-a-human-problem";
import { deck as handoff } from "./agent-instructions-and-handoff-as-an-operating-system";
import { deck as readiness } from "./from-prompt-to-production";

/**
 * Every published storyboard. To add one: write decks/<article-slug>.tsx
 * exporting `deck`, add it here, then run `npm run build` and
 * `npm run export:storyboards`. Order here does not matter; the library
 * sorts by Systems Map stage. See docs/STORYBOARD_AUTHORING.md.
 */
/** Interleave deadpan gag frames after the given frame positions (0-based). */
function withGags(deck: Deck, gags: DeckFrame[], after: number[]): Deck {
  const frames = [...deck.frames];
  [...after].map((a, i) => [a, i] as const).reverse().forEach(([a, i]) => {
    if (gags[i]) frames.splice(a + 1, 0, gags[i]);
  });
  return { ...deck, frames };
}

export const DECKS: Deck[] = [
  // Frame counts follow the article: one frame per idea, no fixed number.
  withGags(whatAModelIs, [MODEL_GAGS[2]], [3]),
  withGags(rag, [RAG_GAGS[0], RAG_GAGS[1]], [2, 3]),
  withGags(prompting, [PROMPT_GAGS[2]], [2]),
  withGags(governedExecution, GOVERNED_GAGS, [3, 4]),
  withGags(humanInTheLoop, HITL_GAGS, [1, 2, 3, 4]),
  withGags(evaluation, EVAL_GAGS, [1, 2, 3, 4]),
  withGags(handoff, [HANDOFF_GAGS[0], HANDOFF_GAGS[1]], [1, 2]),
  // Readiness: each gag sits after the teaching frame it jokes about.
  // READY_GAGS order: parachute, target, undo, demo, queue, pointing, expiry.
  withGags(readiness, [0, 3, 1, 4, 2, 5, 6].map((i) => READY_GAGS[i]), [1, 2, 3, 3, 4, 4, 4]),
];
