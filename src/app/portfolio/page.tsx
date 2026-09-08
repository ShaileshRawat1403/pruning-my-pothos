import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Technical Marketing Portfolio",
  description: "Explore developer documentation strategies, GenAI adoption playbooks, and example-driven technical enablement kits.",
  path: "/portfolio"
});

export default function PortfolioPage() {
  const schema = getWebPageSchema({
    title: "Technical Marketing Portfolio | Pruning My Pothos",
    description: "Explore developer documentation strategies, GenAI adoption playbooks, and example-driven technical enablement kits.",
    path: "/portfolio"
  });

  const focusAreas = [
    {
      title: "GenAI & LLM Platforms",
      description: "Documentation strategy for model behavior, safety playbooks, and production deployments.",
      accent: "border-accent-cyan"
    },
    {
      title: "Developer Documentation",
      description: "Zero-friction onboarding through SDK guides, API references, and example-driven flows.",
      accent: "border-accent-purple"
    },
    {
      title: "Internal Enablement",
      description: "Training kits and adoption materials that translate roadmap changes for non-technical teams.",
      accent: "border-accent-orange"
    },
    {
      title: "Executive Strategy",
      description: "Leadership-ready narratives that synthesize technical risk into clear decisions.",
      accent: "border-accent-pink"
    }
  ];

  const projects = [
    {
      title: "Change Communication Brief",
      description: "Narrative briefing docs translating breaking infrastructure updates for business units.",
      status: "Deferred Prototype",
      path: "#"
    },
    {
      title: "Internal AI Adoption Kit",
      description: "Interactive playbook templates and guides driving internal LLM adoption loops.",
      status: "Deferred Prototype",
      path: "#"
    }
  ];

  return (
    <div className="relative w-full flex flex-col gap-16 max-w-[1100px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Page Header */}
      <section className="flex flex-col gap-2">
        <span className="inline-flex self-start px-2.5 py-0.5 rounded-full border border-accent-orange/25 bg-accent-orange/10 text-[10px] font-mono font-bold tracking-wider text-[color:var(--text-primary)] uppercase">
          PORTFOLIO
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          Technical Marketing & Enablement Portfolio
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed max-w-[700px]">
          Narratives, templates, and adoption kits built to explain complex systems and guide engineering adoption workflows.
        </p>
      </section>

      {/* Focus Areas */}
      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)] border-b border-[color:var(--card-border)] pb-2">
          Focus Areas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, idx) => (
            <div key={idx} className={`card-glass p-5 border-t-2 ${area.accent} flex flex-col gap-2`}>
              <h3 className="font-heading text-sm font-bold text-[color:var(--text-primary)]">
                {area.title}
              </h3>
              <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Projects (Placeholder List) */}
      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)] border-b border-[color:var(--card-border)] pb-2">
          Case Studies & Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className="card-glass p-6 flex flex-col gap-4 justify-between bg-[color:var(--bg-color)]">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-[color:var(--text-muted)]">
                  <span>CASE STUDY {idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-[color:var(--card-border)] text-[9px] font-semibold text-[color:var(--text-secondary)]">
                    {proj.status}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">
                  {proj.title}
                </h3>
                <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                  {proj.description}
                </p>
              </div>
              <span className="text-xs font-mono text-[color:var(--text-muted)]">
                Case detail routes are deferred for Stage 2.
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
