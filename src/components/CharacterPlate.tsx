"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

export interface CharacterPlateProps {
  /** raster/vector image path under /public (used when htmlSrc is absent) */
  src?: string;
  /** an HTML "image" under /public (e.g. /portrait.html) - draws itself and adapts to theme.
   *  Preferred: it can be enhanced later without touching the component. */
  htmlSrc?: string;
  alt: string;
  /** small mono label on the plate strip, e.g. "Plate II · aristotle_stacks" */
  plateLabel: string;
  /** italic caption line pinned to the bottom of the plate */
  caption: string;
  /** attribution shown in the speech bubble, e.g. "Aristotle" */
  attribution: string;
  /** exactly the lines she/he speaks - one surfaces per hover, cycling */
  quotes: string[];
  /** accent CSS var; defaults to oxblood */
  accent?: string;
  /** object-position for the image crop */
  focus?: string;
  /** plate aspect ratio, e.g. "3 / 2" (landscape) or "4 / 5" (portrait) */
  aspect?: string;
  className?: string;
}

/**
 * A framed "gallery plate" portrait that speaks on hover.
 * Pointer tilt + parallax glare + a rounded speech bubble whose tail
 * points back toward the figure. One quote surfaces per hover, cycling.
 * Generalized from the homepage hero so every section can have its own voice.
 */
export default function CharacterPlate({
  src,
  htmlSrc,
  alt,
  plateLabel,
  caption,
  attribution,
  quotes,
  accent = "var(--accent-purple)",
  focus = "center 30%",
  aspect = "3 / 2",
  className = "",
}: CharacterPlateProps) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [6, -6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);

  const onPointer = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetTilt = () => { px.set(0); py.set(0); };

  const [speaking, setSpeaking] = useState(false);
  const [line, setLine] = useState(0);
  const onEnter = () => {
    setLine((i) => (i + 1) % Math.max(quotes.length, 1));
    setSpeaking(true);
  };
  const onLeave = () => { setSpeaking(false); resetTilt(); };

  return (
    <motion.div
      onMouseMove={onPointer}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {/* Corner brackets */}
      {[
        { t: "-12px", l: "-12px", rot: 0 },
        { t: "-12px", r: "-12px", rot: 90 },
        { b: "-12px", l: "-12px", rot: 270 },
        { b: "-12px", r: "-12px", rot: 180 },
      ].map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: c.t ?? "auto", bottom: c.b ?? "auto", left: c.l ?? "auto", right: c.r ?? "auto",
            width: "22px", height: "22px",
            borderTop: "1.5px solid var(--accent-cyan)", borderLeft: "1.5px solid var(--accent-cyan)",
            transform: `rotate(${c.rot}deg)`, opacity: 0.7, zIndex: 20,
          }}
        />
      ))}

      {/* Gallery frame */}
      <div
        className="relative w-full overflow-hidden group cursor-help"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          borderRadius: "4px",
          border: "1px solid var(--card-border-hover)",
          boxShadow: "var(--shadow-premium)",
          background: "var(--card-bg)",
        }}
      >
        {/* Plate strip */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--card-border)" }}>
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] truncate" style={{ color: "var(--text-muted)" }}>
            {plateLabel}
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: speaking ? 0.9 : 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: speaking ? "var(--accent-cyan)" : accent }}
            />
            <span className="text-[9px] font-mono tracking-widest" style={{ color: speaking ? "var(--accent-cyan)" : accent }}>
              {speaking ? "SPEAKING" : "LIVE"}
            </span>
          </span>
        </div>

        {/* Portrait - an HTML "image" (draws itself, theme-aware, enhanceable) */}
        <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
          {htmlSrc ? (
            <motion.iframe
              src={htmlSrc}
              title={alt}
              loading="lazy"
              scrolling="no"
              className="absolute inset-0 w-full h-full border-0"
              style={{ pointerEvents: "none", background: "transparent" }}
              animate={{ scale: [1, 1.03, 1.01, 1.03, 1] }}
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              style={{ objectPosition: focus }}
              animate={{ scale: [1, 1.05, 1.02, 1.05, 1], x: [0, -6, 3, -3, 0], y: [0, 3, -2, 3, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Cursor-tracking glare */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-10"
            style={{ ["--gx" as string]: glareX, background: "radial-gradient(260px circle at var(--gx) 35%, rgba(239,229,207,0.10), transparent 55%)" }}
          />
          {/* Warm grade to seat the image in the Atelier palette */}
          <div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(150deg, color-mix(in srgb, var(--accent-purple) 14%, transparent) 0%, transparent 42%, rgba(20,17,11,0.14) 100%)", mixBlendMode: "multiply" }} />
          <div aria-hidden className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(120% 90% at 50% 30%, transparent 55%, rgba(20,17,11,0.42) 100%)" }} />

          {/* Speaking veil so the words carry */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-10"
            animate={{ opacity: speaking ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ background: "radial-gradient(130% 100% at 72% 34%, transparent 26%, rgba(15,12,7,0.6) 100%)" }}
          />

          {/* Speech bubble - tail points toward the figure */}
          <AnimatePresence mode="wait">
            {speaking && quotes.length > 0 && (
              <motion.figure
                key={line}
                initial={{ opacity: 0, scale: 0.82, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 21 }}
                className="absolute z-20 m-0"
                style={{ top: "8%", left: "5%", maxWidth: "56%", transformOrigin: "88% 12%" }}
              >
                <div
                  className="relative px-5 py-4"
                  style={{
                    background: "color-mix(in srgb, var(--card-bg) 95%, transparent)",
                    border: "1px solid var(--card-border-hover)",
                    borderRadius: "18px",
                    boxShadow: "var(--shadow-premium)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <blockquote className="font-heading italic text-[14px] sm:text-[15px] leading-snug" style={{ color: "var(--text-primary)" }}>
                    {quotes[line]}
                  </blockquote>
                  <figcaption className="flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-[0.24em] mt-3" style={{ color: accent }}>
                    <span className="h-px w-4" style={{ background: accent }} />
                    {attribution}
                  </figcaption>
                  <span
                    aria-hidden
                    className="absolute"
                    style={{
                      top: "26%", right: "-8px",
                      width: "16px", height: "16px",
                      background: "color-mix(in srgb, var(--card-bg) 95%, transparent)",
                      borderTop: "1px solid var(--card-border-hover)",
                      borderRight: "1px solid var(--card-border-hover)",
                      transform: "rotate(45deg)",
                      borderTopRightRadius: "3px",
                    }}
                  />
                </div>
              </motion.figure>
            )}
          </AnimatePresence>

          {/* Caption bar */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between z-10"
            style={{ background: "linear-gradient(to top, rgba(15,12,7,0.92) 0%, rgba(15,12,7,0.4) 55%, transparent 100%)" }}
          >
            <div className="text-sm font-heading italic pr-3" style={{ color: "#efe5cf" }}>
              {caption}
            </div>
            <span className="text-[9px] font-mono shrink-0" style={{ color: "var(--accent-cyan)" }}>hover to listen</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
