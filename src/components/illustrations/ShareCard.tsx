import React from "react";
import { C, Model, Gate, Courier, Ledger, Hand, Para, Arrow } from "./kit";

export const SHARE_W = 1200;
export const SHARE_H = 630;

/**
 * The 1200 x 630 link-preview card for a walkthrough and its article: what
 * LinkedIn, X or Slack show when the link is shared. Same cast, same paper,
 * so the preview promises exactly what the page delivers. Exported to PNG by
 * scripts/export-walkthrough-pdf.mjs, because social platforms do not render
 * SVG previews.
 */
export function ShareCard({ title, frames, label }: { title: string; frames: number; label: string }) {
  return (
    <svg viewBox={`0 0 ${SHARE_W} ${SHARE_H}`} className="ill-svg" role="img" aria-label={label}>
      <rect width={SHARE_W} height={SHARE_H} fill={C.paper} />
      <rect width={SHARE_W} height={8} fill={C.ink} />
      <text x={72} y={92} className="ill-mono" fontSize={18} letterSpacing={3} fill={C.accent}>
        AN ILLUSTRATED WALKTHROUGH · {frames} FRAMES
      </text>
      <Para x={72} y={118} w={560} h={380} size={60} weight={800} color={C.ink} lh={1.02}>
        <span style={{ letterSpacing: -2 }}>{title}</span>
      </Para>
      <text x={72} y={574} className="ill-mono" fontSize={18} letterSpacing={2.4} fill={C.muted}>
        PRUNINGMYPOTHOS.COM · SYSTEMS
      </text>

      <Model x={712} y={52} s={1.15} />
      <Hand x={842} y={318} size={36} color={C.accent} anchor="middle">can only ask.</Hand>
      <Gate x={626} y={392} s={0.66} counter="" />
      <Arrow x1={798} x2={838} y={500} />
      <Courier x={846} y={420} s={0.7} />
      <Ledger x={1020} y={468} s={0.45} was="$120" now="$80" />
    </svg>
  );
}
