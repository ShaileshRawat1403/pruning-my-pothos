import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { getStoryboardEntries, purposeLabel } from "../../lib/content/storyboards";
import { getWalkthroughs } from "../../lib/content/walkthroughs";
import { Frame } from "../../components/illustrations/registry";
import VisualBlock from "../../components/visuals/VisualBlock";

export const metadata = constructMetadata({
  title: "Storyboard Explainers",
  description:
    "Illustrated walkthroughs and diagrams of how applied AI systems work, each drawn from a Systems article.",
  path: "/storyboards",
});

export default function StoryboardsPage() {
  const walkthroughs = getWalkthroughs();
  const entries = getStoryboardEntries();
  const mapStages = entries.filter((e) => e.isMapStage);
  const additional = entries.filter((e) => !e.isMapStage);
  const GROUPS = [
    {
      key: "map",
      heading: "The systems map",
      blurb:
        "One diagram for each stage of the map, in the order the stages depend on each other.",
      items: mapStages,
    },
    {
      key: "additional",
      heading: "More mechanisms",
      blurb: "Worth seeing, and outside the map's eight questions.",
      items: additional,
    },
  ];
  const schema = getWebPageSchema({
    title: "Storyboard Explainers",
    description: "Illustrated walkthroughs and diagrams drawn from the Systems articles.",
    path: "/storyboards",
  });

  return (
    <div className="flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="flex flex-col gap-4 max-w-[760px]">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
          See the idea
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          Storyboard Explainers
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed">
          Some mechanisms are easier to see than to read. An illustrated
          walkthrough tells one as a short visual story, with a recurring cast,
          that you can read here or take away as a PDF. The diagrams below are
          the single visuals built into the Systems articles. Every one belongs
          to the article it came from, and leads back to it.
        </p>
      </header>

      {/* Walkthroughs lead. They are drawn one at a time, when an explanation
          earns one, so this section is deliberately allowed to be short. */}
      <section aria-labelledby="walkthroughs-title" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-[760px]">
          <h2 id="walkthroughs-title" className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]">
            Illustrated walkthroughs
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
            Told frame by frame. New ones are drawn one at a time, when an explanation earns it.
          </p>
        </div>

        {walkthroughs.map((w) => {
          const total = w.frames.length;
          const samples = [3, 6, 7].filter((i) => i < total);
          return (
            <article
              key={w.slug}
              className="grid grid-cols-1 gap-6 rounded-md border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-4 sm:p-6 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-8"
            >
              <Link
                href={`/storyboards/${w.slug}/`}
                aria-label={`Open the walkthrough: ${w.title}`}
                className="block self-start overflow-hidden rounded-sm border border-[#D9D4C6] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Frame frameKey={w.frames[0].key} label={w.frames[0].text} number={1} total={total} />
              </Link>
              <div className="flex flex-col gap-4">
                <span className="self-start rounded-sm bg-[color:var(--accent-cyan)] px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--bg-color)]">
                  Walkthrough &middot; {total} frames
                </span>
                <h3 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-[color:var(--text-primary)]">
                  <Link href={`/storyboards/${w.slug}/`} className="hover:underline underline-offset-4">
                    {w.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] sm:text-base">{w.summary}</p>
                <div className="hidden grid-cols-3 gap-3 md:grid" aria-hidden="true">
                  {samples.map((i) => (
                    <div key={i} className="overflow-hidden rounded-sm border border-[#D9D4C6]">
                      <Frame frameKey={w.frames[i].key} label={w.frames[i].title} number={i + 1} total={total} />
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm">
                  <Link href={`/storyboards/${w.slug}/`} className="font-semibold underline underline-offset-4">
                    Open the walkthrough &rarr;
                  </Link>
                  <a href={w.pdf} className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]">
                    PDF
                  </a>
                  <Link href={w.articleHref} className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]">
                    Read the article
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section aria-labelledby="diagrams-title" className="flex flex-col gap-12">
        <div className="flex flex-col gap-2 max-w-[760px] border-t border-[color:var(--card-border)] pt-12">
          <h2 id="diagrams-title" className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]">
            Diagrams
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
            One visual each, shown in full, exactly as it appears in its article.
          </p>
        </div>

        {entries.length === 0 ? (
          <p className="text-[color:var(--text-secondary)] text-sm">
            No article currently declares a diagram.
          </p>
        ) : (
          GROUPS.map(({ key, heading, blurb, items }) =>
            items.length === 0 ? null : (
              <section key={key} className="flex flex-col gap-14">
                <header className="flex flex-col gap-2 max-w-[760px]">
                  <h3 className="font-heading text-lg font-bold text-[color:var(--text-primary)]">
                    {heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                    {blurb}
                  </p>
                </header>
                {items.map((entry) => (
                  <article
                    key={`${entry.slug}-${entry.id}`}
                    id={`${entry.slug}-${entry.id}`}
                    className="scroll-mt-28 flex flex-col gap-4 border-t border-[color:var(--card-border)] pt-8"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[color:var(--text-muted)]">
                        {purposeLabel(entry.purpose)}
                      </div>
                      <h4 className="font-heading text-xl sm:text-2xl font-bold leading-snug text-[color:var(--text-primary)] max-w-[760px]">
                        {entry.heading}
                      </h4>
                    </div>

                    {/* The same declaration the article renders, through the same
                        runtime. No storyboard-specific renderer exists. */}
                    <VisualBlock visual={entry.visual} hideTakeaway />

                    <p className="text-sm text-[color:var(--text-secondary)]">
                      <Link
                        href={`/systems/${entry.slug}/`}
                        className="underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)] transition-colors"
                      >
                        Read the full explanation
                      </Link>
                      <span className="text-[color:var(--text-muted)]">
                        {" "}
                        &mdash; {entry.articleTitle} <span aria-hidden="true">&rarr;</span>
                      </span>
                    </p>
                  </article>
                ))}
              </section>
            ),
          )
        )}
      </section>

      <p className="text-sm text-[color:var(--text-secondary)] border-t border-[color:var(--card-border)] pt-8">
        <Link href="/systems/" className="underline underline-offset-4">
          Browse all Systems articles
        </Link>
      </p>
    </div>
  );
}
