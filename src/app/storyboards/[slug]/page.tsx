import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema, getBreadcrumbSchema } from "../../../lib/seo/jsonld";
import { getWalkthroughs, getWalkthrough } from "../../../lib/content/walkthroughs";
import { Frame } from "../../../components/illustrations/registry";
import WalkthroughViewer from "../../../components/illustrations/WalkthroughViewer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getWalkthroughs().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const w = getWalkthrough(slug);
  if (!w) return {};
  return constructMetadata({
    title: `${w.title}: illustrated walkthrough`,
    description: w.summary,
    image: w.shareImage,
    path: `/storyboards/${slug}`,
  });
}

export default async function WalkthroughPage({ params }: PageProps) {
  const { slug } = await params;
  const w = getWalkthrough(slug);
  if (!w) return notFound();

  const total = w.frames.length;
  const slides = w.frames.map((f, i) => ({
    title: f.title,
    text: f.text,
    node: <Frame frameKey={f.key} label={f.text} number={i + 1} total={total} />,
  }));

  const schema = getWebPageSchema({
    title: `${w.title}: illustrated walkthrough`,
    description: w.summary,
    path: `/storyboards/${slug}`,
  });
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Storyboard Explainers", path: "/storyboards" },
    { name: w.title, path: `/storyboards/${slug}` },
  ]);

  return (
    <div className="flex flex-col gap-10 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <header className="flex max-w-[760px] flex-col gap-4">
        <Link
          href="/storyboards/"
          className="self-start font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
        >
          &larr; Storyboard Explainers
        </Link>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent-cyan)]">
          Illustrated walkthrough &middot; {total} frames
        </span>
        <h1 className="font-heading text-3xl font-extrabold leading-tight text-[color:var(--text-primary)] sm:text-4xl">
          {w.title}
        </h1>
        <p className="text-base leading-relaxed text-[color:var(--text-secondary)]">{w.summary}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm">
          <Link href={w.articleHref} className="underline underline-offset-4 decoration-[color:var(--card-border)] hover:decoration-[color:var(--text-primary)]">
            Read the full explanation &rarr;
          </Link>
          <a href={w.pdf} className="text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]">
            Download the PDF
          </a>
        </div>
      </header>

      <WalkthroughViewer title={w.title} slides={slides} />

      <p className="border-t border-[color:var(--card-border)] pt-8 text-sm text-[color:var(--text-secondary)]">
        Every frame here makes a claim the article makes, and nothing more. The details that make a scene concrete, like the $40
        refund or Dave, are illustrative.{" "}
        <Link href={w.articleHref} className="underline underline-offset-4">
          Read {w.articleTitle}
        </Link>
        .
      </p>
    </div>
  );
}
