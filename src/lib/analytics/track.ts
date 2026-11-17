/**
 * Sends one GA4 event through the gtag stub defined in
 * src/components/Analytics.tsx. Off the production host, or in a browser
 * marked with ?pmp-owner=on, gtag is never configured, so the event only
 * lands in window.dataLayer and nothing leaves the browser. Consent Mode
 * applies to these events exactly as it does to page views.
 *
 * Never pass personal data (an email address, a name) as a parameter.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackParams = Record<string, string | number | boolean>;

export function track(name: string, params: TrackParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
