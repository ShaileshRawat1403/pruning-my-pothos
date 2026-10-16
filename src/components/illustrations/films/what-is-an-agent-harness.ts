import type { FilmScript } from "./kit";

/**
 * Agent harness. Wide: the robot hangs in its straps and makes a suggestion.
 * Close-up: the clipboard, where that suggestion is crossed out. Wide: the
 * robot kicks its feet, which reach nothing.
 */
export const film: FilmScript = ({ tl, q, wide, close, say, hide, pop, fade }) => {
  // Shot 1, wide: the suggestion.
  hide(".fx-bubble, .fx-label", 0);
  pop(".fx-bubble", 0.6);
  say(1.2, 0);

  // Shot 2, close-up: the list of what it may do.
  close(2.2, 405, 430, 2.2);

  // Shot 3, wide: feet off the floor.
  wide(3.8);
  tl.to(q(".fx-robot"), { y: 6, duration: 0.25, yoyo: true, repeat: 3, ease: "power1.inOut" }, 4.0);
  fade(".fx-label", 4.3, 0.4);
  say(5.0, 1);
};
