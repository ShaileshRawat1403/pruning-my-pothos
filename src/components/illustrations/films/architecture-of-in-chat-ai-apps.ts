import type { FilmScript } from "./kit";

/**
 * The big button. Wide: pressed, with conviction. Close-up: behind the wall,
 * a clerk who has not decided. Wide: pressed again. Still pending.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop }) => {
  const press = (at: number, amount = 7) => {
    tl.to(q(".fx-button"), { y: 10, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.in" }, at).to(q(".fx-press"), { y: 10, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.in" }, at);
    shake(at + 0.07, amount);
  };

  // Shot 1, wide: the press.
  hide(".fx-impact, .fx-pending", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0);
  press(0.9);
  pop(".fx-impact", 0.97);

  // Shot 2, close-up: the part that decides.
  close(2, 405, 190, 2.4);
  tl.to(q(".fx-clerk .hd-lid"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 2.6)
    .fromTo(q(".fx-pending"), { autoAlpha: 0, scale: 1.8, svgOrigin: o(405, 256) }, { autoAlpha: 1, scale: 1, duration: 0.13, ease: "power4.in" }, 3.2);
  shake(3.33, 5);

  // Shot 3, wide: pressing harder changes nothing.
  wide(3.85);
  say(3.95, 0);
  press(4.45, 4);
  press(4.75, 4);
  say(5.2, 1);
};
