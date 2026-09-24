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

/** Conceptual RAO orbit: active node synced from the product tour beats. */
export default function RaoOrbit({ active }: RaoOrbitProps) {
  return (
    <div className="dax-stage-3d dax-rao-stage" aria-hidden="true">
      <div className="dax-stage-ground" />
      <div className="dax-rao-ring">
        {NODES.map((n) => (
          <div
            key={n.id}
            className={`dax-rao-node${active === n.id ? " is-active" : ""}`}
            data-node={n.id}
          >
            <div className="dax-rao-node-face">
              <span>{n.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
