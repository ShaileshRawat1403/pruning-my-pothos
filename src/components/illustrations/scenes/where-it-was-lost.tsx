import React from "react";
import { D, Head } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Where it was lost. Five stations in a row, the document travelling along
 * them: the shelf (indexed?), the search, the ranking cut, the assembly box,
 * the model. At each step the document is lost at that station instead, so
 * the reader sees five different places the same evidence goes missing; only
 * the last station has a face.
 */
const STATIONS = ["INDEX", "SEARCH", "RANK CUT", "ASSEMBLY", "MODEL"];
const SAYS = ["never got in.", "not returned.", "below the cut.", "dropped for length.", "seen. ignored."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const x = (i: number) => 70 + i * 125;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M40 220 H620" stroke={D.ink} strokeWidth={4} strokeDasharray="4 10" opacity={0.5} />

      {STATIONS.map((t, i) => (
        <Lit key={t} on={s === i} off={i < s ? 0.6 : 0.3}>
          {i < 4 ? (
            <rect x={x(i) - 46} y={180} width={92} height={80} rx={6} fill={i === s ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3.5} />
          ) : (
            <Head x={x(i)} y={220} r={40} eyes={s === 4 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="curly" />
          )}
          {mono(x(i), 296, t, 18, i === s ? D.accent : D.ink)}
          {i < 4 && <Show on={i < s}>{mono(x(i), 160, "✓", 22, D.leaf)}</Show>}
        </Lit>
      ))}

      {/* The document: it gets as far as this step's station, and falls there. */}
      <At x={x(s) - 70} y={s === 4 ? -40 : 90} r={s === 4 ? 0 : 18}>
        <rect x={52} y={100} width={36} height={46} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
        <path d="M60 114 H80 M60 124 H76 M60 134 H80" stroke={D.greyLight} strokeWidth={2.5} strokeLinecap="round" />
      </At>

      <Show on={s === 4}>
        {mono(470, 334, "THE ONLY MODEL PROBLEM", 18, D.teal)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 90, t, 30, i === 4 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["NEVER INDEXED", "INDEXED, NOT RETURNED", "RETURNED, RANKED BELOW THE CUT", "SURVIVED RANKING, DROPPED IN ASSEMBLY", "REACHED THE MODEL, NOT USED"][s], 18, D.accent)}
    </Plate>
  );
}
