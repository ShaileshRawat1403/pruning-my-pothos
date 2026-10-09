import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Who handles the limit. A suitcase that will not close, stuffed with too
 * much input. Three people might deal with it: the airline desk (the
 * provider: rejects it, or cuts by its own rule), you, packing beforehand
 * (the application: decides what to leave out), and a helpful stranger
 * (the chat interface: quietly removes your oldest things). Only one of them
 * is you.
 */
const PEOPLE = [
  { x: 130, t: "PROVIDER", out: "REJECT / CUT" },
  { x: 320, t: "APPLICATION", out: "YOU CHOOSE" },
  { x: 510, t: "CHAT UI", out: "OLDEST, GONE" },
];
const SAYS = ["it won't close.", "who's packing?", "rules are rules.", "you decide. in advance.", "quietly. helpfully. gone."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const b = s - 2;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The overstuffed suitcase. */}
      <Lit on={s <= 1} off={0.5}>
        <rect x={250} y={70} width={140} height={84} rx={8} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
        <path d="M250 70 L270 46 H370 L390 70" fill="#C9B593" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={262 + i * 28} y={40 - (i % 2) * 8} width={24} height={20} fill={i % 2 ? "#fff" : "#F6E7A8"} stroke={D.ink} strokeWidth={2} transform={`rotate(${(i - 1.5) * 10} ${274 + i * 28} 50)`} />
        ))}
        {mono(320, 120, "INPUT", 18)}
        <Show on={s === 1}>{mono(320, 182, "OVER THE LIMIT", 18, D.accent)}</Show>
      </Lit>

      {/* The three who might deal with it. */}
      {PEOPLE.map((p, i) => (
        <Lit key={p.t} on={b === i} off={s >= 1 ? 0.4 : 0.2}>
          <Torso x={p.x} y={274} w={70} h={98} fill={i === 1 ? D.teal : D.grey} />
          <Head x={p.x} y={242} r={28} eyes={b === i && i === 2 ? "closed" : "sleepy"} look={0} mouth={i === 2 ? "smirk" : "flat"} hair={i === 1 ? "curly" : "sides"} />
          {mono(p.x, 200, p.t, 18, i === 1 ? D.teal : D.ink)}
          <Show on={b === i}>
            <rect x={p.x - 70} y={300} width={140} height={30} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
            {mono(p.x, 321, p.out, 18, i === 1 ? D.teal : D.accent)}
          </Show>
        </Lit>
      ))}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i <= 1 ? 520 : i === 2 ? 130 : i === 3 ? 320 : 510, i <= 1 ? 90 : 176, t, 22, i === 3 ? D.teal : i >= 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["THE INPUT EXCEEDS THE LIMIT", "WHO IS HANDLING IT?", "THE MODEL OR PROVIDER", "THE APPLICATION: YOURS", "A CHAT INTERFACE"][s], 18, D.accent)}
    </Plate>
  );
}
