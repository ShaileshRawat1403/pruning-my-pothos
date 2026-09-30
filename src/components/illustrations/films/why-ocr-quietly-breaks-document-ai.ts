import type { FilmScript } from "./kit";

/**
 * The scanner. Wide: an invoice for $400.00 goes in. Close-up: what comes
 * out. Wide: someone stamps it LOOKS FINE.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: in.
  hide(".fx-out, .fx-looks, .fx-g1, .fx-g2", 0);
  tl.set(q(".fx-in"), { y: -74 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-in"), { y: 0, duration: 0.7, ease: "power1.inOut" }, 0.5)
    .to(q(".fx-led"), { opacity: 0.15, duration: 0.12, yoyo: true, repeat: 5, ease: "none" }, 1.2);

  // Shot 2, close-up: out.
  close(2, 325, 410, 2.3);
  tl.fromTo(q(".fx-out"), { autoAlpha: 1, y: -78 }, { y: 0, duration: 0.8, ease: "steps(8)" }, 2.25);

  // Shot 3, wide: approved.
  wide(3.85);
  say(3.95, 0);
  tl.to(q(".fx-operator .hd-lid"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 4.2)
    .fromTo(q(".fx-looks"), { autoAlpha: 0, scale: 1.9, svgOrigin: o(440, 386) }, { autoAlpha: 1, scale: 1, duration: 0.13, ease: "power4.in" }, 4.45);
  shake(4.58, 5);
  fade(".fx-g1", 4.8, 0.2);
  fade(".fx-g2", 5.05, 0.2);
  say(5.3, 1);
};
