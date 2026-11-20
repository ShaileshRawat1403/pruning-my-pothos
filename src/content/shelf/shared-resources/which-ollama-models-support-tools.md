---
title: "Which Ollama models support tools"
seoTitle: "Which Ollama Models Support Tools? How to Check Yours"
description: "Ollama lists tools among a model's capabilities when it can take a tools array. How to check your version and model, a test call, and the library list."
publishDate: "2026-11-18"
updatedAt: "2026-11-20"
tags:
  - resources
  - ollama
  - local-llm
  - tools
coverUrl: "/covers/shelf/items/shared-resources/which-ollama-models-support-tools.png"
coverAlt: "Cover illustration for Which Ollama models support tools"
resourceHighlights:
  - Check the capability on your own install with ollama show
  - Why the answer depends on your Ollama version and the model you pulled
  - What the library's Tools filter showed on 18 November 2026, and what it leaves out
---

An Ollama model supports tools when your Ollama server lists `tools` among that model's capabilities. The server works this out from the model's prompt template or its built-in parser, so the answer depends on two things: the Ollama version you run and the version of the model you pulled. The model library's [Tools filter](https://ollama.com/search?c=tools) lists models Ollama labels this way, though not all of them at once.

**Checked 18 November 2026** against Ollama's documentation, its model library and its source code at release v0.40.16 (published 9 November 2026). None of the commands below were run for this page: no Ollama install and no model were tested. The expected results come from the documentation and the source, linked at each step.

## Check your own install

### 1. Your Ollama version

```bash
ollama --version
curl http://localhost:11434/api/version
```

`ollama --version` asks the running server for its version and prints `ollama version is` followed by it. If the command-line client is a different version, it adds a line starting `Warning: client version is` ([source, cmd/cmd.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/cmd/cmd.go#L2349-L2367)). The server's version is the one that matters here, because the server decides the capabilities. The `/api/version` endpoint returns it as JSON with a `version` field ([API reference](https://docs.ollama.com/api-reference/get-version)).

### 2. The model's capabilities

```bash
ollama show qwen3
curl http://localhost:11434/api/show -d '{"model": "qwen3"}'
```

Replace `qwen3` with the model you pulled; `qwen3` is the model Ollama's own [tool calling examples](https://docs.ollama.com/capabilities/tool-calling) use. `ollama show` prints a Capabilities table when the server reports any ([source, cmd/cmd.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/cmd/cmd.go#L1499-L1500)). The `/api/show` endpoint returns the same list in a `capabilities` array, which the API reference describes as a "List of supported features" ([API reference](https://docs.ollama.com/api-reference/show-model-details)).

Look for `tools` in that list. That is the exact string Ollama uses for tool support ([source, types/model/capability.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/types/model/capability.go#L5-L16)). Other values in the same list include `completion`, `thinking`, `vision` and `embedding`.

### 3. A single tool call

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "qwen3",
  "stream": false,
  "messages": [
    {"role": "user", "content": "What is the temperature in New York?"}
  ],
  "tools": [{
    "type": "function",
    "function": {
      "name": "get_temperature",
      "description": "Get the current temperature for a city",
      "parameters": {
        "type": "object",
        "required": ["city"],
        "properties": {
          "city": {"type": "string", "description": "The name of the city"}
        }
      }
    }
  }]
}'
```

This follows the single-tool request in Ollama's [tool calling documentation](https://docs.ollama.com/capabilities/tool-calling). What to expect:

- **If the model has the `tools` capability** and decides to use the tool, the reply's `message` carries a `tool_calls` list, each entry with the function's `name` and its `arguments` ([docs](https://docs.ollama.com/capabilities/tool-calling)). Your code runs the function and sends the result back as a message with `"role": "tool"`. The model may also answer in plain text without calling the tool; the documentation does not promise a call.
- **If the model lacks the `tools` capability**, the server refuses the request with HTTP 400 and an error that names the model and ends in `does not support tools`. A request that includes tools requires the capability ([source, server/routes.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/server/routes.go#L3203-L3206)), the check fails when it is missing ([server/images.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/server/images.go#L599-L631)), the model's name is put in front of it ([server/routes.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/server/routes.go#L274-L276)), and the error is returned as a bad request ([server/routes.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/server/routes.go#L3634-L3637)). The documentation does not describe this error.

## How Ollama decides

At v0.40.16 the server adds `tools` to a model's capabilities in three cases ([source, server/images.go](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/server/images.go#L242-L301)):

- the model's Go template uses a `tools` variable;
- the model's chat template mentions `tools` or `tool_call`;
- the model uses one of Ollama's built-in parsers that handles tool calls ([source](https://github.com/ollama/ollama/blob/d63b702609c4300a2ca07be2bdb0adb9834725e5/server/images.go#L486-L497)).

So the capability is read from files that arrive with the model and from parsers that ship with Ollama. Two consequences follow from that, and both are worth checking yourself: a copy of a model pulled long ago carries the template it was pulled with, and the list of built-in parsers belongs to the Ollama version you run.

## What the label leaves open

`tools` means the server will accept a `tools` array for that model and look for tool calls in its output. It says nothing about how well the model picks a tool or fills its arguments. That takes a test with your own tools and prompts.

Ollama's documentation also covers [streaming tool calls, parallel tool calls and a multi-turn agent loop](https://docs.ollama.com/capabilities/tool-calling). For what a tool call is and what can go wrong when language triggers an action, see [Tool use: when language triggers actions](/systems/tool-use-when-language-triggers-actions/).

## What the library's Tools filter showed on 18 November 2026

The table below is an observed list: what the [Tools filter](https://ollama.com/search?c=tools) showed when it was read on 18 November 2026. It is incomplete, and it changes with the sort order and over time.

- **It shows 20 models and no total.** Neither sort order offered a next page or a count.
- **It depends on the sort.** Sorted by [Popular](https://ollama.com/search?c=tools) and by [Newest](https://ollama.com/search?c=tools&o=newest), the filter showed 20 models each, and 12 of them appeared in both lists.
- **It can leave out tagged models.** `qwen3`, the model in Ollama's own examples, carries the `tools` tag on [its library page](https://ollama.com/library/qwen3) and appeared in neither list.

To check a model that is not listed, open its library page and look for the `tools` tag, or run `ollama show` on your own copy (step 2 above).

Sorted by Popular, in page order, as observed on 18 November 2026:

| Model | Runs | Other capability tags |
| :--- | :--- | :--- |
| deepseek-v4.1-flash | cloud | vision, thinking |
| glm-5.3 | cloud | thinking |
| glm-5.3-flash | cloud | vision, thinking |
| inkling-2-small | cloud | vision, thinking |
| ripple-preview | local | thinking |
| mimo-v2.6 | local | vision, thinking |
| lfm3 | local | thinking |
| lfm3-omni | local | vision, audio |
| lfm3-vl | local | vision, thinking |
| lfm3-audio | local | vision, audio |
| minimax-m3.1-flash | cloud | vision, thinking |
| kimi-k3.1-pro | cloud | vision, thinking |
| qwen3.8 | local | vision, thinking |
| nemotron-3.5-lightning | local | thinking |
| bonsai-2 | local | vision, thinking |
| ornith-1.5 | local | vision, thinking |
| ornith | local | thinking |
| flint | local | thinking |
| muse-glimmer | local | vision, thinking |
| tev1 | local | decision, thinking |

Models marked cloud carry the `cloud` tag in the library and list no download size. The library tag is Ollama's label for the model; the capability your server reports for the copy you pulled is the one your requests are checked against.

## Dated history

- **25 July 2024**: Ollama [announced tool calling](https://ollama.com/blog/tool-support), naming Llama 3.1, Mistral Nemo, Firefunction v2 and Command-R+.
- **28 May 2025**: [streaming tool calls](https://ollama.com/blog/streaming-tool), with a parser that reads each model's template for the start of a tool call instead of waiting for complete JSON.
- **27 October 2026**: release [v0.40.12](https://github.com/ollama/ollama/releases/tag/v0.40.12) fixed tool-only assistant turns from Kimi CLI.
- **9 November 2026**: [v0.40.16](https://github.com/ollama/ollama/releases/tag/v0.40.16), the latest release when this page was checked, and still the latest on 20 November. A pre-release of the next version, v0.40.17, followed on 10 November ([release list](https://github.com/ollama/ollama/releases)).

Neither blog post names the Ollama version that introduced the feature.

## Not tested here

This page has no "tested on" table. Nothing was installed or run for it. A tested row would record the Ollama version, the model and tag, the operating system, the exact commands and their output, the date, and who ran it.

Related on the Shelf: [Tools: Ollama](/shelf/tools/ollama/), [Ollama launch](/shelf/local-experiments/ollama-launch-integrations/) and [Local LLM references](/shelf/shared-resources/local-llm-references/).
