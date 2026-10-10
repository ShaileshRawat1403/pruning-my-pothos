import SpotlightCard from "../../components/SpotlightCard";
import SectionHeader from "../../components/SectionHeader";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { SHELF_CATEGORIES } from "../../lib/content/shelf";
import { BUILDER_SECTION } from "../../lib/content/reference-sheets";

export const metadata = constructMetadata({
  title: "Shelf",
  description: "A curated shelf of local experiments, notes, tools, philosophy, music, and shared AI resources.",
  path: "/shelf",
  image: "/og-default.png"
});

export default function ShelfIndexPage() {
  const schema = getWebPageSchema({
    title: "Shelf | A Thinking Workspace",
    description: "A curated shelf of local experiments, notes, tools, philosophy, music, and shared AI resources.",
    path: "/shelf"
  });

  const categories = SHELF_CATEGORIES;

  return (
    <div className="relative flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Section header */}
      <SectionHeader
        eyebrow="Workspace"
        title="Shelf"
        intro="A working shelf of experiments, notes, tools, philosophy, music, and shared resources."
        scene="shelf"
        tick="var(--accent-cyan)"
      />


      {/* Grid List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <SpotlightCard key={idx} href={cat.path} accent="var(--accent-cyan)" className="gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>CATEGORY {idx + 1}</span>
              <h2 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {cat.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {cat.description}
              </p>
            </div>
            <span
              className="text-xs font-semibold self-start inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
              style={{ color: "var(--accent-cyan)" }}
            >
              Browse Category ➔
            </span>
          </SpotlightCard>
        ))}
        <SpotlightCard href="/shelf/reference/" accent="var(--accent-cyan)" className="gap-4 justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>FOR BUILDERS</span>
            <h2 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {BUILDER_SECTION.name}
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {BUILDER_SECTION.tagline}
            </p>
          </div>
          <span
            className="text-xs font-semibold self-start inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
            style={{ color: "var(--accent-cyan)" }}
          >
            Open the manuals ➔
          </span>
        </SpotlightCard>
      </section>
    </div>
  );
}
