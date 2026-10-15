import type { FilmScript } from "./kit";

/**
 * Bounded autonomy. Wide: the dog runs a loop of the field. Close-up: the
 * owner turns a page, unbothered. Wide: the dog stops at the fence, which is
 * where the field ends.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, fade }) => {
  // Shot 1, wide: the run.
  hide(".fx-label, .fx-aside", 0);
  tl.fromTo(q(".fx-dog"), { x: -150, y: 40 }, { x: 0, y: 0, duration: 1.8, ease: "power1.inOut" }, 0);
  say(1.0, 0);

  // Shot 2, close-up: the owner, reading.
  close(2.1, 210, 420, 2.2);
  tl.to(q(".fx-paper"), { rotation: -3, svgOrigin: o(226, 452), duration: 0.25, yoyo: true, repeat: 1 }, 2.6);

  // Shot 3, wide: the fence holds.
  wide(3.8);
  fade(".fx-label", 4.0, 0.4);
  fade(".fx-aside", 4.6, 0.4);
  say(5.1, 1);
};
