import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What isolation bounds. A crate with four fences on it: the folders it can
 * reach, the one network cable, the keys inside, a kitchen timer. Inside, a
 * worker tidily shreds a file: permitted, and contained, and still a
 * deletion. Last, the question no fence answers: should it have happened?
 */
const LIMITS = [
  { x: 120, y: 92, t: "FILES: 1 DIR" },
  { x: 330, y: 92, t: "NET: 1 HOST" },
  { x: 120, y: 330, t: "KEYS: NONE" },
  { x: 330, y: 330, t: "TIME: 30s" },
];
const SAYS = ["fenced on every side.", "shredding. inside the fence.", "should it, though?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The crate. */}
      <Lit on={s === 0} off={0.6}>
        <rect x={50} y={110} width={360} height={200} fill="#C9B593" fillOpacity={0.35} stroke={D.ink} strokeWidth={5} />
        <path d="M50 110 L410 310 M410 110 L50 310" stroke={D.ink} strokeWidth={2} opacity={0.2} />
        {LIMITS.map((l) => (
          <g key={l.t}>
            <rect x={l.x - 78} y={l.y - 18} width={156} height={32} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3} />
            {mono(l.x, l.y + 4, l.t, 18)}
          </g>
        ))}
      </Lit>

      {/* Inside: a permitted action, contained. */}
      <Lit on={s >= 1} off={0.35}>
        <Torso x={170} y={226} w={60} h={84} fill={D.teal} />
        <Head x={170} y={200} r={24} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <Limb d="M196 240 C 216 238, 232 232, 244 222" fill={D.teal} w={10} />
        <rect x={244} y={210} width={70} height={50} fill={D.grey} stroke={D.ink} strokeWidth={3} />
        <path d="M252 260 V290 M266 260 V296 M280 260 V288 M294 260 V294 M306 260 V286" stroke={D.ink} strokeWidth={3} />
        <rect x={258} y={180} width={42} height={32} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
      </Lit>

      {/* The question no fence answers. */}
      <Show on={s === 2}>
        <rect x={430} y={150} width={190} height={110} rx={6} fill="#fff" stroke={D.accent} strokeWidth={3.5} strokeDasharray="8 6" />
        {mono(525, 190, "SHOULD IT", 18, D.accent)}
        {mono(525, 216, "HAPPEN?", 18, D.accent)}
        {mono(525, 244, "(not a fence)", 18, D.greyLight)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 2 ? 525 : 230, i === 2 ? 120 : 60, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT ISOLATION CAN LIMIT", "A DELETION INSIDE IS STILL A DELETION", "PERMITTING IS A DIFFERENT JOB"][s], 18, D.accent)}
    </Plate>
  );
}
