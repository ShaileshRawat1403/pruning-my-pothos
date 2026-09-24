import Link from "next/link";
import ProjectInspector from "./ProjectInspector";
import { CURRENT_WORK_PROJECTS } from "../../lib/content/projects";

// The homepage Stack section. Renders the same declaration as
// /stack, so the two cannot disagree about what is being built.
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
              Each excerpt is read from its repository at a named commit.
            </p>
          </div>
          <Link
            href="/stack/"
            className="font-mono text-xs text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
          >
            See the whole stack <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ProjectInspector projects={CURRENT_WORK_PROJECTS} />
      </div>
    </section>
  );
}
