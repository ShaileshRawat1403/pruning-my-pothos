import PlateHero from "../../components/PlateHero";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

const XENAKIS_LINES = [
  "I drew the music as a building and let the mathematics decide where the notes should stand.",
  "Give randomness a strict enough rule and it starts to sound like a decision.",
  "A score, a blueprint, an equation. On my desk they were the same page turned three ways.",
  "The computer did not write the piece. It held the shape while I argued with it.",
  "People want music to be feeling. Mine was also structure, and the structure was the feeling.",
];

export const metadata = constructMetadata({
  title: "Visual Canvases",
  description: "Visual blueprints and system workflow transition canvases for governing agent-assisted engineering loops.",
  path: "/canvases"
});

export default function CanvasesIndexPage() {
  const schema = getWebPageSchema({
    title: "Visual Canvases | Pruning My Pothos",
    description: "Visual blueprints and system workflow transition canvases for governing agent-assisted engineering loops.",
    path: "/canvases"
  });

  const canvasItems = [
    {
      title: "Evaluation Loop Canvas",
      description: "Map input files, assertion hooks, validation tests, and ledgers in a structured layout.",
      status: "Planning Prototype",
      accent: "border-accent-purple"
    },
    {
      title: "Context Partitioning Canvas",
      description: "Define sandbox boundaries separating public state utilities from private execution engines.",
      status: "Planning Prototype",
      accent: "border-accent-cyan"
    }
  ];

  return (
    <div className="relative w-full flex flex-col gap-16 max-w-[1100px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - Iannis Xenakis, who drew music as architecture */}
      <PlateHero
        eyebrow="Visual Blueprints"
        title="Canvases"
        intro="Structured worksheets to model context pathways, validation assertions, and review boundaries. Lean on the plate and Xenakis will show you a score that is also a building."
        htmlSrc="/scenes/character.html?img=/images/characters/iannis-xenakis-graphic-score.jpg&fallback=/scenes/xenakis.html"
        alt="Oil painting of Iannis Xenakis before a glowing graphic score that doubles as an architectural ruled-surface blueprint"
        plateLabel="Plate · xenakis_ruled"
        caption="A score, a blueprint, an equation."
        attribution="I. Xenakis"
        quotes={XENAKIS_LINES}
        accent="var(--accent-cyan)"
      />

      <SceneFigure
        src="/scenes/xenakis.html"
        label="Figure · ruled_surface"
        accent="var(--accent-cyan)"
        caption="Straight lines bent into a curved shell, a score that is also a blueprint, and a stochastic scatter of points. Chance, ruled tightly enough that it starts to sound like a decision."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {canvasItems.map((canvas, idx) => (
          <div key={idx} className={`card-glass p-6 flex flex-col gap-4 justify-between border-t-2 ${canvas.accent}`}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                  System Layout {idx + 1}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-[color:var(--card-border)] text-[9px] font-mono font-semibold uppercase text-[color:var(--text-primary)]">
                  {canvas.status}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[color:var(--text-primary)]">
                {canvas.title}
              </h3>
              <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                {canvas.description}
              </p>
            </div>
            <span className="text-xs font-mono text-[color:var(--text-muted)]">
              Offline workbook resource &bull; Available in local docs
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
