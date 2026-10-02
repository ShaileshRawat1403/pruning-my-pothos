import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Criterion before or after. Left: the target is painted first, then the
 * arrows land where they land. Right: the arrows go in first, and the target
 * is painted neatly around them. Last, the two questions that are not the
 * same: did it meet the expectation, and is meeting it enough for this use.
 */
const ARROWS_L = [
  [130, 150],
  [168, 190],
  [104, 214],
];
const ARROWS_R = [
  [470, 132],
  [520, 220],
  [452, 236],
];
const SAYS = ["target first.", "bullseye. every time.", "two different questions."];

function Target({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g style={{ opacity: on ? 1 : 0, transition: "opacity .4s" }}>
      {[60, 40, 20].map((r, i) => (
        <circle key={r} cx={x} cy={y} r={r} fill={i === 1 ? "#fff" : D.accent} stroke={D.ink} strokeWidth={3.5} />
      ))}
    </g>
  );
}
function Arrow({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y} l -34 -20`} stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
      <path d={`M${x - 34} ${y - 20} l -6 -10 m 6 10 l -12 0`} stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V300" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />
      <rect x={60} y={96} width={200} height={170} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      <rect x={380} y={96} width={200} height={170} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />

      {/* Before: the target is the condition; the arrows test it. */}
      <Lit on={s !== 1} off={0.4}>
        <Target x={150} y={180} on />
        {ARROWS_L.map(([x, y], i) => (
          <Arrow key={i} x={x} y={y} />
        ))}
        {mono(160, 290, "DEFINED BEFORE", 18, D.teal)}
      </Lit>

      {/* After: the arrows, then a target painted around wherever they went. */}
      <Lit on={s === 1} off={0.4}>
        {ARROWS_R.map(([x, y], i) => (
          <Target key={`t${i}`} x={x} y={y} on={s >= 1} />
        ))}
        {ARROWS_R.map(([x, y], i) => (
          <Arrow key={`a${i}`} x={x} y={y} />
        ))}
        {mono(480, 290, "CHOSEN AFTER", 18, D.accent)}
      </Lit>

      {/* The painter, still holding the brush. */}
      <At x={s === 1 ? 0 : 40} o={s === 0 ? 0.4 : 1}>
        <Torso x={600} y={300} w={60} h={72} fill={D.grey} />
        <Head x={600} y={276} r={24} eyes="sleepy" look={-1} mouth="smirk" stubble hair="sides" />
        <Limb d="M572 320 C 556 300, 548 280, 548 262" fill={D.grey} w={10} />
        <rect x={542} y={236} width={10} height={28} fill={D.accent} stroke={D.ink} strokeWidth={2.5} />
      </At>

      <Show on={s === 2}>
        <rect x={60} y={312} width={200} height={34} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(160, 335, "MET IT?", 18)}
        <rect x={380} y={312} width={200} height={34} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(480, 335, "ENOUGH FOR THIS USE?", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : i === 1 ? 480 : 320, 64, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["AN INDEPENDENT CONDITION", "FITTED TO THE RESULTS", "EVALUATION, THEN THE RELEASE DECISION"][s], 18, D.accent)}
    </Plate>
  );
}
