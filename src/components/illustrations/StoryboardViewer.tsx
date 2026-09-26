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
 * Each slide pairs the drawn frame with its full text. On wide screens the
 * frame is sized to the viewport height and the text sits beside it, so both
 * are visible at once; on phones they stack. "Enlarge" (or clicking the
 * frame) opens it near full width in a dialog for reading the drawing itself.
 */
const noop = () => () => {};

export default function StoryboardViewer({ title, slides }: { title: string; slides: StoryboardSlide[] }) {
  const track = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const openZoom = (i: number) => {
    setZoomed(i);
    dialog.current?.showModal();
  };
  const closeZoom = () => dialog.current?.close();
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
            className="grid w-full shrink-0 snap-center grid-cols-1 items-center justify-items-center gap-5 px-1 pb-3 lg:grid-cols-[auto_minmax(0,26rem)] lg:justify-center lg:gap-10"
          >
            <button
              type="button"
              onClick={() => openZoom(i)}
              aria-label={`Enlarge frame ${i + 1}`}
              className="block w-full cursor-zoom-in overflow-hidden rounded-md border border-[#D9D4C6] shadow-sm lg:w-auto"
              style={{ maxWidth: "min(100%, max(320px, calc((100svh - 250px) * 0.8)))" }}
            >
              <div className="lg:h-[max(420px,calc(100svh-250px))] lg:aspect-[4/5]">{slide.node}</div>
            </button>
            <div className="flex w-full max-w-[640px] flex-col gap-3 lg:self-center">
              <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)] lg:block">
                Frame {String(i + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
              </span>
              <h2 className="m-0 hidden font-heading text-2xl font-bold leading-snug text-[color:var(--text-primary)] lg:block">{slide.title}</h2>
              <p className="m-0 text-sm leading-relaxed text-[color:var(--text-secondary)] sm:text-base lg:text-lg">{slide.text}</p>
              <button
                type="button"
                onClick={() => openZoom(i)}
                className="self-start font-mono text-xs text-[color:var(--text-secondary)] underline underline-offset-4 decoration-[color:var(--card-border)] hover:text-[color:var(--text-primary)]"
              >
                Enlarge frame &#8599;
              </button>
            </div>
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
      <dialog
        ref={dialog}
        onClose={() => setZoomed(null)}
        onClick={(e) => {
          if (e.target === dialog.current) closeZoom();
        }}
        onKeyDown={(e) => {
          if (zoomed === null) return;
          if (e.key === "ArrowRight" && zoomed < total - 1) setZoomed(zoomed + 1);
          if (e.key === "ArrowLeft" && zoomed > 0) setZoomed(zoomed - 1);
        }}
        aria-label="Enlarged frame"
        className="storyboard-zoom m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/85"
      >
        {zoomed !== null && (
          <div className="mx-auto flex min-h-full w-[min(94vw,900px)] flex-col gap-4 py-6">
            <div className="flex items-center justify-between font-mono text-sm text-white/80">
              <span>
                {String(zoomed + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} &middot; {slides[zoomed].title}
              </span>
              <span className="flex gap-2">
                <button type="button" disabled={zoomed === 0} onClick={() => setZoomed(zoomed - 1)} aria-label="Previous frame" className="h-10 w-10 rounded-full border border-white/30 disabled:opacity-30">&larr;</button>
                <button type="button" disabled={zoomed === total - 1} onClick={() => setZoomed(zoomed + 1)} aria-label="Next frame" className="h-10 w-10 rounded-full border border-white/30 disabled:opacity-30">&rarr;</button>
                <button type="button" onClick={closeZoom} aria-label="Close" className="h-10 rounded-full border border-white/30 px-4">Close</button>
              </span>
            </div>
            <div className="overflow-hidden rounded-md">{slides[zoomed].node}</div>
            <p className="m-0 text-base leading-relaxed text-white/85">{slides[zoomed].text}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
