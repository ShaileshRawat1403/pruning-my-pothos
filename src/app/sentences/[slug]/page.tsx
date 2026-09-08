import { allSentences } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";
import { renderMarkdown } from "../../../lib/markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return allSentences.map((sentence) => ({
    slug: sentence._meta.path,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sentence = allSentences.find((s) => s._meta.path === slug);
  if (!sentence) return {};

  return constructMetadata({
    title: sentence.title,
    description: sentence.summary,
    path: `/sentences/${slug}`,
    ogType: "article"
  });
}

export default async function SentencesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sentence = allSentences.find((s) => s._meta.path === slug);

  if (!sentence) {
    return notFound();
  }

  const webpageSchema = getWebPageSchema({
    title: `${sentence.title} | Pruning My Pothos`,
    description: sentence.summary,
    path: `/sentences/${slug}`
  });

  return (
    <article className="sentiments-scope max-w-[700px] mx-auto py-12 flex flex-col gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      {/* Category header tag */}
      <span className="text-[10px] font-mono font-bold uppercase text-[color:var(--text-primary)] tracking-widest self-start">
        {sentence.category}
        {sentence.readingTime ? ` / ${sentence.readingTime} min read` : ""}
        {sentence.difficulty ? ` / ${sentence.difficulty}` : ""}
      </span>
      
      {/* Title */}
      <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[color:var(--text-primary)] leading-snug">
        {sentence.title}
      </h1>

      {/* Summary / Lead */}
      <p className="text-[color:var(--text-secondary)] font-medium italic border-l-2 border-accent-purple/40 pl-4 py-1 text-sm sm:text-base">
        {sentence.summary}
      </p>

      {/* Content */}
      <div 
        className="content-body max-w-none text-sm sm:text-base leading-relaxed text-[color:var(--text-secondary)] mt-4"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(sentence.content) }}
      />

      {/* Tag lists */}
      {sentence.tags && sentence.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {sentence.tags.map((tag) => (
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
