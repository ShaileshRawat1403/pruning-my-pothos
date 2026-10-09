import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A minimum record. One index card per governed step, its fields filled in
 * plainly. Beside it, a separate locked drawer for prompt text and model
 * output, with its own retention tag: kept on purpose, or not at all. Last,
 * the card alone answering the three questions.
 */
const FIELDS = ["run_id / step_id / parent", "policy: allow · v7", "tool + scoped params", "verified · artifact id", "1.2s · retries 0", "reason: NONE"];
const SAYS = ["one card per step.", "the sensitive stuff: own drawer.", "the card answers the questions."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The card. */}
      <Lit on={s !== 1} off={0.45}>
        <rect x={50} y={70} width={320} height={280} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M50 108 H370" stroke={D.accent} strokeWidth={3} />
        {mono(210, 96, "STEP RECORD", 18, D.accent)}
        {FIELDS.map((f, i) => (
          <g key={f}>
            {mono(66, 140 + i * 36, f, 18, D.ink, "start")}
            <path d={`M66 ${150 + i * 36} H354`} stroke={D.greyLight} strokeWidth={1.5} />
          </g>
        ))}
      </Lit>

      {/* The separate drawer. */}
      <Lit on={s === 1} off={0.35}>
        <rect x={420} y={150} width={180} height={200} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
        <rect x={436} y={170} width={148} height={70} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
        {mono(510, 200, "PROMPT", 18)}
        {mono(510, 224, "OUTPUT", 18)}
        <rect x={496} y={250} width={28} height={30} rx={4} fill={D.grey} stroke={D.ink} strokeWidth={3} />
        <path d="M502 250 V240 A 8 8 0 0 1 518 240 V250" fill="none" stroke={D.ink} strokeWidth={3} />
        <g transform="rotate(6 510 320)">
          <rect x={434} y={300} width={152} height={34} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
          {mono(510, 323, "OWN RETENTION", 18, D.accent)}
        </g>
      </Lit>

      <Show on={s === 2}>
        {["DECIDED?", "EVIDENCE?", "CHANGED?"].map((q, i) => (
          <g key={q}>
            <rect x={420} y={70 + i * 40} width={130} height={32} rx={16} fill="#DDEFE6" stroke={D.leaf} strokeWidth={3} />
            {mono(485, 92 + i * 40, q, 18, D.leaf)}
          </g>
        ))}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 510 : 210, i === 1 ? 110 : 52, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["EVERY GOVERNED STEP", "A SEPARATE DECISION", "THE THREE QUESTIONS, FROM THE CARD"][s], 18, D.accent)}
    </Plate>
  );
}
