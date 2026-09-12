import React from "react";
import type { GeneratedBoundaryVisual } from "../../lib/visual-types";

interface Props {
  visual: GeneratedBoundaryVisual;
}

export default function BoundaryVisual({ visual }: Props) {
  const { inside, outside, boundaryLabel } = visual.data;
  const labelText = boundaryLabel || "Authority Boundary";

  return (
    <svg
      viewBox="0 0 760 260"
      className="w-full h-auto max-w-full block"
      role="img"
      aria-label={visual.alt}
    >
      <title>{visual.takeaway}</title>
      <desc>{visual.alt}</desc>

      {/* Inside zone (Left) */}
      <rect
        x="24"
        y="18"
        width="340"
        height="224"
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
        fill="var(--accent-green)"
      >
        {inside.label}
      </text>

      {inside.items.map((item: string, idx: number) => (
        <g key={idx}>
          <circle cx="50" cy={82 + idx * 28} r="3" fill="var(--accent-green)" />
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

      {/* Boundary dividing line */}
      <line
        x1="380"
        y1="24"
        x2="380"
        y2="236"
        stroke="var(--card-border)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Boundary label pill */}
      <rect
        x="300"
        y="116"
        width="160"
        height="28"
        rx="14"
        ry="14"
        fill="var(--bg-elevated)"
        stroke="var(--card-border)"
        strokeWidth="1"
      />
      <text
        x="380"
        y="134"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fontWeight="bold"
        fill="var(--text-muted)"
      >
        {labelText}
      </text>

      {/* Outside zone (Right) */}
      <rect
        x="396"
        y="18"
        width="340"
        height="224"
        rx="8"
        ry="8"
        fill="var(--card-bg)"
        stroke="var(--card-border)"
        strokeWidth="1"
      />
      <text
        x="416"
        y="48"
        fontFamily="var(--font-sans)"
        fontSize="14"
        fontWeight="bold"
        fill="var(--text-muted)"
      >
        {outside.label}
      </text>

      {outside.items.map((item: string, idx: number) => (
        <g key={idx}>
          <circle cx="422" cy={82 + idx * 28} r="3" fill="var(--text-muted)" />
          <text
            x="436"
            y={86 + idx * 28}
            fontFamily="var(--font-sans)"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            {item}
          </text>
        </g>
      ))}
    </svg>
  );
}
