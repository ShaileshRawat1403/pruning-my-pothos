import Link from "next/link";
import { SectionScene } from "../components/illustrations/sections";

export default function NotFound() {
  return (
    <div className="min-h-[72vh] grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[10fr_13fr] lg:gap-14">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-pink)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">Error 404</span>
        </div>
        <h1 className="font-heading text-5xl font-black tracking-tight leading-[0.95] text-[color:var(--text-primary)]">This page was pruned.</h1>
        <p className="max-w-md text-base leading-relaxed text-[color:var(--text-secondary)]">
          Or it never existed. Either way, the link you followed ends here. The map still works.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-premium btn-primary">Home</Link>
          <Link href="/systems/" className="btn-premium btn-secondary">The Systems map &rarr;</Link>
        </div>
      </div>
      <div className="ill-alive mx-auto w-full max-w-[520px] overflow-hidden rounded-sm border border-[#D9D4C6]">
        <SectionScene name="lost" />
      </div>
    </div>
  );
}
