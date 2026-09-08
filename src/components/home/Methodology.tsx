import Link from "next/link";
import NewsletterForm from "../NewsletterForm";

interface MethodologyProps {
  systemsCount: number;
}

export default function Methodology({ systemsCount }: MethodologyProps) {
  return (
    <>
      {/* ── METHODOLOGY & ARCHITECTURAL INQUIRIES ── */}
      <section id="methodology" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
                METHODOLOGY // ARCHITECTURAL PRINCIPLES
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                Frequently analyzed engineering questions.
              </h2>
            </div>
            <span className="font-mono text-xs text-[#7A7872]">
              Synthesis for engineers evaluating autonomous systems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Card 1: Core Thesis */}
            <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded w-fit">
                  CORE THESIS
                </span>
                <h3 className="font-heading font-bold text-base text-[#121212]">
                  What is the &ldquo;Pruning My Pothos&rdquo; engineering philosophy?
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  Just as a healthy pothos vine flourishes only when yellowing leaves and overgrown stems are pruned,
                  software systems stay resilient when teams deliberately prune away transient noise,
                  ungrounded abstractions, and brittle prompt chains to nourish durable, verifiable primitives.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                <span>Lifecycle: 6 Stages</span>
                <a href="#hero" className="text-[#16A34A] hover:underline">
                  Inspect Botanical Vine &uarr;
                </a>
              </div>
            </article>

            {/* Card 2: Failure Analysis */}
            <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DC2626] bg-[#FEE2E2] px-2.5 py-0.5 rounded w-fit">
                  FAILURE ANALYSIS
                </span>
                <h3 className="font-heading font-bold text-base text-[#121212]">
                  Why do multi-step AI coding agents fail in production codebases?
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  Agents break due to unchecked context compaction, silent hallucination drift, and lack of typed verification
                  gates. Without deterministic state machines, AST validation, and fail-fast sandboxes, errors compound
                  across long autonomous trajectories.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                <span>Failure Mode Breakdown</span>
                <Link
                  href="/systems/engineering-agentic-systems-for-reliability"
                  className="text-[#121212] hover:underline font-semibold"
                >
                  Read Field Notes &rarr;
                </Link>
              </div>
            </article>

            {/* Card 3: Protocol Standards */}
            <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded w-fit">
                  PROTOCOL STANDARDS
                </span>
                <h3 className="font-heading font-bold text-base text-[#121212]">
                  What is the role of Model Context Protocol (MCP) in modern workflows?
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  MCP standardizes tool invocation, file system boundaries, and resource state via JSON-RPC. It replaces
                  proprietary API harnesses with modular, sandboxed capability servers that remain model-agnostic and auditable.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                <span>Protocol: JSON-RPC 2.0</span>
                <Link
                  href="/systems/policy-governed-mcp-runtimes-for-secure-tool-execution"
                  className="text-[#121212] hover:underline font-semibold"
                >
                  Read Architecture &rarr;
                </Link>
              </div>
            </article>

            {/* Card 4: Project Architectures */}
            <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7C3AED] bg-[#F5F3FF] px-2.5 py-0.5 rounded w-fit">
                  PROJECT ARCHITECTURES
                </span>
                <h3 className="font-heading font-bold text-base text-[#121212]">
                  How do DAX, PaneTera, and Verb approach agent control?
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  Each addresses a distinct failure mode rather than sharing a single execution contract. DAX uses pure Rust
                  proof surfaces for deterministic policy and replay. PaneTera enforces a read-only workspace exploration boundary
                  over MCP. Verb manages the terminal environment and session survival without recording command bytes or prompts.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                <span>Project Boundaries</span>
                <a href="#projects" className="text-[#121212] hover:underline font-semibold">
                  Inspect Projects &darr;
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── CURATED SHELF CALLOUT ── */}
      <section id="shelf" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
          <div className="rounded-2xl p-8 sm:p-12 bg-[#F4F2EC] border border-[#EAE8E2] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="flex flex-col gap-4 max-w-2xl z-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
                COLLECTION // THE ARCHIVE
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-[#121212]">
                Explore the complete library of systems essays and field notes.
              </h2>
              <p className="text-sm text-[#55534E] leading-relaxed">
                Over {systemsCount} long-form architectural breakdowns, hands-on tool benchmarks, and design
                patterns for building durable production systems with LLMs and autonomous agents.
              </p>
              <div className="pt-2 flex items-center gap-4 flex-wrap">
                <Link
                  href="/systems"
                  className="px-6 py-3 rounded-lg bg-[#121212] hover:bg-[#2A2926] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                >
                  Browse All Systems &rarr;
                </Link>
                <Link
                  href="/shelf"
                  className="px-6 py-3 rounded-lg bg-white hover:bg-[#FAF9F6] border border-[#D5D2C9] text-[#121212] text-xs font-mono font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                >
                  Shelf Index
                </Link>
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-center z-10">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white border border-[#EAE8E2] p-6 flex flex-col items-center justify-center text-center shadow-xs">
                <span className="font-heading font-black text-4xl sm:text-5xl text-[#121212]">
                  {systemsCount}
                </span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#8A8780] tracking-wider pt-1">
                  Systems Published
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL FOOTER & BOTTOM NEWSLETTER ── */}
      <footer id="about" className="scroll-mt-28 w-full bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 text-center flex flex-col items-center gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#121212]">
              Found something useful? <br />
              Get the next technical breakdown in your inbox.
            </h3>
            <p className="text-xs text-[#55534E]">
              Occasional field notes on orchestration, runtime evaluations, and what broke in practice.
            </p>
          </div>

          <div className="w-full max-w-md">
            <NewsletterForm variant="footer" />
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="w-full border-t border-[#EAE8E2] py-8 bg-[#F4F2EC]/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-[#7A7872]">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
              <span className="font-heading font-extrabold text-sm text-[#121212]">
                Pruning My Pothos
              </span>
              <span className="hidden sm:inline">·</span>
              <span>Building and studying AI systems through AI-assisted workflows, then documenting what holds up in practice.</span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] flex-wrap justify-center">
              <Link href="/systems" className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded">
                Systems
              </Link>
              <Link href="/tools" className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded">
                Tools
              </Link>
              <Link href="/shelf" className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded">
                Shelf
              </Link>
              <Link href="/about" className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded">
                About
              </Link>
              <a
                href="https://github.com/ShaileshRawat1403/pruning-my-pothos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded"
              >
                GitHub
              </a>
            </div>

            <span className="font-mono text-[10px] text-[#A8A29E]">
              PRUNING MY POTHOS · AI RUNTIMES &amp; ARCHITECTURES
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
