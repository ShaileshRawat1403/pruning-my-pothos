import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Which seam. Two columns of sticky notes facing each other across a gap:
 * what the part on the left only established, and what the part on the right
 * took as settled. Arrows cross the gap. Last, a magnifier on the gap itself:
 * each mismatch points at its own mechanism.
 */
const PAIRS = [
  ["RETRIEVED", "CURRENT"],
  ["SHAPE", "MEANING"],
  ["RESPONSE", "EFFECT"],
  ["PRESENT", "STILL TRUE"],
  ["ASKED", "ABLE TO JUDGE"],
];
const SAYS = ["what it actually did.", "what the next part heard.", "inspect the gap."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {PAIRS.map(([l, r], i) => {
        const y = 80 + i * 56;
        return (
          <g key={l}>
            <Lit on={s !== 1} off={0.4}>
              <rect x={60} y={y - 22} width={170} height={40} fill="#fff" stroke={D.ink} strokeWidth={3} />
              {mono(145, y + 5, l, 18)}
            </Lit>
            <Lit on={s !== 0} off={0.3}>
              <rect x={410} y={y - 22} width={170} height={40} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
              {mono(495, y + 5, r, 18, D.accent)}
            </Lit>
            <path d={`M234 ${y} H404`} stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 6" />
            <path d={`M396 ${y - 6} L406 ${y} L396 ${y + 6}`} fill="none" stroke={D.greyLight} strokeWidth={3} />
          </g>
        );
      })}
      {mono(145, 50, "ESTABLISHED", 18, D.teal)}
      {mono(495, 50, "ASSUMED", 18, D.accent)}

      <Show on={s === 2}>
        <circle cx={320} cy={192} r={48} fill="#fff" fillOpacity={0.25} stroke={D.ink} strokeWidth={5} />
        <path d="M354 226 L384 256" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
      </Show>

      <Torso x={320} y={330} w={50} h={42} fill={D.grey} />
      <Head x={320} y={310} r={20} eyes={s === 2 ? "tt" : "sleepy"} look={s === 0 ? -1 : 1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 145 : i === 1 ? 495 : 470, i === 2 ? 340 : 360, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ONLY ESTABLISHED", "ASSUMED DOWNSTREAM", "EACH GAP HAS ITS OWN PAGE"][s], 18, D.accent)}
    </Plate>
  );
}
