import Link from "next/link";
import { getStoryboardEntries } from "../../lib/content/storyboards";

// A preview of the same derived index /storyboards renders. It reads the one
// deriver rather than restating any visual's metadata here, so this section
// cannot drift from the surface it previews.
const PREVIEW_COUNT = 3;

export default function StoryboardPreview() {
  const entries = getStoryboardEntries().slice(0, PREVIEW_COUNT);

  if (entries.length === 0) return null;

  return (
    <section
      id="storyboards"
      aria-labelledby="storyboards-title"
      className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
              Storyboard explainers
            </span>
            <h2
              id="storyboards-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]"
            >
              See the idea.
            </h2>
            <p className="text-sm leading-relaxed text-[#55534E] mt-2">
              Some things are easier to see than to read. These are the diagrams
              inside the articles, each one opening the piece it belongs to.
            </p>
          </div>
          <Link
            href="/storyboards/"
            className="font-mono text-xs text-[#55534E] hover:text-[#121212] underline underline-offset-4 decoration-[#D5D2C9] transition-colors"
          >
            All storyboard explainers <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
          {entries.map((entry) => (
            <li key={`${entry.slug}-${entry.id}`}>
              <Link
                href={`/systems/${entry.slug}/`}
                className="group flex h-full flex-col gap-2 p-6 rounded-lg bg-white border border-[#EAE8E2] hover:border-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8780]">
                  {entry.purpose ?? "diagram"}
                </span>
                <span className="font-heading font-bold text-[#121212] leading-snug">
                  {entry.heading}
                </span>
                <span className="mt-auto pt-3 text-xs font-mono text-[#7A7872] group-hover:text-[#121212] transition-colors">
                  {entry.articleTitle} <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
