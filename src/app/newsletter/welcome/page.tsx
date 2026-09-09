import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Subscription Confirmed",
  description:
    "Welcome to Pruning My Pothos. Starting points across systems breakdowns, project evidence, and developer tools.",
  path: "/newsletter/welcome",
  noindex: true,
});

export default function NewsletterWelcomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 flex flex-col gap-12">
        {/* Header Block */}
        <header className="flex flex-col gap-4 border-b border-[#EAE8E2] pb-10">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#8A8780] uppercase">
            <span className="text-[#16A34A] font-bold">{"// CONFIRMED"}</span>
            <span>·</span>
            <span>PRUNING MY POTHOS</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-[#121212]">
            You&apos;re in.
          </h1>

          <p className="font-mono text-sm sm:text-base text-[#55534E] leading-relaxed">
            The inbox is only part of it. Start with something useful.
          </p>

          <p className="text-xs sm:text-sm text-[#7A7872] leading-relaxed max-w-2xl pt-2">
            New technical breakdowns and field notes arrive as they are completed.
            In the meantime, here are three entry points into the systems and tools documented across this site:
          </p>
        </header>

        {/* Three Practical Entry Points */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-[#121212]">
              Three paths to explore
            </h2>
            <span className="font-mono text-xs text-[#8A8780]">
              Curated on-ramps
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Entry Point 1: Understand something */}
            <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-6 shadow-2xs hover:border-[#121212] transition-colors">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded">
                    UNDERSTAND
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#121212]">
                  Engineering Agentic Systems for Reliability
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  A practical reliability model for multi-step agent trajectories built around governed steps, deterministic state validation, and runtime escalation gates.
                </p>
              </div>

              <Link
                href="/systems/engineering-agentic-systems-for-reliability"
                className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-xs font-mono font-semibold text-[#121212] hover:text-[#16A34A] transition-colors"
              >
                <span>Read Breakdown</span>
                <span>&rarr;</span>
              </Link>
            </article>

            {/* Entry Point 2: Inspect something */}
            <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-6 shadow-2xs hover:border-[#121212] transition-colors">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded">
                    INSPECT
                  </span>
                  <span className="font-mono text-[10px] text-[#8A8780]">Public Repos</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#121212]">
                  Repository Evidence &amp; Architecture
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  Inspect exact source excerpts and architecture contracts across DAX, Verb, and PaneTera at fixed commit references.
                </p>
              </div>

              <Link
                href="/#projects"
                className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-xs font-mono font-semibold text-[#121212] hover:text-[#2563EB] transition-colors"
              >
                <span>Inspect Projects</span>
                <span>&rarr;</span>
              </Link>
            </article>

            {/* Entry Point 3: Use something */}
            <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-6 shadow-2xs hover:border-[#121212] transition-colors">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7C3AED] bg-[#F5F3FF] px-2.5 py-0.5 rounded">
                    USE
                  </span>
                  <span className="font-mono text-[10px] text-[#8A8780]">Browser Tools</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#121212]">
                  Client-Side Engineering Utilities
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed">
                  Run prompt-to-JSON validation, dependency audits, markdown link checks, and workflow governance directly in your browser.
                </p>
              </div>

              <Link
                href="/tools"
                className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-xs font-mono font-semibold text-[#121212] hover:text-[#7C3AED] transition-colors"
              >
                <span>Browse Tools</span>
                <span>&rarr;</span>
              </Link>
            </article>
          </div>
        </section>

        {/* Navigation Actions */}
        <div className="pt-6 border-t border-[#EAE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs font-mono text-[#7A7872] hover:text-[#121212] transition-colors"
          >
            &larr; Return to Homepage
          </Link>
          <Link
            href="/systems"
            className="px-5 py-2.5 rounded-lg bg-[#121212] hover:bg-[#2A2926] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
          >
            Browse All Systems &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
