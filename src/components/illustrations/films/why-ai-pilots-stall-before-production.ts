import type { FilmScript } from "./kit";

/**
 * Pilot to production. Wide: the robot on the DEMO podium, medal swinging.
 * Close-up: the sticky note holding the company together. Wide: the medal
 * stops swinging.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, fade }) => {
  // Shot 1, wide: the winner.
  hide(".fx-label, .fx-aside", 0);
  tl.fromTo(q(".fx-medal"), { rotation: -10, svgOrigin: o(120, 380) }, { rotation: 0, duration: 1.4, ease: "elastic.out(1, 0.4)" }, 0.3);
  say(1.2, 0);

  // Shot 2, close-up: the rule that matters.
  close(2.2, 446, 285, 2.4);

  // Shot 3, wide: the company, as it is.
  wide(3.8);
  fade(".fx-label", 4.0, 0.4);
  fade(".fx-aside", 4.5, 0.4);
  say(5.0, 1);
};
