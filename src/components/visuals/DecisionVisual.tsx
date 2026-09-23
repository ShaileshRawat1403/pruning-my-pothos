import React from "react";
import type { GeneratedDecisionVisual } from "../../lib/visual-types";
import { Note, VisualFrame } from "./primitives";

interface Props {
  visual: GeneratedDecisionVisual;
}

interface Branch {
  id: string;
  label: string;
  outcome: string;
  note?: string;
}

/**
 * Where a judgment or an authorization changes the path.
 *
 * The question sits above and the branches below it, always in that DOM order,
 * so the reading order is the same whether the branches sit side by side or
 * stacked. Below `sm` they stack into a top-down flow; from `sm` they run
 * laterally when two or three fit.
 *
 * The branch label is the answer ("permitted", "refused"); the outcome is what
 * follows from it. Keeping them as separate fields stops a branch from being
 * one long sentence that reads as prose rather than as a path.
 */
export default function DecisionVisual({ visual }: Props) {
  const { question, precondition, branches } = visual.data;

  return (
    <VisualFrame alt={visual.alt}>
      {precondition && (
        <p className="mb-2 text-xs leading-relaxed text-[color:var(--text-muted)]">
          <span className="font-semibold text-[color:var(--text-secondary)]">
            Only reached when:{" "}
          </span>
          {precondition}
        </p>
      )}

      <div className="rounded-sm border border-[color:var(--card-border)] bg-[color:var(--bg-elevated)] p-4 sm:p-5">
        <p className="text-sm font-semibold leading-snug text-[color:var(--text-primary)]">
          {question}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="flex justify-center py-1 text-lg leading-none text-[color:var(--text-muted)]"
      >
        &darr;
      </div>

      <ul
        className={`m-0 grid list-none gap-3 p-0 ${
          branches.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
        }`}
      >
        {branches.map((branch: Branch) => (
          <li
            key={branch.id}
            className="flex flex-col gap-2 rounded-sm border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-4"
          >
            <p className="font-mono text-sm uppercase tracking-wider text-[color:var(--text-muted)]">
              {branch.label}
            </p>
            <p className="text-sm leading-snug text-[color:var(--text-primary)]">
              {branch.outcome}
            </p>
            {branch.note && <Note>{branch.note}</Note>}
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
