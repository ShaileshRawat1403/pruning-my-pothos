import React from "react";
import type { GeneratedComparisonVisual } from "../../lib/visual-types";

interface Props {
  visual: GeneratedComparisonVisual;
}

export default function ComparisonVisual({ visual }: Props) {
  const { before, after, diffNote } = visual.data;

  return (
    <svg
      viewBox="0 0 760 260"
      className="w-full h-auto max-w-full block"
      role="img"
      aria-label={visual.alt}
    >
      <title>{visual.takeaway}</title>
      <desc>{visual.alt}</desc>

      {/* Before Column (Left) */}
      <rect
        x="24"
        y="18"
        width="330"
        height="190"
        rx="8"
        ry="8"
        fill="var(--card-bg)"
        stroke="var(--card-border)"
        strokeWidth="1"
      />
      <text
        x="44"
        y="48"
        fontFamily="var(--font-sans)"
        fontSize="14"
        fontWeight="bold"
        fill="var(--text-muted)"
      >
        {before.label}
      </text>

      {before.items.map((item, idx) => (
        <g key={idx}>
          <circle cx="50" cy={82 + idx * 28} r="3" fill="var(--text-muted)" />
          <text
            x="64"
            y={86 + idx * 28}
            fontFamily="var(--font-sans)"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            {item}
          </text>
        </g>
      ))}

      {/* Transition indicator */}
      <text
        x="380"
        y="118"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="18"
        fill="var(--text-muted)"
      >
        &rarr;
      </text>

      {/* After Column (Right) */}
      <rect
        x="406"
        y="18"
        width="330"
        height="190"
        rx="8"
        ry="8"
        fill="var(--card-bg)"
        stroke="var(--accent-green)"
        strokeWidth="1.5"
      />
      <text
        x="426"
        y="48"
        fontFamily="var(--font-sans)"
        fontSize="14"
        fontWeight="bold"
        fill="var(--accent-green)"
      >
        {after.label}
      </text>

      {after.items.map((item, idx) => (
        <g key={idx}>
          <circle cx="432" cy={82 + idx * 28} r="3" fill="var(--accent-green)" />
          <text
            x="446"
            y={86 + idx * 28}
            fontFamily="var(--font-sans)"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            {item}
          </text>
        </g>
      ))}

      {/* Diff note at the bottom */}
      {diffNote && (
        <text
          x="380"
          y="236"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--text-muted)"
        >
          {diffNote}
        </text>
      )}
    </svg>
  );
}
