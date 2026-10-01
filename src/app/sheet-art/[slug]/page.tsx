import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SheetCover } from "../../../components/illustrations/sheets";
import { REFERENCE_SHEETS } from "../../../lib/content/reference-sheets";

/**
 * /sheet-art/<slug> — source for a Works On My Prompt sheet's link-preview
 * PNG, not a reader surface. Screenshotted by scripts/export-storyboards.mjs
 * into /covers/sheets/<slug>.png. Noindex, absent from the sitemap, linked
 * from nowhere. The still cover: no film.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

// A static export needs at least one path; "_" renders the 404 page.
export function generateStaticParams() {
  return REFERENCE_SHEETS.length > 0 ? REFERENCE_SHEETS.map((s) => ({ slug: s.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Sheet cover: ${slug}`, robots: { index: false, follow: false } };
}

const CSS = `
body:has(#sheet-art) > *:not(main) { display: none !important; }
main:has(#sheet-art) { padding: 0 !important; margin: 0 !important; }
main:has(#sheet-art) .app-shell { padding: 0 !important; max-width: none !important; }
html:has(#sheet-art), body:has(#sheet-art) { background: #F4F1E8 !important; overflow: hidden !important; }
#sheet-art { width: 1200px; height: 630px; overflow: hidden; }
`;

export default async function SheetArtPage({ params }: PageProps) {
  const { slug } = await params;
  const sheet = REFERENCE_SHEETS.find((s) => s.slug === slug);
  if (!sheet) return notFound();
  return (
    <div id="sheet-art" className="no-grain">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <SheetCover slug={sheet.slug} type={sheet.type} title={sheet.title} promise={sheet.promise} quip={sheet.quip} />
    </div>
  );
}
