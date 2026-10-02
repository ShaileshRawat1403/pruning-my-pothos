import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Close and outdated. Two policies on the shelf, side by side, nearly
 * identical: the one replaced last month, and its replacement. The retriever
 * reaches for the old one, because it is just as close. Last, the answer
 * comes back, confident and out of date.
 */
const SAYS = ["the old one.", "the new one.", "close enough, apparently."];

function Policy({ x, label, stamp, color }: { x: number; label: string; stamp: string; color: string }) {
  return (
    <g>
      <rect x={x} y={100} width={150} height={190} fill="#fff" stroke={D.ink} strokeWidth={4} />
      {mono(x + 75, 130, "POLICY", 20)}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${x + 18} ${152 + i * 22} H${x + 132 - (i % 2) * 20}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      ))}
      <g transform={`rotate(-8 ${x + 75} 270)`}>
        <rect x={x + 26} y={256} width={98} height={30} fill="#fff" stroke={color} strokeWidth={3.5} />
        {mono(x + 75, 278, stamp, 18, color)}
      </g>
      {mono(x + 75, 318, label, 18, D.greyLight)}
    </g>
  );
}

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      <Lit on={s !== 1} off={0.45}>
        <Policy x={60} label="REPLACED" stamp="OLD" color={D.accent} />
      </Lit>
      <Lit on={s === 1} off={0.45}>
        <Policy x={240} label="CURRENT" stamp="NEW" color={D.leaf} />
      </Lit>
      {mono(225, 80, "≈", 30, D.greyLight)}

      {/* The retriever's hand goes to the old one. */}
      <Show on={s === 2}>
        <Limb d="M520 250 C 420 240, 280 220, 200 210" fill={D.teal} w={13} />
      </Show>
      <Torso x={540} y={240} w={80} h={132} fill={D.teal} />
      <Head x={540} y={196} r={34} eyes="sleepy" look={-1} mouth="flat" hair="curly" />
      <rect x={490} y={140} width={100} height={28} rx={3} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
      {mono(540, 161, "SEARCH", 18)}

      <Show on={s === 2}>
        <rect x={396} y={56} width={224} height={60} rx={8} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(508, 82, "ANSWER, PER POLICY", 18)}
        {mono(508, 106, "(CONFIDENT)", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i && i !== 2}>
          {hand(i === 0 ? 135 : 315, 60, t, 28, D.greyLight)}
        </Show>
      ))}
      <Show on={s === 2}>{hand(200, 360, SAYS[2], 26, D.accent)}</Show>
      {mono(320, 404, ["LAST MONTH'S", "THIS MONTH'S", "CLOSE, AND OUT OF DATE"][s], 18, D.accent)}
    </Plate>
  );
}
