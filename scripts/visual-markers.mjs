/**
 * visual-markers.mjs — Canonical Shared Marker Authority for Pruning My Pothos
 *
 * Implements:
 * 1. Line-oriented fenced-code masking (CommonMark rules, tracks \` and ~ fences,
 *    supports >= 3 fence lengths, nested fence protection).
 * 2. Strict canonical visual marker scanning (<!-- pmp:visual id="..." -->).
 * 3. Malformed candidate marker detection for fail-closed validation.
 * 4. Reserved internal placeholder protection.
 * 5. Single-parse placeholder preparation and post-parse HTML segment splitting.
 *
 * Genuinely shared between the governor (scripts/lint-editorial-v1.mjs) and
 * the runtime renderer (src/lib/visual-segments.ts).
 */

import crypto from "node:crypto";

export const RESERVED_INTERNAL_PREFIX = "pmp-internal-visual-";
export const CANONICAL_MARKER_REGEX = /^<!--\s*pmp:visual\s+id="([a-z0-9-]+)"\s*-->$/;

/**
 * Checks whether text contains the reserved internal placeholder namespace.
 * Authored source must NEVER contain this namespace.
 */
export function containsReservedPlaceholder(rawText) {
  return typeof rawText === "string" && rawText.includes(RESERVED_INTERNAL_PREFIX);
}

/**
 * Masks fenced code blocks line-by-line according to CommonMark specification:
 * - Fence character can be \` or ~
 * - Opening fence must have >= 3 fence characters (with 0-3 leading spaces)
 * - Backtick opening fence cannot contain backticks in the info string
 * - Closing fence must use the SAME fence character, with length >= opening length,
 *   and only optional trailing whitespace
 *
 * Replaces characters inside fenced blocks (including opening and closing lines)
 * with space characters, preserving exact character offsets and string length.
 */
export function maskFencedCodeBlocks(markdown) {
  if (typeof markdown !== "string" || markdown.length === 0) {
    return "";
  }

  const chars = markdown.split("");
  const len = markdown.length;

  let inFence = false;
  let fenceChar = null;
  let fenceLength = 0;
  let lineStart = 0;

  while (lineStart < len) {
    let lineEnd = markdown.indexOf("\n", lineStart);
    let nextLineStart = lineEnd === -1 ? len : lineEnd + 1;
    let contentEnd = lineEnd === -1 ? len : lineEnd;

    // Normalize carriage return if present
    if (contentEnd > lineStart && markdown[contentEnd - 1] === "\r") {
      contentEnd--;
    }

    const line = markdown.slice(lineStart, contentEnd);

    if (!inFence) {
      const openMatch = line.match(/^[ ]{0,3}(`{3,}|~{3,})(.*)$/);
      if (openMatch) {
        const char = openMatch[1][0];
        const fLen = openMatch[1].length;
        const rest = openMatch[2];

        // Disallow backticks in the info string of backtick fences
        if (!(char === "`" && rest.includes("`"))) {
          inFence = true;
          fenceChar = char;
          fenceLength = fLen;
          for (let k = lineStart; k < contentEnd; k++) {
            chars[k] = " ";
          }
        }
      }
    } else {
      const closeMatch = line.match(/^[ ]{0,3}(`{3,}|~{3,})\s*$/);
      if (closeMatch && closeMatch[1][0] === fenceChar && closeMatch[1].length >= fenceLength) {
        inFence = false;
        fenceChar = null;
        fenceLength = 0;
        for (let k = lineStart; k < contentEnd; k++) {
          chars[k] = " ";
        }
      } else {
        for (let k = lineStart; k < contentEnd; k++) {
          chars[k] = " ";
        }
      }
    }

    lineStart = nextLineStart;
  }

  return chars.join("");
}

/**
 * Scans markdown body text for active PMP visual markers and malformed candidates.
 * Ignores any markers located within fenced code blocks.
 */
export function scanVisualMarkers(rawContent) {
  const validMarkers = [];
  const malformedMarkers = [];

  if (typeof rawContent !== "string" || rawContent.length === 0) {
    return { validMarkers, malformedMarkers };
  }

  const masked = maskFencedCodeBlocks(rawContent);
  const commentRegex = /<!--([\s\S]*?)-->/g;

  let match;
  while ((match = commentRegex.exec(masked)) !== null) {
    const fullComment = rawContent.slice(match.index, match.index + match[0].length);
    const commentBody = match[1];

    // Check if this comment is a candidate PMP marker
    if (/^\s*pmp(?::|\b)/i.test(commentBody)) {
      const canonicalMatch = fullComment.match(CANONICAL_MARKER_REGEX);
      if (canonicalMatch) {
        validMarkers.push({
          id: canonicalMatch[1],
          raw: fullComment,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
        });
      } else {
        malformedMarkers.push({
          raw: fullComment,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          error: `Malformed PMP visual marker syntax: "${fullComment}". Expected format: <!-- pmp:visual id="kebab-case-id" -->`,
        });
      }
    }
  }

  return { validMarkers, malformedMarkers };
}

/**
 * Replaces active markers in markdown with inert internal HTML comment sentinels.
 * Generates a deterministic content token from the raw markdown.
 */
export function prepareMarkdownWithPlaceholders(content, visuals = []) {
  if (containsReservedPlaceholder(content)) {
    throw new Error(
      `Authored content contains reserved internal placeholder prefix "${RESERVED_INTERNAL_PREFIX}"`
    );
  }

  const { validMarkers } = scanVisualMarkers(content);
  if (validMarkers.length === 0) {
    return { preparedMarkdown: content, orderedVisuals: [], contentToken: "" };
  }

  const visualMap = new Map((visuals || []).map((v) => [v.id, v]));
  const orderedVisuals = [];
  const contentToken = crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);

  let preparedMarkdown = "";
  let lastIndex = 0;

  for (let i = 0; i < validMarkers.length; i++) {
    const marker = validMarkers[i];
    const visual = visualMap.get(marker.id);
    if (!visual) {
      continue;
    }

    preparedMarkdown += content.slice(lastIndex, marker.startIndex);
    const slotIndex = orderedVisuals.length;
    preparedMarkdown += `\n\n<!-- ${RESERVED_INTERNAL_PREFIX}slot:${contentToken}:${slotIndex} -->\n\n`;
    orderedVisuals.push(visual);
    lastIndex = marker.endIndex;
  }

  preparedMarkdown += content.slice(lastIndex);
  return { preparedMarkdown, orderedVisuals, contentToken };
}

/**
 * Splits rendered HTML on internal comment sentinels into HtmlSegment and VisualSegment.
 */
export function splitRenderedHtml(html, orderedVisuals = [], contentToken = "") {
  if (!orderedVisuals || orderedVisuals.length === 0 || !contentToken) {
    return [{ type: "html", html }];
  }

  const sentinelRegex = new RegExp(
    `(?:<p>\\s*)?<!--\\s*${RESERVED_INTERNAL_PREFIX}slot:${contentToken}:(\\d+)\\s*-->(?:\\s*<\\/p>)?`,
    "g"
  );

  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = sentinelRegex.exec(html)) !== null) {
    const htmlChunk = html.slice(lastIndex, match.index);
    if (htmlChunk.trim().length > 0) {
      segments.push({ type: "html", html: htmlChunk });
    }

    const visualIndex = parseInt(match[1], 10);
    const visual = orderedVisuals[visualIndex];
    if (visual) {
      segments.push({ type: "visual", visual });
    }

    lastIndex = match.index + match[0].length;
  }

  const remaining = html.slice(lastIndex);
  if (remaining.trim().length > 0) {
    segments.push({ type: "html", html: remaining });
  }

  return segments.length > 0 ? segments : [{ type: "html", html }];
}
