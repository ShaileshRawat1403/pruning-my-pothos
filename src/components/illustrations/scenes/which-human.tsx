import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Which human. Three people: one is available (holding a coffee, free), one
 * owns the decision, one is passing. The pointer goes to the owner, not the
 * free one; then the owner gets the authority (a stamp); then the knowledge
 * (the actual document, open).
 */
const SAYS = ["whose call is it?", "can they actually decide?", "can they read it?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  const people = [
    { x: 120, fill: D.grey, hair: "messy" as const, label: "AVAILABLE" },
    { x: 320, fill: D.teal, hair: "curly" as const, label: "OWNER" },
    { x: 520, fill: D.grey, hair: "sides" as const, label: "PASSING BY" },
  ];
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {people.map((p, i) => (
        <Lit key={p.label} on={i === 1} off={0.4}>
          <Torso x={p.x} y={236} w={96} h={136} fill={p.fill} />
          <Head x={p.x} y={188} r={40} eyes={i === 1 ? "sleepy" : "closed"} look={0} mouth="flat" hair={p.hair} stubble={i !== 1} />
          {mono(p.x, 400 - 36, p.label, 18, i === 1 ? D.teal : D.greyLight)}
        </Lit>
      ))}
      {/* The free one has a coffee and nothing else. */}
      <path d="M152 292 h22 l-3 26 q-8 6 -16 0 Z" fill="#fff" stroke={D.ink} strokeWidth={3} opacity={0.5} />

      {/* The pointer: to the owner, not to whoever is free. */}
      <At x={0} y={s === 0 ? 0 : -10}>
        <path d="M320 70 V122" stroke={D.accent} strokeWidth={5} strokeLinecap="round" />
        <path d="M306 108 L320 126 L334 108" fill="none" stroke={D.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </At>

      {/* The standing to decide. */}
      <Show on={s >= 1}>
        <Lit on={s === 1} off={0.6}>
          <g transform="rotate(-10 400 150)">
            <rect x={356} y={130} width={96} height={32} fill="#fff" stroke={D.accent} strokeWidth={3} />
            {mono(404, 153, "CAN SAY", 18, D.accent)}
          </g>
          <path d="M392 166 v24 h24 v-24 Z" fill={D.accent} stroke={D.ink} strokeWidth={2.5} />
        </Lit>
      </Show>

      {/* The knowledge: the actual thing, open in front of them. */}
      <Show on={s >= 2}>
        <rect x={276} y={262} width={88} height={64} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <path d="M320 262 V326 M286 280 H312 M286 294 H310 M328 280 H354 M328 294 H350" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 52, t, 28, D.accent)}
        </Show>
      ))}
      {mono(320, 404, ["OWNS THE DECISION", "HAS THE STANDING", "HAS THE KNOWLEDGE"][s], 18, D.accent)}
    </Plate>
  );
}
