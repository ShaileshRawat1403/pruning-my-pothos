import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { getStoryboardEntries } from "../../lib/content/storyboards";

export const metadata = constructMetadata({
  title: "Storyboard Explainers",
  description:
    "The diagrams and visual explainers inside the Systems articles, gathered in one place. Each one belongs to the article that declares it.",
  path: "/storyboards",
});

export default function StoryboardsPage() {
  const entries = getStoryboardEntries();
  const schema = getWebPageSchema({
    title: "Storyboard Explainers",
    description:
      "An index of the visual explainers declared by Systems articles.",
    path: "/storyboards",
  });

  // Grouped by owning article, because the article is the unit of authorship
  // and the index should say so rather than presenting visuals as free-floating.
  const byArticle = new Map<string, typeof entries>();
  for (const entry of entries) {
    const list = byArticle.get(entry.slug) ?? [];
    list.push(entry);
    byArticle.set(entry.slug, list);
  }

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
          The visual explainers that live inside the Systems articles, gathered
          so you can find one by what it shows. Each belongs to the article that
          declares it, and opening one takes you there rather than to a copy.
        </p>
      </header>

      {entries.length === 0 ? (
        <p className="text-[color:var(--text-secondary)] text-sm">
          No article currently declares a visual explainer.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {[...byArticle.entries()].map(([slug, items]) => (
            <section key={slug} className="flex flex-col gap-4">
              <h2 className="font-heading text-lg font-bold text-[color:var(--text-primary)]">
                <Link
                  href={`/systems/${slug}/`}
                  className="hover:underline underline-offset-4"
                >
                  {items[0].articleTitle}
                </Link>
              </h2>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
                {items.map((entry) => (
                  <li key={`${slug}-${entry.id}`}>
                    <Link
                      href={`/systems/${slug}/`}
                      className="flex h-full flex-col gap-2 p-5 rounded-sm border border-[color:var(--card-border)] bg-[color:var(--card-bg)] hover:border-[color:var(--card-border-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-green)]"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[color:var(--text-muted)]">
                        {entry.purpose ?? "diagram"}
                      </span>
                      <span className="font-heading font-bold text-[color:var(--text-primary)]">
                        {entry.heading}
                      </span>
                      <span className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                        {entry.caption}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <p className="text-sm text-[color:var(--text-secondary)] max-w-[680px]">
        Looking for everything else?{" "}
        <Link href="/systems/" className="underline underline-offset-4">
          Browse all Systems articles
        </Link>
        .
      </p>
    </div>
  );
}
