import React from "react";

type Shows = "range" | "loop" | "before-after" | "repo-map";

export interface ExplainerFigureProps {
  shows: Shows;
  caption: string;
  alt: string;
  /** Optional override: a hand-drawn SVG or image for this specific piece. */
  src?: string;
}

const svgBase: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  height: "auto",
  display: "block",
  color: "var(--text-primary)",
};

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  fill: "currentColor",
} as const;

const mutedLabel = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fill: "var(--text-muted)",
} as const;

function Arrowhead({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

/**
 * range — what each layer of a stack actually spans.
 * Use when the piece argues that things differ by scope rather than by kind.
 */
function Range({ alt }: { alt: string }) {
  const cols = [
    { x: 124, w: 188, label: "turn 1" },
    { x: 326, w: 188, label: "turn 2" },
    { x: 528, w: 188, label: "turn 3" },
  ];
  const rows = [
    { y: 62, name: "Prompt", note: "one turn" },
    { y: 106, name: "System prompt", note: "every turn" },
    { y: 150, name: "Skill", note: "one bounded task" },
    { y: 194, name: "Workflow", note: "several linked tasks" },
  ];
  return (
    <svg viewBox="0 0 760 300" style={svgBase} role="img" aria-label={alt}>
      <Arrowhead id="fig-range-arrow" />

      {/* session columns */}
      {cols.map((c) => (
        <g key={c.label}>
          <text x={c.x + c.w / 2} y={30} textAnchor="middle" style={mutedLabel}>
            {c.label}
          </text>
          <line
            x1={c.x}
            y1={40}
            x2={c.x}
            y2={244}
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeDasharray="3 4"
          />
        </g>
      ))}

      {/* the agent is the frame, not a row */}
      <rect
        x={112}
        y={44}
        width={612}
        height={200}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeDasharray="5 5"
      />
      <text x={718} y={262} textAnchor="end" style={mutedLabel}>
        agent runtime: tools, memory, policy
      </text>

      {rows.map((r) => (
        <text key={r.name} x={104} y={r.y + 17} textAnchor="end" style={labelStyle}>
          {r.name}
        </text>
      ))}

      {/* prompt: one turn only */}
      <rect x={326} y={62} width={62} height={26} fill="currentColor" fillOpacity="0.85" />
      <text x={400} y={79} style={mutedLabel}>one turn</text>

      {/* system prompt: the whole session, always resident */}
      <rect
        x={124}
        y={106}
        width={592}
        height={26}
        fill="var(--accent-purple)"
        fillOpacity="0.22"
        stroke="var(--accent-purple)"
      />
      <text x={134} y={123} style={{ ...mutedLabel, fill: "currentColor" }}>
        resident in context whether or not this turn needs it
      </text>

      {/* skill: invoked inside one turn */}
      <rect x={340} y={150} width={160} height={26} fill="currentColor" fillOpacity="0.55" />
      <text x={512} y={167} style={mutedLabel}>invoked, then done</text>

      {/* workflow: a chain across turns */}
      {cols.map((c, i) => (
        <g key={`wf-${i}`}>
          <rect
            x={c.x + c.w / 2 - 26}
            y={194}
            width={52}
            height={26}
            fill="none"
            stroke="currentColor"
          />
          {i < cols.length - 1 && (
            <line
              x1={c.x + c.w / 2 + 30}
              y1={207}
              x2={cols[i + 1].x + cols[i + 1].w / 2 - 30}
              y2={207}
              stroke="currentColor"
              markerEnd="url(#fig-range-arrow)"
            />
          )}
        </g>
      ))}
      <text x={124} y={238} style={mutedLabel}>
        step hands off to step
      </text>
    </svg>
  );
}

/**
 * loop — an agent cycle, and where a human is allowed to interrupt it.
 * Use when the piece is about autonomy, recovery or review.
 */
function Loop({ alt }: { alt: string }) {
  const node = (x: number, y: number, label: string, accent = false) => (
    <g key={label}>
      <rect
        x={x - 62}
        y={y - 20}
        width={124}
        height={40}
        fill={accent ? "var(--accent-purple)" : "none"}
        fillOpacity={accent ? 0.16 : 1}
        stroke={accent ? "var(--accent-purple)" : "currentColor"}
      />
      <text x={x} y={y + 5} textAnchor="middle" style={labelStyle}>
        {label}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 620 320" style={svgBase} role="img" aria-label={alt}>
      <Arrowhead id="fig-loop-arrow" />

      {node(230, 40, "plan")}
      {node(420, 150, "act")}
      {node(230, 260, "observe")}
      {node(40, 150, "decide", true)}

      <line x1={292} y1={48} x2={358} y2={132} stroke="currentColor" markerEnd="url(#fig-loop-arrow)" />
      <line x1={420} y1={170} x2={300} y2={250} stroke="currentColor" markerEnd="url(#fig-loop-arrow)" />
      <line x1={168} y1={252} x2={72} y2={172} stroke="currentColor" markerEnd="url(#fig-loop-arrow)" />
      <line x1={52} y1={130} x2={168} y2={50} stroke="currentColor" markerEnd="url(#fig-loop-arrow)" />

      <text x={340} y={82} style={mutedLabel}>calls a tool</text>
      <text x={372} y={228} style={mutedLabel}>reads the result</text>
      <text x={84} y={228} style={mutedLabel}>was that progress?</text>
      <text x={62} y={82} style={mutedLabel}>next step</text>

      {/* the checkpoint */}
      <line
        x1={40}
        y1={130}
        x2={40}
        y2={60}
        stroke="var(--accent-purple)"
        strokeDasharray="4 4"
        markerEnd="url(#fig-loop-arrow)"
      />
      <text x={40} y={44} textAnchor="middle" style={{ ...mutedLabel, fill: "var(--accent-purple)" }}>
        human checkpoint
      </text>
      <text x={472} y={300} textAnchor="end" style={mutedLabel}>
        the loop only stops where something is allowed to stop it
      </text>
    </svg>
  );
}

/**
 * before-after — the single edge an option adds or removes.
 * Use when comparing two architectures. Draw the difference, not the options.
 */
function BeforeAfter({ alt }: { alt: string }) {
  const box = (x: number, y: number, label: string, accent = false) => (
    <g key={`${label}-${y}`}>
      <rect
        x={x}
        y={y}
        width={112}
        height={40}
        fill={accent ? "var(--accent-purple)" : "none"}
        fillOpacity={accent ? 0.16 : 1}
        stroke={accent ? "var(--accent-purple)" : "currentColor"}
      />
      <text x={x + 56} y={y + 25} textAnchor="middle" style={labelStyle}>
        {label}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 700 260" style={svgBase} role="img" aria-label={alt}>
      <Arrowhead id="fig-ba-arrow" />

      <text x={0} y={22} style={mutedLabel}>before</text>
      {box(0, 40, "request")}
      {box(280, 40, "model")}
      <line x1={116} y1={60} x2={276} y2={60} stroke="currentColor" markerEnd="url(#fig-ba-arrow)" />
      <text x={196} y={54} textAnchor="middle" style={mutedLabel}>every time</text>

      <line x1={0} y1={116} x2={700} y2={116} stroke="currentColor" strokeOpacity="0.14" />

      <text x={0} y={152} style={mutedLabel}>after</text>
      {box(0, 170, "request")}
      {box(200, 170, "cache", true)}
      {box(440, 170, "model")}
      <line x1={116} y1={190} x2={196} y2={190} stroke="currentColor" markerEnd="url(#fig-ba-arrow)" />
      <line x1={316} y1={190} x2={436} y2={190} stroke="currentColor" markerEnd="url(#fig-ba-arrow)" />
      <text x={256} y={164} textAnchor="middle" style={mutedLabel}>hit</text>
      <text x={376} y={184} textAnchor="middle" style={mutedLabel}>miss only</text>
      <path
        d="M 496 170 C 496 130 316 130 296 166"
        fill="none"
        stroke="var(--accent-purple)"
        strokeDasharray="4 4"
        markerEnd="url(#fig-ba-arrow)"
      />
      <text x={396} y={126} textAnchor="middle" style={{ ...mutedLabel, fill: "var(--accent-purple)" }}>
        invalidates
      </text>
      <text x={0} y={240} style={mutedLabel}>
        one box and one dashed edge is the whole difference
      </text>
    </svg>
  );
}

/**
 * repo-map — the shape of someone else's codebase, with the parts that matter.
 * Use in teardowns. Highlight only what the argument turns on.
 */
function RepoMap({ alt }: { alt: string }) {
  const rows: Array<{ x: number; y: number; label: string; hot?: boolean; note?: string }> = [
    { x: 24, y: 56, label: "src/" },
    { x: 60, y: 96, label: "agent/", hot: true, note: "the loop lives here" },
    { x: 96, y: 136, label: "controller.py", hot: true, note: "decides the next action" },
    { x: 96, y: 176, label: "state.py" },
    { x: 60, y: 216, label: "runtime/", hot: true, note: "sandbox boundary" },
    { x: 96, y: 256, label: "docker.py" },
    { x: 60, y: 296, label: "llm/" },
  ];
  return (
    <svg viewBox="0 0 700 350" style={svgBase} role="img" aria-label={alt}>
      {rows.map((r) => (
        <g key={r.label}>
          <line
            x1={r.x - 12}
            y1={r.y + 12}
            x2={r.x - 4}
            y2={r.y + 12}
            stroke="currentColor"
            strokeOpacity="0.4"
          />
          <text
            x={r.x}
            y={r.y + 16}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fill: r.hot ? "var(--accent-purple)" : "currentColor",
              fontWeight: r.hot ? 500 : 400,
            }}
          >
            {r.label}
          </text>
          {r.note && (
            <text x={320} y={r.y + 16} style={mutedLabel}>
              {r.note}
            </text>
          )}
        </g>
      ))}
      <line x1={12} y1={68} x2={12} y2={308} stroke="currentColor" strokeOpacity="0.2" />
      <line x1={48} y1={108} x2={48} y2={228} stroke="currentColor" strokeOpacity="0.2" />
      <line x1={84} y1={148} x2={84} y2={268} stroke="currentColor" strokeOpacity="0.2" />
      <text x={24} y={340} style={mutedLabel}>
        three directories out of forty. The rest is not the story.
      </text>
    </svg>
  );
}

export default function ExplainerFigure({ shows, caption, alt, src }: ExplainerFigureProps) {
  let art: React.ReactNode;
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    art = <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block" }} />;
  } else if (shows === "loop") {
    art = <Loop alt={alt} />;
  } else if (shows === "before-after") {
    art = <BeforeAfter alt={alt} />;
  } else if (shows === "repo-map") {
    art = <RepoMap alt={alt} />;
  } else {
    art = <Range alt={alt} />;
  }

  return (
    <figure className="explainer-figure">
      {art}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
