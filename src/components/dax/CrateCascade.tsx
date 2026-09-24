const CRATES = [
  "dax-core",
  "dax-policy",
  "dax-audit",
  "dax-ledger",
  "dax-indexer",
] as const;

/** Floating proof-ladder crate cascade (decorative, reduced-motion calmed via CSS). */
export default function CrateCascade() {
  return (
    <div className="dax-stage-3d dax-crate-stage" aria-hidden="true">
      <div className="dax-stage-ground" />
      <div className="dax-crate-cascade">
        {CRATES.map((name) => (
          <div key={name} className="dax-crate-tile">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
