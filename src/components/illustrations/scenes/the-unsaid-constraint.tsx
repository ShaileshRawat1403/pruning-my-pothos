import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The unsaid constraint. A work ticket: ADD RBAC TO DASHBOARD. The agent
 * walks into the dashboard room and does it. On the way back, through the
 * shared middleware corridor, it rearranges the BILLING room too. Last, the
 * thought bubble over the person who wrote the ticket: DON'T TOUCH BILLING,
 * which was never on the ticket.
 */
const ROOMS = [
  { x: 150, t: "DASHBOARD" },
  { x: 490, t: "BILLING" },
];
const SAYS = ["add access control. that's all it says.", "done.", "while it was there.", "it was in my head."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Two rooms off one shared corridor. */}
      {ROOMS.map((r, i) => (
        <Lit key={r.t} on={(i === 0 && s === 1) || (i === 1 && s === 2)} off={0.5}>
          <rect x={r.x - 110} y={150} width={220} height={140} fill="#fff" stroke={D.ink} strokeWidth={4} />
          {mono(r.x, 176, r.t, 18, i === 1 && s >= 2 ? D.accent : D.ink)}
          {i === 0 && s >= 1 && <rect x={r.x - 40} y={196} width={80} height={30} rx={4} fill="#DDEFE6" stroke={D.leaf} strokeWidth={2.5} />}
          {i === 0 && s >= 1 && mono(r.x, 217, "ROLES", 18, D.leaf)}
          {i === 1 && s >= 2 && (
            <g>
              <rect x={r.x - 60} y={210} width={50} height={40} fill={D.paperDeep} stroke={D.ink} strokeWidth={2.5} transform="rotate(-14 455 230)" />
              <rect x={r.x + 6} y={204} width={50} height={40} fill={D.paperDeep} stroke={D.ink} strokeWidth={2.5} transform="rotate(10 520 224)" />
            </g>
          )}
        </Lit>
      ))}
      <rect x={260} y={210} width={120} height={50} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
      {mono(320, 241, "MIDDLEWARE", 18)}

      {/* The ticket. */}
      <Lit on={s === 0} off={0.5}>
        <rect x={40} y={50} width={220} height={60} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        {mono(150, 76, "TICKET:", 18)}
        {mono(150, 98, "RBAC, DASHBOARD", 18, D.teal)}
      </Lit>

      {/* The agent, moving through. */}
      <At x={s === 0 ? 0 : s === 1 ? 110 : s === 2 ? 420 : 420}>
        <Torso x={40} y={320} w={50} h={52} fill={D.teal} />
        <Head x={40} y={300} r={20} eyes="sleepy" look={1} mouth="flat" hair="curly" />
      </At>

      {/* What was in someone's head. */}
      <Show on={s === 3}>
        <Torso x={580} y={110} w={50} h={44} fill={D.grey} />
        <Head x={580} y={90} r={20} eyes="tt" look={-1} mouth="flat" stubble hair="sides" />
        <ellipse cx={440} cy={70} rx={100} ry={34} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <circle cx={540} cy={90} r={5} fill="#fff" stroke={D.ink} strokeWidth={2} />
        {mono(440, 76, "NOT BILLING!", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i && i !== 3}>
          {hand(i === 0 ? 400 : 320, i === 0 ? 86 : 120, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      <Show on={s === 3}>{hand(320, 130, SAYS[3], 22, D.accent)}</Show>
      {mono(320, 404, ["THE REQUEST", "IT DOES IT", "IT ALSO TOUCHES BILLING", "NOBODY SAID NOT TO"][s], 18, D.accent)}
    </Plate>
  );
}
