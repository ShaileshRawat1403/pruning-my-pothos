"use client";

import { useState } from "react";
import TerminalSim, { SimStep } from "./TerminalSim";

// Fake .env used only to demonstrate the scanner. These values are assembled at
// browser runtime so the static export never contains credential-like literals.
// None of these are real credentials.
const fromCodes = (...codes: number[]) => String.fromCharCode(...codes);

const DEMO = {
  aws: fromCodes(65, 75, 73, 65, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 65, 66, 67, 68, 69, 70),
  stripe: fromCodes(115, 107, 95, 108, 105, 118, 101, 95, 53, 49, 72, 56, 120, 89, 122, 50, 101, 90, 118, 75, 89, 108, 111, 50, 67, 97, 98, 99, 100, 69, 70, 103, 104, 73, 74, 107, 108, 77, 78, 111, 112),
  github: fromCodes(103, 104, 112, 95, 49, 54, 67, 55, 101, 52, 50, 70, 50, 57, 50, 99, 54, 57, 49, 50, 69, 55, 55, 49, 48, 99, 56, 51, 56, 51, 52, 55, 65, 101, 49, 55, 56, 66, 52, 97),
};

const SAMPLE = `# .env.production
DATABASE_URL=postgres://app:s3cr3t@db.internal:5432/prod
AWS_ACCESS_KEY_ID=${DEMO.aws}
STRIPE_KEY=${DEMO.stripe}
GITHUB_TOKEN=${DEMO.github}
JWT=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.dozjgNryP4J3jVmNHl0w5N
LOG_LEVEL=debug
FEATURE_FLAG_NEW_UI=true`;

interface Finding {
  label: string;
  line: number;
  preview: string;
}

/** detectors match secrets by SHAPE, not just by key name */
const DETECTORS: { label: string; re: RegExp }[] = [
  { label: "AWS access key id", re: /AKIA[0-9A-Z]{16}/g },
  { label: "Stripe live key", re: /sk_live_[0-9a-zA-Z]{16,}/g },
  { label: "GitHub token", re: /gh[pousr]_[0-9A-Za-z]{20,}/g },
  { label: "Google API key", re: /AIza[0-9A-Za-z_\-]{35}/g },
  { label: "Slack token", re: /xox[baprs]-[0-9A-Za-z-]{10,}/g },
  { label: "JWT", re: /eyJ[A-Za-z0-9_-]{6,}\.[A-Za-z0-9_-]{6,}\.[A-Za-z0-9_-]{6,}/g },
  { label: "Private key block", re: /-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----/g },
  { label: "URL with inline password", re: /[a-zA-Z][a-zA-Z0-9+.\-]*:\/\/[^\s:@/]+:[^\s:@/]+@/g },
  { label: "High-entropy token", re: /\b[0-9a-fA-F]{32,}\b/g },
];

function redactValue(v: string): string {
  if (v.length <= 8) return "•".repeat(v.length);
  return v.slice(0, 3) + "•".repeat(Math.min(10, Math.max(4, v.length - 7))) + v.slice(-4);
}

function scan(text: string): { findings: Finding[]; redacted: string } {
  const lines = text.split("\n");
  const findings: Finding[] = [];
  const redactedLines = lines.map((line, idx) => {
    let out = line;
    for (const d of DETECTORS) {
      d.re.lastIndex = 0;
      out = out.replace(d.re, (m) => {
        findings.push({ label: d.label, line: idx + 1, preview: redactValue(m) });
        return redactValue(m);
      });
    }
    return out;
  });
  return { findings, redacted: redactedLines.join("\n") };
}

export default function SecretScannerClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ findings: Finding[]; redacted: string } | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy redacted");

  const run = () => {
    const text = input.trim();
    if (!text) { alert("Paste some config, .env, or logs first."); return; }
    const r = scan(text);
    setResult(r);
    setShowOutput(false);
    setRunKey((k) => k + 1);
  };

  const steps: SimStep[] = result
    ? [
        { text: "Reading config and env surface...", status: "ok" },
        { text: "Matching by shape, not just by key name...", status: "ok", ms: 750 },
        result.findings.length > 0
          ? { text: `${result.findings.length} candidate secret${result.findings.length === 1 ? "" : "s"} found. Redacting at parse time.`, status: "warn", ms: 800 }
          : { text: "No secrets by shape. Either clean, or very well hidden.", status: "ok", ms: 800 },
        { text: "No request executed. Nothing left the room.", status: "info" },
      ]
    : [];

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.redacted).then(() => {
      setCopyLabel("Copied");
      setTimeout(() => setCopyLabel("Copy redacted"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[520px]" style={{ borderTop: "3px solid var(--accent-purple)" }}>
      {/* Input */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-purple)" }} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              INPUT // config, env, logs
            </span>
          </div>
          <button
            onClick={() => setInput(SAMPLE)}
            className="px-3 py-1 text-[11px] font-mono rounded-sm transition-all"
            style={{ background: "color-mix(in srgb, var(--text-primary) 5%, transparent)", border: "1px solid var(--card-border)", color: "var(--text-secondary)" }}
          >
            LOAD SAMPLE
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste an .env file, config, or curl/log output. Nothing leaves your browser."
          className="w-full flex-grow min-h-[300px] p-4 text-xs font-mono outline-none resize-none rounded-sm"
          style={{ background: "var(--bg-color)", border: "1px solid var(--card-border)", color: "var(--text-primary)" }}
        />

        <button
          onClick={run}
          className="btn-premium btn-primary w-full font-heading font-bold uppercase tracking-wide"
        >
          Run scan
        </button>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-green)" }} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              OUTPUT // tesserakit-config
            </span>
          </div>
          {showOutput && result && (
            <button
              onClick={copy}
              className="px-3 py-1 text-[11px] font-mono rounded-sm transition-all"
              style={{ background: "color-mix(in srgb, var(--accent-purple) 12%, transparent)", border: "1px solid var(--card-border-hover)", color: "var(--text-primary)" }}
            >
              {copyLabel}
            </button>
          )}
        </div>

        {!result ? (
          <div className="flex-grow min-h-[300px] rounded-sm flex flex-col items-center justify-center gap-3 text-center p-8" style={{ background: "var(--bg-color)", border: "1px dashed var(--card-border)" }}>
            <span className="text-2xl" style={{ opacity: 0.4 }}>🔑</span>
            <p className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Paste, then run. Secrets are matched by shape and redacted in place.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TerminalSim
              command="tessera run --pack config --redact"
              steps={steps}
              runKey={runKey}
              onComplete={() => setShowOutput(true)}
            />

            {showOutput && (
              <div className="flex flex-col gap-4 animate-fade-in">
                {/* findings */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    {result.findings.length} finding{result.findings.length === 1 ? "" : "s"}
                  </span>
                  {result.findings.length === 0 ? (
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Nothing matched. Clean surface.</p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {result.findings.map((f, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 text-xs font-mono px-3 py-2 rounded-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                          <span className="shrink-0" style={{ color: "var(--accent-purple)" }}>{f.label}</span>
                          <span className="truncate text-right min-w-0" style={{ color: "var(--text-muted)" }}>L{f.line} · {f.preview}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* redacted output */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Redacted</span>
                  <pre className="text-[11px] font-mono p-4 rounded-sm overflow-auto max-h-[220px] whitespace-pre-wrap" style={{ background: "var(--bg-color)", border: "1px solid var(--card-border)", color: "var(--text-secondary)" }}>
                    {result.redacted}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
