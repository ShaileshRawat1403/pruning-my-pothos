import CharacterPlate, { CharacterPlateProps } from "./CharacterPlate";

interface PlateHeroProps extends CharacterPlateProps {
  eyebrow: string;
  title: string;
  intro: string;
  /** color for the eyebrow tick; defaults to the plate accent */
  tick?: string;
  /** a 4:5 portrait plate, drawn narrower than the landscape default */
  portrait?: boolean;
}

/**
 * The shared page hero: an eyebrow + title + intro on the left,
 * a speaking CharacterPlate on the right. Every top-level section
 * (Systems, Storyboards, Stack, Shelf, Self) opens with one; the
 * section's own content follows below it.
 *
 * The two tracks are `fr`, not percentages. Percentage tracks resolve against
 * the grid's content box and the gap is then added on top, so `[52%_48%]` with
 * `gap-14` made the row 56px wider than its container at every width from `lg`
 * up -- enough to push the plate's -12px corner brackets past the viewport and
 * raise a horizontal scrollbar between 1024px and ~1300px. 13fr/12fr is the
 * same 52:48 proportion, measured after the gap is taken out.
 */
export default function PlateHero({ eyebrow, title, intro, tick, portrait = false, ...plate }: PlateHeroProps) {
  const tickColor = tick ?? plate.accent ?? "var(--accent-purple)";
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[13fr_12fr] items-center gap-10 lg:gap-14 min-h-[86vh] pt-10 lg:pt-6">
      <div className="flex flex-col gap-5 lg:pr-8">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: tickColor }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            {eyebrow}
          </span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
        <p className="text-base leading-relaxed max-w-[460px]" style={{ color: "var(--text-secondary)" }}>
          {intro}
        </p>
      </div>
      <CharacterPlate
        {...plate}
        aspect={portrait ? "4 / 5" : plate.aspect}
        className={`w-full ${portrait ? "max-w-[420px]" : "max-w-[540px]"} mx-auto lg:mx-0 lg:justify-self-end ${plate.className ?? ""}`}
      />
    </section>
  );
}
