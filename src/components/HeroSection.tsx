import Link from "next/link";

/**
 * The hero states the offer in one sentence and gives one clear action.
 *
 * What was here before: an animated portrait with parallax, pointer-driven 3D
 * tilt, a glare sweep, drifting marginalia glyphs and five rotating utterances.
 * It was the most beautiful thing on the site and it told a first-time visitor
 * nothing about what they would get. Its only call to action pointed at
 * /sentences, a section that has since left the navigation.
 *
 * Removing it also takes framer-motion and a "use client" boundary off the
 * homepage's critical path. The old version is in git if the portrait is
 * wanted back somewhere it can earn its place, such as About.
 */
export default function HeroSection() {
  return (
    <section className="flex flex-col gap-7 pt-8 pb-4 lg:pt-16">
      <h1
        className="font-heading font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl max-w-[19ch]"
        style={{ color: "var(--text-primary)", lineHeight: 1.04, textWrap: "balance" }}
      >
        Understand AI by building with it.
      </h1>

      <p
        className="text-lg sm:text-xl leading-relaxed max-w-[46ch]"
        style={{ color: "var(--text-secondary)", textWrap: "pretty" }}
      >
        Explanations, workflows and teardowns of real systems. Every piece here contains
        something built, tried, inspected or broken.
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <Link
          href="/systems"
          className="font-mono text-sm px-5 py-3"
          style={{
            background: "var(--text-primary)",
            color: "var(--bg-color)",
            textDecoration: "none",
          }}
        >
          Start with the explainers &rarr;
        </Link>
        <Link
          href="/tools"
          className="font-mono text-sm hover:underline"
          style={{ color: "var(--text-primary)", textDecoration: "none" }}
        >
          or open the tools &rarr;
        </Link>
      </div>
    </section>
  );
}
