# Implementation Plan: Pi Learning Guide

## Overview

A static interactive tutorial website teaching pi from zero to hero. Built with Astro (static site generator) + MDX (markdown with components) + vanilla JS for interactivity. No server, no database — all client-side.

**Location:** `docs/superpowers/`
**Output:** Static HTML (deployable to GitHub Pages, Netlify, or served locally)

---

## Phase 1: Project Scaffolding

### 1.1 Initialize Astro project
```
docs/superpowers/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── attachments/
│       ├── animations/
│       └── diagrams/
├── src/
│   ├── layouts/
│   │   └── ChapterLayout.astro
│   ├── components/
│   │   ├── Sidebar.astro
│   │   ├── CodeSimulator.astro
│   │   ├── AnimatedSequence.astro
│   │   ├── InteractiveDiagram.astro
│   │   └── Callout.astro
│   ├── pages/
│   │   └── [...pages].astro
│   └── styles/
│       └── global.css
└── chapters/ (MDX content)
```

### 1.2 Core dependencies
```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/mdx": "^4.0.0"
  }
}
```

### 1.3 Global styles
- CSS variables for color palette (from spec)
- JetBrains Mono for code, Inter for prose
- Dark theme base

---

## Phase 2: Layout Components

### 2.1 Sidebar Navigation
- Collapsible module headers
- Chapter list with completion state
- Active chapter highlighting
- Mobile hamburger menu

**Files:** `Sidebar.astro`

### 2.2 Chapter Layout
- Header (module #, chapter #, title, reading time)
- Content slot (MDX content)
- Previous/Next navigation
- Progress indicator

**Files:** `ChapterLayout.astro`

### 2.3 Callout Component
- Variants: info, warning, tip, error
- Icon + title + body
- Background tint per variant

**Files:** `Callout.astro`

---

## Phase 3: Interactive Components

### 3.1 pi Simulator (CodeSimulator.astro)
- Renders pre-written interaction scripts
- Play/pause/step controls
- Realistic tool call rendering

**Script format (JSON):**
```json
{
  "turns": [
    {
      "role": "user",
      "content": "List files in src/"
    },
    {
      "role": "assistant",
      "thinking": "The user wants...",
      "toolCalls": [
        { "name": "bash", "args": { "command": "ls src/" } }
      ]
    }
  ]
}
```

**Features:**
- Typing effect for text deltas
- Collapsible thinking blocks
- Tool call + result rendering
- Step-by-step mode (advance one turn)

**Files:** `CodeSimulator.astro`, `src/assets/pi-simulator.js`

### 3.2 Animated Sequence
- Lottie JSON playback OR CSS keyframe animations
- Play/pause/replay controls
- Step indicator (1/5, 2/5...)
- Speed control (0.5x, 1x, 2x)

**Animation types:**
- "Prompt to response" (what happens when you type)
- "Tool execution flow" (LLM → tool → result)
- "Session branching" (tree visualization)
- "Event bus pub/sub" (emit → subscribe → notify)

**Files:** `AnimatedSequence.astro`, `src/assets/animation-controller.js`

### 3.3 Interactive Diagram
- D3.js for node-based diagrams
- Mermaid for flow diagrams
- Clickable nodes with detail panel
- Hover tooltips

**Diagram types:**
- Agent team hierarchy (Orchestrator > Tech Lead > Dev Leads)
- Event bus topology
- Session tree structure
- Extension lifecycle

**Files:** `InteractiveDiagram.astro`, `src/assets/diagram-renderer.js`

---

## Phase 4: Content (Chapters)

### Module 1: Getting Started

| Chapter | File | Content |
|---------|------|---------|
| 0: What is pi? | `chapters/module-1/0-what-is-pi.mdx` | Philosophy, comparison, when to use |
| 1: Install | `chapters/module-1/1-install.mdx` | npm, API key, first launch |
| 2: Hello, pi! | `chapters/module-1/2-hello-pi.mdx` | First prompt, understanding tool calls |

**Simulator script for Ch2:**
- User: "Hello, what can you do?"
- Assistant: thinking block
- Assistant: text response about tools
- (No tool calls, just introductory)

---

### Module 2: Core Workflow

| Chapter | File | Content |
|---------|------|---------|
| 3: Reading files | `chapters/module-2/3-reading-files.mdx` | @-references, file paths |
| 4: Writing & editing | `chapters/module-2/4-writing-editing.mdx` | edit vs write, diffs |
| 5: Bash commands | `chapters/module-2/5-bash.mdx` | !! vs !, execution |
| 6: Sessions | `chapters/module-2/6-sessions.mdx` | JSONL, tree structure |
| 7: Branching | `chapters/module-2/7-branching.mdx` | /tree, /fork, /clone |

**Simulator script for Ch3 (read):**
- User: "@README.md What's this project about?"
- Assistant: "Based on the README..."
- Tool: read README.md
- Result: file contents displayed

**Simulator script for Ch5 (bash):**
- User: "!ls -la"
- Assistant: (no thinking, direct execution)
- Tool: bash ls -la
- Result: directory listing

---

### Module 3: Extending pi

| Chapter | File | Content |
|---------|------|---------|
| 8: Extensions intro | `chapters/module-3/8-extensions-intro.mdx` | Architecture, lifecycle |
| 9: First custom tool | `chapters/module-3/9-first-tool.mdx` | defineTool, parameters |
| 10: Commands & events | `chapters/module-3/10-commands-events.mdx` | registerCommand, on() |
| 11: Event bus intro | `chapters/module-3/11-event-bus-intro.mdx` | pi.events, basics |

**Simulator for Ch9 (custom tool):**
- User: "Use the greet tool to say hello to Alice"
- Assistant: thinking
- Tool: greet { name: "Alice" }
- Result: "Hello, Alice!"

---

### Module A: Agent Teams

| Chapter | File | Content |
|---------|------|---------|
| A1: Overview | `chapters/module-a/1-agents-overview.mdx` | Agent concept, team pattern |
| A2: Single agent | `chapters/module-a/2-single-agent.mdx` | Using one subagent |
| A3: Parallel | `chapters/module-a/3-parallel-agents.mdx` | Multiple agents, concurrent |
| A4: Chain workflow | `chapters/module-a/4-chain-workflow.mdx` | Sequential with {previous} |
| A5: Tech lead pattern | `chapters/module-a/5-tech-lead-pattern.mdx` | Orchestrator > Tech Lead > Dev Leads |
| A6: Comparing results | `chapters/module-a/6-comparing-results.mdx` | Side-by-side analysis |

**Interactive diagram for A5:**
- Node: Orchestrator (click to expand)
- Node: Tech Lead (click to expand)
- Nodes: Dev Lead A, Dev Lead B (click to expand)
- Nodes: Dev Senior A, Dev Senior B
- Edges showing communication flow

**Animated sequence for A5:**
1. User gives task to Orchestrator
2. Orchestrator delegates to Tech Lead
3. Tech Lead spawns Dev Lead A and B in parallel
4. Dev Leads spawn Dev Seniors in parallel
5. Results bubble up, Tech Lead compares
6. Tech Lead reports to Orchestrator
7. Orchestrator synthesizes final answer

---

### Module B: Persistent Memory

| Chapter | File | Content |
|---------|------|---------|
| B1: Memory intro | `chapters/module-b/1-memory-intro.mdx` | What is persistent memory? |
| B2: Compaction | `chapters/module-b/2-compaction.mdx` | How context compaction works |
| B3: Strategies | `chapters/module-b/3-strategies.mdx` | When to compact, best practices |

**Animated sequence for B2:**
1. Long conversation with many turns
2. Context near limit
3. Compaction triggered
4. Older messages summarized
5. Summary inserted as compact entry
6. Recent messages preserved
7. Context now under limit

---

### Module C: Event Bus Deep Dive

| Chapter | File | Content |
|---------|------|---------|
| C1: Event bus deep | `chapters/module-c/1-event-bus-deep.mdx` | Full event bus API |
| C2: Pub/sub patterns | `chapters/module-c/2-pubsub-patterns.mdx` | Emit, on, once patterns |
| C3: Real-time coordination | `chapters/module-c/3-real-time.mdx` | Multi-extension coordination |

**Interactive diagram for C2:**
- Node: Extension A (click to see emit code)
- Node: Event Bus (central, click to see listeners)
- Node: Extension B (click to see subscribe code)
- Click "Emit" button to trigger animation

---

## Phase 5: Animations & Diagrams

### 5.1 Animation Files
Store in `public/attachments/animations/`:

| Animation | Type | Description |
|-----------|------|-------------|
| prompt-flow.json | Lottie | User prompt → LLM → Response |
| tool-execution.json | Lottie | Tool call → execute → result |
| session-branching.json | Lottie | Tree splitting visualization |
| agent-communication.json | Lottie | Multi-agent message passing |

### 5.2 Diagram Definitions
Store as Mermaid or D3 config in each chapter:

- Agent team: D3 tree layout
- Event bus: D3 force-directed graph
- Session tree: D3 dendrogram
- Extension lifecycle: Mermaid flowchart

---

## Phase 6: Landing Page & Summary

### 6.1 Landing page (index.astro)
- Hero section: "Learn pi from Zero to Hero"
- Module cards with chapter counts
- "Start Learning" CTA → Chapter 0
- Visual preview of interactive features

### 6.2 SUMMARY.md
- Auto-generated or manually maintained
- Full chapter listing with descriptions

---

## Implementation Order

```
Phase 1: Scaffold
  └─ Project setup, dependencies, global styles

Phase 2: Layout Components
  ├─ Sidebar.astro
  ├─ ChapterLayout.astro
  └─ Callout.astro

Phase 3: Interactive Components
  ├─ CodeSimulator.astro + pi-simulator.js
  ├─ AnimatedSequence.astro + animation-controller.js
  └─ InteractiveDiagram.astro + diagram-renderer.js

Phase 4: Content (proceed chapter by chapter)
  ├─ Module 1 (3 chapters)
  ├─ Module 2 (5 chapters)
  ├─ Module 3 (4 chapters)
  ├─ Module A (6 chapters)
  ├─ Module B (3 chapters)
  └─ Module C (3 chapters)

Phase 5: Animations & Diagrams
  └─ Create animation files + diagram configs

Phase 6: Landing Page
  └─ index.astro + SUMMARY.md
```

---

## Verification

- Site builds with `npm run build`
- All chapters render without errors
- Simulator plays through example interactions
- Diagrams are clickable and show details
- Animations play with controls working
- Sidebar navigation works (expand/collapse/click)
- Mobile responsive (hamburger menu)

---

## Out of Scope (for later)

- User progress tracking (localStorage)
- Video content
- Discussion/comments
- Real pi integration ("Try in terminal" section)
- Server-side execution

---

## Status

**Ready for implementation** — awaiting approval to begin coding
