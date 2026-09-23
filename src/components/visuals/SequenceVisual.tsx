import React from "react";
import type { GeneratedSequenceVisual } from "../../lib/visual-types";
import { FlowArrow, Note, VisualFrame } from "./primitives";

interface Props {
  visual: GeneratedSequenceVisual;
}

interface Step {
  id: string;
  label: string;
  note?: string;
}

/**
 * Converted from a fixed `viewBox="0 0 760 …"` SVG in S2.
 *
 * The SVG version drew step labels at authored coordinates, so a phone scaled
 * the whole coordinate system down and the text went with it. Here the steps
 * are DOM text in a flex container: they wrap, they stay at body size, and the
 * composition reflows instead of shrinking.
 *
 * Orientation is not authored. Below `sm` the sequence runs vertically, which
 * is the direction a phone reads anyway; from `sm` it runs horizontally when
 * the steps fit. That decision belongs to the renderer because it depends on
 * the reader's screen, not on the writer's intent.
 * See docs/STORYBOARD_VISUAL_GRAMMAR_V1.md §3.
 */
export default function SequenceVisual({ visual }: Props) {
  const { steps } = visual.data;

  return (
    <VisualFrame alt={visual.alt}>
      {/* An ordered list because the order is the claim. flex-col below sm,
          flex-row from sm: one DOM order, two compositions, no duplication. */}
      <ol className="m-0 flex list-none flex-col gap-2 p-0 sm:flex-row sm:items-stretch sm:gap-3">
        {steps.map((step: Step, idx: number) => (
          <React.Fragment key={step.id}>
            <li className="flex min-w-0 flex-1 flex-col gap-1 rounded-sm border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-4">
              <p className="flex items-baseline gap-2 text-sm font-semibold leading-snug text-[color:var(--text-primary)]">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[11px] text-[color:var(--text-muted)]"
                >
                  {idx + 1}
                </span>
                <span className="min-w-0">{step.label}</span>
              </p>
              {step.note && <Note>{step.note}</Note>}
            </li>
            {idx < steps.length - 1 && (
              <li className="flex sm:items-center" aria-hidden="true">
                <FlowArrow />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </VisualFrame>
  );
}
