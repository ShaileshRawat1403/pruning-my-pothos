import React from "react";
import type { Visual } from "../../lib/visual-types";
import SequenceVisual from "./SequenceVisual";
import LayersVisual from "./LayersVisual";
import BoundaryVisual from "./BoundaryVisual";
import ComparisonVisual from "./ComparisonVisual";
import AssetVisual from "./AssetVisual";

interface VisualBlockProps {
  visual: Visual;
}

export default function VisualBlock({ visual }: VisualBlockProps) {
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
      </figcaption>
    </figure>
  );
}
