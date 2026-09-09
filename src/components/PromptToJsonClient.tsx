"use client";

import { useState } from "react";

const SAMPLE_PROMPT = `Track repository commits.
Required Fields:
- hash (string, sha256 format)
- message (string)
- additionsCount (number)
- deletionsCount (number)
- isMergedToMain (boolean)
- tagsList (array of strings)`;

export default function PromptToJsonClient() {
  const [inputText, setInputText] = useState("");
  const [outputSchema, setOutputSchema] = useState("");
  const [outputExample, setOutputExample] = useState("");
  const [activeTab, setActiveTab] = useState<"schema" | "example">("schema");
  const [copyText, setCopyText] = useState("Copy");

  const loadSample = () => {
    setInputText(SAMPLE_PROMPT);
  };

  const compilePromptToJson = (text: string) => {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const schema: {
      $schema: string;
      title: string;
      type: string;
      properties: Record<string, { type: string; description?: string; items?: { type: string } }>;
      required: string[];
    } = {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "GeneratedStructuredOutput",
      type: "object",
      properties: {},
      required: []
    };

    lines.forEach((line) => {
      const listMatch = line.match(/^[-*+]\s*(\w+)\s*\(([^)]+)\)/i) || line.match(/^[-*+]\s*(\w+)\s*-\s*(\w+)/i) || line.match(/^[-*+]\s*(\w+)/i);
      if (listMatch) {
        const fieldName = listMatch[1];
        const typeStr = listMatch[2] || "string";
        let type = "string";

        if (typeStr.includes("number") || typeStr.includes("int") || typeStr.includes("float")) {
          type = "number";
        } else if (typeStr.includes("boolean") || typeStr.includes("bool")) {
          type = "boolean";
        } else if (typeStr.includes("array") || typeStr.includes("list")) {
          type = "array";
        }

        schema.properties[fieldName] = {
          type: type,
          description: `Generated schema property for ${fieldName}.`
        };

        if (type === "array") {
          schema.properties[fieldName].items = {
            type: "string"
          };
        }

        schema.required.push(fieldName);
      }
    });

    if (Object.keys(schema.properties).length === 0) {
      schema.properties["id"] = { type: "string" };
      schema.properties["description"] = { type: "string" };
      schema.required = ["id"];
    }

    return schema;
  };

  const handleCompile = () => {
    const text = inputText.trim();
    if (!text) return;

    try {
      const schemaObj = compilePromptToJson(text);
      setOutputSchema(JSON.stringify(schemaObj, null, 2));

      // Generate matching JSON example
      const mock: Record<string, string | number | boolean | string[]> = {};
      Object.keys(schemaObj.properties).forEach((key) => {
        const prop = schemaObj.properties[key];
        if (prop.type === "number") {
          mock[key] = 42;
        } else if (prop.type === "boolean") {
          mock[key] = true;
        } else if (prop.type === "array") {
          mock[key] = ["sample_item_1", "sample_item_2"];
        } else {
          mock[key] = "sample_value";
        }
      });
      setOutputExample(JSON.stringify(mock, null, 2));
    } catch (err: unknown) {
      setOutputSchema(`Failed to generate JSON schema: ${err instanceof Error ? err.message : "Invalid input"}`);
      setOutputExample("");
    }
  };

  const handleCopy = () => {
    const targetText = activeTab === "schema" ? outputSchema : outputExample;
    if (!targetText) return;
    navigator.clipboard.writeText(targetText).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 1500);
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
              CONSOLE_INPUT // spec_parser
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
            placeholder="Paste fields, notes, or prompts here...&#10;Example:&#10;I need a schema to track commits:&#10;- hash (string)&#10;- additionsCount (number)&#10;- isMergedToMain (boolean)"
            className="w-full flex-grow min-h-[300px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 text-xs font-mono text-[color:var(--text-primary)] focus:border-accent-cyan/60 focus:bg-[color:var(--bg-color)] outline-none resize-none transition-all duration-300 placeholder:text-[color:var(--text-muted)]"
          />
        </div>

        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3.5 shadow-none font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.01]"
        >
          Compile Schema & Example
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 bg-[color:var(--bg-color)] p-1 rounded-lg border border-[color:var(--card-border)]">
            <button
              onClick={() => setActiveTab("schema")}
              className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "schema"
                  ? "bg-accent-cyan/15 text-[color:var(--text-primary)] border border-accent-cyan/30 shadow-sm"
                  : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
              }`}
            >
              Schema
            </button>
            <button
              onClick={() => setActiveTab("example")}
              className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "example"
                  ? "bg-accent-cyan/15 text-[color:var(--text-primary)] border border-accent-cyan/30 shadow-sm"
                  : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
              }`}
            >
              Example JSON
            </button>
          </div>
          {(outputSchema || outputExample) && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-[11px] font-mono rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-[color:var(--text-primary)] hover:bg-accent-cyan/20 hover:border-accent-cyan/40 transition-all cursor-pointer"
            >
              {copyText} {activeTab === "schema" ? "Schema" : "Example"}
            </button>
          )}
        </div>
        
        <div className="flex-grow min-h-[340px] bg-[color:var(--bg-color)] border border-[color:var(--card-border)] rounded-sm p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {!(activeTab === "schema" ? outputSchema : outputExample) ? (
            <div className="flex-grow flex flex-col items-center justify-center gap-3 relative z-10 py-12">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-[color:var(--text-muted)] animate-pulse">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3"/>
                <path d="M21 12H3"/>
              </svg>
              <p className="text-[11px] font-mono text-[color:var(--text-muted)] uppercase tracking-wider">Awaiting Input Spec Compilation...</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between relative z-10 h-full">
              <pre className="w-full max-h-[310px] text-xs font-mono text-[color:var(--text-secondary)] whitespace-pre overflow-auto self-start">
                <code>{activeTab === "schema" ? outputSchema : outputExample}</code>
              </pre>
              
              {/* Telemetry output status block */}
              <div className="border-t border-[color:var(--card-border)] pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-green-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                  <span>[STATUS]: READY // COMPILE_SUCCESS</span>
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
