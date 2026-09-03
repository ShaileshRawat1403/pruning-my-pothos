import { allSystems } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getArticleSchema, getFaqSchema } from "../../../lib/seo/jsonld";
import { renderMarkdown } from "../../../lib/markdown";
import ExplainerFigure from "../../../components/explainer/ExplainerFigure";
import {
  AnswerBlock,
  AnalogyBlock,
  EvidenceBlock,
  RelatedThree,
} from "../../../components/explainer/ExplainerBlocks";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allSystems.map((system) => ({
    slug: system._meta.path,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = allSystems.find((s) => s._meta.path === slug);
  if (!system) return {};

  return constructMetadata({
    title: system.seoTitle ?? system.title,
    description: system.description,
    image: system.heroImage,
    path: `/systems/${slug}`,
    ogType: "article"
  });
}

export default async function SystemsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const system = allSystems.find((s) => s._meta.path === slug);

  if (!system) {
    return notFound();
  }

  const faqs = system.faq ?? [];
  const proofPoints = system.proofPoints ?? [];

  const articleSchema = getArticleSchema({
    title: `${system.title} | Sans Serif Systems`,
    description: system.description,
    path: `/systems/${slug}`,
    datePublished: system.publishDate,
    dateModified: system.updatedAt ?? system.publishDate,
    image: system.heroImage,
  });
  const faqSchema = faqs.length > 0 ? getFaqSchema({ faq: faqs }) : null;

  return (
    <article className="max-w-[840px] mx-auto py-8 flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-[color:var(--card-border)] pb-6">
        <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase text-[color:var(--text-primary)] tracking-wider">
          <span>Systems</span> &bull; <span>{system.category}</span>
          {system.readingTime && (
            <>
              <span>&bull;</span>
              <span>{system.readingTime} min read</span>
            </>
          )}
          {system.difficulty && (
            <>
              <span>&bull;</span>
              <span>{system.difficulty}</span>
            </>
          )}
          {system.updatedAt && (
            <>
              <span>&bull;</span>
              <span>
                Updated{" "}
                {new Date(system.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </>
          )}
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          {system.title}
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed">
          {system.description}
        </p>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {system.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 border border-[color:var(--card-border)] bg-[color:var(--bg-color)] rounded-full text-xs font-mono text-[color:var(--text-secondary)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Hero Image */}
      {system.heroImage && (
        <figure className="w-full overflow-hidden rounded-sm border border-[color:var(--card-border)] max-h-[400px]">
          <img
            src={system.heroImage}
            alt={system.heroImageAlt ?? system.title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      {/* Slot 04 — the retrieval unit. Above the prose on purpose. */}
      {system.shortAnswer && <AnswerBlock>{system.shortAnswer}</AnswerBlock>}

      {/* Slot 05 — the analogy, carrying its own failure point. */}
      {system.analogy && (
        <AnalogyBlock
          mapping={system.analogy.mapping}
          breaksWhen={system.analogy.breaksWhen}
        />
      )}

      {/* Slot 06 — one picture of the mechanism. */}
      {system.figure && (
        <ExplainerFigure
          shows={system.figure.shows}
          caption={system.figure.caption}
          alt={system.figure.alt}
          src={system.figure.src}
        />
      )}

      {/* HTML Content Body */}
      <div 
        className="content-body max-w-none text-sm sm:text-base leading-relaxed text-[color:var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(system.content) }}
      />

      {/* Slot 10 — evidence. What was built, where, and what it changed. */}
      {system.evidence && (
        <EvidenceBlock
          what={system.evidence.what}
          where={system.evidence.where}
          changed={system.evidence.changed}
          tags={system.evidence.tags}
        />
      )}

      {/* Meta Reinforcements (Proof Block & FAQ) */}
      {(proofPoints.length > 0 || faqs.length > 0) && (
        <section className="border-t border-[color:var(--card-border)] pt-8 mt-6 flex flex-col gap-8">
          {/* Proof Block */}
          {proofPoints.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-lg font-bold text-[color:var(--text-primary)]">Proof Block</h2>
              <ul className="list-disc pl-5 text-sm text-[color:var(--text-secondary)] flex flex-col gap-2">
                {proofPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Block */}
          {faqs.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="font-heading text-lg font-bold text-[color:var(--text-primary)]">FAQ</h2>
              <div className="flex flex-col gap-4">
                {faqs.map((item, idx) => (
                  <div key={idx} className="border border-[color:var(--card-border)] p-4 rounded-lg bg-[color:var(--bg-color)] flex flex-col gap-2">
                    <h3 className="font-heading text-sm font-semibold text-[color:var(--text-primary)]">{item.question}</h3>
                    <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
      )}

      {/* Slot 12 — the internal link model, made visible. */}
      {system.related && system.related.length > 0 && (
        <RelatedThree items={system.related} />
      )}

      {/* Continue Navigation footer */}
      <div className="border-t border-[color:var(--card-border)] pt-8 mt-8 flex flex-wrap gap-4 justify-between items-center text-xs font-mono">
        <Link href="/" className="text-[color:var(--text-primary)] hover:underline font-semibold">
          &larr; Back to Home
        </Link>
        <Link href="/systems" className="text-[color:var(--text-primary)] hover:underline font-semibold">
          Systems Index &rarr;
        </Link>
      </div>
    </article>
  );
}
