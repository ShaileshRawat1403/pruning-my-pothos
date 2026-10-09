import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The evidence field. This repository's small historical ledger, drawn as a
 * ruled book: DECISION and PUBLISH in separate columns (good), an UNDO column
 * written at the time (good), an EVIDENCE column in prose with checks kept
 * elsewhere (partly), and, in it, the word "stunning". Then the claim, and
 * the fair reading of what a record is.
 */
const COLS = [
  { x: 110, t: "DECISION", v: "pending" },
  { x: 230, t: "PUBLISH", v: "done" },
  { x: 350, t: "UNDO", v: "git revert …" },
  { x: 500, t: "EVIDENCE", v: "stunning" },
];
const SAYS = ["two fields. two facts.", "the way back, written down.", "prose. checks live elsewhere.", "'stunning.'", "", "a record. not a review."];
const LABEL = ["DECISION APART FROM PUBLISH", "THE UNDO PATH, AT THE TIME", "EVIDENCE IN PROSE", "AN OPINION AS A FACT", "THE CLAIM", "A SEPARATE QUESTION"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 5);
  const lit = (i: number) => (s === 0 && i < 2) || (s === 1 && i === 2) || ((s === 2 || s === 3) && i === 3);
  return (
    <Plate id={id}>
      <path d="M20 380 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The ledger. */}
      <rect x={40} y={70} width={560} height={230} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <path d="M40 112 H600 M170 70 V300 M290 70 V300 M410 70 V300" stroke={D.ink} strokeWidth={2.5} />
      {[0, 1, 2, 3].map((r) => (
        <path key={r} d={`M40 ${156 + r * 44} H600`} stroke={D.greyLight} strokeWidth={1.5} />
      ))}
      {COLS.map((c, i) => (
        <Lit key={c.t} on={lit(i)} off={0.35}>
          {mono(c.x, 98, c.t, 18, lit(i) ? D.teal : D.ink)}
          {[0, 1, 2].map((r) => (
            <g key={r}>
              {i === 3 && r === 1 ? (
                <g>
                  {mono(c.x, 182 + r * 44, c.v, 20, s >= 3 ? D.accent : D.ink)}
                  <Show on={s === 3}>
                    <ellipse cx={c.x} cy={176 + r * 44} rx={64} ry={20} fill="none" stroke={D.accent} strokeWidth={3} />
                  </Show>
                </g>
              ) : (
                <path d={`M${c.x - 44} ${136 + r * 44} H${c.x + 44 - (r % 2) * 18}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
              )}
            </g>
          ))}
        </Lit>
      ))}
      <Lit on={s === 2} off={0.3}>
        <rect x={430} y={310} width={170} height={34} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} />
        {mono(515, 333, "checks_run →", 18)}
      </Lit>

      <Show on={s >= 4}>
        <g transform="rotate(-6 150 340)">
          <rect x={60} y={318} width={190} height={40} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
          {mono(155, 344, "EVIDENCE OF WHAT?", 18, D.accent)}
        </g>
      </Show>

      <Torso x={320} y={340} w={40} h={40} fill={D.grey} />
      <Head x={320} y={322} r={18} eyes={s === 3 ? "tt" : "sleepy"} look={1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={i} on={s === i && t !== ""}>
          {hand(320, 46, t, 26, i === 5 ? D.teal : i === 3 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 408, LABEL[s], 18, D.accent)}
    </Plate>
  );
}
