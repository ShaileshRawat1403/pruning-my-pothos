import React from "react";
import type { GeneratedLayersVisual } from "../../lib/visual-types";
import { Note, VisualFrame } from "./primitives";

interface Props {
  visual: GeneratedLayersVisual;
}

interface Layer {
  id: string;
  label: string;
  note?: string;
  highlighted?: boolean;
}

/**
 * Converted from a fixed `viewBox="0 0 760 …"` SVG in S2.
 *
 * Layers were already stacked vertically, so the conversion is not about
 * changing the composition — it is about the text. In the SVG the layer labels
 * lived at authored coordinates inside a 760-unit canvas, so on a 340px figure
 * every label rendered at roughly 45% size. As DOM text they wrap and stay at
 * body size at every width.
 *
 * The dependency guide that ran down the left edge is now the stack itself:
 * each row sits above the one it depends on, and `highlighted` marks the layer
 * under discussion with a border and a label tone rather than colour alone.
 * See docs/STORYBOARD_VISUAL_GRAMMAR_V1.md §3.
 */
export default function LayersVisual({ visual }: Props) {
  const { layers } = visual.data;

  return (
    <VisualFrame alt={visual.alt}>
      {/* Ordered: top of the list is top of the stack, and that is the claim. */}
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {layers.map((layer: Layer, idx: number) => {
          const highlighted = Boolean(layer.highlighted);
          return (
            <li
              key={layer.id}
              className={`flex flex-col gap-1 rounded-sm border bg-[color:var(--card-bg)] p-4 ${
                highlighted
                  ? "border-[color:var(--accent-green)]"
                  : "border-[color:var(--card-border)]"
              }`}
            >
              <p
                className={`flex items-baseline gap-2 text-sm font-semibold leading-snug ${
                  highlighted
                    ? "text-[color:var(--accent-green)]"
                    : "text-[color:var(--text-primary)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[12.75px] text-[color:var(--text-muted)]"
                >
                  {layers.length - idx}
                </span>
                <span className="min-w-0">{layer.label}</span>
                {/* Not colour alone: the highlighted layer is also named. */}
                {highlighted && (
                  <span className="shrink-0 font-mono text-sm uppercase tracking-wider text-[color:var(--accent-green)]">
                    in focus
                  </span>
                )}
              </p>
              {layer.note && <Note>{layer.note}</Note>}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-[color:var(--text-muted)]">
        Each layer depends on the one below it.
      </p>
    </VisualFrame>
  );
}
