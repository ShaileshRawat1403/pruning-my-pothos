import Link from "next/link";
import { getStoryboards } from "../../lib/content/storyboards";
import { Frame } from "../illustrations/registry";

// A preview of the /storyboards library, read from the same registry, so this
// section cannot drift from the page it previews.
const PREVIEW_COUNT = 3;

export default function StoryboardPreview() {
  const storyboards = getStoryboards().slice(0, PREVIEW_COUNT);
  if (storyboards.length === 0) return null;

  return (
    <section
      id="storyboards"
      aria-labelledby="storyboards-title"
      className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              Storyboards
            </span>
            <h2
              id="storyboards-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
            >
              See the idea.
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] mt-2">
              Some things are easier to see than to read. Each storyboard tells
              one Systems article as a short illustrated deck, to flip through
              here or keep as a PDF.
            </p>
          </div>
          <Link
            href="/storyboards/"
            className="font-mono text-xs text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
          >
            All storyboards <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {storyboards.map((sb) => (
            <li key={sb.slug} className="flex flex-col gap-3">
              <Link
                href={`/storyboards/${sb.slug}/`}
                aria-label={`View the storyboard: ${sb.title}`}
                className="block max-w-[22rem] overflow-hidden rounded-sm border border-[#D9D4C6] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Frame frameKey={sb.frames[0].key} label={sb.frames[0].text} number={1} total={sb.frames.length} />
              </Link>
              <h3 className="font-heading text-lg font-bold leading-snug text-[color:var(--text-primary)]">
                <Link href={`/storyboards/${sb.slug}/`} className="hover:underline underline-offset-4">
                  {sb.title}
                </Link>
              </h3>
              <span className="font-mono text-xs text-[color:var(--text-muted)]">
                {sb.frames.length} frames &middot;{" "}
                <a href={sb.pdf} className="underline underline-offset-4 hover:text-[color:var(--text-primary)]">
                  PDF
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
