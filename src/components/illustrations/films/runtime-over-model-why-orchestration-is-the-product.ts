import type { FilmScript } from "./kit";

/**
 * The wheel. Wide: a new hamster is dropped in. Close-up: the old one, in
 * retirement. Wide: the wheel turns exactly as it did.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: the replacement arrives.
  hide(".fx-retired", 0);
  tl.set(q(".fx-v2"), { y: -420 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 280) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-v2"), { y: 0, duration: 0.5, ease: "bounce.out" }, 0.7)
    .to(q(".fx-spokes"), { rotation: 90, transformOrigin: "50% 50%", duration: 0.8, ease: "power1.in" }, 1.2);
  shake(0.95, 4);

  // Shot 2, close-up: the previous model.
  close(2, 436, 410, 2.5);
  fade(".fx-retired", 2.7, 0.3);
  tl.to(q(".fx-v1"), { y: -3, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.4);

  // Shot 3, wide: same loop.
  wide(3.85);
  say(3.95, 0);
  tl.to(q(".fx-spokes"), { rotation: 450, transformOrigin: "50% 50%", duration: 1.75, ease: "none" }, 3.85)
    .to(q(".fx-v2"), { y: -5, duration: 0.11, yoyo: true, repeat: 13, ease: "none" }, 3.9);
  say(5.2, 1);
};
