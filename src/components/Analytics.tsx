import Script from "next/script";

/**
 * Site analytics: Google Analytics 4 (traffic) and Microsoft Clarity
 * (heatmaps, session recordings), with consent.
 *
 * Loaded after hydration so neither delays the page, and only on the
 * production host: local builds, the dev server, static previews and the
 * export routes that screenshot covers never send data.
 *
 * Consent (Google Consent Mode v2, Clarity ConsentV2):
 * - Ad storage is always denied; the site runs no ads.
 * - Analytics storage defaults to denied in the EEA, the UK and Switzerland
 *   (GA sends cookieless pings, Clarity runs without cookies) and to granted
 *   elsewhere. A stored choice from ConsentBanner overrides the default on
 *   every page.
 * ConsentBanner asks once and calls window.pmpConsent(granted).
 */
const GA_ID = "G-EQ4JMFY925";
const CLARITY_ID = "lqscm7xayr";
const HOST = "pruningmypothos.com";
export const CONSENT_KEY = "pmp-consent";

// EU member states, plus Iceland, Liechtenstein, Norway, the UK and Switzerland.
const STRICT_REGIONS = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH"];

const LOADER = `
(function () {
  var stored = null;
  try { stored = localStorage.getItem("${CONSENT_KEY}"); } catch (e) {}
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  var deny = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  window.gtag("consent", "default", Object.assign({ analytics_storage: "granted" }, deny));
  window.gtag("consent", "default", Object.assign({ analytics_storage: "denied", region: ${JSON.stringify(STRICT_REGIONS)} }, deny));
  if (stored === "granted" || stored === "denied") window.gtag("consent", "update", { analytics_storage: stored });

  window.pmpConsent = function (granted) {
    var v = granted ? "granted" : "denied";
    try { localStorage.setItem("${CONSENT_KEY}", v); } catch (e) {}
    window.gtag("consent", "update", { analytics_storage: v });
    if (window.clarity) window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: v });
  };

  if (location.hostname !== "${HOST}") return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", "${GA_ID}");
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "${CLARITY_ID}");
  if (stored === "granted" || stored === "denied") window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: stored });
})();
`;

export default function Analytics() {
  return <Script id="site-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: LOADER }} />;
}
