import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What kind of unsure. One agent, one thought bubble, three kinds of doubt:
 * a jigsaw with a piece missing (missing inputs: get more context); three
 * identical doors (several plausible options: a tighter constraint or a
 * second check); a big red button that will definitely work (may be the wrong
 * thing: make it undoable, or ask a person). Each with its prescription.
 */
const RX = ["MORE / CONTEXT", "TIGHTER RULE / 2ND CHECK", "UNDO, OR / A PERSON"];
const SAYS = ["unsure. which kind?", "something's missing.", "they all look right.", "it'll work. that's the worry."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  const b = s - 1;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The agent, thinking. */}
      <Torso x={110} y={250} w={96} h={122} fill={D.teal} />
      <Head x={110} y={204} r={40} eyes={s === 3 ? "saucer" : "sleepy"} look={1} mouth="flat" hair="curly" />
      <circle cx={170} cy={150} r={7} fill="#fff" stroke={D.ink} strokeWidth={3} />
      <circle cx={190} cy={126} r={10} fill="#fff" stroke={D.ink} strokeWidth={3} />
      <ellipse cx={330} cy={150} rx={130} ry={96} fill="#fff" stroke={D.ink} strokeWidth={4} />

      <Show on={s === 0}>{mono(330, 160, "?", 48, D.greyLight)}</Show>

      {/* Missing inputs: a jigsaw, a piece short. */}
      <Show on={b === 0}>
        {[0, 1, 2, 3].map((i) => (i === 2 ? null : <rect key={i} x={270 + (i % 2) * 60} y={100 + Math.floor(i / 2) * 50} width={58} height={48} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />))}
        <rect x={330} y={150} width={58} height={48} fill="none" stroke={D.accent} strokeWidth={3} strokeDasharray="5 5" />
      </Show>
      {/* Several plausible: three identical doors. */}
      <Show on={b === 1}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={250 + i * 58} y={96} width={44} height={96} fill="#C9B593" stroke={D.ink} strokeWidth={3} />
            <circle cx={286 + i * 58} cy={146} r={3.5} fill={D.ink} />
          </g>
        ))}
      </Show>
      {/* Technically fine, possibly wrong: the big red button. */}
      <Show on={b === 2}>
        <ellipse cx={330} cy={180} rx={60} ry={16} fill={D.ink} />
        <ellipse cx={330} cy={168} rx={52} ry={16} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        {mono(330, 128, "WILL WORK", 18, D.leaf)}
      </Show>

      {/* The prescriptions. */}
      {RX.map((r, i) => (
        <Lit key={r} on={b === i} off={s === 0 ? 0.25 : 0.35}>
          <rect x={184 + i * 148} y={276} width={142} height={64} rx={4} fill={b === i ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3} />
          {r.split(" / ").map((line, k) => mono(255 + i * 148, 302 + k * 24, line, 18, b === i ? D.accent : D.ink))}
        </Lit>
      ))}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(500, 70, t, 24, i === 3 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT KIND OF UNCERTAINTY?", "MISSING OR CONFLICTING INPUTS", "SEVERAL PLAUSIBLE OPTIONS", "SUCCEEDS, MAY BE WRONG"][s], 18, D.accent)}
    </Plate>
  );
}
