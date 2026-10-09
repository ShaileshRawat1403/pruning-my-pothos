"use client";

/** Reopens the consent banner (ConsentBanner listens for this event). */
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("pmp:consent-open"))}>
      Cookie settings
    </button>
  );
}
