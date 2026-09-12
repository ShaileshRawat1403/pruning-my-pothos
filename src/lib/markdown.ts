/**
 * markdown.ts — Markdown compilation engine re-export for Next.js runtime.
 */

import { renderMarkdown as rawRenderMarkdown } from "../../scripts/markdown-renderer.mjs";

export const renderMarkdown: (content: string) => string = rawRenderMarkdown;
