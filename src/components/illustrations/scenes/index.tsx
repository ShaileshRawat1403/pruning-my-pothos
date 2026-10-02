"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { SceneProps } from "./kit";

/** One drawing per declared visual id. Each loads with the article that uses it. */
export const SCENES: Record<string, ComponentType<SceneProps>> = {
  "text-becomes-integers": dynamic(() => import("./text-becomes-integers")),
  "one-step-of-generation": dynamic(() => import("./one-step-of-generation")),
  "six-stages-to-a-grounded-answer": dynamic(() => import("./six-stages-to-a-grounded-answer")),
  "instruction-and-contract": dynamic(() => import("./instruction-and-contract")),
  "governed-execution-pipeline": dynamic(() => import("./governed-execution-pipeline")),
  "present-approval-judgment": dynamic(() => import("./present-approval-judgment")),
  "what-each-check-establishes": dynamic(() => import("./what-each-check-establishes")),
  "what-crosses-the-handoff": dynamic(() => import("./what-crosses-the-handoff")),
  "ready-for-what": dynamic(() => import("./ready-for-what")),
  "runtime-choice-comparison": dynamic(() => import("./runtime-choice-comparison")),
  "tool-use-loop": dynamic(() => import("./tool-use-loop")),
  "what-writes-the-parameters": dynamic(() => import("./what-writes-the-parameters")),
  "local-success-is-not-system-success": dynamic(() => import("./local-success-is-not-system-success")),
  "requested-done-worked": dynamic(() => import("./requested-done-worked")),
  "what-is-in-the-window": dynamic(() => import("./what-is-in-the-window")),
  "a-phrase-or-a-package": dynamic(() => import("./a-phrase-or-a-package")),
  "the-five-minute-version": dynamic(() => import("./the-five-minute-version")),
  "three-questions-for-a-record": dynamic(() => import("./three-questions-for-a-record")),
  "three-things-not-one": dynamic(() => import("./three-things-not-one")),
  "a-mood-or-a-step": dynamic(() => import("./a-mood-or-a-step")),
  "close-in-wording-opposite-in-answer": dynamic(() => import("./close-in-wording-opposite-in-answer")),
  "what-a-publisher-holds": dynamic(() => import("./what-a-publisher-holds")),
  "four-questions-five-words": dynamic(() => import("./four-questions-five-words")),
  "five-checks-each-establishing-less": dynamic(() => import("./five-checks-each-establishing-less")),
  "three-quiet-degradations": dynamic(() => import("./three-quiet-degradations")),
  "six-fields-of-an-instruction-spec": dynamic(() => import("./six-fields-of-an-instruction-spec")),
  "resident-or-invoked": dynamic(() => import("./resident-or-invoked")),
  "the-pipeline-runs-one-way": dynamic(() => import("./the-pipeline-runs-one-way")),

  // Works On My Prompt sheets: the steps of a sheet, keyed by its `scene`.
  // Not article visuals, so they stay out of SCENE_IDS.
  "write-it-down-or-watch-it-guess": dynamic(() => import("./write-it-down-or-watch-it-guess")),
  "better-than-last-week-prove-it": dynamic(() => import("./better-than-last-week-prove-it")),
  "it-read-the-folder-allegedly": dynamic(() => import("./it-read-the-folder-allegedly")),
};
