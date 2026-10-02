import React from "react";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";
import { D } from "../deadpan";

/**
 * Lexical or vector. Left, a magnifier over a page: it finds ERR-4021 exactly,
 * and walks straight past "the error from earlier". Right, a map of meaning:
 * "small dog" lands beside "puppy", and an exact part number lands next to a
 * different one. Last, both, combined.
 */
const SAYS = ["exact. literal. no imagination.", "all imagination. no exactness.", "run both."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V300" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* Lexical: the words themselves. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={40} y={90} width={240} height={190} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(56, 126, "ERR-4021", 18, D.ink, "start")}
        <rect x={52} y={108} width={98} height={26} fill="none" stroke={D.leaf} strokeWidth={3.5} />
        {mono(56, 170, "the error from", 18, D.greyLight, "start")}
        {mono(56, 194, "earlier", 18, D.greyLight, "start")}
        {mono(214, 182, "✗", 22, D.accent)}
        <path d="M56 230 H260 M56 252 H220" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        <circle cx={110} cy={122} r={42} fill="#fff" fillOpacity={0.2} stroke={D.ink} strokeWidth={4} />
        <path d="M140 152 L168 182" stroke={D.ink} strokeWidth={7} strokeLinecap="round" />
        {mono(160, 300, "LEXICAL", 20)}
      </Lit>

      {/* Vector: positions in a space of meaning. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={360} y={90} width={240} height={190} fill="#F6F1E4" stroke={D.ink} strokeWidth={4} />
        {[[400, 120], [560, 250], [420, 260], [580, 130]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4} fill={D.greyLight} />
        ))}
        <circle cx={430} cy={160} r={7} fill={D.teal} />
        {mono(442, 152, "small dog", 18, D.teal, "start")}
        <circle cx={452} cy={184} r={7} fill={D.leaf} />
        {mono(464, 196, "puppy", 18, D.leaf, "start")}
        <circle cx={500} cy={228} r={7} fill={D.accent} />
        {mono(380, 226, "PN-118", 18, D.ink, "start")}
        <circle cx={520} cy={240} r={7} fill={D.accent} />
        {mono(530, 266, "PN-119", 18, D.accent, "start")}
        {mono(480, 300, "VECTOR", 20)}
      </Lit>

      <Show on={s === 2}>
        <path d="M160 316 C 200 350, 440 350, 480 316" fill="none" stroke={D.ink} strokeWidth={3.5} />
        <rect x={250} y={330} width={140} height={34} rx={4} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        {mono(320, 353, "HYBRID", 18)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : i === 1 ? 480 : 320, 60, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["MISSES A PARAPHRASE", "MISSES AN EXACT IDENTIFIER", "THEY FAIL IN DIFFERENT PLACES"][s], 18, D.accent)}
    </Plate>
  );
}
