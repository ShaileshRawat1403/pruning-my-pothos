import type { Visual } from "./visual-types";

/**
 * A scene (components/visuals/SceneVisual.tsx) draws an article's declared
 * visual as one pinned drawing that advances while the reader scrolls. The
 * steps are the visual's own data, in the order its generated renderer reads
 * it, so a scene never says anything the frontmatter does not.
 */
export interface SceneStep {
  id: string;
  /** A small label above the title, where the generated renderer has one. */
  tag?: string;
  title: string;
  body?: string;
  note?: string;
  items?: string[];
}

export function sceneSteps(visual: Visual): SceneStep[] {
  switch (visual.renderAs) {
    case "generated-sequence":
      return visual.data.steps.map((s: { id: string; label: string; note?: string }) => ({ id: s.id, title: s.label, body: s.note }));
    case "generated-layers":
      // Built from the bottom up: each layer depends on the one below it.
      return [...visual.data.layers].reverse().map((l: { id: string; label: string; note?: string }) => ({ id: l.id, title: l.label, body: l.note }));
    case "generated-comparison": {
      const { before, after, diffNote } = visual.data;
      return [
        { id: "before", title: before.label, items: before.items },
        { id: "after", title: after.label, items: after.items },
        ...(diffNote ? [{ id: "diff", title: diffNote }] : []),
      ];
    }
    case "generated-boundary": {
      const { inside, outside, boundaryLabel } = visual.data;
      return [
        { id: "inside", tag: boundaryLabel, title: inside.label, items: inside.items },
        { id: "outside", title: outside.label, items: outside.items },
        // The line itself, said once: a boundary scene needs a third beat to
        // show both sides at once, and the visual's takeaway is that sentence.
        { id: "line", tag: boundaryLabel, title: visual.takeaway },
      ];
    }
    case "generated-evidence-map": {
      // Supports first, judgment last: the conclusion follows the evidence.
      const { judgment, supports, gap } = visual.data;
      return [
        ...supports.map((s: { id: string; label: string; strength?: string; note?: string }) => ({ id: s.id, tag: s.strength === "absent" ? "not collected" : (s.strength ?? "direct"), title: s.label, body: s.note })),
        { id: "judgment", tag: "Judgment", title: judgment },
        ...(gap ? [{ id: "gap", tag: "What this does not establish", title: gap }] : []),
      ];
    }
    case "generated-state-change": {
      const { boundary, before, after, preserved, lost } = visual.data;
      return [
        { id: "before", title: before.label, items: before.items },
        { id: "boundary", title: boundary },
        { id: "after", title: after.label, items: after.items },
        ...(preserved?.length ? [{ id: "preserved", title: "Crosses unchanged", items: preserved }] : []),
        ...(lost?.length ? [{ id: "lost", title: "Does not cross", items: lost }] : []),
      ];
    }
    case "generated-decision": {
      const { question, precondition, branches } = visual.data;
      return [
        ...(precondition ? [{ id: "precondition", tag: "Only reached when", title: precondition }] : []),
        { id: "question", title: question },
        ...branches.map((b: { id: string; label: string; outcome: string; note?: string }) => ({ id: b.id, tag: b.label, title: b.outcome, note: b.note })),
      ];
    }
    default:
      return [];
  }
}
