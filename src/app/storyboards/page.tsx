import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { getStoryboards } from "../../lib/content/storyboards";
import { Frame } from "../../components/illustrations/registry";

export const metadata = constructMetadata({
  title: "Storyboards",
  description:
    "Illustrated explainers of how applied AI systems work. Each is a short deck you can flip through or download as a PDF, drawn from a Systems article.",
  path: "/storyboards",
});

export default function StoryboardsPage() {
  const storyboards = getStoryboards();
  const schema = getWebPageSchema({
    title: "Storyboards",
    description: "Illustrated PDF explainers, each drawn from a Systems article.",
    path: "/storyboards",
  });

  return (
    <div className="flex flex-col gap-12 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="flex max-w-[760px] flex-col gap-4">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
          See the idea
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-[color:var(--text-primary)] sm:text-4xl">
          Storyboards
        </h1>
        <p className="text-base leading-relaxed text-[color:var(--text-secondary)]">
          Illustrated explainers of how applied AI systems work. Each one is a
          short deck that tells a single Systems article as a visual story, with
          the same small cast every time. Flip through it here, download it as a
          PDF, and follow it back to the article when you want the whole argument.
        </p>
      </header>

      <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {storyboards.map((sb) => (
          <li key={sb.slug}>
            <article className="flex h-full flex-col gap-4">
              <Link
                href={`/storyboards/${sb.slug}/`}
                aria-label={`View the storyboard: ${sb.title}`}
                className="block overflow-hidden rounded-sm border border-[#D9D4C6] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Frame frameKey={sb.frames[0].key} label={sb.frames[0].text} number={1} total={sb.frames.length} />
              </Link>
              <div className="flex flex-1 flex-col gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                  {sb.stage ? `Stage ${String(sb.stage.number).padStart(2, "0")} · ${sb.stage.label}` : "Systems"} · {sb.frames.length} frames
                </span>
                <h2 className="font-heading text-xl font-extrabold leading-snug tracking-tight text-[color:var(--text-primary)]">
                  <Link href={`/storyboards/${sb.slug}/`} className="hover:underline underline-offset-4">
                    {sb.title}
                  </Link>
                </h2>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{sb.summary}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 font-mono text-sm">
                  <Link href={`/storyboards/${sb.slug}/`} className="font-semibold underline underline-offset-4">
                    View &rarr;
                  </Link>
                  <a
                    href={sb.pdf}
                    className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]"
                  >
                    PDF
                  </a>
                  <Link
                    href={sb.articleHref}
                    className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]"
                  >
                    Read the article
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="border-t border-[color:var(--card-border)] pt-8 text-sm leading-relaxed text-[color:var(--text-secondary)]">
        Storyboards are drawn one at a time, when an article earns one. Every
        idea is already written up in{" "}
        <Link href="/systems/" className="underline underline-offset-4">
          Systems
        </Link>
        .
      </p>
    </div>
  );
}
