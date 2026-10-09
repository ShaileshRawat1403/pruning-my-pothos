import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Enumerable or not. Left: a railway map with three lines, every station
 * labelled, one line ending at a buffer stop marked TO A PERSON. Right: a
 * hiker's map where the route is drawn as it goes, a dotted squiggle that
 * branches with each answer, no list of routes possible. Last: rigid and
 * reviewable are the same thing.
 */
const SAYS = ["every route printed.", "the route is drawn as it goes.", "rigid = reviewable."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* The railway: every path written. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={30} y={70} width={270} height={250} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M60 190 H150 L200 120 H270 M150 190 H270 M150 190 L200 260 H240" fill="none" stroke={D.teal} strokeWidth={6} strokeLinejoin="round" />
        {[[60, 190], [150, 190], [200, 120], [270, 120], [270, 190], [200, 260]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={8} fill="#fff" stroke={D.ink} strokeWidth={3} />
        ))}
        <path d="M240 248 V272 M232 248 H248" stroke={D.accent} strokeWidth={5} strokeLinecap="round" />
        {mono(240, 296, "TO A PERSON", 18, D.accent)}
        {mono(165, 98, "WORKFLOW", 18)}
      </Lit>

      {/* The hike: drawn as it goes. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={340} y={70} width={270} height={250} fill="#F6F1E4" stroke={D.ink} strokeWidth={4} />
        <path d="M370 290 C 400 250, 380 220, 420 210 C 460 200, 440 160, 480 150 C 520 140, 500 110, 560 100" fill="none" stroke={D.accent} strokeWidth={4} strokeDasharray="6 6" />
        <path d="M420 210 C 450 230, 500 240, 520 270 M480 150 C 520 170, 560 180, 580 210" fill="none" stroke={D.greyLight} strokeWidth={3} strokeDasharray="5 7" />
        {mono(475, 98, "AGENT-LIKE", 18)}
        {mono(560, 136, "?", 22, D.accent)}
        {mono(530, 266, "?", 22, D.greyLight)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 165 : i === 1 ? 475 : 320, i === 2 ? 360 : 52, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ENUMERABLE, TESTABLE, RIGID", "FLEXIBLE, HARD TO REPRODUCE", "THE SAME PROPERTY"][s], 18, D.accent)}
    </Plate>
  );
}
