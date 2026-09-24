import Link from "next/link";
import { allSystems } from "content-collections";
import SpotlightCard from "../../components/SpotlightCard";
import PlateHero from "../../components/PlateHero";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { getSystemsMap } from "../../lib/content/systems-map";
import { getStoryboards } from "../../lib/content/storyboards";

const BOOLE_LINES = [
  "I took the laws of thought and wrote them as sums. Everything you click still obeys them.",
  "True and false were enough to build a universe. I only had to be patient.",
  "People use my algebra a billion times a day and could not pick me from a crowd. I am at peace with it.",
  "Give me AND, OR, and NOT, and I will give you every decision you will ever make.",
  "Reason has a grammar, and it is stricter than most people hope.",
];

export const metadata = constructMetadata({
  title: "Systems",
  description:
    "Eight questions an applied AI system has to answer, the canonical explanation of each, and everything else worth reading alongside them.",
  path: "/systems",
});

export default function SystemsIndexPage() {
  // The map is the index's organising language now. It is derived from the same
  // Systems Map source the homepage uses -- there is no second registry, and no
  // stage assignment is invented here.
  const stages = getSystemsMap();
  const stageSlugs = new Set(stages.map((s) => s.slug));

  // Which articles have a storyboard, so a stage or a card can offer it.
  const storyboardSlugs = new Set(getStoryboards().map((sb) => sb.slug));

  // Everything that is not a map anchor stays discoverable here. The old
  // Concepts / Explanations / How-things-fit-together chips no longer organise
  // the page; the field remains in frontmatter, it is simply not the index's
  // language any more.
  const rest = [...allSystems]
    .filter((s) => !stageSlugs.has(s._meta.path))
    .sort((a, b) => {
      if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
      if (a.updatedAt && b.updatedAt)
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (a.updatedAt) return -1;
      if (b.updatedAt) return 1;
      return a.title.localeCompare(b.title);
    });

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

      {/* Plate hero - George Boole, the logic under every system */}
      <PlateHero
        eyebrow="Architecture"
        title="Systems"
        intro="Eight questions an applied AI system has to answer, in the order the answers depend on each other. Lean on the plate and Boole will remind you whose algebra you are standing on."
        htmlSrc="/scenes/character.html?img=/images/characters/george-boole-logic-gates.jpg&fallback=/scenes/boole.html"
        alt="Oil painting of George Boole at his desk with glowing AND, OR and NOT logic gates and a binary truth table rising in the dark"
        plateLabel="Plate · boole_gates"
        caption="Everything you click obeys him."
        attribution="G. Boole"
        quotes={BOOLE_LINES}
        accent="var(--accent-purple)"
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
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Everything that is not a map anchor. Still browsable, still complete. */}
      <section aria-labelledby="more-systems-title" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-[760px]">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            The rest of the library
          </span>
          <h2
            id="more-systems-title"
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
          >
            {rest.length} more explanations.
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
            Mechanisms that sit alongside the map rather than anchoring one of
            its stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((system) => {
            return (
              <SpotlightCard
                key={system._meta.path}
                href={`/systems/${system._meta.path}`}
                accent="var(--accent-purple)"
                className="justify-between"
              >
                <div className="flex flex-col gap-3">
                  <h3
                    className="font-heading text-lg font-bold leading-snug transition-colors duration-200"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {system.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed line-clamp-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {system.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-5 text-[11px] font-mono text-[color:var(--text-muted)]">
                  {system.readingTime && <span>{system.readingTime} min read</span>}
                  {storyboardSlugs.has(system._meta.path) && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[color:var(--accent-cyan)]">
                        Has a storyboard
                      </span>
                    </>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
