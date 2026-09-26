"use client";

type ActiveNode = "run" | "audit" | "override" | null;

const NODES: Array<{ id: ActiveNode & string; label: string }> = [
  { id: "run", label: "Run" },
  { id: "audit", label: "Audit" },
  { id: "override", label: "Override" },
];

interface RaoOrbitProps {
  active: ActiveNode;
}

/** Flat RAO chips synced from the product tour. Replaces the old 3D orbit. */
export default function RaoOrbit({ active }: RaoOrbitProps) {
  return (
    <div className="dax-rao-strip" aria-hidden="true">
      {NODES.map((n, i) => (
        <div key={n.id} className="dax-rao-strip-item">
          <div className={`dax-rao-chip${active === n.id ? " is-active" : ""}`} data-node={n.id}>
            <span className="dax-rao-chip-idx">{String(i + 1).padStart(2, "0")}</span>
            <span>{n.label}</span>
          </div>
          {i < NODES.length - 1 && <span className="dax-rao-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}
