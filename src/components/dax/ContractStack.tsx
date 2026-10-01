"use client";

import { D, DeadpanDefs, Paper, Ink, Sheet, Label } from "../illustrations/deadpan";
import { Stamp } from "../illustrations/props";
import { Gate } from "../illustrations/kit";

const LAYERS = [
  { label: "Intent", y: 72, r: -4 },
  { label: "Policy", y: 118, r: -1.5 },
  { label: "Approval", y: 164, r: 1.5 },
  { label: "Evidence", y: 210, r: 3.5 },
] as const;

const W = 340;
const H = 300;

/**
 * Deadpan contract plate: four paper layers the run must pass, with an ASK
 * stamp on Approval. Flat ink on aged paper. Replaces the old brass 3D stack.
 * Claims nothing beyond the product page: policy can pause before mutation.
 */
export default function ContractStack() {
  return (
    <figure className="dax-hero-plate m-0 w-full max-w-[340px] ml-auto" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" role="img">
        <title>Contract layers: Intent, Policy, Approval, Evidence</title>
        <DeadpanDefs id="dax-contract" />
        <Paper id="dax-contract" w={W} h={H} />
        <Ink id="dax-contract">
          {LAYERS.map((l) => (
            <Sheet key={l.label} x={48} y={l.y} w={180} h={56} title={l.label} lines={2} r={l.r} />
          ))}
          <Stamp x={168} y={148} text="ASK" w={88} size={18} rotate={-12} color={D.accent} />
          <g transform="translate(210 48) scale(0.42)">
            <Gate x={0} y={0} counter="POLICY" />
          </g>
          <Label x={170} y={278} text="the contract, not the chat" size={13} color={D.grey} r={-1} />
        </Ink>
      </svg>
      <figcaption className="dax-stage-caption">Contract layers</figcaption>
    </figure>
  );
}
