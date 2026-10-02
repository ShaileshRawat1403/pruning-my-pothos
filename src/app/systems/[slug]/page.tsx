import { allSystems } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getArticleSchema, getBreadcrumbSchema, getFaqSchema } from "../../../lib/seo/jsonld";
import { renderArticleSegments } from "../../../lib/visual-segments";
import type { Visual } from "../../../lib/visual-types";
import VisualBlock from "../../../components/visuals/VisualBlock";
import { getStoryboard } from "../../../lib/content/storyboards";
import { ArticleCover } from "../../../components/illustrations/covers";
import CoverFilm from "../../../components/illustrations/CoverFilm";
import { coverKicker } from "../../../lib/content/covers";
import { slugifyTag } from "../../../lib/tags";
import { getSystemsIA, placeOf } from "../../../lib/content/systems-ia";
import { BUILDER_SECTION, REFERENCE_SHEETS, REFERENCE_TYPE_LABEL } from "../../../lib/content/reference-sheets";
import SpotlightCard from "../../../components/SpotlightCard";
import { SheetCover } from "../../../components/illustrations/sheets";
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

  const storyboard = getStoryboard(slug);
  const place = placeOf(slug);
  // Works On My Prompt sheets built on this article, and the next stage on the map.
  const sheets = REFERENCE_SHEETS.filter((sh) => sh.article === slug);
  const nextStage = place.stage ? getSystemsIA().stages.find((st) => st.number === place.stage!.number + 1) : undefined;
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
          <span>Systems</span>
          {coverKicker(slug) !== "SYSTEMS" && (
            <>
              <span>&bull;</span>
              <span>{coverKicker(slug).replace("SYSTEMS · ", "")}</span>
            </>
          )}
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

      {/* Cover. Drawn live from the article's emblem (the same drawing as its storyboard cover), so its
          text stays text and it reads the same in either theme. The PNG of
          the same drawing is only for link previews. Where the article has a
          film (illustrations/films/), the cover plays it once, then rests. */}
      <figure className="m-0 w-full overflow-hidden rounded-sm border border-[#D9D4C6]">
        <CoverFilm slug={slug}>
          <ArticleCover slug={slug} title={system.title} kicker={coverKicker(slug)} hero />
        </CoverFilm>
      </figure>

      {/* Article -> storyboard. The storyboard is its own entity, linked
          once, in one line under the cover, so the prose starts sooner. */}
      {storyboard && (
        <p className="m-0 -mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-xs text-[color:var(--text-muted)]">
          <span className="font-bold uppercase tracking-[0.18em]">
            Storyboard &middot; {storyboard.frames.length} frames
          </span>
          <Link
            href={`/storyboards/${storyboard.slug}/`}
            className="font-semibold text-[color:var(--text-primary)] underline underline-offset-4"
          >
            See this argument drawn &rarr;
          </Link>
          <a
            href={storyboard.pdf}
            className="underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]"
          >
            PDF
          </a>
        </p>
      )}

      {/* Slot 04 — the retrieval unit. Above the prose on purpose. */}
      {system.shortAnswer && <AnswerBlock>{system.shortAnswer}</AnswerBlock>}

      {system.useValue && (
        <aside className="explainer-answer" aria-label="What you can do after reading">
          <span className="explainer-kicker">What you can use</span>
          <p>{system.useValue}</p>
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
              scene
            />
          )
        );
      })()}

      {/* Where it stops. After the argument, where a limit means something. */}
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

      {/* Where this sits on the Systems Map (lib/content/systems-ia.ts). */}
      {place.stage && (
        <nav aria-labelledby="where-this-sits" className="flex flex-col gap-3 border-t border-[color:var(--card-border)] pt-6">
          <h2 id="where-this-sits" className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Stage {String(place.stage.number).padStart(2, "0")} &middot; {place.stage.label}
          </h2>
          <p className="m-0 text-sm leading-relaxed text-[color:var(--text-secondary)]">{place.stage.orientation}</p>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm">
            {[{ slug: place.stage.slug, title: place.stage.title, href: place.stage.href, role: "flagship" as const }, ...place.stage.companions, ...place.stage.notes].map((item) => (
              <li key={item.slug} className="flex items-baseline gap-3">
                <span className="w-[5.5rem] shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                  {item.role === "flagship" ? "Start here" : item.role === "note" ? "Note" : "Goes deeper"}
                </span>
                {item.slug === slug ? (
                  <span className="font-semibold text-[color:var(--text-primary)]">{item.title}</span>
                ) : (
                  <Link href={item.href} className="text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:decoration-[color:var(--text-primary)]">
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Do it yourself: the sheets that turn this article into steps. */}
      {sheets.length > 0 && (
        <section aria-labelledby="try-it" className="flex flex-col gap-4 border-t border-[color:var(--card-border)] pt-6">
          <h2 id="try-it" className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Do it yourself &middot; {BUILDER_SECTION.name}
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {sheets.map((sh) => (
              <li key={sh.slug}>
                <SpotlightCard href={`/shelf/reference/${sh.slug}/`} accent="var(--accent-cyan)" compact className="gap-3">
                  <div className="ill-lift overflow-hidden rounded-sm border border-[#D9D4C6]" aria-hidden="true">
                    <SheetCover slug={sh.slug} type={sh.type} title={sh.title} promise={sh.promise} quip={sh.quip} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{REFERENCE_TYPE_LABEL[sh.type]}</span>
                  <h3 className="m-0 font-heading text-base font-bold text-[color:var(--text-primary)]">{sh.title}</h3>
                  <p className="m-0 text-xs leading-relaxed text-[color:var(--text-secondary)]">After this, you can {sh.promise}</p>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Slot 12 — the internal link model, made visible. */}
      {system.related && system.related.length > 0 && (
        <RelatedThree items={system.related} />
      )}

      {/* Continue Navigation footer */}
      <div className="border-t border-[color:var(--card-border)] pt-8 mt-8 flex flex-wrap gap-4 justify-between items-center text-xs font-mono">
        <Link href="/systems" className="text-[color:var(--text-primary)] hover:underline font-semibold">
          &larr; Systems Index
        </Link>
        {nextStage ? (
          <Link href={nextStage.href} className="text-right text-[color:var(--text-primary)] hover:underline font-semibold">
            Next on the map &middot; Stage {String(nextStage.number).padStart(2, "0")}: {nextStage.title}{" "}&rarr;
          </Link>
        ) : (
          <Link href="/" className="text-[color:var(--text-primary)] hover:underline font-semibold">
            Home &rarr;
          </Link>
        )}
      </div>
    </article>
  );
}
