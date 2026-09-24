"use client";

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export interface StoryboardSlide {
  title: string;
  text: string;
  node: React.ReactNode;
}

/**
 * The storyboard viewer. A native horizontal scroll-snap strip, so it works
 * without JavaScript and swipes naturally on a phone; the script only adds
 * buttons, arrow keys and the live position read-out.
 *
 * Each slide pairs the drawn frame with its full text at body size. The frame
 * is a fixed 4:5 composition, the same one the PDF carries; the text beneath
 * is what keeps the explanation legible at phone width and to a screen reader.
 */
const noop = () => () => {};

export default function StoryboardViewer({ title, slides }: { title: string; slides: StoryboardSlide[] }) {
  const track = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  // False in the server render, true once hydrated: buttons stay disabled
  // until they can actually move the strip.
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const total = slides.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
      setIndex(Math.max(0, Math.min(total - 1, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const n = Math.max(0, Math.min(total - 1, i));
      const left = n * el.clientWidth;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
      // Smooth scrolling can stall (a background tab, or a snap container that
      // swallows the animation). Never leave the reader between frames: if it
      // has not arrived shortly, jump.
      window.setTimeout(() => {
        if (Math.abs(el.scrollLeft - left) > el.clientWidth / 4) el.scrollTo({ left, behavior: "auto" });
      }, 700);
      setIndex(n);
    },
    [total],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(total - 1);
    }
  };

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-35 disabled:cursor-not-allowed";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${title}, storyboard`}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="m-0 font-mono text-sm text-[color:var(--text-secondary)]">
          <span className="text-[color:var(--text-primary)]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline"> &middot; {slides[index]?.title}</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous frame"
            disabled={!ready || index === 0}
            onClick={() => go(index - 1)}
            className={`${btn} border-[color:var(--card-border)] bg-[color:var(--card-bg)] text-[color:var(--text-primary)] hover:border-[color:var(--text-primary)]`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next frame"
            disabled={!ready || index === total - 1}
            onClick={() => go(index + 1)}
            className={`${btn} border-[color:var(--text-primary)] bg-[color:var(--text-primary)] text-[color:var(--bg-color)]`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M9 5 L16 12 L9 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <ol
        ref={track}
        tabIndex={0}
        aria-label="Frames"
        className="storyboard-track m-0 flex list-none snap-x snap-mandatory overflow-x-auto p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}: ${slide.title}`}
            className="flex w-full shrink-0 snap-center flex-col items-center gap-5 px-1 pb-3"
          >
            <div
              className="w-full overflow-hidden rounded-md border border-[#D9D4C6] shadow-sm"
              style={{ maxWidth: "min(100%, max(320px, calc((100svh - 250px) * 0.8)))" }}
            >
              {slide.node}
            </div>
            <p className="m-0 max-w-[640px] text-sm leading-relaxed text-[color:var(--text-secondary)] sm:text-base">
              {slide.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap justify-center" role="group" aria-label="Jump to frame">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            disabled={!ready}
            aria-label={`Frame ${i + 1}: ${slide.title}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
            className="group flex h-11 w-8 items-center justify-center"
          >
            <span
              className={`block h-1 w-6 rounded-full transition-colors ${
                i === index ? "bg-[color:var(--accent-purple)]" : "bg-[color:var(--card-border)] group-hover:bg-[color:var(--text-muted)]"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
