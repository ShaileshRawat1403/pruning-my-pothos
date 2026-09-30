import React from "react";
import { D, LINE, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, mono } from "./kit";

/**
 * The tool-use loop, in the restaurant from the cover. The customer asks, the
 * waiter writes a slip, the kitchen decides whether to cook it and cooks it,
 * and the result comes back the way the order went.
 */
const SLIP: [number, number][] = [
  [150, 150],
  [338, 232],
  [470, 232],
  [150, 232],
];

export default function Scene({ step, id }: SceneProps) {
  const [sx, sy] = SLIP[Math.min(step, 3)];
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The customer. */}
      <Lit on={step === 0 || step === 3} off={0.5}>
        <Torso x={70} y={252} w={84} h={100} fill={D.shirt} />
        <Head x={70} y={210} r={34} eyes="sleepy" look={1} hair="sides" />
      </Lit>

      {/* The waiter: takes the order, carries the slip. */}
      <Lit on={step === 1 || step === 3} off={0.5}>
        <Torso x={250} y={252} w={84} h={100} fill={D.teal} />
        <Head x={250} y={210} r={34} eyes="saucer" look={1} mouth="grin" hair="curly" />
      </Lit>

      {/* The kitchen: a wall, a hatch, and the one who decides. */}
      <Lit on={step === 2} off={0.5}>
        <rect x={410} y={60} width={210} height={292} fill="#E8E4DA" stroke={D.ink} strokeWidth={4.5} />
        <rect x={430} y={170} width={120} height={84} fill={D.ink} />
        <rect x={420} y={252} width={140} height={14} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        <Head x={520} y={206} r={30} eyes="sleepy" look={-1} stubble />
        <path d="M494 176 C 492 150, 506 142, 520 146 C 534 142, 548 150, 546 176 Z" fill="#fff" stroke={D.ink} strokeWidth={4} />
        <g style={{ opacity: step === 2 ? 1 : 0, transition: "opacity .3s .25s" }}>
          <path d="M572 292 L590 286 L608 292 V320 L590 314 L572 320 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
          <path d="M578 304 l 6 6 l 12 -14" {...LINE} stroke={D.accent} strokeWidth={4.5} />
        </g>
      </Lit>

      {/* The slip: a question, an order, then a result. */}
      <At x={sx} y={sy}>
        <rect x={-46} y={-22} width={92} height={44} fill={step === 3 ? D.leaf : "#fff"} stroke={D.ink} strokeWidth={4} strokeDasharray={step === 1 ? "8 6" : undefined} style={{ transition: "fill .3s" }} />
        {mono(0, 7, ["REFUND?", "ORDER", "ORDER", "RESULT"][Math.min(step, 3)], 18)}
      </At>

      {mono(320, 392, ["ASKED", "A REQUEST. NOTHING HAS RUN", "THIS CODE DECIDES, THEN RUNS IT", "THE RESULT COMES BACK"][Math.min(step, 3)], 18, D.accent)}
    </Plate>
  );
}
