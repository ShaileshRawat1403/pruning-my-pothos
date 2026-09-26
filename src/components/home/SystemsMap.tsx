import Link from "next/link";
import SpotlightCard from "../SpotlightCard";
import { Emblem, EMBLEM_W, EMBLEM_H } from "../illustrations/emblems";
import { DeadpanDefs, Paper } from "../illustrations/deadpan";
import { getSystemsMap } from "../../lib/content/systems-map";
import { getStoryboards } from "../../lib/content/storyboards";

// The eight-stage map, drawn. Each stage is a door into its article and shows
// that article's emblem, so the map doubles as the storyboard shelf: every
// stage article has a storyboard, linked from the badge on its tile. It stays
// an ordered list because the order is the argument: each stage assumes the
// one before it has been settled.
export default function SystemsMap() {
  const stages = getSystemsMap();
  const decks = new Map(getStoryboards().map((sb) => [sb.slug, sb]));

  return (
    <section
      id="systems-map"
      aria-labelledby="systems-map-title"
      className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              Systems map
            </span>
            <h2
              id="systems-map-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
            >
              Where are you in the system?
              <span id="map-leaf-landing" aria-hidden="true" className="inline-block w-12 h-8 ml-2 align-middle" />
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] mt-2">
              Eight questions an applied AI system has to answer, in the order the answers tend to
              depend on each other. Each one is an article and a storyboard. Follow the sequence, or
              enter where the question becomes useful.
            </p>
          </div>
          <div className="flex gap-5 font-mono text-xs">
            <Link
              href="/systems/"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
            >
              All articles <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/storyboards/"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
            >
              All storyboards <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <ol className="m-0 p-0 list-none grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stages.map((stage, i) => {
            const deck = decks.get(stage.slug);
            const n = String(i + 1).padStart(2, "0");
            return (
              <li key={stage.slug} className="relative">
                <SpotlightCard href={stage.href} accent="var(--accent-cyan)" compact className="gap-2.5">
                  <div className="-mx-1 -mt-1 overflow-hidden rounded-sm border border-[#D9D4C6]">
                    <svg viewBox={`0 0 ${EMBLEM_W} ${EMBLEM_H}`} className="ill-svg block w-full" aria-hidden="true">
                      <DeadpanDefs id={`tile-${stage.slug}`} />
                      <Paper id={`tile-${stage.slug}`} w={EMBLEM_W} h={EMBLEM_H} />
                      <Emblem slug={stage.slug} x={20} y={20} s={0.92} />
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                    {n} · {stage.label}
                  </span>
                  <h3 className="font-heading text-sm sm:text-base font-bold leading-snug text-[color:var(--text-primary)]">
                    {stage.orientation}
                  </h3>
                  <span className="hidden sm:inline mt-auto pt-1 text-xs font-mono text-[color:var(--text-muted)] group-hover:text-[color:var(--text-primary)] transition-colors">
                    {stage.title} <span aria-hidden="true">&rarr;</span>
                  </span>
                </SpotlightCard>
                {deck && (
                  <Link
                    href={`/storyboards/${deck.slug}/`}
                    aria-label={`Storyboard: ${stage.title}, ${deck.frames.length} frames`}
                    className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 rounded-sm border border-[#D9D4C6] bg-[#F4F1E8] px-1.5 py-0.5 sm:px-2 sm:py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-[#1F2A36] shadow-sm hover:bg-white transition-colors"
                  >
                    Storyboard <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
