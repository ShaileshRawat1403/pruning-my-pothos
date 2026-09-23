import React from "react";
import type { GeneratedStateChangeVisual } from "../../lib/visual-types";
import { Crossing, ItemList, Panel, VisualFrame } from "./primitives";

interface Props {
  visual: GeneratedStateChangeVisual;
}

/**
 * What persists or changes across a crossing.
 *
 * An independent renderer, not a call into ComparisonVisual, because the two
 * assert different things. Comparison contrasts two options a reader might
 * choose between. This shows one thing before and after an event, where the
 * event itself is the subject — so the boundary is drawn as a crossing the
 * reader passes through rather than as a divider between alternatives.
 *
 * It shares Panel, ItemList and Crossing with comparison and boundary, because
 * those are layout and duplicating them would fork the visual system.
 *
 * `preserved` and `lost` belong to the crossing, not to either side, so they
 * render attached to it rather than as footnotes after the whole figure. They
 * are what make this a continuity visual instead of a before/after picture.
 * See docs/STORYBOARD_VISUAL_GRAMMAR_V1.md §5.3.
 */
export default function StateChangeVisual({ visual }: Props) {
  const { boundary, before, after, preserved, lost } = visual.data;
  const hasCrossingDetail =
    (preserved && preserved.length > 0) || (lost && lost.length > 0);

  return (
    <VisualFrame alt={visual.alt}>
      {/* Mobile: before -> crossing -> after, top to bottom.
          sm+: the crossing sits between the two states. */}
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch">
        <Panel label={before.label} tone="muted">
          <ItemList items={before.items} tone="muted" />
        </Panel>

        <Crossing label={boundary} />

        <Panel label={after.label} tone="accent">
          <ItemList items={after.items} tone="accent" />
        </Panel>
      </div>

      {hasCrossingDetail && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {preserved && preserved.length > 0 && (
            <div className="rounded-sm border border-[color:var(--card-border)] bg-[color:var(--bg-surface)] p-3">
              <p className="font-mono text-sm uppercase tracking-wider text-[color:var(--text-muted)]">
                Crosses unchanged
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {preserved.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-xs leading-snug text-[color:var(--text-secondary)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lost && lost.length > 0 && (
            <div className="rounded-sm border border-dashed border-[color:var(--text-muted)] bg-[color:var(--bg-surface)] p-3">
              <p className="font-mono text-sm uppercase tracking-wider text-[color:var(--text-muted)]">
                Does not cross
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {lost.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-xs leading-snug text-[color:var(--text-muted)]"
                  >
                    {/* Not colour alone: a marker and a heading both say it. */}
                    <span aria-hidden="true" className="shrink-0">
                      &times;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </VisualFrame>
  );
}
