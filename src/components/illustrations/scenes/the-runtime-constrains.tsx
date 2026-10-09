import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The runtime constrains. A model in a fenced playpen choosing between a few
 * blocks: that is its discretion. Outside the fence, the host program holds
 * the keys, the toolbox, the rulebook. Last, the fence itself labelled: the
 * runtime, the thing that constrains, not the thing inside.
 */
const SAYS = ["picks the next block.", "keys, tools, rules: out here.", "the fence is the runtime."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The pen and its fence. */}
      <Lit on={s === 2} off={0.55}>
        <rect x={60} y={150} width={280} height={210} fill="none" stroke={s === 2 ? D.accent : D.ink} strokeWidth={5} />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${60 + i * 31} 150 V360`} stroke={s === 2 ? D.accent : D.ink} strokeWidth={2.5} opacity={0.6} />
        ))}
        {mono(200, 138, "THE RUNTIME", 18, s === 2 ? D.accent : D.ink)}
      </Lit>

      {/* Inside: the model's discretion. */}
      <Lit on={s === 0} off={0.5}>
        <Torso x={150} y={290} w={60} h={70} fill={D.teal} />
        <Head x={150} y={262} r={24} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <Limb d="M176 300 C 196 300, 212 304, 228 312" fill={D.teal} w={10} />
        {["A", "B", "C"].map((b, i) => (
          <g key={b}>
            <rect x={232 + i * 34} y={306} width={28} height={28} fill={i === 0 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={2.5} />
            {mono(246 + i * 34, 326, b, 18)}
          </g>
        ))}
      </Lit>

      {/* Outside: what the host holds. */}
      <Lit on={s === 1} off={0.35}>
        <Torso x={500} y={250} w={90} h={122} fill={D.grey} />
        <Head x={500} y={208} r={34} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
        {mono(500, 160, "HOST PROGRAM", 18)}
        <rect x={380} y={60} width={78} height={30} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(419, 81, "KEYS", 18)}
        <rect x={466} y={60} width={78} height={30} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(505, 81, "TOOLS", 18)}
        <rect x={552} y={60} width={78} height={30} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(591, 81, "RULES", 18)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 500 : 200, i === 1 ? 120 : 100, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["THE MODEL'S DISCRETION", "WHAT THE RUNTIME HOLDS", "IT CONSTRAINS THE DISCRETION"][s], 18, D.accent)}
    </Plate>
  );
}
