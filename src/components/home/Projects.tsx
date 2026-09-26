import Link from "next/link";
import SpotlightCard from "../SpotlightCard";
import { CURRENT_WORK_PROJECTS } from "../../lib/content/projects";

// The homepage Stack section: one card per project, read from the same
// declaration as /stack, so the two cannot disagree about what is being built.
// The repository excerpts and their pinned commits stay on /stack, where there
// is room to read them.
export default function Projects() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              Stack
            </span>
            <h2
              id="stack-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
            >
              Test the idea.
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] mt-2">
              Where the explanations get built and find out whether they hold.
            </p>
          </div>
          <Link
            href="/stack/"
            className="font-mono text-xs text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
          >
            See the whole stack, with source <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURRENT_WORK_PROJECTS.map((p) => {
            const external = p.href.startsWith("http");
            const [name, tagline] = p.title.split(": ");
            return (
              <li key={p.title}>
                <SpotlightCard href={p.href} external={external} accent="var(--accent-green)" className="gap-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--accent-green)]">
                    {p.status}
                  </span>
                  <h3 className="font-heading text-xl font-bold leading-snug text-[color:var(--text-primary)]">
                    {name}
                    {tagline && (
                      <span className="block text-sm font-semibold text-[color:var(--text-secondary)] mt-1">{tagline}</span>
                    )}
                  </h3>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{p.summary}</p>
                  <span className="mt-auto pt-2 text-xs font-mono text-[color:var(--text-muted)] group-hover:text-[color:var(--text-primary)] transition-colors">
                    {external ? "Repository" : "Product page"} <span aria-hidden="true">{external ? "↗" : "→"}</span>
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
