import { allSystems } from "content-collections";

// The eight-stage orientation map.
//
// The sequence is an editorial model, not a taxonomy derived from the archive:
// it answers "where are you in the system?" and each stage is a door, not a
// chapter. Only the stage label, its orientation phrase and the canonical slug
// live here. Everything shown about the article -- its title, its description --
// is read from allSystems at build time, so a retitled article updates the map
// without anyone remembering to edit this file.
//
// It is deliberately not a course. There is no step number, no progress, no
// completion state and no reader state anywhere in this feature.

interface SystemsMapStage {
  /** The stage's name in the model. */
  label: string;
  /** One line saying what question the stage answers. */
  orientation: string;
  /** The canonical article that answers it. */
  slug: string;
}

const STAGES: SystemsMapStage[] = [
  {
    label: "How models work",
    orientation: "What is actually generating the output?",
    slug: "what-an-ai-model-actually-is",
  },
  {
    label: "Context & retrieval",
    orientation: "What can it see, and how did that get there?",
    slug: "retrieval-augmented-generation-in-plain-terms",
  },
  {
    label: "Instructions & contracts",
    orientation: "What are we asking it to do, and what is enforced?",
    slug: "prompting-is-not-the-skill-you-think-it-is",
  },
  {
    label: "Action & authorization",
    orientation: "What can become a real effect?",
    slug: "from-agent-intent-to-governed-execution",
  },
  {
    label: "Human judgment",
    orientation: "Where does a person have to decide?",
    slug: "human-in-the-loop-is-a-system-design-choice",
  },
  {
    label: "Evaluation & evidence",
    orientation: "How do we know the behaviour was acceptable?",
    slug: "evaluation-is-a-human-problem",
  },
  {
    label: "State & continuity",
    orientation: "What has to survive across a boundary?",
    slug: "agent-instructions-and-handoff-as-an-operating-system",
  },
  {
    label: "Readiness",
    orientation: "Is there enough evidence and control for this use?",
    slug: "from-prompt-to-production",
  },
];

export interface SystemsMapEntry extends SystemsMapStage {
  title: string;
  description: string;
  href: string;
}

/**
 * Joins the stage model to the live article data.
 *
 * Every stage must resolve. The eight stages are editorial architecture, not a
 * card list, so a missing article is a broken content contract rather than one
 * fewer item: silently rendering seven stages would publish an incomplete model
 * of the subject while looking entirely valid. This throws at build instead,
 * because the static export is where a mapped article going missing is still
 * cheap to fix.
 */
export function getSystemsMap(): SystemsMapEntry[] {
  return STAGES.map((stage) => {
    const article = allSystems.find((s) => s._meta.path === stage.slug);

    if (!article) {
      throw new Error(
        `Systems map invariant failed: stage "${stage.label}" references ` +
          `missing Systems slug "${stage.slug}". The map publishes ` +
          `${STAGES.length} stages and will not render fewer. Either restore ` +
          `that article or choose a replacement in src/lib/content/systems-map.ts.`,
      );
    }

    return {
      ...stage,
      title: article.title,
      description: article.description,
      href: `/systems/${stage.slug}/`,
    };
  });
}

/** Slugs the map claims, so other surfaces can avoid repeating them. */
export const SYSTEMS_MAP_SLUGS = STAGES.map((s) => s.slug);
