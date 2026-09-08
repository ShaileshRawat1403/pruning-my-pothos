import Link from "next/link";
import GlowCard from "../../components/GlowCard";
import SceneFigure from "../../components/SceneFigure";
import I7LoopInteractive from "../../components/I7LoopInteractive";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Schema",
  description:
    "The schema underneath the work: Sans Serif Sentiments, the two layers, the I-7 loop, and the principles that keep AI-assisted building clear and accountable.",
  path: "/schema",
});

const TRIAD = [
  {
    word: "Sans",
    gloss: "the absence",
    body: "The noise. The jargon. The borrowed cleverness. The performance. The unnecessary weight around the idea. Sans is the discipline of absence.",
    accent: "var(--accent-cyan)",
  },
  {
    word: "Serif",
    gloss: "the excess",
    body: "The flourish, the extra stroke added after the letter is already readable. Craft matters and texture matters. But when the embellishment starts hiding the thought, it has to go.",
    accent: "var(--accent-amber)",
  },
  {
    word: "Sentiments",
    gloss: "what remains",
    body: "Not sentimentality, not decorative emotion. The human signal left behind when the noise, excess, and performance are removed. The real observation, the real consequence.",
    accent: "var(--accent-purple)",
  },
];

const PRINCIPLES = [
  { q: "Clarity should survive complexity.", g: "The one thread through the writing, the systems, and the AI workflows.", a: "var(--accent-purple)" },
  { q: "AI is an execution layer, not a replacement for thinking.", g: "It accelerates drafting, coding, mapping, and testing. The judgment stays yours.", a: "var(--accent-cyan)" },
  { q: "Build fast. Inspect slowly. Leave a guardrail behind.", g: "Debugging the Vibe: build with AI while keeping system risk visible.", a: "var(--accent-amber)" },
  { q: "The dependence is here to stay. Build the backup layer.", g: "Stay able to explain and continue the work when the tool fails or changes.", a: "var(--accent-pink)" },
  { q: "Practical before perfect.", g: "Usable before polished. Perfection too early usually hides the real learning.", a: "var(--accent-green)" },
  { q: "Systems before frameworks.", g: "Understand the problem, the workflow, and the risk before reaching for a tool.", a: "var(--accent-cyan)" },
  { q: "Evaluation before confidence.", g: "Good output once is not enough. Find where a system fails before users do.", a: "var(--accent-amber)" },
  { q: "Documentation is product.", g: "It shapes how people understand, trust, and maintain a system, not just support it.", a: "var(--accent-blue)" },
  { q: "When everyone can build, clarity becomes the real constraint.", g: "Natural language is the new API, and intent is the interface.", a: "var(--accent-purple)" },
];

export default function SchemaPage() {
  const schema = getWebPageSchema({
    title: "Schema | Pruning My Pothos",
    description:
      "The schema underneath the work: Sans Serif Sentiments, the two layers, the I-7 loop, and the operating principles.",
    path: "/schema",
  });

  return (
    <div className="relative flex flex-col gap-16 pt-10 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── Hero ── */}
      <section className="flex flex-col gap-5 max-w-3xl pt-6">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-purple)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            The Underlying Structure
          </span>
        </div>
        <h1 className="font-heading text-5xl sm:text-6xl font-black tracking-tight leading-[0.95]" style={{ color: "var(--text-primary)" }}>
          Schema
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          The shape of the thinking under the work. My work sits between thinking,
          execution, and translation: language to shape ideas, systems to test them,
          documentation to make them reusable. This is the schema they all resolve to.
        </p>
        <blockquote
          className="font-heading italic text-2xl sm:text-3xl leading-snug border-l-2 pl-5 mt-2"
          style={{ color: "var(--text-primary)", borderColor: "var(--accent-purple)" }}
        >
          Clarity should survive complexity.
        </blockquote>
      </section>

      <SceneFigure
        src="/scenes/clarity.html"
        label="Figure · clarity_through_complexity"
        accent="var(--accent-amber)"
        caption="A tangle of competing lines on the left. A narrow aperture in the middle, the discipline. One clean line survives and continues. That is the whole ambition: clarity that lives through complexity rather than around it."
      />

      <div className="section-divider" />

      {/* ── Sans Serif Sentiments - the triad ── */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-8" style={{ background: "var(--accent-purple)" }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Voice Philosophy · sans_serif_sentiments
            </span>
          </div>
          <h2 className="font-heading text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
            Sans Serif Sentiments
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            My voice philosophy. Three words, each one doing work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRIAD.map((t) => (
            <GlowCard key={t.word} accent={t.accent} className="gap-3">
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{t.word}</span>
                <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: t.accent }}>{t.gloss}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t.body}</p>
            </GlowCard>
          ))}
        </div>

        <blockquote
          className="font-heading italic text-xl sm:text-2xl leading-snug border-l-2 pl-5 max-w-2xl"
          style={{ color: "var(--text-primary)", borderColor: "var(--accent-purple)" }}
        >
          The absence of excess, so the human signal remains.
        </blockquote>
      </section>

      <div className="section-divider" />

      {/* ── The two layers ── */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-cyan)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Two Layers
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlowCard accent="var(--accent-pink)" pad="p-7" className="gap-3">
            <h3 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>Sentiments, the voice layer</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Where writing, reflection, and critique live. It notices what people miss when they rush toward tools, trends, or execution. A way of thinking in public.
            </p>
            <p className="text-sm font-heading italic pt-1" style={{ color: "var(--accent-pink)" }}>
              &ldquo;What is really happening beneath the obvious story?&rdquo;
            </p>
          </GlowCard>
          <GlowCard accent="var(--accent-cyan)" pad="p-7" className="gap-3">
            <h3 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>Systems, the execution layer</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Where ideas become tools, workflows, and working proofs. Governed AI systems built around context, review, and accountability.
            </p>
            <p className="text-sm font-heading italic pt-1" style={{ color: "var(--accent-cyan)" }}>
              &ldquo;systems with the excess removed&rdquo;
            </p>
          </GlowCard>
        </div>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Where Sentiments explains the friction, Systems builds the bridge.{" "}
          <span className="font-heading italic" style={{ color: "var(--text-primary)" }}>
            Better sentences create better systems. Better systems force better sentences.
          </span>
        </p>
      </section>

      <div className="section-divider" />

      {/* ── The I-7 loop ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="h-px w-8" style={{ background: "var(--accent-amber)" }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Working Model · I-7
            </span>
          </div>
          <h2 className="font-heading text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>The I-7 Loop</h2>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            My structured model for building with AI. Each pass should reduce uncertainty, not multiply confusion.
          </p>
        </div>
        <I7LoopInteractive />
      </section>

      <div className="section-divider" />

      {/* ── Operating principles ── */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-purple)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Operating Principles
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map((p) => (
            <GlowCard key={p.q} accent={p.a} className="gap-3 justify-between">
              <blockquote className="font-heading text-base font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                {p.q}
              </blockquote>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.g}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <div className="pt-2">
        <Link href="/about" className="link-slide text-sm font-mono font-semibold" style={{ color: "var(--accent-purple)" }}>
          &larr; Back to About
        </Link>
      </div>
    </div>
  );
}
