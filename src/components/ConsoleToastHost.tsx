"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TerminalToast from "./TerminalToast";
import { SimStep } from "./TerminalSim";

export interface ConsolePayload {
  command: string;
  steps: SimStep[];
}

/**
 * In-memory throttle. Resets on every full page load, so a refresh re-arms the
 * gags (what people expect), while still de-duping during a single visit's
 * client-side navigation. Deliberately NOT sessionStorage, which would silence
 * them permanently for the tab once fired.
 */
const fired = new Set<string>();

/**
 * Fire the bottom-right terminal console from anywhere.
 * Pass { once: true } to fire at most once per page load (for frequent actions).
 */
export function runConsole(key: string, payload: ConsolePayload, opts?: { once?: boolean }) {
  if (typeof window === "undefined") return;
  if (opts?.once) {
    if (fired.has(key)) return;
    fired.add(key);
  }
  window.dispatchEvent(new CustomEvent("sss:console", { detail: payload }));
}

/** `cd /section` greetings, fired once per session when a section first loads. */
const SECTION: Record<string, ConsolePayload> = {
  systems: { command: "cd /systems", steps: [{ text: "Entering build space. Keep your assumptions versioned.", status: "ok" }] },
  sentences: { command: "cd /sentences", steps: [{ text: "Loading compressed thoughts. High aphorism density.", status: "ok" }] },
  sentiments: { command: "cd /sentiments", steps: [{ text: "Opening unsquashed commits. The heart left traces.", status: "ok" }] },
  shelf: { command: "cd /shelf", steps: [{ text: "Fetching old dependencies. Some still change the build.", status: "ok" }] },
  self: { command: "cd /self", steps: [{ text: "Entering inner logs. Tread kindly.", status: "ok" }] },
  stack: { command: "cd /stack", steps: [{ text: "Checking live wiring. Screenshots do not count.", status: "ok" }] },
  schema: { command: "cd /schema", steps: [{ text: "Reading hidden contracts. Interfaces are never neutral.", status: "ok" }] },
  about: { command: "cd /about", steps: [{ text: "Running whoami. One human, three roles.", status: "ok" }] },
};

/** Mounted once in the layout. Handles runConsole() events and section-arrival greetings. */
export default function ConsoleToastHost() {
  const [toast, setToast] = useState<ConsolePayload | null>(null);
  const [id, setId] = useState(0);
  const pathname = usePathname();

  // events fired by runConsole() (theme, copy, search)
  useEffect(() => {
    const onRun = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsolePayload;
      if (detail) { setToast(detail); setId((n) => n + 1); }
    };
    window.addEventListener("sss:console", onRun as EventListener);
    return () => window.removeEventListener("sss:console", onRun as EventListener);
  }, []);

  // section-arrival greeting: re-runs on every client navigation, once per session per section
  useEffect(() => {
    const segments = (pathname || "/").split("/").filter(Boolean);
    // Only on a section landing page. On a detail page the toast lands on top
    // of the reading column, so the greeting stays out of the way there.
    if (segments.length !== 1) return;
    let seg = segments[0].toLowerCase();
    if (seg === "tools") seg = "stack";
    const line = SECTION[seg];
    if (!line) return;
    const key = `cd:${seg}`;
    if (fired.has(key)) return;
    fired.add(key);
    const t = setTimeout(() => { setToast(line); setId((n) => n + 1); }, 500);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!toast) return null;
  return (
    <TerminalToast key={id} id={id} command={toast.command} steps={toast.steps} onDone={() => setToast(null)} />
  );
}
