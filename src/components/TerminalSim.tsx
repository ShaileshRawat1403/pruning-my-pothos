"use client";

import { useEffect, useRef, useState } from "react";

export type StepStatus = "ok" | "warn" | "err" | "info";

export interface SimStep {
  /** the line shown once this step resolves */
  text: string;
  status?: StepStatus;
  /** override the resolved glyph; defaults per status */
  icon?: string;
  /** how long this step "runs" before resolving, ms (default 650) */
  ms?: number;
}

interface TerminalSimProps {
  /** the command echoed after the prompt, e.g. "tessera run --pack config --redact" */
  command: string;
  steps: SimStep[];
  /** change this value to (re)play the sequence */
  runKey?: number;
  /** called once the last step resolves */
  onComplete?: () => void;
  className?: string;
}

type Phase = "typing" | "enter" | "running" | "done";

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const DEFAULT_ICON: Record<StepStatus, string> = { ok: "✔", warn: "⚠", err: "✕", info: "›" };
const COLOR: Record<StepStatus, string> = {
  ok: "var(--accent-green)",
  warn: "var(--accent-amber)",
  err: "var(--accent-purple)",
  info: "var(--text-secondary)",
};

/**
 * A scripted terminal "run": types a command, pauses on enter, then resolves
 * each step from a spinner to a status glyph and drops a fresh prompt when done.
 * Cosmetic sugar over real client-side work, in the house voice (philosophy meets
 * a shell). Honors reduced motion.
 */
export default function TerminalSim(props: TerminalSimProps) {
  return <TerminalRun key={props.runKey ?? 0} {...props} />;
}

function TerminalRun({ command, steps, runKey = 0, onComplete, className = "" }: TerminalSimProps) {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>(command.length ? "typing" : "enter");
  const [resolved, setResolved] = useState(0);
  const [frame, setFrame] = useState(0);
  const [blink, setBlink] = useState(true);
  const doneRef = useRef(false);

  const reduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // drive the whole sequence: type -> enter beat -> run steps -> done
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const push = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    doneRef.current = false;

    if (reduced) {
      push(() => {
        setTyped(command.length);
        setResolved(steps.length);
        setPhase("done");
        onComplete?.();
      }, 0);
      return () => timers.forEach(clearTimeout);
    }


    const runSteps = () => {
      let s = 0;
      const tick = () => {
        if (cancelled) return;
        s += 1;
        setResolved(s);
        if (s >= steps.length) {
          setPhase("done");
          if (!doneRef.current) {
            doneRef.current = true;
            onComplete?.();
          }
          return;
        }
        push(tick, steps[s]?.ms ?? 650);
      };
      push(tick, steps[0]?.ms ?? 650);
    };

    let i = 0;
    const typeNext = () => {
      if (cancelled) return;
      i += 1;
      setTyped(i);
      if (i < command.length) {
        // jittered keystrokes read as typed, not printed
        push(typeNext, 20 + Math.random() * 46);
      } else {
        setPhase("enter");
        push(() => {
          if (cancelled) return;
          setPhase("running");
          if (steps.length === 0) {
            setPhase("done");
            if (!doneRef.current) {
              doneRef.current = true;
              onComplete?.();
            }
          } else {
            runSteps();
          }
        }, 420);
      }
    };

    if (command.length === 0) {
      push(() => {
        if (cancelled) return;
        setPhase("running");
        runSteps();
      }, 420);
    } else {
      push(typeNext, 130);
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey]);

  // spinner ticks only while a step is actually running
  useEffect(() => {
    if (reduced || phase !== "running" || resolved >= steps.length) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 80);
    return () => clearInterval(id);
  }, [phase, resolved, steps.length, reduced]);

  // cursor blink for the prompt (typing + idle)
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, [reduced]);

  const showOutput = phase === "running" || phase === "done";
  const cursorOnCmd = phase === "typing" || phase === "enter";

  return (
    <div
      className={`ledger-surface p-4 font-mono text-xs leading-relaxed overflow-hidden ${className}`}
      style={{ borderRadius: "4px" }}
    >
      <div
        className="flex items-center gap-2 pb-2 mb-2"
        style={{ borderBottom: "1px solid var(--card-border)", color: "var(--text-muted)" }}
      >
        <span style={{ color: "var(--accent-green)" }}>●</span>
        <span style={{ color: "var(--accent-amber)" }}>●</span>
        <span style={{ color: "var(--accent-purple)" }}>●</span>
        <span className="ml-2 text-[10px] tracking-widest">run.tty</span>
      </div>

      <div className="whitespace-pre-wrap break-words" style={{ color: "var(--text-secondary)" }}>
        <span style={{ color: "var(--accent-green)" }}>$ </span>
        <span style={{ color: "var(--text-primary)" }}>{command.slice(0, typed)}</span>
        {cursorOnCmd && (
          <span style={{ color: "var(--accent-cyan)", opacity: blink ? 1 : 0 }}>▋</span>
        )}
      </div>

      {showOutput && (
        <div className="mt-1 flex flex-col gap-0.5">
          {steps.map((s, i) => {
            const isRunning = i === resolved && phase === "running";
            const isDone = i < resolved;
            if (!isRunning && !isDone) return null;
            const status = s.status ?? "ok";
            return (
              <div key={i} className="flex items-start gap-2 animate-fade-in">
                <span
                  className="shrink-0"
                  style={{ color: isDone ? COLOR[status] : "var(--accent-cyan)", width: "1.1em", textAlign: "center" }}
                >
                  {isDone ? s.icon ?? DEFAULT_ICON[status] : SPINNER[frame]}
                </span>
                <span style={{ color: isDone ? "var(--text-secondary)" : "var(--text-muted)" }}>{s.text}</span>
              </div>
            );
          })}
        </div>
      )}

      {phase === "done" && (
        <div className="mt-1 whitespace-pre-wrap">
          <span style={{ color: "var(--accent-green)" }}>$ </span>
          <span style={{ color: "var(--accent-cyan)", opacity: blink ? 1 : 0 }}>▋</span>
        </div>
      )}
    </div>
  );
}
