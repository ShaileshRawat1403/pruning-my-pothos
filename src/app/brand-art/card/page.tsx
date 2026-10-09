import type { Metadata } from "next";
import { D, DeadpanDefs, Paper } from "../../../components/illustrations/deadpan";
import { StruckPArt } from "../../../components/brand/StruckP";

/**
 * /brand-art/card — source for /og-default.png (1200 x 630), the share card
 * for any page without its own. Screenshotted by
 * scripts/export-storyboards.mjs. Noindex, absent from the sitemap, linked
 * from nowhere.
 */
export const metadata: Metadata = { title: "Brand card", robots: { index: false, follow: false } };

const CSS = `
body:has(#brand-card) > *:not(main) { display: none !important; }
main:has(#brand-card) { padding: 0 !important; margin: 0 !important; }
main:has(#brand-card) .app-shell { padding: 0 !important; max-width: none !important; }
html:has(#brand-card), body:has(#brand-card) { background: #F4F1E8 !important; overflow: hidden !important; }
#brand-card { width: 1200px; height: 630px; overflow: hidden; }
`;

export default function BrandCard() {
  return (
    <div id="brand-card" className="no-grain">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <svg viewBox="0 0 1200 630" width={1200} height={630} className="ill-svg" role="img" aria-label="Pruning My Pothos: applied AI systems, explained and drawn.">
        <DeadpanDefs id="brand-card" />
        <Paper id="brand-card" w={1200} h={630} />
        <rect width={1200} height={8} fill={D.ink} />
        <g transform="translate(110 150) scale(5.2)">
          <StruckPArt ink={D.ink} ground={D.paper} />
        </g>
        <text x={520} y={250} style={{ fontFamily: "var(--font-heading)" }} fontSize={64} fontWeight={800} fill={D.ink} letterSpacing={-1.2}>
          Pruning My Pothos
        </text>
        <text x={524} y={318} className="ill-hand" fontSize={42} fontWeight={700} fill={D.accent}>
          Cut the claims. Keep the craft.
        </text>
        <text x={524} y={390} className="ill-mono" fontSize={22} letterSpacing={2} fill={D.grey}>
          APPLIED AI SYSTEMS, EXPLAINED AND DRAWN
        </text>
        <text x={524} y={560} className="ill-mono" fontSize={18} letterSpacing={2.4} fill={D.greyLight}>
          PRUNINGMYPOTHOS.COM
        </text>
      </svg>
    </div>
  );
}
