import type { FilmScript } from "./kit";

/**
 * The power strip. Wide: three appliances already plugged in. Close-up: the
 * toaster starts smoking. Wide: the person holding the next plug reads the
 * label before using the socket that fits everything.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, pop, fade }) => {
  // Shot 1, wide: one standard strip, everything fits.
  hide(".fx-smoke, .fx-label, .fx-warn", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(300, 400) }, { scale: 1, duration: 2, ease: "none" }, 0);
  pop(".fx-label", 0.6);
  say(1.2, 0);

  // Shot 2, close-up: the appliance nobody checked.
  close(2, 420, 360, 2.2);
  fade(".fx-smoke", 2.3, 0.5);

  // Shot 3, wide: the next plug waits.
  wide(3.8);
  tl.to(q(".fx-plug"), { y: -6, duration: 0.25, yoyo: true, repeat: 1, ease: "power1.inOut" }, 4.0);
  fade(".fx-warn", 4.5, 0.3);
  say(5.1, 1);
};
