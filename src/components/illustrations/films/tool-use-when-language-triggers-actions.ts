import type { FilmScript } from "./kit";

/**
 * The waiter and the kitchen. Wide: the order is shouted. Close-up: it
 * arrives at the hatch as a slip, and the cook looks at it. Wide: the cook
 * checks the book before anything happens.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop, fade }) => {
  // Shot 1, wide: said out loud.
  hide(".fx-yell, .fx-shout, .fx-order, .fx-checks", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 260) }, { scale: 1, duration: 2, ease: "none" }, 0);
  pop(".fx-yell", 0.7);
  shake(0.8, 7);
  fade(".fx-shout", 1.0, 0.3);

  // Shot 2, close-up: the request, at the hatch.
  close(2, 330, 230, 2.3);
  tl.fromTo(q(".fx-order"), { autoAlpha: 1, x: -110 }, { x: 0, duration: 0.4, ease: "power2.out" }, 2.3)
    .to(q(".fx-chef .hd-lid"), { scaleY: 1.75, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 3.0);

  // Shot 3, wide: who is answerable.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-checks", 4.55, 0.25);
  say(5.2, 1);
};
