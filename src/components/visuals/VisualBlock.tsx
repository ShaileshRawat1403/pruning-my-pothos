import React from "react";
import type { Visual, ProvenanceSource } from "../../lib/visual-types";
import SequenceVisual from "./SequenceVisual";
import LayersVisual from "./LayersVisual";
import BoundaryVisual from "./BoundaryVisual";
import ComparisonVisual from "./ComparisonVisual";
import AssetVisual from "./AssetVisual";

interface VisualBlockProps {
  visual: Visual;
  provenanceSources?: ProvenanceSource[];
}

export default function VisualBlock({ visual, provenanceSources = [] }: VisualBlockProps) {
  function renderContent() {
    switch (visual.renderAs) {
      case "generated-sequence":
        return <SequenceVisual visual={visual} />;
      case "generated-layers":
        return <LayersVisual visual={visual} />;
      case "generated-boundary":
        return <BoundaryVisual visual={visual} />;
      case "generated-comparison":
        return <ComparisonVisual visual={visual} />;
      case "asset":
        return <AssetVisual visual={visual} />;
      default:
        return null;
    }
  }

  const visualSources = (visual.sources || [])
    .map((sid: string) => provenanceSources.find((s: ProvenanceSource) => s.id === sid))
    .filter((s: ProvenanceSource | undefined): s is ProvenanceSource => Boolean(s));

  const shouldRenderSources =
    visual.evidenceRole === "evidence" || visualSources.length > 0;

  return (
    <figure
      id={`visual-${visual.id}`}
      className="my-8 w-full rounded-lg border border-[color:var(--card-border)] bg-[color:var(--bg-surface)] p-4 sm:p-6"
    >
      <div className="w-full flex items-center justify-center">
        {renderContent()}
      </div>

      <figcaption className="mt-4 flex flex-col gap-1 border-t border-[color:var(--card-border)] pt-3 text-xs sm:text-sm font-mono text-[color:var(--text-muted)]">
        <span className="font-sans font-semibold text-[color:var(--text-primary)]">
          {visual.takeaway}
        </span>
        <span className="leading-normal">{visual.caption}</span>

        {shouldRenderSources && visualSources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[color:var(--card-border)]/60 flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">
              {visual.evidenceRole === "evidence" ? "Grounding Evidence" : "Sources"}
            </span>
            <div className="flex flex-wrap gap-2">
              {visualSources.map((source: ProvenanceSource) => {
                const isRepo = source.type === "repository";
                const shortSha = source.ref ? source.ref.slice(0, 7) : "";
                const label = isRepo
                  ? `${source.path || source.id}${shortSha ? ` @ ${shortSha}` : ""}`
                  : (source.citation || source.id);

                return (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[color:var(--bg-elevated)] border border-[color:var(--card-border)] text-xs text-[color:var(--text-primary)] hover:border-[color:var(--accent-green)] transition-colors"
                    title={source.citation || source.url}
                  >
                    <span className="text-[10px] uppercase font-bold text-[color:var(--accent-green)]">
                      {source.type}
                    </span>
                    <span>{label}</span>
                    <span className="text-[10px] text-[color:var(--text-muted)]" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
