import Link from "next/link";
import SpotlightCard from "../SpotlightCard";
import { SHELF_CATEGORIES, getShelfCounts } from "../../lib/content/shelf";

// Lightweight on purpose. The full browsing experience, with its own hero and
// descriptions, stays on /shelf; this exists so the homepage stops pretending
// the Shelf is not there.
export default function ShelfPreview() {
  const counts = getShelfCounts();

  return (
    <section
      id="shelf"
      aria-labelledby="shelf-title"
      className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              Shelf
            </span>
            <h2
              id="shelf-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
            >
              Trace what informed the work.
            </h2>
          </div>
          <Link
            href="/shelf/"
            className="font-mono text-xs text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
          >
            Open the shelf <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 list-none p-0 m-0">
          {SHELF_CATEGORIES.map((category) => {
            const slug = category.path.replace("/shelf/", "");
            const count = counts[slug] ?? 0;
            return (
              <li key={category.path}>
                <SpotlightCard href={`${category.path}/`} accent="var(--accent-cyan)" compact className="gap-1">
                  <span className="text-sm font-semibold text-[color:var(--text-primary)] leading-snug">
                    {category.title}
                  </span>
                  <span className="text-[11px] font-mono text-[color:var(--text-muted)]">
                    {count} {count === 1 ? "entry" : "entries"}
                  </span>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
