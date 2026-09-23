import Link from "next/link";
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
      className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
              Shelf
            </span>
            <h2
              id="shelf-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]"
            >
              Trace what informed the work.
            </h2>
          </div>
          <Link
            href="/shelf/"
            className="font-mono text-xs text-[#55534E] hover:text-[#121212] underline underline-offset-4 decoration-[#D5D2C9] transition-colors"
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
                <Link
                  href={`${category.path}/`}
                  className="flex h-full flex-col gap-1 p-4 rounded-lg bg-white border border-[#EAE8E2] hover:border-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                >
                  <span className="text-sm font-semibold text-[#121212] leading-snug">
                    {category.title}
                  </span>
                  <span className="text-[11px] font-mono text-[#7A7872]">
                    {count} {count === 1 ? "entry" : "entries"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
