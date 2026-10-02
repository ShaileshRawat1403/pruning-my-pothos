import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What no does. The reviewer presses REJECT. Inside the line: four tracks the
 * system actually has (back for revision with the reason, stop and release,
 * escalate, manual route). Outside it: a cheerful toast, and an hourglass
 * waiting for someone to approve anyway. Last, the line itself.
 */
const TRACKS = [
  { y: 90, t: "BACK, WITH REASON", glyph: "↩" },
  { y: 140, t: "STOP AND RELEASE", glyph: "■" },
  { y: 190, t: "EVIDENCE / ESCALATE", glyph: "↑" },
  { y: 240, t: "MANUAL ROUTE", glyph: "→" },
];
const SAYS = ["no, and then this.", "no, and then nothing.", "where no lands."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The reviewer, and the button. */}
      <Torso x={90} y={230} w={90} h={142} fill={D.grey} />
      <Head x={90} y={184} r={38} eyes="sleepy" look={1} mouth="flat" stubble hair="sides" />
      <Limb d="M132 270 C 150 270, 160 266, 172 262" fill={D.grey} w={13} />
      <rect x={170} y={246} width={84} height={32} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
      {mono(212, 268, "REJECT", 18, "#fff")}

      {/* The line. */}
      <Lit on={s === 2} off={0.4}>
        <path d="M270 52 V372" stroke={D.ink} strokeWidth={3.5} strokeDasharray="10 8" />
      </Lit>

      {/* Inside: states the system actually has. */}
      {TRACKS.map((k, i) => (
        <Lit key={k.t} on={s !== 1} off={0.3}>
          <path d={`M254 262 C 270 262, 280 ${k.y}, 300 ${k.y}`} fill="none" stroke={D.leaf} strokeWidth={4} strokeLinecap="round" opacity={s === 0 ? 1 : 0.5} />
          <rect x={300} y={k.y - 20} width={300} height={36} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
          {mono(316, k.y + 5, k.glyph, 20, D.teal, "start")}
          {mono(346, k.y + 5, k.t, 18, D.ink, "start")}
          <Show on={s === 0} delay={i * 0.1}>
            <circle cx={586} cy={k.y - 2} r={6} fill={D.leaf} />
          </Show>
        </Lit>
      ))}

      {/* Outside: things that look like a refusal and are not. */}
      <Show on={s >= 1}>
        <Lit on={s === 1} off={0.45}>
          <rect x={300} y={286} width={190} height={40} rx={20} fill="#fff" stroke={D.ink} strokeWidth={3} />
          {mono(395, 312, "REJECTED ✓", 18, D.leaf)}
          <path d="M530 286 h40 l-16 22 l16 22 h-40 l16 -22 Z" fill="#F6E7A8" stroke={D.ink} strokeWidth={3} strokeLinejoin="round" />
          {mono(550, 350, "UNTIL APPROVED", 18, D.accent)}
        </Lit>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 420 : 140, i === 1 ? 50 : 60, t, 28, i === 1 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A STATE THE SYSTEM HAS", "NOT A DECISION", "WHEN THE REVIEWER SAYS NO"][s], 18, D.accent)}
    </Plate>
  );
}
