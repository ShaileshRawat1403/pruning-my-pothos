import Link from "next/link";
import { allSystems } from "content-collections";

// Three articles chosen because they cut across the map rather than sitting at
// one stage of it: a working method, a runtime pattern, and a piece that sorts
// out a set of terms people use interchangeably. The selection is editorial
// judgment and lives here deliberately -- three chosen pieces do not need a
// taxonomy, a schema field or a second content model to justify them.
//
// None of these is a map stage, which is the point: the row would be redundant
// if it repeated doors the map already opens.
const SELECTED_SLUGS = [
  "i-7-cognitive-loop",
  "policy-governed-mcp-runtimes-for-secure-tool-execution",
  "skills-vs-prompts-vs-agents",
];

export default function SelectedSystems() {
  // Same invariant as the systems map: these are chosen pieces, so a missing
  // one is a broken selection rather than a shorter row. Quietly rendering two
  // cards would hide the fact that an editorial decision no longer resolves.
  const selected = SELECTED_SLUGS.map((slug) => {
    const article = allSystems.find((s) => s._meta.path === slug);

    if (!article) {
      throw new Error(
        `Selected Systems invariant failed: missing Systems slug "${slug}". ` +
          `The row publishes ${SELECTED_SLUGS.length} chosen articles and will ` +
          `not render fewer. Either restore that article or choose a ` +
          `replacement in src/components/home/SelectedSystems.tsx.`,
      );
    }

    return article;
  });

  return (
    <section
      id="selected-systems"
      aria-labelledby="selected-systems-title"
      className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex flex-col gap-1 mb-8 max-w-2xl">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
            Selected systems
          </span>
          <h2
            id="selected-systems-title"
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]"
          >
            Ideas that cut across the map.
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
          {selected.map((system) => (
            <li key={system._meta.path}>
              <Link
                href={`/systems/${system._meta.path}/`}
                className="group flex h-full flex-col gap-3 p-6 rounded-lg bg-white border border-[#EAE8E2] hover:border-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
              >
                <h3 className="font-heading text-lg font-bold text-[#121212] leading-snug">
                  {system.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#55534E]">
                  {system.description}
                </p>
                <span className="mt-auto pt-2 text-xs font-mono text-[#7A7872] group-hover:text-[#121212] transition-colors">
                  Read <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
