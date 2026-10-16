import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Headquarters or forward. Two buildings on one street. Left: the product
 * company, a desk facing a screen of tickets. Right: one customer, with its
 * people and its server. The same person walks from the desk into the
 * customer's building; last beat, their badge still carries the vendor's mark.
 */
const SAYS = ["one product, a queue of tickets.", "one customer, until it works.", "same badge either way."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  const here = s === 0 ? 0 : 1;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Headquarters: the product company, a desk and a ticket screen. */}
      <Lit on={s !== 1} off={0.35}>
        <path d="M30 372 V140 H270 V372" fill="none" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        {mono(150, 128, "HEADQUARTERS", 18, D.greyLight)}
        <rect x={60} y={196} width={110} height={78} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M74 ${212 + i * 16} H${150 - (i % 2) * 20}`} stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
        ))}
        {mono(115, 296, "TICKETS", 18, D.ink)}
        <path d="M60 318 H210 M72 318 V372 M198 318 V372" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {/* The customer: their server and their people. */}
      <Lit on={s !== 0} off={0.35}>
        <path d="M350 372 V140 H610 V372" fill="none" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        {mono(480, 128, "ONE CUSTOMER", 18, D.greyLight)}
        <rect x={540} y={200} width={50} height={140} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={565} cy={226 + i * 40} r={5} fill={i === 1 ? D.leaf : D.greyLight} />
        ))}
        {[460, 500].map((x) => (
          <g key={x}>
            <Torso x={x} y={346} w={34} h={26} fill={D.grey} />
            <Head x={x} y={326} r={15} eyes="sleepy" look={-1} mouth="flat" />
          </g>
        ))}
      </Lit>

      {/* The same person, at the desk, then inside the customer. */}
      <At x={here ? 400 : 230} y={0}>
        <Torso x={0} y={340} w={44} h={32} fill={D.accent} />
        <Head x={0} y={316} r={20} eyes="sleepy" look={here ? 1 : -1} mouth="flat" hair="sides" />
        <Show on={s === 2}>
          <rect x={-12} y={330} width={24} height={16} rx={3} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
          <circle cx={0} cy={338} r={4} fill={D.accent} />
        </Show>
      </At>

      {/* The badge's mark, back at headquarters. */}
      <Show on={s === 2}>
        <circle cx={240} cy={170} r={14} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <circle cx={240} cy={170} r={6} fill={D.accent} />
        <path d="M254 176 C 320 200, 360 260, 392 324" fill="none" stroke={D.accent} strokeWidth={3} strokeDasharray="8 8" />
      </Show>

      {hand(320, 56, SAYS[s], 26, s === 2 ? D.accent : D.grey)}
      {mono(320, 404, ["AT HEADQUARTERS", "FORWARD DEPLOYED", "EMPLOYED BY THE PRODUCT COMPANY"][s], 18, D.accent)}
    </Plate>
  );
}
