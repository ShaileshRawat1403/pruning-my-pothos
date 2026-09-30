import type { FilmScript } from "./kit";

/**
 * The record. Wide: the press comes down once. Close-up: the needle drops.
 * Wide: he nods along to the same pressing, again.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say }) => {
  // Shot 1, wide: pressed.
  tl.set(q(".fx-arm"), { rotation: -16, svgOrigin: o(440, 330) }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 280) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-press"), { y: 34, duration: 0.12, ease: "power4.in" }, 0.8)
    .to(q(".fx-press"), { y: 0, duration: 0.5, ease: "power1.out" }, 1.1);
  shake(0.92, 9);

  // Shot 2, close-up: played.
  close(2, 320, 370, 2.1);
  tl.to(q(".fx-arm"), { rotation: 0, duration: 0.5, ease: "power1.inOut" }, 2.35)
    .to(q(".fx-groove"), { opacity: 0.25, duration: 0.22, yoyo: true, repeat: 3, ease: "none" }, 2.9);

  // Shot 3, wide: and played, and played.
  wide(3.85);
  say(3.95, 0);
  tl.to(q(".fx-listener"), { y: 4, duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, 4.0);
  say(5.2, 1);
};
