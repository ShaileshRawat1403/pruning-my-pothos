import React from "react";
import type { GeneratedBoundaryVisual } from "../../lib/visual-types";
import { Crossing } from "./primitives";

interface Props {
  visual: GeneratedBoundaryVisual;
}

/**
 * Rendered as text rather than SVG labels. The boundary label used to be a
 * fixed-position pill that the right-hand zone drew over, and the item text
 * shrank below legibility on a phone. Here the divider carries the label
 * between the two zones, and the zones stack on narrow screens.
 */
function Zone({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-4 sm:p-5">
      <p
        className={`text-sm font-semibold ${
          accent
            ? "text-[color:var(--accent-green)]"
            : "text-[color:var(--text-muted)]"
        }`}
      >
        {label}
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((item: string, idx: number) => (
          <li
            key={idx}
            className="flex gap-2 text-sm leading-snug text-[color:var(--text-secondary)]"
          >
            <span
              aria-hidden="true"
              className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${
                accent
                  ? "bg-[color:var(--accent-green)]"
                  : "bg-[color:var(--text-muted)]"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BoundaryVisual({ visual }: Props) {
  const { inside, outside, boundaryLabel } = visual.data;
  const labelText = boundaryLabel || "Authority boundary";

  return (
    <div className="w-full" role="group" aria-label={visual.alt}>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch">
        <Zone label={inside.label} items={inside.items} accent />

        {/* The shared primitive, not a local copy of it. This renderer carried
            its own duplicate of exactly this markup, which is how the label
            was left at 11px when the shared Crossing was raised to body size. */}
        <Crossing label={labelText} />

        <Zone label={outside.label} items={outside.items} />
      </div>
    </div>
  );
}
