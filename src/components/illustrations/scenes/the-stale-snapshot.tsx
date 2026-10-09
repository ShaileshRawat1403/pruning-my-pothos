import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The stale snapshot. A polaroid of the answer goes into a drawer. The
 * policy on the wall is rewritten (v1 to v2). The drawer keeps handing out
 * the v1 polaroid to everyone in the queue. Last, a string tied from the
 * policy to the drawer: when the policy changes, the polaroid goes.
 */
const SAYS = ["snap. filed.", "the policy moved on.", "next! here's v1.", "it changes, this goes."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The policy on the wall. */}
      <Lit on={s === 1 || s === 3} off={0.45}>
        <rect x={40} y={60} width={150} height={120} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(115, 92, "POLICY", 18)}
        {mono(115, 130, s >= 1 ? "v2" : "v1", 28, s >= 1 ? D.teal : D.ink)}
      </Lit>

      {/* The cache drawer, and the polaroid. */}
      <Lit on={s === 0 || s === 2} off={0.45}>
        <rect x={250} y={190} width={150} height={120} fill="#C9B593" stroke={D.ink} strokeWidth={4} />
        <rect x={262} y={204} width={126} height={44} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
        {mono(325, 232, "CACHE", 18)}
        <g transform="rotate(-6 325 140)">
          <rect x={285} y={100} width={80} height={86} fill="#fff" stroke={D.ink} strokeWidth={3} />
          <rect x={293} y={108} width={64} height={52} fill={D.paperDeep} />
          {mono(325, 140, "v1", 20)}
        </g>
      </Lit>

      {/* The queue being served v1. */}
      <Lit on={s === 2} off={0.25}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Torso x={470 + i * 52} y={300} w={42} h={72} fill={i % 2 ? D.teal : D.grey} />
            <Head x={470 + i * 52} y={278} r={18} eyes="sleepy" look={-1} mouth="flat" hair={i % 2 ? "curly" : "sides"} />
          </g>
        ))}
      </Lit>

      {/* Invalidation on purpose. */}
      <Show on={s === 3}>
        <path d="M190 150 C 230 160, 250 180, 300 200" fill="none" stroke={D.accent} strokeWidth={3.5} strokeDasharray="6 5" />
        <path d="M280 110 L370 180 M370 110 L280 180" stroke={D.accent} strokeWidth={5} strokeLinecap="round" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 2 ? 520 : 470, i === 2 ? 230 : 90, t, 24, i === 3 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["AN ANSWER IS STORED", "THE MATERIAL CHANGES", "THE OLD ONE KEEPS GOING OUT", "INVALIDATE ON PURPOSE"][s], 18, D.accent)}
    </Plate>
  );
}
