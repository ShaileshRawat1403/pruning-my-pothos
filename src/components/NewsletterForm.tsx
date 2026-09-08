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
 * Reusable newsletter capture component for hero, footer, and inline placements.
 * Reads exclusively from src/lib/newsletter/config.ts.
 *
 * The site is a static export with no custom email backend. When configured,
 * it submits directly to the external provider's public form action endpoint.
 * While unconfigured, it displays an honest "Newsletter coming soon" indicator.
 */
export default function NewsletterForm({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!EMAIL_RE.test(email)) {
      e.preventDefault();
      setStatus("error");
      return;
    }
    if (!NEWSLETTER_CONFIG.form.action) {
      e.preventDefault();
      return;
    }
    setStatus("submitting");
    // Native POST submission to the provider's public action endpoint.
    // Provider confirmation and redirect are authoritative. No optimistic fake success states.
  }

  return (
    <form
      action={NEWSLETTER_CONFIG.form.action || "#"}
      method="post"
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 ${className}`}
    >
      {Object.entries(NEWSLETTER_CONFIG.form.hiddenFields).map(([fieldName, fieldValue]) => (
        <input key={fieldName} type="hidden" name={fieldName} value={fieldValue} />
      ))}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="email"
          name={NEWSLETTER_CONFIG.form.emailFieldName || "email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={copy.placeholder}
          required
          className="px-4 py-3 rounded-lg border border-[#D5D2C9] bg-white text-sm font-mono text-[#121212] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#121212] flex-1 min-w-[220px]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-6 py-3 rounded-lg bg-[#121212] hover:bg-[#2A2926] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : copy.cta}
        </button>
      </div>
      {status === "error" && (
        <span className="font-mono text-xs text-[#DC2626]">
          Please enter a valid email address.
        </span>
      )}
      {NEWSLETTER_CONFIG.socialProofCount !== null && (
        <p className="font-mono text-xs text-[#7A7872] mt-1">
          Join {NEWSLETTER_CONFIG.socialProofCount.toLocaleString()} readers
        </p>
      )}
    </form>
  );
}
