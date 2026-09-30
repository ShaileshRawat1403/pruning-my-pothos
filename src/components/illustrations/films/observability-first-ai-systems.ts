import type { FilmScript } from "./kit";

/**
 * The black box that prints everything. Wide: the tape comes out, and keeps
 * coming. Close-up: he reads it. Wide: what he found.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: the log.
  hide(".fx-4tb, .fx-f1, .fx-f2", 0);
  tl.set(q(".fx-tape"), { scale: 0, svgOrigin: o(200, 340) }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 280) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-tape"), { scale: 1, duration: 1.3, ease: "power1.out" }, 0.4);

  // Shot 2, close-up: reading all of it.
  close(2, 340, 210, 2.3);
  tl.to(q(".fx-obs .hd-lid"), { scaleY: 1.75, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 2.6)
    .to(q(".fx-tape"), { keyframes: [{ x: 3 }, { x: -3 }, { x: 2 }, { x: 0 }], duration: 0.5, ease: "none" }, 2.95)
    .to(q(".fx-obs .hd-lid"), { scaleY: 1.75, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 3.5);

  // Shot 3, wide: the yield.
  wide(3.85);
  say(3.95, 0);
  tl.fromTo(q(".fx-4tb"), { autoAlpha: 0, scale: 1.8, svgOrigin: o(120, 294) }, { autoAlpha: 1, scale: 1, duration: 0.13, ease: "power4.in" }, 4.35);
  shake(4.48, 5);
  fade(".fx-f1", 4.8, 0.2);
  fade(".fx-f2", 5.05, 0.2);
  say(5.3, 1);
};
