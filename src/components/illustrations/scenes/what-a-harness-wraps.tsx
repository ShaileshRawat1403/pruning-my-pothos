import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What a harness wraps, built outward from the model. A small robot in the
 * middle that only talks. Then a loop of arrows round it; tools bolted to
 * either side; a feed of pages coming in from above; last, a fence with a
 * gate round the lot. Each part stays once drawn; the newest is in ink.
 */
const SAYS = ["a model: text in, text out.", "a loop keeps it going.", "tools let it touch things.", "context: what it sees this turn.", "limits it cannot talk past."];
const TAGS = ["MODEL", "LOOP", "TOOLS", "CONTEXT", "CONTROLS"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The model: a small robot with a speech bubble. */}
      <Lit on={s === 0} off={0.55}>
        <rect x={296} y={226} width={48} height={40} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <circle cx={310} cy={244} r={5} fill={D.ink} />
        <circle cx={330} cy={244} r={5} fill={D.ink} />
        <path d="M310 256 H330" stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
        <path d="M304 266 V286 M336 266 V286" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
        <rect x={404} y={180} width={74} height={30} rx={10} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <path d="M344 232 L404 204" stroke={D.ink} strokeWidth={2.5} />
        {mono(441, 201, "text", 18, D.teal)}
      </Lit>

      {/* The loop: arrows round the model. */}
      <Show on={s >= 1}>
        <Lit on={s === 1} off={0.45}>
          <path d="M248 250 A 74 64 0 1 1 320 312" fill="none" stroke={D.teal} strokeWidth={5} strokeLinecap="round" />
          <path d="M320 312 L306 300 M320 312 L304 320" stroke={D.teal} strokeWidth={5} strokeLinecap="round" />
        </Lit>
      </Show>

      {/* The tools: a terminal and a wrench, either side. */}
      <Show on={s >= 2}>
        <Lit on={s === 2} off={0.45}>
          <rect x={120} y={226} width={90} height={60} fill={D.ink} stroke={D.ink} strokeWidth={3} />
          {mono(165, 262, "$ run", 18, D.leaf)}
          <path d="M210 256 H244" stroke={D.ink} strokeWidth={3} strokeDasharray="6 6" />
          <path d="M470 310 L516 264" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
          <path d="M510 250 A 16 16 0 1 0 530 270 L520 266 L514 260 Z" fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
          <path d="M398 290 H462" stroke={D.ink} strokeWidth={3} strokeDasharray="6 6" />
        </Lit>
      </Show>

      {/* The context: pages fed in from above. */}
      <Show on={s >= 3}>
        <Lit on={s === 3} off={0.45}>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={250 + i * 46} y={104 - (i % 2) * 8} width={40} height={50} fill="#fff" stroke={D.ink} strokeWidth={3} />
          ))}
          <path d="M320 158 V176 M312 168 L320 178 L328 168" stroke={D.ink} strokeWidth={3.5} strokeLinecap="round" fill="none" />
        </Lit>
      </Show>

      {/* The controls: a fence round the lot, with a gate. */}
      <Show on={s >= 4}>
        <rect x={80} y={86} width={480} height={260} fill="none" stroke={D.accent} strokeWidth={5} strokeDasharray="14 8" />
        <rect x={548} y={190} width={24} height={54} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        {mono(560, 266, "GATE", 18, D.ink)}
      </Show>

      {hand(320, 52, SAYS[s], 26, s === 4 ? D.accent : D.grey)}
      {mono(320, 404, TAGS[s], 18, D.accent)}
    </Plate>
  );
}
