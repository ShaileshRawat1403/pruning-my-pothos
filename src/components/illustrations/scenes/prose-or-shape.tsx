import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Prose or shape. Left: a letter that says, in its own words this time,
 * that the total is a hundred pounds; a parser squints at it. Right: a form
 * with three boxes (invoice_id, amount, currency) dropped into a shape
 * sorter: it fits, or it bounces. Last: the bounce is the point.
 */
const SAYS = ["'the total is a hundred, ish.'", "fits the slot, or doesn't.", "now something can say no."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* Prose. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={40} y={80} width={240} height={150} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(56, 112, "Hi! The total", 18, D.ink, "start")}
        {mono(56, 138, "comes to about", 18, D.ink, "start")}
        {mono(56, 164, "a hundred quid", 18, D.ink, "start")}
        {mono(56, 190, "this time :)", 18, D.ink, "start")}
        <Torso x={160} y={300} w={60} h={72} fill={D.grey} />
        <Head x={160} y={272} r={24} eyes="tt" look={-1} mouth="flat" stubble hair="sides" />
        {mono(240, 296, "PARSER", 18, D.greyLight)}
      </Lit>

      {/* Shape. */}
      <Lit on={s !== 0} off={0.4}>
        {["invoice_id", "amount", "currency"].map((f, i) => (
          <g key={f}>
            {mono(356, 106 + i * 40, f, 18, D.ink, "start")}
            <rect x={490} y={86 + i * 40} width={100} height={28} fill="#F6F1E4" stroke={D.ink} strokeWidth={2.5} />
          </g>
        ))}
        {mono(540, 146, "100", 18, D.teal)}
        <rect x={380} y={240} width={180} height={60} rx={6} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <rect x={420} y={256} width={40} height={28} fill={D.ink} />
        <path d="M480 270 a 14 14 0 1 0 0.1 0" fill={D.ink} />
        <Show on={s === 2}>
          <rect x={500} y={190} width={110} height={34} rx={4} fill="#fff" stroke={D.accent} strokeWidth={3} transform="rotate(12 555 207)" />
          {mono(555, 213, "REJECTED", 18, D.accent)}
        </Show>
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : 470, i === 0 ? 60 : i === 1 ? 60 : 340, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ASK IN PROSE", "ASK FOR A SHAPE", "CODE CAN REJECT IT"][s], 18, D.accent)}
    </Plate>
  );
}
