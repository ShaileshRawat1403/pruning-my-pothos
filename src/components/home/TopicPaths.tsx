import Link from "next/link";
import { allSystems } from "content-collections";
import { slugifyTag } from "../../lib/tags";

// Editorial selection, not a ranking or a popularity claim.
const topics = [
  ["agents", "Agents"], ["skills", "Reusable skills"], ["prompting", "Prompting"],
  ["orchestration", "Orchestration"], ["workflow", "Workflows"],
  ["reliability", "Reliability"], ["governance", "Governance"],
  ["evaluation", "Evaluation"], ["architecture", "Architecture"],
  ["retrieval", "Retrieval"], ["mcp", "MCP"], ["geo", "AI search"],
] as const;

export default function TopicPaths() {
  return (
    <section aria-labelledby="topic-paths-title" className="w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <p className="text-[11px] font-mono uppercase tracking-wider text-[#7A7872] mb-2">Follow a question</p>
        <h2 id="topic-paths-title" className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">Find the part you want to understand.</h2>
        <p className="text-sm leading-relaxed text-[#55534E] mt-3 max-w-2xl">Start with a concept, inspect how it works, then try something you can use in your own workflow.</p>
        <Link href="/systems/skills-vs-prompts-vs-agents/" className="block border border-[#EAE8E2] bg-white rounded-lg p-6 my-6">
          <span className="font-mono text-xs text-[#55534E]">A starting point</span>
          <h3 className="font-heading text-xl font-bold text-[#121212] mt-2">Skills vs Prompts vs Agents <span aria-hidden="true">→</span></h3>
          <p className="text-sm leading-relaxed text-[#55534E] mt-2">Separate the instruction, the reusable task, and the system that decides what happens next.</p>
        </Link>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {topics.map(([slug, label]) => {
            const count = allSystems.filter((item) => item.tags.some((tag) => slugifyTag(tag) === slug)).length;
            if (!count) return null;
            return <li key={slug}>
              <Link href={`/tags/${slug}/`} className="flex h-full flex-col gap-1 p-4 rounded-lg border border-[#EAE8E2] hover:border-[#55534E] transition-colors">
                <span className="text-sm font-semibold text-[#121212]">{label}</span>
                <span className="text-xs text-[#55534E]">{count} {count === 1 ? "breakdown" : "breakdowns"}</span>
              </Link>
            </li>;
          })}
        </ul>
      </div>
    </section>
  );
}
