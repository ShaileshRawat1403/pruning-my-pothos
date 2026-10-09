import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A button is a request. Inside the frame: a big BOOK button; pressing it
 * produces a ticket, nothing more. Outside the frame, in another room
 * entirely: a desk that reads the ticket and decides (now, for you, in this
 * state), and a side door marked API that never had a button on it. Last,
 * the frame of the interface itself.
 */
const SAYS = ["pressed. a ticket is printed.", "decided over here. also: a side door.", "the screen offers. elsewhere decides."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The interface. */}
      <Lit on={s !== 1} off={0.45}>
        <rect x={40} y={70} width={250} height={250} rx={10} fill="#fff" stroke={s === 2 ? D.accent : D.ink} strokeWidth={s === 2 ? 5 : 4} />
        <rect x={90} y={150} width={150} height={60} rx={10} fill={D.leaf} stroke={D.ink} strokeWidth={4} />
        {mono(165, 188, "BOOK", 22, "#fff")}
        <rect x={120} y={234} width={90} height={40} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        {mono(165, 260, "REQUEST", 18)}
        {mono(165, 104, "THE INTERFACE", 18, D.greyLight)}
      </Lit>

      {/* Elsewhere: the decision, and the other way in. */}
      <Lit on={s === 1} off={0.4}>
        <rect x={340} y={250} width={180} height={18} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        <path d="M352 268 V372 M508 268 V372" stroke={D.ink} strokeWidth={5} />
        <Torso x={430} y={210} w={70} h={40} fill={D.grey} />
        <Head x={430} y={184} r={26} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
        <rect x={334} y={70} width={192} height={84} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(430, 98, "PERMITTED NOW?", 18)}
        {mono(430, 122, "FOR THIS PERSON?", 18)}
        {mono(430, 146, "IN THIS STATE?", 18)}
        <rect x={548} y={180} width={62} height={192} fill="#C9B593" stroke={D.ink} strokeWidth={4} />
        {mono(579, 166, "API", 18, D.accent)}
      </Lit>

      <Show on={s >= 1}>
        <path d="M212 254 C 280 254, 300 260, 340 258" fill="none" stroke={D.ink} strokeWidth={3} strokeDasharray="6 6" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 165 : 440, i === 0 ? 46 : 46, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT IT OFFERS", "DECIDED ELSEWHERE", "HIDING A BUTTON ENFORCES NOTHING"][s], 18, D.accent)}
    </Plate>
  );
}
