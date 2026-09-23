import { allShelves } from "content-collections";

// The Shelf categories the section index advertises, shared so the homepage
// preview and /shelf cannot disagree about what the Shelf contains.
//
// Note for later: allShelves also holds entries under "books" and "culture",
// and both routes build, but neither is advertised on /shelf. That predates
// this work and is left alone here -- surfacing them is an editorial decision,
// not a homepage one.
export interface ShelfCategory {
  title: string;
  description: string;
  path: string;
}

export const SHELF_CATEGORIES: ShelfCategory[] = [
  {
    title: "Local Experiments",
    description: "Tests, failures, and learnings from hands-on work.",
    path: "/shelf/local-experiments",
  },
  {
    title: "Notes",
    description: "Drafts, fragments, and working lines of thought.",
    path: "/shelf/notes",
  },
  {
    title: "Music",
    description: "Soundtracks for focus, drift, and flow.",
    path: "/shelf/music",
  },
  {
    title: "Tools",
    description: "The stack I reach for and the trade-offs I accept.",
    path: "/shelf/tools",
  },
  {
    title: "Philosophy",
    description: "Personal philosophies and the sources behind them.",
    path: "/shelf/philosophy",
  },
  {
    title: "Shared Resources",
    description: "References, guides, and links I return to.",
    path: "/shelf/shared-resources",
  },
];

/** How many entries each advertised category actually holds, counted at build. */
export function getShelfCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of SHELF_CATEGORIES) {
    const slug = category.path.replace("/shelf/", "");
    counts[slug] = allShelves.filter(
      (item) => item._meta.path.split("/")[0] === slug,
    ).length;
  }
  return counts;
}
