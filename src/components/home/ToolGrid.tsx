"use client";

import { useState } from "react";
import Link from "next/link";

export interface ToolItem {
  name: string;
  badge: string;
  category: string;
  desc: string;
  installCmd: string;
  playgroundHref: string;
  pypiHref?: string;
}

interface ToolCardProps {
  tool: ToolItem;
}

export function ToolCard({ tool }: ToolCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tool.installCmd);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="p-5 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between hover:border-[#121212] transition-all shadow-2xs h-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase font-bold text-[#16A34A] tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded">
            {tool.badge}
          </span>
          <span className="font-mono text-[10px] text-[#7A7872] uppercase tracking-wider">
            {tool.category}
          </span>
        </div>
        <strong className="font-heading font-bold text-base text-[#121212]">
          {tool.name}
        </strong>
        <p className="text-xs text-[#55534E] leading-relaxed">
          {tool.desc}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-[#F4F2EC] flex flex-col gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="w-full px-3 py-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F4F2EC] border border-[#EAE8E2] font-mono text-[11px] text-[#121212] text-left flex items-center justify-between transition-colors cursor-pointer"
          title="Copy install command"
        >
          <span className="truncate">{tool.installCmd}</span>
          <span className="text-[10px] font-bold text-[#16A34A] shrink-0 ml-2">
            {isCopied ? "✓ COPIED" : "COPY"}
          </span>
        </button>
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
          <Link
            href={tool.playgroundHref}
            className="text-[#121212] font-semibold hover:text-[#16A34A] transition-colors flex items-center gap-1"
          >
            <span>Run in Browser</span>
            <span>&rarr;</span>
          </Link>
          {tool.pypiHref && (
            <a
              href={tool.pypiHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A7872] hover:text-[#121212] transition-colors"
            >
              PyPI
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

interface ToolGridProps {
  tools: ToolItem[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
}
