import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Instruction or state. A rule in a frame, nailed to the wall: stable across
 * every piece of work. A sticky note on the monitor: true this afternoon,
 * false tomorrow. Last, the two get conflated: the note is stuck over the
 * rule, and now nobody can read either.
 */
const SAYS = ["permanent. allegedly.", "true today.", "now neither works."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The instruction: framed, nailed, the same for every piece of work. */}
      <Lit on={s !== 1} off={0.45}>
        <circle cx={150} cy={58} r={5} fill={D.ink} />
        <path d="M150 58 L70 96 M150 58 L230 96" stroke={D.ink} strokeWidth={3} />
        <rect x={30} y={96} width={240} height={130} fill={D.paperDeep} stroke={D.ink} strokeWidth={6} />
        <rect x={44} y={110} width={212} height={102} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(150, 140, "APPROVAL", 20)}
        {mono(150, 166, "REQUIRED", 20)}
        {mono(150, 192, "BEFORE PUBLISHING", 18, D.grey)}
        {mono(150, 252, "INSTRUCTION", 18, s === 0 ? D.teal : D.greyLight)}
      </Lit>

      {/* The desk, the monitor, and the state on a sticky note. */}
      <rect x={360} y={300} width={260} height={16} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
      <path d="M376 316 V372 M604 316 V372" stroke={D.ink} strokeWidth={6} strokeLinecap="round" />
      <rect x={400} y={140} width={180} height={130} rx={6} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <path d="M490 270 V300 M460 300 H520" stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
      <Lit on={s === 1} off={0.45}>
        {mono(490, 296, "STATE", 18, s === 1 ? D.accent : D.greyLight)}
        <path d="M600 110 a 18 18 0 1 1 0.1 0 M600 98 V110 H608" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinecap="round" />
      </Lit>
      {/* The note: on the monitor, then stuck over the rule. */}
      <At x={s === 2 ? -330 : 0} y={s === 2 ? -36 : 0} r={s === 2 ? -8 : 0}>
        <g transform="rotate(4 490 200)">
          <rect x={420} y={160} width={140} height={84} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          {mono(490, 192, "WAITING ON", 18)}
          {mono(490, 218, "APPROVAL", 18, D.accent)}
        </g>
      </At>

      {/* The person who has to read it. */}
      <Torso x={300} y={258} w={84} h={114} fill={D.grey} />
      <Head x={300} y={212} r={36} eyes={s === 2 ? "tt" : "sleepy"} look={s === 0 ? -1 : 1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 470 : 300, i === 1 ? 110 : 60, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["STABLE ACROSS EVERY PIECE OF WORK", "TRUE THIS AFTERNOON, FALSE TOMORROW", "CONFLATED"][s], 18, D.accent)}
    </Plate>
  );
}
