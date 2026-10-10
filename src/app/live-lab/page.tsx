import SectionHeader from "../../components/SectionHeader";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Systems Telemetry",
  description: "Monitor execution telemetry, ledger updates, and status checks of offline workflow engines.",
  path: "/live-lab"
});

export default function LiveLabIndexPage() {
  const schema = getWebPageSchema({
    title: "Systems Telemetry",
    description: "Monitor execution telemetry, ledger updates, and status checks of offline workflow engines.",
    path: "/live-lab"
  });

  return (
    <div className="relative w-full flex flex-col gap-16 max-w-[1100px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <SectionHeader
        eyebrow="Live lab"
        title="Systems Telemetry"
        intro="Execution logs, runtime audits, and system status checkers showing the health of offline engineering pipelines."
        scene="stack"
        slim
      />

      <section className="ledger-sheet">
        <div className="ledger-head">
          <h2 className="font-heading text-xl font-extrabold">status_ledger</h2>
          <span className="ledger-stamp">SAMPLE</span>
        </div>

        <div className="ledger-grid">
          {[
            ["Ledger logs", "260"],
            ["Active agents", "6"],
            ["Suite integrity", "100%"],
            ["Gates pending", "0"],
          ].map(([k, v]) => (
            <div key={k} className="ledger-cell">
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>

        <div className="ledger-log">
          {[
            ["$", "agy --init-telemetry"],
            ["ok", "Telemetry bridge initialized on port 3000."],
            ["$", "agy --scan-collections"],
            ["..", "Found 5 content collections with 260 documents."],
            ["..", "Indexing schema structures... OK."],
            ["$", "agy --check-parity"],
            ["ok", "Route parity checked. 440 static paths compiled cleanly."],
            ["$", "agy --verify-redirects"],
            ["..", "/sticky-notes/* mapped to /sentiments/."],
          ].map(([t, l], i) => (
            <p key={i} className={t === "ok" ? "is-ok" : t === "$" ? "is-cmd" : undefined}>
              <span>{t}</span>
              {l}
            </p>
          ))}
          <p className="is-wait">awaiting a real connection. (it has been a while)</p>
        </div>

        <p className="ledger-note">
          A sample of what the cockpit shows: the numbers and log lines above are placeholders, not live readings. Real updates need the CLI
          runtime connected inside a private workspace.
        </p>
      </section>
    </div>
  );
}
