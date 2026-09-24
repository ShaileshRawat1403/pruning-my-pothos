import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema, getBreadcrumbSchema } from "../../../lib/seo/jsonld";
import { getStoryboards, getStoryboard } from "../../../lib/content/storyboards";
import { Frame } from "../../../components/illustrations/registry";
import StoryboardViewer from "../../../components/illustrations/StoryboardViewer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getStoryboards().map((sb) => ({ slug: sb.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sb = getStoryboard(slug);
  if (!sb) return {};
  return constructMetadata({
    title: `${sb.title}: storyboard`,
    description: sb.summary,
    image: sb.shareImage,
    path: `/storyboards/${slug}`,
  });
}

export default async function StoryboardPage({ params }: PageProps) {
  const { slug } = await params;
  const all = getStoryboards();
  const index = all.findIndex((s) => s.slug === slug);
  const sb = all[index];
  if (!sb) return notFound();
  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;

  const total = sb.frames.length;
  const slides = sb.frames.map((f, i) => ({
    title: f.title,
    text: f.text,
    node: <Frame frameKey={f.key} label={f.text} number={i + 1} total={total} />,
  }));

  const schema = getWebPageSchema({
    title: `${sb.title}: storyboard`,
    description: sb.summary,
    path: `/storyboards/${slug}`,
  });
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Storyboards", path: "/storyboards" },
    { name: sb.title, path: `/storyboards/${slug}` },
  ]);

  const quiet =
    "text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]";

  return (
    <div className="flex flex-col gap-10 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <header className="flex max-w-[760px] flex-col gap-4">
        <Link
          href="/storyboards/"
          className="self-start font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
        >
          &larr; Storyboards
        </Link>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent-cyan)]">
          Storyboard &middot; {total} frames
          {sb.stage ? ` · Stage ${String(sb.stage.number).padStart(2, "0")}, ${sb.stage.label}` : ""}
        </span>
        <h1 className="font-heading text-3xl font-extrabold leading-tight text-[color:var(--text-primary)] sm:text-4xl">
          {sb.title}
        </h1>
        <p className="text-base leading-relaxed text-[color:var(--text-secondary)]">{sb.summary}</p>
        <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
          <a
            href={sb.pdf}
            className="inline-flex h-11 items-center rounded-sm bg-[color:var(--text-primary)] px-4 font-semibold text-[color:var(--bg-color)] hover:opacity-90"
          >
            Download PDF
          </a>
          <Link
            href={sb.articleHref}
            className="inline-flex h-11 items-center rounded-sm border border-[color:var(--card-border)] px-4 text-[color:var(--text-primary)] hover:border-[color:var(--text-primary)]"
          >
            Read the article &rarr;
          </Link>
        </div>
      </header>

      <StoryboardViewer title={sb.title} slides={slides} />

      <footer className="flex flex-col gap-6 border-t border-[color:var(--card-border)] pt-8">
        <p className="m-0 text-sm leading-relaxed text-[color:var(--text-secondary)]">
          This storyboard draws{" "}
          <Link href={sb.articleHref} className="underline underline-offset-4">
            {sb.articleTitle}
          </Link>{" "}
          and claims nothing the article does not. The details that make a scene concrete, like the $40 refund or
          Dave, are illustrative.
        </p>
        {(prev || next) && (
          <nav aria-label="More storyboards" className="flex flex-wrap justify-between gap-4 font-mono text-sm">
            {prev ? (
              <Link href={`/storyboards/${prev.slug}/`} className={quiet}>
                &larr; {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/storyboards/${next.slug}/`} className={quiet}>
                {next.title} &rarr;
              </Link>
            )}
          </nav>
        )}
      </footer>
    </div>
  );
}
