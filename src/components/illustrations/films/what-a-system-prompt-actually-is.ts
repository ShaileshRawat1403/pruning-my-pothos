import type { FilmScript } from "./kit";

/**
 * House rules on the fridge. Wide: the note goes up. Close-up: three rules.
 * Wide: the homework is on the table, and none of them covers question 3.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: posted.
  hide(".fx-note, .fx-rule, .fx-ask1, .fx-ask2", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 280) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .fromTo(q(".fx-note"), { autoAlpha: 0, scale: 1.5, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power4.in" }, 0.8);
  shake(0.94, 6);

  // Shot 2, close-up: what it says.
  close(2, 365, 304, 2.3);
  tl.to(q(".fx-rule"), { autoAlpha: 1, duration: 0.18, stagger: 0.42, ease: "none" }, 2.3);

  // Shot 3, wide: what it does not.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-ask1", 4.4, 0.2);
  fade(".fx-ask2", 4.7, 0.2);
  say(5.25, 1);
};
