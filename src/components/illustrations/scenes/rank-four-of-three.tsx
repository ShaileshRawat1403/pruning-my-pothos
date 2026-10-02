import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Rank four of three. Five search results, ranked. The right one is number
 * four. Then the context box takes the top three, neatly. Then the model
 * reads the three it was given, and the right one is on the floor.
 */
const SAYS = ["found it. at #4.", "top three, as configured.", "never saw it."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  const cards = [0, 1, 2, 3, 4];
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The context box: room for three. */}
      <Lit on={s >= 1} off={0.35}>
        <rect x={300} y={90} width={160} height={190} rx={4} fill="none" stroke={D.ink} strokeWidth={4} strokeDasharray="10 6" />
        {mono(380, 80, "CONTEXT (3)", 18, D.teal)}
      </Lit>

      {/* The ranked results: the top three go in the box; number four, on the floor. */}
      {cards.map((i) => {
        const right = i === 3;
        const inBox = s >= 1 && i < 3;
        const floor = s >= 1 && i >= 3;
        const x = inBox ? 320 : floor ? (i === 3 ? 330 : 420) : 60;
        const y = inBox ? 104 + i * 58 : floor ? 336 : 70 + i * 58;
        const r = floor ? (i === 3 ? -8 : 6) : 0;
        return (
          <At key={i} x={x - 60} y={y - 70} r={r} delay={s === 1 ? i * 0.08 : 0}>
            <rect x={60} y={70} width={120} height={44} rx={4} fill={right ? "#DDEFE6" : "#fff"} stroke={right ? D.leaf : D.ink} strokeWidth={right ? 4 : 3} />
            {mono(78, 99, `#${i + 1}`, 18, right ? D.leaf : D.greyLight, "start")}
            <path d="M116 86 H164 M116 100 H150" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
          </At>
        );
      })}

      {/* The model, reading what it was handed. */}
      <Lit on={s === 2} off={0.45}>
        <Torso x={560} y={240} w={90} h={132} fill={D.teal} />
        <Head x={560} y={194} r={38} eyes={s === 2 ? "sleepy" : "closed"} look={-1} mouth="flat" hair="curly" />
        <rect x={510} y={148} width={100} height={28} rx={3} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(560, 169, "MODEL", 18)}
      </Lit>

      <Show on={s === 2}>
        <path d="M330 350 C 330 390, 250 392, 230 360" fill="none" stroke={D.accent} strokeWidth={3} strokeDasharray="5 6" />
        {mono(200, 350, "THE ONE", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 400 : i === 1 ? 380 : 560, i === 1 ? 40 : 60, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["RETRIEVAL SUCCEEDED", "ASSEMBLY KEEPS THREE", "THE MODEL NEVER SEES IT"][s], 18, D.accent)}
    </Plate>
  );
}
