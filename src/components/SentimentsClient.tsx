"use client";

import { useState } from "react";
import SpotlightCard from "./SpotlightCard";

interface PostItem {
  id: string;
  title: string;
  description: string;
  publishDate?: string;
  readingTime?: number;
  difficulty?: string;
  featured?: boolean;
  tags?: string[];
  url: string;
  type: "reflections" | "calibrations" | "curations" | "systems";
  typeName: string;
  typeColor: string;
}

interface StickyNoteItem {
  id: string;
  title: string;
  rotation?: number;
  color?: string;
  content: string;
  tags?: string[];
  type: "sticky-notes";
}

interface SentimentsClientProps {
  initialPosts: PostItem[];
  stickyNotes: StickyNoteItem[];
}

const TABS = ["all", "reflections", "calibrations", "curations", "systems", "sticky-notes"] as const;

export default function SentimentsClient({ initialPosts, stickyNotes }: SentimentsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("all");
  const [selectedNote, setSelectedNote] = useState<StickyNoteItem | null>(null);

  const q = searchQuery.toLowerCase();

  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags?.some((t) => t.toLowerCase().includes(q));
    const matchesTab = activeTab === "all" || post.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const filteredStickyNotes = stickyNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q) ||
      note.tags?.some((t) => t.toLowerCase().includes(q));
    const matchesTab = activeTab === "all" || activeTab === "sticky-notes";
    return matchesSearch && matchesTab;
  });

  const showingCount =
    activeTab === "sticky-notes"
      ? filteredStickyNotes.length
      : filteredPosts.length + (activeTab === "all" ? filteredStickyNotes.length : 0);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search & filter */}
      <div
        className="flex flex-col lg:flex-row gap-4 justify-between items-center relative z-10 pb-4"
        style={{ borderBottom: "1px solid var(--card-border)" }}
      >
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Search notes, concepts, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm transition-colors focus:outline-none"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "3px",
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex overflow-x-auto w-full lg:w-auto scrollbar-hide">
          <div className="flex gap-4 px-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-2 whitespace-nowrap text-[11px] uppercase tracking-[0.12em] font-mono font-semibold transition-colors"
                style={{
                  color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
                  borderBottom: `2px solid ${activeTab === tab ? "var(--accent-cyan)" : "transparent"}`,
                }}
              >
                {tab === "sticky-notes" ? "Sticky Notes" : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center text-[10px] font-mono px-1" style={{ color: "var(--text-muted)" }}>
        <span>SHOWING {showingCount} ITEMS</span>
        {searchQuery && <span>FILTERED BY &quot;{searchQuery}&quot;</span>}
      </div>

      <div className="flex flex-col gap-12 relative z-10">
        {/* Articles grid */}
        {activeTab !== "sticky-notes" && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPosts.map((post) => (
              <SpotlightCard
                key={post.id}
                href={post.url}
                accent={post.typeColor}
                className="justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <span
                      className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5"
                      style={{ background: `color-mix(in srgb, ${post.typeColor} 14%, transparent)`, color: post.typeColor, borderRadius: "2px" }}
                    >
                      {post.typeName}
                    </span>
                    {post.featured && (
                      <span className="text-[9px] font-mono uppercase" style={{ color: "var(--accent-cyan)" }}>
                        Featured
                      </span>
                    )}
                    {post.publishDate && (
                      <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>
                        {post.publishDate}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                    {post.title}
                  </h3>

                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                    {post.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  {((post.tags && post.tags.length > 0) || post.readingTime || post.difficulty) && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.readingTime && (
                        <span
                          className="text-[9px] font-mono px-2 py-0.5"
                          style={{ color: "var(--text-muted)", border: "1px solid var(--card-border)", borderRadius: "2px" }}
                        >
                          {post.readingTime} min
                        </span>
                      )}
                      {post.difficulty && (
                        <span
                          className="text-[9px] font-mono px-2 py-0.5"
                          style={{ color: "var(--text-muted)", border: "1px solid var(--card-border)", borderRadius: "2px" }}
                        >
                          {post.difficulty}
                        </span>
                      )}
                      {post.tags?.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-2 py-0.5"
                          style={{ color: "var(--text-muted)", border: "1px solid var(--card-border)", borderRadius: "2px" }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span
                    className="text-xs font-mono font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
                    style={{ color: post.typeColor }}
                  >
                    Read Entry &rarr;
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        {/* Sticky notes - orderly grid, not chaotic columns */}
        {(activeTab === "all" || activeTab === "sticky-notes") && filteredStickyNotes.length > 0 && (
          <div className="flex flex-col gap-6">
            {activeTab === "all" && (
              <div className="pb-2" style={{ borderBottom: "1px solid var(--card-border)" }}>
                <h3 className="font-heading text-lg font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  Marginalia
                </h3>
                <p className="text-[11px] font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Messy, partial, raw insights worth revisiting. Click to read.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStickyNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className="card-glass p-5 cursor-pointer select-none flex flex-col gap-3 group h-full"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-cyan)" }} />
                    <span className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase" style={{ color: "var(--text-muted)" }}>
                      Sticky Note
                    </span>
                  </div>
                  <span className="block font-heading font-semibold text-[15px]" style={{ color: "var(--text-primary)" }}>
                    {note.title}
                  </span>
                  <div
                    className="sticky-note-body text-xs leading-relaxed pointer-events-none line-clamp-4"
                    style={{ color: "var(--text-secondary)" }}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty */}
        {filteredPosts.length === 0 && filteredStickyNotes.length === 0 && (
          <div className="card-glass p-12 text-center flex flex-col items-center justify-center gap-2">
            <h4 className="font-heading text-base font-semibold" style={{ color: "var(--text-primary)" }}>No matches found</h4>
            <p className="text-xs max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Try adjusting your keywords or clearing the filter.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
              className="mt-4 btn-premium btn-secondary"
              style={{ padding: "0.5rem 1rem" }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="w-full max-w-md p-8 relative flex flex-col gap-4 animate-slide-up card-glass"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-4 right-4 text-lg font-bold transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              ✕
            </button>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase" style={{ color: "var(--accent-cyan)" }}>
                Pinned Sticky Note
              </span>
              <h2 className="text-2xl font-semibold leading-tight font-heading" style={{ color: "var(--text-primary)" }}>
                {selectedNote.title}
              </h2>
            </div>
            <div
              className="sticky-note-body text-sm leading-relaxed mt-2 max-h-[300px] overflow-y-auto pr-2"
              style={{ color: "var(--text-secondary)" }}
              dangerouslySetInnerHTML={{ __html: selectedNote.content }}
            />
            {selectedNote.tags && selectedNote.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4" style={{ borderTop: "1px solid var(--card-border)" }}>
                {selectedNote.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5"
                    style={{ color: "var(--text-muted)", border: "1px solid var(--card-border)", borderRadius: "2px" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
