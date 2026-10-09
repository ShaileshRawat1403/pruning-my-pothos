import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Size or category. A bouncer at the gate who only checks the size of the
 * parcel: a huge stylesheet box gets stopped; a tiny parcel marked AUTH and
 * a tiny parcel marked WEBHOOK stroll through. Then the gate re-signed by
 * what each touches, with lanes for AUTH, BILLING, MIGRATION, EXTERNAL API.
 * Last, the tiny webhook parcel, stopped in its lane.
 */
const LANES = ["AUTH", "BILLING", "MIGRATION", "EXTERNAL API"];
const SAYS = ["big? stop. small? fine.", "what does it touch?", "small, passing, and a security defect."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Gate by size. */}
      <Lit on={s === 0} off={0.3}>
        <rect x={40} y={110} width={150} height={150} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        {mono(115, 190, "CSS: 300 LINES", 18)}
        {mono(115, 290, "STOPPED", 18, D.accent)}
        <rect x={230} y={220} width={60} height={40} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(260, 246, "AUTH", 18)}
        <rect x={230} y={170} width={60} height={40} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(260, 196, "HOOK", 18)}
        {mono(260, 290, "WAVED IN", 18, D.leaf)}
      </Lit>

      {/* Gate by what it touches. */}
      <Lit on={s >= 1} off={0.3}>
        {LANES.map((l, i) => (
          <g key={l}>
            <rect x={340} y={70 + i * 66} width={270} height={52} rx={4} fill={i === 1 && s === 2 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3} />
            {mono(360, 102 + i * 66, l, 18, D.ink, "start")}
            <path d={`M560 ${78 + i * 66} V${114 + i * 66}`} stroke={D.accent} strokeWidth={5} />
          </g>
        ))}
        <Show on={s === 2}>
          <rect x={480} y={146} width={60} height={40} fill="#fff" stroke={D.accent} strokeWidth={3} />
          {mono(510, 172, "HOOK", 18, D.accent)}
        </Show>
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : 475, i === 2 ? 352 : 50, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["GATE BY DIFF SIZE", "GATE BY WHAT IT TOUCHES", "SIZE WOULD NOT HAVE CAUGHT IT"][s], 18, D.accent)}
    </Plate>
  );
}
