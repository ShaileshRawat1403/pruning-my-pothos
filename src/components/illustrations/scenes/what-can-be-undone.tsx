import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What can be undone. A large, confident UNDO key. Then the things already
 * out of the building: a sent envelope, a paid coin, a deleted file, a
 * printout someone already acted on. The key is pressed; nothing comes back.
 * Last, four honest options, each a different cost: stop, reverse, correct,
 * contain.
 */
const GONE = [
  { x: 330, y: 110, t: "SENT" },
  { x: 440, y: 160, t: "PAID" },
  { x: 540, y: 110, t: "DELETED" },
  { x: 470, y: 260, t: "ACTED ON" },
];
const SAYS = ["one button.", "pressed. still gone.", "pick your cost."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The undo key, and the finger on it. */}
      <Lit on={s !== 2} off={0.4}>
        <rect x={70} y={200} width={170} height={110} rx={14} fill="#fff" stroke={D.ink} strokeWidth={5} />
        <rect x={82} y={196 + (s === 1 ? 10 : 0)} width={146} height={92} rx={10} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} style={{ transition: "y .15s" }} />
        {mono(155, 252 + (s === 1 ? 10 : 0), "UNDO", 26)}
        <Torso x={140} y={120} w={70} h={64} fill={D.grey} />
        <Head x={140} y={96} r={26} eyes="sleepy" look={1} mouth="flat" stubble hair="messy" />
        <Limb d={`M168 150 C 180 168, 170 ${180 + (s === 1 ? 10 : 0)}, 160 ${196 + (s === 1 ? 10 : 0)}`} fill={D.grey} w={12} />
      </Lit>

      {/* Already out of the building. */}
      {GONE.map((g, i) => (
        <Show key={g.t} on={s >= 1}>
          <At x={s >= 1 ? 0 : -60} o={s === 2 ? 0.35 : 1} delay={s === 1 ? i * 0.1 : 0}>
            <rect x={g.x - 50} y={g.y - 30} width={100} height={52} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} transform={`rotate(${(i % 2 ? 6 : -6)} ${g.x} ${g.y})`} />
            {mono(g.x, g.y + 2, g.t, 18, D.accent)}
            <path d={`M${g.x - 60} ${g.y + 30} l -18 8 M${g.x - 60} ${g.y + 18} l -24 2`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
          </At>
        </Show>
      ))}

      {/* Four honest options. */}
      <Show on={s === 2}>
        {["STOP", "REVERSE", "CORRECT", "CONTAIN"].map((o, i) => (
          <g key={o}>
            <rect x={60 + i * 136} y={326} width={120} height={36} rx={4} fill={i === 3 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3} />
            {mono(120 + i * 136, 350, o, 18, i === 3 ? D.accent : D.ink)}
          </g>
        ))}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 155 : 440, i === 0 ? 50 : 50, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT A ROLLBACK ASSUMES", "EFFECTS THAT CANNOT BE REVERSED", "FOUR ANSWERS, FOUR COSTS"][s], 18, D.accent)}
    </Plate>
  );
}
