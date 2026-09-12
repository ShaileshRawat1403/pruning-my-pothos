/**
 * markdown-renderer.mjs — Shared Markdown compilation engine for Pruning My Pothos
 */

import { marked } from "marked";

marked.use({
  gfm: true,
  breaks: false,
});

function plainTextFromTokens(tokens = []) {
  return tokens
    .map((token) => {
      if (token.tokens?.length) {
        return plainTextFromTokens(token.tokens);
      }
      return token.text ?? token.raw ?? "";
    })
    .join("");
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;|&/g, " and ")
    .replace(/&#39;|&apos;/g, "")
    .replace(/&quot;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeHtmlBlock(block) {
  return block.replace(/\{\/\*([\s\S]*?)\*\/\}/g, "<!--$1-->");
}

function protectHtmlBlocks(content) {
  const blocks = [];

  const protect = (block) => {
    const token = `HTML_BLOCK_PLACEHOLDER_${blocks.length}`;
    blocks.push(normalizeHtmlBlock(block));
    return `\n\n${token}\n\n`;
  };

  let processed = content.replace(
    /<(figure|nav|aside|table)\b[\s\S]*?<\/\1>/gi,
    (block) => protect(block)
  );

  processed = processed.replace(
    /<div\b(?=[^>]*class=["'][^"']*table-scroll-wrap[^"']*["'])[\s\S]*?<\/div>/gi,
    (block) => protect(block)
  );

  return {
    processed,
    restore(html) {
      return blocks.reduceRight((output, block, index) => {
        const token = `HTML_BLOCK_PLACEHOLDER_${index}`;
        return output
          .replaceAll(`<p>${token}</p>`, block)
          .replaceAll(token, block);
      }, html);
    },
  };
}

export function renderMarkdown(content) {
  const headingCounts = new Map();
  const renderer = new marked.Renderer();
  const htmlBlocks = protectHtmlBlocks(content);

  renderer.heading = function heading(token) {
    const level = token.depth;
    const renderedText = this.parser.parseInline(token.tokens);
    const baseId = slugifyHeading(plainTextFromTokens(token.tokens)) || `section-${level}`;
    const count = headingCounts.get(baseId) ?? 0;
    headingCounts.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    return `<h${level} id="${id}">${renderedText}</h${level}>\n`;
  };

  const html = marked.parse(htmlBlocks.processed, { async: false, renderer });
  return htmlBlocks.restore(html);
}
