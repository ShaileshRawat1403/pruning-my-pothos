import type { ComponentType } from "react";
import type { IllustrationKey } from "../../lib/visual-types";
import {
  PlateGovernedCast,
  PlateGovernedPermission,
  PlateGovernedUncertainty,
  PlateGovernedVerification,
  PlateGovernedFailureClasses,
  PlateGovernedClose,
} from "./plates-governed-execution";
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

/**
 * Chapter plates, keyed by the contract's ILLUSTRATION_KEYS. Typed as a full
 * Record so a key added to the contract without a drawing fails typecheck.
 */
export const PLATES: Record<IllustrationKey, ComponentType<{ label: string }>> = {
  "governed-cast": PlateGovernedCast,
  "governed-permission": PlateGovernedPermission,
  "governed-uncertainty": PlateGovernedUncertainty,
  "governed-verification": PlateGovernedVerification,
  "governed-failure-classes": PlateGovernedFailureClasses,
  "governed-close": PlateGovernedClose,
};

/** Walkthrough frames, keyed by the frame keys in lib/content/walkthroughs. */
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
    throw new Error(`Walkthrough frame "${frameKey}" is declared but has no drawing in illustrations/registry.tsx`);
  }
  return <Component label={label} number={number} total={total} />;
}
