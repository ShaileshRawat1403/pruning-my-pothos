import Link from "next/link";
import { getSystemsMap } from "../../lib/content/systems-map";

export default function SystemsMap() {
  const stages = getSystemsMap();

  return (
    <section
      id="systems-map"
      aria-labelledby="systems-map-title"
      className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex flex-col gap-1 mb-8 max-w-2xl">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
            Systems map
          </span>
          <h2
            id="systems-map-title"
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
          >
            Where are you in the system?
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] mt-2">
            Eight questions an applied AI system has to answer, in the order the
            answers tend to depend on each other. Follow the sequence, or enter
            where the question becomes useful.
          </p>
        </div>

        {/* An ordered list because the order is the argument: each stage assumes
            the one before it has been settled. Rendered as ruled rows rather
            than tiles so the eight read as one sequence. */}
        <ol className="list-none p-0 m-0 border-t border-[color:var(--card-border)]">
          {stages.map((stage) => (
            <li
              key={stage.slug}
              className="border-b border-[color:var(--card-border)]"
            >
              <Link
                href={stage.href}
                className="group grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr] gap-1 sm:gap-8 items-baseline py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text-primary)]"
              >
                <span className="font-heading text-base font-bold text-[color:var(--text-primary)]">
                  {stage.label}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm text-[color:var(--text-secondary)] leading-relaxed">
                    {stage.orientation}
                  </span>
                  <span className="text-xs font-mono text-[color:var(--text-muted)] group-hover:text-[color:var(--text-primary)] transition-colors">
                    {stage.title} <span aria-hidden="true">&rarr;</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-[color:var(--text-secondary)]">
          <Link
            href="/systems/"
            className="underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)] transition-colors"
          >
            Browse all Systems articles
          </Link>
        </p>
      </div>
    </section>
  );
}
