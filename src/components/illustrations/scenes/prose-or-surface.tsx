import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Prose or surface. Left: a chat bubble already running a workflow in plain
 * text (pick 1, 2 or 3). Right: the same choice laid out as cards you can
 * compare at a glance, one selected. Last: a question with one answer, and
 * the card someone built for it anyway.
 */
const SAYS = ["text already does this.", "this is the actual difference.", "a card. for 'ok'."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M300 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* Prose, carrying a selector. */}
      <Lit on={s === 0} off={0.4}>
        <path d="M40 80 H270 V250 H90 L64 276 V250 H40 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        {["1. TUE 10:00", "2. WED 14:30", "3. FRI 09:00"].map((t, i) => mono(60, 120 + i * 32, t, 18, D.ink, "start"))}
        {mono(60, 224, "reply 1, 2 or 3", 18, D.teal, "start")}
      </Lit>

      {/* A surface: comparable, constrained. */}
      <Lit on={s === 1} off={0.4}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={326 + i * 98} y={90} width={88} height={130} rx={6} fill={i === 1 ? "#DDEFE6" : "#fff"} stroke={i === 1 ? D.leaf : D.ink} strokeWidth={i === 1 ? 4.5 : 3.5} />
            {mono(370 + i * 98, 120, ["TUE", "WED", "FRI"][i], 18)}
            {mono(370 + i * 98, 150, ["10:00", "14:30", "09:00"][i], 18, D.grey)}
            <rect x={340 + i * 98} y={180} width={60} height={26} rx={13} fill={i === 1 ? D.leaf : D.paperDeep} stroke={D.ink} strokeWidth={2.5} />
          </g>
        ))}
        {mono(468, 250, "PICK ONE", 18, D.teal)}
      </Lit>

      {/* One answer, one unnecessary card. */}
      <Show on={s === 2}>
        <rect x={190} y={262} width={260} height={80} rx={8} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(320, 292, "CONTINUE?", 18)}
        <rect x={286} y={304} width={68} height={28} rx={14} fill={D.leaf} stroke={D.ink} strokeWidth={2.5} />
        {mono(320, 324, "OK", 18, "#fff")}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 155 : i === 1 ? 468 : 320, i === 2 ? 64 : 56, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["PROSE CARRIES WORKFLOWS", "A SURFACE LAYS OUT AND CONSTRAINS", "ONE ANSWER NEEDS NO CARD"][s], 18, D.accent)}
    </Plate>
  );
}
