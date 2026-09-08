import { allSelves, allSentences, allShelves, allSystems, allStickyNotes } from "content-collections";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import SentimentsClient from "../../components/SentimentsClient";
import PlateHero from "../../components/PlateHero";
import SceneFigure from "../../components/SceneFigure";
import { renderMarkdown } from "../../lib/markdown";

const LLULL_LINES = [
  "I built a machine of paper wheels to turn every idea against every other. You would call it a search space.",
  "Truth, I decided, could be spun. Give the discs a question and let them gossip.",
  "They thought me mad for mechanizing thought. Six centuries early, apparently.",
  "Faith and logic in the same hand. I never saw why you must drop one to hold the other.",
  "Every combination I could name, the wheels would find. The trick was asking the right one.",
];

export const metadata = constructMetadata({
  title: "Sentiments Index",
  description: "A calm, reading-first index of conceptual maps, reflections, and notes detailing the Sentiments workspace.",
  path: "/sentiments"
});

export default function SentimentsIndexPage() {
  const schema = getWebPageSchema({
    title: "Sentiments Index | Pruning My Pothos",
    description: "A calm, reading-first index of conceptual maps, reflections, and notes detailing the Sentiments workspace.",
    path: "/sentiments"
  });

  // Map Sentences
  const mappedSentences = allSentences.map((item) => ({
    id: `sentence-${item._meta.path}`,
    title: item.title,
    description: item.summary || item.title,
    rawDate: undefined,
    publishDate: undefined, // Sentences do not have explicit publishDate fields
    readingTime: item.readingTime,
    difficulty: item.difficulty,
    featured: item.featured,
    tags: item.tags || [],
    url: `/sentences/${item._meta.path}`,
    type: "reflections" as const,
    typeName: "Reflections",
    typeColor: "var(--accent-blue)"
  }));

  // Map Selves
  const mappedSelves = allSelves.map((item) => ({
    id: `self-${item._meta.path}`,
    title: item.title,
    description: item.description,
    rawDate: item.publishDate,
    publishDate: item.publishDate ? (() => {
      const d = new Date(item.publishDate);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    })() : undefined,
    readingTime: item.readingTime,
    difficulty: item.difficulty,
    featured: item.featured,
    tags: item.tags || [],
    url: `/self/${item._meta.path}`,
    type: "calibrations" as const,
    typeName: "Calibrations",
    typeColor: "var(--accent-pink)"
  }));

  // Map Shelves
  const mappedShelves = allShelves.map((item) => {
    const slug = item._meta.fileName.replace(/\.mdx?$/, "");
    return {
      id: `shelf-${slug}`,
      title: item.title,
      description: item.description,
      rawDate: item.publishDate,
      publishDate: item.publishDate ? (() => {
        const d = new Date(item.publishDate);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
      })() : undefined,
      readingTime: item.readingTime,
      difficulty: item.difficulty,
      featured: item.featured,
      tags: item.tags || [],
      url: `/shelf/${item._meta.directory}/${slug}`,
      type: "curations" as const,
      typeName: "Curations",
      typeColor: "var(--accent-amber)"
    };
  });

  // Map Systems
  const mappedSystems = allSystems.map((item) => ({
    id: `system-${item._meta.path}`,
    title: item.title,
    description: item.description,
    rawDate: undefined,
    publishDate: undefined, // Systems do not have publishDates in standard frontmatter
    readingTime: item.readingTime,
    difficulty: item.difficulty,
    featured: item.featured,
    tags: item.tags || [],
    url: `/systems/${item._meta.path}`,
    type: "systems" as const,
    typeName: "Systems",
    typeColor: "var(--accent-cyan)"
  }));

  // Map Sticky Notes
  const mappedStickyNotes = allStickyNotes.map((item, index) => ({
    id: `sticky-${item._meta.path || index}`,
    title: item.title,
    rotation: item.rotation,
    color: item.color,
    content: renderMarkdown(item.content),
    tags: item.tags || [],
    type: "sticky-notes" as const
  }));

  // Combine and sort standard posts (date-sorted or alphabetical if no date)
  const allPosts = [
    ...mappedSentences,
    ...mappedSelves,
    ...mappedShelves,
    ...mappedSystems
  ].sort((a, b) => {
    if (a.rawDate && b.rawDate) {
      return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="relative w-full flex flex-col gap-16 max-w-[1000px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - Ramon Llull and his thinking wheels */}
      <PlateHero
        eyebrow="The Workspace"
        title="Sentiments"
        intro="A calm, text-led repository of notes, short reflective essays, and shared collections. Lean on the plate and Ramon Llull will spin his wheels of thought for you."
        htmlSrc="/scenes/character.html?img=/images/characters/ramon-llull-combinatorial-wheels.jpg&fallback=/scenes/llull.html"
        alt="Oil painting of Ramon Llull turning his lettered combinatorial wheels in a candlelit study, glowing logic linking the letters"
        plateLabel="Plate · llull_wheels"
        caption="He mechanized thought in 1305."
        attribution="R. Llull"
        quotes={LLULL_LINES}
        accent="var(--accent-purple)"
      />

      <SceneFigure
        src="/scenes/llull.html"
        label="Figure · llull_wheels"
        accent="var(--accent-purple)"
        caption="Llull's combinatorial wheels: turn every idea against every other and read what the discs propose. A search space in brass and vellum, six centuries before we had a word for it."
      />

      {/* Interactive client panel */}
      <SentimentsClient initialPosts={allPosts} stickyNotes={mappedStickyNotes} />

      {/* Ada Lovelace quote */}
      <section className="p-6 font-mono text-xs relative overflow-hidden ledger-surface" style={{ borderRadius: "4px" }}>
        <div
          className="flex justify-between items-center pb-3 mb-3 text-[10px]"
          style={{ borderBottom: "1px solid var(--card-border)", color: "var(--text-muted)" }}
        >
          <span>LIBRARY_MONITOR // lovelace.tty</span>
          <span style={{ color: "var(--accent-cyan)" }}>[READING_MODE_ACTIVE]</span>
        </div>
        <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          &ldquo;We may say most aptly that the Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.&rdquo;
          <span className="ml-1 font-semibold" style={{ color: "var(--text-primary)" }}>
            Ada Lovelace, 1843
          </span>
        </p>
      </section>
    </div>
  );
}
