import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The label is a view. A phone shows SLOT 2: AVAILABLE. Behind it, the
 * booking book. Someone else writes their name in slot 2. The phone keeps
 * saying AVAILABLE, cheerfully. Last, at the moment of the click, someone
 * checks the book instead of the phone.
 */
const SAYS = ["fetched at 10:00.", "taken at 10:02. phone: unbothered.", "check the book, not the phone."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The phone: a view. */}
      <Lit on={s !== 2} off={0.45}>
        <rect x={80} y={70} width={170} height={290} rx={22} fill={D.ink} />
        <rect x={94} y={100} width={142} height={226} rx={6} fill="#fff" />
        {mono(165, 140, "SLOT 2", 20)}
        <rect x={104} y={160} width={122} height={36} rx={18} fill="#DDEFE6" stroke={D.leaf} strokeWidth={3} />
        {mono(165, 184, "AVAILABLE", 18, D.leaf)}
        <rect x={114} y={250} width={102} height={40} rx={8} fill={D.leaf} stroke={D.ink} strokeWidth={3} />
        {mono(165, 276, "BOOK", 18, "#fff")}
      </Lit>

      {/* The book: where the record is. */}
      <Lit on={s >= 1} off={0.4}>
        <path d="M330 110 L440 124 L550 110 V300 L440 314 L330 300 Z" fill="#fff" stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        <path d="M440 124 V314" stroke={D.ink} strokeWidth={3.5} />
        {["SLOT 1", "SLOT 2", "SLOT 3"].map((t, i) => (
          <g key={t}>
            {mono(346, 160 + i * 46, t, 18, D.ink, "start")}
            <path d={`M456 ${160 + i * 46} H534`} stroke={D.greyLight} strokeWidth={2.5} strokeDasharray="4 4" />
          </g>
        ))}
        <Show on={s >= 1}>{mono(495, 202, "Dana", 24, D.accent)}</Show>
      </Lit>
      <Show on={s === 1}>
        <Torso x={590} y={300} w={50} h={72} fill={D.grey} />
        <Head x={590} y={274} r={22} eyes="sleepy" look={-1} mouth="smirk" hair="messy" />
      </Show>

      <Show on={s === 2}>
        <circle cx={486} cy={200} r={44} fill="#fff" fillOpacity={0.25} stroke={D.ink} strokeWidth={5} />
        <path d="M518 232 L546 260" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 165 : 440, i === 0 ? 50 : 66, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A VALUE, RENDERED ONCE", "THE RECORD CHANGES", "RE-ESTABLISH IT AT THE DECISION"][s], 18, D.accent)}
    </Plate>
  );
}
