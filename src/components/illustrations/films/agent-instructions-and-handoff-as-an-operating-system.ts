import type { FilmScript } from "./kit";

/**
 * The baton with the whole race attached. Wide: the first runner arrives and
 * the transcript unrolls. Close-up: the second runner looks at what he has been
 * handed. Wide: he asks the only question that matters.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, fade }) => {
  // Shot 1, wide: the handoff, with everything that ever happened.
  hide(".fx-tried, .fx-where1, .fx-where2", 0);
  tl.set(q(".fx-track"), { autoAlpha: 1 }, 0)
    .set(q(".fx-track"), { autoAlpha: 0 }, 2.3)
    .set(q(".fx-r1, .fx-baton"), { x: -250 }, 0)
    .set(q(".fx-ribbon"), { scale: 0, svgOrigin: o(258, 242) }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 300) }, { scale: 1, duration: 2.3, ease: "none" }, 0)
    .to(q(".fx-r1, .fx-baton"), { x: 0, duration: 0.8, ease: "power2.out" }, 0.4)
    .to(q(".fx-ribbon"), { scale: 1, duration: 0.9, ease: "power1.out" }, 1.25);

  // Shot 2, close-up: the receiver reads none of it.
  close(2.3, 392, 176, 2.3);
  tl.to(q(".cf-camera"), { scale: 2.5, duration: 1.6, ease: "none" }, 2.3)
    .to(q(".fx-r2head"), { rotation: 6, svgOrigin: o(390, 208), duration: 0.18, ease: "power1.out" }, 2.8)
    .to(q(".fx-r2head"), { rotation: 0, duration: 0.18 }, 3.55);

  // Shot 3, wide: a full record, and no position.
  wide(3.9);
  say(4.0, 0);
  fade(".fx-tried", 4.35);
  tl.to(q(".fx-puff"), { autoAlpha: 0, duration: 0.01, yoyo: true, repeat: 3, repeatDelay: 0.14 }, 4.4);
  fade(".fx-where1", 4.75, 0.15);
  fade(".fx-where2", 5.0, 0.15);
  say(5.35, 1);
};
