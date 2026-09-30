import type { FilmScript } from "./kit";

/**
 * Yelling at the cloud. Wide: he shakes a fist at the algorithm. Close-up:
 * his own pot, wilting behind him. Wide: it starts to rain somewhere else.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop }) => {
  // Shot 1, wide: the demand.
  hide(".fx-rank, .fx-rain", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 260) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .fromTo(q(".fx-cloud"), { x: 26 }, { x: 0, duration: 2, ease: "none" }, 0)
    .to(q(".fx-fist"), { rotation: -10, svgOrigin: o(222, 268), duration: 0.13, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.6);
  pop(".fx-rank", 0.7);
  shake(0.8, 7);

  // Shot 2, close-up: the garden.
  close(2, 430, 440, 2.5);
  tl.fromTo(q(".fx-wilt"), { rotation: -16, transformOrigin: "50% 100%" }, { rotation: 0, duration: 1.2, ease: "power1.in" }, 2.3);

  // Shot 3, wide: the cloud replies to no one.
  wide(3.85);
  say(3.95, 0);
  pop(".fx-rain", 4.4);
  tl.to(q(".fx-rain"), { y: 8, duration: 0.2, yoyo: true, repeat: 3, ease: "none" }, 4.6);
  say(5.2, 1);
};
