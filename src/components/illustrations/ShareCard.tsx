import React from "react";
import { C, Para } from "./kit";
import { Emblem } from "./emblems";

export const SHARE_W = 1200;
export const SHARE_H = 630;

/**
 * The 1200 x 630 link-preview card for a storyboard and its article: what
 * LinkedIn, X or Slack show when the link is shared. It carries the article's
 * emblem, the same drawing as the storyboard's first frame, so the preview
 * promises exactly what the page delivers. Exported to PNG by
 * scripts/export-storyboards.mjs, because social platforms do not render
 * SVG previews.
 */
export function ShareCard({ slug, title, frames, label }: { slug: string; title: string; frames: number; label: string }) {
  return (
    <svg viewBox={`0 0 ${SHARE_W} ${SHARE_H}`} className="ill-svg" role="img" aria-label={label}>
      <rect width={SHARE_W} height={SHARE_H} fill={C.paper} />
      <rect width={SHARE_W} height={8} fill={C.ink} />
      <text x={72} y={92} className="ill-mono" fontSize={18} letterSpacing={3} fill={C.accent}>
        A STORYBOARD IN {frames} FRAMES
      </text>
      <Para x={72} y={118} w={560} h={380} size={60} weight={800} color={C.ink} lh={1.02}>
        <span style={{ letterSpacing: -2 }}>{title}</span>
      </Para>
      <text x={72} y={574} className="ill-mono" fontSize={18} letterSpacing={2.4} fill={C.muted}>
        PRUNINGMYPOTHOS.COM · SYSTEMS
      </text>

      <Emblem slug={slug} x={660} y={44} />
    </svg>
  );
}
