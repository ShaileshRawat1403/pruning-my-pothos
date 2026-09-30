import type { FilmScript } from "./kit";

/**
 * The permission slip travels by snail. Wide: the request is put on the
 * snail. Close-up: the clerk, who will decide, has not looked up. Wide: the
 * snail is still on its way.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // The snail never stops and never hurries: one move across the whole film.
  tl.fromTo(q(".fx-snail"), { x: -58 }, { x: 0, duration: 5.4, ease: "none" }, 0.2);

  // Shot 1, wide: the request lands on its carrier.
  hide(".fx-sign, .fx-anyday", 0);
  tl.set(q(".fx-snail"), { x: -58 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 330) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .fromTo(q(".fx-slip"), { x: -96, y: -120, rotation: -20, transformOrigin: "50% 50%" }, { x: 0, y: 0, rotation: 0, duration: 0.55, ease: "bounce.out" }, 0.6)
    .to(q(".fx-stack"), { rotation: -4, svgOrigin: o(70, 370), duration: 0.12, yoyo: true, repeat: 1 }, 0.6);

  // Shot 2, close-up: the desk that signs.
  close(2.1, 420, 310, 2.3);
  tl.to(q(".fx-clerk .hd-lid"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 2.7)
    .fromTo(q(".fx-sign"), { autoAlpha: 0, scale: 1.8, svgOrigin: o(414, 356) }, { autoAlpha: 1, scale: 1, duration: 0.13, ease: "power4.in" }, 3.1);
  shake(3.23, 6);

  // Shot 3, wide: asked, and waiting.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-anyday", 4.6);
  say(5.3, 1);
};
