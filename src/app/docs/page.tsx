import Link from "next/link";
import PlateHero from "../../components/PlateHero";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

const EUCLID_LINES = [
  "Begin with what cannot be doubted. Build only what follows. That is the whole discipline.",
  "I wrote the first documentation. Thirteen books, and the diagrams still hold.",
  "There is no royal road to geometry, and no shortcut past understanding either.",
  "A proof is a promise you can check. That is why it outlives opinion.",
  "Define your terms before you quarrel. Most disputes die there, quietly.",
];

export const metadata = constructMetadata({
  title: "Documentation & Guides",
  description: "Access reference documentations, design specs, loop architecture layers, and tool status definitions.",
  path: "/docs"
});

export default function DocsIntroPage() {
  const schema = getWebPageSchema({
    title: "Documentation & Guides | Pruning My Pothos",
    description: "Access reference documentations, design specs, loop architecture layers, and tool status definitions.",
    path: "/docs"
  });

  return (
    <div className="flex flex-col gap-16 w-full py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Plate hero - Euclid, who wrote the first documentation */}
      <PlateHero
        eyebrow="Knowledge System"
        title="Documentation"
        intro="Frameworks, execution loops, public-private boundaries, and prototype roadmaps for natural language programming. Lean on the plate and Euclid will insist you define your terms first."
        htmlSrc="/scenes/character.html?img=/images/characters/euclid-elements-geometry.jpg&fallback=/scenes/euclid.html"
        alt="Oil painting of Euclid reclining with compass and slate, glowing geometric constructions and solids above a scroll of the Elements"
        plateLabel="Plate · euclid_elements"
        caption="He wrote the first docs."
        attribution="Euclid"
        quotes={EUCLID_LINES}
        accent="var(--accent-cyan)"
      />

      <SceneFigure
        src="/scenes/euclid.html"
        label="Figure · elements"
        accent="var(--accent-cyan)"
        caption="Proposition One: two circles and the equilateral triangle they conjure, a compass, and a solid rising above the scroll. Begin with what cannot be doubted, then build only what follows."
      />

      {/* Main Content card */}
      <div className="card-glass p-6 sm:p-8 flex flex-col gap-8 bg-[color:var(--bg-color)]">
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">Introduction</h2>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
            Sans Serif Systems is a solo-builder systems laboratory and utility bench dedicated to making AI-assisted operations predictable, verifiable, and secure. It is built for anyone who wants to build, not only those who write code. Natural language is the new API, and intent is the interface.
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
