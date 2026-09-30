import type { FilmScript } from "./kit";

/**
 * The doorstop. Wide: a volume of jargon is put to use. Close-up: three
 * questions, written one at a time. Wide: the door is open.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: the book finds its purpose.
  hide(".fx-q, .fx-h1, .fx-h2", 0);
  tl.set(q(".fx-book"), { x: 230 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-book"), { x: 0, duration: 0.4, ease: "power3.in" }, 0.7);
  shake(1.1, 6);

  // Shot 2, close-up: what he is actually asking.
  close(2, 305, 316, 2.5);
  tl.to(q(".fx-q"), { autoAlpha: 1, duration: 0.18, stagger: 0.42, ease: "none" }, 2.3);

  // Shot 3, wide: fewer words, more use.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-h1", 4.3, 0.2);
  fade(".fx-h2", 4.6, 0.2);
  say(5.2, 1);
};
