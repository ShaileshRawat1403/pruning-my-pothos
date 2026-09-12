import React from "react";
import type { AssetVisual as AssetVisualType } from "../../lib/visual-types";

interface Props {
  visual: AssetVisualType;
}

export default function AssetVisual({ visual }: Props) {
  return (
    <div className="w-full flex justify-center overflow-hidden rounded">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={visual.src}
        alt={visual.alt}
        width={visual.dimensions?.width}
        height={visual.dimensions?.height}
        className="w-full h-auto max-w-full rounded object-contain"
      />
    </div>
  );
}
