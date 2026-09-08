import { allSystems } from "content-collections";
import SpotlightCard from "../../components/SpotlightCard";
import PlateHero from "../../components/PlateHero";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

const BOOLE_LINES = [
  "I took the laws of thought and wrote them as sums. Everything you click still obeys them.",
  "True and false were enough to build a universe. I only had to be patient.",
  "People use my algebra a billion times a day and could not pick me from a crowd. I am at peace with it.",
  "Give me AND, OR, and NOT, and I will give you every decision you will ever make.",
  "Reason has a grammar, and it is stricter than most people hope.",
];

export const metadata = constructMetadata({
  title: "Systems",
  description:
    "Explore operating systems, workflows, and tools built for natural language programming.",
  path: "/systems",
});

export default function SystemsIndexPage() {
  const systems = [...allSystems].sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    if (a.updatedAt && b.updatedAt) return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (a.updatedAt) return -1;
    if (b.updatedAt) return 1;
    return a.title.localeCompare(b.title);
  });

  const schema = getWebPageSchema({
    title: "Systems | Pruning My Pothos",
    description:
      "Explore operating systems, workflows, and tools built for natural language programming.",
    path: "/systems",
  });

  return (
    <div className="flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - George Boole, the logic under every system */}
      <PlateHero
        eyebrow="Architecture"
        title="Systems"
        intro="Architectural patterns and functional structures for governing and inspecting AI-assisted workflows. Lean on the plate and Boole will remind you whose algebra you are standing on."
        htmlSrc="/scenes/character.html?img=/images/characters/george-boole-logic-gates.jpg&fallback=/scenes/boole.html"
        alt="Oil painting of George Boole at his desk with glowing AND, OR and NOT logic gates and a binary truth table rising in the dark"
        plateLabel="Plate · boole_gates"
        caption="Everything you click obeys him."
        attribution="G. Boole"
        quotes={BOOLE_LINES}
        accent="var(--accent-purple)"
      />

      <SceneFigure
        src="/scenes/boole.html"
        label="Figure · boole_gates"
        accent="var(--accent-purple)"
        caption="Thought reduced to three gates. AND, OR, and NOT, with a truth table underneath: the whole logic your systems still run on, watched as binary resolves to a single decision."
      />

      {/* Cards grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((system) => (
          <SpotlightCard
            key={system._meta.path}
            href={`/systems/${system._meta.path}`}
            accent="var(--accent-purple)"
            className="justify-between"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent-purple)" }}
                />
                <span
                  className="text-[9px] font-mono font-bold uppercase tracking-[0.15em]"
                  style={{ color: "var(--accent-purple)" }}
                >
                  {system.category}
                </span>
                {system.featured && (
                  <span
                    className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5"
                    style={{
                      color: "var(--text-primary)",
                      background: "color-mix(in srgb, var(--accent-cyan) 16%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--accent-cyan) 26%, transparent)",
                      borderRadius: "2px",
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>
              <h2
                className="font-heading text-lg font-bold leading-snug transition-colors duration-200"
                style={{ color: "var(--text-primary)" }}
              >
                {system.title}
              </h2>
              <p
                className="text-sm leading-relaxed line-clamp-3"
                style={{ color: "var(--text-secondary)" }}
              >
                {system.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {system.readingTime && (
                <span
                  className="text-[9px] font-mono px-2 py-1"
                  style={{
                    color: "var(--text-muted)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "2px",
                  }}
                >
                  {system.readingTime} min
                </span>
              )}
              {system.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono px-2 py-1"
                  style={{
                    color: "var(--text-muted)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "2px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </section>
    </div>
  );
}
