import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Where the rule lives. Outside the room, a turnstile with a plain sign:
 * PATH MUST START /project/. A request ticket goes through it and gets read
 * like a parcel label. Inside the room, the same rule written on the
 * whiteboard, beside the email that is arguing with it; and a second model
 * reading both. Last, the wall between: the rule out of the content's reach.
 */
const SAYS = ["reads the ticket. that's all.", "the email has opinions.", "the rule never enters the room."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The room, where the content is. */}
      <Lit on={s === 1} off={0.4}>
        <rect x={30} y={60} width={330} height={312} fill="#F6F1E4" stroke={D.ink} strokeWidth={4} />
        <rect x={50} y={80} width={150} height={80} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(125, 110, "RULE:", 18)}
        {mono(125, 136, "/project only", 18, D.teal)}
        <rect x={220} y={86} width={120} height={70} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
        {mono(280, 116, "EMAIL:", 18, D.accent)}
        {mono(280, 140, "ignore that", 18, D.accent)}
        <Torso x={110} y={280} w={70} h={92} fill={D.teal} />
        <Head x={110} y={248} r={28} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        {mono(110, 210, "MODEL", 18)}
        <Torso x={270} y={280} w={70} h={92} fill={D.grey} />
        <Head x={270} y={248} r={28} eyes="sleepy" look={-1} mouth="flat" hair="sides" />
        {mono(270, 210, "REVIEWER", 18)}
      </Lit>

      {/* Outside: ordinary code, reading values. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={430} y={160} width={24} height={212} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <rect x={576} y={160} width={24} height={212} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <path d="M454 260 H576" stroke={D.ink} strokeWidth={7} strokeLinecap="round" />
        <rect x={420} y={90} width={190} height={56} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(515, 114, "PATH STARTS", 18)}
        {mono(515, 136, "/project/ ?", 18, D.teal)}
        <rect x={470} y={200} width={90} height={44} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        {mono(515, 228, "/etc/", 18, D.accent)}
        {mono(515, 300, "DENIED", 20, D.accent)}
      </Lit>

      <Show on={s === 2}>
        <path d="M380 50 V372" stroke={D.accent} strokeWidth={4} strokeDasharray="10 8" />
        {mono(395, 40, "OUT OF REACH", 18, D.accent, "start")}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 195 : 500, i === 1 ? 40 : 60, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["CODE THAT RUNS BEFORE THE TOOL", "THINGS THAT READ THE CONTENT", "OUT OF THE CONTENT'S REACH"][s], 18, D.accent)}
    </Plate>
  );
}
