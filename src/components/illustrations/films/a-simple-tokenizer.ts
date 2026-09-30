import type { FilmScript } from "./kit";

/**
 * The deli counter. Wide: the word arrives whole. Close-up: two cuts.
 * Wide: each slice is tagged, then the counter is stamped.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, show, hide, pop, fade }) => {
  const chop = (at: number, x: number) => {
    tl.set(q(".fx-blade"), { x, y: -300, autoAlpha: 1 }, at)
      .to(q(".fx-blade"), { y: 0, duration: 0.09, ease: "power4.in" }, at)
      .to(q(".fx-blade"), { y: -300, duration: 0.3, ease: "power2.in" }, at + 0.32)
      .set(q(".fx-blade"), { autoAlpha: 0 }, at + 0.62);
    shake(at + 0.09);
  };

  // Shot 1, wide: an empty board, and the word slides in whole.
  hide(".fx-piece, .fx-tag, .fx-stamp, .fx-aside", 0);
  tl.set(q(".fx-whole"), { x: -420, autoAlpha: 1 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.1, svgOrigin: o(165, 330) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-whole"), { x: 0, duration: 0.7, ease: "back.out(1.2)" }, 0.6);

  // Shot 2, close-up: cut, cut.
  close(2, 165, 330, 2.25);
  chop(2.45, 218);
  hide(".fx-whole", 2.54);
  show(".fx-joined, .fx-able", 2.54);
  tl.from(q(".fx-able"), { x: -8, duration: 0.2 }, 2.54);
  chop(3.1, 98);
  hide(".fx-joined", 3.19);
  show(".fx-un, .fx-believ", 3.19);
  tl.from(q(".fx-un"), { x: 8, duration: 0.2 }, 3.19);

  // Shot 3, wide: priced per slice.
  wide(3.85);
  say(3.95, 0);
  pop(".fx-tag", 4.3, 0.16);
  say(4.85, 1);
  tl.fromTo(q(".fx-stamp"), { autoAlpha: 0, scale: 1.9, svgOrigin: o(120, 434) }, { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power4.in" }, 5.2);
  shake(5.34, 6);
  say(5.4, 2);
  fade(".fx-aside", 5.6);
};
