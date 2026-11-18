import type { FilmScript } from "./kit";

/**
 * Agent memory. Wide: the goldfish in its bowl, no idea. Close-up: the note
 * on the glass, "likes metric". Wide: the note was written down by someone.
 */
export const film: FilmScript = ({ wide, close, say, hide, fade }) => {
  // Shot 1, wide: the fish.
  hide(".fx-label, .fx-aside", 0);
  fade(".fx-aside", 0.8, 0.4);
  say(1.2, 0);

  // Shot 2, close-up: the note.
  close(2.2, 360, 252, 2.2);

  // Shot 3, wide: who wrote it.
  wide(3.8);
  fade(".fx-label", 4.2, 0.4);
  say(5.0, 1);
};
