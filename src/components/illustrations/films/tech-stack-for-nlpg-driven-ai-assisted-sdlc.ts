import type { FilmScript } from "./kit";

/**
 * The spec on the table. Wide: two people disagree over a sheet of paper.
 * Close-up: the eraser does its work. Wide: what changing it later looks like.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop }) => {
  const rub = (at: number, n: number) => tl.to(q(".fx-eraser"), { x: -9, duration: 0.09, yoyo: true, repeat: n, ease: "sine.inOut" }, at);

  // Shot 1, wide: the argument, on paper.
  hide(".fx-ball, .fx-crane, .fx-crack, .fx-no", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(200, 280) }, { scale: 1, duration: 2, ease: "none" }, 0);
  pop(".fx-no", 0.7);
  rub(1.1, 5);

  // Shot 2, close-up: cheap to change.
  close(2, 170, 270, 2.5);
  rub(2.3, 11);

  // Shot 3, wide: the other way to change a decision.
  wide(3.85);
  say(3.95, 0);
  tl.set(q(".fx-crane"), { autoAlpha: 1 }, 4.45);
  tl.fromTo(q(".fx-ball"), { autoAlpha: 1, rotation: 58, svgOrigin: o(360, 30) }, { rotation: 0, duration: 0.42, ease: "power2.in" }, 4.45);
  shake(4.87, 10);
  pop(".fx-crack", 4.88);
  say(5.25, 1);
};
