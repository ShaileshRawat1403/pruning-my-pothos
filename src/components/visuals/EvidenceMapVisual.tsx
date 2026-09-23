import React from "react";
import type { GeneratedEvidenceMapVisual } from "../../lib/visual-types";
import { Footnote, Note, VisualFrame } from "./primitives";

interface Props {
  visual: GeneratedEvidenceMapVisual;
}

type Strength = "direct" | "partial" | "absent";

interface Support {
  id: string;
  label: string;
  strength?: Strength;
  note?: string;
}

/**
 * How observations support a judgment.
 *
 * Supports are listed first and the judgment last, in both compositions, because
 * that is the honest direction: the conclusion follows the evidence rather than
 * the evidence being arranged under a conclusion already decided.
 *
 * `strength: "absent"` is the field this form exists for. A support that was
 * relevant and never collected is the most useful thing an evidence map can
 * show, so it is rendered at full contrast with an explicit word, a dashed
 * border and a distinct marker — never as a faded version of a real support.
 * Strength is never carried by colour alone: each level has its own word and
 * its own marker glyph. See docs/STORYBOARD_VISUAL_GRAMMAR_V1.md §5.2.
 */
const STRENGTH: Record<
  Strength,
  { word: string; marker: string; border: string; tone: string }
> = {
  direct: {
    word: "direct",
    marker: "●",
    border: "border-[color:var(--accent-green)]",
    tone: "text-[color:var(--accent-green)]",
  },
  partial: {
    word: "partial",
    marker: "◐",
    border: "border-[color:var(--card-border)]",
    tone: "text-[color:var(--text-secondary)]",
  },
  absent: {
    word: "not collected",
    marker: "○",
    border: "border-dashed border-[color:var(--text-muted)]",
    tone: "text-[color:var(--text-muted)]",
  },
};

export default function EvidenceMapVisual({ visual }: Props) {
  const { judgment, supports, gap } = visual.data;

  return (
    <VisualFrame alt={visual.alt}>
      <p className="mb-2 font-mono text-sm uppercase tracking-wider text-[color:var(--text-muted)]">
        Evidence
      </p>

      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {supports.map((support: Support) => {
          const s = STRENGTH[support.strength ?? "direct"];
          return (
            <li
              key={support.id}
              className={`flex flex-col gap-1 rounded-sm border bg-[color:var(--card-bg)] p-4 ${s.border}`}
            >
              <p className="flex items-baseline gap-2 text-sm leading-snug text-[color:var(--text-primary)]">
                <span aria-hidden="true" className={`shrink-0 text-xs ${s.tone}`}>
                  {s.marker}
                </span>
                <span className="min-w-0">{support.label}</span>
                <span
                  className={`ml-auto shrink-0 font-mono text-sm uppercase tracking-wider ${s.tone}`}
                >
                  {s.word}
                </span>
              </p>
              {support.note && <Note>{support.note}</Note>}
            </li>
          );
        })}
      </ul>

      <div
        aria-hidden="true"
        className="flex justify-center py-1 text-lg leading-none text-[color:var(--text-muted)]"
      >
        &darr;
      </div>

      <div className="rounded-sm border border-[color:var(--card-border)] bg-[color:var(--bg-elevated)] p-4 sm:p-5">
        <p className="font-mono text-sm uppercase tracking-wider text-[color:var(--text-muted)]">
          Judgment
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-[color:var(--text-primary)]">
          {judgment}
        </p>
      </div>

      {gap && <Footnote label="What this does not establish:">{gap}</Footnote>}
    </VisualFrame>
  );
}
