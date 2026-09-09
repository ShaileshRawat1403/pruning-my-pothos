"use client";

import { useState } from "react";

const SAMPLE_CSV = `query,response,expected_criteria
"What is the system theme?","Sans Serif Systems uses a dark cyber theme.","Must reference dark cyber theme"
"Explain guided loops.","Guided loops use evaluation checks to auto-correct errors.","Should mention eval checks and self-correction"`;

export default function CsvToEvalClient() {
  const [inputText, setInputText] = useState("");
  const [outputJsonl, setOutputJsonl] = useState("");
  const [copyText, setCopyText] = useState("Copy JSONL");

  const loadSample = () => {
    setInputText(SAMPLE_CSV);
  };

  const handleCompile = () => {
    const rawValue = inputText.trim();
    if (!rawValue) {
      alert("Please paste some CSV data first.");
      return;
    }

    try {
      const lines = rawValue.split("\n");
      if (lines.length < 2) {
        alert("Invalid CSV: Needs at least a header row and one data row.");
        return;
      }

      // Simple CSV cell splitter (handles quotes)
      const parseRow = (text: string) => {
        const matches = text.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || text.split(",");
        return matches.map((c) => c.replace(/^["']|["']$/g, "").trim());
      };

      const headers = parseRow(lines[0]);
      const jsonlEntries: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const row = parseRow(lines[i]);
        const entry: Record<string, string> = {};
        headers.forEach((h, index) => {
          entry[h] = row[index] || "";
        });

        // Structure as a canonical evaluation unit
        jsonlEntries.push(
          JSON.stringify(
            {
              input: entry.query || entry.input || "",
              output: entry.response || entry.output || "",
              evaluation_rubric: {
                assertions: [
                  {
                    type: "contains_phrase",
                    expected:
                      entry.expected_criteria ||
                      entry.expected ||
                      "Must provide accurate context",
                  },
                ],
              },
            }
          )
        );
      }

      setOutputJsonl(jsonlEntries.join("\n"));
    } catch (e: unknown) {
      alert("Error parsing CSV: " + (e instanceof Error ? e.message : "Invalid input"));
    }
  };

  const handleCopy = () => {
    if (!outputJsonl) return;
    navigator.clipboard.writeText(outputJsonl).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy JSONL"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[520px] border-accent-orange/20 shadow-none">
      {/* Input Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              DATA_INPUT // csv_reader
            </span>
          </div>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-[color:var(--card-border)] text-[color:var(--text-secondary)] hover:bg-white/10 hover:text-[color:var(--text-primary)] transition-all cursor-pointer"
          >
            LOAD SAMPLE CSV
          </button>
        </div>
        
        <div className="relative flex-grow flex flex-col">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste CSV rows here (must include headers on the first line)...&#10;Example:&#10;query,response,expected&#10;'how to build a loop','use a transition table','should mention trigger-action flow'"
            className="w-full flex-grow min-h-[300px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 text-xs font-mono text-[color:var(--text-primary)] focus:border-accent-orange/60 focus:bg-[color:var(--bg-color)] outline-none resize-none transition-all duration-300 placeholder:text-[color:var(--text-muted)]"
          />
        </div>

        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3.5 from-accent-orange to-accent-pink font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.01]"
        >
          Compile Evaluation Dataset
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-pink animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              EVAL_OUTPUT // jsonl_assertions
            </span>
          </div>
          {outputJsonl && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-[11px] font-mono rounded-lg bg-accent-orange/10 border border-accent-orange/20 text-[color:var(--text-primary)] hover:bg-accent-orange/20 hover:border-accent-orange/40 transition-all cursor-pointer"
            >
              {copyText}
            </button>
          )}
        </div>
        
        <div className="flex-grow min-h-[340px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {!outputJsonl ? (
            <div className="flex-grow flex flex-col items-center justify-center gap-3 relative z-10 py-12">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-[color:var(--text-muted)] animate-pulse">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                <rect x="9" y="9" width="11" height="11" rx="2" ry="2"/>
              </svg>
              <p className="text-[11px] font-mono text-[color:var(--text-muted)] uppercase tracking-wider">Awaiting CSV Data Ingestion...</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between relative z-10 h-full">
              <pre className="w-full max-h-[310px] text-xs font-mono text-[color:var(--text-secondary)] whitespace-pre overflow-auto self-start">
                <code>{outputJsonl}</code>
              </pre>
              
              {/* Telemetry status block */}
              <div className="border-t border-[color:var(--card-border)] pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-[color:var(--text-primary)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping"></span>
                  <span>[INGESTION]: READY // EVALSPACK_COMPILED</span>
                </div>
                <span className="text-[color:var(--text-muted)]">LOCAL_EXEC_OK</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
