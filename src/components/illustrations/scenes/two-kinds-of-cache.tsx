import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Two kinds of cache. Left: the kitchen keeps a pot of stock warm (the
 * repeated prefix) so the cook works faster, but the cook still makes your
 * dish. Right: a waiter who hears a question that sounds familiar and brings
 * someone else's plate from the hatch without telling the kitchen. Last:
 * a ticket book by the hatch: log what was served from it.
 */
const SAYS = ["faster. still cooked for you.", "sounds the same. here's theirs.", "write down what came from the hatch."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* Provider caching: warm stock, still cooked. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={60} y={230} width={100} height={60} rx={6} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <path d="M80 220 q-6 -14 0 -24 M110 216 q-6 -14 0 -24 M140 220 q-6 -14 0 -24" fill="none" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        {mono(110, 312, "PREFIX, WARM", 18)}
        <Torso x={230} y={260} w={70} h={112} fill="#fff" />
        <Head x={230} y={226} r={28} eyes="sleepy" look={-1} mouth="flat" stubble hair="none" />
        {mono(230, 170, "MODEL COOKS", 18, D.teal)}
        {mono(160, 80, "PROVIDER", 18)}
      </Lit>

      {/* The application cache: someone else's plate. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={360} y={150} width={110} height={70} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {mono(415, 190, "HATCH", 18)}
        <Torso x={540} y={260} w={70} h={112} fill={D.teal} />
        <Head x={540} y={226} r={28} eyes="sleepy" look={-1} mouth="smirk" hair="curly" />
        <ellipse cx={480} cy={262} rx={44} ry={12} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(430, 300, "NOT YOURS", 18, D.accent)}
        {mono(480, 80, "YOUR APP", 18)}
      </Lit>

      <Show on={s === 2}>
        <rect x={370} y={100} width={90} height={40} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} />
        {mono(415, 126, "LOG", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : 480, i === 2 ? 356 : 120, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["REUSES COMPUTATION; THE MODEL STILL ANSWERS", "SKIPS THE MODEL ENTIRELY", "SCOPE IT, INVALIDATE IT, LOG IT"][s], 18, D.accent)}
    </Plate>
  );
}
