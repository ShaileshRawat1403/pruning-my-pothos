import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The slot was taken. A constructed booking: slot 2 was clicked; it had gone
 * between render and click. The question, then three honest responses, each
 * a card on the counter: SAY IT'S GONE, SHOW WHAT'S LEFT, WAITLIST. On every
 * step, crossed out in the corner, the one response that is not allowed: a
 * cheerful CONFIRMED.
 */
const CARDS = [
  { x: 160, t: "SAY IT'S GONE" },
  { x: 320, t: "SHOW WHAT'S LEFT" },
  { x: 480, t: "WAITLIST" },
];
const SAYS = ["clicked. a bit late.", "now what?", "sorry, gone.", "here's what's left.", "join the queue."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const b = s - 2;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The slot, taken. */}
      <Lit on={s === 0} off={0.5}>
        <rect x={60} y={60} width={150} height={70} rx={6} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(135, 92, "SLOT 2", 20)}
        <g transform="rotate(-10 135 104)">
          <rect x={90} y={96} width={90} height={28} fill="none" stroke={D.accent} strokeWidth={3.5} />
          {mono(135, 117, "TAKEN", 18, D.accent)}
        </g>
      </Lit>

      {/* The question. */}
      <Lit on={s === 1} off={0.5}>
        <rect x={250} y={70} width={220} height={44} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(360, 99, "WHAT NOW?", 20)}
      </Lit>

      {/* Three honest responses. */}
      {CARDS.map((c, i) => (
        <Lit key={c.t} on={b === i} off={s >= 1 ? 0.45 : 0.15}>
          <rect x={c.x - 74} y={170} width={148} height={64} rx={6} fill={b === i ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3.5} />
          {c.t.split(" ").length > 2
            ? [c.t.split(" ").slice(0, 2).join(" "), c.t.split(" ").slice(2).join(" ")].map((l, k) => mono(c.x, 196 + k * 22, l, 18, b === i ? D.accent : D.ink))
            : mono(c.x, 208, c.t, 18, b === i ? D.accent : D.ink)}
        </Lit>
      ))}

      {/* What it must not say. */}
      <g transform="rotate(-6 540 300)">
        <rect x={470} y={282} width={140} height={36} fill="#fff" stroke={D.greyLight} strokeWidth={3} />
        {mono(540, 307, "CONFIRMED ✓", 18, D.greyLight)}
        <path d="M466 300 L614 300" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
      </g>

      <Torso x={90} y={300} w={60} h={72} fill={D.teal} />
      <Head x={90} y={276} r={24} eyes={s >= 2 ? "tt" : "sleepy"} look={1} mouth="flat" hair="curly" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(300, 300, t, 26, i >= 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["TAKEN BETWEEN RENDER AND CLICK", "WHAT DOES THE SYSTEM DO?", "REFUSE", "REFRESH", "WAIT"][s], 18, D.accent)}
    </Plate>
  );
}
