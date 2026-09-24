import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allSystems } from "content-collections";
import { ArticleCover, COVER_W, COVER_H } from "../../../components/illustrations/covers";
import { coverKicker } from "../../../lib/content/covers";

/**
 * /cover-art/<slug> — source for an article's link-preview PNG, not a reader
 * surface. Screenshotted by scripts/export-storyboards.mjs into
 * /covers/systems/<slug>.png. Noindex, absent from the sitemap, linked from
 * nowhere.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return allSystems.map((s) => ({ slug: s._meta.path }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Cover: ${slug}`, robots: { index: false, follow: false } };
}

const CSS = `
body:has(#cover-art) > *:not(main) { display: none !important; }
main:has(#cover-art) { padding: 0 !important; margin: 0 !important; }
main:has(#cover-art) .app-shell { padding: 0 !important; max-width: none !important; }
html:has(#cover-art), body:has(#cover-art) { background: #F4F1E8 !important; overflow: hidden !important; }
#cover-art { width: ${COVER_W}px; height: ${COVER_H}px; overflow: hidden; }
`;

export default async function CoverArtPage({ params }: PageProps) {
  const { slug } = await params;
  const system = allSystems.find((s) => s._meta.path === slug);
  if (!system) return notFound();
  return (
    <div id="cover-art">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ArticleCover slug={slug} title={system.title} kicker={coverKicker(slug)} />
    </div>
  );
}
