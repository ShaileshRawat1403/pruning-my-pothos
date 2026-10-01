import type { FilmScript } from "./kit";
import { film as f_a_simple_tokenizer } from "./a-simple-tokenizer";
import { film as f_agent_instructions_and_handoff_as_an_operating_system } from "./agent-instructions-and-handoff-as-an-operating-system";
import { film as f_ai_agents_vs_ai_workflows } from "./ai-agents-vs-ai-workflows";
import { film as f_ai_architecture_explained_how_modern_llm_applications_work } from "./ai-architecture-explained-how-modern-llm-applications-work";
import { film as f_architecture_of_in_chat_ai_apps } from "./architecture-of-in-chat-ai-apps";
import { film as f_context_windows_as_working_memory } from "./context-windows-as-working-memory";
import { film as f_designing_reusable_ai_skills } from "./designing-reusable-ai-skills";
import { film as f_evaluation_is_a_human_problem } from "./evaluation-is-a-human-problem";
import { film as f_from_agent_intent_to_governed_execution } from "./from-agent-intent-to-governed-execution";
import { film as f_from_prompt_to_production } from "./from-prompt-to-production";
import { film as f_human_in_the_loop_is_a_system_design_choice } from "./human-in-the-loop-is-a-system-design-choice";
import { film as f_i_7_cognitive_loop } from "./i-7-cognitive-loop";
import { film as f_observability_first_ai_systems } from "./observability-first-ai-systems";
import { film as f_policy_governed_mcp_runtimes_for_secure_tool_execution } from "./policy-governed-mcp-runtimes-for-secure-tool-execution";
import { film as f_prompting_is_not_the_skill_you_think_it_is } from "./prompting-is-not-the-skill-you-think-it-is";
import { film as f_retrieval_augmented_generation_in_plain_terms } from "./retrieval-augmented-generation-in-plain-terms";
import { film as f_runtime_over_model_why_orchestration_is_the_product } from "./runtime-over-model-why-orchestration-is-the-product";
import { film as f_semantic_caching_for_probabilistic_systems } from "./semantic-caching-for-probabilistic-systems";
import { film as f_seo_aeo_geo_in_plain_terms } from "./seo-aeo-geo-in-plain-terms";
import { film as f_skills_vs_prompts_vs_agents } from "./skills-vs-prompts-vs-agents";
import { film as f_structured_output_and_why_it_matters } from "./structured-output-and-why-it-matters";
import { film as f_systems_001_foundations } from "./systems-001-foundations";
import { film as f_tech_stack_for_nlpg_driven_ai_assisted_sdlc } from "./tech-stack-for-nlpg-driven-ai-assisted-sdlc";
import { film as f_tool_use_when_language_triggers_actions } from "./tool-use-when-language-triggers-actions";
import { film as f_training_vs_inference } from "./training-vs-inference";
import { film as f_what_a_system_prompt_actually_is } from "./what-a-system-prompt-actually-is";
import { film as f_what_an_ai_model_actually_is } from "./what-an-ai-model-actually-is";
import { film as f_why_ocr_quietly_breaks_document_ai } from "./why-ocr-quietly-breaks-document-ai";
import { film as f_sheet_write_it_down_or_watch_it_guess } from "./write-it-down-or-watch-it-guess";
import { film as f_sheet_better_than_last_week_prove_it } from "./better-than-last-week-prove-it";

/** One film per Systems article, keyed by the article's slug; then one per
 * Works On My Prompt sheet with its own cover art, keyed by the sheet's slug. */
export const FILMS: Record<string, FilmScript> = {
  "a-simple-tokenizer": f_a_simple_tokenizer,
  "agent-instructions-and-handoff-as-an-operating-system": f_agent_instructions_and_handoff_as_an_operating_system,
  "ai-agents-vs-ai-workflows": f_ai_agents_vs_ai_workflows,
  "ai-architecture-explained-how-modern-llm-applications-work": f_ai_architecture_explained_how_modern_llm_applications_work,
  "architecture-of-in-chat-ai-apps": f_architecture_of_in_chat_ai_apps,
  "context-windows-as-working-memory": f_context_windows_as_working_memory,
  "designing-reusable-ai-skills": f_designing_reusable_ai_skills,
  "evaluation-is-a-human-problem": f_evaluation_is_a_human_problem,
  "from-agent-intent-to-governed-execution": f_from_agent_intent_to_governed_execution,
  "from-prompt-to-production": f_from_prompt_to_production,
  "human-in-the-loop-is-a-system-design-choice": f_human_in_the_loop_is_a_system_design_choice,
  "i-7-cognitive-loop": f_i_7_cognitive_loop,
  "observability-first-ai-systems": f_observability_first_ai_systems,
  "policy-governed-mcp-runtimes-for-secure-tool-execution": f_policy_governed_mcp_runtimes_for_secure_tool_execution,
  "prompting-is-not-the-skill-you-think-it-is": f_prompting_is_not_the_skill_you_think_it_is,
  "retrieval-augmented-generation-in-plain-terms": f_retrieval_augmented_generation_in_plain_terms,
  "runtime-over-model-why-orchestration-is-the-product": f_runtime_over_model_why_orchestration_is_the_product,
  "semantic-caching-for-probabilistic-systems": f_semantic_caching_for_probabilistic_systems,
  "seo-aeo-geo-in-plain-terms": f_seo_aeo_geo_in_plain_terms,
  "skills-vs-prompts-vs-agents": f_skills_vs_prompts_vs_agents,
  "structured-output-and-why-it-matters": f_structured_output_and_why_it_matters,
  "systems-001-foundations": f_systems_001_foundations,
  "tech-stack-for-nlpg-driven-ai-assisted-sdlc": f_tech_stack_for_nlpg_driven_ai_assisted_sdlc,
  "tool-use-when-language-triggers-actions": f_tool_use_when_language_triggers_actions,
  "training-vs-inference": f_training_vs_inference,
  "what-a-system-prompt-actually-is": f_what_a_system_prompt_actually_is,
  "what-an-ai-model-actually-is": f_what_an_ai_model_actually_is,
  "why-ocr-quietly-breaks-document-ai": f_why_ocr_quietly_breaks_document_ai,

  "write-it-down-or-watch-it-guess": f_sheet_write_it_down_or_watch_it_guess,
  "better-than-last-week-prove-it": f_sheet_better_than_last_week_prove_it,
};
