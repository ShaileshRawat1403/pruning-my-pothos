import Link from "next/link";
import HeroCinema from "../illustrations/HeroCinema";
import { SITE_POSITIONING } from "../../lib/config/site-positioning";

// The plate that says the name out loud, moved below the prism hero. The
// prism carries the headline; this section carries the method the plate
// draws: keep the evidence, the plain words and the checks, snip the hype.
export default function MethodPlate() {
  return (
    <section id="method" className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_13fr] gap-12 lg:gap-14 items-center">
          <div id="hero-plate" className="w-full max-w-[520px] mx-auto lg:mx-0 order-2 lg:order-1">
            <HeroCinema />
          </div>

          <div className="flex flex-col gap-6 min-w-0 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[color:var(--accent-amber)]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                The method
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-[2.6rem] tracking-tight leading-[1.08] text-[color:var(--text-primary)]">
              Cut the claims. Keep the craft.
            </h2>

            <p className="text-base sm:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
              {SITE_POSITIONING.candidateSupportLine} Each piece keeps its evidence, its plain words
              and its checks. The hype gets snipped.
            </p>

            <ul className="m-0 p-0 list-none flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[color:var(--text-muted)]">
              {[
                { href: "/systems/", label: "Read", note: "explainers" },
                { href: "/storyboards/", label: "See", note: "illustrated PDFs" },
                { href: "/stack/", label: "Try", note: "the tools in progress" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[color:var(--text-primary)] transition-colors">
                    <span className="text-[color:var(--text-primary)] font-bold">{l.label}</span> {l.note}{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
