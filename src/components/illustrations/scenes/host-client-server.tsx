import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Host, client, server. A house (the host: the app you use) with a row of
 * sockets on its outside wall, one per connection (clients). Cables run out
 * to three sheds (servers): FILES, DB, TICKETS. One beat lights each role.
 */
const SHEDS = [
  { y: 90, t: "FILES" },
  { y: 190, t: "DB" },
  { y: 290, t: "TICKETS" },
];
const SAYS = ["the app you actually use.", "one connector per server.", "each one offers something."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The host: a house. */}
      <Lit on={s === 0} off={0.45}>
        <path d="M40 160 L150 80 L260 160 V372 H40 Z" fill="#fff" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        {mono(150, 200, "HOST", 20, D.teal)}
        <Torso x={130} y={320} w={56} h={52} fill={D.grey} />
        <Head x={130} y={296} r={22} eyes="sleepy" look={1} mouth="flat" stubble hair="sides" />
      </Lit>

      {/* Clients: one socket per connection, on the wall. */}
      <Lit on={s === 1} off={0.45}>
        {SHEDS.map((sh) => (
          <g key={sh.t}>
            <rect x={246} y={sh.y + 18} width={30} height={30} rx={4} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
            <path d={`M276 ${sh.y + 33} C 340 ${sh.y + 33}, 380 ${sh.y + 33}, 440 ${sh.y + 33}`} fill="none" stroke={D.ink} strokeWidth={3} strokeDasharray={s >= 1 ? undefined : "6 6"} />
          </g>
        ))}
        {mono(300, 66, "CLIENTS", 18, D.accent)}
      </Lit>

      {/* Servers: three sheds, each offering something. */}
      <Lit on={s === 2} off={0.45}>
        {SHEDS.map((sh) => (
          <g key={sh.t}>
            <path d={`M440 ${sh.y + 66} V${sh.y + 14} L500 ${sh.y - 6} L560 ${sh.y + 14} V${sh.y + 66} Z`} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
            {mono(500, sh.y + 46, sh.t, 18)}
          </g>
        ))}
        {mono(500, 66, "SERVERS", 18, D.accent)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 150 : 400, i === 0 ? 50 : 30, t, 22, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["HOST: THE AI APPLICATION", "CLIENT: A CONNECTOR INSIDE IT", "SERVER: RESOURCES, PROMPTS, TOOLS"][s], 18, D.accent)}
    </Plate>
  );
}
