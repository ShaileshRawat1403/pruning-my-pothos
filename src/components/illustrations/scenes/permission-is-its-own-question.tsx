import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Permission is its own question. A door marked REFUNDS, a guard with a
 * clipboard of three plain rules. Then the request arrives holding everything
 * that is not permission: an ID (authentication), a neat FORM (schema),
 * 99% SURE (model confidence), OK'D (someone's approval). The guard reads
 * the clipboard. Last, the sign over the door: the one question.
 */
const RULES = ["CALLER: OK", "SCOPE: OWN", "UNDER LIMIT"];
const OFFERS = [
  { y: 166, t: "ID" },
  { y: 208, t: "FORM" },
  { y: 250, t: "99% SURE" },
  { y: 292, t: "OK'D" },
];
const SAYS = ["the actual rules.", "very impressive. irrelevant.", "may this happen?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The door. */}
      <rect x={420} y={96} width={150} height={276} fill="#C9B593" stroke={D.ink} strokeWidth={5} />
      <circle cx={548} cy={240} r={6} fill={D.ink} />
      {mono(495, 130, "REFUNDS", 20)}
      <Lit on={s === 2} off={0.25}>
        <rect x={380} y={36} width={230} height={40} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(495, 62, "PERMITTED, HERE, NOW?", 18, D.accent)}
      </Lit>

      {/* The guard, and the clipboard of rules. */}
      <Torso x={350} y={236} w={80} h={136} fill={D.grey} />
      <Head x={350} y={194} r={34} eyes={s === 1 ? "closed" : "sleepy"} look={1} mouth="flat" stubble hair="sides" />
      <Lit on={s === 0} off={0.5}>
        <rect x={196} y={40} width={154} height={96} fill="#fff" stroke={D.ink} strokeWidth={3.5} transform="rotate(-4 273 88)" />
        {RULES.map((r, i) => mono(210, 70 + i * 26, r, 18, D.ink, "start"))}
      </Lit>

      {/* The request, holding everything that is not permission. */}
      <Torso x={90} y={236} w={84} h={136} fill={D.teal} />
      <Head x={90} y={192} r={34} eyes="saucer" look={1} mouth="smirk" hair="curly" />
      <Limb d="M132 270 C 150 262, 160 252, 168 240" fill={D.teal} w={13} />
      {OFFERS.map((o, i) => (
        <At key={o.t} x={s >= 1 ? 0 : -40} o={s >= 1 ? 1 : 0} delay={s === 1 ? i * 0.1 : 0}>
          <Lit on={s === 1} off={0.45}>
            <rect x={150} y={o.y - 20} width={96} height={34} rx={4} fill={i % 2 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3} />
            {mono(198, o.y + 3, o.t, 18, D.ink)}
          </Lit>
        </At>
      ))}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i && i !== 2}>
          {hand(i === 0 ? 120 : 210, i === 0 ? 70 : 128, t, 24, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["PERMISSION", "ROUTINELY CONFUSED WITH IT", "A RULE IN THE AUTHORIZATION LAYER IS A CHECK"][s], 18, D.accent)}
    </Plate>
  );
}
