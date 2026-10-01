"use client";

import React from "react";
import { D, LINE, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Page, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * The steps of the Works On My Prompt sheet "Write It Down or Watch It Guess".
 * One room, every step: the note on the wall gains a line, and the thing that
 * line pins down lights up while the agent's arm and eyes go to it. The
 * drawer it must never open gets taped; the laptop shows the run; the page
 * goes in the drawer it belongs in; the calendar gets its ring. Last, the
 * agent reads it.
 */
const ROWS = ["WHAT", "NEVER", "DONE WHEN", "WHERE"];

/** Where the arm points, per step: note, taped drawer, laptop, drawer, calendar. */
const ARM = [72, 16, -10, 38, -58];
const LOOK = [-1, 1, 1, 1, 0.6];
const SAYS = ["day one. again.", "agreed.", "ran it this time.", "one copy.", "read it."];
const LABEL = ["WHAT IT IS", "WHAT IT NEVER TOUCHES", "WHAT DONE MEANS", "WHERE THINGS LIVE", "WHEN IT WAS TRUE"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The note on the wall: one section per step. */}
      <g transform="rotate(-2 144 170)">
        <rect x={28} y={34} width={232} height={272} fill="#F6E7A8" stroke={D.ink} strokeWidth={4} />
        <circle cx={144} cy={36} r={8} fill={D.accent} stroke={D.ink} strokeWidth={3} />
        {mono(144, 70, "AGENTS.md", 20)}
        {ROWS.map((t, i) => {
          const y = 112 + i * 46;
          const never = i === 1;
          return (
            <Lit key={t} on={s === i} off={s > i ? 0.7 : 0.12}>
              {mono(46, y, t, 18, never ? D.accent : D.ink, "start")}
              <path d={`M${58 + t.length * 11} ${y - 6} H242`} stroke={D.greyLight} strokeWidth={3.5} strokeLinecap="round" />
              <path d={`M46 ${y + 14} H${232 - (i % 2) * 34}`} stroke={D.greyLight} strokeWidth={3.5} strokeLinecap="round" />
            </Lit>
          );
        })}
        <Show on={s >= 4}>
          <g transform="rotate(-8 196 284)">
            <rect x={140} y={268} width={112} height={32} fill="#fff" stroke={D.accent} strokeWidth={3} />
            {mono(196, 291, "UPDATED", 18, D.accent)}
          </g>
        </Show>
      </g>

      {/* The calendar: ringed the day the note changes. */}
      <Lit on={s === 4} off={0.35}>
        <rect x={500} y={36} width={112} height={98} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <rect x={500} y={36} width={112} height={22} fill={D.accent} stroke={D.ink} strokeWidth={4} />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={518 + (i % 4) * 25} cy={76 + Math.floor(i / 4) * 22} r={3.5} fill={D.greyLight} />
        ))}
        <Show on={s === 4}>
          <ellipse cx={593} cy={120} rx={15} ry={12} fill="none" stroke={D.accent} strokeWidth={4} />
        </Show>
      </Lit>

      {/* The desk, the laptop, the cabinet. */}
      <rect x={440} y={262} width={184} height={16} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
      <path d="M454 278 V372" {...LINE} strokeWidth={6} />

      <Lit on={s === 2} off={0.4}>
        <rect x={452} y={168} width={112} height={82} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <path d="M444 262 L452 250 H564 L572 262" fill={D.shirt} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        {mono(466, 196, "$ test", 18, D.ink, "start")}
        <Show on={s >= 2}>
          {mono(466, 232, "PASS", 18, D.leaf, "start")}
          <Tick x={538} y={226} on={s >= 2} />
        </Show>
      </Lit>

      <rect x={520} y={278} width={100} height={94} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
      {/* Top drawer: the one it must never open. */}
      <Lit on={s === 1} off={0.45}>
        <rect x={526} y={284} width={88} height={38} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        {mono(570, 309, "PROD/", 18)}
        <Show on={s >= 1}>
          <path d="M530 288 L610 318 M610 288 L530 318" stroke={D.accent} strokeWidth={7} strokeLinecap="round" opacity={0.85} />
        </Show>
      </Lit>
      {/* Bottom drawer: where pages go. Slides out for the page, then shuts. */}
      <Lit on={s === 3} off={0.45}>
        <At x={s === 3 ? -34 : 0}>
          <rect x={526} y={328} width={88} height={38} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
          {mono(570, 353, "PAGES/", 18)}
        </At>
      </Lit>

      {/* The agent: new every session. */}
      <Torso x={330} y={252} w={120} h={120} fill={D.teal} />
      <rect x={294} y={292} width={72} height={28} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3} />
      {mono(330, 312, "AGENT", 18)}
      <Head x={330} y={198} r={46} eyes={s === 4 ? "tt" : "sleepy"} look={LOOK[s]} mouth="flat" hair="curly" />
      <At x={384} y={272} r={ARM[s]}>
        <Limb d="M0 0 C 34 6, 66 8, 96 4" />
        <circle cx={100} cy={4} r={11} fill={D.face} stroke={D.ink} strokeWidth={4} />
        <Show on={s === 3}>
          <g transform="translate(112 -10) rotate(-38)">
            <Page w={30} h={38} lines={2} />
          </g>
        </Show>
      </At>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(380, 112, t, 28, i === 4 ? D.greyLight : D.accent)}
        </Show>
      ))}
      {mono(320, 404, LABEL[s], 18, D.accent)}
    </Plate>
  );
}
