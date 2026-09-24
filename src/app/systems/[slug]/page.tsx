import { allSystems } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getArticleSchema, getBreadcrumbSchema, getFaqSchema } from "../../../lib/seo/jsonld";
import { renderArticleSegments } from "../../../lib/visual-segments";
import type { Visual } from "../../../lib/visual-types";
import VisualBlock from "../../../components/visuals/VisualBlock";
import { getWalkthrough } from "../../../lib/content/walkthroughs";
import { Frame } from "../../../components/illustrations/registry";
import { slugifyTag } from "../../../lib/tags";
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

export const dynamicParams = false;

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

  const walkthrough = getWalkthrough(slug);
  const faqs = system.faq ?? [];
  const proofPoints = system.proofPoints ?? [];

  const articleSchema = getArticleSchema({
    // headline is the article title alone. Appending the site name pushes the
    // headline past what search engines display and repeats the publisher,
    // which is already declared below.
    title: system.title,
    description: system.description,
    path: `/systems/${slug}`,
    datePublished: system.publishDate,
    dateModified: system.updatedAt ?? system.publishDate,
    image: system.heroImage,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Systems", path: "/systems" },
    { name: system.title, path: `/systems/${slug}` },
  ]);
  const faqSchema = faqs.length > 0 ? getFaqSchema({ faq: faqs }) : null;

  return (
    <article className="max-w-[840px] mx-auto py-8 flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
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
            <Link
              key={tag}
              href={`/tags/${slugifyTag(tag)}/`}
              className="px-2.5 py-0.5 border border-[color:var(--card-border)] bg-[color:var(--bg-color)] rounded-full text-xs font-mono text-[color:var(--text-secondary)]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Hero Image. Intrinsic size is declared so the browser reserves the
          space before the file loads, and it is fetched eagerly because it is
          the largest element in the first viewport. */}
      {system.heroImage && !walkthrough && (
        <figure className="w-full overflow-hidden rounded-sm border border-[color:var(--card-border)] max-h-[400px]">
          <img
            src={system.heroImage}
            alt={system.heroImageAlt ?? system.title}
            width={1200}
            height={675}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      {/* Article -> walkthrough. Where an article has an illustrated
          walkthrough, its drawn cover takes the hero slot: the template cover
          image is replaced, not stacked. Offered once, at the top; the chapter
          plates below already carry the cast. */}
      {walkthrough && (
        <aside
          aria-label="Illustrated walkthrough of this explanation"
          className="grid grid-cols-[6.5rem_1fr] items-center gap-4 rounded-md border border-[color:var(--card-border)] border-l-[3px] border-l-[color:var(--accent-purple)] bg-[color:var(--card-bg)] p-4 sm:grid-cols-[11rem_1fr] sm:gap-7 sm:p-6"
        >
          <Link
            href={`/storyboards/${walkthrough.slug}/`}
            tabIndex={-1}
            aria-hidden="true"
            className="block overflow-hidden rounded-sm border border-[#D9D4C6]"
          >
            <Frame
              frameKey={walkthrough.frames[0].key}
              label={walkthrough.frames[0].title}
              number={1}
              total={walkthrough.frames.length}
            />
          </Link>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--accent-cyan)]">
              Walkthrough &middot; {walkthrough.frames.length} frames
            </span>
            <p className="m-0 font-heading text-lg font-bold leading-snug text-[color:var(--text-primary)] sm:text-2xl">
              Prefer it drawn? This argument is also an illustrated walkthrough.
            </p>
            <p className="m-0 hidden text-sm leading-relaxed text-[color:var(--text-secondary)] sm:block">
              {walkthrough.summary}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-sm">
              <Link href={`/storyboards/${walkthrough.slug}/`} className="font-semibold underline underline-offset-4">
                Open the walkthrough &rarr;
              </Link>
              <a
                href={walkthrough.pdf}
                className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]"
              >
                Download PDF
              </a>
            </div>
          </div>
        </aside>
      )}


      {/* Slot 04 — the retrieval unit. Above the prose on purpose. */}
      {system.shortAnswer && <AnswerBlock>{system.shortAnswer}</AnswerBlock>}

      {system.useValue && (
        <aside className="explainer-answer" aria-label="What you can do after reading">
          <span className="explainer-kicker">What you can use</span>
          <p>{system.useValue}</p>
        </aside>
      )}
      {system.boundary && (
        <section aria-labelledby="concept-boundary" className="border border-[color:var(--card-border)] p-5 rounded-sm">
          <h2 id="concept-boundary" className="font-heading font-bold mb-3">Where this helps, and where it stops</h2>
          <dl className="grid gap-3 text-sm leading-relaxed">
            <div><dt className="font-semibold">What it is</dt><dd>{system.boundary.is}</dd></div>
            <div><dt className="font-semibold">What it does not guarantee</dt><dd>{system.boundary.isNot}</dd></div>
            <div><dt className="font-semibold">When the distinction matters</dt><dd>{system.boundary.mattersWhen}</dd></div>
          </dl>
        </section>
      )}

      {/* Article -> Storyboard. Only for articles that own a structured visual,
          and deliberately a pointer rather than a second render: the visual
          itself appears below, where the argument places it. */}
      {Array.isArray((system as { visuals?: Visual[] }).visuals) &&
        ((system as { visuals?: Visual[] }).visuals?.length ?? 0) > 0 && (
          <aside
            aria-label="This explanation has a visual"
            className="flex flex-col gap-1 border-l-2 border-[color:var(--accent-green)] pl-4"
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              See the system
            </span>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
              This explanation carries a visual, shown below and collected with
              the others in{" "}
              <Link
                href={`/storyboards/#${slug}-${
                  (system as { visuals?: Visual[] }).visuals?.[0]?.id ?? ""
                }`}
                className="underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)] transition-colors"
              >
                Storyboard Explainers
              </Link>
              .
            </p>
          </aside>
        )}

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

      {/* HTML Content Body with Inline Visual Support */}
      {(() => {
        const visuals = (system as { content: string; visuals?: Visual[] }).visuals || [];
        const provenanceSources = system.provenance?.sources || [];
        const segments = renderArticleSegments(system.content, visuals);
        return segments.map((segment, idx) =>
          segment.type === "html" ? (
            <div
              key={idx}
              className="content-body max-w-none text-sm sm:text-base leading-relaxed text-[color:var(--text-secondary)]"
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
              <h2 className="font-heading text-lg font-bold text-[color:var(--text-primary)]">Practical takeaways</h2>
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
