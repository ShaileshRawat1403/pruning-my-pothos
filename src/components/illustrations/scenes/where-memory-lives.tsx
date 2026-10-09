import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Where memory lives. A week later, the assistant greets you by name: "Hi,
 * Sam." Behind the counter, a clerk (the application) had written SAM on an
 * index card and slipped it in before the model spoke. The model's own vault
 * of weights sits locked and untouched. Last, the card is in your hand: you
 * can read it, correct it, bin it.
 */
const SAYS = ["it remembered me.", "it was written down.", "yours to read. or bin."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The model and its locked vault. */}
      <Lit on={s === 0} off={0.5}>
        <rect x={460} y={150} width={140} height={150} rx={8} fill={D.grey} stroke={D.ink} strokeWidth={4.5} />
        <circle cx={530} cy={225} r={32} fill="none" stroke="#fff" strokeWidth={5} />
        <path d="M530 205 V225 L545 235" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
        {mono(530, 140, "WEIGHTS", 18)}
        {mono(530, 326, "UNCHANGED", 18, D.greyLight)}
      </Lit>

      {/* The clerk: the application, and the card. */}
      <Lit on={s === 1} off={0.35}>
        <rect x={250} y={250} width={180} height={18} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        <Torso x={340} y={196} w={84} h={54} fill={D.teal} />
        <Head x={340} y={156} r={32} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        {mono(340, 110, "APPLICATION", 18, D.teal)}
        <Limb d="M378 214 C 402 208, 420 200, 440 196" fill={D.teal} w={12} />
        <rect x={390} y={210} width={70} height={40} fill="#fff" stroke={D.ink} strokeWidth={2.5} transform="rotate(-6 425 230)" />
        {mono(425, 236, "SAM", 18, D.accent)}
      </Lit>

      {/* You, greeted; then holding the card. */}
      <Torso x={110} y={236} w={100} h={136} fill={D.grey} />
      <Head x={110} y={188} r={40} eyes={s === 0 ? "saucer" : "sleepy"} look={1} mouth="flat" stubble hair="sides" />
      <Show on={s === 0}>
        <path d="M180 120 H300 V170 H220 L200 186 V170 H180 Z" fill="#fff" stroke={D.ink} strokeWidth={3} strokeLinejoin="round" />
        {mono(240, 152, "HI, SAM.", 18)}
      </Show>
      <Show on={s === 2}>
        <Limb d="M152 274 C 176 266, 190 252, 200 236" fill={D.grey} w={13} />
        <rect x={182} y={196} width={80} height={46} fill="#fff" stroke={D.ink} strokeWidth={3} transform="rotate(8 222 219)" />
        {mono(222, 226, "SAM", 18, D.accent)}
        {mono(330, 336, "READ · FIX · DELETE", 18, D.teal)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 110 : i === 1 ? 340 : 110, i === 1 ? 76 : 100, t, 24, i === 2 ? D.teal : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["NOT IN THE MODEL", "THE APPLICATION WROTE IT DOWN", "INSPECT IT, EDIT IT, DELETE IT"][s], 18, D.accent)}
    </Plate>
  );
}
