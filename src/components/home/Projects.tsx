import ProjectInspector from "./ProjectInspector";
import { CURRENT_WORK_PROJECTS } from "../../lib/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
              BENCH // CODE & HARNESSES
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
              Governed runtimes and execution harnesses.
            </h2>
          </div>
          <span className="font-mono text-xs text-[#7A7872]">
            Repository excerpts with commit provenance · Click to copy
          </span>
        </div>

        <ProjectInspector projects={CURRENT_WORK_PROJECTS} />
      </div>
    </section>
  );
}
