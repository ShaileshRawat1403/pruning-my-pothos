import type { FilmScript } from "./kit";

/**
 * The exhibit. Wide: a sheet is lowered into the glass case. Close-up: it is
 * a column of numbers, and one of them is watching. Wide: the congregation
 * rises into frame and bows.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, say, hide, pop, fade }) => {
  // Shot 1, wide: an empty case, and the file comes down into it.
  hide(".fx-num, .fx-eye, .fx-exhibit, .fx-hail", 0);
  // The congregation waits below the frame, behind the lower bar.
  tl.set(q(".fx-wor"), { y: 190 }, 0)
    .set(q(".fx-file"), { y: -250 }, 0)
    .fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 260) }, { scale: 1, duration: 2, ease: "none" }, 0)
    .to(q(".fx-file"), { y: 0, duration: 1, ease: "power2.inOut" }, 0.5);

  // Shot 2, close-up: what is on the sheet.
  close(2, 250, 160, 2.7);
  tl.to(q(".fx-num"), { autoAlpha: 1, duration: 0.01, stagger: 0.24 }, 2.25);
  pop(".fx-eye", 3.3);

  // Shot 3, wide: it gets a label and a following.
  wide(3.8);
  say(3.9, 0);
  pop(".fx-exhibit", 4.2);
  tl.to(q(".fx-wor"), { y: 0, duration: 0.45, ease: "back.out(1.4)", stagger: 0.18 }, 4.45)
    .to(q(".fx-wor-l"), { keyframes: [{ rotation: 9 }, { rotation: 0 }, { rotation: 9 }, { rotation: 0 }], transformOrigin: "50% 100%", duration: 0.9, ease: "power1.inOut" }, 5.15)
    .to(q(".fx-wor-r"), { keyframes: [{ rotation: -9 }, { rotation: 0 }, { rotation: -9 }, { rotation: 0 }], transformOrigin: "50% 100%", duration: 0.9, ease: "power1.inOut" }, 5.15);
  fade(".fx-hail", 5.2);
  say(5.5, 1);
};
