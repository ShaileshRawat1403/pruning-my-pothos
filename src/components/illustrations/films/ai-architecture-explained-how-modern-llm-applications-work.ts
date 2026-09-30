import type { FilmScript } from "./kit";

/**
 * The tower of layers. Wide: it goes up, one layer at a time. Close-up: it
 * sways, and nobody looks down. Wide: one block comes out.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: stacked, bottom first.
  hide(".fx-as1, .fx-as2", 0);
  tl.set(q(".fx-loose"), { x: -58, y: -6 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .fromTo(q(".fx-layer"), { y: -420, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.28, ease: "power2.in", stagger: 0.2 }, 0.3);

  // Shot 2, close-up: the middle of the stack, moving.
  close(2, 190, 270, 2.0);
  tl.to(q(".fx-tower"), { keyframes: [{ rotation: 2.5 }, { rotation: -1.5 }, { rotation: 1 }, { rotation: 0 }], transformOrigin: "50% 100%", duration: 1.5, ease: "sine.inOut" }, 2.25);

  // Shot 3, wide: the assumption, tested.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-as1", 4.3, 0.2);
  fade(".fx-as2", 4.55, 0.2);
  tl.to(q(".fx-loose"), { x: 0, y: 0, duration: 0.3, ease: "power2.out" }, 4.95);
  shake(5.2, 6);
  say(5.3, 1);
};
