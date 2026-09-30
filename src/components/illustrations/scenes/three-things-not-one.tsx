import React from "react";
import { D, LINE, Head } from "../deadpan";
import { At, Lit, Plate, SceneProps, mono } from "./kit";

/**
 * Three things, not one. A slip of content from outside crosses a line, then
 * reaches a gate, then a fenced yard. Trust is asked at the line, permission
 * at the gate, reach at the fence.
 */
const SLIP = [96, 300, 510];

export default function Scene({ step, id }: SceneProps) {
  const open = step >= 2;
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The trust boundary. */}
      <Lit on={step === 0} off={0.5}>
        <path d="M190 60 V352" stroke={D.ink} strokeWidth={4} strokeDasharray="4 12" strokeLinecap="round" />
        {mono(96, 96, "OUTSIDE", 18, D.greyLight)}
      </Lit>

      {/* The check that runs before the tool does. */}
      <Lit on={step === 1} off={0.5}>
        <rect x={326} y={238} width={66} height={114} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <Head x={359} y={210} r={26} eyes="tt" mouth="flat" stubble hair="messy" />
      </Lit>
      <g style={{ transformBox: "fill-box", transformOrigin: "0% 50%", transform: `rotate(${open ? -68 : 0}deg)`, transition: "transform .5s cubic-bezier(.3,1.3,.5,1)" }}>
        <rect x={394} y={294} width={70} height={12} rx={4} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
      </g>

      {/* How far it can reach. */}
      <Lit on={step === 2} off={0.45}>
        <path d="M470 352 V250 H606 V352" {...LINE} strokeWidth={5} />
        <path d="M470 276 H606 M470 310 H606 M504 250 V352 M538 250 V352 M572 250 V352" stroke={D.ink} strokeWidth={3} />
      </Lit>

      <At x={SLIP[Math.min(step, 2)]} y={step === 2 ? 214 : 264}>
        <rect x={-58} y={-24} width={116} height={48} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M-42 -6 H42 M-42 8 H26" stroke={D.greyLight} strokeWidth={3.5} strokeLinecap="round" />
      </At>

      {mono(96, 392, "TRUSTED?", 18, step === 0 ? D.accent : D.greyLight)}
      {mono(359, 392, "PERMITTED?", 18, step === 1 ? D.accent : D.greyLight)}
      {mono(538, 392, "HOW FAR?", 18, step === 2 ? D.accent : D.greyLight)}
    </Plate>
  );
}
