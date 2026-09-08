import { allShelves } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../../lib/seo/jsonld";
import { renderMarkdown } from "../../../../lib/markdown";
import ResourceLinks from "../../../../components/ResourceLinks";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return allShelves.map((item) => {
    const slug = item._meta.fileName.replace(/\.mdx?$/, "");
    return {
      category: item._meta.directory,
      slug: slug,
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const item = allShelves.find(
    (s) => 
      s._meta.directory === category && 
      s._meta.fileName.replace(/\.mdx?$/, "") === slug
  );
  if (!item) return {};

  return constructMetadata({
    title: item.seoTitle ?? item.title,
    description: item.description,
    image: item.coverUrl,
    path: `/shelf/${category}/${slug}`,
    ogType: "article"
  });
}

export default async function ShelfDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  
  const item = allShelves.find(
    (s) => 
      s._meta.directory === category && 
      s._meta.fileName.replace(/\.mdx?$/, "") === slug
  );

  if (!item) {
    return notFound();
  }

  const webpageSchema = getWebPageSchema({
    title: `${item.title} | Pruning My Pothos`,
    description: item.description,
    path: `/shelf/${category}/${slug}`,
    image: item.coverUrl,
  });

  return (
    <article className="sentiments-scope max-w-[700px] mx-auto py-12 flex flex-col gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      {/* Category header */}
      <span className="text-[10px] font-mono font-bold uppercase text-[color:var(--text-primary)] tracking-widest self-start">
        Shelf &bull; {category}
      </span>
      
      {/* Title */}
      <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[color:var(--text-primary)] leading-snug">
        {item.title}
      </h1>

      {/* Description */}
      <p className="text-[color:var(--text-secondary)] font-medium italic border-l-2 border-accent-cyan/40 pl-4 py-1 text-sm sm:text-base">
        {item.description}
      </p>

      {/* Cover Image — local covers are landscape-authored (decks, tools, notes),
          external Apple Music art is square. Frame each so nothing gets cropped. */}
      {item.coverUrl && (
        item.coverUrl.startsWith("/covers/") ? (
          <figure className="w-full max-w-[420px] overflow-hidden rounded-lg border border-[color:var(--card-border)] aspect-video my-4 shadow-none self-center sm:self-start bg-[color:var(--card-bg)]">
            <img
              src={item.coverUrl}
              alt={item.coverAlt ?? item.description ?? item.title}
              className="w-full h-full object-contain"
            />
          </figure>
        ) : (
          <figure className="w-full max-w-[280px] overflow-hidden rounded-lg border border-[color:var(--card-border)] aspect-[3/4] my-4 shadow-none self-center sm:self-start">
            <img
              src={item.coverUrl}
              alt={item.coverAlt ?? item.description ?? item.title}
              className="w-full h-full object-cover"
            />
          </figure>
        )
      )}

      {/* Special Category Info (e.g. Music Album/Artist) */}
      {(item.artist || item.album || item.year) && (
        <div className="border border-[color:var(--card-border)] p-4 rounded-lg bg-[color:var(--bg-color)] flex flex-col gap-1 text-sm font-mono my-2 text-[color:var(--text-secondary)]">
          {item.artist && <div><strong className="text-[color:var(--text-primary)]">Artist:</strong> {item.artist}</div>}
          {item.album && <div><strong className="text-[color:var(--text-primary)]">Album:</strong> {item.album}</div>}
          {item.year && <div><strong className="text-[color:var(--text-primary)]">Released:</strong> {item.year}</div>}
        </div>
      )}

      {/* Resource Highlights */}
      {item.resourceHighlights && item.resourceHighlights.length > 0 && (
        <div className="flex flex-col gap-2 my-4">
          <h3 className="font-heading text-sm font-bold text-[color:var(--text-primary)]">Resource Highlights</h3>
          <ul className="list-disc pl-5 text-xs text-[color:var(--text-secondary)] flex flex-col gap-1.5">
            {item.resourceHighlights.map((hl, idx) => (
              <li key={idx}>{hl}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <div 
        className="content-body max-w-none text-sm sm:text-base leading-relaxed text-[color:var(--text-secondary)] mt-4"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(item.content) }}
      />

      {/* Dynamic PDFs or external embeds */}
      <ResourceLinks
        title={item.title}
        pdfUrl={item.pdfUrl}
        videoUrl={item.videoUrl}
        appleMusicUrl={item.appleMusicUrl}
      />

      {/* Tag lists */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 border border-[color:var(--card-border)] bg-[color:var(--bg-color)] rounded-full text-xs font-mono text-[color:var(--text-secondary)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Navigation back */}
      <div className="border-t border-[color:var(--card-border)] pt-8 mt-12 flex justify-between items-center text-xs font-mono">
        <Link href={`/shelf`} className="text-[color:var(--text-primary)] hover:underline font-semibold">
          &larr; Back to Shelf
        </Link>
      </div>
    </article>
  );
}
