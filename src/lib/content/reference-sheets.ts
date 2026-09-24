/**
 * Reference sheets: downloadable quick-reference assets (slide guides,
 * architecture sheets, cheat sheets, mind maps) drafted in NotebookLM, then
 * reviewed and edited before upload. See docs/REFERENCE_SHEETS_PROMPTS.md for
 * the prompt kit and the review loop. Never add a raw NotebookLM export.
 *
 * To publish one: put its files in public/reference/, add an entry below.
 * While the list is empty, /shelf/reference/ is a noindexed placeholder and
 * stays out of the sitemap.
 */

export type ReferenceSheetType = "slides" | "architecture" | "cheatsheet" | "mindmap";

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
  publishDate: string;
}

export const REFERENCE_DISCLOSURE = "Drafted with NotebookLM, edited by Pruning My Pothos.";

export const REFERENCE_TYPE_LABEL: Record<ReferenceSheetType, string> = {
  slides: "Slide guide",
  architecture: "Architecture sheet",
  cheatsheet: "Cheat sheet",
  mindmap: "Mind map",
};

export const REFERENCE_SHEETS: ReferenceSheet[] = [];

export function getReferenceSheets(): ReferenceSheet[] {
  return [...REFERENCE_SHEETS].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}
