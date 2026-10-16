import React from "react";
import { D } from "../deadpan";
import { Stamp } from "../props";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * One turn of the loop, left to right: a stack of pages chosen for the
 * model, the model's proposal on a slip, a gate that stamps it, a terminal
 * where it runs, and a notebook where the result is kept for the next turn.
 * Only the second station is the model; the slip travels through the rest.
 */
const X = [70, 190, 320, 450, 570];
const LABELS = ["CONTEXT", "MODEL", "LIMITS", "TOOL", "KEEP"];
const SAYS = ["the harness picks what it sees.", "the model proposes, as text.", "checked against the limits.", "the tool runs. something changes.", "kept for the next turn."];
const SLIP_X = [190, 190, 320, 450, 556];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* 1. Context: pages chosen for this turn. */}
      <Lit on={s === 0} off={0.4}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={X[0] - 26 + i * 6} y={250 - i * 10} width={44} height={56} fill="#fff" stroke={D.ink} strokeWidth={3} />
        ))}
        <path d={`M${X[0] + 30} 270 H${X[1] - 34}`} stroke={D.ink} strokeWidth={3} strokeDasharray="6 6" />
      </Lit>

      {/* 2. The model. */}
      <Lit on={s === 1} off={0.4}>
        <rect x={X[1] - 24} y={260} width={48} height={40} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <circle cx={X[1] - 10} cy={278} r={5} fill={D.ink} />
        <circle cx={X[1] + 10} cy={278} r={5} fill={D.ink} />
        <path d={`M${X[1] - 10} 290 H${X[1] + 10}`} stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
        <path d={`M${X[1] - 16} 300 V352 M${X[1] + 16} 300 V352`} stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {/* 3. The gate. */}
      <Lit on={s === 2} off={0.4}>
        <path d={`M${X[2] - 34} 352 V170 H${X[2] + 34} V352`} fill="none" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      </Lit>

      {/* 4. The terminal. */}
      <Lit on={s === 3} off={0.4}>
        <rect x={X[3] - 46} y={250} width={92} height={64} fill={D.ink} stroke={D.ink} strokeWidth={3} />
        {mono(X[3], 278, "$ test", 18, D.leaf)}
        <Show on={s >= 3}>{mono(X[3], 302, "ok", 18, "#fff")}</Show>
      </Lit>

      {/* 5. The notebook. */}
      <Lit on={s === 4} off={0.4}>
        <rect x={X[4] - 30} y={250} width={60} height={76} fill={D.leaf} stroke={D.ink} strokeWidth={3.5} />
        <path d={`M${X[4] - 20} 250 V326`} stroke={D.ink} strokeWidth={3} />
      </Lit>

      {LABELS.map((t, i) => (
        <g key={t} style={{ opacity: s === i ? 1 : 0.45, transition: "opacity .35s" }}>{mono(X[i], 132, t, 18, s === i ? D.accent : D.ink)}</g>
      ))}

      {/* The proposal slip. */}
      <Show on={s >= 1}>
        <At x={SLIP_X[s]} y={0}>
          <g transform="rotate(-4 0 210)">
            <rect x={-50} y={186} width={100} height={44} rx={5} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
            {mono(0, 214, "run tests", 18, D.teal)}
          </g>
        </At>
      </Show>

      <Show on={s >= 2}>
        <Stamp x={X[2]} y={300} text="ALLOW" w={64} size={18} rotate={-8} color={D.leaf} />
      </Show>

      {hand(320, 64, SAYS[s], 26, s === 4 ? D.accent : D.grey)}
      {mono(320, 404, ["HARNESS", "MODEL", "HARNESS", "HARNESS", "HARNESS"][s], 18, D.accent)}
    </Plate>
  );
}
