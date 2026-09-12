/**
 * visual-markers.ts — Re-exports the shared marker authority with TypeScript definitions.
 * Genuinely imports the single authoritative scanner from scripts/visual-markers.mjs.
 */

import {
  RESERVED_INTERNAL_PREFIX,
  CANONICAL_MARKER_REGEX,
  containsReservedPlaceholder,
  maskFencedCodeBlocks,
  scanVisualMarkers,
  prepareMarkdownWithPlaceholders,
  splitRenderedHtml,
} from "../../scripts/visual-markers.mjs";
import type { Visual } from "./visual-types";

export interface VisualMarker {
  id: string;
  raw: string;
  startIndex: number;
  endIndex: number;
}

export interface MalformedMarker {
  raw: string;
  startIndex: number;
  endIndex: number;
  error: string;
}

export type HtmlSegment = {
  type: "html";
  html: string;
};

export type VisualSegment = {
  type: "visual";
  visual: Visual;
};

export type ArticleSegment = HtmlSegment | VisualSegment;

export const scanVisualMarkersTyped: (rawContent: string) => {
  validMarkers: VisualMarker[];
  malformedMarkers: MalformedMarker[];
} = scanVisualMarkers;

export const prepareMarkdownWithPlaceholdersTyped: (
  content: string,
  visuals?: Visual[]
) => {
  preparedMarkdown: string;
  orderedVisuals: Visual[];
  contentToken: string;
} = prepareMarkdownWithPlaceholders;

export const splitRenderedHtmlTyped = splitRenderedHtml as (
  html: string,
  orderedVisuals?: Visual[],
  contentToken?: string
) => ArticleSegment[];

export {
  RESERVED_INTERNAL_PREFIX,
  CANONICAL_MARKER_REGEX,
  containsReservedPlaceholder,
  maskFencedCodeBlocks,
  scanVisualMarkers,
  prepareMarkdownWithPlaceholders,
  splitRenderedHtml,
};
