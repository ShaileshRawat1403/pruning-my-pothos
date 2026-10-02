import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Adjacent is not evidence. A shelf of reassuring things: an eval binder, a
 * dashboard, a rollback document. Then, behind each, the question it does not
 * answer. Last, the honest move: the unanswered question, written down.
 */
const ITEMS = [
  { x: 120, label: "EVAL SET", q: "NOBODY THOUGHT OF?" },
  { x: 320, label: "DASHBOARD", q: "ANYONE NOTICE?" },
  { x: 520, label: "ROLLBACK", q: "THIS CHANGE?" },
];
const SAYS = ["looks covered.", "...", ""];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <rect x={40} y={232} width={560} height={14} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />

      {ITEMS.map((it, i) => (
        <g key={it.label}>
          <Lit on={s === 0} off={0.55}>
            {i === 0 && (
              <g>
                <rect x={76} y={150} width={88} height={82} fill={D.teal} stroke={D.ink} strokeWidth={4} />
                <path d="M92 150 V232" stroke={D.ink} strokeWidth={3} />
              </g>
            )}
            {i === 1 && (
              <g>
                <rect x={260} y={140} width={120} height={84} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4} />
                <path d="M272 206 L296 186 L318 196 L344 166 L368 176" fill="none" stroke={D.leaf} strokeWidth={4} strokeLinecap="round" />
                <path d="M320 224 V232" stroke={D.ink} strokeWidth={4} />
              </g>
            )}
            {i === 2 && (
              <g>
                <rect x={484} y={146} width={72} height={86} fill="#fff" stroke={D.ink} strokeWidth={4} />
                <path d="M496 172 H544 M496 188 H536 M496 204 H544" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
              </g>
            )}
            {mono(it.x, 270, it.label, 18)}
          </Lit>
          {/* The question it does not answer. */}
          <Show on={s >= 1} delay={s === 1 ? i * 0.15 : 0}>
            <Lit on={s === 1} off={0.6}>
              {mono(it.x, 120, "?", 30, D.accent)}
              {mono(it.x, 300, it.q, 18, D.accent)}
            </Lit>
          </Show>
        </g>
      ))}

      {/* The honest move. */}
      <Show on={s === 2}>
        <g transform="rotate(-3 320 60)">
          <rect x={210} y={36} width={220} height={54} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          {mono(320, 62, "CANNOT ANSWER:", 18, D.ink)}
          {mono(320, 82, "RECORDED", 18, D.teal)}
        </g>
      </Show>

      <Torso x={590} y={318} w={56} h={54} fill={D.grey} />
      <Head x={590} y={300} r={22} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={i} on={s === i && t !== ""}>
          {hand(i === 2 ? 120 : 320, i === 2 ? 60 : 72, t, 28, i === 2 ? D.teal : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT EXISTS", "WHAT IT DOES NOT ESTABLISH", "SILENCE IS NOT A PASS"][s], 18, D.accent)}
    </Plate>
  );
}
