# Detailed Task List: Pi Learning Guide

## Project Setup

### Task 1.1: Initialize Astro Project
- [ ] Create `docs/superpowers/package.json` with Astro 5.x + @astrojs/mdx
- [ ] Create `astro.config.mjs` with MDX integration
- [ ] Create `tsconfig.json` for TypeScript
- [ ] Create `.gitignore` (node_modules, dist, .astro)
- [ ] Run `npm install` to install dependencies
- [ ] Verify project scaffold with `npm run dev`

### Task 1.2: Create Directory Structure
- [ ] Create `public/attachments/animations/` directory
- [ ] Create `public/attachments/diagrams/` directory
- [ ] Create `src/layouts/` directory
- [ ] Create `src/components/` directory
- [ ] Create `src/pages/` directory
- [ ] Create `src/styles/` directory
- [ ] Create `chapters/module-1/` through `chapters/module-c/` directories
- [ ] Create `chapters/module-a/` directory

### Task 1.3: Global Styles
- [ ] Create `src/styles/global.css`
- [ ] Define CSS variables for color palette (background, surface, border, text, accent, success, warning, error, toolCall, thinking)
- [ ] Import JetBrains Mono and Inter fonts
- [ ] Set dark theme base styles (body, html)
- [ ] Style scrollbar for dark theme
- [ ] Add responsive breakpoints (mobile 768px, tablet 1024px)

---

## Layout Components

### Task 2.1: Sidebar Component
- [ ] Create `src/components/Sidebar.astro`
- [ ] Define module structure (Module 1-3, A, B, C) with chapter lists
- [ ] Implement collapsible module headers (click to expand/collapse)
- [ ] Add chapter links with active state highlighting
- [ ] Add completion checkmark icons (CSS-based, state from localStorage or default)
- [ ] Implement mobile hamburger menu toggle
- [ ] Style sidebar for desktop (fixed left sidebar)
- [ ] Style sidebar for mobile (slide-out drawer)

### Task 2.2: Chapter Layout
- [ ] Create `src/layouts/ChapterLayout.astro`
- [ ] Add header section (module number badge, chapter title, reading time estimate)
- [ ] Add content slot for MDX content
- [ ] Add previous/next chapter navigation links
- [ ] Add progress indicator (current chapter position in module)
- [ ] Integrate Sidebar component
- [ ] Add footer with site credits

### Task 2.3: Callout Component
- [ ] Create `src/components/Callout.astro`
- [ ] Define props: variant (info, warning, tip, error), title, children
- [ ] Add icon per variant (info ℹ, warning ⚠, tip 💡, error ✕)
- [ ] Style each variant with distinct background tint and border
- [ ] Support markdown content in children slot

### Task 2.4: Landing Page
- [ ] Create `src/pages/index.astro`
- [ ] Design hero section with title "Learn pi from Zero to Hero"
- [ ] Add subtitle describing the learning path
- [ ] Create module cards (4 cards: Getting Started, Core Workflow, Extending pi, Advanced Topics)
- [ ] Add "Start Learning" button linking to Chapter 0
- [ ] Add preview section showing interactive features (screenshot or animated preview)
- [ ] Style hero and cards for visual appeal

---

## Interactive Components

### Task 3.1: pi Simulator Core
- [ ] Create `src/assets/pi-simulator.js`
- [ ] Define Simulator class with constructor(element, script)
- [ ] Implement `play()` method (auto-play through turns)
- [ ] Implement `pause()` method
- [ ] Implement `step()` method (advance one turn)
- [ ] Implement `reset()` method
- [ ] Implement `setSpeed(ratio)` method (0.5x, 1x, 2x)
- [ ] Define turn rendering (user message, assistant thinking, tool calls, results)
- [ ] Implement typing effect for text deltas (character by character)
- [ ] Implement collapsible thinking blocks
- [ ] Implement tool call block rendering (styled differently than text)
- [ ] Implement tool result rendering

### Task 3.2: Code Simulator Astro Component
- [ ] Create `src/components/CodeSimulator.astro`
- [ ] Define props: script (JSON string or object), title, showControls (boolean)
- [ ] Render code block header with title and language badge
- [ ] Initialize pi-simulator.js with script
- [ ] Add control bar (Play/Pause, Step, Reset, Speed dropdown)
- [ ] Add output container for rendered interaction
- [ ] Add "Copy script" button
- [ ] Style code block with syntax highlighting colors
- [ ] Add copy button functionality

### Task 3.3: Animation Controller
- [ ] Create `src/assets/animation-controller.js`
- [ ] Define AnimationController class
- [ ] Support loading Lottie JSON animations
- [ ] Support CSS keyframe animations
- [ ] Implement `play()` / `pause()` / `reset()` / `seek(step)` methods
- [ ] Implement `setSpeed(ratio)` method
- [ ] Implement step indicator update
- [ ] Implement autoplay option
- [ ] Emit events on step change (for UI sync)

### Task 3.4: Animated Sequence Component
- [ ] Create `src/components/AnimatedSequence.astro`
- [ ] Define props: type (lottie|css), src (animation data URL or config), steps (array of {caption, animationFrame})
- [ ] Add canvas/container for animation
- [ ] Add control bar (Play/Pause, Replay, Speed)
- [ ] Add step indicator (current/total)
- [ ] Add caption display area
- [ ] Load animation via AnimationController
- [ ] Sync step indicator with animation playback
- [ ] Style for dark theme, full-width appearance

### Task 3.5: Diagram Renderer
- [ ] Create `src/assets/diagram-renderer.js`
- [ ] Define DiagramRenderer class
- [ ] Implement D3-based node diagram rendering
- [ ] Implement Mermaid-based flow diagram rendering
- [ ] Implement `load(type, config)` method
- [ ] Implement node click handlers (show detail panel)
- [ ] Implement hover tooltip display
- [ ] Implement zoom/pan (optional, for complex diagrams)
- [ ] Implement layout algorithms (tree, force-directed, hierarchical)

### Task 3.6: Interactive Diagram Component
- [ ] Create `src/components/InteractiveDiagram.astro`
- [ ] Define props: type (d3|mermaid), config (object or URL), title
- [ ] Add title header
- [ ] Initialize DiagramRenderer with config
- [ ] Add detail panel (hidden by default, slides in on node click)
- [ ] Add legend/key for diagram colors
- [ ] Add zoom controls (if applicable)
- [ ] Style container with border, dark theme
- [ ] Ensure responsive behavior (scale down on mobile)

### Task 3.7: Simulator Scripts for Module 1
- [ ] Create `chapters/module-1/2-hello-pi/script.json` (intro simulator)
- [ ] Define 3-4 turns: user greeting, assistant intro, tool-less response

### Task 3.8: Simulator Scripts for Module 2
- [ ] Create `chapters/module-2/3-reading-files/script.json` (@ reference example)
- [ ] Create `chapters/module-2/4-writing-editing/script.json` (edit vs write)
- [ ] Create `chapters/module-2/5-bash/script.json` (bash commands)
- [ ] Create `chapters/module-2/6-sessions/script.json` (session context example)
- [ ] Create `chapters/module-2/7-branching/script.json` (branch/fork example)

### Task 3.9: Simulator Scripts for Module 3
- [ ] Create `chapters/module-3/8-extensions-intro/script.json` (extension loaded notification)
- [ ] Create `chapters/module-3/9-first-tool/script.json` (custom greet tool)
- [ ] Create `chapters/module-3/10-commands-events/script.json` (command registration)
- [ ] Create `chapters/module-3/11-event-bus-intro/script.json` (event emit/listen)

### Task 3.10: Simulator Scripts for Module A
- [ ] Create `chapters/module-a/2-single-agent/script.json` (one agent, one task)
- [ ] Create `chapters/module-a/3-parallel-agents/script.json` (two scouts parallel)
- [ ] Create `chapters/module-a/4-chain-workflow/script.json` (scout → planner → worker)
- [ ] Create `chapters/module-a/5-tech-lead-pattern/script.json` (orchestrator chain)
- [ ] Create `chapters/module-a/6-comparing-results/script.json` (Dev Lead A vs B comparison)

### Task 3.11: Simulator Scripts for Module B
- [ ] Create `chapters/module-b/2-compaction/script.json` (compaction triggered)
- [ ] Create `chapters/module-b/3-strategies/script.json` (context management tips)

### Task 3.12: Simulator Scripts for Module C
- [ ] Create `chapters/module-c/2-pubsub-patterns/script.json` (emit/on/once examples)
- [ ] Create `chapters/module-c/3-real-time/script.json` (multi-extension coordination)

---

## Chapter Content

### Task 4.1: Module 1 Chapters
- [ ] Write `chapters/module-1/0-what-is-pi.mdx`
  - What is pi philosophy
  - Comparison to Cursor/Gemini CLI
  - When to use pi
  - Add intro Callout
- [ ] Write `chapters/module-1/1-install.mdx`
  - npm install command
  - API key setup (ANTHROPIC_API_KEY)
  - First launch instructions
  - /login command explanation
  - Add terminal screenshot/animation
- [ ] Write `chapters/module-1/2-hello-pi.mdx`
  - First prompt example
  - Understanding tool calls (visual explanation)
  - Include CodeSimulator with hello script
  - "Try it yourself" section

### Task 4.2: Module 2 Chapters
- [ ] Write `chapters/module-2/3-reading-files.mdx`
  - @-references syntax
  - File path completion
  - Include CodeSimulator with read script
- [ ] Write `chapters/module-2/4-writing-editing.mdx`
  - edit tool vs write tool
  - When to use each
  - Diff visualization
- [ ] Write `chapters/module-2/5-bash.mdx`
  - ! vs !! syntax
  - Working directory
  - Include CodeSimulator with bash script
- [ ] Write `chapters/module-2/6-sessions.mdx`
  - JSONL format explanation
  - Tree structure diagram (InteractiveDiagram)
  - /resume command
- [ ] Write `chapters/module-2/7-branching.mdx`
  - /tree command
  - /fork command
  - /clone command
  - Include session tree animation

### Task 4.3: Module 3 Chapters
- [ ] Write `chapters/module-3/8-extensions-intro.mdx`
  - Extension architecture diagram
  - Extension lifecycle (InteractiveDiagram)
  - Loading locations (~/.pi/agent/extensions vs .pi/extensions)
- [ ] Write `chapters/module-3/9-first-tool.mdx`
  - defineTool syntax
  - Parameters with Type.Object
  - Execution function
  - Include CodeSimulator with greet tool example
  - Full code example
- [ ] Write `chapters/module-3/10-commands-events.mdx`
  - registerCommand syntax
  - Event handlers (pi.on)
  - Common events list
  - Include CodeSimulator with command example
- [ ] Write `chapters/module-3/11-event-bus-intro.mdx`
  - pi.events.emit() syntax
  - pi.events.on() syntax
  - Example extension communication
  - Include CodeSimulator with event bus example

### Task 4.4: Module A Chapters (Agent Teams)
- [ ] Write `chapters/module-a/1-agents-overview.mdx`
  - What are agents in pi
  - Agent definition file format
  - Agent discovery locations
- [ ] Write `chapters/module-a/2-single-agent.mdx`
  - subagent tool syntax
  - Single mode: { agent, task }
  - Include CodeSimulator with single agent script
- [ ] Write `chapters/module-a/3-parallel-agents.mdx`
  - Parallel mode: { tasks: [...] }
  - Streaming output
  - Include CodeSimulator with parallel script
- [ ] Write `chapters/module-a/4-chain-workflow.mdx`
  - Chain mode: { chain: [...] }
  - {previous} placeholder
  - Include CodeSimulator with chain script
- [ ] Write `chapters/module-a/5-tech-lead-pattern.mdx`
  - Architecture diagram (InteractiveDiagram): Orchestrator > Tech Lead > Dev Leads > Dev Seniors
  - Step-by-step animation
  - Use case explanation
  - Include CodeSimulator with tech lead script
- [ ] Write `chapters/module-a/6-comparing-results.mdx`
  - Dev Lead A vs Dev Lead B comparison
  - How to analyze differences
  - Best practices

### Task 4.5: Module B Chapters (Persistent Memory)
- [ ] Write `chapters/module-b/1-memory-intro.mdx`
  - What is persistent memory in pi
  - Why it matters for long sessions
- [ ] Write `chapters/module-b/2-compaction.mdx`
  - How compaction works (AnimatedSequence)
  - CompactionEntry format
  - When compaction triggers
  - Include compaction animation
- [ ] Write `chapters/module-b/3-strategies.mdx`
  - When to compact manually
  - Best practices
  - Custom compaction extensions

### Task 4.6: Module C Chapters (Event Bus Deep Dive)
- [ ] Write `chapters/module-c/1-event-bus-deep.mdx`
  - Full pi.events API
  - Event types reference
- [ ] Write `chapters/module-c/2-pubsub-patterns.mdx`
  - emit(), on(), once(), off()
  - Pattern examples
  - Include CodeSimulator with patterns
  - Include InteractiveDiagram (event bus topology)
- [ ] Write `chapters/module-c/3-real-time.mdx`
  - Multi-extension coordination
  - Use cases (progress tracking, status updates)
  - Include CodeSimulator with coordination example

---

## Animations & Diagrams

### Task 5.1: Core Animations (CSS-based)
- [ ] Create `prompt-flow` CSS animation (prompt → LLM → response)
- [ ] Create `tool-execution` CSS animation (tool call → result)
- [ ] Create `typing-effect` CSS animation (character by character)

### Task 5.2: Lottie Animations
- [ ] Create `session-branching.json` (Lottie format) - tree splitting
- [ ] Create `agent-communication.json` (Lottie format) - multi-agent messaging

### Task 5.3: Diagram Configs
- [ ] Create agent team hierarchy D3 config (Orchestrator > Tech Lead > Dev Leads)
- [ ] Create event bus topology D3 config (Extensions + central bus)
- [ ] Create session tree D3 config (dendrogram layout)
- [ ] Create extension lifecycle Mermaid config (load → register → events)
- [ ] Create session JSONL format Mermaid config (entry types)

### Task 5.4: Chapter-Specific Diagrams
- [ ] Add session tree diagram to Chapter 6 (sessions)
- [ ] Add extension lifecycle diagram to Chapter 8
- [ ] Add agent team diagram to Chapter A5
- [ ] Add event bus diagram to Chapter C2

---

## Landing Page & Summary

### Task 6.1: Landing Page Polish
- [ ] Add chapter preview thumbnails (placeholder images)
- [ ] Add interactive preview section (static mockup of simulator)
- [ ] Add SEO meta tags (title, description, og:image)
- [ ] Add favicon

### Task 6.2: SUMMARY.md
- [ ] Create `docs/superpowers/SUMMARY.md`
- [ ] List all modules with chapter titles
- [ ] Add estimated reading time per chapter
- [ ] Add brief description per module

### Task 6.3: Navigation Integration
- [ ] Verify all chapter links in Sidebar are correct
- [ ] Verify previous/next navigation works
- [ ] Verify landing page links to Chapter 0
- [ ] Add breadcrumb navigation to chapter pages

---

## Testing & Verification

### Task 7.1: Build Verification
- [ ] Run `npm run build` succeeds without errors
- [ ] Check output in `dist/` folder
- [ ] Verify all pages render (check HTML output)

### Task 7.2: Interactive Feature Testing
- [ ] Test CodeSimulator plays through script
- [ ] Test CodeSimulator step mode works
- [ ] Test CodeSimulator play/pause works
- [ ] Test AnimatedSequence plays
- [ ] Test InteractiveDiagram nodes are clickable
- [ ] Test Sidebar expand/collapse works
- [ ] Test mobile hamburger menu works

### Task 7.3: Responsive Testing
- [ ] Test at mobile viewport (375px width)
- [ ] Test at tablet viewport (768px width)
- [ ] Test at desktop viewport (1024px+ width)
- [ ] Verify diagrams scale correctly

### Task 7.4: Content Review
- [ ] Proofread all chapter content
- [ ] Verify code examples are accurate
- [ ] Verify links work (internal and external)
- [ ] Verify images/diagrams load correctly

---

## Deployment Prep (Optional)

### Task 8.1: GitHub Pages Setup
- [ ] Add `.github/workflows/deploy.yml` for GitHub Pages deployment
- [ ] Configure base URL if needed
- [ ] Add README with local development instructions

### Task 8.2: Netlify Setup
- [ ] Add `netlify.toml` configuration
- [ ] Add build command (`npm run build`)
- [ ] Add publish directory (`dist`)

---

## Total Tasks: ~140

**Priority Order:**
1. Project setup (1.1-1.3)
2. Layout components (2.1-2.4)
3. Core interactive components (3.1-3.6)
4. Chapter content (4.1-4.6)
5. Animations & diagrams (5.1-5.4)
6. Simulator scripts (3.7-3.12)
7. Landing page polish (6.1-6.3)
8. Testing (7.1-7.4)
9. Deployment (8.1-8.2)
