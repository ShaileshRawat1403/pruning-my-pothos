import BotanicalLifecycle from "./BotanicalLifecycle";
import NewsletterForm from "../NewsletterForm";

interface HeroProps {
  systemsCount: number;
  toolsCount: number;
}

export default function Hero({ systemsCount, toolsCount }: HeroProps) {
  return (
    <>
      <section id="hero" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-20 md:pt-18 md:pb-22">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

            {/* Left Column: Hero Editorial Statement */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#8A8780] uppercase flex-wrap">
                <span className="text-[#16A34A] font-bold">// TECH-EDITORIAL</span>
                <span>·</span>
                <span>{systemsCount} BLUEPRINTS</span>
                <span>·</span>
                <span>{toolsCount} VERIFIED TOOLS</span>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.06] text-[#121212]">
                  Prune the noise. <br />
                  Inspect the boundary. <br />
                  <span className="underline decoration-[#16A34A] decoration-wavy decoration-2 underline-offset-8">
                    Verify what runs.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#55534E] leading-relaxed max-w-xl font-normal pt-2">
                  Practical breakdowns of AI coding agents, context compaction, and autonomous workflows, explained against systems that were built, run, inspected, or broken.
                </p>
              </div>

              {/* Newsletter Subscription Island */}
              <div id="newsletter" className="scroll-mt-28 flex flex-col gap-3 max-w-lg">
                <NewsletterForm variant="hero" />

                <div className="flex items-center justify-between text-xs text-[#7A7872] px-1 font-mono pt-1">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-[#16A34A]">&#10003;</span>
                    Field notes on orchestration, runtime evaluations, and failure modes
                  </span>
                  <a
                    href="#breakdowns"
                    className="hover:text-[#121212] transition-colors underline underline-offset-4 decoration-[#D5D2C9] text-[11px]"
                  >
                    Sample issue &rarr;
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

      {/* Audited Stack Ticker */}
      <div className="w-full py-3.5 px-6 sm:px-10 lg:px-12 bg-[#F4F2EC]/80 border-b border-[#EAE8E2] flex items-center justify-between text-[11px] font-mono text-[#7A7872] overflow-x-auto gap-6 select-none">
        <span className="font-bold text-[#121212] shrink-0 uppercase tracking-wider">
          Audited Systems:
        </span>
        <div className="flex items-center gap-6 shrink-0 tracking-wide">
          <span>MCP PROTOCOL</span>
          <span>·</span>
          <span>CLAUDE 3.7 SONNET</span>
          <span>·</span>
          <span>OPENAI CODEX</span>
          <span>·</span>
          <span>DEEPSEEK R1</span>
          <span>·</span>
          <span>VLLM RUNTIMES</span>
          <span>·</span>
          <span>OLLAMA LOCAL</span>
          <span>·</span>
          <span>LANGGRAPH WORKFLOWS</span>
          <span>·</span>
          <span>EVIDENCE GATES</span>
        </div>
      </div>
    </>
  );
}
