import type { Metadata } from "next";
import DeadpanLeaf from "../../../components/brand/DeadpanLeaf";

/**
 * /brand-art/icon — source for /favicon.png (512 x 512), not a reader surface.
 * Screenshotted by scripts/export-storyboards.mjs. Noindex, absent from the
 * sitemap, linked from nowhere.
 */
export const metadata: Metadata = { title: "Brand icon", robots: { index: false, follow: false } };

const CSS = `
body:has(#brand-icon) > *:not(main) { display: none !important; }
main:has(#brand-icon) { padding: 0 !important; margin: 0 !important; }
main:has(#brand-icon) .app-shell { padding: 0 !important; max-width: none !important; }
html:has(#brand-icon), body:has(#brand-icon) { background: transparent !important; overflow: hidden !important; }
#brand-icon { width: 512px; height: 512px; }
`;

export default function BrandIcon() {
  return (
    <div id="brand-icon" className="no-grain">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <DeadpanLeaf size={512} disc />
    </div>
  );
}
