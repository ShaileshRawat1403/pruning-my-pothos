/**
 * visual-types.ts — TypeScript interfaces for the typed visual grammar.
 */

export type VisualPurpose =
  | "sequence"
  | "layers"
  | "boundary"
  | "comparison"
  | "state-change"
  | "decision"
  | "evidence-map"
  | "scale";

export type VisualRenderMode =
  | "generated-sequence"
  | "generated-layers"
  | "generated-boundary"
  | "generated-comparison"
  | "asset";

export type EvidenceRole = "explanatory" | "evidence";

export interface BaseVisual {
  id: string;
  purpose: VisualPurpose;
  takeaway: string;
  caption: string;
  alt: string;
  evidenceRole?: EvidenceRole;
  sources?: string[];
}

export interface GeneratedSequenceVisual extends BaseVisual {
  renderAs: "generated-sequence";
  data: {
    orientation?: "horizontal" | "vertical";
    steps: {
      id: string;
      label: string;
      note?: string;
    }[];
  };
}

export interface GeneratedLayersVisual extends BaseVisual {
  renderAs: "generated-layers";
  data: {
    layers: {
      id: string;
      label: string;
      note?: string;
      highlighted?: boolean;
    }[];
  };
}

export interface GeneratedBoundaryVisual extends BaseVisual {
  renderAs: "generated-boundary";
  data: {
    inside: {
      label: string;
      items: string[];
    };
    outside: {
      label: string;
      items: string[];
    };
    boundaryLabel?: string;
  };
}

export interface GeneratedComparisonVisual extends BaseVisual {
  renderAs: "generated-comparison";
  data: {
    before: {
      label: string;
      items: string[];
    };
    after: {
      label: string;
      items: string[];
    };
    diffNote?: string;
  };
}

export interface AssetVisual extends BaseVisual {
  renderAs: "asset";
  src: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export type Visual =
  | GeneratedSequenceVisual
  | GeneratedLayersVisual
  | GeneratedBoundaryVisual
  | GeneratedComparisonVisual
  | AssetVisual;
