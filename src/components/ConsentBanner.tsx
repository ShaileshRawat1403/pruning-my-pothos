"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeadpanLeaf from "./brand/DeadpanLeaf";

/**
 * Asks once whether the site may use analytics cookies (Google Analytics,
 * Microsoft Clarity), remembers the answer, and passes it to both through
 * window.pmpConsent (set up in Analytics.tsx). The footer's "Cookie settings"
 * link reopens it by dispatching "pmp:consent-open".
 */
const KEY = "pmp-consent";

declare global {
  interface Window {
    pmpConsent?: (granted: boolean) => void;
  }
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* storage blocked: ask every visit, harmlessly */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored !== "granted" && stored !== "denied") setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("pmp:consent-open", reopen);
    return () => window.removeEventListener("pmp:consent-open", reopen);
  }, []);

  if (!open) return null;

  const choose = (granted: boolean) => {
    if (window.pmpConsent) window.pmpConsent(granted);
    else {
      try {
        localStorage.setItem(KEY, granted ? "granted" : "denied");
      } catch {
        /* nothing to remember it in */
      }
    }
    setOpen(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="consent-banner">
      <DeadpanLeaf size={40} disc title="" />
      <p className="m-0 text-sm leading-relaxed">
        We count visits and see where people click, with Google Analytics and Microsoft Clarity. No ads, nothing sold.{" "}
        <Link href="/privacy/" className="underline underline-offset-4">
          What that means
        </Link>
        .
      </p>
      <div className="consent-actions">
        <button type="button" className="consent-btn" onClick={() => choose(false)}>
          No thanks
        </button>
        <button type="button" className="consent-btn consent-btn--yes" onClick={() => choose(true)}>
          Fine
        </button>
      </div>
    </div>
  );
}
