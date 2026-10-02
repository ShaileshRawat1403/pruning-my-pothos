import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * When the next step cannot proceed. The receiver walks into a wall. Then the
 * question of what is wrong, and three ordinary responses, one sign each:
 * ask for the missing thing; stop and say why; retry from a known earlier
 * state. The receiver turns to each sign in turn.
 */
const SIGNS = [
  { y: 112, t: "ASK / RETURN IT" },
  { y: 182, t: "STOP / ESCALATE" },
  { y: 252, t: "FALLBACK / RETRY" },
];
const SAYS = ["huh.", "what's wrong?", "can I have the thing?", "no. here's why.", "back to the last good save."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const branch = s - 2;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The wall it walked into. */}
      <Lit on={s === 0} off={0.5}>
        <rect x={250} y={60} width={50} height={312} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M250 ${100 + i * 46} H300`} stroke={D.ink} strokeWidth={2.5} opacity={0.5} />
        ))}
      </Lit>

      {/* The receiver. */}
      <At x={s === 0 ? 30 : 0}>
        <Torso x={160} y={236} w={100} h={136} fill={D.teal} />
        <Head x={160} y={188} r={40} eyes={s === 0 ? "saucer" : "sleepy"} look={1} mouth="flat" hair="curly" />
        <Limb d="M206 280 C 230 270, 250 250, 262 232" fill={D.teal} />
      </At>

      {/* The question, and its three signs. */}
      <Show on={s >= 1}>
        <Lit on={s === 1} off={0.6}>
          <rect x={360} y={40} width={230} height={44} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(475, 69, "WHAT'S WRONG?", 20)}
        </Lit>
        <path d="M600 84 V372" stroke={D.ink} strokeWidth={6} strokeLinecap="round" />
        {SIGNS.map((g, i) => (
          <Lit key={g.t} on={branch === i} off={s === 1 ? 0.8 : 0.3}>
            <path d={`M390 ${g.y} H590 V${g.y + 44} H390 L366 ${g.y + 22} Z`} fill={branch === i ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
            {mono(486, g.y + 29, g.t, 18, branch === i ? D.accent : D.ink)}
          </Lit>
        ))}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(160, 110, t, 26, i >= 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["IT CANNOT CONTINUE", "WHAT IS WRONG WITH WHAT IT WAS HANDED?", "SOMETHING IS MISSING", "AMBIGUOUS, OR UNSATISFIABLE", "THE ARTIFACT IS GONE"][s], 18, D.accent)}
    </Plate>
  );
}
