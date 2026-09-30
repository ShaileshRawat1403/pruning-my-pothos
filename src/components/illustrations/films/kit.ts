import type { gsap } from "gsap";

/**
 * What a film script gets. Coordinates are the emblem's own (the 500 x 540 box
 * it is drawn in, see emblems.tsx); `o` converts them for GSAP's svgOrigin.
 *
 * House rules for a film (docs/STORYBOARD_AUTHORING.md, "Cover films"):
 * - Three shots, about six seconds: wide, a close-up, wide again. Cuts are hard.
 * - The quip is timed to the action: `say` one beat per event.
 * - One thing moves at a time. Deadpan is how little reacts.
 * - Animate only elements with an fx- class, and never one that carries its
 *   own transform attribute: wrap it in a plain <g className="fx-..."> first.
 * - Anything that exists only during the film is a <FilmOnly>, and must be
 *   hidden again by the last frame. The last frame is the still cover.
 * - A film shows nothing the still cover and its article do not already say.
 */
export interface FilmKit {
  tl: gsap.core.Timeline;
  /** Selector scoped to this cover. */
  q: (selector: string) => Element[];
  /** svgOrigin for a point in emblem coordinates. */
  o: (x: number, y: number) => string;
  /** Cut to the wide shot: the whole cover, copy visible. */
  wide: (at: number) => void;
  /** Cut to a close-up centred on (x, y) of the emblem. Hides the copy. */
  close: (at: number, x: number, y: number, scale: number) => void;
  /** A small camera shake, for an impact. */
  shake: (at: number, amount?: number) => void;
  /** Land one beat of the quip (0-based). */
  say: (at: number, beat: number) => void;
  show: (selector: string, at: number) => void;
  hide: (selector: string, at: number) => void;
  /** Pop in with a small overshoot: tags, stamps, labels. */
  pop: (selector: string, at: number, stagger?: number) => void;
  /** Fade in: handwriting, asides. */
  fade: (selector: string, at: number, duration?: number) => void;
}

export type FilmScript = (kit: FilmKit) => void;
