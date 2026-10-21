import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The pilot or production. Left: a tidy desk, three chosen files, one clean
 * system. Right: the real inbox spilling over, a stack of mismatched
 * systems, a sticky note, and Priya, who knows the override. The robot does
 * well on the left; on the last beat it is standing on the right, looking up.
 */
const SAYS = ["three files someone chose.", "the real inbox. and Priya.", "pilots stall over here."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M300 110 V352" stroke={D.greyLight} strokeWidth={3} strokeDasharray="8 8" />

      {/* The pilot: a tidy desk. */}
      <Lit on={s === 0} off={0.35}>
        {mono(150, 108, "THE PILOT", 18, s === 0 ? D.accent : D.ink)}
        <path d="M40 290 H240 M56 290 V352 M224 290 V352" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={60 + i * 8} y={266 - i * 8} width={56} height={24} fill="#fff" stroke={D.ink} strokeWidth={3} />
        ))}
        {mono(92, 236, "CHOSEN", 18, D.grey)}
        <rect x={170} y={210} width={50} height={80} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <circle cx={195} cy={234} r={5} fill={D.leaf} />
      </Lit>

      {/* Production: the inbox, the stack, the sticky note, Priya. */}
      <Lit on={s !== 0} off={0.35}>
        {mono(470, 108, "PRODUCTION", 18, s === 1 ? D.accent : D.ink)}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={326 + (i % 2) * 10} y={300 - i * 14} width={70} height={18} fill="#fff" stroke={D.ink} strokeWidth={2.5} transform={`rotate(${(i % 3) - 1} 360 ${310 - i * 14})`} />
        ))}
        {mono(362, 330, "INBOX", 18, D.grey)}
        {[
          { y: 300, w: 120, t: "ERP" },
          { y: 254, w: 104, t: "CRM" },
          { y: 208, w: 124, t: "SHEET" },
          { y: 162, w: 96, t: "???" },
        ].map((b, i) => (
          <g key={b.t}>
            <rect x={470 - b.w / 2 + (i % 2) * 8} y={b.y} width={b.w} height={46} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
            {mono(470 + (i % 2) * 8, b.y + 30, b.t, 18, D.grey)}
          </g>
        ))}
        <rect x={512} y={196} width={62} height={44} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} transform="rotate(8 543 218)" />
        {mono(543, 224, "$10K?", 18, D.ink)}
        <Torso x={588} y={330} w={36} h={26} fill={D.teal} />
        <Head x={588} y={308} r={16} eyes="sleepy" look={-1} mouth="flat" hair="sides" />
      </Lit>

      {/* The robot: on the desk, then in front of the stack. */}
      <At x={s === 2 ? 170 : 0} y={s === 2 ? 62 : -6}>
        <g style={{ opacity: s === 1 ? 0.35 : 1, transition: "opacity .35s" }}>
          <rect x={120} y={244} width={36} height={30} rx={6} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          <circle cx={132} cy={258} r={3.5} fill={D.ink} />
          <circle cx={144} cy={258} r={3.5} fill={D.ink} />
          <path d="M126 274 V290 M150 274 V290" stroke={D.ink} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      </At>
      <Show on={s === 2}>
        {hand(312, 290, "?", 34, D.accent)}
      </Show>

      {hand(320, 56, SAYS[s], 26, s === 2 ? D.accent : D.grey)}
      {mono(320, 404, ["TESTED ON THE TASK", "THE TASK INSIDE THE ORGANISATION", "WHERE PILOTS STALL"][s], 18, D.accent)}
    </Plate>
  );
}
