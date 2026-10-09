import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Letters, words, pieces. Three ways to cut a loaf of text. Letters: a pile
 * of crumbs, a very long tray. Words: neat slices, but a dictionary the size
 * of a fridge, with one page torn out where a new word should be. Pieces:
 * common words whole, a rare one cut into a few chunks, a tray of sensible
 * length.
 */
const SAYS = ["a crumb each. forever.", "a slice each. and a fridge-sized dictionary.", "whole where common. chunks where rare."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Characters: crumbs on a long tray. */}
      <Lit on={s === 0} off={0.3}>
        <rect x={30} y={110} width={580} height={30} rx={6} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
        {Array.from({ length: 26 }, (_, i) => (
          <rect key={i} x={40 + i * 22} y={116} width={16} height={18} fill="#fff" stroke={D.ink} strokeWidth={1.5} />
        ))}
        {mono(80, 98, "LETTERS", 18, D.ink, "start")}
      </Lit>

      {/* Words: slices, and a huge dictionary. */}
      <Lit on={s === 1} off={0.3}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={50 + i * 74} y={190} width={66} height={44} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        ))}
        <rect x={360} y={170} width={70} height={84} fill={D.teal} stroke={D.ink} strokeWidth={3} />
        <path d="M376 170 V254" stroke={D.ink} strokeWidth={2} />
        <rect x={440} y={176} width={30} height={46} fill="#fff" stroke={D.accent} strokeWidth={2.5} strokeDasharray="4 4" />
        {mono(500, 210, "NEW?", 18, D.accent)}
        {mono(80, 178, "WORDS", 18, D.ink, "start")}
      </Lit>

      {/* Tokens: whole common words, a rare one in chunks. */}
      <Lit on={s === 2} off={0.3}>
        {[
          { x: 50, w: 70, t: "the" },
          { x: 128, w: 80, t: "cat" },
          { x: 216, w: 70, t: "Smart" },
          { x: 292, w: 50, t: "ifi" },
          { x: 348, w: 80, t: "cation" },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={290} width={c.w} height={44} rx={4} fill={i >= 2 ? "#F6E7A8" : "#DDEFE6"} stroke={D.ink} strokeWidth={2.5} />
            {mono(c.x + c.w / 2, 318, c.t, 18)}
          </g>
        ))}
        {mono(80, 278, "TOKENS", 18, D.ink, "start")}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 430 : 420, i === 0 ? 92 : i === 1 ? 160 : 270, t, 20, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["TINY VOCABULARY, LONG SEQUENCES", "SHORT SEQUENCES, HUGE VOCABULARY", "SOMEWHERE BETWEEN"][s], 18, D.accent)}
    </Plate>
  );
}
