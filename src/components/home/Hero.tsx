import BotanicalLifecycle from "./BotanicalLifecycle";
import NewsletterForm from "../NewsletterForm";
import { SITE_POSITIONING } from "../../lib/config/site-positioning";

export default function Hero() {
  return (
    <section id="hero" className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-20 md:pt-18 md:pb-22">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Column: Hero Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[color:var(--text-primary)]">
                {SITE_POSITIONING.headline}
              </h1>

              <p className="text-base sm:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-2xl font-normal pt-2">
                {SITE_POSITIONING.candidateSupportLine}
              </p>
            </div>

            {/* Newsletter Subscription Island */}
            <div id="newsletter" className="scroll-mt-28 flex flex-col gap-3 max-w-lg">
              <NewsletterForm variant="hero" />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-xs text-[color:var(--text-muted)] px-1 font-mono pt-1">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-[color:var(--accent-green)]">&#10003;</span>
                  What worked, what broke, and what I learned building with AI.
                </span>
                <a
                  href="#systems-map"
                  className="hover:text-[color:var(--text-primary)] transition-colors underline underline-offset-4 decoration-[color:var(--card-border)] text-[11px]"
                >
                  Start with the systems map &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Botanical Growth Lifecycle Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <BotanicalLifecycle />
          </div>

        </div>
      </div>
    </section>
  );
}
