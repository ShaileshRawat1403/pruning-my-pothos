import Link from "next/link";
import GlowCard from "../../components/GlowCard";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema, getPersonSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "About Systems",
  description:
    "The thinker, tinkerer, and translator behind Sans Serif Systems: a solo-builder systems laboratory for predictable, verifiable, and secure AI-assisted work.",
  path: "/about",
});

export default function AboutPage() {
  const schema = getWebPageSchema({
    title: "About Systems | Pruning My Pothos",
    description:
      "The thinker, tinkerer, and translator behind Sans Serif Systems: a solo-builder systems laboratory for predictable, verifiable, and secure AI-assisted work.",
    path: "/about",
  });

  return (
    <div className="relative flex flex-col gap-16 pt-10 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonSchema()) }}
      />

      {/* ── Page Header ── */}
      <section className="relative rounded-sm overflow-hidden p-8 sm:p-12 flex flex-col gap-5"
        style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-purple) 9%, transparent) 0%, color-mix(in srgb, var(--accent-cyan) 5%, transparent) 100%)",
          border: "1px solid color-mix(in srgb, var(--accent-purple) 16%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(color-mix(in srgb, var(--accent-purple) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--accent-purple) 4%, transparent) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider"
              style={{
                background: "color-mix(in srgb, var(--accent-cyan) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent-cyan) 24%, transparent)",
                color: "var(--accent-cyan)",
              }}
            >
              The Builder
            </span>
            <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
              Credentials // Philosophy
            </span>
          </div>

          <h1
            className="font-heading text-4xl sm:text-5xl font-black tracking-tight leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            About{" "}
            <span className="gradient-text">Sans Serif Systems</span>
          </h1>

          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Thinker. Tinkerer. Translator. A solo-builder systems laboratory for
            making AI-assisted work predictable, verifiable, and secure. The one
            belief underneath all of it:{" "}
            <span className="font-heading italic" style={{ color: "var(--text-primary)" }}>
              clarity should survive complexity.
            </span>
          </p>
        </div>
      </section>

      <SceneFigure
        src="/scenes/bridge.html"
        label="Figure · thinker_tinkerer_translator"
        accent="var(--accent-amber)"
        caption="Understand the friction, build the bridge, explain the system. My work sits between thinking, execution, and translation, and translation is the span that lets the other two meet."
      />

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Philosophy */}
        <div className="lg:col-span-7">
        <GlowCard accent="var(--accent-amber)" pad="p-7 sm:p-8" className="gap-6">
          <div className="flex justify-between items-center pb-4"
            style={{ borderBottom: "1px solid var(--card-border)" }}
          >
            <h2 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              The Philosophy
            </h2>
            <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>
              EST. 2026 // PUBLIC_PLATFORM
            </span>
          </div>

          <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              Hi, I&apos;m{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Shailesh Rawat</span>.
              Sans Serif Systems is a public platform for open tools, workflow
              canvases, and governed AI-assisted development patterns.
            </p>
            <p>
              The goal is not to ship another prompt library. The goal is to make
              AI-assisted work{" "}
              <span style={{ color: "var(--text-primary)" }}>inspectable, repeatable, and safer to use</span>.
            </p>
            <p>
              Some utilities are client-side browser-native tools. Others are
              local CLI prototypes or public slices of a larger private operating
              model.
            </p>
          </div>

          <div
            className="pt-5 mt-2 flex flex-col gap-2"
            style={{ borderTop: "1px solid var(--card-border)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              The thinking underneath the work lives here:{" "}
              <Link href="/schema" className="link-slide font-semibold font-mono" style={{ color: "var(--accent-purple)" }}>
                /schema →
              </Link>
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Looking for my writing archive?{" "}
              <Link href="/sentiments" className="link-slide font-semibold font-mono" style={{ color: "var(--accent-cyan)" }}>
                /sentiments →
              </Link>
            </p>
          </div>
        </GlowCard>
        </div>

        {/* Right: Info panels */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <GlowCard accent="var(--accent-cyan)" className="gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-cyan)" }} />
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                Ecosystem Boundary
              </h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Public tools are built client-side or distributed for local-first
              setups. Runtimes requiring codebase indexing remain
              secure and private.
            </p>
          </GlowCard>

          <GlowCard accent="var(--accent-pink)" className="gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-pink)" }} />
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                Contact Info
              </h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Feel free to connect regarding systems design, testing structures,
              or workflow engineering.
            </p>
            <a
              href="mailto:shailesh.rawat1403@gmail.com"
              className="link-slide self-start text-xs font-mono font-semibold mt-1"
              style={{ color: "var(--text-primary)" }}
            >
              shailesh.rawat1403@gmail.com →
            </a>
          </GlowCard>

          {/* Social links */}
          <GlowCard accent="var(--accent-purple)" topRule={false} className="gap-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Find me on
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "GitHub", href: "https://github.com/ShaileshRawat1403", color: "var(--text-primary)" },
                { label: "LinkedIn", href: "https://linkedin.com/in/shailesh-rawat", color: "var(--accent-cyan)" },
                { label: "pruningmypothos.com", href: "https://pruningmypothos.com", color: "var(--accent-purple)" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono flex items-center justify-between transition-opacity hover:opacity-70"
                  style={{ color: link.color }}
                >
                  {link.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
