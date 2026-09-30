import type { FilmScript } from "./kit";

/**
 * Same car. Wide: it pulls up with two people in the front. Close-up: a hand
 * arrives on the wheel that was not invited. Wide: the sign says LAKE.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, pop, fade }) => {
  // Shot 1, wide: the car arrives.
  hide(".fx-grab, .fx-gotit, .fx-didnot", 0);
  tl.set(q(".fx-car"), { x: 320 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-car"), { x: 0, duration: 1.1, ease: "power2.out" }, 0.4);

  // Shot 2, close-up: who has the wheel.
  close(2, 250, 280, 2.5);
  pop(".fx-grab", 2.5);
  tl.to(q(".fx-car .hd-lid"), { scaleY: 1.75, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 3.2);

  // Shot 3, wide: and where that leads.
  wide(3.85);
  say(3.95, 0);
  tl.to(q(".fx-lake"), { rotation: -5, svgOrigin: o(28, 150), duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, 4.3);
  fade(".fx-gotit", 4.6, 0.2);
  fade(".fx-didnot", 5.0, 0.2);
  say(5.3, 1);
};
