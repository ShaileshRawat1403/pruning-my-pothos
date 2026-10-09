import React from "react";

/**
 * The logo: the Struck P. A geometric P whose counter is a pothos leaf, with
 * the house's Pruning Mark (one accent strike) across its foot. The owner
 * chose it on 2026-10-09 over The Cut, Bracketed and Pruned Stem, replacing
 * the Deadpan Leaf. Flat shapes in a 64 x 64 box, so it holds at 16px.
 *
 * - Default: inherits the text colour, and the leaf counter takes the page
 *   background (`--bg-color`), so it works in both themes with no disc.
 * - `tile`: ink on a paper square, for the favicon and anywhere the
 *   background is unknown.
 */
const INK = "#1B1A17";
const PAPER = "#EFE5CF";
const ACCENT = "#C0663C";

const P_PATH = "M14 58 V 8 H 34 C 47 8, 54 16, 54 27 C 54 38, 47 46, 34 46 H 24 V 58 Z";
const LEAF_PATH = "M24 38 C 24 26, 30 17, 42 17 C 43 29, 37 38, 24 38 Z";

/** The mark's drawing, for embedding inside another SVG. */
export function StruckPArt({ ink = "currentColor", ground = "var(--bg-color)" }: { ink?: string; ground?: string }) {
  return (
    <g>
      <path d={P_PATH} fill={ink} />
      <path d={LEAF_PATH} fill={ground} />
      <path d="M24 38 L 37 24" stroke={ink} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M6 54 L 34 49" stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
}

export default function StruckP({ size = 32, tile = false, title = "Pruning My Pothos" }: { size?: number; tile?: boolean; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}>
      {tile && <rect width={64} height={64} rx={12} fill={PAPER} />}
      {tile ? (
        <g transform="translate(32 32) scale(0.82) translate(-32 -32)">
          <StruckPArt ink={INK} ground={PAPER} />
        </g>
      ) : (
        <StruckPArt />
      )}
    </svg>
  );
}
