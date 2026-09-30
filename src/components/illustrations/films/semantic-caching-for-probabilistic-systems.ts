import type { FilmScript } from "./kit";

/**
 * Two customers, nearly the same question. Wide: the second one arrives.
 * Close-up: the clerk files them as one. Wide: close enough.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop, fade }) => {
  // Shot 1, wide: one question, then another like it.
  hide(".fx-q, .fx-same, .fx-close", 0);
  tl.set(q(".fx-cust-1"), { y: 440 }, 0).fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 260) }, { scale: 1, duration: 2, ease: "none" }, 0);
  pop(".fx-cust-0 .fx-q", 0.5);
  tl.to(q(".fx-cust-1"), { y: 0, duration: 0.45, ease: "back.out(1.4)" }, 0.95);
  pop(".fx-cust-1 .fx-q", 1.5);

  // Shot 2, close-up: the ruling.
  close(2, 420, 290, 2.4);
  tl.to(q(".fx-cashier .hd-lid"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 2.5)
    .fromTo(q(".fx-same"), { autoAlpha: 0, y: -30 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power4.in" }, 3.05);
  shake(3.17, 6);

  // Shot 3, wide: one answer for both.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-close", 4.5, 0.25);
  say(5.2, 1);
};
