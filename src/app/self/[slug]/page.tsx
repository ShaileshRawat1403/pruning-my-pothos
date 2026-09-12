import { allSelves } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";
import { renderArticleSegments } from "../../../lib/visual-segments";
import type { Visual, ProvenanceSource } from "../../../lib/visual-types";
import VisualBlock from "../../../components/visuals/VisualBlock";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return allSelves.map((selfItem) => ({
    slug: selfItem._meta.path,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const selfItem = allSelves.find((s) => s._meta.path === slug);
  if (!selfItem) return {};

  return constructMetadata({
    title: selfItem.title,
    description: selfItem.description,
    image: selfItem.heroImage,
    path: `/self/${slug}`,
    ogType: "article"
  });
}

export default async function SelfDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const selfItem = allSelves.find((s) => s._meta.path === slug);

  if (!selfItem) {
    return notFound();
  }

  const webpageSchema = getWebPageSchema({
    title: `${selfItem.title} | Pruning My Pothos`,
    description: selfItem.description,
    path: `/self/${slug}`,
    image: selfItem.heroImage,
  });

  return (
    <article className="sentiments-scope max-w-[700px] mx-auto py-12 flex flex-col gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      {/* Date Header */}
      <span className="text-[10px] font-mono font-bold uppercase text-[color:var(--text-primary)] tracking-widest self-start">
        Published: {new Date(selfItem.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        {selfItem.readingTime ? ` / ${selfItem.readingTime} min read` : ""}
        {selfItem.difficulty ? ` / ${selfItem.difficulty}` : ""}
      </span>
      
      {/* Title */}
      <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[color:var(--text-primary)] leading-snug">
        {selfItem.title}
      </h1>

      {/* Description / Summary */}
      <p className="text-[color:var(--text-secondary)] font-medium italic border-l-2 border-accent-pink/40 pl-4 py-1 text-sm sm:text-base">
        {selfItem.description}
      </p>

      {/* Hero Image */}
      {selfItem.heroImage && (
        <figure className="w-full overflow-hidden rounded-sm border border-[color:var(--card-border)] max-h-[360px] my-4">
          <img
            src={selfItem.heroImage}
            alt={selfItem.heroImageAlt ?? selfItem.title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      {/* Content */}
      {(() => {
        const visuals = (selfItem as { content: string; visuals?: Visual[] }).visuals || [];
        const provenanceSources = (selfItem as { provenance?: { sources?: ProvenanceSource[] } }).provenance?.sources || [];
        const segments = renderArticleSegments(selfItem.content, visuals);
        return segments.map((segment, idx) =>
          segment.type === "html" ? (
            <div
              key={idx}
              className="content-body max-w-none text-sm sm:text-base leading-relaxed text-[color:var(--text-secondary)] mt-4"
              dangerouslySetInnerHTML={{ __html: segment.html }}
            />
          ) : (
            <VisualBlock
              key={segment.visual.id || idx}
              visual={segment.visual}
              provenanceSources={provenanceSources}
            />
          )
        );
      })()}

      {/* Tag lists */}
      {selfItem.tags && selfItem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {selfItem.tags.map((tag) => (
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
        <Link href="/sentiments" className="text-[color:var(--text-primary)] hover:underline font-semibold">
          &larr; Back to Sentiments
        </Link>
      </div>
    </article>
  );
}
