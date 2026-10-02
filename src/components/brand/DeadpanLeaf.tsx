import React from "react";

/**
 * The logo: the Deadpan Leaf. A pothos leaf with the house's tired,
 * half-lidded eyes and a flat mouth (docs/VISUAL_TRACK.md, step 2; the owner
 * chose it on 2026-10-02). Drawn crisp in a 64 x 64 box, no wobble filter, so
 * it holds at 16px. On dark backgrounds put it on a paper disc (`disc`): the
 * ink outline disappears against the dark header otherwise.
 */
const INK = "#1B1A17";
const LEAF = "#6FA38F";
const LEAF_DARK = "#4E8270";
const FACE = "#FBF5E8";
const PAPER = "#EFE5CF";

const LEAF_PATH = "M32 58 C 15 50, 6 34, 11 21 C 15 12, 25 10, 32 17 C 39 10, 50 12, 53 21 C 58 34, 49 50, 32 58 Z";

function Eye({ x }: { x: number }) {
  return (
    <g>
      <circle cx={x} cy={33} r={5} fill={FACE} stroke={INK} strokeWidth={2.2} />
      <circle cx={x + 1} cy={34.5} r={2.2} fill={INK} />
      <path d={`M${x - 5.6} 33 A 5.6 5.6 0 0 1 ${x + 5.6} 33 Z`} fill={LEAF_DARK} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
    </g>
  );
}

/** The mark's drawing, for embedding inside another SVG. */
export function DeadpanLeafArt({ disc = false }: { disc?: boolean }) {
  return (
    <g>
      {disc && <circle cx={32} cy={32} r={32} fill={PAPER} />}
      <g transform={disc ? "translate(32 32) scale(0.8) translate(-32 -32)" : undefined}>
        <g transform="rotate(188 32 34)">
          <path d="M32 17 C 32 10, 30 6, 26 3" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
          <path d={LEAF_PATH} fill={LEAF} stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
        </g>
        <Eye x={25} />
        <Eye x={39} />
        <path d="M27 43 H37" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      </g>
    </g>
  );
}

export default function DeadpanLeaf({ size = 32, disc = false, title = "Pruning My Pothos" }: { size?: number; disc?: boolean; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}>
      <DeadpanLeafArt disc={disc} />
    </svg>
  );
}
