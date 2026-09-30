import type { FilmScript } from "./kit";

/**
 * Lassoed by the process. Wide: the loop comes down around him. Close-up: he
 * sips. Wide: he is labelled, and the work passes overhead without stopping.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, show }) => {
  const blinkLights = (at: number, n: number) => tl.to(q(".fx-light"), { fill: "#C0663C", duration: 0.01, yoyo: true, repeat: n * 2 - 1, repeatDelay: 0.16, stagger: 0.16 }, at);

  // Shot 1, wide: a man, a chair, and then a loop.
  hide(".fx-human", 0);
  tl.set(q(".fx-lasso"), { y: -420, scale: 0.5, transformOrigin: "45% 70%" }, 0).fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0);
  blinkLights(0.3, 2);
  tl.to(q(".fx-lasso"), { y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, 1.2);
  shake(1.6, 6);

  // Shot 2, close-up: he has tea.
  close(2.2, 262, 200, 2.4);
  tl.to(q(".fx-sip"), { x: -14, y: -8, duration: 0.3, ease: "power1.inOut" }, 2.5)
    .to(q(".fx-sip"), { x: 0, y: 0, duration: 0.3, ease: "power1.inOut" }, 3.0)
    .to(q(".fx-face .hd-lid"), { scaleY: 1.75, transformOrigin: "50% 0%", duration: 0.08, yoyo: true, repeat: 1 }, 3.4);

  // Shot 3, wide: required, and beside the point.
  wide(3.85);
  say(3.95, 0);
  tl.fromTo(q(".fx-human"), { autoAlpha: 0, scale: 1.8, svgOrigin: o(112, 294) }, { autoAlpha: 1, scale: 1, duration: 0.13, ease: "power4.in" }, 4.3);
  shake(4.43, 5);
  say(4.5, 1);
  show(".fx-parcel", 4.7);
  tl.fromTo(q(".fx-parcel"), { x: -40, y: 68 }, { keyframes: [{ x: 110, y: 68, duration: 0.35 }, { x: 140, y: 38, duration: 0.12 }, { x: 236, y: 38, duration: 0.28 }], ease: "none" }, 4.7);
  hide(".fx-parcel", 5.45);
  blinkLights(5.45, 1);
  say(5.55, 2);
};
