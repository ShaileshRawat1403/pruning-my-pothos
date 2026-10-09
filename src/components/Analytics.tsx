/**
 * Site analytics: Google Analytics 4 (traffic) and Microsoft Clarity
 * (heatmaps, session recordings), with consent. Rendered inside <head> in
 * Google's standard gtag.js form, so the snippet is in the static HTML of
 * every page (GA's tag check reads the page source).
 *
 * Only the production host sends anything: elsewhere (local builds, the dev
 * server, static previews, the cover-export routes) gtag.js loads but is
 * never configured, and Clarity is not loaded.
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
const CONSENT_KEY = "pmp-consent";

// EU member states, plus Iceland, Liechtenstein, Norway, the UK and Switzerland.
const STRICT_REGIONS = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH"];

const INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function () {
  var stored = null;
  try { stored = localStorage.getItem("${CONSENT_KEY}"); } catch (e) {}
  var deny = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  gtag("consent", "default", Object.assign({ analytics_storage: "granted" }, deny));
  gtag("consent", "default", Object.assign({ analytics_storage: "denied", region: ${JSON.stringify(STRICT_REGIONS)} }, deny));
  if (stored === "granted" || stored === "denied") gtag("consent", "update", { analytics_storage: stored });

  window.pmpConsent = function (granted) {
    var v = granted ? "granted" : "denied";
    try { localStorage.setItem("${CONSENT_KEY}", v); } catch (e) {}
    gtag("consent", "update", { analytics_storage: v });
    if (window.clarity) window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: v });
  };

  if (location.hostname !== "${HOST}") return;
  gtag("js", new Date());
  gtag("config", "${GA_ID}");
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "${CLARITY_ID}");
  if (stored === "granted" || stored === "denied") window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: stored });
})();
`;

/** Goes inside <head> in the root layout. */
export default function Analytics() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script id="site-analytics" dangerouslySetInnerHTML={{ __html: INIT }} />
    </>
  );
}
