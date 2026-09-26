"use client";

import { D, DeadpanDefs, Paper, Ink, Label } from "../illustrations/deadpan";
import { Crate } from "../illustrations/props";

const CRATES = [
  "dax-core",
  "dax-policy",
  "dax-audit",
  "dax-ledger",
  "dax-indexer",
] as const;

const W = 280;
const H = 340;

/** Flat deadpan proof-ladder crates. Replaces the old 3D cascade. */
export default function CrateCascade() {
  return (
    <figure className="dax-crate-plate m-0 w-full max-w-[280px] mx-auto" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" role="img">
        <title>Proof ladder crates</title>
        <DeadpanDefs id="dax-crates" />
        <Paper id="dax-crates" w={W} h={H} />
        <Ink id="dax-crates">
          {CRATES.map((name, i) => (
            <Crate
              key={name}
              x={36 + (i % 2) * 10}
              y={28 + i * 52}
              w={190}
              h={58}
              label={name}
              size={15}
            />
          ))}
          <Label x={140} y={320} text="Rust decides the facts" size={12} color={D.grey} />
        </Ink>
      </svg>
    </figure>
  );
}
