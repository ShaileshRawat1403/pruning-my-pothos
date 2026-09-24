import { allSystems } from "content-collections";
import { SYSTEMS_MAP_SLUGS, getSystemsMap } from "./systems-map";
import { DECKS } from "../../components/illustrations/decks";

/**
 * Storyboards: illustrated PDF explainers, one per Systems article at most.
 *
 * A storyboard is its own entity. The Systems article is the written
 * explanation; its storyboard explains the same idea visually, as a short
 * deck of 4:5 frames that is read on the site or downloaded as a PDF. They
 * link to each other and neither lives inside the other.
 *
 * A storyboard may not claim anything its article does not. Every frame
 * carries a full text version, so the explanation never exists only as a
 * picture; that text also travels with the PDF when it is shared.
 *
 * Storyboards are drawn one at a time, when an article earns one. There is
 * no quota. Each storyboard is one deck file in
 * src/components/illustrations/decks/; see docs/STORYBOARD_AUTHORING.md.
 */

export interface StoryboardFrame {
  key: string;
  title: string;
  /** The frame's full meaning as prose: its accessible text and its caption. */
  text: string;
}

export interface Storyboard {
  /** Owning Systems article slug. Also the storyboard's own slug. */
  slug: string;
  title: string;
  summary: string;
  /** Downloadable 4:5 PDF, rendered from the same frames. By convention. */
  pdf: string;
  /** 1200 x 630 link-preview PNG. By convention. */
  shareImage: string;
  frames: StoryboardFrame[];
}

// The decks are the source: each one is a single file holding a storyboard's
// words and drawings. File paths for the PDF and preview follow from the slug.
const STORYBOARDS: Storyboard[] = DECKS.map((d) => ({
  slug: d.slug,
  title: d.title,
  summary: d.summary,
  pdf: `/storyboards/pdf/${d.slug}.pdf`,
  shareImage: `/storyboards/og/${d.slug}.png`,
  frames: d.frames.map(({ key, title, text }) => ({ key, title, text })),
}));

export type ResolvedStoryboard = Storyboard & {
  articleTitle: string;
  articleHref: string;
  /** The Systems Map stage the owning article anchors, if any. */
  stage?: { number: number; label: string };
};

/**
 * All storyboards, each checked against its owning article (fails the build
 * loudly if one is missing), in reading order: Systems Map stages first, in
 * map order, then everything else by title.
 */
export function getStoryboards(): ResolvedStoryboard[] {
  const map = getSystemsMap();
  return STORYBOARDS.map((sb) => {
    const article = allSystems.find((s) => s._meta.path === sb.slug);
    if (!article) {
      throw new Error(`Storyboard "${sb.slug}" has no owning Systems article.`);
    }
    const i = map.findIndex((m) => m.slug === sb.slug);
    return {
      ...sb,
      articleTitle: article.title,
      articleHref: `/systems/${sb.slug}/`,
      stage: i >= 0 ? { number: i + 1, label: map[i].label } : undefined,
    };
  }).sort((a, b) => {
    const ai = SYSTEMS_MAP_SLUGS.indexOf(a.slug);
    const bi = SYSTEMS_MAP_SLUGS.indexOf(b.slug);
    if (ai !== bi) return (ai < 0 ? Infinity : ai) - (bi < 0 ? Infinity : bi);
    return a.title.localeCompare(b.title);
  });
}

export function getStoryboard(slug: string): ResolvedStoryboard | undefined {
  return getStoryboards().find((s) => s.slug === slug);
}
