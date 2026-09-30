import type { FilmScript } from "./kit";

/**
 * The letterbox with teeth. Wide: the first sheet is carried to the slot.
 * Close-up: the slot eats it. Wide: the next sheet goes in anyway.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, fade }) => {
  const chomp = (at: number) => {
    tl.to(q(".fx-teeth-top"), { y: 9, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.in" }, at)
      .to(q(".fx-teeth-bot"), { y: -9, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.in" }, at);
    shake(at + 0.07, 5);
  };

  // Shot 1, wide: found something, walks it over.
  hide(".fx-fed, .fx-chew, .fx-found, .fx-fedit, .fx-ate", 0);
  tl.set(q(".fx-eaten"), { x: -118, y: 92, rotation: 12, transformOrigin: "50% 50%", autoAlpha: 1 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(300, 260) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-eaten"), { x: 0, y: 0, rotation: 0, duration: 0.9, ease: "power2.inOut" }, 0.7);

  // Shot 2, close-up: three bites and it is gone.
  close(2, 330, 250, 2.5);
  [2.35, 2.8, 3.25].forEach((at, i) => {
    chomp(at);
    tl.to(q(".fx-eaten"), { y: 20 * (i + 1), duration: 0.12, ease: "power2.in" }, at + 0.07);
  });
  tl.set(q(".fx-chew"), { autoAlpha: 1 }, 2.42).set(q(".fx-eaten"), { autoAlpha: 0 }, 3.5);

  // Shot 3, wide: and the next one goes in.
  wide(3.85);
  fade(".fx-found", 3.95, 0.2);
  say(3.95, 0);
  tl.fromTo(q(".fx-fed"), { x: -118, y: 92, autoAlpha: 1 }, { x: 0, y: 0, duration: 0.6, ease: "power2.inOut" }, 4.2);
  fade(".fx-fedit", 4.85, 0.2);
  say(4.85, 1);
  chomp(5.3);
  fade(".fx-ate", 5.45, 0.2);
  say(5.5, 2);
};
