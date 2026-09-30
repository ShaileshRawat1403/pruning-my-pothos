import { SectionScene, type SectionSceneName } from "./illustrations/sections";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro: string;
  /** Which section drawing to show (illustrations/sections.tsx). */
  scene: SectionSceneName;
  /** A section's sub-pages use the slim form: the same drawing, small. */
  slim?: boolean;
  /** Colour of the eyebrow tick. */
  tick?: string;
}

/**
 * The shared page header: eyebrow, title and intro beside the section's
 * drawing. It takes about a third of the first screen, so the page's own
 * content starts above the fold. Every top-level section opens with the full
 * form; pages inside a section use `slim`.
 */
export default function SectionHeader({ eyebrow, title, intro, scene, slim = false, tick = "var(--accent-purple)" }: SectionHeaderProps) {
  const copy = (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="h-px w-8" style={{ background: tick }} />
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{eyebrow}</span>
      </div>
      <h1 className={`font-heading font-black tracking-tight leading-[0.95] text-[color:var(--text-primary)] ${slim ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}>{title}</h1>
      <p className="max-w-[560px] text-base leading-relaxed text-[color:var(--text-secondary)]">{intro}</p>
    </div>
  );

  if (slim) {
    return (
      <section className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:gap-8">
        <div className="ill-alive w-[132px] shrink-0 overflow-hidden rounded-sm border border-[#D9D4C6] sm:w-[184px]">
          <SectionScene name={scene} />
        </div>
        {copy}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 items-center gap-8 pt-2 lg:grid-cols-[13fr_10fr] lg:gap-12">
      {copy}
      <div className="ill-alive mx-auto w-full max-w-[480px] overflow-hidden rounded-sm border border-[#D9D4C6] lg:mx-0 lg:justify-self-end">
        <SectionScene name={scene} />
      </div>
    </section>
  );
}
