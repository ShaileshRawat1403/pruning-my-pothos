import type { FilmScript } from "./kit";

/**
 * The cover of the Works On My Prompt sheet "Write It Down or Watch It
 * Guess". SheetCover draws in cover space, so points here subtract the
 * emblem origin (660, 44). Wide: the agent reads the note. Close-up: the
 * rule, underlined. Wide: "Read it." The arm goes into the drawer anyway.
 * "Guessed anyway."
 */
const e = (x: number, y: number): [number, number] => [x - 660, y - 44];

export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop, fade }) => {
  // Shot 1, wide: drawer shut, arm down, reading.
  hide(".fx-papers, .fx-readit, .fx-underline", 0);
  tl.set(q(".fx-arm"), { rotation: 62, svgOrigin: o(...e(796, 372)) }, 0)
    .set(q(".fx-drawer"), { x: 56 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.06, svgOrigin: o(...e(900, 340)) }, { scale: 1, duration: 2.2, ease: "none" }, 0);
  fade(".fx-readit", 1.0, 0.4);

  // Shot 2, close-up: the rule, in writing.
  const [nx, ny] = e(1000, 214);
  close(2.2, nx, ny, 2.4);
  tl.to(q(".cf-camera"), { scale: 2.6, duration: 1.6, ease: "none" }, 2.2);
  pop(".fx-underline", 2.8);

  // Shot 3, wide: read it, and in it goes.
  wide(3.9);
  say(4.0, 0);
  tl.to(q(".fx-arm"), { rotation: 0, duration: 0.35, ease: "power2.inOut" }, 4.4).to(q(".fx-drawer"), { x: 0, duration: 0.3, ease: "power2.out" }, 4.45);
  shake(4.75, 6);
  pop(".fx-papers", 4.8);
  say(5.3, 1);
};
