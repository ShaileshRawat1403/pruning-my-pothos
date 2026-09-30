import { allSystems } from "content-collections";
import { getSystemsMap, type SystemsMapEntry } from "./systems-map";

// The information architecture of Systems: where every article sits.
//
// The eight Systems Map stages (systems-map.ts) each have one flagship, the
// canonical explanation of that stage's question. This file places every
// other article against that map:
//
//   companion  a full explanation of one mechanism inside a stage
//   note       a short piece: one distinction, one working method
//   across     belongs to no single stage
//
// Which articles are full pages and which are notes was decided in the
// archive disposition (docs/ARCHIVE_DISPOSITION_MANIFEST.json, KEEP-* and
// REDUCE-TO-NOTE). The stage each one sits under follows the reader-question
// cluster it was reviewed in. Nothing is merged or retired here: this is
// placement, and every URL stays where it is.

type Role = "flagship" | "companion" | "note";

const PLACEMENT: Record<string, { companions: string[]; notes: string[] }> = {
  "what-an-ai-model-actually-is": {
    companions: ["a-simple-tokenizer", "training-vs-inference"],
    notes: [],
  },
  "retrieval-augmented-generation-in-plain-terms": {
    companions: ["context-windows-as-working-memory", "why-ocr-quietly-breaks-document-ai"],
    notes: ["semantic-caching-for-probabilistic-systems"],
  },
  "prompting-is-not-the-skill-you-think-it-is": {
    companions: [
      "structured-output-and-why-it-matters",
      "what-a-system-prompt-actually-is",
      "skills-vs-prompts-vs-agents",
      "designing-reusable-ai-skills",
    ],
    notes: [],
  },
  "from-agent-intent-to-governed-execution": {
    companions: [
      "tool-use-when-language-triggers-actions",
      "ai-agents-vs-ai-workflows",
      "policy-governed-mcp-runtimes-for-secure-tool-execution",
    ],
    notes: ["runtime-over-model-why-orchestration-is-the-product"],
  },
  "human-in-the-loop-is-a-system-design-choice": {
    companions: ["architecture-of-in-chat-ai-apps"],
    notes: [],
  },
  "evaluation-is-a-human-problem": {
    companions: ["observability-first-ai-systems"],
    notes: [],
  },
  "agent-instructions-and-handoff-as-an-operating-system": {
    companions: [],
    notes: ["i-7-cognitive-loop", "tech-stack-for-nlpg-driven-ai-assisted-sdlc"],
  },
  "from-prompt-to-production": {
    companions: [],
    notes: [],
  },
};

/** Pieces that belong to no single stage. */
const ACROSS: { slug: string; role: Exclude<Role, "flagship"> }[] = [
  { slug: "ai-architecture-explained-how-modern-llm-applications-work", role: "companion" },
  { slug: "systems-001-foundations", role: "note" },
  { slug: "seo-aeo-geo-in-plain-terms", role: "note" },
];

export interface IaArticle {
  slug: string;
  title: string;
  description: string;
  href: string;
  role: Role;
}

export interface IaStage extends SystemsMapEntry {
  /** 1-based position on the map. */
  number: number;
  companions: IaArticle[];
  notes: IaArticle[];
}

function article(slug: string, role: Role): IaArticle {
  const a = allSystems.find((s) => s._meta.path === slug);
  if (!a) {
    throw new Error(
      `Systems IA invariant failed: "${slug}" is placed in src/lib/content/systems-ia.ts ` +
        `but no such Systems article exists. Remove the placement or restore the article.`,
    );
  }
  return { slug, title: a.title, description: a.description, href: `/systems/${slug}/`, role };
}

/**
 * The whole of Systems, placed. Throws at build if an article is unplaced or
 * placed twice: an article nobody can find from the index is a broken
 * architecture, and the static export is where that is still cheap to fix.
 */
export function getSystemsIA(): { stages: IaStage[]; across: IaArticle[] } {
  const stages = getSystemsMap().map((stage, i) => {
    const placed = PLACEMENT[stage.slug];
    if (!placed) {
      throw new Error(`Systems IA invariant failed: stage "${stage.label}" has no placement entry in systems-ia.ts.`);
    }
    return {
      ...stage,
      number: i + 1,
      companions: placed.companions.map((s) => article(s, "companion")),
      notes: placed.notes.map((s) => article(s, "note")),
    };
  });
  const across = ACROSS.map((a) => article(a.slug, a.role));

  const seen = new Map<string, number>();
  const count = (slug: string) => seen.set(slug, (seen.get(slug) ?? 0) + 1);
  stages.forEach((s) => {
    count(s.slug);
    s.companions.forEach((c) => count(c.slug));
    s.notes.forEach((n) => count(n.slug));
  });
  across.forEach((a) => count(a.slug));

  const unplaced = allSystems.map((s) => s._meta.path).filter((slug) => !seen.has(slug));
  const twice = [...seen].filter(([, n]) => n > 1).map(([slug]) => slug);
  if (unplaced.length || twice.length) {
    throw new Error(
      `Systems IA invariant failed.` +
        (unplaced.length ? ` Not placed: ${unplaced.join(", ")}.` : "") +
        (twice.length ? ` Placed more than once: ${twice.join(", ")}.` : "") +
        ` Every Systems article sits in exactly one place in src/lib/content/systems-ia.ts.`,
    );
  }
  return { stages, across };
}

/** Where one article sits: its stage (if any), its role, and its neighbours. */
export function placeOf(slug: string): { stage?: IaStage; role: Role; across: boolean } {
  const { stages, across } = getSystemsIA();
  for (const stage of stages) {
    if (stage.slug === slug) return { stage, role: "flagship", across: false };
    if (stage.companions.some((c) => c.slug === slug)) return { stage, role: "companion", across: false };
    if (stage.notes.some((n) => n.slug === slug)) return { stage, role: "note", across: false };
  }
  const a = across.find((x) => x.slug === slug);
  return { role: a?.role ?? "companion", across: true };
}
