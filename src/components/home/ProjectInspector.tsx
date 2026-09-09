"use client";

import { useState } from "react";

export interface ProjectTab {
  title: string;
  filename: string;
  ref: string;
  lines: string[];
  sourceUrl: string;
}

export interface ProjectItem {
  title: string;
  role: string;
  status: string;
  summary: string;
  boundary: string;
  href: string;
  tabs: ProjectTab[];
}

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const currentTab = project.tabs[activeTabIdx] || project.tabs[0];
  const codeString = currentTab.lines.join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl bg-white border border-[#EAE8E2] overflow-hidden shadow-2xs hover:border-[#D5D2C9] transition-all">
      {/* Standardized Card Header */}
      <div className="p-5 border-b border-[#EAE8E2] flex flex-col justify-between min-h-[145px]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] uppercase font-bold text-[#16A34A] tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded">
            {project.status}
          </span>
          <span className="font-mono text-[10px] text-[#7A7872] uppercase tracking-wider">
            Repository Sourced
          </span>
        </div>
        <h3 className="font-heading font-bold text-base text-[#121212] pt-2">
          {project.title}
        </h3>
        <p className="text-xs text-[#55534E] leading-relaxed pt-1 line-clamp-2">
          {project.summary}
        </p>
      </div>

      {/* Uniform Tab Bar with Strict Provenance Link */}
      <div className="flex items-center justify-between px-3 bg-[#1E1E1E] text-xs font-mono border-b border-[#333333] h-10 shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto">
          {project.tabs.map((tab, idx) => (
            <button
              key={tab.title}
              type="button"
              onClick={() => setActiveTabIdx(idx)}
              aria-pressed={activeTabIdx === idx}
              className={`px-3 py-2 text-[11px] transition-colors cursor-pointer ${
                activeTabIdx === idx
                  ? "text-white bg-[#2D2D2D] font-bold border-b-2 border-[#16A34A]"
                  : "text-[#888888] hover:text-[#CCCCCC]"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={currentTab.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#A3A3A3] hover:text-white underline decoration-[#555555] underline-offset-2 hidden sm:inline truncate max-w-[220px] transition-colors"
            title="Inspect public source file on GitHub"
          >
            {currentTab.filename} · {currentTab.ref} ↗
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="px-2 py-1 text-[10px] rounded bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#CCCCCC] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            title="Copy exact file excerpt"
          >
            {isCopied ? (
              <span className="text-[#86EFAC] font-bold">✓ Copied</span>
            ) : (
              <span>📋 Copy</span>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Excerpt Body */}
      <div className="p-4 bg-[#181818] font-mono text-xs text-[#E5E5E5] overflow-x-auto h-[180px] leading-relaxed select-text flex-1">
        <pre className="m-0">
          <code>
            {currentTab.lines.map((line, lIdx) => (
              <div key={lIdx} className="table-row">
                <span className="table-cell pr-4 text-[#555555] select-none text-[10px] text-right">
                  {lIdx + 1}
                </span>
                <span className="table-cell whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Documented Boundary Callout */}
      <div className="px-4 py-3 bg-[#FAF9F6] border-t border-[#EAE8E2] text-xs leading-relaxed">
        <a href={currentTab.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-[#55534E] break-words">
          Inspect source: {currentTab.filename} at {currentTab.ref} <span aria-hidden="true">↗</span>
        </a>
        <p className="text-[#7A7872] mt-1">The excerpt above is source material. The summary and boundary are editorial interpretation.</p>
      </div>
      <div className="px-4 py-2.5 bg-[#FAF9F6] border-t border-[#EAE8E2] text-[11px] font-mono text-[#55534E] leading-relaxed">
        <span className="font-bold text-[#121212]">Boundary: </span>
        <span>{project.boundary}</span>
      </div>

      {/* Card Footer Link */}
      <div className="px-4 py-3 bg-[#FAF9F6] border-t border-[#EAE8E2] flex items-center justify-between text-xs font-mono shrink-0 h-12">
        <span className="text-[#7A7872]">{project.role}</span>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#121212] font-semibold hover:text-[#16A34A] transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded"
        >
          <span>Inspect Repository</span>
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
}

interface ProjectInspectorProps {
  projects: ProjectItem[];
}

export default function ProjectInspector({ projects }: ProjectInspectorProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
