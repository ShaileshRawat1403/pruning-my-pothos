import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * FDE and FDC on one deployment, by depth of ownership. One customer
 * building. Left: the engineer, laptop cabled deep into the customer's server
 * rack. Right: the consultant at a whiteboard, redrawing the problem for two
 * people who will have to use it. Last beat: both wear the vendor's badge.
 */
const SAYS = ["goes deep: builds and runs it.", "goes broad: problem to adoption.", "the line moves. both stay."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      {/* The customer's building. */}
      <path d="M30 372 V110 H610 V372" fill="none" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      {mono(320, 98, "CUSTOMER", 18, D.greyLight)}
      <path d="M320 120 V372" stroke={D.greyLight} strokeWidth={3} strokeDasharray="8 8" />

      {/* The engineer and their rack. */}
      <Lit on={s !== 1} off={0.35}>
        <rect x={60} y={170} width={80} height={170} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={72} y={186 + i * 38} width={56} height={24} fill="#fff" stroke={D.ink} strokeWidth={3} />
            <circle cx={118} cy={198 + i * 38} r={4} fill={i === 1 ? D.leaf : D.greyLight} />
          </g>
        ))}
        {mono(100, 160, "THEIR SYSTEMS", 18, D.ink)}
        {/* A desk with the laptop, cabled into the rack. */}
        <path d="M170 300 H240 M178 300 V372 M232 300 V372" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
        <path d="M180 296 H230 L226 300 H184 Z" fill={D.ink} />
        <path d="M184 296 L190 262 H228 L224 296" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
        <path d="M140 250 C 160 250, 170 280, 186 290" fill="none" stroke={D.teal} strokeWidth={4} />
        <Torso x={276} y={330} w={56} h={42} fill={D.teal} />
        <Head x={276} y={306} r={22} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
        {mono(240, 146, "FDE", 22, D.teal)}
      </Lit>

      {/* The consultant and the whiteboard. */}
      <Lit on={s !== 0} off={0.35}>
        <rect x={380} y={150} width={200} height={110} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <rect x={398} y={176} width={44} height={26} fill="none" stroke={D.ink} strokeWidth={3} />
        <rect x={462} y={176} width={44} height={26} fill="none" stroke={D.ink} strokeWidth={3} />
        <path d="M455 214 L500 238" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
        <path d="M500 214 L455 238" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
        <rect x={522} y={176} width={44} height={26} fill="none" stroke={D.leaf} strokeWidth={3} />
        <path d="M442 189 H462 M506 189 H522" stroke={D.ink} strokeWidth={3} />
        <Torso x={404} y={330} w={56} h={42} fill={D.accent} />
        <Head x={404} y={306} r={22} eyes="sleepy" look={1} mouth="flat" hair="sides" />
        <Torso x={520} y={340} w={40} h={32} fill={D.grey} />
        <Head x={520} y={320} r={17} eyes="sleepy" look={-1} mouth="flat" />
        <Torso x={570} y={340} w={40} h={32} fill={D.grey} />
        <Head x={570} y={320} r={17} eyes="sleepy" look={-1} mouth="flat" hair="sides" />
        {mono(470, 146, "FDC", 22, D.accent)}
      </Lit>

      {/* Both badges: the vendor's. */}
      <Show on={s === 2}>
        <rect x={262} y={340} width={28} height={18} rx={3} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        <rect x={390} y={340} width={28} height={18} rx={3} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 170 : i === 1 ? 470 : 320, 50, t, 24, i === 2 ? D.accent : D.grey)}
        </Show>
      ))}
      {mono(320, 404, ["ENGINEER: DEPTH IN THE BUILD", "CONSULTANT: BREADTH ACROSS THE PROBLEM", "BOTH EMPLOYED BY THE PRODUCT COMPANY"][s], 18, D.accent)}
    </Plate>
  );
}
