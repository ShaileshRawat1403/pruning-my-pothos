"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RaoOrbit from "./RaoOrbit";

type BeatId = "0" | "1" | "2" | "3" | "4a" | "4b";
type ActionType = "next" | "approve" | "deny" | "restart" | "install";
type ActionStyle = "primary" | "approve" | "deny" | "ghost" | "secondary";

interface MetaPill {
  text: string;
  cls?: "ok" | "warn" | "";
}

interface BeatAction {
  label: string;
  type: ActionType;
  style: ActionStyle;
}

interface Beat {
  id: BeatId;
  nav: string;
  tag: string;
  title: string;
  meta: MetaPill[];
  paragraphs: React.ReactNode[];
  actions: BeatAction[];
  hint?: string;
}

const BEATS: Beat[] = [
  {
    id: "0",
    nav: "0 Intent",
    tag: "Beat 0 · Intent",
    title: "Task locked before the model moves",
    meta: [
      { text: "write-scope: src/**", cls: "ok" },
      { text: "Forbidden: package.json", cls: "warn" },
    ],
    paragraphs: [
      <>
        Task: <strong>Add an isEven helper with tests.</strong>
      </>,
      <>
        Write-scope is limited to <code className="font-mono text-[12px] px-1.5 py-0.5 rounded-[3px] border border-[color:var(--card-border)] bg-[color:var(--bg-color)] text-[color:var(--accent-amber)]">src/**</code>.{" "}
        <code className="font-mono text-[12px] px-1.5 py-0.5 rounded-[3px] border border-[color:var(--card-border)] bg-[color:var(--bg-color)] text-[color:var(--accent-amber)]">package.json</code>{" "}
        is forbidden. Policy vocabulary stays exact: <strong>allow / ask / deny</strong>.
      </>,
    ],
    actions: [{ label: "Next", type: "next", style: "primary" }],
  },
  {
    id: "1",
    nav: "1 Run",
    tag: "Beat 1 · Run",
    title: "Worker proposes edits inside scope",
    meta: [
      { text: "disposable checkout", cls: "ok" },
      { text: "Network denied", cls: "warn" },
    ],
    paragraphs: [
      <>
        Worker proposes edits inside scope. A <strong>disposable checkout</strong> isolates the change set.
      </>,
      <>Network denied for verification—proof stays local and deterministic.</>,
    ],
    actions: [{ label: "Next", type: "next", style: "primary" }],
  },
  {
    id: "2",
    nav: "2 Audit",
    tag: "Beat 2 · Audit",
    title: "Policy: ask — verification gate",
    meta: [
      { text: "policy: ask", cls: "warn" },
      { text: "verification gate", cls: "" },
    ],
    paragraphs: [
      <>
        Policy: <strong>ask</strong> — verification gate before apply.
      </>,
      <>
        Nothing mutates until a human resolves allow / ask / deny. The audit trail already holds canonical events from the run.
      </>,
    ],
    actions: [{ label: "Next", type: "next", style: "primary" }],
  },
  {
    id: "3",
    nav: "3 Override",
    tag: "Beat 3 · Override",
    title: "Approval: Approve apply · Deny",
    meta: [
      { text: "HITL required", cls: "warn" },
      { text: "branching", cls: "" },
    ],
    paragraphs: [
      <>
        Approval: <strong>Approve apply</strong> · <strong>Deny</strong> (branching).
      </>,
      <>
        Choose a path. Approve records a <strong>verification receipt</strong> and prepares the diff. Deny records intervention and skips apply.
      </>,
    ],
    actions: [
      { label: "Approve", type: "approve", style: "approve" },
      { label: "Deny", type: "deny", style: "deny" },
    ],
  },
  {
    id: "4a",
    nav: "4a Approve",
    tag: "Beat 4a · Approve",
    title: "Diff ready. Verification receipt recorded.",
    meta: [
      { text: "verification receipt", cls: "ok" },
      { text: "run completable", cls: "ok" },
    ],
    paragraphs: [
      <>
        <strong>Diff ready.</strong> Verification receipt recorded. Run completable with evidence.
      </>,
      <>CTA hint: Install to run this for real.</>,
    ],
    actions: [
      { label: "Install DAX", type: "install", style: "primary" },
      { label: "Restart tour", type: "restart", style: "ghost" },
    ],
    hint: "Install to run this for real.",
  },
  {
    id: "4b",
    nav: "4b Deny",
    tag: "Beat 4b · Deny",
    title: "Intervention recorded. No apply.",
    meta: [
      { text: "receipt: deny", cls: "warn" },
      { text: "no apply", cls: "" },
    ],
    paragraphs: [
      <>
        <strong>Intervention recorded.</strong> No apply. Receipt shows <strong>deny</strong>.
      </>,
      <>
        The disposable checkout is discarded. Canonical events still replay—evidence of the stop, not a silent skip.
      </>,
    ],
    actions: [{ label: "Restart tour", type: "restart", style: "primary" }],
  },
];

const ORBIT_MAP: Record<BeatId, "run" | "audit" | "override" | null> = {
  "0": null,
  "1": "run",
  "2": "audit",
  "3": "override",
  "4a": "override",
  "4b": "override",
};

function beatById(id: BeatId) {
  return BEATS.find((b) => b.id === id)!;
}

function actionClass(style: ActionStyle) {
  if (style === "primary") return "btn-premium btn-primary text-sm !py-2.5 !px-4";
  if (style === "approve") return "btn-premium dax-btn-approve text-sm !py-2.5 !px-4 rounded-[3px]";
  if (style === "deny") return "btn-premium dax-btn-deny text-sm !py-2.5 !px-4 rounded-[3px]";
  if (style === "ghost") return "btn-premium dax-btn-ghost text-sm !py-2.5 !px-4 rounded-[3px]";
  return "btn-premium btn-secondary text-sm !py-2.5 !px-4";
}

/**
 * Scripted RAO product tour (Immersion B): Intent → Run → Audit → Override,
 * with Approve/Deny branching. Client-only; no backend.
 */
export default function RaoTour() {
  const [current, setCurrent] = useState<BeatId>("0");
  const [path, setPath] = useState<BeatId[]>(["0"]);
  const [branchTaken, setBranchTaken] = useState<"approve" | "deny" | null>(null);
  const [flash, setFlash] = useState<"approve" | "deny" | null>(null);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const transitioning = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const visibleNav = useMemo(() => {
    const ids: BeatId[] = ["0", "1", "2", "3"];
    if (branchTaken === "approve") ids.push("4a");
    else if (branchTaken === "deny") ids.push("4b");
    else {
      ids.push("4a");
      ids.push("4b");
    }
    return ids;
  }, [branchTaken]);

  const goTo = useCallback((id: BeatId, push: boolean) => {
    const animate = !reducedRef.current;
    const apply = () => {
      setCurrent(id);
      if (push) {
        setPath((prev) => (prev.includes(id) ? prev : [...prev, id]));
      }
    };

    if (!animate || transitioning.current) {
      apply();
      setPhase("idle");
      return;
    }

    transitioning.current = true;
    setPhase("exiting");
    window.setTimeout(() => {
      apply();
      setPhase("entering");
      window.setTimeout(() => {
        setPhase("idle");
        transitioning.current = false;
      }, 320);
    }, 200);
  }, []);

  const flashPanel = (kind: "approve" | "deny") => {
    if (reducedRef.current) return;
    setFlash(kind);
    window.setTimeout(() => setFlash(null), 600);
  };

  const handleAction = (type: ActionType) => {
    if (type === "next") {
      const order: BeatId[] = ["0", "1", "2", "3"];
      const i = order.indexOf(current);
      if (i >= 0 && i < order.length - 1) goTo(order[i + 1], true);
    } else if (type === "approve") {
      setBranchTaken("approve");
      flashPanel("approve");
      goTo("4a", true);
    } else if (type === "deny") {
      setBranchTaken("deny");
      flashPanel("deny");
      goTo("4b", true);
    } else if (type === "restart") {
      setBranchTaken(null);
      setPath(["0"]);
      setCurrent("0");
      setPhase("idle");
      transitioning.current = false;
    } else if (type === "install") {
      const target = document.getElementById("install");
      target?.scrollIntoView({ behavior: reducedRef.current ? "auto" : "smooth" });
    }
  };

  const beat = beatById(current);
  const stepNum = current === "4a" || current === "4b" ? "4" : current;
  const contentPhase =
    phase === "exiting" ? " is-exiting" : phase === "entering" ? " is-entering" : "";

  return (
    <div className="flex flex-col gap-6">
      <div className="py-2">
        <RaoOrbit active={ORBIT_MAP[current]} />
      </div>

      <div
        className={`dax-tour-panel${flash === "approve" ? " flash-approve" : ""}${flash === "deny" ? " flash-deny" : ""}`}
        role="region"
        aria-label="RAO product tour"
      >
        <div className="dax-tour-chrome">
          <span>
            <span className="dax-tour-chrome-dot" aria-hidden="true" />
            Product tour · Scripted demo
          </span>
          <span>
            Beat {stepNum} / 4
          </span>
        </div>

        <div className="dax-tour-body">
          <nav className="dax-tour-beats" aria-label="Tour beats">
            {visibleNav.map((id) => {
              const b = beatById(id);
              const isBranch = id === "4a" || id === "4b";
              const reachable = path.includes(id) || id === current;
              const lockedBranch = isBranch && branchTaken === null;
              const disabled = !reachable || lockedBranch;
              return (
                <button
                  key={id}
                  type="button"
                  className={`dax-tour-beat${id === current ? " active" : ""}${path.includes(id) && id !== current ? " done" : ""}${isBranch ? " branch" : ""}`}
                  disabled={disabled}
                  onClick={() => {
                    if (!disabled) goTo(id, false);
                  }}
                >
                  {b.nav}
                </button>
              );
            })}
          </nav>

          <div className="dax-tour-main">
            <div className={`dax-tour-content flex flex-col flex-1${contentPhase}`}>
              <div className="font-mono text-[11px] tracking-[0.07em] uppercase text-[color:var(--accent-amber)] mb-3">
                {beat.tag}
              </div>
              <h3 className="font-heading text-[21px] font-bold tracking-tight leading-snug text-[color:var(--text-primary)] mb-4">
                {beat.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {beat.meta.map((m) => (
                  <span key={m.text} className={`dax-meta-pill${m.cls ? ` ${m.cls}` : ""}`}>
                    {m.text}
                  </span>
                ))}
              </div>
              <div className="text-[14.5px] leading-relaxed text-[color:var(--text-secondary)] flex-1 mb-5 space-y-2.5">
                {beat.paragraphs.map((p, i) => (
                  <p key={i} className="m-0 [&_strong]:text-[color:var(--text-primary)] [&_strong]:font-semibold">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 items-center pt-[18px] border-t border-[color:var(--card-border)]">
              {beat.actions.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  className={actionClass(a.style)}
                  onClick={() => handleAction(a.type)}
                >
                  {a.label}
                </button>
              ))}
              {beat.hint ? (
                <span className="text-xs italic text-[color:var(--text-muted)] ml-auto">
                  {beat.hint}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
