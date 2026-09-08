import { allSentences } from "content-collections";
import Link from "next/link";
import SpotlightCard from "../../components/SpotlightCard";
import CharacterPlate from "../../components/CharacterPlate";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

const NIETZSCHE_LINES = [
  "I wrote in fragments because the whole was too heavy to lift at once.",
  "An aphorism is a full day's climb, pressed into a single line.",
  "Say less, and mean it harder.",
  "What I cannot put in one clear sentence, I do not yet understand.",
  "They will misread me for a hundred years. I can wait.",
];

export const metadata = constructMetadata({
  title: "Sentences Archive",
  description: "A chronological archive of short reflections, principles, and writing on systems design.",
  path: "/sentences"
});

export default function SentencesIndexPage() {
  const schema = getWebPageSchema({
    title: "Sentences Archive | Pruning My Pothos",
    description: "A chronological archive of short reflections, principles, and writing on systems design.",
    path: "/sentences"
  });

  return (
    <div className="relative flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - Nietzsche, patron of the aphorism */}
      <section className="grid grid-cols-1 lg:grid-cols-[52%_48%] items-center gap-10 lg:gap-14 min-h-[86vh] pt-10 lg:pt-6">
        <div className="flex flex-col gap-5 lg:pr-8">
          <div className="flex items-center gap-2">
            <span className="h-px w-8" style={{ background: "var(--accent-blue)" }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Writing Archive
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]" style={{ color: "var(--text-primary)" }}>
            Sentences
          </h1>
          <p className="text-base leading-relaxed max-w-[460px]" style={{ color: "var(--text-secondary)" }}>
            Short reflections, decision rules, and principles. The whole point of
            an aphorism is that it survives being carried alone. Lean on the plate
            and Nietzsche will say his piece.
          </p>
        </div>

        <CharacterPlate
          htmlSrc="/scenes/character.html?img=/images/characters/friedrich-nietzsche-eternal-return.jpg&fallback=/scenes/nietzsche.html"
          alt="Oil painting of Friedrich Nietzsche on a mountain summit beneath a glowing ring of eternal return, pages of aphorisms drifting in the wind"
          plateLabel="Plate · nietzsche_heights"
          caption="He wrote in pieces, on purpose."
          attribution="F. Nietzsche"
          quotes={NIETZSCHE_LINES}
          accent="var(--accent-purple)"
          aspect="3 / 2"
          className="w-full max-w-[540px] mx-auto lg:mx-0 lg:justify-self-end"
        />
      </section>

      <SceneFigure
        src="/scenes/nietzsche.html"
        label="Figure · eternal_return"
        accent="var(--accent-purple)"
        caption="The eternal return, drawn as a ring that bites its own tail. His aphorisms scatter as loose fragments, because the whole was always too heavy to carry in one line."
      />

      {allSentences.length === 0 ? (
        <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>No sentences archived yet.</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allSentences.map((item) => {
            const slug = item._meta.path;
            return (
              <SpotlightCard key={slug} href={`/sentences/${slug}`} accent="var(--accent-blue)" className="gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-sm"
                    style={{ color: "var(--accent-blue)", background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-blue) 20%, transparent)" }}
                  >
                    {item.category || "Reflection"}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed italic border-l-2 pl-3 py-1" style={{ color: "var(--text-secondary)", borderColor: "var(--card-border)" }}>
                  {item.summary}
                </p>
                <span
                  className="text-xs font-semibold self-start mt-2 font-mono uppercase tracking-wide inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                  style={{ color: "var(--accent-blue)" }}
                >
                  Read &rarr;
                </span>
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
