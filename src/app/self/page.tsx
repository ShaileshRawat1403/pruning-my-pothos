import { allSelves } from "content-collections";
import Link from "next/link";
import SpotlightCard from "../../components/SpotlightCard";
import CharacterPlate from "../../components/CharacterPlate";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

const SELF_LINES = [
  "Thinker, tinkerer, translator. Most days, in that order.",
  "Natural language is the new API. I am still learning to speak it well.",
  "Models generate. Systems govern. I mostly worry about the second part.",
  "I do not write much code. I write the intent the code should answer to.",
  "The moat was never the model. It was the orchestration around it.",
];

export const metadata = constructMetadata({
  title: "Self Calibrations",
  description: "A chronological archive of personal calibrations, mental models, and reflections.",
  path: "/self"
});

export default function SelvesIndexPage() {
  const schema = getWebPageSchema({
    title: "Self Calibrations | Pruning My Pothos",
    description: "A chronological archive of personal calibrations, mental models, and reflections.",
    path: "/self"
  });

  // Sort by date if available
  const sortedSelves = [...allSelves].sort((a, b) => {
    if (a.publishDate && b.publishDate) {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
    return 0;
  });

  return (
    <div className="relative flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - the self, drawn in HTML, speaking on hover */}
      <section className="grid grid-cols-1 lg:grid-cols-[54%_46%] items-center gap-10 lg:gap-14 min-h-[86vh] pt-10 lg:pt-6">
        <div className="flex flex-col gap-5 lg:pr-8">
          <div className="flex items-center gap-2">
            <span className="h-px w-8" style={{ background: "var(--accent-pink)" }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Calibrations
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]" style={{ color: "var(--text-primary)" }}>
            Self
          </h1>
          <p className="text-base leading-relaxed max-w-[460px]" style={{ color: "var(--text-secondary)" }}>
            Mental models, continuous calibrations, and reflections on navigating
            systems and design. Lean in and the portrait will say what it thinks.
          </p>
        </div>

        <CharacterPlate
          htmlSrc="/portrait.html"
          alt="Shailesh Rawat, drawn as a self portrait that inks itself in"
          plateLabel="Plate · self_portrait"
          caption="The one running the lab."
          attribution="Shaily"
          quotes={SELF_LINES}
          accent="var(--accent-pink)"
          aspect="4 / 5"
          className="w-full max-w-[400px] mx-auto lg:mx-0 lg:justify-self-end"
        />
      </section>

      {sortedSelves.length === 0 ? (
        <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>No calibrations archived yet.</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedSelves.map((item) => {
            const slug = item._meta.path;
            const publishDateStr = item.publishDate ? new Date(item.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";

            return (
              <SpotlightCard key={slug} href={`/self/${slug}`} accent="var(--accent-pink)" className="gap-3 justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--text-secondary)" }}>
                      {item.description}
                    </p>
                  </div>
                  {publishDateStr && (
                    <span className="text-[10px] font-mono shrink-0 pt-1" style={{ color: "var(--text-muted)" }}>
                      {publishDateStr}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 border-t pt-3" style={{ borderColor: "var(--card-border)" }}>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm"
                        style={{ color: "var(--accent-pink)", background: "color-mix(in srgb, var(--accent-pink) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-pink) 18%, transparent)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-xs font-semibold font-mono uppercase tracking-wide inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                    style={{ color: "var(--accent-pink)" }}
                  >
                    Read &rarr;
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </section>
      )}

      <div className="border-t pt-8 mt-4 flex justify-between items-center text-xs font-mono" style={{ borderColor: "var(--card-border)" }}>
        <Link href="/sentiments" className="link-slide font-semibold" style={{ color: "var(--text-secondary)" }}>
          &larr; Back to Sentiments Workspace
        </Link>
      </div>
    </div>
  );
}
