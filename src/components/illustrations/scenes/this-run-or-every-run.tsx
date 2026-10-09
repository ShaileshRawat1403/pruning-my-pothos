import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * This run, or every run. A takeaway order (the prompt): a paper bag packed
 * for one customer, with the instruction, the context, an example and the
 * question inside. Then the sign over the counter (the system prompt): the
 * same for every customer, whatever they order. Last, both on the counter:
 * one bag per run, one sign for all of them.
 */
const SAYS = ["packed for this order.", "true for every order.", "two different things."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <rect x={30} y={270} width={580} height={18} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />

      {/* The sign over the counter. */}
      <Lit on={s !== 0} off={0.35}>
        <rect x={150} y={40} width={340} height={70} rx={4} fill={D.ink} />
        {mono(320, 70, "THIS SHOP: POLITE, METRIC,", 18, "#fff")}
        {mono(320, 96, "NO MADE-UP DISHES", 18, "#fff")}
        <path d="M200 110 V130 M440 110 V130" stroke={D.ink} strokeWidth={4} />
        {mono(320, 150, "SYSTEM PROMPT", 18, D.teal)}
      </Lit>

      {/* The bag: one run. */}
      <Lit on={s !== 1} off={0.35}>
        <path d="M110 270 L120 170 H240 L250 270 Z" fill="#C9B593" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M150 170 Q 180 140 210 170" fill="none" stroke={D.ink} strokeWidth={4} />
        {["ASK", "CONTEXT", "EXAMPLE"].map((t, i) => (
          <g key={t}>
            <rect x={128 + i * 38} y={150 - i * 6} width={36} height={30} fill="#fff" stroke={D.ink} strokeWidth={2} transform={`rotate(${(i - 1) * 8} ${146 + i * 38} 165)`} />
          </g>
        ))}
        {mono(180, 232, "ORDER #7", 18)}
        {mono(180, 316, "PROMPT", 18, D.teal)}
      </Lit>

      <Torso x={520} y={210} w={84} h={60} fill={D.grey} />
      <Head x={520} y={174} r={30} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 180 : 420, i === 0 ? 354 : 210, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["THE INPUT FOR A SINGLE RUN", "CONDITIONS FOR EVERY RUN", "PROMPT / SYSTEM PROMPT"][s], 18, D.accent)}
    </Plate>
  );
}
