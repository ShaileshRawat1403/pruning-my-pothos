import Link from "next/link";

export default function StartHere() {
  return (
    <section id="breakdowns" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
              START HERE // CURATED ON-RAMPS
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
              Three clear paths to inspect first.
            </h2>
          </div>
          <span className="font-mono text-xs text-[#7A7872]">
            Inspected against working runtimes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: What an AI Model Actually Is */}
          <Link
            href="/systems/what-an-ai-model-actually-is"
            className="group flex flex-col p-6 rounded-xl bg-white border border-[#EAE8E2] hover:border-[#121212] transition-all hover:shadow-sm text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8A8780] uppercase">
                ED. 01 · BREAKDOWN
              </span>
              <span className="font-mono text-[10px] text-[#16A34A] bg-[#E8F5E9] px-2 py-0.5 rounded font-bold">
                Foundation
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center mb-4 text-[#121212] group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 6h16M4 12h16M4 18h10" />
                <circle cx="18" cy="18" r="2" fill="#16A34A" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-[#121212] mb-2 group-hover:underline">
              What an AI Model Actually Is
            </h3>
            <p className="text-xs text-[#55534E] leading-relaxed mb-6 flex-1">
              Deconstructing transformer weight distributions, inference kernels, and why
              anthropomorphic mental models lead to brittle system prompts.
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-[#F4F2EC] text-[11px] font-mono text-[#7A7872]">
              <span>12 min read</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* Card 2: Engineering Agentic Systems for Reliability */}
          <Link
            href="/systems/engineering-agentic-systems-for-reliability"
            className="group flex flex-col p-6 rounded-xl bg-white border border-[#EAE8E2] hover:border-[#121212] transition-all hover:shadow-sm text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8A8780] uppercase">
                ED. 02 · FIELD NOTES
              </span>
              <span className="font-mono text-[10px] text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded font-bold">
                Architecture
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center mb-4 text-[#121212] group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-[#121212] mb-2 group-hover:underline">
              Engineering Agentic Systems for Reliability
            </h3>
            <p className="text-xs text-[#55534E] leading-relaxed mb-6 flex-1">
              A practical reliability model for multi-step agent trajectories built around governed
              steps, deterministic state validation, and runtime escalation gates.
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-[#F4F2EC] text-[11px] font-mono text-[#7A7872]">
              <span>14 min read</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* Card 3: Policy-Governed MCP Runtimes */}
          <Link
            href="/systems/policy-governed-mcp-runtimes-for-secure-tool-execution"
            className="group flex flex-col p-6 rounded-xl bg-white border border-[#EAE8E2] hover:border-[#121212] transition-all hover:shadow-sm text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8A8780] uppercase">
                ED. 03 · PROTOCOL
              </span>
              <span className="font-mono text-[10px] text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded font-bold">
                Security
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center mb-4 text-[#121212] group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="2" y="2" width="20" height="8" rx="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" />
                <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-[#121212] mb-2 group-hover:underline">
              Policy-Governed MCP Runtimes
            </h3>
            <p className="text-xs text-[#55534E] leading-relaxed mb-6 flex-1">
              How to design isolated execution sandboxes and policy validation gates for Model Context
              Protocol servers in autonomous workflows.
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-[#F4F2EC] text-[11px] font-mono text-[#7A7872]">
              <span>11 min read</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
