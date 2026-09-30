import type { FilmScript } from "./kit";

/**
 * The star and the slot. Wide: a star-shaped answer arrives over a slot
 * marked NUMBER. Close-up: it is pushed. It does not go. Wide: it bounces.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop }) => {
  const shove = (at: number) => {
    tl.to(q(".fx-star"), { y: 9, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.in" }, at);
    shake(at + 0.07, 5);
  };

  // Shot 1, wide: the answer, lowered into place.
  hide(".fx-strain, .fx-fit", 0);
  tl.set(q(".fx-star"), { y: -130 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(220, 330) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-star"), { y: 0, duration: 0.7, ease: "power2.inOut" }, 0.5);

  // Shot 2, close-up: insistence.
  close(2, 196, 330, 2.3);
  shove(2.4);
  pop(".fx-strain", 2.47);
  shove(2.85);
  shove(3.3);

  // Shot 3, wide: the schema wins.
  wide(3.85);
  say(3.95, 0);
  pop(".fx-fit", 4.4);
  tl.to(q(".fx-star"), { y: -22, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, 4.9);
  say(5.25, 1);
};
