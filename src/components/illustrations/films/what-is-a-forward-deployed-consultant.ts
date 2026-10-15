import type { FilmScript } from "./kit";

/**
 * Forward deployed. Wide: the consultant already inside the customer's
 * building, at the whiteboard. Close-up: the deck in the lobby, gathering a
 * cobweb. Wide: the consultant does not look round.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, fade }) => {
  // Shot 1, wide: inside, working.
  hide(".fx-cobweb, .fx-label", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.06, svgOrigin: o(360, 330) }, { scale: 1, duration: 2, ease: "none" }, 0);

  // Shot 2, close-up: the deck nobody opened.
  close(2.2, 110, 350, 2.2);
  fade(".fx-cobweb", 2.6, 0.8);
  say(2.9, 0);

  // Shot 3, wide: the consultant keeps working.
  wide(4.0);
  fade(".fx-label", 4.3, 0.4);
  tl.to(q(".fx-consultant"), { y: -3, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }, 4.6);
  say(5.1, 1);
};
