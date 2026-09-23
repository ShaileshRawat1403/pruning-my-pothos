import Link from "next/link";
import ProjectInspector from "./ProjectInspector";
import { CURRENT_WORK_PROJECTS } from "../../lib/content/projects";

// The homepage Current Work section. Renders the same declaration as
// /current-work, so the two cannot disagree about what is being built.
export default function Projects() {
  return (
    <section
      id="current-work"
      aria-labelledby="current-work-title"
      className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
              Current work
            </span>
            <h2
              id="current-work-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]"
            >
              Test the idea.
            </h2>
            <p className="text-sm leading-relaxed text-[#55534E] mt-2">
              Where the explanations get built and find out whether they hold.
              Each excerpt is read from its repository at a named commit.
            </p>
          </div>
          <Link
            href="/current-work/"
            className="font-mono text-xs text-[#55534E] hover:text-[#121212] underline underline-offset-4 decoration-[#D5D2C9] transition-colors"
          >
            All current work <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ProjectInspector projects={CURRENT_WORK_PROJECTS} />
      </div>
    </section>
  );
}
