"use client";

import { useEffect, useSyncExternalStore } from "react";
import { runConsole } from "./ConsoleToastHost";

const subscribeToHydration = () => () => {};
const subscribeToTheme = (notify: () => void) => {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => (typeof document !== "undefined" ? document.documentElement.getAttribute("data-theme") || "light" : "light"),
    () => "light"
  );
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("systems-theme"); } catch { /* Storage may be disabled. */ }
    const initial =
      (saved === "light" || saved === "dark") ? saved : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    try { localStorage.setItem("systems-theme", next); } catch { /* Theme still works without persistence. */ }
    document.documentElement.setAttribute("data-theme", next);
    runConsole("theme", next === "light"
      ? { command: "git checkout daylight", steps: [
          { text: "Switched to branch 'daylight'.", status: "ok" },
          { text: "Ink stashed. Parchment restored.", status: "info" },
        ] }
      : { command: "git checkout midnight", steps: [
          { text: "Switched to branch 'midnight'.", status: "ok" },
          { text: "Parchment stashed. Back to ink.", status: "info" },
        ] });
  };

  if (!mounted) {
    return (
      <div
        style={{ width: "36px", height: "36px", borderRadius: "9999px", background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        color: "var(--text-secondary)",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-cyan)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--card-border)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
      }}
    >
      {isDark ? (
        /* Sun - switch to light */
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon - switch to dark */
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
