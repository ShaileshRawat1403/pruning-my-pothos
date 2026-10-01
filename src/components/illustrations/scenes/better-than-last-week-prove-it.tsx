"use client";

import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * The steps of the Works On My Prompt sheet "Better Than Last Week? Prove It.".
 * One board, every step: the note saying what worse looks like, then ten
 * inputs, then what each must do, then two runs marked side by side with the
 * row that moved ringed, then a new row for the newest failure. The marks are
 * illustrative; the sheet says nothing about how often anything fails.
 */
const ROW = 24;
const TOP = 66;
const V1_FAIL = new Set([2, 8]);
const V2_FAIL = new Set([2, 5, 8]);
const MOVED = 5;

const ARM = [80, -18, -26, -32, -32];
const SAYS = ["write it first.", "real ones.", "seeable.", "this one moved.", "row eleven."];
const LABEL = ["WHAT WORSE LOOKS LIKE", "TEN REAL INPUTS", "WHAT EACH ONE MUST DO", "SAME ROWS, TWICE", "EVERY NEW FAILURE, A ROW"];

function Mark({ x, y, fail, on }: { x: number; y: number; fail: boolean; on: boolean }) {
  return fail ? (
    <path d={`M${x - 7} ${y - 7} l14 14 m0 -14 l-14 14`} stroke={D.accent} strokeWidth={4} strokeLinecap="round" style={{ opacity: on ? 1 : 0, transition: "opacity .3s" }} />
  ) : (
    <Tick x={x} y={y + 3} on={on} size={0.8} />
  );
}

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const rows = Array.from({ length: 10 }, (_, i) => i);
  return (
    <Plate id={id}>
      <path d="M20 380 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* What worse looks like, written first. */}
      <Lit on={s === 0} off={0.55}>
        <g transform="rotate(-3 100 60)">
          <rect x={26} y={26} width={148} height={72} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          {mono(40, 54, "WORSE =", 18, D.accent, "start")}
          <path d="M40 72 H158 M40 86 H130" stroke={D.greyLight} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      </Lit>

      {/* The board. */}
      <rect x={200} y={30} width={420} height={TOP + ROW * 11 - 22} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <path d={`M200 ${TOP - 4} H620 M382 30 V${TOP + ROW * 11 + 8} M524 30 V${TOP + ROW * 11 + 8} M572 30 V${TOP + ROW * 11 + 8}`} stroke={D.ink} strokeWidth={3} />
      {mono(291, 54, "INPUT", 18, s === 1 ? D.ink : D.greyLight)}
      {mono(453, 54, "MUST", 18, s === 2 ? D.ink : D.greyLight)}
      {mono(548, 54, "V1", 18, s === 3 ? D.ink : D.greyLight)}
      {mono(596, 54, "V2", 18, s === 3 ? D.ink : D.greyLight)}

      {rows.map((i) => {
        const y = TOP + i * ROW + 14;
        return (
          <g key={i}>
            <path d={`M200 ${TOP + (i + 1) * ROW - 4} H620`} stroke={D.greyLight} strokeWidth={1.5} opacity={0.5} />
            <Show on={s >= 1} delay={s === 1 ? i * 0.05 : 0}>
              <path d={`M214 ${y} H${360 - (i % 3) * 30}`} stroke={s === 1 ? D.ink : D.greyLight} strokeWidth={4} strokeLinecap="round" />
            </Show>
            <Show on={s >= 2} delay={s === 2 ? i * 0.05 : 0}>
              <path d={`M396 ${y} H${506 - (i % 2) * 34}`} stroke={s === 2 ? D.teal : D.greyLight} strokeWidth={4} strokeLinecap="round" />
            </Show>
            <Mark x={548} y={y} fail={V1_FAIL.has(i)} on={s >= 3} />
            <Mark x={596} y={y} fail={V2_FAIL.has(i)} on={s >= 3} />
          </g>
        );
      })}
      <Show on={s === 3}>
        <rect x={204} y={TOP + MOVED * ROW - 4} width={412} height={ROW} rx={4} fill="none" stroke={D.accent} strokeWidth={3.5} />
      </Show>

      {/* Row eleven: the newest failure, added the same day. */}
      <Show on={s >= 4}>
        <rect x={202} y={TOP + 10 * ROW - 3} width={416} height={ROW - 2} fill="#F6E7A8" />
        <path d={`M214 ${TOP + 10 * ROW + 10} H330 M396 ${TOP + 10 * ROW + 10} H480`} stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
        <Mark x={596} y={TOP + 10 * ROW + 10} fail={false} on={s >= 4} />
      </Show>

      {/* The builder, with a marker. */}
      <Torso x={100} y={248} w={112} h={132} fill={D.grey} />
      <Head x={100} y={196} r={42} eyes={s === 3 ? "saucer" : "sleepy"} look={s === 0 ? -0.6 : 1} mouth="flat" stubble hair="messy" />
      <At x={146} y={276} r={ARM[s]}>
        <Limb d="M0 0 C 30 4, 60 6, 88 4" fill={D.grey} />
        <circle cx={92} cy={4} r={10} fill={D.face} stroke={D.ink} strokeWidth={4} />
        <rect x={96} y={-4} width={26} height={9} rx={2} fill={D.accent} stroke={D.ink} strokeWidth={2.5} />
      </At>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(100, 132, t, 26, D.accent)}
        </Show>
      ))}
      {mono(320, 408, LABEL[s], 18, D.accent)}
    </Plate>
  );
}
