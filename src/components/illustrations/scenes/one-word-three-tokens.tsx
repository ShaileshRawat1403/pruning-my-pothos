import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * One word, three tokens. A made-up word on a name badge: SMARTIFICATION.
 * A paper cutter comes down, and it falls into three pieces. Then each piece
 * is swapped for a number tag, and the model receives three numbers, not a
 * word. The split and the numbers are illustrative.
 */
const SAYS = ["one word, surely.", "chop.", "three numbers. no word."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  const pieces = ["SMART", "IFI", "CATION"];
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The word, then the pieces. */}
      {pieces.map((p, i) => {
        const w = [110, 64, 120][i];
        const x0 = [120, 230, 294][i];
        return (
          <At key={p} x={s >= 1 ? (i - 1) * 24 : 0} y={s >= 1 ? (i % 2) * 10 : 0} r={s >= 1 ? (i - 1) * 4 : 0}>
            <Lit on={s <= 1} off={0.35}>
              <rect x={x0} y={120} width={w} height={60} fill="#fff" stroke={D.ink} strokeWidth={3} />
              {mono(x0 + w / 2, 158, p, 22)}
            </Lit>
          </At>
        );
      })}
      <Show on={s === 1}>
        <path d="M228 90 V200 M292 90 V200" stroke={D.accent} strokeWidth={3} strokeDasharray="6 4" />
      </Show>

      {/* The numbers the model actually gets. */}
      <Show on={s === 2}>
        {["4021", "118", "9377"].map((n, i) => (
          <g key={n}>
            <rect x={150 + i * 110} y={230} width={90} height={44} rx={22} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
            {mono(195 + i * 110, 259, n, 20, D.accent)}
          </g>
        ))}
        <path d="M480 252 H520" stroke={D.ink} strokeWidth={3} />
      </Show>

      <Torso x={570} y={290} w={70} h={82} fill={D.teal} />
      <Head x={570} y={258} r={28} eyes={s === 2 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="curly" />
      {mono(570, 218, "MODEL", 18)}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 70, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A MADE-UP WORD", "SPLIT INTO PIECES (ILLUSTRATIVE)", "THE MODEL SEES INTEGERS"][s], 18, D.accent)}
    </Plate>
  );
}
