import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Demo or readiness. Left, under a spotlight: one user, one goal, one clean
 * input, one path. Right, the conditions nobody invited to the demo: a
 * mangled input, a user with a different goal, an upstream system crawling.
 * Last, the demo's answer, written on its own little sign: possible.
 */
const SAYS = ["flawless.", "uninvited guests.", "it answered: possible?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V372" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* The demonstration: lit, narrow, one of everything. */}
      <Lit on={s !== 1} off={0.4}>
        <path d="M150 30 L60 372 H250 Z" fill="#F6E7A8" opacity={0.5} />
        <Torso x={150} y={236} w={90} h={136} fill={D.teal} />
        <Head x={150} y={190} r={38} eyes="sleepy" look={0} mouth="smirk" hair="curly" />
        <Limb d="M192 276 C 214 270, 230 262, 244 252" fill={D.teal} />
        <rect x={236} y={226} width={60} height={40} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(266, 252, "IN", 18, D.leaf)}
        {mono(150, 400 - 50, "1 USER", 18)}
      </Lit>

      {/* What the readiness question invites. */}
      <Lit on={s === 1} off={0.4}>
        <At y={s >= 1 ? 0 : -30} o={s >= 1 ? 1 : 0.35}>
          <rect x={350} y={150} width={110} height={52} fill="#fff" stroke={D.accent} strokeWidth={3.5} strokeDasharray="6 5" transform="rotate(-6 405 176)" />
          {mono(405, 184, "%$#!", 22, D.accent)}
        </At>
        <At x={s >= 1 ? 0 : 40} o={s >= 1 ? 1 : 0.35} delay={0.1}>
          <Torso x={530} y={236} w={84} h={136} fill={D.grey} />
          <Head x={530} y={192} r={34} eyes="saucer" look={-1} mouth="o" hair="messy" />
          {mono(540, 120, "OTHER GOAL", 18, D.grey)}
        </At>
        <At x={s >= 1 ? 0 : -20} o={s >= 1 ? 1 : 0.35} delay={0.2}>
          <path d="M380 330 C 380 300, 420 296, 432 318 C 440 334, 420 346, 404 336" fill="#C9B593" stroke={D.ink} strokeWidth={3.5} />
          <path d="M432 330 H470 L462 340 H380" fill={D.leaf} stroke={D.ink} strokeWidth={3} />
          {mono(420, 300, "UPSTREAM", 18, D.greyLight)}
        </At>
      </Lit>

      <Show on={s === 2}>
        <g transform="rotate(-4 150 110)">
          <rect x={80} y={88} width={140} height={44} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(150, 118, "POSSIBLE?", 20, D.teal)}
        </g>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 480 : 160, 60, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT THE DEMO HAD", "WHAT READINESS ASKS ABOUT", "A NARROWER QUESTION"][s], 18, D.accent)}
    </Plate>
  );
}
