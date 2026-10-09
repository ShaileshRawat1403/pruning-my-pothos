import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The prompt that grew. One sticky note on a fridge: three lines. It works,
 * so it stays. Months later the fridge door is buried under notes in four
 * handwritings, layered, nothing ever taken down, and the original note is
 * somewhere underneath.
 */
const SAYS = ["three lines. lovely.", "it works. leave it.", "who read all of this? nobody."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  const notes = Array.from({ length: 16 }, (_, i) => ({
    x: 210 + (i % 4) * 56 + ((i * 13) % 11),
    y: 80 + Math.floor(i / 4) * 64 + ((i * 7) % 9),
    r: ((i * 17) % 13) - 6,
    c: ["#F6E7A8", "#DDEFE6", "#F1D9CC", "#fff"][i % 4],
  }));
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The fridge. */}
      <rect x={190} y={50} width={260} height={322} rx={12} fill="#fff" stroke={D.ink} strokeWidth={5} />
      <path d="M190 140 H450 M430 70 V120 M430 160 V230" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />

      {/* The first note. */}
      <Lit on={s !== 2} off={0.4}>
        <g transform="rotate(-3 300 200)">
          <rect x={240} y={160} width={130} height={100} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
          {mono(305, 188, "ROLE", 18, D.ink)}
          {mono(305, 214, "TONE", 18, D.ink)}
          {mono(305, 240, "NO INVENTING", 18, D.ink)}
        </g>
      </Lit>

      {/* Months later. */}
      <Show on={s === 2}>
        {notes.map((n, i) => (
          <g key={i} transform={`rotate(${n.r} ${n.x + 30} ${n.y + 28})`}>
            <rect x={n.x} y={n.y} width={60} height={56} fill={n.c} stroke={D.ink} strokeWidth={2} />
            <path d={`M${n.x + 8} ${n.y + 18} H${n.x + 50} M${n.x + 8} ${n.y + 32} H${n.x + 44}`} stroke={D.greyLight} strokeWidth={2.5} strokeLinecap="round" />
          </g>
        ))}
        {mono(560, 200, "+4 AUTHORS", 18, D.accent)}
        {mono(560, 226, "-0 REMOVED", 18, D.accent)}
      </Show>

      <Torso x={90} y={290} w={70} h={82} fill={D.grey} />
      <Head x={90} y={258} r={28} eyes={s === 2 ? "tt" : "sleepy"} look={1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(540, i === 2 ? 290 : 120, t, i === 2 ? 20 : 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["IT STARTS SMALL", "IT WORKS, SO IT STAYS", "MONTHS LATER"][s], 18, D.accent)}
    </Plate>
  );
}
