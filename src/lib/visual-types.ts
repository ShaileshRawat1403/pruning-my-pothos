/**
 * visual-types.ts — TypeScript types for the typed visual grammar.
 *
 * Inferred directly from the authoritative Zod contract in scripts/editorial-contract-v1.mjs.
 * Preserves a single source of truth across runtime validation and TypeScript compilation.
 */

import type { z } from "zod";
import type {
  visualSchema,
  sourceSchema,
} from "../../scripts/editorial-contract-v1.mjs";

export type Visual = z.infer<typeof visualSchema>;

export type GeneratedSequenceVisual = Extract<Visual, { renderAs: "generated-sequence" }>;
export type GeneratedLayersVisual = Extract<Visual, { renderAs: "generated-layers" }>;
export type GeneratedBoundaryVisual = Extract<Visual, { renderAs: "generated-boundary" }>;
export type GeneratedComparisonVisual = Extract<Visual, { renderAs: "generated-comparison" }>;
export type AssetVisual = Extract<Visual, { renderAs: "asset" }>;

export type VisualRenderMode = Visual["renderAs"];
export type VisualPurpose = Visual["purpose"];
export type EvidenceRole = NonNullable<Visual["evidenceRole"]>;

export type ProvenanceSource = z.infer<typeof sourceSchema>;
