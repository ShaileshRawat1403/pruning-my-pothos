import type { FilmScript } from "./kit";

/**
 * The flat-pack. Wide: the checklist gets three ticks. Close-up: the pen
 * hovers over the fourth and moves on. Wide: the furniture, and the manual,
 * on the floor.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, show, fade }) => {
  // Shot 1, wide: three decisions made.
  hide(".fx-tick, .fx-wreck, .fx-t1, .fx-t2", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(200, 330) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-tick"), { autoAlpha: 1, duration: 0.01, stagger: 0.4 }, 0.5);

  // Shot 2, close-up: the fourth is skipped.
  close(2, 125, 392, 2.5);
  show(".fx-skip", 2.35);
  tl.to(q(".fx-skip"), { autoAlpha: 0, duration: 0.01, yoyo: true, repeat: 5, repeatDelay: 0.16 }, 2.5);
  hide(".fx-skip", 3.6);

  // Shot 3, wide: what skipping costs.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-t1", 4.25, 0.2);
  fade(".fx-t2", 4.5, 0.2);
  tl.fromTo(q(".fx-wreck"), { autoAlpha: 0, y: -46 }, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power4.in" }, 4.95);
  shake(5.11, 8);
  say(5.3, 1);
};
