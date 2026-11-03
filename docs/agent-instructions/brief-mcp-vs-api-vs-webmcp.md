# Editorial Brief: MCP vs REST API vs WebMCP

**Target Slug:** `mcp-vs-api-vs-webmcp`  
**IA Stage:** Stage 4 (Action & Authorization)  
**Role:** Companion Article  
**Hub Page:** `/systems/from-agent-intent-to-governed-execution/`  
**Target Search Query:** `mcp vs api vs webmcp` / `mcp vs rest api` / `when to use webmcp`  
**Working Title:** MCP, REST API, WebMCP: Choosing the Right Tool Boundary  
**SEO Title:** MCP vs API vs WebMCP: When Should an AI System Use Each?  
**Reading Time:** 7 minutes  
**Difficulty:** Intermediate  

---

## 1. Intent & Scope Boundary

### One Question
When an AI application needs to interact with an external capability, should it call a traditional REST API, connect through a Model Context Protocol (MCP) server, or expose tools through WebMCP?

### Direct Answer (`shortAnswer`)
REST APIs connect programs across a network using fixed endpoints and bearer credentials; they suit stable, deterministic services where authentication belongs at an API gateway. MCP connects an AI host application to local or remote resources and tools using bidirectional JSON-RPC messages; it suits desktop and development assistants that need dynamic tool discovery and interactive user approval. WebMCP exposes structured tools directly from a live webpage to an in-browser agent session within the browser sandbox; it suits in-tab browser automation and does not affect search indexing, ranking, or web crawling. Choosing between them is a question of execution boundaries and authorization, not developer convenience.

### Boundary Declaration
- **`is`**: An architectural comparison of three tool integration boundaries for language models: network APIs, protocol servers, and browser DOM tools.
- **`isNot`**: A tutorial on implementing an MCP server, an endorsement of any commercial platform, or a guide to WebMCP origin trials.
- **`mattersWhen`**: An engineering team is connecting an AI assistant to existing business systems or evaluating whether browser agent tooling is needed.

---

## 2. Provenance & Primary Source Documentation

### Declared Sources
1. `mcp-spec`: Model Context Protocol Specification, version 2026-07-28 (`https://modelcontextprotocol.io/specification/2026-07-28`)
2. `rfc-9110`: Fielding et al., HTTP Semantics, RFC 9110, June 2022 (`https://www.rfc-editor.org/rfc/rfc9110`)
3. `webmcp-spec`: Chrome for Developers, Web Model Context Protocol (WebMCP) Browser Agent Interface (`https://developer.chrome.com/docs/extensions/`)
4. `dax-mcp`: DAX repository README and policy crate at pinned commit SHA `fe911e57415dcfa9d101bd2584b28d2ea3c84694`

### Grounded Claims
- **Claim 1 (External - `rfc-9110`):** REST APIs enforce access control at the network perimeter via authenticated HTTP requests, independent of the client running the model.
- **Claim 2 (External - `mcp-spec`):** MCP standardizes dynamic tool, resource, and prompt discovery over JSON-RPC, leaving execution authorization to the host application.
- **Claim 3 (External - `webmcp-spec`):** WebMCP runs within the browser origin sandbox to give in-tab browser agents direct DOM tool access, without exposing backend system interfaces or affecting search engine indexing.
- **Claim 4 (Repository - `dax-mcp`):** DAX evaluates proposed tool requests against deterministic local policy crates before passing calls to an MCP client.
- **Claim 5 (Synthesis):** The choice between an API, MCP, and WebMCP is determined by where the trust boundary sits: at the network gateway, in the desktop host application, or inside the browser tab.

---

## 3. Core Comparison: Boundaries and Decision Criteria

| Dimension | REST API | Model Context Protocol (MCP) | WebMCP |
|---|---|---|---|
| **Execution Environment** | Remote server across a network | Local desktop process or remote server via stdio/SSE | In-tab browser page inside client DOM |
| **Message Protocol** | HTTP/1.1 or HTTP/2 (GET, POST, etc.) | JSON-RPC 2.0 | Browser event loop / DOM messaging |
| **Discovery Mechanism** | Static OpenAPI / Swagger schemas | Dynamic runtime discovery (`tools/list`, `resources/list`) | In-page tool declaration manifest |
| **Trust & Auth Boundary** | Network API gateway (OAuth, Bearer token, mTLS) | Host application runtime (User confirmation, local policies) | Browser tab origin sandbox (Same-origin policy, user prompt) |
| **Statefulness** | Typically stateless per request | Stateful session between host and server | Bound to the active browser tab lifecycle |
| **Search Engine Impact** | None | None | **None (Zero SEO, GEO, or indexing effect)** |
| **Primary Use Case** | Cross-service enterprise backend integration | Coding agents, IDEs, and desktop assistant tooling | In-browser autonomous task execution on web pages |

---

## 4. Complementary Architecture (How They Work Together)

These three integration patterns are not mutually exclusive. In a mature AI system architecture, they operate together across different system layers:

1. **Host Layer (MCP):** A developer's local coding assistant connects to local file repositories and tools using MCP over stdio.
2. **Backend Services (REST APIs):** The MCP server does not re-invent database or billing plumbing; it makes authenticated HTTPS REST requests to backend services behind an enterprise API gateway.
3. **Browser Interface (WebMCP):** When the assistant needs to inspect an active web application or assist a user inside a web dashboard, it interacts with WebMCP tools registered in the browser tab, respecting the browser's own session state and security bounds.

Each interface protects a different boundary. Conflating them leads either to exposing raw backend tokens to local models, or overcomplicating simple web tasks with desktop protocol servers.

---

## 5. Optional Creative Concepts (For Review Only — No Code Implemented)

> [!NOTE]
> *The following visual and motion proposals are conceptual specifications for owner review. No new SVG files, visual components, or animation scripts have been created in the codebase.*

### Concept A: Cover Emblem & Quip
- **Deadpan Metaphor:** A standard household power strip with three mismatched plugs: a grounded 3-prong wall plug (REST API), an industrial twist-lock coupler (MCP), and an optical audio connector with an active light beam (WebMCP).
- **Emblem Box:** 500 $\times$ 540 viewBox in standard paper and ink palette.
- **Cover Quip:** *"Three plugs for three different sockets, none of which decides what is allowed to turn on."*

### Concept B: Cover Film Animation (GSAP Timeline)
- **Shot 1 (Wide):** The power strip rests on a desk. A drawn hand attempts to plug in the industrial coupler (`.fx-mcp`).
- **Shot 2 (Close-up):** The coupler snaps into place, while the optical connector (`.fx-webmcp`) pulses inside a miniature browser window wireframe.
- **Shot 3 (Wide):** Camera pulls back. Dialogue caption reveals: *"The connection is standard. The permission is still yours."*

### Concept C: Interactive Scroll Scene (`three-interfaces-three-boundaries`)
- **Structure:** 4-step scroll scene built on `Plate`, `Lit`, and `Page` primitives:
  - Step 1: Network perimeter (REST API).
  - Step 2: Host process boundary (MCP).
  - Step 3: Browser DOM sandbox (WebMCP).
  - Step 4: The shared invariant (Execution authority must live in software outside the model).
- **Motion Rule:** Step-based transitions (`opacity: 0.3s`), zero continuous motion, full reduced-motion compliance.
