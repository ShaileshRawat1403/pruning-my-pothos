/**
 * Works On My Prompt: the builder section on the Shelf (/shelf/reference/).
 * Sheets and field manuals for people AI promoted to builder without asking.
 * The plan, the voice and the order of work are in docs/BUILDER_TRACK.md.
 *
 * Two ways a sheet is made, and each says so on the page:
 * - "notebooklm": drafted in NotebookLM, reviewed and edited before upload
 *   (docs/REFERENCE_SHEETS_PROMPTS.md). Never a raw export.
 * - "pmp": written and drawn here, under the editorial contract.
 *
 * To publish one: put its files in public/reference/, add an entry below.
 * While the list is empty, /shelf/reference/ is a noindexed placeholder and
 * stays out of the sitemap.
 */

/** The section's name, everywhere it appears. */
export const BUILDER_SECTION = {
  name: "Works On My Prompt",
  tagline: "Field manuals for people AI promoted to builder without asking.",
  intro:
    "You can build software now. Nobody checked whether you wanted to. These are the sheets for the part after the demo works: what to set up, what to check, and where it quietly breaks. Each one links back to the Systems article that explains why.",
};

/**
 * Keys stay plain so data never has to change; labels carry the voice.
 * `manual` is the step-by-step playbook: do this, check that, here is what
 * failure looks like.
 */
export type ReferenceSheetType = "slides" | "architecture" | "cheatsheet" | "mindmap" | "manual";

export interface ReferenceSheet {
  slug: string;
  title: string;
  type: ReferenceSheetType;
  /** One or two sentences: what the sheet helps you do. */
  summary: string;
  /** Under public/, e.g. /reference/designing-apis--slides.pdf */
  file: string;
  /** Under public/: a first-page image for the card. */
  thumbnail: string;
  pages?: number;
  /** Systems article slugs this sheet connects to. */
  related: string[];
  /** Titles or URLs of the sources it was drafted from. */
  sources: string[];
  /** Who drafted it. A NotebookLM draft carries the disclosure below. */
  drafted: "notebooklm" | "pmp";
  publishDate: string;
}

export const REFERENCE_DISCLOSURE = "Drafted with NotebookLM, edited by Pruning My Pothos.";

export const REFERENCE_TYPE_LABEL: Record<ReferenceSheetType, string> = {
  slides: "The Long Way Round",
  architecture: "Blast Radius Map",
  cheatsheet: "Things You'll Google Anyway",
  mindmap: "Conspiracy Board",
  manual: "Field Manual",
};

/** What each type is, in one line, for cards and the empty state. */
export const REFERENCE_TYPE_NOTE: Record<ReferenceSheetType, string> = {
  slides: "A system, step by step, ending where it breaks.",
  architecture: "Every part, every connection, and how far one mistake travels.",
  cheatsheet: "The one page you keep open in the other tab.",
  mindmap: "One topic, every thread pinned, the string in order.",
  manual: "Do this. Check that. Here is what failure looks like.",
};

export const REFERENCE_SHEETS: ReferenceSheet[] = [];

export function getReferenceSheets(): ReferenceSheet[] {
  return [...REFERENCE_SHEETS].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}
