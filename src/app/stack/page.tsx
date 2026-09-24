import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import ProjectInspector from "../../components/home/ProjectInspector";
import PlateHero from "../../components/PlateHero";
import { STACK_LINES } from "../../lib/content/plates";
import { CURRENT_WORK_PROJECTS } from "../../lib/content/projects";

export const metadata = constructMetadata({
  title: "Stack",
  description:
    "The systems being built and tested right now, with repository excerpts and the commit each one was read at.",
  path: "/stack",
});

export default function StackPage() {
  const schema = getWebPageSchema({
    title: "Stack",
    description:
      "Active projects with repository excerpts and commit provenance.",
    path: "/stack",
  });

  return (
    <div className="flex flex-col gap-12 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - Hero of Alexandria, who tested his machines on the floor */}
      <PlateHero
        eyebrow="Test the idea"
        title="Stack"
        intro="Where the ideas in Systems get built and find out whether they hold. Each excerpt below is read from its repository at a named commit, so what you see is what was there, not a description of it. Lean on the plate and Hero of Alexandria will tell you why."
        htmlSrc="/scenes/character.html?img=/images/characters/hero-of-alexandria-automata.jpg&fallback=/scenes/hero.html"
        alt="Oil painting of Hero of Alexandria in a workshop of brass automata with a self-moving cart and a pegged program drum"
        plateLabel="Plate · hero_automata"
        caption="Nothing counted until it moved."
        attribution="Hero of Alexandria"
        quotes={STACK_LINES}
        accent="var(--accent-amber)"
      />

      <ProjectInspector projects={CURRENT_WORK_PROJECTS} headingLevel={2} />

      <p className="text-sm text-[color:var(--text-secondary)] max-w-[680px]">
        The browser utilities built alongside this work live in{" "}
        <Link href="/tools/" className="underline underline-offset-4">
          Tools
        </Link>
        , and earlier professional work is in the{" "}
        <Link href="/portfolio/" className="underline underline-offset-4">
          portfolio
        </Link>
        .
      </p>
    </div>
  );
}
