import type { FilmScript } from "./kit";

/**
 * Tested with bicycles. Wide: the lorry drives onto the bridge. Close-up: the
 * sign says what the bridge was tested with. Wide: a salute, then a step back.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: production arrives.
  hide(".fx-salute, .fx-shipit", 0);
  tl.set(q(".fx-lorry"), { x: 330 }, 0)
    .set(q(".fx-saluter"), { x: -18 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2.1, ease: "none" }, 0)
    .to(q(".fx-lorry"), { x: 0, duration: 1.1, ease: "power1.out" }, 0.5)
    .to(q(".fx-wave"), { x: 10, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut", stagger: 0.25 }, 0);
  shake(1.55, 5);

  // Shot 2, close-up: the small print.
  close(2.1, 130, 200, 2.4);
  tl.to(q(".fx-signboard"), { keyframes: [{ rotation: 5 }, { rotation: -4 }, { rotation: 2.5 }, { rotation: -1.5 }, { rotation: 0 }], svgOrigin: o(130, 234), duration: 1.5, ease: "sine.inOut" }, 2.2);

  // Shot 3, wide: signed off, then stood well back.
  wide(3.85);
  say(3.95, 0);
  tl.set(q(".fx-salute"), { autoAlpha: 1 }, 4.4);
  say(4.5, 1);
  fade(".fx-shipit", 4.9, 0.2);
  tl.to(q(".fx-saluter"), { x: 0, duration: 0.4, ease: "steps(2)" }, 5.35);
  say(5.5, 2);
};
