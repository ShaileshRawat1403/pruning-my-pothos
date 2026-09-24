import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import ProjectInspector from "../../components/home/ProjectInspector";
import { CURRENT_WORK_PROJECTS } from "../../lib/content/projects";

export const metadata = constructMetadata({
  title: "Stack",
  description:
    "The systems being built and tested right now, with repository excerpts and the commit each one was read at.",
  path: "/stack",
});

export default function StackPage() {
  const schema = getWebPageSchema({
    title: "Stack",
    description:
      "Active projects with repository excerpts and commit provenance.",
    path: "/stack",
  });

  return (
    <div className="flex flex-col gap-12 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="flex flex-col gap-4 max-w-[760px]">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
          Test the idea
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          Stack
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed">
          Where the ideas in Systems get built and find out whether they hold.
          Each excerpt below is read from its repository at a named commit, so
          what you see is what was there, not a description of it.
        </p>
      </header>

      <ProjectInspector projects={CURRENT_WORK_PROJECTS} headingLevel={2} />

      <p className="text-sm text-[color:var(--text-secondary)] max-w-[680px]">
        The browser utilities built alongside this work live in{" "}
        <Link href="/tools/" className="underline underline-offset-4">
          Tools
        </Link>
        , and earlier professional work is in the{" "}
        <Link href="/portfolio/" className="underline underline-offset-4">
          portfolio
        </Link>
        .
      </p>
    </div>
  );
}
