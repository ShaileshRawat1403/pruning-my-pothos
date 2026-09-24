import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoryboards, getStoryboard } from "../../../../lib/content/storyboards";
import { Frame } from "../../../../components/illustrations/registry";

/**
 * /storyboards/<slug>/print — the PDF source, not a reader surface.
 *
 * scripts/export-storyboards.mjs prints this page with headless Chrome to
 * produce the downloadable deck, one 1080 x 1350 page per frame, from exactly
 * the frames the viewer shows. Noindex, absent from the sitemap, linked from
 * nowhere; it builds only because the export builds every route.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getStoryboards().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const w = getStoryboard(slug);
  return {
    title: w ? `${w.title} (print)` : "Print",
    robots: { index: false, follow: false },
  };
}

const PRINT_CSS = `
@page { size: 1080px 1350px; margin: 0; }
body:has(#storyboard-print) > *:not(main) { display: none !important; }
main:has(#storyboard-print) { padding: 0 !important; margin: 0 !important; }
main:has(#storyboard-print) .app-shell { padding: 0 !important; max-width: none !important; }
html:has(#storyboard-print), body:has(#storyboard-print) { background: #F4F1E8 !important; }
#storyboard-print .print-page { width: 1080px; height: 1350px; overflow: hidden; break-after: page; }
#storyboard-print .print-page:last-child { break-after: auto; }
`;

export default async function StoryboardPrintPage({ params }: PageProps) {
  const { slug } = await params;
  const w = getStoryboard(slug);
  if (!w) return notFound();
  const total = w.frames.length;
  return (
    <div id="storyboard-print">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      {w.frames.map((f, i) => (
        <div key={f.key} className="print-page">
          <Frame frameKey={f.key} label={f.text} number={i + 1} total={total} />
        </div>
      ))}
    </div>
  );
}
