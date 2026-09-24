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
      {/* The row is count-aware, because the width a sequence needs depends on
          how many steps share it.

          Up to five steps go horizontal from lg: at 1024 the narrowest container
          that renders a visual is the article's, ~787px, which gives five steps
          about 157px each -- enough for a two-word label.

          Six steps stay vertical at every width. Six columns need roughly
          1000px of container, and the article is capped at max-w-[840px], so
          its visual container sits at ~787px no matter how wide the viewport
          gets. A later breakpoint would fix /storyboards and leave the article
          broken at exactly the width that already failed, so there is no
          viewport threshold that satisfies both surfaces. Vertical is always
          legible; a squeezed row is not.

          Presentation only: one DOM order, no duplicated markup, no smaller
          text, no truncation. */}
      <ol
        className={`m-0 flex list-none flex-col gap-2 p-0 ${
          steps.length <= 5 ? "lg:flex-row lg:items-stretch lg:gap-3" : ""
        }`}
      >
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
              <li
                className={steps.length <= 5 ? "flex lg:items-center" : "flex"}
                aria-hidden="true"
              >
                <FlowArrow horizontalFromLg={steps.length <= 5} />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </VisualFrame>
  );
}
