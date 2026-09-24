import type { Deck } from "./types";
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
export const DECKS: Deck[] = [
  whatAModelIs,
  rag,
  prompting,
  governedExecution,
  humanInTheLoop,
  evaluation,
  handoff,
  readiness,
];
