import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { getStoryboardEntries, purposeLabel } from "../../lib/content/storyboards";
import VisualBlock from "../../components/visuals/VisualBlock";

export const metadata = constructMetadata({
  title: "Storyboard Explainers",
  description:
    "The visual explainers inside the Systems articles, shown rather than listed. Each one belongs to the article that declares it.",
  path: "/storyboards",
});

export default function StoryboardsPage() {
  const entries = getStoryboardEntries();
  const schema = getWebPageSchema({
    title: "Storyboard Explainers",
    description: "The visual explainers declared by Systems articles.",
    path: "/storyboards",
  });

  return (
    <div className="flex flex-col gap-12 py-12">
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
          Some mechanisms are easier to see than to read. These are the visual
          explainers built into the Systems articles, shown here in full. Each
          one belongs to the article that declares it, and opening one takes you
          to the argument it came from.
        </p>
      </header>

      {entries.length === 0 ? (
        <p className="text-[color:var(--text-secondary)] text-sm">
          No article currently declares a visual explainer.
        </p>
      ) : (
        /* One entry per row, full readable width. The visual is the object;
           there is no card grid to fit more of them above the fold. */
        <div className="flex flex-col gap-14">
          {entries.map((entry) => (
            <article
              key={`${entry.slug}-${entry.id}`}
              id={`${entry.slug}-${entry.id}`}
              className="scroll-mt-28 flex flex-col gap-4 border-t border-[color:var(--card-border)] pt-8"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono uppercase tracking-wider text-[color:var(--text-muted)]">
                  <span>{purposeLabel(entry.purpose)}</span>
                  {entry.isMapStage && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[color:var(--accent-green)]">
                        Systems map
                      </span>
                    </>
                  )}
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold leading-snug text-[color:var(--text-primary)] max-w-[760px]">
                  {entry.heading}
                </h2>
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
        </div>
      )}

      <p className="text-sm text-[color:var(--text-secondary)] border-t border-[color:var(--card-border)] pt-8">
        <Link href="/systems/" className="underline underline-offset-4">
          Browse all Systems articles
        </Link>
      </p>
    </div>
  );
}
