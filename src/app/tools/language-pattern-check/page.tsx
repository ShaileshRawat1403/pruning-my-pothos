import Link from "next/link";
import LanguagePatternCheckClient from "../../../components/LanguagePatternCheckClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "AI Writing Pattern Check",
  description: "Check a draft for formulaic, AI-associated writing patterns using LanguageOps' free deterministic detector. No key, no cost, nothing rewritten.",
  path: "/tools/language-pattern-check",
});

export default function LanguagePatternCheckPage() {
  const schema = getSoftwareAppSchema({
    name: "AI Writing Pattern Check",
    description: "Detect formulaic, AI-associated writing patterns in a draft using LanguageOps' free deterministic registry.",
    path: "/tools/language-pattern-check",
  });

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1100px] mx-auto py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div className="font-mono text-xs flex gap-2" style={{ color: "var(--text-muted)" }}>
        <Link href="/tools" className="link-slide" style={{ color: "var(--text-secondary)" }}>Stack</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>AI Writing Pattern Check</span>
      </div>

      {/* Hero */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-purple)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Writing &amp; Editorial
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          AI Writing Pattern Check
        </h1>
        <p className="text-base leading-relaxed max-w-[700px]" style={{ color: "var(--text-secondary)" }}>
          Paste a draft and check it against a registry of formulaic, AI-associated writing patterns:
          delve-reliance, hedging padding, repeated sentence openers, and around forty more. This runs
          the real, live <a href="https://languageops-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: "var(--accent-purple)" }}>LanguageOps</a> detector,
          not a mock. Nothing is rewritten and nothing is stored. The deterministic pass is free and
          keyless by design, which is the only part of LanguageOps exposed here.
        </p>
      </section>

      {/* Tool */}
      <LanguagePatternCheckClient />

      {/* What this is / is not */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: "var(--card-border)" }}>
        <div className="lg:col-span-7 flex flex-col gap-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <h2 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>What this checks, and what it doesn&rsquo;t</h2>
          <p>
            LanguageOps&rsquo; full registry has about 45 patterns. Roughly two-thirds of them are
            deterministic (exact-match, regex, or measurable structural signals like sentence length
            and repeated openers), and that&rsquo;s what this page scores. The rest (sycophantic agreement,
            robotic empathy, conceptual vagueness, and similar) require actually judging meaning, not
            just matching text, so they need a model call. Those aren&rsquo;t evaluated here; if any would
            apply, the result says so instead of guessing.
          </p>
          <p>
            This isn&rsquo;t an authorship detector. A clean score means nothing in the deterministic
            registry matched, not that a piece of writing is provably human.
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="ledger-surface p-5 font-mono text-xs" style={{ borderRadius: "4px" }}>
            <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: "1px solid var(--card-border)", color: "var(--text-muted)" }}>
              <span>source.tty</span>
              <span style={{ color: "var(--accent-green)" }}>live</span>
            </div>
            <p style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-green)" }}>$ </span>POST languageops-web.vercel.app/api/lint
            </p>
            <p className="mt-2" style={{ color: "var(--text-muted)" }}># deterministic pass only; refine is admin-gated</p>
          </div>
        </div>
      </section>
    </div>
  );
}
