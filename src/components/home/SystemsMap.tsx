import Link from "next/link";
import { getSystemsMap } from "../../lib/content/systems-map";

export default function SystemsMap() {
  const stages = getSystemsMap();

  return (
    <section
      id="systems-map"
      aria-labelledby="systems-map-title"
      className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex flex-col gap-1 mb-8 max-w-2xl">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
            Systems map
          </span>
          <h2
            id="systems-map-title"
            className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]"
          >
            Where are you in the system?
          </h2>
          <p className="text-sm leading-relaxed text-[#55534E] mt-2">
            Eight questions an applied AI system has to answer, in the order the
            answers tend to depend on each other. Each one opens the explanation
            that deals with it. Start anywhere; nothing here tracks you.
          </p>
        </div>

        {/* An ordered list because the order is the argument: each stage assumes
            the one before it has been settled. */}
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAE8E2] border border-[#EAE8E2] rounded-lg overflow-hidden list-none p-0 m-0">
          {stages.map((stage) => (
            <li key={stage.slug} className="bg-[#FAF9F6]">
              <Link
                href={stage.href}
                className="group flex h-full flex-col gap-2 p-6 bg-white hover:bg-[#FCFBF8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#121212]"
              >
                <span className="font-heading text-base font-bold text-[#121212]">
                  {stage.label}
                </span>
                <span className="text-sm text-[#55534E] leading-relaxed">
                  {stage.orientation}
                </span>
                <span className="mt-auto pt-3 text-xs font-mono text-[#7A7872] group-hover:text-[#121212] transition-colors">
                  {stage.title} <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-[#55534E]">
          <Link
            href="/systems/"
            className="underline underline-offset-4 decoration-[#D5D2C9] hover:text-[#121212] transition-colors"
          >
            Browse all Systems articles
          </Link>
        </p>
      </div>
    </section>
  );
}
