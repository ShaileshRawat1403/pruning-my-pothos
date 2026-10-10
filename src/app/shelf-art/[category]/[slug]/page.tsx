import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allShelves } from "content-collections";
import { ShelfCover, SHELF_COVER_W, SHELF_COVER_H } from "../../../../components/illustrations/shelf-covers";

/**
 * /shelf-art/<category>/<slug> — source for a Shelf item's cover PNG, not a
 * reader surface. Screenshotted by scripts/export-storyboards.mjs into
 * /covers/shelf/items/<category>/<slug>.png. Noindex, absent from the
 * sitemap, linked from nowhere. Music items keep their album art.
 */

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export const dynamicParams = false;

const drawn = () => allShelves.filter((s) => s._meta.directory !== "music");

export function generateStaticParams() {
  return drawn().map((s) => ({ category: s._meta.directory, slug: s._meta.fileName.replace(/\.md$/, "") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Shelf cover: ${slug}`, robots: { index: false, follow: false } };
}

const CSS = `
body:has(#shelf-art) > *:not(main) { display: none !important; }
main:has(#shelf-art) { padding: 0 !important; margin: 0 !important; }
main:has(#shelf-art) .app-shell { padding: 0 !important; max-width: none !important; }
html:has(#shelf-art), body:has(#shelf-art) { background: #F4F1E8 !important; overflow: hidden !important; }
#shelf-art { width: ${SHELF_COVER_W}px; height: ${SHELF_COVER_H}px; overflow: hidden; }
`;

export default async function ShelfArtPage({ params }: PageProps) {
  const { category, slug } = await params;
  const item = drawn().find((s) => s._meta.directory === category && s._meta.fileName.replace(/\.md$/, "") === slug);
  if (!item) return notFound();
  return (
    <div id="shelf-art" className="no-grain">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ShelfCover category={category} title={item.title} />
    </div>
  );
}
