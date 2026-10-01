import Link from "next/link";
import SectionHeader from "../../components/SectionHeader";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Documentation & Guides",
  description: "Access reference documentations, design specs, loop architecture layers, and tool status definitions.",
  path: "/docs"
});

export default function DocsIntroPage() {
  const schema = getWebPageSchema({
    title: "Documentation & Guides",
    description: "Access reference documentations, design specs, loop architecture layers, and tool status definitions.",
    path: "/docs"
  });

  return (
    <div className="flex flex-col gap-16 w-full py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Section header */}
      <SectionHeader
        eyebrow="Knowledge System"
        title="Documentation"
        intro="Frameworks, execution loops, public-private boundaries, and prototype roadmaps for natural language programming."
        scene="stack"
        slim
        tick="var(--accent-cyan)"
      />


      {/* Main Content card */}
      <div className="card-glass p-6 sm:p-8 flex flex-col gap-8 bg-[color:var(--bg-color)]">
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">Introduction</h2>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
            Pruning My Pothos is a publication and working lab for understanding AI by putting it to work. The documentation here records the systems, experiments, boundaries, and working models behind that practice.
          </p>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
            The philosophy rejects raw, ad-hoc, untracked prompt snippets in favor of formal execution loops, structured interfaces, and strict build ledgers. You bring the intent; the system keeps it honest.
          </p>
        </section>

        {/* Three Operational Pillars */}
        <section className="flex flex-col gap-4">
          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Three Operational Pillars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-[color:var(--card-border)] p-5 rounded-lg bg-white/[0.01]">
              <h4 className="font-heading text-[color:var(--text-primary)] font-semibold text-sm mb-2">1. Bounded Autonomy</h4>
              <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                Limiting agent action spaces using declarative runtime schemas rather than raw system instructions.
              </p>
            </div>
            <div className="border border-[color:var(--card-border)] p-5 rounded-lg bg-white/[0.01]">
              <h4 className="font-heading text-[color:var(--text-primary)] font-semibold text-sm mb-2">2. Proof of Evidence</h4>
              <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                Logging verification output checks to an immutable local ledger before promoting files to main.
              </p>
            </div>
            <div className="border border-[color:var(--card-border)] p-5 rounded-lg bg-white/[0.01]">
              <h4 className="font-heading text-[color:var(--text-primary)] font-semibold text-sm mb-2">3. Local-First Execution</h4>
              <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                Enforcing local-first schemas, local tokenizers, and sandbox executions before hitting external networks.
              </p>
            </div>
          </div>
        </section>

        {/* Next step link */}
        <section className="border-t border-[color:var(--card-border)] pt-6 mt-2">
          <h4 className="font-heading text-sm font-semibold text-[color:var(--text-primary)] mb-2">Explore the Systems Docs</h4>
          <p className="text-[color:var(--text-secondary)] text-sm">
            Select a guide from the sidebar or get started directly by reading about the{" "}
            <Link href="/docs/natural-language-programming-stack" className="text-[color:var(--text-primary)] hover:underline font-semibold">
              Natural Language Programming Stack &rarr;
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
