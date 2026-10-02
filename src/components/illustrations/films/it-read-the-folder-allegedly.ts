import type { FilmScript } from "./kit";

/**
 * The cover of the Works On My Prompt sheet "It Read the Folder. Allegedly."
 * SheetCover draws in cover space, so points here subtract the emblem origin
 * (660, 44). Wide: the uploads land on the desk, one by one. Close-up: the
 * assistant reads the folder, by its label. Wide: "Cited page 12." The
 * answer slides out with its source. "There is no page 12."
 */
const e = (x: number, y: number): [number, number] => [x - 660, y - 44];

export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, pop }) => {
  // Shot 1, wide: everything gets uploaded.
  hide(".fx-slip, .fx-quip", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.06, svgOrigin: o(...e(900, 360)) }, { scale: 1, duration: 2.2, ease: "none" }, 0)
    .fromTo(q(".fx-sheet"), { autoAlpha: 0, y: -40 }, { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.18, ease: "power2.in" }, 0.4);

  // Shot 2, close-up: the reading. It is the label.
  const [fx, fy] = e(730, 300);
  close(2.2, fx, fy, 2.3);
  tl.to(q(".cf-camera"), { scale: 2.5, duration: 1.6, ease: "none" }, 2.2);

  // Shot 3, wide: the answer, with a source.
  wide(3.9);
  pop(".fx-quip", 3.95);
  say(4.0, 0);
  tl.fromTo(q(".fx-slip"), { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out" }, 4.5);
  say(5.3, 1);
};
