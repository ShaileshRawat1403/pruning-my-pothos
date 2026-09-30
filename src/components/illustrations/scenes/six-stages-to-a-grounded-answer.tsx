import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Page, Plate, SceneProps, mono } from "./kit";

/**
 * Six stages to a grounded answer, followed by eight sheets of paper. One
 * never gets indexed, five come back as candidates, two survive ranking, and
 * those two are what the model is handed.
 */

type P = [number, number, number, number?]; // x, y, rotation, opacity

const SOURCE: P[] = [
  [70, 300, -12], [105, 285, 8], [140, 305, -5], [90, 250, 15],
  [150, 255, -18], [180, 290, 10], [120, 225, 4], [185, 235, -9],
];
const SHELVED: P[] = [
  [66, 196, 0], [104, 196, 0], [142, 196, 0], [180, 196, 0],
  [66, 268, 0], [104, 268, 0], [142, 268, 0], [246, 330, 82, 0.4],
];
const CANDIDATES: Record<number, P> = { 0: [278, 262, -12], 2: [310, 256, -5], 3: [342, 254, 2], 5: [374, 256, 8], 6: [406, 262, 14] };
const RANKED: Record<number, P> = { 2: [318, 236, -3], 5: [366, 236, 3], 0: [282, 322, -28, 0.3], 3: [342, 328, 12, 0.3], 6: [400, 322, 30, 0.3] };
const TRAY: Record<number, P> = { 2: [470, 282, -4], 5: [504, 282, 4] };
const EATEN: Record<number, P> = { 2: [596, 214, 0, 0], 5: [596, 214, 0, 0] };

function place(i: number, step: number): P {
  if (step === 0) return SOURCE[i];
  const base = SHELVED[i];
  if (step === 1) return base;
  if (step === 2) return CANDIDATES[i] ?? base;
  if (step === 3) return RANKED[i] ?? base;
  if (step === 4) return TRAY[i] ?? RANKED[i] ?? base;
  return EATEN[i] ?? RANKED[i] ?? base;
}

export default function Scene({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The index: shelves the sheets are filed into. */}
      <Lit on={step === 1} off={step === 0 ? 0 : 0.4}>
        <rect x={38} y={160} width={172} height={150} fill="none" stroke={D.ink} strokeWidth={4.5} />
        <path d="M38 232 H210" stroke={D.ink} strokeWidth={4} />
      </Lit>

      {/* The input being assembled. */}
      <Lit on={step === 4} off={step < 4 ? 0 : 0.5}>
        <path d="M440 262 V312 H568 V262" {...LINE} strokeWidth={4.5} />
        {mono(504, 340, "INPUT", 18, D.greyLight)}
      </Lit>
      <At x={step >= 5 ? 596 : 538} y={step >= 5 ? 214 : 284} o={step === 4 ? 1 : 0}>
        <g transform="rotate(6)">
          <rect x={-15} y={-20} width={30} height={40} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
        </g>
      </At>

      {/* The model: a door with a slot. */}
      <Lit on={step === 5} off={step < 4 ? 0.25 : 0.5}>
        <rect x={572} y={96} width={56} height={256} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <rect x={578} y={204} width={44} height={20} rx={4} fill={D.ink} />
      </Lit>
      <At x={600} y={step === 5 ? 296 : 226} o={step === 5 ? 1 : 0} delay={0.25}>
        <Page w={34} h={46} lines={3} />
        <path d="M-10 14 H10" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
      </At>

      {SOURCE.map((_, i) => {
        const [x, y, r, o = 1] = place(i, step);
        return (
          <At key={i} x={x} y={y} r={r} o={o} delay={i * 0.02}>
            <Page w={30} h={40} lines={2} />
            {step >= 3 && RANKED[i] && (RANKED[i][3] ?? 1) < 1 && <path d="M-18 -8 L18 8" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />}
          </At>
        );
      })}
      {step === 3 && (
        <g>
          {mono(318, 204, "1", 19, D.accent)}
          {mono(366, 204, "2", 19, D.accent)}
        </g>
      )}

      {mono(
        step < 2 ? 124 : step < 4 ? 340 : 440,
        392,
        ["SOURCE MATERIAL", "ONE NEVER MADE IT IN", "CANDIDATES", "MOST ARE DROPPED", "WHAT IT IS HANDED", "AN ANSWER FROM THAT"][Math.min(step, 5)],
        18,
        D.accent,
      )}
    </Plate>
  );
}
