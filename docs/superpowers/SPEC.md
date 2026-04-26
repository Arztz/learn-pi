# Pi Learning Guide — Interactive Tutorial Site

## Project Overview

**Name:** pi-learning-guide
**Type:** Interactive tutorial website
**Location:** `docs/superpowers/` in this repository
**Goal:** Teach users to master pi from zero to hero through story-driven chapters and in-browser interactive examples

---

## Concept & Vision

A browser-based learning experience that teaches pi coding agent through illustrated narratives and interactive, browser-simulated code examples. Users follow a guided journey from "Hello, pi!" through multi-agent workflows without needing server infrastructure — everything runs in the browser.

The tone is approachable yet technical: think "friendly senior dev showing you the ropes" not "dry documentation." Each chapter tells a story with a real goal (fix a bug, build a feature, set up a pipeline) while teaching underlying concepts.

---

## Learning Path

### Module 1: Getting Started (~3 chapters)
| Chapter | Title | Content |
|---------|-------|---------|
| 0 | What is pi? | Philosophy, comparison to Cursor/Gemini CLI, when to use pi |
| 1 | Install in 5 minutes | npm install, API key setup, first launch |
| 2 | Hello, pi! | Your first prompt, understanding tool calls |

### Module 2: Core Workflow (~5 chapters)
| Chapter | Title | Content |
|---------|-------|---------|
| 3 | Reading files | @-references, file paths, understanding context |
| 4 | Writing & editing | edit vs write, understanding diffs |
| 5 | Bash in pi | !! vs !, command execution, working directory |
| 6 | Sessions explained | JSONL format, tree structure, /resume |
| 7 | Branching & forks | /tree, /fork, /clone, exploring alternatives |

### Module 3: Extending pi (~4 chapters)
| Chapter | Title | Content |
|---------|-------|---------|
| 8 | What are extensions? | Extension architecture, loading, lifecycle |
| 9 | Your first custom tool | defineTool, parameters, execution |
| 10 | Commands & events | registerCommand, event handlers |
| 11 | Event bus intro | pi.events, inter-extension communication |

### Module 4: Advanced Topics (Self-contained modules)
| Module | Title | Chapters |
|--------|-------|----------|
| A | Agent Teams | Orchestrator > Tech Lead > Dev Lead A/B > Dev Senior A/B parallel pattern |
| B | Persistent Memory | Session compaction, context management, memory strategies |
| C | Event Bus Deep Dive | pub/sub patterns, real-time coordination, advanced use cases |

---

## Visual Design Language

### Aesthetic
- **Style:** Terminal-inspired but approachable — dark theme with warm accent colors
- **Feel:** Like reading a well-designed tech blog, not staring at docs
- **Typography:** Monospace for code, readable sans-serif for prose (JetBrains Mono + Inter)

### Color Palette
```
Background:    #0f0f23 (deep navy)
Surface:       #1a1a2e (card backgrounds)
Border:        #2d2d44 (subtle dividers)
Text Primary:  #e8e8f0 (off-white)
Text Muted:    #8888a0 (secondary text)
Accent:        #7c3aed (violet — primary actions)
Success:       #22c55e (green — tool success)
Warning:       #f59e0b (amber — caution)
Error:         #ef4444 (red — errors)
Tool Call:     #3b82f6 (blue — LLM tool invocations)
Thinking:      #ec4899 (pink — thinking blocks)
```

### Layout
- **Navigation:** Sidebar with collapsible module/chapter tree
- **Content area:** Single-column with max-width 800px for readability
- **Code blocks:** Full-width with syntax highlighting, line numbers
- **Diagrams:** Full-width within content flow

---

## Interactive Features

### 1. Animated Sequences (C)
Step-by-step animations showing:
- What happens when you type a prompt and press Enter
- How the LLM decides which tool to call
- How sessions are stored and retrieved
- How branching creates new paths in the tree

Each animation is a narrative sequence (not just a diagram) with:
- Numbered steps that play sequentially
- Auto-play toggle
- "Replay" button
- Speed control (0.5x, 1x, 2x)

### 2. Interactive Diagrams (B)
Clickable nodes showing:
- Agent team hierarchy (click a role to see its prompt/tools)
- Event bus flow (click to emit/subscribe)
- Session tree structure (click nodes to expand)
- Extension lifecycle (click phases for details)

Hover states show:
- Tooltips with key concepts
- Parameter hints
- Related chapter links

### 3. Browser-Simulated pi Examples (B)
Mock pi interactions rendered in-browser:
- Simulates realistic tool call output
- Shows thinking blocks (collapsible)
- Displays message flow between user/assistant
- Supports "step forward" through multi-turn conversations

**What it simulates:**
- Text deltas (character-by-character typing effect)
- Tool call rendering (read, write, bash, edit blocks)
- Thinking blocks (expandable)
- Error states and retry scenarios
- Session tree visualization

**What it does NOT simulate:**
- Actual LLM responses (always uses pre-written examples)
- Real file system operations
- Network calls

---

## Architecture

```
docs/superpowers/
├── SPEC.md                          # This file
├── index.md                         # Landing page
├── SUMMARY.md                       # Chapter listing
├── .attachments/                    # Images, diagrams
│   ├── animations/                  # Lottie/JSON animation files
│   └── diagrams/                    # SVG diagram sources
├── chapters/
│   ├── module-1/                    # Getting Started
│   │   ├── 0-what-is-pi.md
│   │   ├── 1-install.md
│   │   └── 2-hello-pi.md
│   ├── module-2/                    # Core Workflow
│   │   ├── 3-reading-files.md
│   │   ├── 4-writing-editing.md
│   │   ├── 5-bash.md
│   │   ├── 6-sessions.md
│   │   └── 7-branching.md
│   ├── module-3/                    # Extending pi
│   │   ├── 8-extensions-intro.md
│   │   ├── 9-first-tool.md
│   │   ├── 10-commands-events.md
│   │   └── 11-event-bus-intro.md
│   ├── module-a/                    # Agent Teams
│   │   ├── agents-overview.md
│   │   ├── single-agent.md
│   │   ├── parallel-agents.md
│   │   ├── chain-workflow.md
│   │   ├── tech-lead-pattern.md
│   │   └── comparing-results.md
│   ├── module-b/                    # Persistent Memory
│   │   ├── memory-intro.md
│   │   ├── compaction.md
│   │   └── strategies.md
│   └── module-c/                    # Event Bus Deep Dive
│       ├── event-bus-deep.md
│       ├── pubsub-patterns.md
│       └── real-time-coordination.md
└── assets/
    ├── pi-simulator.js              # In-browser mock
    ├── diagram-renderer.js          # D3/Mermaid wrappers
    └── animation-controller.js      # Animation playback
```

---

## Component Inventory

### 1. Chapter Page
- Header with module/chapter number, title, reading time
- Content area (markdown with embedded components)
- "Previous/Next" chapter navigation
- Progress indicator (which chapters completed)

**States:** Default, with completed checkmark

### 2. Code Block (pi Simulator)
- Syntax-highlighted code with line numbers
- "Run" button that plays through mock interaction
- Output area below with realistic pi rendering
- Step-by-step mode (advance one turn at a time)

**States:** Idle, running, completed, error (simulated)

### 3. Animated Sequence
- Canvas/container for animation
- Play/pause button, replay, speed control
- Step indicator (1/5, 2/5, ...)
- Caption text for each step

**States:** Not started, playing, paused, completed

### 4. Interactive Diagram
- SVG container (D3 or Mermaid-rendered)
- Clickable nodes with hover highlights
- Detail panel that slides in on click
- Legend/key for color coding

**States:** Default, node-selected, node-hovered, expanded

### 5. Sidebar Navigation
- Collapsible module headers
- Chapter list with completion checkmarks
- Active chapter highlighted
- Mobile: hamburger menu

**States:** Module collapsed, module expanded, chapter active, chapter completed

### 6. Inline Callout
- Info/warning/tip variants
- Icon + title + body
- Subtle background tint

**States:** Info (blue), warning (amber), tip (green), error (red)

---

## Implementation Notes

### pi Simulator Scope
The simulator is a JavaScript class that:
- Takes a pre-written interaction script (JSON)
- Renders realistic pi output in a DOM element
- Supports stepping, play, pause
- Does NOT make network calls or execute code

### Diagram Approach
- **Mermaid** for flow diagrams (session flow, event bus topology)
- **D3.js** for interactive node diagrams (agent teams, tree navigation)
- Diagrams defined in markdown as code blocks, rendered client-side

### Animation Format
- Use **Lottie** (JSON) for complex animations (agent communication)
- Use **CSS animations** for simple transitions (typing effect, fade-ins)
- Animation definitions stored in `.attachments/animations/`

### Site Generator Choice
- **Astro** with MDX — static site with markdown + interactive components
- Or **Docusaurus** — if React integration is preferred
- Output: static HTML that can be served from GitHub Pages or Netlify

---

## Out of Scope

- Server-side code execution
- Real pi installation from the site
- User accounts / progress tracking
- Discussion forums / comments
- Video content (animated sequences only)

---

## Open Questions

1. **Site hosting:** GitHub Pages? Netlify? Or just ship as downloadable HTML?
2. **Animation complexity:** Full Lottie animations or simplified CSS sequences?
3. **Chapter content:** How detailed should each chapter be? (Quick intro vs deep dive)
4. **Real pi integration:** Add a "Try in your terminal" section that generates commands?

---

## Status

**Draft** — awaiting approval to proceed with implementation plan
