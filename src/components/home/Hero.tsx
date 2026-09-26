import Link from "next/link";
import HeroPothos from "../illustrations/HeroPothos";
import { SITE_POSITIONING } from "../../lib/config/site-positioning";

// The home page opening: what the site is for, two ways in, and the plate that
// says the name out loud. The newsletter sign-up lives in the site footer; a
// sign-up box is not the first thing a new reader needs.
export default function Hero() {
  return (
    <section id="hero" className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[13fr_11fr] gap-12 lg:gap-14 items-center">
          <div className="flex flex-col gap-7 min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[color:var(--accent-cyan)]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                A field guide to applied AI systems
              </span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-[3.6rem] tracking-tight leading-[1.06] text-[color:var(--text-primary)]">
              {SITE_POSITIONING.headline}
            </h1>

            <p className="text-base sm:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
              {SITE_POSITIONING.candidateSupportLine} Read the argument, see it drawn, and keep a
              copy for later.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Link href="#systems-map" className="btn-premium btn-primary">
                Start with the map
              </Link>
              <Link href="/storyboards/" className="btn-premium btn-secondary">
                Flip through a storyboard
              </Link>
            </div>

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

          <figure className="m-0 w-full max-w-[520px] mx-auto lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-sm border border-[#D9D4C6] shadow-sm">
              <HeroPothos />
            </div>
            <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              <span>Plate · pruning_my_pothos</span>
              <span>Keep what holds</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
