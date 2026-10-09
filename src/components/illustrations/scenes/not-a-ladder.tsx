import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Not a ladder. Someone climbs a ladder whose rungs read PROMPT, SKILL,
 * WORKFLOW, AGENT, aiming for the top. Then the same words as parts laid out
 * on one workbench, all in use at once: no rung higher than another. Last,
 * the climber at the top with agent freedom, and a fixed sequence on the
 * bench that would simply have worked.
 */
const RUNGS = ["AGENT", "WORKFLOW", "SKILL", "PROMPT"];
const PARTS = [
  { x: 360, y: 140, t: "SYSTEM PROMPT" },
  { x: 530, y: 140, t: "3 SKILLS" },
  { x: 360, y: 230, t: "A WORKFLOW" },
  { x: 530, y: 230, t: "1 MODEL PICK" },
];
const SAYS = ["almost at agent.", "all of them. at once.", "the fixed sequence just worked."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The ladder. */}
      <Lit on={s !== 1} off={0.35}>
        <path d="M80 372 L110 60 M200 372 L170 60" stroke={D.ink} strokeWidth={6} strokeLinecap="round" />
        {RUNGS.map((r, i) => (
          <g key={r}>
            <path d={`M${95 + i * 4} ${100 + i * 70} H${185 - i * 4}`} stroke={D.ink} strokeWidth={5} />
            <rect x={98 + i * 3} y={82 + i * 70} width={84 - i * 6 + 6} height={22} fill="#fff" stroke={D.ink} strokeWidth={2} />
            {mono(140, 99 + i * 70, r, 18, i === 0 ? D.accent : D.ink)}
          </g>
        ))}
        <Torso x={210} y={150} w={44} h={60} fill={D.grey} />
        <Head x={210} y={130} r={18} eyes="saucer" look={-1} mouth="smirk" stubble hair="sides" />
      </Lit>

      {/* One bench, all parts in use. */}
      <Lit on={s !== 0} off={0.35}>
        <rect x={270} y={290} width={350} height={16} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {PARTS.map((p, i) => (
          <g key={p.t}>
            <rect x={p.x - 80} y={p.y - 30} width={160} height={56} rx={6} fill={i === 2 && s === 2 ? "#DDEFE6" : "#fff"} stroke={i === 2 && s === 2 ? D.leaf : D.ink} strokeWidth={3} />
            {mono(p.x, p.y + 4, p.t, 18, i === 2 && s === 2 ? D.leaf : D.ink)}
          </g>
        ))}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 260 : 445, i === 0 ? 70 : 70, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["READ AS A LADDER", "ONE SYSTEM, SEVERAL PARTS", "NOT STAGES"][s], 18, D.accent)}
    </Plate>
  );
}
