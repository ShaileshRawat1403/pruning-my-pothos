"use client";

import { useState } from "react";

const SAMPLE_CHANGE = `I want to add a light mode toggle to layout.tsx, adjust globals.css design tokens, configure theme providers, and verify static compilation.`;

export default function ChangeToChecklistClient() {
  const [inputText, setInputText] = useState("");
  const [checklist, setChecklist] = useState<any>(null);
  const [copyText, setCopyText] = useState("Copy Checklist");

  const loadSample = () => {
    setInputText(SAMPLE_CHANGE);
  };

  const handleAnalyze = () => {
    const rawValue = inputText.trim();
    if (!rawValue) {
      alert("Please describe your planned change first.");
      return;
    }

    let risk = "Low";
    let color = "#828c54";
    let filesTouched = "Individual page components";
    let evidence = "npm run build executes successfully";
    
    const textLower = rawValue.toLowerCase();
    if (textLower.includes("routing") || textLower.includes("router") || textLower.includes("split") || textLower.includes("delete")) {
      risk = "Critical";
      color = "#c2564a";
      filesTouched = "Routing paths, index pages, slug layouts";
      evidence = "Manual verification of all affected routes + build status checks";
    } else if (textLower.includes("css") || textLower.includes("style") || textLower.includes("theme") || textLower.includes("global")) {
      risk = "Medium";
      color = "#c08a2e";
      filesTouched = "Global styles, layouts, layout wrappers";
      evidence = "Visual verification in browser + mobile screen check";
    }

    setChecklist({
      risk,
      color,
      filesTouched,
      evidence
    });
  };

  const handleCopy = () => {
    if (!checklist) return;
    const textOutput = `### Change Risk Checklist (${checklist.risk} Risk)\n- [ ] Verify that changes are restricted to intended files (no global bleed).\n- [ ] Ensure build compiles with zero compilation errors (npm run build).\n- [ ] Verify layout structure, responsive scaling, and alignment on mobile screen viewport.\n${checklist.risk === "Critical" ? "- [ ] [Gated Check] Obtain manual developer sign-off for routing split modifications.\n" : ""}- [ ] Record execution summary to ledger.jsonl file before merge.`;
    
    navigator.clipboard.writeText(textOutput).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Checklist"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[520px] border-accent-purple/20 shadow-none">
      {/* Input Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              AUDIT_INPUT // change_analyzer
            </span>
          </div>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-[color:var(--card-border)] text-[color:var(--text-secondary)] hover:bg-white/10 hover:text-[color:var(--text-primary)] transition-all cursor-pointer"
          >
            LOAD SAMPLE SPEC
          </button>
        </div>
        
        <div className="relative flex-grow flex flex-col">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste issue details or explain what files/routings you want to change...&#10;Example:&#10;I want to change the homepage routing split from Sentiments to Systems, overhaul the global stylesheet variable themes, and run build checks."
            className="w-full flex-grow min-h-[300px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 text-xs font-mono text-[color:var(--text-primary)] focus:border-accent-purple/60 focus:bg-[color:var(--bg-color)] outline-none resize-none transition-all duration-300 placeholder:text-[color:var(--text-muted)]"
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="btn-premium btn-primary w-full py-3.5 shadow-none from-accent-purple to-accent-pink font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.01]"
        >
          Analyze & Generate Checklist
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-pink animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              AUDIT_OUTPUT // review_gates
            </span>
          </div>
          {checklist && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-[11px] font-mono rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-[color:var(--text-primary)] hover:bg-accent-purple/20 hover:border-accent-purple/40 transition-all cursor-pointer"
            >
              {copyText}
            </button>
          )}
        </div>
        
        <div className="flex-grow min-h-[340px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {!checklist ? (
            <div className="flex-grow flex flex-col items-center justify-center gap-3 relative z-10 py-12">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-[color:var(--text-muted)] animate-pulse">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <p className="text-[11px] font-mono text-[color:var(--text-muted)] uppercase tracking-wider">Awaiting Change Input Specification...</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between relative z-10 h-full">
              <div className="flex flex-col gap-4 text-sm text-[color:var(--text-secondary)]">
                <div className="flex justify-between items-center">
                  <span 
                    className="px-2.5 py-1 border rounded text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm"
                    style={{
                      backgroundColor: `${checklist.color}15`,
                      borderColor: `${checklist.color}40`,
                      color: checklist.color
                    }}
                  >
                    {checklist.risk} Risk Profile
                  </span>
                  <span className="text-[9px] font-mono text-[color:var(--text-muted)]">ID // CHG-9402</span>
                </div>
                
                <div className="bg-white/[0.02] border border-[color:var(--card-border)] rounded-lg p-3">
                  <h4 className="font-heading text-xs font-bold text-[color:var(--text-primary)] mb-1.5 uppercase tracking-wide">Telemetry Evaluation</h4>
                  <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">
                    <strong>Touchpoints:</strong> {checklist.filesTouched}<br />
                    <strong>Evidence Target:</strong> {checklist.evidence}
                  </p>
                </div>

                <div className="border-t border-[color:var(--card-border)] pt-4">
                  <h4 className="font-heading text-xs font-bold text-[color:var(--text-primary)] mb-3 uppercase tracking-wide">HITL Review Gates</h4>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-start gap-2.5 text-xs text-[color:var(--text-secondary)] cursor-pointer hover:text-[color:var(--text-primary)] transition-colors">
                      <input type="checkbox" className="mt-0.5 accent-accent-purple rounded" />
                      <span>Verify that changes are restricted to intended files (no global bleed).</span>
                    </label>
                    <label className="flex items-start gap-2.5 text-xs text-[color:var(--text-secondary)] cursor-pointer hover:text-[color:var(--text-primary)] transition-colors">
                      <input type="checkbox" className="mt-0.5 accent-accent-purple rounded" />
                      <span>Ensure build compiles with zero compilation errors (npm run build).</span>
                    </label>
                    <label className="flex items-start gap-2.5 text-xs text-[color:var(--text-secondary)] cursor-pointer hover:text-[color:var(--text-primary)] transition-colors">
                      <input type="checkbox" className="mt-0.5 accent-accent-purple rounded" />
                      <span>Verify layout structure, responsive scaling, and alignment on mobile screen viewport.</span>
                    </label>
                    {checklist.risk === "Critical" && (
                      <label className="flex items-start gap-2.5 text-xs text-red-400 font-semibold cursor-pointer hover:text-red-300 transition-colors">
                        <input type="checkbox" className="mt-0.5 accent-red-400 rounded" />
                        <span>[Gated Check] Obtain manual developer sign-off for routing split modifications.</span>
                      </label>
                    )}
                    <label className="flex items-start gap-2.5 text-xs text-[color:var(--text-secondary)] cursor-pointer hover:text-[color:var(--text-primary)] transition-colors">
                      <input type="checkbox" className="mt-0.5 accent-accent-purple rounded" />
                      <span>Record execution summary to ledger.jsonl file before merge.</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Status footer block */}
              <div className="border-t border-[color:var(--card-border)] pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-[color:var(--text-primary)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping"></span>
                  <span>[AUDIT]: COMPILE_SUCCESS</span>
                </div>
                <span className="text-[color:var(--text-muted)]">GATES_GENERATED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
