import type { FilmScript } from "./kit";

/**
 * The layer cake. Wide: five layers go up. Close-up: someone plants a flag
 * on top that says AGENT. Wide: it is still a cake.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  // Shot 1, wide: built from the bottom.
  hide(".fx-flag, .fx-cake", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .fromTo(q(".fx-layer"), { y: -420, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.26, ease: "power2.in", stagger: 0.24 }, 0.3);

  // Shot 2, close-up: the label on top.
  close(2, 236, 130, 2.3);
  tl.fromTo(q(".fx-flag"), { autoAlpha: 0, y: -150 }, { autoAlpha: 1, y: 0, duration: 0.14, ease: "power4.in" }, 2.5);
  shake(2.64, 6);

  // Shot 3, wide: count the layers.
  wide(3.85);
  say(3.95, 0);
  say(4.45, 1);
  fade(".fx-cake", 4.75, 0.25);
  tl.to(q(".fx-baker .hd-lid"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 5.05);
  say(5.4, 2);
};
