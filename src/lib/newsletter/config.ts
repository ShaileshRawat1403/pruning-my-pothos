export type NewsletterProvider = "kit" | "unconfigured";

export interface NewsletterConfig {
  /**
   * Active newsletter provider system of record.
   */
  provider: NewsletterProvider;

  /**
   * True only when live form endpoints or embed parameters are configured.
   * When false, forms across the site render an honest "Newsletter coming soon" state.
   */
  configured: boolean;

  /**
   * Public form action URL for direct browser submission (e.g. Kit public action endpoint).
   * Null when unconfigured.
   */
  formActionUrl: string | null;

  /**
   * Public form identifier or form UID if required by the provider embed.
   * Null when unconfigured.
   */
  formId: string | null;

  /**
   * Post-confirmation destination URL on this site.
   * Kit redirects confirmed subscribers here after email verification.
   */
  confirmationRedirectUrl: string;

  /**
   * Real subscriber count if known and verified.
   * Kept null to prevent displaying synthetic or unverified audience metrics.
   */
  socialProofCount: number | null;
}

export const NEWSLETTER_CONFIG: NewsletterConfig = {
  provider: "kit",
  configured: false,
  formActionUrl: null,
  formId: null,
  confirmationRedirectUrl: "/newsletter/welcome",
  socialProofCount: null,
};

export const isNewsletterConfigured: boolean = NEWSLETTER_CONFIG.configured;
