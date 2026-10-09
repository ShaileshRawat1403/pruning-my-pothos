import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Split or keep. The spork: two jobs, two definitions of success, one tool,
 * failing both the soup and the steak; split it into a spoon and a fork.
 * The scissors: two blades, one job, one definition of done; keep them
 * whole. Last, two judges holding up different score cards to the spork:
 * evaluated differently, so not one skill.
 */
const SAYS = ["two jobs. one handle.", "two parts. one job.", "different score cards: split."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* The spork, then the spoon and fork it should have been. */}
      <Lit on={s !== 1} off={0.4}>
        <g transform="rotate(-30 160 200)">
          <rect x={150} y={200} width={20} height={130} rx={10} fill={D.greyLight} stroke={D.ink} strokeWidth={4} />
          <ellipse cx={160} cy={170} rx={42} ry={50} fill={D.greyLight} stroke={D.ink} strokeWidth={4} />
          <path d="M136 124 V150 M152 120 V150 M168 120 V150 M184 124 V150" stroke={D.paper} strokeWidth={6} />
        </g>
        {mono(160, 330, "SPORK", 18)}
        <rect x={40} y={60} width={110} height={36} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(95, 84, "SOUP: ✗", 18, D.accent)}
        <rect x={180} y={60} width={120} height={36} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(240, 84, "STEAK: ✗", 18, D.accent)}
      </Lit>

      {/* The scissors: one job. */}
      <Lit on={s === 1} off={0.4}>
        <path d="M400 120 L540 260 M540 120 L400 260" stroke={D.grey} strokeWidth={10} strokeLinecap="round" />
        <circle cx={390} cy={276} r={26} fill="none" stroke={D.ink} strokeWidth={6} />
        <circle cx={550} cy={276} r={26} fill="none" stroke={D.ink} strokeWidth={6} />
        <circle cx={470} cy={190} r={7} fill={D.ink} />
        {mono(470, 330, "SCISSORS", 18)}
        <rect x={410} y={60} width={120} height={36} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(470, 84, "CUT: ✓", 18, D.leaf)}
      </Lit>

      {/* Two judges, two score cards, one spork. */}
      <Show on={s === 2}>
        <Torso x={110} y={250} w={44} h={50} fill={D.grey} />
        <Head x={110} y={230} r={18} eyes="tt" look={1} mouth="flat" stubble hair="sides" />
        <rect x={84} y={176} width={52} height={34} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(110, 199, "2", 20, D.accent)}
        <Torso x={250} y={250} w={44} h={50} fill={D.teal} />
        <Head x={250} y={230} r={18} eyes="tt" look={-1} mouth="flat" hair="curly" />
        <rect x={224} y={176} width={52} height={34} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(250, 199, "9", 20, D.leaf)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 470 : 180, i === 2 ? 130 : 30, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["SPLIT IT WHEN", "KEEP IT WHOLE WHEN", "EVALUATED DIFFERENTLY?"][s], 18, D.accent)}
    </Plate>
  );
}
