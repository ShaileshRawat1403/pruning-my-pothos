import { allSystems } from "content-collections";

// Storyboard Explainers is a derived reader surface, not a content collection.
// Every entry below is owned by the Systems article it came from, and nothing
// here is authored twice: the index reads whatever the article already declares
// and renders a way in. Adding a visual to an article adds it here; removing one
// removes it here. There is no registry to keep in sync, which is the whole
// point -- a second list would be a second content graph.
//
// Articles declare a visual in one of two ways today, so this reads both:
//
//   1. visuals[] in frontmatter. Structured, validated by the editorial
//      contract, and the preferred mechanism going forward. Carries an explicit
//      takeaway, caption and alt.
//   2. <figure class="diagram"> in the body. Older, and metadata varies: the
//      inline-SVG figures carry <title> and <desc>, the iframe ones carry only
//      a <figcaption>.
//
// A figure that declares neither a title nor a caption is skipped rather than
// given an invented label.

export type StoryboardSource = "visuals" | "inline-svg" | "embedded-scene";

export interface StoryboardEntry {
  /** Owning article slug. The entry links to the article, never to itself. */
  slug: string;
  articleTitle: string;
  /** Stable within an article; used for the deep link anchor. */
  id: string;
  /** What the visual establishes, in one line. */
  heading: string;
  /** The article's own caption for the visual. */
  caption: string;
  /** Accessible description where the article declares one. */
  alt?: string;
  /** Which declaration this came from, so the surface can be honest about it. */
  source: StoryboardSource;
  /** visuals[] only: the declared purpose (sequence, comparison, layers, …). */
  purpose?: string;
}

const FIGURE_RE = /<figure\s+class="[^"]*diagram[^"]*"[\s\S]*?<\/figure>/g;
const TITLE_RE = /<title[^>]*>([\s\S]*?)<\/title>/;
const DESC_RE = /<desc[^>]*>([\s\S]*?)<\/desc>/;
const FIGCAPTION_RE = /<figcaption>([\s\S]*?)<\/figcaption>/;

function clean(value: string | undefined): string {
  return value ? value.replace(/\s+/g, " ").trim() : "";
}

/** First sentence of a caption, used as a heading when a figure has no title. */
function firstSentence(value: string): string {
  const match = value.match(/^[^.]+\./);
  return clean(match ? match[0] : value);
}

function slugifyId(value: string, fallback: string): string {
  const id = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return id || fallback;
}

export function getStoryboardEntries(): StoryboardEntry[] {
  const entries: StoryboardEntry[] = [];

  for (const system of allSystems) {
    const slug = system._meta.path;
    const articleTitle = system.title;

    // 1. Structured visuals take precedence: they already carry every field
    //    this surface needs, declared and validated.
    if (Array.isArray(system.visuals) && system.visuals.length > 0) {
      for (const visual of system.visuals) {
        entries.push({
          slug,
          articleTitle,
          id: visual.id,
          heading: clean(visual.takeaway),
          caption: clean(visual.caption),
          alt: clean(visual.alt) || undefined,
          source: "visuals",
          purpose: visual.purpose,
        });
      }
      continue;
    }

    // 2. Otherwise read the figures the body already declares.
    const figures = system.content.match(FIGURE_RE) ?? [];
    figures.forEach((figure, index) => {
      const title = clean((figure.match(TITLE_RE) ?? [])[1]);
      const desc = clean((figure.match(DESC_RE) ?? [])[1]);
      const figcaption = clean((figure.match(FIGCAPTION_RE) ?? [])[1]);

      // Nothing to label it with, so it is not surfaced.
      if (!title && !figcaption) return;

      entries.push({
        slug,
        articleTitle,
        id: slugifyId(title || figcaption, `figure-${index + 1}`),
        heading: title || firstSentence(figcaption),
        caption: figcaption || title,
        alt: desc || undefined,
        source: /<iframe/.test(figure) ? "embedded-scene" : "inline-svg",
      });
    });
  }

  // Stable order: article title, then declaration order within the article.
  return entries.sort((a, b) =>
    a.articleTitle === b.articleTitle
      ? 0
      : a.articleTitle.localeCompare(b.articleTitle),
  );
}
