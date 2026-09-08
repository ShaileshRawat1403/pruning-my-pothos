"use client";

import { useState } from "react";

const SAMPLE_REPO = `src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
package.json`;

export default function RepoContextPackClient() {
  const [inputText, setInputText] = useState("");
  const [outputXml, setOutputXml] = useState("");
  const [copyText, setCopyText] = useState("Copy XML");

  const loadSample = () => {
    setInputText(SAMPLE_REPO);
  };

  const handleCompile = () => {
    const rawValue = inputText.trim();
    if (!rawValue) {
      alert("Please list some files first.");
      return;
    }

    const files = rawValue.split("\n").map(f => f.trim()).filter(Boolean);
    
    // Compile to structured XML pack format
    let xmlContent = `<repository_context>\n  <directory_structure>\n`;
    files.forEach(f => {
      xmlContent += `    <file path="${f}" />\n`;
    });
    xmlContent += `  </directory_structure>\n\n`;
    
    files.forEach(f => {
      xmlContent += `  <file_contents path="${f}">\n    <!-- Content of ${f} goes here -->\n  </file_contents>\n\n`;
    });
    
    xmlContent += `</repository_context>`;

    setOutputXml(xmlContent);
  };

  const handleCopy = () => {
    if (!outputXml) return;
    navigator.clipboard.writeText(outputXml).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy XML"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[520px] border-accent-cyan/20 shadow-none">
      {/* Input Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              PACK_INPUT // file_manifest
            </span>
          </div>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-[color:var(--card-border)] text-[color:var(--text-secondary)] hover:bg-white/10 hover:text-[color:var(--text-primary)] transition-all cursor-pointer"
          >
            LOAD SAMPLE MANIFEST
          </button>
        </div>
        
        <div className="relative flex-grow flex flex-col">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste file path listings, readme content, or selected files...&#10;Example:&#10;src/app/page.tsx&#10;src/app/layout.tsx&#10;package.json"
            className="w-full flex-grow min-h-[300px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 text-xs font-mono text-[color:var(--text-primary)] focus:border-accent-cyan/60 focus:bg-[color:var(--bg-color)] outline-none resize-none transition-all duration-300 placeholder:text-[color:var(--text-muted)]"
          />
        </div>

        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3.5 shadow-none from-accent-cyan to-accent-purple font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.01]"
        >
          Compile Context Pack
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--text-secondary)]">
              PACK_OUTPUT // xml_tree
            </span>
          </div>
          {outputXml && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-[11px] font-mono rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-[color:var(--text-primary)] hover:bg-accent-cyan/20 hover:border-accent-cyan/40 transition-all cursor-pointer"
            >
              {copyText}
            </button>
          )}
        </div>
        
        <div className="flex-grow min-h-[340px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {!outputXml ? (
            <div className="flex-grow flex flex-col items-center justify-center gap-3 relative z-10 py-12">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-[color:var(--text-muted)] animate-pulse">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              <p className="text-[11px] font-mono text-[color:var(--text-muted)] uppercase tracking-wider">Awaiting Manifest Packaging...</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between relative z-10 h-full">
              <pre className="w-full max-h-[310px] text-xs font-mono text-[color:var(--text-secondary)] whitespace-pre overflow-auto self-start">
                <code>{outputXml}</code>
              </pre>
              
              {/* Telemetry status block */}
              <div className="border-t border-[color:var(--card-border)] pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-[color:var(--text-primary)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping"></span>
                  <span>[PACKAGER]: READY // XML_CONTEXT_PACKED</span>
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
