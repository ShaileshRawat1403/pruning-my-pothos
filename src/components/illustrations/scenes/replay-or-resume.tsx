import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Replay or resume. Left: a tape rewinding, showing frames of a run that
 * already finished, and only the frames that were recorded. Right: a book
 * with a bookmark, opened where work stopped. Between them, a checkpoint
 * flag holding one small box: what it actually contains, and nothing else.
 */
const SAYS = ["watching the rerun.", "carry on from here.", "contents: this box."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Replay: frames of the past, with gaps where nothing was recorded. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={40} y={90} width={220} height={96} fill={D.ink} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={52 + i * 52} y={106} width={42} height={64} fill={i === 2 ? D.ink : "#fff"} stroke="#fff" strokeWidth={2} />
        ))}
        {/* The black frame is the part nobody recorded. */}
        {mono(176, 146, "?", 18, "#fff")}
        <circle cx={90} cy={232} r={26} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <circle cx={210} cy={232} r={26} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <g style={{ transformOrigin: "90px 232px", transform: `rotate(${s === 0 ? -360 : 0}deg)`, transition: "transform 1.2s ease" }}>
          <path d="M90 210 V254 M68 232 H112" stroke={D.ink} strokeWidth={3} />
        </g>
        {mono(150, 288, "REPLAY", 20)}
        {mono(150, 314, "◀◀", 20, D.accent)}
      </Lit>

      {/* Resume: the book, open at the bookmark. */}
      <Lit on={s === 1} off={0.4}>
        <path d="M400 110 L490 124 L580 110 V250 L490 264 L400 250 Z" fill="#fff" stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        <path d="M490 124 V264" stroke={D.ink} strokeWidth={3.5} />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M414 ${150 + i * 22} H476 M504 ${150 + i * 22} H${566 - (i % 2) * 20}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" opacity={i < 2 ? 1 : 0.3} />
        ))}
        <path d="M520 104 V176 L530 166 L540 176 V104 Z" fill={D.accent} stroke={D.ink} strokeWidth={3} />
        {mono(490, 288, "RESUME", 20)}
        {mono(490, 314, "▶", 20, D.leaf)}
      </Lit>

      {/* The checkpoint, between them, holding what it holds. */}
      <Lit on={s === 2} off={0.35}>
        <path d="M320 120 V340" stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
        <path d="M320 120 L366 136 L320 152 Z" fill={D.accent} stroke={D.ink} strokeWidth={3} />
        <rect x={298} y={300} width={44} height={40} fill="#C9B593" stroke={D.ink} strokeWidth={3.5} />
        {mono(320, 108, "CHECKPOINT", 18)}
      </Lit>

      <Show on={s === 2}>
        <Torso x={560} y={300} w={70} h={72} fill={D.teal} />
        <Head x={560} y={272} r={26} eyes="tt" look={-1} mouth="flat" hair="curly" />
        <Limb d="M528 320 C 440 330, 380 326, 348 322" fill={D.teal} w={12} />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 150 : i === 1 ? 490 : 320, 62, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["LOOKS BACK, AS FAR AS THE RECORD GOES", "CONTINUES FROM PRESERVED STATE", "PRESERVES WHAT IT CONTAINS, NOTHING ELSE"][s], 18, D.accent)}
    </Plate>
  );
}

