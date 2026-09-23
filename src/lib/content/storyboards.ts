import { allSystems } from "content-collections";
import type { Visual } from "../visual-types";
import { SYSTEMS_MAP_SLUGS } from "./systems-map";

// Storyboard Explainers is a derived reader surface, not a content collection.
// Every entry below is owned by the Systems article it came from, and nothing
// here is authored twice: the index reads the article's own `visuals[]`
// declaration and renders the same visual the article renders, through the same
// runtime. Adding a visual to an article adds it here; removing one removes it.
// There is no registry to keep in sync, which is the whole point -- a second
// list would be a second content graph.
//
// S3 removed the bootstrap fallback that used to parse <figure class="diagram">
// out of MDX bodies. It existed to populate this surface before structured
// visuals did, and it could not produce a preview, a real purpose, or a title
// distinct from its caption. All six storyboard-bearing articles now declare
// `visuals[]`, so the fallback had no remaining consumer here.
//
// Note this removed the fallback from *this derivation only*. Raw
// <figure class="diagram"> markup is still rendered in article bodies, and is
// still used by content outside Systems; the CSS and the article pipeline that
// support it are untouched.

export interface StoryboardEntry {
  /** Owning article slug. The entry links to the article, never to itself. */
  slug: string;
  articleTitle: string;
  /** The visual's declared id, unique within its article. */
  id: string;
  /** What the visual establishes, in one line. Its declared takeaway. */
  heading: string;
  /** The article's own caption for the visual. */
  caption: string;
  /** The declared semantic form, for reader-facing labelling. */
  purpose: string;
  /** The visual itself, so the surface renders it rather than describing it. */
  visual: Visual;
  /** True when the owning article is one of the eight Systems Map stages. */
  isMapStage: boolean;
}

/** Reader-facing wording for a declared purpose. Never the renderer name. */
const PURPOSE_LABEL: Record<string, string> = {
  sequence: "Sequence",
  layers: "Layers",
  boundary: "Boundary",
  comparison: "Comparison",
  decision: "Decision",
  "evidence-map": "Evidence map",
  "state-change": "State change",
};

export function purposeLabel(purpose: string): string {
  return PURPOSE_LABEL[purpose] ?? "Diagram";
}

export function getStoryboardEntries(): StoryboardEntry[] {
  const entries: StoryboardEntry[] = [];

  for (const system of allSystems) {
    if (!Array.isArray(system.visuals) || system.visuals.length === 0) continue;

    for (const visual of system.visuals as Visual[]) {
      entries.push({
        slug: system._meta.path,
        articleTitle: system.title,
        id: visual.id,
        heading: visual.takeaway,
        caption: visual.caption,
        purpose: visual.purpose,
        visual,
        isMapStage: SYSTEMS_MAP_SLUGS.includes(system._meta.path),
      });
    }
  }

  // Map stages first, so the eight-stage backbone reads as the spine of the
  // library rather than being scattered through it alphabetically. Within each
  // group, by article title.
  return entries.sort((a, b) => {
    if (a.isMapStage !== b.isMapStage) return a.isMapStage ? -1 : 1;
    return a.articleTitle.localeCompare(b.articleTitle);
  });
}
