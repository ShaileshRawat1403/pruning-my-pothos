"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { FILMS } from "./films";
import type { FilmKit } from "./films/kit";

/**
 * CoverFilm: plays an article's cover as a short film, then rests as the still.
 *
 * It wraps the server-drawn <ArticleCover hero /> and animates what is already
 * there, so the film's last frame and the still cover are the same drawing.
 * The choreography for each article is a script in films/<slug>.ts; an article
 * without one is simply a still.
 *
 * Plays once per browser session, when the cover is on screen. Replays on
 * request. Under reduced motion, without scripts, in print and in the PNG
 * export, the cover is the still.
 */

const E = { x: 660, y: 44 }; // where ArticleCover places the emblem
const CENTER = { x: 600, y: 315 };
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function seen(slug: string) {
  try {
    return sessionStorage.getItem(`pmp-film:${slug}`) === "1";
  } catch {
    return false;
  }
}
function markSeen(slug: string) {
  try {
    sessionStorage.setItem(`pmp-film:${slug}`, "1");
  } catch {
    /* private mode: it just plays again */
  }
}

/** Builds the timeline for one cover. Everything it touches is reverted by the caller. */
function build(svg: SVGSVGElement, slug: string): gsap.core.Timeline {
  const q = gsap.utils.selector(svg);
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
  const o = (x: number, y: number) => `${E.x + x} ${E.y + y}`;
  const kit: FilmKit = {
    tl,
    q,
    o,
    wide(at) {
      tl.set(q(".cf-camera"), { scale: 1, x: 0, y: 0 }, at).set(q(".cf-copy"), { autoAlpha: 1 }, at);
    },
    close(at, x, y, scale) {
      // A hard cut: the point (x, y) of the emblem lands mid-frame at `scale`.
      tl.set(q(".cf-camera"), { scale, svgOrigin: o(x, y), x: CENTER.x - (E.x + x), y: CENTER.y - (E.y + y) }, at).set(q(".cf-copy"), { autoAlpha: 0 }, at);
    },
    shake(at, amount = 8) {
      tl.to(
        q(".cf-shake"),
        { keyframes: [{ x: amount, y: -amount * 0.8 }, { x: -amount * 0.8, y: amount * 0.7 }, { x: amount * 0.4, y: -amount * 0.3 }, { x: 0, y: 0 }], duration: 0.22, ease: "none" },
        at,
      );
    },
    say(at, beat) {
      tl.to(q(".cf-beat")[beat], { opacity: 1, duration: 0.12, ease: "none" }, at);
    },
    show(sel, at) {
      tl.set(q(sel), { autoAlpha: 1 }, at);
    },
    hide(sel, at) {
      tl.set(q(sel), { autoAlpha: 0 }, at);
    },
    pop(sel, at, stagger = 0) {
      tl.fromTo(q(sel), { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.22, ease: "back.out(3)", stagger }, at);
    },
    fade(sel, at, dur = 0.35) {
      tl.fromTo(q(sel), { autoAlpha: 0 }, { autoAlpha: 1, duration: dur, ease: "none" }, at);
    },
  };

  // Every film opens letterboxed with the quip unsaid, and the camera wide.
  tl.set(q(".cf-bars"), { autoAlpha: 1 }, 0).set(q(".cf-beat"), { opacity: 0 }, 0);
  kit.wide(0);
  FILMS[slug](kit);
  // ...and ends by lifting the bars, which leaves the still cover.
  const end = tl.duration() + 0.3;
  tl.to(q(".cf-bar-top"), { y: -64, duration: 0.55, ease: "power2.inOut" }, end).to(q(".cf-bar-bot"), { y: 64, duration: 0.55, ease: "power2.inOut" }, end);
  return tl;
}

/**
 * Puts the drawing back exactly as the server drew it. gsap's own revert
 * leaves identity matrices and, after a seek, the odd start value behind; the
 * still has to be the still. Safe because a film only ever animates fx-/cf-
 * elements, and those never carry a transform or style of their own (kit.ts).
 */
function restore(svg: Element) {
  svg.querySelectorAll('[class*="fx-"], [class*="cf-"], .hd-lid').forEach((el) => {
    el.removeAttribute("style");
    el.removeAttribute("transform");
    el.removeAttribute("data-svg-origin");
    delete (el as unknown as { _gsap?: unknown })._gsap;
  });
}

export default function CoverFilm({ slug, children, debugAt }: { slug: string; children: React.ReactNode; debugAt?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context | null>(null);
  const hasFilm = slug in FILMS;

  // The state lives on the element (data-film: playing | still; absent while
  // waiting), where the stylesheet reads it. Nothing here needs a re-render.
  const mark = (state: "playing" | "still") => root.current?.setAttribute("data-film", state);

  const stop = useCallback(() => {
    if (!ctx.current) return;
    ctx.current.revert();
    ctx.current = null;
    const svg = root.current?.querySelector("svg");
    if (svg) restore(svg);
  }, []);

  const play = useCallback(() => {
    const svg = root.current?.querySelector("svg");
    if (!svg || !hasFilm || ctx.current) return; // no film, or one is already running
    ctx.current = gsap.context(() => {
      const tl = build(svg as SVGSVGElement, slug);
      if (debugAt !== undefined) {
        tl.pause(Math.min(debugAt, tl.duration()));
        return;
      }
      tl.eventCallback("onComplete", () => {
        stop();
        markSeen(slug);
        mark("still");
      });
      tl.play(0);
    }, svg);
    mark("playing");
  }, [slug, hasFilm, debugAt, stop]);

  // Before paint: is there a film to wait for at all?
  useLayoutEffect(() => {
    if (debugAt !== undefined) play();
    else if (!hasFilm || reduced() || seen(slug)) mark("still");
    return stop;
  }, [slug, hasFilm, debugAt, play, stop]);

  // Play the first time the cover is properly on screen.
  useEffect(() => {
    const el = root.current;
    if (!el || el.hasAttribute("data-film")) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  return (
    <div ref={root} className="cover-film">
      {children}
      {hasFilm && debugAt === undefined && (
        <button type="button" className="cover-film-replay" onClick={play} aria-label="Play the cover film again">
          Play again
        </button>
      )}
    </div>
  );
}
