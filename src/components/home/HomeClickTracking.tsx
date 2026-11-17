"use client";

import { useEffect } from "react";
import { track } from "../../lib/analytics/track";

/**
 * Records which home page link a visitor followed, as one GA4
 * `select_content` event per click:
 *
 * - `content_type`: what the link leads to (article, storyboard,
 *   stack_project, ...), from its path.
 * - `item_id`: the link's path, plus its #hash for in-page links.
 * - `section`: the id of the home page section the link sits in (hero,
 *   systems-map, stack, ...).
 * - `link_role`: "prism_band" for the prism's seven labels, else "link".
 *
 * Only links inside the home page's own sections count; the header and
 * footer are left out. Links to other sites are left to GA4's outbound
 * click measurement, and PDF links to its `file_download`, so neither is
 * counted twice. A middle click (auxclick) is not counted.
 */
const HOME_SECTIONS = new Set([
  "hero",
  "method",
  "systems-map",
  "selected-systems",
  "reference-sheets",
  "stack",
  "shelf",
]);

function contentType(url: URL): string {
  const p = url.pathname;
  if (url.hash && p === window.location.pathname) return "in_page";
  if (p.startsWith("/systems/")) return p === "/systems/" ? "systems_index" : "article";
  if (p.startsWith("/storyboards/")) return p === "/storyboards/" ? "storyboards_index" : "storyboard";
  if (p.startsWith("/stack/")) return p === "/stack/" ? "stack_index" : "stack_project";
  if (p.startsWith("/shelf/")) return "shelf";
  if (p.startsWith("/tools/")) return "tool";
  return "page";
}

export default function HomeClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const section = link.closest("section[id]");
      if (!section || !HOME_SECTIONS.has(section.id)) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname.toLowerCase().endsWith(".pdf")) return;

      track("select_content", {
        content_type: contentType(url),
        item_id: url.pathname + (contentType(url) === "in_page" ? url.hash : ""),
        section: section.id,
        link_role: link.classList.contains("prism-label") ? "prism_band" : "link",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
