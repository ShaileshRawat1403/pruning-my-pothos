import React from "react";
import { D } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Route by type. A mail sorter: a document arrives at the top, and three
 * chutes lead to three kinds of engine: a specialist for fixed templates, a
 * generalist with a checker for mixed material, an all-rounder for unknown
 * mixes, with a fallback tray beside it. Each step drops the document down
 * one chute. Design reasoning, not a measurement.
 */
const CHUTES = [
  { x: 130, t: "INVOICES", e: "SPECIALIST" },
  { x: 320, t: "MIXED", e: "GENERALIST + CHECK" },
  { x: 510, t: "UNKNOWN", e: "ALL-ROUNDER" },
];
const SAYS = ["what is it, though?", "a template. easy.", "a mess. check it.", "no idea. play it safe."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  const b = s - 1;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The hopper. */}
      <path d="M220 60 H420 L360 120 H280 Z" fill={D.paperDeep} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
      {mono(320, 90, "WHAT KIND?", 18)}

      {/* The chutes and engines. */}
      {CHUTES.map((c, i) => (
        <Lit key={c.t} on={b === i} off={s === 0 ? 0.6 : 0.3}>
          <path d={`M320 120 L${c.x} 210`} stroke={D.ink} strokeWidth={14} strokeLinecap="round" opacity={0.15} />
          <path d={`M320 120 L${c.x} 210`} stroke={D.ink} strokeWidth={3} strokeDasharray="6 6" />
          {mono(c.x, 236, c.t, 18, b === i ? D.accent : D.ink)}
          <rect x={c.x - 86} y={256} width={172} height={60} rx={6} fill={b === i ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3.5} />
          {c.e.split(" + ").map((l, k, arr) => mono(c.x, 286 + k * 22 - (arr.length - 1) * 11 + 4, k === 1 ? "+ " + l : l, 18))}
        </Lit>
      ))}
      <Lit on={b === 2} off={0.3}>
        <rect x={530} y={324} width={100} height={40} fill={D.grey} stroke={D.ink} strokeWidth={3} />
        {mono(580, 350, "FALLBACK", 18, "#fff")}
      </Lit>

      {/* The document, dropping. */}
      <At x={b >= 0 ? CHUTES[b].x - 320 : 0} y={b >= 0 ? 130 : 0}>
        <rect x={302} y={24} width={36} height={44} fill="#fff" stroke={D.accent} strokeWidth={3} />
        <path d="M310 38 H330 M310 48 H326" stroke={D.greyLight} strokeWidth={2.5} strokeLinecap="round" />
      </At>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(510, 46, t, 24, i === 0 ? D.greyLight : D.accent)}
        </Show>
      ))}
      {mono(320, 404, ["ROUTE BY DOCUMENT TYPE", "FIXED TEMPLATES", "MIXED, UNPREDICTABLE", "UNKNOWN OR VARIED"][s], 18, D.accent)}
    </Plate>
  );
}
