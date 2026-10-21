import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * Getting a pilot through, as five stations on one floor: a pair of glasses
 * over a sticky note (watch the real work), three small bins (choose the
 * system), a short bar chart (measure on their data), a person with a stamp
 * (where the stakes are), and a row of weekly release tags. A slip marked
 * "pilot" walks the line.
 */
const X = [70, 190, 320, 450, 570];
const LABELS = ["WATCH", "CHOOSE", "MEASURE", "PEOPLE", "SHIP"];
const SAYS = ["watch the real work.", "choose the kind of system.", "measure on their data.", "a person where it matters.", "ship small. measure again."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* 1. Watch: glasses over the sticky note. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={X[0] - 30} y={236} width={60} height={50} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        <circle cx={X[0] - 14} cy={214} r={12} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <circle cx={X[0] + 14} cy={214} r={12} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <path d={`M${X[0] - 2} 214 H${X[0] + 2}`} stroke={D.ink} strokeWidth={3.5} />
      </Lit>

      {/* 2. Choose: three small bins. */}
      <Lit on={s === 1} off={0.4}>
        {[-34, 0, 34].map((dx, i) => (
          <path key={dx} d={`M${X[1] + dx - 14} 250 L${X[1] + dx - 11} 290 H${X[1] + dx + 11} L${X[1] + dx + 14} 250`} fill={i === 2 ? D.accent : D.paperDeep} stroke={D.ink} strokeWidth={3} strokeLinejoin="round" />
        ))}
      </Lit>

      {/* 3. Measure: two bars against a total. */}
      <Lit on={s === 2} off={0.4}>
        <path d={`M${X[2] - 40} 290 H${X[2] + 40} M${X[2] - 40} 290 V200`} stroke={D.ink} strokeWidth={3.5} strokeLinecap="round" />
        <rect x={X[2] - 28} y={240} width={22} height={50} fill={D.greyLight} stroke={D.ink} strokeWidth={3} />
        <rect x={X[2] + 6} y={212} width={22} height={78} fill={D.teal} stroke={D.ink} strokeWidth={3} />
      </Lit>

      {/* 4. People: a person with a stamp. */}
      <Lit on={s === 3} off={0.4}>
        <Torso x={X[3]} y={282} w={40} h={30} fill={D.grey} />
        <Head x={X[3]} y={258} r={18} eyes="sleepy" look={1} mouth="flat" hair="sides" />
        <rect x={X[3] + 22} y={268} width={18} height={14} fill={D.accent} stroke={D.ink} strokeWidth={2.5} />
        <path d={`M${X[3] + 31} 268 V256`} stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {/* 5. Ship: weekly release tags. */}
      <Lit on={s === 4} off={0.4}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={X[4] - 52 + i * 36} y={252 - i * 12} width={32} height={26} fill={i === 2 ? D.accent : D.ink} />
            {mono(X[4] - 36 + i * 36, 271 - i * 12, `v${i + 4}`, 18, "#fff")}
          </g>
        ))}
      </Lit>

      {LABELS.map((t, i) => (
        <g key={t} style={{ opacity: s === i ? 1 : 0.45, transition: "opacity .35s" }}>{mono(X[i], 132, t, 18, s === i ? D.accent : D.ink)}</g>
      ))}

      {/* The pilot, walking the line. */}
      <At x={X[s]} y={0}>
        <g transform="rotate(-4 0 330)">
          <rect x={-40} y={312} width={80} height={32} rx={5} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(0, 334, "pilot", 18, D.teal)}
        </g>
      </At>

      {hand(320, 70, SAYS[s], 26, s === 4 ? D.accent : D.grey)}
    </Plate>
  );
}
