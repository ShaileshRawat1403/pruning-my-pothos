/**
 * Works On My Prompt: the builder section on the Shelf (/shelf/reference/).
 * Sheets for people AI promoted to builder without asking. Every sheet is
 * written and drawn here, under the editorial contract, and has its own page
 * at /shelf/reference/<slug>/. The plan, the voice and the order of work are
 * in docs/BUILDER_TRACK.md; read it before adding or changing anything here.
 *
 * While the list is empty, /shelf/reference/ is a noindexed placeholder and
 * stays out of the sitemap.
 */

/** The section's name, everywhere it appears. Change copy here, not in pages. */
export const BUILDER_SECTION = {
  name: "Works On My Prompt",
  tagline: "For everyone AI promoted to builder without asking.",
  intro:
    "You can build software now. Nobody checked whether you wanted to. These are the sheets for the part after the demo works: what to set up, what to check, and where it quietly breaks. Each one links back to the Systems article that explains why.",
};

/**
 * Keys stay plain so data never has to change; labels carry the voice.
 * `manual` is the step-by-step one: do this, check that, here is what
 * failure looks like.
 */
export type ReferenceSheetType = "manual" | "mindmap" | "architecture" | "cheatsheet" | "slides";

export const REFERENCE_TYPE_LABEL: Record<ReferenceSheetType, string> = {
  manual: "Post-Mortem, Pre-Written",
  mindmap: "Conspiracy Board",
  architecture: "Blast Radius Map",
  cheatsheet: "Things You'll Google Anyway",
  slides: "The Long Way Round",
};

/** What each type is, in one line, for cards and the empty state. */
export const REFERENCE_TYPE_NOTE: Record<ReferenceSheetType, string> = {
  manual: "Every step you will be told you should have done, in order, while it still helps.",
  mindmap: "One topic, every thread pinned, the string in order.",
  architecture: "Every part, every connection, and how far one mistake travels.",
  cheatsheet: "The one page you keep open in the other tab.",
  slides: "A system, step by step, ending where it breaks.",
};

/** One step of a sheet: the thing to do, how you know it worked, how it fails. */
export interface SheetStep {
  id: string;
  /** The instruction, as a sentence you can act on. */
  do: string;
  /** How you can tell it worked, without trusting anyone's word for it. */
  check: string;
  /** What it looks like when this step was skipped or done badly. */
  fails: string;
}

/**
 * A tool, described from its own documentation: what it is for, what it does
 * not do, a link to the docs, and the date that was true. No rankings, no
 * prices, no "best".
 */
export interface ToolNote {
  name: string;
  forWhat: string;
  notFor: string;
  docs: string;
  /** YYYY-MM-DD: when the docs said so. */
  asOf: string;
}

export interface ReferenceSheet {
  slug: string;
  /** The joke. */
  title: string;
  /** A short label on the cover, under the person who read it. Its own joke. */
  quip?: string;
  type: ReferenceSheetType;
  /** The plain promise, finishing "After this, you can ...". */
  promise: string;
  /** Two or three sentences: the situation this sheet is for. */
  summary: string;
  /** The Systems article that explains why. Its stage is shown with it. */
  article: string;
  steps?: SheetStep[];
  tools?: ToolNote[];
  /** Where the sheet stops: what doing all of this still does not give you. */
  stops: string;
  /** Every outside claim's source. */
  sources: { label: string; url: string }[];
  /** A scroll scene drawn for the steps (illustrations/scenes), if any. */
  scene?: string;
  publishDate: string;
  updatedAt?: string;
}

export const REFERENCE_SHEETS: ReferenceSheet[] = [];

export function getReferenceSheets(): ReferenceSheet[] {
  return [...REFERENCE_SHEETS].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}
