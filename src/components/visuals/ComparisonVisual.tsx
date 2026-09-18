import React from "react";
import type { GeneratedComparisonVisual } from "../../lib/visual-types";

interface Props {
  visual: GeneratedComparisonVisual;
}

/**
 * Rendered as text rather than SVG labels. Item text is author-supplied and of
 * unknown length, so it has to wrap; in SVG it overflowed the box and shrank
 * below legibility on a phone. Real text wraps, scales with the reader's font
 * size, and can be selected.
 */
function Column({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-sm border bg-[color:var(--card-bg)] p-4 sm:p-5 ${
        accent
          ? "border-[color:var(--accent-green)]"
          : "border-[color:var(--card-border)]"
      }`}
    >
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

export default function ComparisonVisual({ visual }: Props) {
  const { before, after, diffNote } = visual.data;

  return (
    <div className="w-full" role="group" aria-label={visual.alt}>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch">
        <Column label={before.label} items={before.items} />
        <div
          aria-hidden="true"
          className="hidden items-center justify-center px-1 text-lg text-[color:var(--text-muted)] sm:flex"
        >
          &rarr;
        </div>
        <Column label={after.label} items={after.items} accent />
      </div>

      {diffNote && (
        <p className="mt-4 text-center text-xs leading-relaxed text-[color:var(--text-muted)]">
          {diffNote}
        </p>
      )}
    </div>
  );
}
