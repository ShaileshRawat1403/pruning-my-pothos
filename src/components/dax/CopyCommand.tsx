"use client";

import { useState } from "react";

interface CopyCommandProps {
  label: string;
  command: string;
}

export default function CopyCommand({ label, command }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-[3px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] overflow-hidden hover:border-[color:var(--card-border-hover)] transition-colors">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[color:var(--card-border)] bg-[color:var(--bg-elevated)] font-mono text-[11px] text-[color:var(--text-muted)]">
        <span>{label}</span>
        <button
          type="button"
          onClick={onCopy}
          className="text-[color:var(--accent-amber)] hover:text-[color:var(--text-primary)] cursor-pointer"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="m-0 px-[18px] py-4 font-mono text-[13.5px] leading-relaxed text-[color:var(--text-primary)] overflow-x-auto whitespace-pre-wrap break-all">
        {command}
      </pre>
    </div>
  );
}
