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
  withGags(whatAModelIs, MODEL_GAGS, [1, 3, 4]),
  withGags(rag, RAG_GAGS, [2, 3, 4]),
  withGags(prompting, PROMPT_GAGS, [1, 2, 4]),
  withGags(governedExecution, GOVERNED_GAGS, [3, 4]),
  withGags(humanInTheLoop, HITL_GAGS, [1, 2, 3]),
  withGags(evaluation, EVAL_GAGS, [1, 2, 4]),
  withGags(handoff, HANDOFF_GAGS, [1, 2, 3]),
  withGags(readiness, READY_GAGS, [1, 2, 4]),
];
