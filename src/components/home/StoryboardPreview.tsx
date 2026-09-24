import Link from "next/link";
import { getStoryboardEntries } from "../../lib/content/storyboards";
import { getWalkthroughs } from "../../lib/content/walkthroughs";
import { Frame } from "../illustrations/registry";

// A preview of the same derived sources /storyboards renders: the walkthrough
// registry and the diagram deriver. Nothing is restated here, so this section
// cannot drift from the surface it previews.
const DIAGRAM_COUNT = 3;

export default function StoryboardPreview() {
  const walkthrough = getWalkthroughs()[0];
  const diagrams = getStoryboardEntries().slice(0, DIAGRAM_COUNT);

  if (!walkthrough && diagrams.length === 0) return null;

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
              Storyboard explainers
            </span>
            <h2
              id="storyboards-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
            >
              See the idea.
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] mt-2">
              Some things are easier to see than to read. Illustrated walkthroughs
              tell a mechanism as a short visual story; diagrams sit inside the
              articles they explain.
            </p>
          </div>
          <Link
            href="/storyboards/"
            className="font-mono text-xs text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
          >
            All storyboard explainers <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10">
          {walkthrough && (
            <Link
              href={`/storyboards/${walkthrough.slug}/`}
              aria-label={`Open the walkthrough: ${walkthrough.title}`}
              className="block max-w-[20rem] self-start overflow-hidden rounded-sm border border-[#D9D4C6] shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Frame
                frameKey={walkthrough.frames[0].key}
                label={walkthrough.frames[0].text}
                number={1}
                total={walkthrough.frames.length}
              />
            </Link>
          )}
          <div className="flex flex-col gap-4">
            {walkthrough && (
              <>
                <span className="self-start font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--accent-cyan)]">
                  Illustrated walkthrough &middot; {walkthrough.frames.length} frames
                </span>
                <h3 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-[color:var(--text-primary)]">
                  <Link href={`/storyboards/${walkthrough.slug}/`} className="hover:underline underline-offset-4">
                    {walkthrough.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] sm:text-base">
                  {walkthrough.summary}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm">
                  <Link href={`/storyboards/${walkthrough.slug}/`} className="font-semibold underline underline-offset-4">
                    Open the walkthrough &rarr;
                  </Link>
                  <a
                    href={walkthrough.pdf}
                    className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]"
                  >
                    PDF
                  </a>
                </div>
              </>
            )}

            {diagrams.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 border-t border-[color:var(--card-border)] pt-5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                  Diagrams in the articles
                </span>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {diagrams.map((entry) => (
                    <li key={`${entry.slug}-${entry.id}`}>
                      <Link
                        href={`/storyboards/#${entry.slug}-${entry.id}`}
                        className="text-sm leading-snug text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:decoration-[color:var(--text-primary)]"
                      >
                        {entry.heading}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
