import type { FilmScript } from "./kit";

/**
 * The small window. Wide: everything else piles up outside. Close-up: two
 * eyes and one sheet that made it to the slot. Wide: the pile it cannot see.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, fade }) => {
  // Shot 1, wide: the pile grows.
  hide(".fx-sheet, .fx-dash, .fx-else", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 260) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .fromTo(q(".fx-pile"), { y: -360, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2, ease: "power2.in", stagger: 0.12 }, 0.3);

  // Shot 2, close-up: what fits through.
  close(2, 200, 236, 2.4);
  tl.to(q(".fx-eyes"), { keyframes: [{ x: -4 }, { x: 4 }, { x: 0 }], duration: 0.9, ease: "sine.inOut" }, 2.25)
    .fromTo(q(".fx-sheet"), { x: 150, autoAlpha: 1 }, { x: 0, duration: 0.45, ease: "power2.out" }, 3.05);

  // Shot 3, wide: and what does not.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-dash", 4.25, 0.2);
  fade(".fx-else", 4.6, 0.25);
  say(5.2, 1);
};
