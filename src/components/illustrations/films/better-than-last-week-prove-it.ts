import type { FilmScript } from "./kit";

/**
 * The cover of the Works On My Prompt sheet "Better Than Last Week? Prove It.".
 * SheetCover draws in cover space, so points here subtract the emblem origin
 * (660, 44). Wide: the spoon goes into the pot and comes up. Close-up: the
 * face, considering. Wide: "Tasted one spoon." The shelf fills with bowls.
 * "Served everyone."
 */
const e = (x: number, y: number): [number, number] => [x - 660, y - 44];

export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, pop, fade }) => {
  // Shot 1, wide: one spoon, from the pot.
  hide(".fx-bowls, .fx-fine, .fx-quip", 0);
  tl.set(q(".fx-arm"), { rotation: 115, svgOrigin: o(...e(800, 350)) }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.06, svgOrigin: o(...e(900, 360)) }, { scale: 1, duration: 2.2, ease: "none" }, 0)
    .to(q(".fx-arm"), { rotation: 0, duration: 0.6, ease: "power2.inOut" }, 0.9);

  // Shot 2, close-up: the face of someone tasting. Nothing happens on it.
  const [fx, fy] = e(744, 262);
  close(2.2, fx, fy, 2.4);
  tl.to(q(".cf-camera"), { scale: 2.6, duration: 1.6, ease: "none" }, 2.2);
  fade(".fx-fine", 3.0, 0.3);

  // Shot 3, wide: on that, everything goes out.
  wide(3.9);
  pop(".fx-quip", 3.95);
  say(4.0, 0);
  tl.fromTo(q(".fx-bowl"), { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.15, stagger: 0.07, ease: "power1.out" }, 4.5);
  tl.set(q(".fx-bowls"), { autoAlpha: 1 }, 4.5);
  say(5.4, 1);
};
