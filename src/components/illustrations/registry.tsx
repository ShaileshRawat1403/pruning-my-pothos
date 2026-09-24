import type { ComponentType } from "react";
import {
  GovernedCover,
  GovernedPath,
  GovernedFailures,
  GovernedPermission,
  GovernedUncertainty,
  GovernedHandoff,
  GovernedVerification,
  GovernedFailureClasses,
  GovernedClose,
  type FrameProps,
} from "./frames-governed-execution";

/** Storyboard frames, keyed by the frame keys in lib/content/storyboards. */
export const FRAMES: Record<string, ComponentType<FrameProps>> = {
  "governed-cover": GovernedCover,
  "governed-path": GovernedPath,
  "governed-failures": GovernedFailures,
  "governed-permission": GovernedPermission,
  "governed-uncertainty": GovernedUncertainty,
  "governed-handoff": GovernedHandoff,
  "governed-verification": GovernedVerification,
  "governed-failure-classes": GovernedFailureClasses,
  "governed-close": GovernedClose,
};

/** Render one frame by key, failing the build loudly if it is not drawn. */
export function Frame({ frameKey, label, number, total }: { frameKey: string } & FrameProps) {
  const Component = FRAMES[frameKey];
  if (!Component) {
    throw new Error(`Storyboard frame "${frameKey}" is declared but has no drawing in illustrations/registry.tsx`);
  }
  return <Component label={label} number={number} total={total} />;
}
