// The site's information architecture, in one place. The header, the section
// sub-navigation and the footer all read from here, so a page cannot be added
// to one and forgotten in the others.
//
// Five sections. Stack and Self hold several pages each; every public page
// belongs to exactly one section, so every page is two clicks from anywhere.

export interface NavItem {
  label: string;
  href: string;
  /** Path prefixes that count as this item, when more than its own href. */
  match?: string[];
  /** A second row, shown on this item's pages. */
  sub?: NavItem[];
}

export interface Section {
  key: "systems" | "storyboards" | "stack" | "shelf" | "self";
  label: string;
  href: string;
  /** One line for the footer. */
  blurb: string;
  items: NavItem[];
}

export const SECTIONS: Section[] = [
  {
    key: "systems",
    label: "Systems",
    href: "/systems/",
    blurb: "Explainers, in the order a system asks its questions.",
    items: [{ label: "All articles", href: "/systems/" }],
  },
  {
    key: "storyboards",
    label: "Storyboards",
    href: "/storyboards/",
    blurb: "Each explainer, drawn. Flip through or keep the PDF.",
    items: [{ label: "All storyboards", href: "/storyboards/" }],
  },
  {
    key: "stack",
    label: "Stack",
    href: "/stack/",
    blurb: "The workshop: what is being built, and the tools that fell out of it.",
    items: [
      { label: "Projects", href: "/stack/" },
      { label: "Tools", href: "/tools/" },
      { label: "Canvases", href: "/canvases/" },
      { label: "Docs", href: "/docs/" },
      { label: "Live lab", href: "/live-lab/" },
    ],
  },
  {
    key: "shelf",
    label: "Shelf",
    href: "/shelf/",
    blurb: "What informed the work, and reference sheets to keep.",
    items: [
      { label: "The shelf", href: "/shelf/" },
      { label: "Reference sheets", href: "/shelf/reference/" },
    ],
  },
  {
    key: "self",
    label: "Self",
    href: "/about/",
    blurb: "Who is doing this, how, and the writing around it.",
    items: [
      { label: "Work", href: "/portfolio/" },
      {
        label: "Writing",
        href: "/sentences/",
        match: ["/sentences", "/sentiments"],
        sub: [
          { label: "Sentences", href: "/sentences/" },
          { label: "Sentiments", href: "/sentiments/" },
        ],
      },
      { label: "Schema", href: "/schema/" },
      { label: "Calibrations", href: "/self/" },
      { label: "About", href: "/about/" },
    ],
  },
];

const trim = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

/** True when `pathname` is `prefix` or a page beneath it. */
export function under(pathname: string, prefix: string): boolean {
  const p = trim(pathname);
  const x = trim(prefix);
  return p === x || p.startsWith(x + "/");
}

function itemMatches(pathname: string, item: NavItem): boolean {
  return (item.match ?? [item.href]).some((m) => under(pathname, m));
}

/** The section a path belongs to, if any, and the item within it. */
export function locate(pathname: string): { section: Section; item?: NavItem } | undefined {
  for (const section of SECTIONS) {
    // Longest match wins, so /shelf/reference/ is Reference sheets, not The shelf.
    const item = [...section.items]
      .sort((a, b) => b.href.length - a.href.length)
      .find((i) => itemMatches(pathname, i));
    if (item) return { section, item };
    if (under(pathname, section.href)) return { section };
  }
  return undefined;
}
