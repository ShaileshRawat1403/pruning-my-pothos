import React from "react";
import type { GeneratedLayersVisual } from "../../lib/visual-types";

interface Props {
  visual: GeneratedLayersVisual;
}

export default function LayersVisual({ visual }: Props) {
  const { layers } = visual.data;
  const n = layers.length;
  const layerHeight = 46;
  const gap = 12;
  const totalHeight = 36 + n * layerHeight + (n - 1) * gap;

  return (
    <svg
      viewBox={`0 0 760 ${totalHeight}`}
      className="w-full h-auto max-w-full block"
      role="img"
      aria-label={visual.alt}
    >
      <title>{visual.takeaway}</title>
      <desc>{visual.alt}</desc>

      {/* Vertical stack dependency guide on the left */}
      <line
        x1="28"
        y1="36"
        x2="28"
        y2={totalHeight - 36}
        stroke="var(--card-border)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />

      {layers.map((layer, idx) => {
        const y = 18 + idx * (layerHeight + gap);
        const isHighlighted = Boolean(layer.highlighted);

        return (
          <g key={layer.id}>
            {/* Connection node to vertical guide */}
            <circle
              cx="28"
              cy={y + layerHeight / 2}
              r="3.5"
              fill={isHighlighted ? "var(--accent-green)" : "var(--card-border)"}
            />

            <rect
              x="52"
              y={y}
              width="670"
              height={layerHeight}
              rx="6"
              ry="6"
              fill={isHighlighted ? "var(--bg-elevated)" : "var(--card-bg)"}
              stroke={isHighlighted ? "var(--accent-green)" : "var(--card-border)"}
              strokeWidth={isHighlighted ? "1.5" : "1"}
            />

            <text
              x="76"
              y={y + 28}
              fontFamily="var(--font-sans)"
              fontSize="13"
              fontWeight={isHighlighted ? "600" : "500"}
              fill={isHighlighted ? "var(--accent-green)" : "var(--text-primary)"}
            >
              {layer.label}
            </text>

            {layer.note && (
              <text
                x="702"
                y={y + 28}
                textAnchor="end"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="var(--text-muted)"
              >
                {layer.note}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
