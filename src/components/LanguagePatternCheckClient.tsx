"use client";

import { useState } from "react";
import { getPatternInfo, humanizePatternId } from "../data/languageopsPatterns";

const LINT_ENDPOINT = "https://languageops-web.vercel.app/api/lint";

const SAMPLE = `In today's fast-paced world, it's important to delve into the details and leverage a robust, comprehensive framework. It's not just about efficiency; it's about excellence. Furthermore, we should note that this represents a significant paradigm shift. Additionally, this demonstrates a novel approach. Moreover, the results are truly remarkable.`;

interface LintFlag {
  pattern_id: string;
  occurrences: number;
  severity: "low" | "medium";
  density_per_1000_words: number;
  detection_mode: string;
  action: string;
  litops?: {
    id: string;
    name: string;
    relation: "overuse" | "counterpart";
    url: string;
  };
}

interface LintResponse {
  text_id: string;
  word_count: number;
  summary: string;
  is_clean: boolean;
  accumulation_score: number;
  flags: LintFlag[];
  semantic_review_required: string[];
}

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; result: LintResponse };

const SEVERITY_COLOR: Record<string, string> = {
  low: "var(--accent-amber)",
  medium: "var(--accent-purple)",
};

export default function LanguagePatternCheckClient() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  const run = async () => {
    const text = input.trim();
    if (!text) {
      setState({ status: "error", message: "Paste or write some text first." });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch(LINT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        setState({
          status: "error",
          message: retryAfter
            ? `Rate limited. Try again in about ${retryAfter}s.`
            : "Rate limited. Try again in a moment.",
        });
        return;
      }

      if (!res.ok) {
        setState({
          status: "error",
          message: `LanguageOps returned an error (${res.status}). Try again shortly.`,
        });
        return;
      }

      const result = (await res.json()) as LintResponse;
      setState({ status: "done", result });
    } catch {
      setState({
        status: "error",
        message: "Could not reach LanguageOps. Check your connection and try again.",
      });
    }
  };

  const loading = state.status === "loading";

  return (
    <div
      className="card-glass p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[520px]"
      style={{ borderTop: "3px solid var(--accent-purple)" }}
    >
      {/* Input */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-purple)" }} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              INPUT // draft, paragraph, post
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
          placeholder="Paste a draft, email, or post. This is sent to LanguageOps' free pattern-detection endpoint: no key, no cost, nothing rewritten or stored."
          className="w-full flex-grow min-h-[300px] p-4 text-xs font-mono outline-none resize-none rounded-sm"
          style={{ background: "var(--bg-color)", border: "1px solid var(--card-border)", color: "var(--text-primary)" }}
        />

        <button
          onClick={run}
          disabled={loading}
          className="btn-premium btn-primary w-full font-heading font-bold uppercase tracking-wide"
          style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "wait" : "pointer" }}
        >
          {loading ? "Checking…" : "Check patterns"}
        </button>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-green)" }} />
          <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
            OUTPUT // LanguageOps · live
          </span>
        </div>

        {state.status === "idle" && (
          <div className="flex-grow min-h-[300px] rounded-sm flex flex-col items-center justify-center gap-3 text-center p-8" style={{ background: "var(--bg-color)", border: "1px dashed var(--card-border)" }}>
            <span className="text-2xl" style={{ opacity: 0.4 }}>✎</span>
            <p className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Paste, then check. This calls the real LanguageOps detector, not a mock.
            </p>
          </div>
        )}

        {state.status === "loading" && (
          <div className="ledger-surface p-4 font-mono text-xs leading-relaxed" style={{ borderRadius: "4px" }}>
            <div className="flex items-center gap-2 pb-2 mb-2" style={{ borderBottom: "1px solid var(--card-border)", color: "var(--text-muted)" }}>
              <span style={{ color: "var(--accent-green)" }}>●</span>
              <span style={{ color: "var(--accent-amber)" }}>●</span>
              <span style={{ color: "var(--accent-purple)" }}>●</span>
              <span className="ml-2 text-[10px] tracking-widest">run.tty</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-cyan)" }} className="animate-pulse">›</span>
              <span>Sending to LanguageOps for deterministic pattern detection…</span>
            </div>
          </div>
        )}

        {state.status === "error" && (
          <div className="flex-grow min-h-[300px] rounded-sm flex flex-col items-center justify-center gap-3 text-center p-8" style={{ background: "var(--bg-color)", border: "1px dashed var(--card-border)" }}>
            <span className="text-2xl" style={{ color: "var(--accent-purple)" }}>⚠</span>
            <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{state.message}</p>
          </div>
        )}

        {state.status === "done" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-sm text-xs font-mono" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <span style={{ color: state.result.is_clean ? "var(--accent-green)" : "var(--text-primary)" }}>
                {state.result.is_clean ? "✔ No flagged patterns" : `Score ${state.result.accumulation_score.toFixed(2)}`}
              </span>
              <span style={{ color: "var(--text-muted)" }}>{state.result.word_count} words</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {state.result.flags.length} pattern{state.result.flags.length === 1 ? "" : "s"} flagged
              </span>

              {state.result.flags.length === 0 ? (
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Nothing from the deterministic registry matched. Clean by that measure. This isn&rsquo;t an authorship or quality judgment, just an absence of known patterns.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {state.result.flags.map((f, i) => {
                    const info = getPatternInfo(f.pattern_id);
                    const color = SEVERITY_COLOR[f.severity] ?? "var(--text-secondary)";
                    return (
                      <div key={i} className="flex flex-col gap-1 text-xs px-3 py-2.5 rounded-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono font-bold" style={{ color }}>
                            {humanizePatternId(f.pattern_id)}
                          </span>
                          <span className="font-mono shrink-0" style={{ color: "var(--text-muted)" }}>
                            ×{f.occurrences} · {f.severity}
                          </span>
                        </div>
                        {info?.description && (
                          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            {info.description}
                          </p>
                        )}
                        {f.litops && (
                          <a
                            href={f.litops.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-slide font-mono text-[11px] mt-0.5"
                            style={{ color: "var(--accent-cyan)" }}
                          >
                            {f.litops.relation === "overuse"
                              ? `This is the overused form of ${f.litops.name}. See the real craft →`
                              : `Try ${f.litops.name} instead →`}
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {state.result.semantic_review_required.length > 0 && (
              <p className="text-[11px] font-mono leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {`${state.result.semantic_review_required.length} additional pattern${
                  state.result.semantic_review_required.length === 1 ? "" : "s"
                } would need real language judgment (tone, sycophancy, vagueness) to check accurately. That requires a model call, so it’s outside what this free pass evaluates.`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
