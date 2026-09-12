/**
 * visual-segments.ts — Single-parse rendering pipeline for inline visual articles.
 *
 * Preserves full document state (heading counts, reference links, footnotes)
 * by invoking renderMarkdown() exactly once per article.
 */

import { renderMarkdown } from "./markdown";
import {
  prepareMarkdownWithPlaceholdersTyped,
  splitRenderedHtmlTyped,
  type ArticleSegment,
} from "./visual-markers";
import type { Visual } from "./visual-types";

export function renderArticleSegments(
  content: string,
  visuals: Visual[] = []
): ArticleSegment[] {
  if (!visuals || visuals.length === 0) {
    return [{ type: "html", html: renderMarkdown(content) }];
  }

  const { preparedMarkdown, orderedVisuals, contentToken } =
    prepareMarkdownWithPlaceholdersTyped(content, visuals);

  if (orderedVisuals.length === 0) {
    return [{ type: "html", html: renderMarkdown(content) }];
  }

  // Parse markdown ONCE across the complete document
  const fullHtml = renderMarkdown(preparedMarkdown);

  // Split rendered HTML on internal comment sentinels
  return splitRenderedHtmlTyped(fullHtml, orderedVisuals, contentToken);
}
