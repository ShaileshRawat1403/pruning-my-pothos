import Link from "next/link";
import SpotlightCard from "../../components/SpotlightCard";
import SectionHeader from "../../components/SectionHeader";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { getSystemsIA, type IaArticle } from "../../lib/content/systems-ia";
import { getStoryboards } from "../../lib/content/storyboards";

export const metadata = constructMetadata({
  title: "Systems",
  description:
    "Eight questions an applied AI system has to answer, the canonical explanation of each, and everything else worth reading alongside them.",
  path: "/systems",
});

export default function SystemsIndexPage() {
  // The map is the index's organising language. Every article is placed
  // against it in lib/content/systems-ia.ts: one flagship per stage, the
  // companions that go deeper, and the short notes. Nothing is left in an
  // unsorted pile, and the build fails if an article has no place.
  const { stages, across } = getSystemsIA();

  // Which articles have a storyboard, so a stage can offer it.
  const storyboardSlugs = new Set(getStoryboards().map((sb) => sb.slug));

  const schema = getWebPageSchema({
    title: "Systems",
    description:
      "Eight questions an applied AI system has to answer, and the canonical explanation of each.",
    path: "/systems",
  });

  return (
    <div className="flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Section header */}
      <SectionHeader
        eyebrow="Architecture"
        title="Systems"
        intro="Eight questions an applied AI system has to answer, in the order the answers depend on each other."
        scene="systems"
        tick="var(--accent-purple)"
      />

      {/* The map. Ruled rows rather than tiles, matching the homepage
          treatment, because the order is the argument. No progress, no
          completion, no step numbering: it is a set of doors, not a course. */}
      <section aria-labelledby="systems-map-title" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-[760px]">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            The systems map
          </span>
          <h2
            id="systems-map-title"
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
          >
            Where are you in the system?
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
            Each stage opens the explanation that deals with it. Follow the
            sequence, or enter where the question becomes useful.
          </p>
        </div>

        <ol className="list-none p-0 m-0 border-t border-[color:var(--card-border)]">
          {stages.map((stage) => {
            return (
              <li
                key={stage.slug}
                className="border-b border-[color:var(--card-border)] py-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr] gap-1 sm:gap-8 sm:items-baseline">
                  <span className="font-heading text-base font-bold text-[color:var(--text-primary)]">
                    <span className="mr-2 font-mono text-xs font-bold text-[color:var(--text-muted)]">
                      {String(stage.number).padStart(2, "0")}
                    </span>
                    {stage.label}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                      {stage.orientation}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono">
                      <Link
                        href={stage.href}
                        className="text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:decoration-[color:var(--text-primary)] transition-colors"
                      >
                        {stage.title} <span aria-hidden="true">&rarr;</span>
                      </Link>
                      {storyboardSlugs.has(stage.slug) && (
                        <Link
                          href={`/storyboards/${stage.slug}/`}
                          className="text-[color:var(--accent-cyan)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)] transition-colors"
                        >
                          Storyboard
                        </Link>
                      )}
                    </div>
                    <StageShelf label="Goes deeper" items={stage.companions} />
                    <StageShelf label="Notes" items={stage.notes} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Pieces that belong to no single stage. */}
      <section aria-labelledby="across-title" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-[760px]">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            Across the map
          </span>
          <h2
            id="across-title"
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
          >
            Not one stage, but all of them.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {across.map((item) => (
            <SpotlightCard key={item.slug} href={item.href} accent="var(--accent-purple)" className="gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                {item.role === "note" ? "Note" : "Overview"}
              </span>
              <h3 className="font-heading text-lg font-bold leading-snug text-[color:var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-3 text-[color:var(--text-secondary)]">
                {item.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
}

/** One labelled line of links under a stage: its companions, or its notes. */
function StageShelf({ label, items }: { label: string; items: IaArticle[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
        {label}
      </span>
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)] hover:decoration-[color:var(--text-primary)] transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
