"use client";

import { useState } from "react";
import { NEWSLETTER_CONFIG, isNewsletterConfigured } from "@/lib/newsletter/config";

type Variant = "hero" | "footer" | "inline";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY: Record<Variant, { placeholder: string; cta: string }> = {
  hero: { placeholder: "you@domain.com", cta: "Subscribe" },
  footer: { placeholder: "Email", cta: "Join" },
  inline: { placeholder: "you@domain.com", cta: "Subscribe" },
};

/**
 * Newsletter capture, one component for all three placements (hero, footer,
 * inline). Reads exclusively from src/lib/newsletter/config.ts. Swapping in a
 * real Beehiiv publication is a one-file edit, nothing here changes.
 *
 * The site is a static export with no server (see next.config.ts: output:
 * "export"), so this can only ever talk to Beehiiv directly from the browser:
 * an iframe embed (hero: correctness over full theming, highest-stakes spot)
 * or a themed <form> POST to Beehiiv's public subscribe endpoint (footer,
 * inline: target="_blank", optimistic success since there's no server here
 * to confirm the POST synchronously).
 */
export default function NewsletterForm({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const copy = COPY[variant];

  if (!isNewsletterConfigured) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder={copy.placeholder}
            disabled
            aria-disabled="true"
            className="px-4 py-3 rounded-lg border border-[#D5D2C9] bg-[#F4F2EC]/60 text-sm font-mono text-[#8A8780] placeholder:text-[#A8A29E] cursor-not-allowed focus:outline-none flex-1 min-w-[220px]"
          />
          <button
            type="button"
            disabled
            className="px-6 py-3 rounded-lg bg-[#D5D2C9] text-[#7A7872] text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed shrink-0"
          >
            {copy.cta}
          </button>
        </div>
        <span className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#EAE8E2]/70 text-[#6B6964] border border-[#D5D2C9]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8A8780]" />
          Newsletter coming soon
        </span>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={className}>
        <iframe
          src={NEWSLETTER_CONFIG.embedIframeUrl}
          title="Subscribe to the newsletter"
          loading="lazy"
          style={{ width: "100%", maxWidth: 480, height: 96, border: "none" }}
        />
        {NEWSLETTER_CONFIG.socialProofCount !== null && (
          <p className="font-mono text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Join {NEWSLETTER_CONFIG.socialProofCount.toLocaleString()} readers
          </p>
        )}
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    e.currentTarget.submit();
    // Optimistic: static export has no server to confirm the POST landed.
    // Beehiiv's own hosted page (opened in the new tab) is the real confirmation.
    window.setTimeout(() => setStatus("success"), 600);
  }

  if (status === "success") {
    return (
      <p className={`font-mono text-sm ${className}`} style={{ color: "var(--accent-green)" }}>
        Check your inbox to confirm →
      </p>
    );
  }

  return (
    <form
      action={NEWSLETTER_CONFIG.embedFormUrl}
      method="post"
      target="_blank"
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={copy.placeholder}
          required
          className="font-mono text-sm px-4 py-3 flex-1 min-w-[220px]"
          style={{
            background: "var(--card-bg)",
            border: `1px solid ${status === "error" ? "var(--accent-pink)" : "var(--card-border)"}`,
            color: "var(--text-primary)",
            borderRadius: "3px",
          }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-premium btn-primary"
        >
          {status === "submitting" ? "···" : copy.cta}
        </button>
      </div>
      {status === "error" && (
        <span className="font-mono text-xs" style={{ color: "var(--accent-pink)" }}>
          That doesn&apos;t look like an email.
        </span>
      )}
    </form>
  );
}
