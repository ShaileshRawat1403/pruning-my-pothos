import type { FilmScript } from "./kit";

/**
 * The fridge of tubs. Wide: seven of them, none labelled. Close-up: he opens
 * one and regrets it. Wide: the one tub that says what it takes and gives.
 */
export const film: FilmScript = ({ tl, q, o, wide, close, shake, say, hide, pop }) => {
  // Shot 1, wide: the mystery collection.
  hide(".fx-labelled, .fx-fume", 0);
  tl.fromTo(q(".cf-camera"), { scale: 1.08, svgOrigin: o(250, 260) }, { scale: 1, duration: 2, ease: "none" }, 0);
  pop(".fx-tub", 0.35, 0.16);

  // Shot 2, close-up: finding out what is in one.
  close(2, 140, 190, 2.4);
  tl.fromTo(q(".fx-fume"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power1.out" }, 2.4)
    .to(q(".fx-sniffer .hd-lid"), { scaleY: 1.4, transformOrigin: "50% 0%", duration: 0.1, yoyo: true, repeat: 3 }, 2.95);

  // Shot 3, wide: the labelled one.
  wide(3.85);
  pop(".fx-labelled", 4.25);
  shake(4.45, 4);
  say(4.7, 0);
};
