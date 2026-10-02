import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * What the merge reserves. This repository's pull request, drawn as a card
 * with a MERGE button. Default path: a person's hand on it. Validation: a row
 * of ticks for written rules. Auto-merge: a little robot arm presses it
 * instead. The record: an APPROVED BY line, blank. Then the claim, and what
 * the code does and does not show.
 */
const SAYS = ["a person merges.", "rules: ticked. taste: unchecked.", "or the arm does.", "approved by: (blank)", "", "the automation is real. the approval is assumed."];
const LABEL = ["DEFAULT PATH", "VALIDATION, EITHER WAY", "AUTO-MERGE PATH", "THE RECORD", "THE CLAIM", "WHAT THE CODE SHOWS"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 5);
  return (
    <Plate id={id}>
      <path d="M20 380 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The pull request. */}
      <rect x={150} y={70} width={340} height={250} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      {mono(170, 104, "PULL REQUEST · OPEN", 18, D.teal, "start")}
      <Lit on={s === 1} off={0.55}>
        {["FRONTMATTER", "STRUCTURE", "CONTRACT", "PROSE"].map((t, i) => (
          <g key={t}>
            {mono(196, 142 + i * 26, t, 18, D.ink, "start")}
            <Tick x={178} y={136 + i * 26} on={s >= 1} size={0.7} />
          </g>
        ))}
      </Lit>
      <Lit on={s === 3} off={0.5}>
        {mono(170, 286, "APPROVED BY:", 18, D.ink, "start")}
        <path d="M318 290 H470" stroke={s === 3 ? D.accent : D.greyLight} strokeWidth={3} strokeDasharray="6 6" />
      </Lit>
      <rect x={370} y={200} width={100} height={40} rx={6} fill={D.leaf} stroke={D.ink} strokeWidth={3.5} />
      {mono(420, 226, "MERGE", 18, "#fff")}

      {/* Default path: a person's hand. */}
      <Lit on={s === 0} off={s === 2 ? 0.15 : 0.45}>
        <Torso x={570} y={250} w={80} h={130} fill={D.teal} />
        <Head x={570} y={206} r={34} eyes="sleepy" look={-1} mouth="flat" hair="curly" />
        <Limb d="M532 286 C 510 270, 490 246, 474 228" fill={D.teal} w={13} />
      </Lit>

      {/* Auto-merge path: an arm, no person. */}
      <Show on={s >= 2}>
        <Lit on={s === 2} off={0.4}>
          <path d="M420 30 V140 L420 182" stroke={D.grey} strokeWidth={10} strokeLinecap="round" />
          <circle cx={420} cy={140} r={9} fill={D.grey} stroke={D.ink} strokeWidth={3} />
          <path d="M406 184 H434 L426 196 H414 Z" fill={D.grey} stroke={D.ink} strokeWidth={3} />
          {mono(470, 44, "AUTO", 18, D.greyLight, "start")}
        </Lit>
      </Show>

      <Show on={s >= 4}>
        <g transform="rotate(-8 90 120)">
          <rect x={20} y={96} width={140} height={60} fill="#fff" stroke={D.accent} strokeWidth={4} />
          {mono(90, 122, "A PERSON", 18, D.accent)}
          {mono(90, 144, "DECIDED?", 18, D.accent)}
        </g>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={i} on={s === i && t !== ""}>
          {hand(320, 52, t, 24, i === 5 ? D.teal : D.greyLight)}
        </Show>
      ))}
      {mono(320, 408, LABEL[s], 18, D.accent)}
    </Plate>
  );
}
