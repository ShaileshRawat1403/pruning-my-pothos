import type { FilmScript } from "./kit";

/**
 * Forward deployed. Wide: the empty desk at headquarters. Close-up: the
 * coffee, gone cold. Wide: its owner, inside the customer's building, does
 * not look up.
 */
export const film: FilmScript = ({ tl, q, wide, close, say, hide, fade }) => {
  // Shot 1, wide: the desk nobody sits at.
  hide(".fx-cold, .fx-label", 0);
  say(1.0, 0);

  // Shot 2, close-up: the mug.
  close(1.9, 160, 370, 2.4);
  fade(".fx-cold", 2.5, 0.6);

  // Shot 3, wide: the owner, working elsewhere.
  wide(3.8);
  fade(".fx-label", 4.1, 0.4);
  tl.to(q(".fx-person"), { y: -3, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }, 4.4);
  say(5.0, 1);
};
