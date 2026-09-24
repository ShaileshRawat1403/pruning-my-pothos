import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoryboards, getStoryboard } from "../../../../lib/content/storyboards";
import { ShareCard, SHARE_W, SHARE_H } from "../../../../components/illustrations/ShareCard";

/**
 * /storyboards/<slug>/share — source for the link-preview PNG, not a reader
 * surface. Screenshotted by scripts/export-storyboards.mjs. Noindex,
 * absent from the sitemap, linked from nowhere.
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
  return { title: w ? `${w.title} (share card)` : "Share card", robots: { index: false, follow: false } };
}

const SHARE_CSS = `
body:has(#storyboard-share) > *:not(main) { display: none !important; }
main:has(#storyboard-share) { padding: 0 !important; margin: 0 !important; }
main:has(#storyboard-share) .app-shell { padding: 0 !important; max-width: none !important; }
html:has(#storyboard-share), body:has(#storyboard-share) { background: #F4F1E8 !important; overflow: hidden !important; }
#storyboard-share { width: ${SHARE_W}px; height: ${SHARE_H}px; overflow: hidden; }
`;

export default async function StoryboardSharePage({ params }: PageProps) {
  const { slug } = await params;
  const w = getStoryboard(slug);
  if (!w) return notFound();
  return (
    <div id="storyboard-share">
      <style dangerouslySetInnerHTML={{ __html: SHARE_CSS }} />
      <ShareCard title={w.title} frames={w.frames.length} label={`${w.title}: a storyboard`} />
    </div>
  );
}
