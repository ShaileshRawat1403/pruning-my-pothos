import React from "react";
import type { GeneratedSequenceVisual } from "../../lib/visual-types";

interface Props {
  visual: GeneratedSequenceVisual;
}

export default function SequenceVisual({ visual }: Props) {
  const { data } = visual;
  const isVertical = data.orientation === "vertical";
  const steps = data.steps;
  const n = steps.length;

  if (isVertical) {
    const stepHeight = 60;
    const gap = 24;
    const totalHeight = 40 + n * stepHeight + (n - 1) * gap;

    return (
      <svg
        viewBox={`0 0 760 ${totalHeight}`}
        className="w-full h-auto max-w-full block"
        role="img"
        aria-label={visual.alt}
      >
        <title>{visual.takeaway}</title>
        <desc>{visual.alt}</desc>
        <defs>
          <marker
            id="seq-arrow-v"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--card-border)" />
          </marker>
        </defs>

        {steps.map((step, idx) => {
          const y = 20 + idx * (stepHeight + gap);
          return (
            <g key={step.id}>
              <rect
                x="80"
                y={y}
                width="600"
                height={stepHeight}
                rx="6"
                ry="6"
                fill="var(--card-bg)"
                stroke="var(--card-border)"
                strokeWidth="1"
              />
              <text
                x="104"
                y={y + 35}
                fontFamily="var(--font-mono)"
                fontSize="12"
                fontWeight="bold"
                fill="var(--accent-green)"
              >
                {String(idx + 1).padStart(2, "0")}
              </text>
              <text
                x="140"
                y={y + 35}
                fontFamily="var(--font-sans)"
                fontSize="13"
                fontWeight="500"
                fill="var(--text-primary)"
              >
                {step.label}
              </text>
              {step.note && (
                <text
                  x="660"
                  y={y + 35}
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fill="var(--text-muted)"
                >
                  {step.note}
                </text>
              )}

              {idx < n - 1 && (
                <line
                  x1="380"
                  y1={y + stepHeight + 2}
                  x2="380"
                  y2={y + stepHeight + gap - 2}
                  stroke="var(--card-border)"
                  strokeWidth="1.5"
                  markerEnd="url(#seq-arrow-v)"
                />
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  // Horizontal layout
  const gap = 24;
  const totalGap = (n - 1) * gap;
  const availWidth = 720 - totalGap;
  const stepWidth = Math.floor(availWidth / n);
  const startX = Math.floor((760 - (n * stepWidth + totalGap)) / 2);

  return (
    <svg
      viewBox="0 0 760 140"
      className="w-full h-auto max-w-full block"
      role="img"
      aria-label={visual.alt}
    >
      <title>{visual.takeaway}</title>
      <desc>{visual.alt}</desc>
      <defs>
        <marker
          id="seq-arrow-h"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--card-border)" />
        </marker>
      </defs>

      {steps.map((step, idx) => {
        const x = startX + idx * (stepWidth + gap);
        return (
          <g key={step.id}>
            <rect
              x={x}
              y="25"
              width={stepWidth}
              height="86"
              rx="6"
              ry="6"
              fill="var(--card-bg)"
              stroke="var(--card-border)"
              strokeWidth="1"
            />
            <text
              x={x + 14}
              y="48"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fontWeight="bold"
              fill="var(--accent-green)"
            >
              {String(idx + 1).padStart(2, "0")}
            </text>
            <text
              x={x + 14}
              y="70"
              fontFamily="var(--font-sans)"
              fontSize="13"
              fontWeight="500"
              fill="var(--text-primary)"
            >
              {step.label}
            </text>
            {step.note && (
              <text
                x={x + 14}
                y="92"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fill="var(--text-muted)"
              >
                {step.note}
              </text>
            )}

            {idx < n - 1 && (
              <line
                x1={x + stepWidth + 2}
                y1="68"
                x2={x + stepWidth + gap - 2}
                y2="68"
                stroke="var(--card-border)"
                strokeWidth="1.5"
                markerEnd="url(#seq-arrow-h)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
