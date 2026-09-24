import React from "react";
import type { IllustrationVisual as IllustrationVisualType } from "../../lib/visual-types";
import { PLATES } from "../illustrations/registry";

/**
 * A storybook chapter plate. The drawing carries its own paper, so it sits on
 * the page like a plate bound into a book and reads the same in either theme.
 * The contract restricts `illustration` to registered keys, so a missing plate
 * is a validation failure long before it could reach this renderer.
 */
export default function IllustrationVisual({ visual }: { visual: IllustrationVisualType }) {
  const Plate = PLATES[visual.illustration];
  return (
    <div className="w-full overflow-hidden rounded-md border border-[#D9D4C6]">
      <Plate label={visual.alt} />
    </div>
  );
}
