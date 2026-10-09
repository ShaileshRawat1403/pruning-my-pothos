import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Locatable change. Two investigation boards. Left: a line that jumps, a big
 * question mark, and a theory written on a sticky note. Right: the same line,
 * with version tags pinned along it, and one tag sitting exactly at the jump.
 * Last, the warning signs as reasons to go and look.
 */
const SAYS = ["something changed. vibes.", "policy v7 → v8. there.", "go and look. with a record."];

function Line({ x }: { x: number }) {
  return <path d={`M${x} 250 L${x + 50} 240 L${x + 90} 246 L${x + 120} 238 L${x + 140} 170 L${x + 180} 160 L${x + 220} 166`} fill="none" stroke={D.teal} strokeWidth={4} strokeLinejoin="round" />;
}

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Without versions. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={30} y={90} width={270} height={220} fill="#C9A77C" stroke={D.ink} strokeWidth={4} />
        <Line x={50} />
        {mono(190, 150, "?", 40, D.accent)}
        <g transform="rotate(-6 100 280)">
          <rect x={50} y={262} width={120} height={40} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} />
          {mono(110, 287, "A THEORY", 18)}
        </g>
      </Lit>

      {/* With versions pinned beside the behaviour. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={340} y={90} width={270} height={220} fill="#C9A77C" stroke={D.ink} strokeWidth={4} />
        <Line x={360} />
        {[
          { x: 400, t: "MODEL A" },
          { x: 498, t: "POLICY v8" },
          { x: 568, t: "TPL 3" },
        ].map((p, i) => (
          <g key={p.t}>
            <circle cx={p.x} cy={196 + (i === 1 ? 0 : 60)} r={6} fill={D.accent} stroke={D.ink} strokeWidth={2} />
            <rect x={p.x - 46} y={(i === 1 ? 116 : 270)} width={92} height={28} fill="#fff" stroke={i === 1 ? D.accent : D.ink} strokeWidth={i === 1 ? 3.5 : 2.5} />
            {mono(p.x, (i === 1 ? 136 : 290), p.t, 18, i === 1 ? D.accent : D.ink)}
          </g>
        ))}
      </Lit>

      <Torso x={320} y={330} w={40} h={42} fill={D.grey} />
      <Head x={320} y={312} r={18} eyes={s === 1 ? "sleepy" : "tt"} look={s === 0 ? -1 : 1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 165 : i === 1 ? 475 : 320, 64, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["OBSERVED, NOT ATTRIBUTED", "VERSIONS NEXT TO THE BEHAVIOUR", "SIGNALS ARE REASONS TO LOOK"][s], 18, D.accent)}
    </Plate>
  );
}
