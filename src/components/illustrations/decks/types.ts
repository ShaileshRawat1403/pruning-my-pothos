import type { ReactElement } from "react";
import type { FrameProps } from "../templates";

/**
 * One storyboard deck. A deck file is the whole storyboard: its words and its
 * drawings together, so adding one means adding one file and one line in
 * decks/index.ts. See docs/STORYBOARD_AUTHORING.md.
 */
export interface DeckFrame {
  /** Unique across all decks: prefix with the deck's short name. */
  key: string;
  /** The frame's headline, as plain text. */
  title: string;
  /**
   * The frame's full meaning as prose, at least a sentence. It is the frame's
   * accessible text, the caption under it on the site, and the text that
   * travels with the PDF. Say everything the drawing says.
   */
  text: string;
  /** Draws the frame. A pure function of its props: no hooks, no state. */
  Render: (props: FrameProps) => ReactElement;
}

export interface Deck {
  /** The owning Systems article's slug. The storyboard shares it. */
  slug: string;
  title: string;
  /** One or two sentences for the library card and link previews. */
  summary: string;
  frames: DeckFrame[];
}
