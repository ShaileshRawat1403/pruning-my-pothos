"use client";

import { useState, useEffect } from "react";
import mermaid from "mermaid";

const SAMPLE_TEXT = `Step 1: Check code quality checks.
Step 2: If lint fails, notify developer and halt build.
Step 3: If lint passes, run test harness suite.
Step 4: If tests pass, trigger automatic preview deployments.
Step 5: If tests fail, generate failure log and block pull request.`;

export default function WorkflowToDiagramClient() {
  const [inputText, setInputText] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [diagramSvg, setDiagramSvg] = useState("");
  const [copyMermaidText, setCopyMermaidText] = useState("Copy Mermaid");
  const [copyJsonText, setCopyJsonText] = useState("Copy JSON");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor: "#b5402f",
        primaryTextColor: "#fff",
        lineColor: "#b5402f",
        primaryBorderColor: "#443a26",
      },
    });
  }, []);

  const loadSample = () => {
    setInputText(SAMPLE_TEXT);
  };

  const compileTextToMermaid = (text: string) => {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    let chart = "flowchart TD\n";
    const nodes: Array<{ id: string; label: string; isConditional: boolean }> = [];
    
    lines.forEach((line, index) => {
      let label = line;
      const nodeId = `node${index + 1}`;
      
      const stepMatch = line.match(/^Step\s*\d+:\s*(.*)/i);
      if (stepMatch) {
        label = stepMatch[1];
      }

      const isConditional = line.toLowerCase().includes("if");
      nodes.push({ id: nodeId, label, isConditional });
    });

    for (let i = 0; i < nodes.length; i++) {
      const current = nodes[i];
      const cleanLabel = current.label.replace(/"/g, '\\"');
      
      if (current.isConditional) {
        chart += `  ${current.id}{"${cleanLabel}"}\n`;
      } else {
        chart += `  ${current.id}["${cleanLabel}"]\n`;
      }

      if (i < nodes.length - 1) {
        const next = nodes[i + 1];
        if (current.isConditional) {
          chart += `  ${current.id} -->|Yes| ${next.id}\n`;
          if (i < nodes.length - 2) {
            chart += `  ${current.id} -->|No| ${nodes[i + 2].id}\n`;
          }
        } else {
          chart += `  ${current.id} --> ${next.id}\n`;
        }
      }
    }

    return chart;
  };

  const handleCompile = async () => {
    const text = inputText.trim();
    if (!text) return;

    const chart = compileTextToMermaid(text);
    setMermaidCode(chart);

    try {
      const uniqueId = `mermaid-svg-${Date.now()}`;
      const { svg } = await mermaid.render(uniqueId, chart);
      setDiagramSvg(svg);
    } catch (err: unknown) {
      console.error(err);
      setDiagramSvg('<div class="text-red-400 font-mono text-xs">Could not render the diagram. Check the workflow text and try again.</div>');
    }
  };

  const handleCopyMermaid = () => {
    if (!mermaidCode) return;
    navigator.clipboard.writeText(mermaidCode).then(() => {
      setCopyMermaidText("Copied!");
      setTimeout(() => setCopyMermaidText("Copy Mermaid"), 1500);
    });
  };

  const handleCopyJson = () => {
    if (!mermaidCode) return;
    const jsonStr = JSON.stringify({ mermaid: mermaidCode, text: inputText }, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopyJsonText("Copied!");
      setTimeout(() => setCopyJsonText("Copy JSON"), 1500);
    });
  };

  const handleDownloadSvg = () => {
    if (!diagramSvg) return;
    const blob = new Blob([diagramSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flowchart.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[520px] border-accent-purple/20 shadow-none">
      {/* Input Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              FLOW_INPUT // steps_parser
            </span>
          </div>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-[color:var(--card-border)] text-[color:var(--text-secondary)] hover:bg-white/10 hover:text-[color:var(--text-primary)] transition-all cursor-pointer"
          >
            LOAD SAMPLE STEPS
          </button>
        </div>
        
        <div className="relative flex-grow flex flex-col">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or type a step-by-step process here...&#10;Example:&#10;Step 1: Parse incoming webhook change requests.&#10;Step 2: Check files modified. If only Markdown, skip human gate and auto-approve.&#10;Step 3: If code changes, trigger RAG test suite runner.&#10;Step 4: Audit failures. If tests fail, open GitHub issue. Else, queue deployment loop."
            className="w-full flex-grow min-h-[300px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 text-xs font-sans text-[color:var(--text-primary)] focus:border-accent-purple/60 focus:bg-[color:var(--bg-color)] outline-none resize-none transition-all duration-300 placeholder:text-[color:var(--text-muted)]"
          />
        </div>

        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3.5 shadow-none from-accent-purple to-accent-cyan font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.01]"
        >
          Generate Flowchart
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              FLOW_OUTPUT // mermaid_render
            </span>
          </div>
          {diagramSvg && (
            <div className="flex gap-2">
              <button
                onClick={handleDownloadSvg}
                className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-[color:var(--text-primary)] hover:bg-accent-purple/20 hover:border-accent-purple/40 transition-all cursor-pointer"
              >
                DOWNLOAD
              </button>
              <button
                onClick={handleCopyMermaid}
                className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-[color:var(--text-primary)] hover:bg-accent-cyan/20 hover:border-accent-cyan/40 transition-all cursor-pointer"
              >
                MERMAID
              </button>
              <button
                onClick={handleCopyJson}
                className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-accent-pink/10 border border-accent-pink/20 text-[color:var(--text-primary)] hover:bg-accent-pink/20 hover:border-accent-pink/40 transition-all cursor-pointer"
              >
                JSON
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-grow min-h-[340px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {!diagramSvg ? (
            <div className="flex-grow flex flex-col items-center justify-center gap-3 relative z-10 py-12">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-[color:var(--text-muted)] animate-pulse">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <p className="text-[11px] font-mono text-[color:var(--text-muted)] uppercase tracking-wider">Awaiting Workflow Diagram Rendering...</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between relative z-10 h-full">
              <div 
                className="w-full flex-grow flex items-center justify-center text-[color:var(--text-secondary)] overflow-auto py-2"
                dangerouslySetInnerHTML={{ __html: diagramSvg }}
              />
              
              {/* Telemetry status block */}
              <div className="border-t border-[color:var(--card-border)] pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-[color:var(--text-primary)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping"></span>
                  <span>[RENDERER]: READY // SVG_DIAGRAM_EMITTED</span>
                </div>
                <span className="text-[color:var(--text-muted)]">CLIENT_SIDE_ONLY</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
