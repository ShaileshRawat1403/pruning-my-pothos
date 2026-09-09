"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import TerminalSim, { SimStep } from "./TerminalSim";

interface TerminalToastProps {
  command: string;
  steps: SimStep[];
  /** bump to trigger a fresh toast */
  id: number;
  onDone: () => void;
}

const subscribeToHydration = () => () => {};

/**
 * A fixed-corner terminal that plays a short run, then dismisses itself.
 * Dismissal is tied to the run actually finishing (plus a read hold), so it
 * never cuts a long run short or lingers after a quick one.
 */
export default function TerminalToast({ command, steps, id, onDone }: TerminalToastProps) {
  const [visible, setVisible] = useState(true);
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [id]);

  // start the exit only once the run reports completion
  const handleComplete = () => {
    timers.current.push(setTimeout(() => setVisible(false), 1700));
    timers.current.push(setTimeout(onDone, 2050));
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed z-[60] bottom-5 right-5 w-[320px] max-w-[86vw] pointer-events-none transition-all duration-300"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)" }}
      aria-hidden
    >
      <TerminalSim command={command} steps={steps} runKey={id} onComplete={handleComplete} />
    </div>,
    document.body
  );
}
