import type { FilmScript } from "./kit";

/**
 * The fortune cookie. Wide: it cracks open. Close-up: the slip inside is an
 * instruction. Wide: it was read. That is all that happened.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop, fade }) => {
  // Shot 1, wide: a closed cookie, then an open one.
  hide(".fx-slip, .fx-crumb, .fx-read, .fx-thats", 0);
  tl.set(q(".fx-half-l"), { x: 22 }, 0)
    .set(q(".fx-half-r"), { x: -22 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 330) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-half-l, .fx-half-r"), { x: 0, duration: 0.12, ease: "power3.out" }, 1.0);
  shake(1.0, 6);
  pop(".fx-crumb", 1.02);

  // Shot 2, close-up: what the content says.
  close(2, 250, 206, 1.9);
  tl.fromTo(q(".fx-slip"), { autoAlpha: 0, y: 110, scale: 0.4, transformOrigin: "50% 50%" }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }, 2.2);

  // Shot 3, wide: reading is not obeying.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-read", 4.2, 0.2);
  tl.to(q(".fx-reader .hd-lid"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 4.6);
  fade(".fx-thats", 4.9, 0.2);
  say(5.25, 1);
};
