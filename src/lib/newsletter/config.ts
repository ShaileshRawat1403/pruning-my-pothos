export type NewsletterProvider = "kit" | "unconfigured";

export interface NewsletterFormContract {
  /**
   * Public form action URL for direct browser submission.
   * Null when unconfigured.
   */
  action: string | null;

  /**
   * Field name expected by the provider for email input.
   * Null when unconfigured.
   */
  emailFieldName: string | null;

  /**
   * Hidden input fields required by the provider form embed (e.g. tracking tokens, form UIDs).
   * Empty when unconfigured.
   */
  hiddenFields: Record<string, string>;
}

export interface NewsletterConfig {
  /**
   * Active newsletter provider system of record.
   */
  provider: NewsletterProvider;

  /**
   * True only when live form endpoints and embed parameters are configured.
   * When false, forms across the site render an honest "Newsletter coming soon" state.
   */
  configured: boolean;

  /**
   * Provider-specific public form parameters.
   * Populated only after inspecting the real form embed code.
   */
  form: NewsletterFormContract;

  /**
   * Intended post-confirmation destination URL on this site.
   * Must be set in Kit's form redirect settings once the form is created.
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
  form: {
    action: null,
    emailFieldName: null,
    hiddenFields: {},
  },
  confirmationRedirectUrl: "/newsletter/welcome/",
  socialProofCount: null,
};

export const isNewsletterConfigured: boolean = NEWSLETTER_CONFIG.configured;
