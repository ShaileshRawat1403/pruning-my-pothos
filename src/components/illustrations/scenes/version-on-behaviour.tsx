import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Version on behaviour. Left: the same jar with a nicer label (a tidy-up),
 * still v2. Right: a jar whose contents changed (more tools inside, the lid
 * loosened) gets a new tag, v3. Last, a long diff printout nobody can read,
 * proudly tagged v4: bookkeeping.
 */
function Jar({ x, tools, loose }: { x: number; tools: number; loose?: boolean }) {
  return (
    <g>
      <rect x={x - 54} y={loose ? 112 : 120} width={108} height={18} rx={4} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} transform={loose ? `rotate(-12 ${x} 120)` : undefined} />
      <path d={`M${x - 50} 136 H${x + 50} V290 Q ${x + 50} 306 ${x + 34} 306 H${x - 34} Q ${x - 50} 306 ${x - 50} 290 Z`} fill="#fff" fillOpacity={0.6} stroke={D.ink} strokeWidth={4} />
      {Array.from({ length: tools }, (_, i) => (
        <rect key={i} x={x - 36 + (i % 3) * 26} y={250 - Math.floor(i / 3) * 30} width={20} height={26} rx={3} fill={i % 2 ? D.teal : D.accent} stroke={D.ink} strokeWidth={2} />
      ))}
    </g>
  );
}

const SAYS = ["prettier. same behaviour. still v2.", "does more. stops less. v3.", "v4: a diff nobody can read."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      <Lit on={s === 0} off={0.4}>
        <Jar x={130} tools={2} />
        <rect x={86} y={170} width={88} height={40} rx={6} fill="#DDEFE6" stroke={D.leaf} strokeWidth={3} />
        {mono(130, 197, "SKILL", 18, D.leaf)}
        {mono(130, 336, "v2", 22, D.teal)}
      </Lit>

      <Lit on={s === 1} off={0.4}>
        <Jar x={320} tools={5} loose />
        <rect x={276} y={170} width={88} height={40} rx={6} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(320, 197, "SKILL", 18)}
        <g transform="rotate(-8 360 330)">
          <rect x={330} y={314} width={60} height={34} fill="#F6E7A8" stroke={D.accent} strokeWidth={3} />
          {mono(360, 338, "v3", 22, D.accent)}
        </g>
      </Lit>

      <Show on={s === 2}>
        <rect x={460} y={70} width={150} height={260} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M474 ${92 + i * 19} H${590 - (i % 4) * 22}`} stroke={i % 3 ? D.leaf : D.accent} strokeWidth={3} strokeLinecap="round" opacity={0.7} />
        ))}
        <g transform="rotate(6 560 350)">
          <rect x={530} y={334} width={60} height={34} fill="#fff" stroke={D.greyLight} strokeWidth={3} />
          {mono(560, 358, "v4", 22, D.greyLight)}
        </g>
      </Show>

      <Torso x={220} y={330} w={40} h={42} fill={D.grey} />
      <Head x={220} y={312} r={18} eyes="sleepy" look={1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 170 : i === 1 ? 340 : 400, i === 2 ? 52 : 64, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A TIDY-UP", "WORTH A VERSION", "RECORD WHAT CHANGED IN BEHAVIOUR"][s], 18, D.accent)}
    </Plate>
  );
}
