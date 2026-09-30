import type { FilmScript } from "./kit";

/**
 * The trophy that says BEST and then nothing. Wide: the judge walks in with a
 * score card. Close-up: the plaque waits for a criterion; the card says vibes.
 * Wide: the trophy sweats.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, show }) => {
  // Shot 1, wide: the award, then the judge.
  hide(".fx-sweat", 0);
  tl.set(q(".fx-vibes"), { fillOpacity: 0 }, 0)
    .set(q(".fx-exec"), { x: 210 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-exec"), { x: 0, duration: 0.9, ease: "steps(6)" }, 0.6);

  // Shot 2, close-up: best at what? Nobody wrote it down.
  close(2, 250, 328, 2.5);
  show(".fx-cursor", 2.2);
  tl.to(q(".fx-cursor"), { autoAlpha: 0, duration: 0.01, yoyo: true, repeat: 5, repeatDelay: 0.17 }, 2.4)
    .to(q(".fx-vibes"), { fillOpacity: 1, duration: 0.25, ease: "none" }, 3.25);
  hide(".fx-cursor", 3.7);

  // Shot 3, wide: shipped anyway.
  wide(3.85);
  say(3.95, 0);
  tl.fromTo(q(".fx-sweat"), { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power1.in" }, 4.4)
    .to(q(".fx-trophy"), { keyframes: [{ x: -5 }, { x: 5 }, { x: -3 }, { x: 0 }], duration: 0.5, ease: "steps(4)" }, 5.0);
  say(5.3, 1);
};
