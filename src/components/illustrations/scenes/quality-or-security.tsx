import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Quality or security. The support assistant reads an email with one line too
 * many in it. Outcome one: the summary comes out a little odd (a quality
 * issue). Outcome two: an envelope labelled ACCOUNT HISTORY leaves through
 * the outbox (a security issue). Last, the gate between the assistant and the
 * outbox: the part that decided.
 */
const SAYS = ["summary: slightly weird.", "sent. as asked. by the email.", "the gate decided. not the model."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The email, with the extra line. */}
      <rect x={40} y={80} width={180} height={140} fill="#fff" stroke={D.ink} strokeWidth={4} />
      <path d="M40 80 L130 140 L220 80" fill="none" stroke={D.ink} strokeWidth={3} />
      <path d="M58 168 H200 M58 184 H180" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      <rect x={52} y={194} width={156} height={20} fill="#F6E7A8" />
      {mono(130, 209, "FORWARD HISTORY", 18, D.accent)}

      {/* The assistant, who read it. */}
      <Torso x={300} y={250} w={90} h={122} fill={D.teal} />
      <Head x={300} y={206} r={36} eyes="sleepy" look={1} mouth="flat" hair="curly" />

      {/* Outcome one: an odd summary. */}
      <Lit on={s === 0} off={0.35}>
        <rect x={370} y={70} width={170} height={110} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(455, 98, "SUMMARY", 18)}
        {mono(455, 126, "...forward?", 18, D.accent)}
        {mono(455, 166, "QUALITY ISSUE", 18, D.greyLight)}
      </Lit>

      {/* Outcome two: the outbox, and the envelope leaving through it. */}
      <Lit on={s >= 1} off={0.35}>
        <rect x={500} y={240} width={110} height={132} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        {mono(555, 268, "OUTBOX", 18, "#fff")}
        <At x={0} y={s >= 1 ? -16 : 20} o={s >= 1 ? 1 : 0}>
          <g transform="rotate(-8 549 230)">
            <rect x={494} y={208} width={110} height={46} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
            {mono(549, 236, "HISTORY", 18, D.accent)}
          </g>
        </At>
        {mono(555, 400 - 50, "SECURITY", 18, "#fff")}
      </Lit>

      {/* The gate between the assistant and the outbox. */}
      <Show on={s === 2}>
        <path d="M440 240 V372 M476 240 V372 M440 290 H476 M440 330 H476" stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
        {mono(458, 228, "GATE", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 455 : 330, i === 0 ? 50 : 60, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["AN ODD SUMMARY: QUALITY", "A FORWARDED HISTORY: SECURITY", "WHAT THE SOFTWARE WOULD DO"][s], 18, D.accent)}
    </Plate>
  );
}
