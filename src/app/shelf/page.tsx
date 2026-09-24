import SpotlightCard from "../../components/SpotlightCard";
import PlateHero from "../../components/PlateHero";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import { SHELF_CATEGORIES } from "../../lib/content/shelf";
import { REFERENCE_DISCLOSURE } from "../../lib/content/reference-sheets";

const GREENWOOD_LINES = [
  "The synth is just a very opinionated instrument. You negotiate.",
  "Half of scoring a film is deciding what the silence is allowed to do.",
  "I like machines that surprise me. The ones that only obey get boring fast.",
  "A good part on paper still has to survive a real room and a nervous player.",
  "Noise becomes music the moment someone decides where it belongs.",
];

export const metadata = constructMetadata({
  title: "Shelf",
  description: "A curated shelf of local experiments, notes, tools, philosophy, music, and shared AI resources.",
  path: "/shelf",
  image: "/covers/shelf/shared-agent-intelligence.svg"
});

export default function ShelfIndexPage() {
  const schema = getWebPageSchema({
    title: "Shelf | A Thinking Workspace",
    description: "A curated shelf of local experiments, notes, tools, philosophy, music, and shared AI resources.",
    path: "/shelf"
  });

  const categories = SHELF_CATEGORIES;

  return (
    <div className="relative flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - Jonny Greenwood, where signal becomes music */}
      <PlateHero
        eyebrow="Workspace"
        title="Shelf"
        intro="A working shelf of experiments, notes, tools, philosophy, music, and shared resources. Lean on the plate and Greenwood will patch some noise into something worth keeping."
        htmlSrc="/scenes/character.html?img=/images/characters/jonny-greenwood-ondes-martenot.jpg&fallback=/scenes/greenwood.html"
        alt="Oil painting of a composer seen from behind playing an ondes Martenot beside a glowing modular synthesizer as a ghostly orchestra rises"
        plateLabel="Plate · greenwood_signal"
        caption="Noise, talked into music."
        attribution="J. Greenwood"
        quotes={GREENWOOD_LINES}
        accent="var(--accent-cyan)"
      />

      <SceneFigure
        src="/scenes/greenwood.html"
        label="Figure · signal_path"
        accent="var(--accent-cyan)"
        caption="A waveform patched through a rack of modules, cables looping between the jacks. Noise routed, tuned, and argued with until it becomes something worth keeping."
      />

      {/* Grid List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <SpotlightCard key={idx} href={cat.path} accent="var(--accent-cyan)" className="gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>CATEGORY {idx + 1}</span>
              <h2 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {cat.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {cat.description}
              </p>
            </div>
            <span
              className="text-xs font-semibold self-start inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
              style={{ color: "var(--accent-cyan)" }}
            >
              Browse Category ➔
            </span>
          </SpotlightCard>
        ))}
        <SpotlightCard href="/shelf/reference/" accent="var(--accent-cyan)" className="gap-4 justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>DOWNLOADS</span>
            <h2 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Reference Sheets
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Slide guides, architecture sheets and mind maps to download. {REFERENCE_DISCLOSURE}
            </p>
          </div>
          <span
            className="text-xs font-semibold self-start inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
            style={{ color: "var(--accent-cyan)" }}
          >
            Browse Sheets ➔
          </span>
        </SpotlightCard>
      </section>
    </div>
  );
}
