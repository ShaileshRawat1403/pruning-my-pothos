import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A file called current. The repository's own handoff document, held up for
 * inspection: its name, its heading, its list of thirty-five files (thirty-
 * four struck through), and the space where the work in progress should be.
 * Then the claim it makes, and the fair word on it.
 */
const SAYS = ["it says current.", "it says it twice.", "34 of 35. gone.", "the real work: absent.", "", "still a fine diary."];
const LABEL = ["ITS NAME", "ITS FIRST HEADING", "KEY FILES TOUCHED", "THE WORK IN PROGRESS", "THE CLAIM", "WHAT THIS DOES NOT SAY"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 5);
  const rows = Array.from({ length: 12 }, (_, i) => i);
  return (
    <Plate id={id}>
      <path d="M20 380 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The document. */}
      <rect x={60} y={40} width={300} height={330} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <Lit on={s === 0} off={0.55}>
        <rect x={60} y={40} width={300} height={42} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        {mono(210, 68, "current.md", 22, s === 0 ? D.accent : D.ink)}
      </Lit>
      <Lit on={s === 1} off={0.55}>
        {mono(78, 112, "# CURRENT STATE", 18, s === 1 ? D.accent : D.ink, "start")}
      </Lit>
      <Lit on={s === 2} off={0.55}>
        {mono(78, 142, "KEY FILES TOUCHED", 18, D.ink, "start")}
        {rows.map((i) => (
          <g key={i}>
            <path d={`M82 ${162 + i * 14} H${300 - (i % 3) * 36}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
            {i !== 7 && <path d={`M78 ${162 + i * 14} H${306 - (i % 3) * 36}`} stroke={D.accent} strokeWidth={2.5} strokeLinecap="round" style={{ strokeDasharray: 240, strokeDashoffset: s >= 2 ? 0 : 240, transition: `stroke-dashoffset .3s ease ${i * 0.04}s` }} />}
          </g>
        ))}
        <Show on={s >= 2}>{mono(330, 266, "1", 18, D.leaf)}</Show>
      </Lit>
      {/* Where the work in progress should be. */}
      <Lit on={s === 3} off={0.5}>
        <rect x={78} y={334} width={264} height={28} fill="none" stroke={D.ink} strokeWidth={2.5} strokeDasharray="6 6" />
        {mono(210, 354, s >= 3 ? "IN PROGRESS: (NOTHING)" : "", 18, D.accent)}
      </Lit>

      {/* The clerk, reading it as instructed. */}
      <Torso x={500} y={250} w={110} h={130} fill={D.teal} />
      <Head x={500} y={198} r={44} eyes={s >= 2 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="messy" />
      <Limb d="M450 296 C 420 290, 396 276, 372 262" fill={D.teal} />

      {/* The claim, stamped; then the fair word. */}
      <Show on={s >= 4}>
        <g transform="rotate(-8 500 98)">
          <rect x={410} y={76} width={180} height={44} fill="#fff" stroke={D.accent} strokeWidth={4} />
          {mono(500, 106, "CURRENT?", 22, D.accent)}
        </g>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={i} on={s === i && t !== ""}>
          {hand(500, 44, t, 26, i === 5 ? D.teal : D.greyLight)}
        </Show>
      ))}
      {mono(320, 408, LABEL[s], 18, D.accent)}
    </Plate>
  );
}
