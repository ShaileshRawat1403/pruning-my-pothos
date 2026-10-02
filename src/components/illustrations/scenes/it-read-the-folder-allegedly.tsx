"use client";

import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Page, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * The steps of the Works On My Prompt sheet "It Read the Folder. Allegedly."
 * One desk, every step: the questions you can check pinned on the left; the
 * tray of uploads, with the old copy going in the bin; one page held up to
 * see whether its text arrived; the quote matched to its line in the file;
 * last, a question about a file that was never given, answered honestly.
 */
// Arm angle per step, pointing from the shoulder: board, tray, page, page, a shrug.
const ARM = [200, 177, 226, 215, 120];
const SAYS = ["you know these.", "one copy.", "did it arrive?", "show me where.", "and this one?"];
const LABEL = ["QUESTIONS YOU CAN CHECK", "ONE CURRENT COPY", "DID THE TEXT ARRIVE", "THE QUOTE, IN THE FILE", "SOMETHING IT WAS NEVER GIVEN"];
const CARDS = ["Q1  P.4", "Q2  P.9", "Q3  P.12"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 380 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The questions, pinned, each with where its answer is. */}
      <Lit on={s === 0 || s === 3} off={0.5}>
        <rect x={24} y={28} width={176} height={150} fill="#C9A77C" stroke={D.ink} strokeWidth={4} />
        {CARDS.map((c, i) => (
          <g key={c}>
            <rect x={36} y={40 + i * 44} width={152} height={34} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
            <circle cx={112} cy={42 + i * 44} r={4} fill={D.accent} stroke={D.ink} strokeWidth={2} />
            {mono(112, 64 + i * 44, c, 18, s === 3 && i === 1 ? D.accent : D.ink)}
          </g>
        ))}
        <Show on={s >= 4}>
          <rect x={36} y={184} width={152} height={34} fill="#fff" stroke={D.accent} strokeWidth={3} strokeDasharray="6 5" />
          {mono(112, 208, "Q4  ?", 18, D.accent)}
        </Show>
      </Lit>

      {/* The desk, the tray of uploads, the bin. */}
      <rect x={210} y={300} width={330} height={16} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
      <path d="M226 316 V380 M524 316 V380" stroke={D.ink} strokeWidth={6} strokeLinecap="round" />
      <Lit on={s === 1} off={0.5}>
        <path d="M232 300 L240 258 H360 L368 300" fill="#C9B593" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        {mono(300, 292, "UPLOADS", 18)}
        <path d="M120 380 L128 330 H172 L180 380 Z" fill={D.grey} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
      </Lit>
      {/* The current copy stays; the old one goes in the bin. */}
      <g transform="translate(272 244)">
        <Page w={44} h={56} lines={3} />
      </g>
      {mono(272, 228, "V2", 18, s === 1 ? D.teal : D.greyLight)}
      <At x={s >= 1 ? -170 : 0} y={s >= 1 ? 96 : 0} r={s >= 1 ? -24 : 0} o={s >= 2 ? 0 : 1}>
        <g transform="translate(320 244)">
          <Page w={44} h={56} lines={3} fill="#EDE7DA" />
        </g>
        {mono(320, 228, "V1", 18, s === 1 ? D.accent : D.greyLight)}
      </At>

      {/* One page held up: did its text arrive, and where is the quote? */}
      <Show on={s >= 2}>
        <g transform="rotate(-3 440 150)">
          <rect x={384} y={60} width={124} height={170} fill="#fff" stroke={D.ink} strokeWidth={4} />
          {mono(446, 86, "P.9", 18, D.greyLight)}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M398 ${108 + i * 20} H${494 - (i % 2) * 20}`} stroke={s === 3 && i === 3 ? D.accent : D.greyLight} strokeWidth={s === 3 && i === 3 ? 6 : 4} strokeLinecap="round" />
          ))}
        </g>
        <Tick x={520} y={84} on={s === 2} />
      </Show>

      {/* The answer, with its quote; matched to the line, or honest about Q4. */}
      <Show on={s >= 3}>
        <rect x={236} y={176} width={146} height={44} rx={8} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(309, 204, s === 4 ? "NOT IN FILES" : "“...” P.9", 18, s === 4 ? D.teal : D.ink)}
        <Show on={s === 3}>
          <path d="M382 196 C 394 190, 392 176, 400 172" fill="none" stroke={D.accent} strokeWidth={3.5} strokeDasharray="6 6" strokeLinecap="round" />
        </Show>
      </Show>

      {/* The assistant, at the end of the desk. */}
      <Torso x={590} y={226} w={92} h={154} fill={D.teal} />
      <Head x={590} y={178} r={38} eyes={s === 4 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="curly" />
      <At x={548} y={256} r={ARM[s]}>
        <Limb d="M0 0 C 26 4, 52 6, 76 4" fill={D.teal} />
        <circle cx={80} cy={4} r={9} fill={D.face} stroke={D.ink} strokeWidth={3.5} />
      </At>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(300, 120, t, 26, D.accent)}
        </Show>
      ))}
      {mono(320, 408, LABEL[s], 18, D.accent)}
    </Plate>
  );
}
