"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const LAYERS = [
  { layer: 0, idx: "01", label: "Intent" },
  { layer: 1, idx: "02", label: "Policy" },
  { layer: 2, idx: "03", label: "Approval" },
  { layer: 3, idx: "04", label: "Evidence" },
] as const;

/**
 * Conceptual 3D contract stack: Intent, Policy, Approval, Evidence.
 * Pointer parallax when motion is allowed; static pose under reduced motion.
 */
export default function ContractStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [auto, setAuto] = useState(true);
  const cur = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const apply = useCallback(function step() {
    const el = stackRef.current;
    if (!el) return;
    cur.current.y += (target.current.y - cur.current.y) * 0.08;
    cur.current.x += (target.current.x - cur.current.x) * 0.08;
    el.classList.remove("is-auto");
    el.style.transform = `rotateX(${58 + cur.current.x}deg) rotateZ(${-18 + cur.current.y * 0.15}deg) rotateY(${cur.current.y}deg)`;
    if (
      Math.abs(target.current.y - cur.current.y) > 0.05 ||
      Math.abs(target.current.x - cur.current.x) > 0.05
    ) {
      raf.current = requestAnimationFrame(step);
    } else {
      raf.current = 0;
    }
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    target.current = { y: nx * 16, x: -ny * 8 };
    setAuto(false);
    if (!raf.current) raf.current = requestAnimationFrame(apply);
  };

  const onLeave = () => {
    if (reduced) return;
    target.current = { x: 0, y: 0 };
    if (!raf.current) raf.current = requestAnimationFrame(apply);
    window.setTimeout(() => {
      if (Math.abs(cur.current.y) < 0.5 && Math.abs(cur.current.x) < 0.5 && stackRef.current) {
        stackRef.current.style.transform = "";
        setAuto(true);
      }
    }, 500);
  };

  useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      ref={stageRef}
      className="dax-stage-3d dax-hero-stage"
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="dax-stage-ground" />
      <div
        ref={stackRef}
        className={`dax-contract-stack${auto && !reduced ? " is-auto" : ""}`}
      >
        {LAYERS.map((l) => (
          <div
            key={l.label}
            className="dax-contract-plane"
            data-layer={l.layer}
            data-idx={l.idx}
          >
            {l.label}
          </div>
        ))}
      </div>
      <p className="dax-stage-caption">Contract layers</p>
    </div>
  );
}
