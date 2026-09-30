import type { FilmScript } from "./kit";

/**
 * The cat on the laptop. Wide: the instruction, at volume. Close-up: the cat
 * considers it and types what it likes. Wide: "(please)".
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop, fade }) => {
  const flick = (at: number) => tl.to(q(".fx-tail"), { rotation: -16, svgOrigin: o(430, 320), duration: 0.16, yoyo: true, repeat: 1, ease: "power1.inOut" }, at);

  // Shot 1, wide: asked, loudly.
  hide(".fx-shout, .fx-yell, .fx-please", 0);
  tl.set(q(".fx-ch"), { fillOpacity: 0 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-mega"), { rotation: -7, svgOrigin: o(150, 276), duration: 0.12, yoyo: true, repeat: 1 }, 0.75);
  pop(".fx-shout", 0.85);
  pop(".fx-yell", 0.9);
  shake(0.95, 9);
  shake(1.45, 4);

  // Shot 2, close-up: the cat takes its time.
  close(2, 385, 300, 2.1);
  tl.to(q(".fx-ears"), { y: -5, duration: 0.09, yoyo: true, repeat: 1 }, 2.4);
  flick(2.75);
  tl.to(q(".fx-ch"), { fillOpacity: 1, duration: 0.01, stagger: 0.11 }, 3.0);

  // Shot 3, wide: said nicely, for the record.
  wide(3.85);
  say(3.95, 0);
  fade(".fx-please", 4.45);
  flick(4.95);
  say(5.2, 1);
};
