# Pi Learning Guide — UI Design

## 1. Visual Design

### 1.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-deep` | `#0f0f23` | Page background |
| `--bg-surface` | `#1a1a2e` | Cards, panels |
| `--bg-elevated` | `#252540` | Hover states, selected |
| `--border-subtle` | `#2d2d44` | Dividers, borders |
| `--border-active` | `#3d3d5c` | Focus states |
| `--text-primary` | `#e8e8f0` | Body text |
| `--text-secondary` | `#a0a0b8` | Muted text |
| `--text-muted` | `#6b6b80` | Disabled, hints |
| `--accent-primary` | `#7c3aed` | Primary actions, links |
| `--accent-hover` | `#6d28d9` | Button hover |
| `--accent-subtle` | `#7c3aed20` | Accent backgrounds |
| `--success` | `#22c55e` | Tool success, checkmarks |
| `--success-subtle` | `#22c55e15` | Success backgrounds |
| `--warning` | `#f59e0b` | Warnings, caution |
| `--warning-subtle` | `#f59e0b15` | Warning backgrounds |
| `--error` | `#ef4444` | Errors |
| `--error-subtle` | `#ef444415` | Error backgrounds |
| `--tool-call` | `#3b82f6` | Tool call blocks |
| `--tool-call-subtle` | `#3b82f620` | Tool call backgrounds |
| `--thinking` | `#ec4899` | Thinking blocks |
| `--thinking-subtle` | `#ec489920` | Thinking backgrounds |
| `--user-msg` | `#10b981` | User messages |
| `--assistant-msg` | `#8b5cf6` | Assistant messages |

### 1.2 Typography

**Font Stack:**
```css
--font-prose: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-code: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Scale:**
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 2.5rem | 700 | 1.2 |
| H2 (Chapter Title) | 1.75rem | 600 | 1.3 |
| H3 (Section) | 1.25rem | 600 | 1.4 |
| Body | 1rem | 400 | 1.6 |
| Small | 0.875rem | 400 | 1.5 |
| Code | 0.9rem | 400 | 1.5 |

### 1.3 Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.5rem;    /* 24px */
--space-6: 2rem;      /* 32px */
--space-8: 3rem;      /* 48px */
--space-10: 4rem;     /* 64px */
```

### 1.4 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

### 1.5 Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(124, 58, 237, 0.3); /* Accent glow */
```

### 1.6 Transitions

```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

---

## 2. Layout Structure

### 2.1 Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌──────────┬──────────────────────────────────────────────────┐  │
│ │          │                                                  │  │
│ │  SIDEBAR │              CONTENT AREA                        │  │
│ │   280px  │              max-width: 800px                    │  │
│ │          │              centered                            │  │
│ │          │                                                  │  │
│ │  Module  │  ┌────────────────────────────────────────────┐   │  │
│ │  ─────── │  │ Chapter Header                            │   │  │
│ │  Chapter │  │ Module 1 • Chapter 2 • 5 min read          │   │  │
│ │  Chapter │  │                                            │   │  │
│ │  Chapter │  │ # Your First Prompt                        │   │  │
│ │          │  └────────────────────────────────────────────┘   │  │
│ │  Module  │                                                  │  │
│ │  ─────── │  ┌────────────────────────────────────────────┐   │  │
│ │  Chapter │  │                                            │   │  │
│ │  Chapter │  │ Content with code blocks, diagrams,       │   │  │
│ │          │  │ interactive elements                       │   │  │
│ │  Module  │  │                                            │   │  │
│ │  ─────── │  │ ┌────────────────────────────┐            │   │  │
│ │  Chapter │  │ │ Code Simulator              │            │   │  │
│ │  Chapter │  │ │                            │            │   │  │
│ │          │  │ │ [Play] [Step] [Reset]     │            │   │  │
│ │          │  │ │                            │            │   │  │
│ │          │  │ │ Output...                  │            │   │  │
│ │          │  │ └────────────────────────────┘            │   │  │
│ │          │  │                                            │   │  │
│ │          │  └────────────────────────────────────────────┘   │  │
│ │          │                                                  │  │
│ │          │  ┌────────────────────────────────────────────┐   │  │
│ │          │  │ ◀ Previous        Next ▶                   │   │  │
│ │          │  └────────────────────────────────────────────┘   │  │
│ └──────────┴──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Tablet Layout (768px - 1023px)

```
┌─────────────────────────────────────────────────────────────────┐
│ ☰  Pi Learning Guide                           ◀ ▶  Chapter 2/5 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Chapter Header                                         │    │
│  │ Module 1 • Chapter 2 • 5 min read                      │    │
│  │                                                         │    │
│  │ # Your First Prompt                                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Content area (full width, padding 24px)                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ [Sidebar collapses to hamburger menu on tap]            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Mobile Layout (< 768px)

```
┌────────────────────────┐
│ ☰        Chapter 2/5  │  ← Header with hamburger + breadcrumb
├────────────────────────┤
│                        │
│  Content (full width)  │
│  padding: 16px         │
│                        │
│  ┌──────────────────┐  │
│  │ Code Simulator   │  │
│  │ (compact)        │  │
│  │                  │  │
│  │ ▶ ▶  1/5         │  │
│  └──────────────────┘  │
│                        │
│  ┌──────────────────┐  │
│  │ Diagram          │  │
│  │ (scrollable)     │  │
│  └──────────────────┘  │
│                        │
│  ◀ Previous            │
│                        │
└────────────────────────┘
```

### 2.4 Sidebar Section (Desktop)

```
┌─────────────────────────────────┐
│ ◉ Pi Learning Guide             │  ← Site title
├─────────────────────────────────┤
│ ▼ Module 1: Getting Started     │  ← Collapsible module header
│   01 ✓ What is pi?              │  ← Completed + link
│   02 ✓ Install in 5 minutes     │
│   03 ● Hello, pi! ←             │  ← Active chapter (●)
│                                 │
│ ▼ Module 2: Core Workflow       │
│   04 ○ Reading files            │  ← Not started (○)
│   05 ○ Writing & editing        │
│   06 ○ Bash commands            │
│   07 ○ Sessions                 │
│   08 ○ Branching & forks        │
│                                 │
│ ▼ Module 3: Extending pi        │
│   09 ○ Extensions intro          │
│   10 ○ Your first tool          │
│   11 ○ Commands & events        │
│   12 ○ Event bus intro          │
│                                 │
│ ▶ Advanced Topics               │  ← Always expanded
│   A1 ○ Agent Teams              │
│   A2 ○ Persistent Memory         │
│   A3 ○ Event Bus Deep Dive       │
│                                 │
└─────────────────────────────────┘

Legend: ◉ = site logo  ✓ = completed  ● = active  ○ = not started
        ▼ = expanded    ▶ = collapsed
```

---

## 3. Page Components

### 3.1 Header (Mobile Only)

| Element | Appearance | Behavior |
|---------|------------|----------|
| Hamburger | `☰` icon, 24px, `--text-secondary` | Tap → open sidebar drawer |
| Title | "Chapter 2/5", `--font-prose`, 14px | Shows current position |
| Nav arrows | `◀` `▶`, 20px | Tap → previous/next chapter |
| Close | `✕` when sidebar open | Tap → close sidebar |

**Background:** `--bg-surface` with bottom border `--border-subtle`

---

### 3.2 Sidebar

| Element | Appearance | Behavior |
|---------|------------|----------|
| Site title | "Pi Learning Guide", 18px bold, `--accent-primary` | Click → landing page |
| Module header | Uppercase, 12px, `--text-muted`, letter-spacing 1px | Click → expand/collapse |
| Module arrow | `▼` expanded / `▶` collapsed | Rotate 0° / -90° on toggle |
| Chapter link | 14px, `--text-secondary` | Click → navigate |
| Active indicator | Left border 3px `--accent-primary`, bg `--accent-subtle` | — |
| Completed check | `✓` `--success`, 12px | Shows progress |
| Unvisited circle | `○`, 10px, `--text-muted` | Shows upcoming |

**States:**
- Default: dark bg `--bg-deep`
- Module hover: bg `--bg-surface`
- Chapter hover: bg `--bg-elevated`, text `--text-primary`
- Active chapter: left border accent, subtle accent bg

**Mobile behavior:**
- Hidden by default (off-canvas)
- Slide in from left on hamburger tap
- Backdrop: `--bg-deep` at 80% opacity
- Close on backdrop tap or ✕ button

---

### 3.3 Chapter Header

```
┌─────────────────────────────────────────────────────────────┐
│ Module 1: Getting Started • Chapter 2 • 5 min read         │  ← Meta line
│                                                             │
│ # Your First Prompt                                         │  ← Title
│                                                             │
│ Learn how to give your first instructions to pi and        │  ← Description
│ understand how it responds with tool calls.                 │
└─────────────────────────────────────────────────────────────┘
```

| Element | Style |
|---------|-------|
| Meta line | 12px, `--text-muted`, uppercase |
| Module name | `--accent-primary` |
| Separator | `•` `--text-muted` |
| Reading time | `--text-muted` |
| Title | H1, 2.5rem, `--text-primary` |
| Description | 16px, `--text-secondary`, max 2 lines |

**Spacing:** 24px padding bottom, border-bottom `--border-subtle`

---

### 3.4 Content Area

**Prose styling:**
- Paragraphs: 16px, `--text-primary`, line-height 1.6
- Links: `--accent-primary`, underline on hover
- Bold: 600 weight
- Lists: proper indentation, custom bullet styling
- Blockquotes: left border `--accent-primary`, bg `--accent-subtle`

**Inline code:**
- bg: `--bg-elevated`
- padding: 2px 6px
- border-radius: 4px
- font: `--font-code`, 0.9em

---

### 3.5 Code Block (Code Simulator)

```
┌─────────────────────────────────────────────────────────────┐
│ Hello, pi!                               [Copy] [▶ Run]    │  ← Header bar
├─────────────────────────────────────────────────────────────┤
│  1 │ import { createAgentSession } from "@mariozechner/    │
│  2 │   pi-coding-agent";                                    │
│  3 │                                                         │
│  4 │ const { session } = await createAgentSession();        │
│  5 │ session.subscribe((event) => {                         │
│  6 │   if (event.type === "message_update") {               │
│  7 │     process.stdout.write(event.assistantMessageEvent);  │
│  8 │   }                                                    │
│  9 │ });                                                    │
│ 10 │                                                        │
│ 11 │ await session.prompt("What files are in here?");       │
└─────────────────────────────────────────────────────────────┘
```

**Header bar:**
- bg: `--bg-surface`
- Title: left-aligned, 14px `--text-secondary`
- Language badge: "TypeScript", 11px, `--accent-subtle` bg
- Copy button: icon only, hover shows tooltip
- Run button: `--accent-primary` bg, white text

**Code area:**
- bg: `--bg-deep`
- Line numbers: `--text-muted`, right-aligned, 40px width
- Syntax highlighting: strings `--success`, keywords `--accent-primary`, comments `--text-muted`
- Horizontal scroll if needed

**States:**
- Idle: Run button enabled
- Playing: Run → Pause button, progress indicator
- Completed: Reset button appears
- Error: Red border, error message overlay

---

### 3.6 Simulator Output Area

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ > What files are in the current directory?              │ │  ← User message
│ │                                                         │ │
│ │                                                         │ │
│ │ ◐ Thinking...                                           │ │  ← Collapsible thinking
│ │   The user wants to know what files exist. I should     │ │
│ │   use the ls tool to list the directory contents.       │ │
│ │                                                         │ │
│ │                                                         │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ ℹ ls src/                                          │ │ │  ← Tool call block
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ ✓ Tool: ls                                              │ │  ← Tool result
│ │   src/                                                  │ │
│ │   README.md                                             │ │
│ │   package.json                                          │ │
│ │   tsconfig.json                                         │ │
│ │                                                         │ │
│ │ Based on the directory contents, this appears to be    │ │  ← Assistant text
│ │ a TypeScript project with standard configuration files. │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Output container:**
- bg: `--bg-surface`
- Border: `--border-subtle`
- Border-radius: `--radius-lg`
- Padding: 16px

**User message:**
- bg: `--user-msg` at 10%
- Left border: 3px `--user-msg`
- Padding: 12px
- Prefix: `>` symbol

**Thinking block:**
- bg: `--thinking-subtle`
- Left border: 3px `--thinking`
- Header: `◐ Thinking...` with rotate animation (◐ spins slowly)
- Click to expand/collapse

**Tool call block:**
- bg: `--tool-call-subtle`
- Left border: 3px `--tool-call`
- Icon: `ℹ` or terminal icon
- Monospace font for tool name + args

**Tool result:**
- Prefix: `✓` (success) or `✗` (error)
- Monospace font for output
- Dimmed initially, full opacity on expand

**Assistant text:**
- Default color `--text-primary`
- Streaming: character-by-character with cursor `▋`

**Controls (below output):**
```
[▶ Play] [⏸ Pause] [⏭ Step] [↺ Reset]  Speed: [1x ▼]
```

- Button style: ghost buttons with icon + text
- Active: filled bg
- Speed dropdown: 0.5x, 1x, 2x options

---

### 3.7 Callout Component

```
┌─────────────────────────────────────────────────────────────┐
│ 💡 Tip                                                        │
│                                                             │
│ You can use @-references to include files directly in       │
│ your prompt. Try: @README.md "What does this project do?"   │
└─────────────────────────────────────────────────────────────┘
```

**Variants:**

| Variant | Icon | Border | Background |
|---------|------|--------|------------|
| info | ℹ | `--tool-call` | `--tool-call-subtle` |
| tip | 💡 | `--success` | `--success-subtle` |
| warning | ⚠ | `--warning` | `--warning-subtle` |
| error | ✕ | `--error` | `--error-subtle` |

**Typography:**
- Title: 14px, bold, variant color
- Body: 14px, `--text-primary`

---

### 3.8 Animated Sequence

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ┌─────────────┐                          │
│                    │   User      │                          │
│                    │  types "ls" │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
│                           ▼                                 │
│                    ┌─────────────┐                          │
│                    │  pi LLM     │                          │
│                    │  receives   │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
│                           ▼                                 │
│                    ┌─────────────┐                          │
│                    │  Tool call  │                          │
│                    │  bash ls    │                          │
│                    └─────────────┘                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ◀ ● ● ○ ○   Step 1 of 5                    [▶ Play] [1x ▼]  │
└─────────────────────────────────────────────────────────────┘
```

**Visual style:**
- Nodes: rounded rectangles, `--bg-surface`, border `--border-subtle`
- Active node: `--accent-primary` border, glow effect
- Arrows: `--text-muted`, animated dash for flow direction
- Labels: inside nodes, 14px

**Animation:**
- Active node pulses (subtle scale 1.02)
- Arrow animates (dash flow toward next node)
- Fade in next node when transitioning

**Controls bar:**
- Step dots: `●` active, `○` upcoming
- Progress: "Step 1 of 5"
- Play/Pause toggle button
- Speed dropdown
- Replay button (↺)

---

### 3.9 Interactive Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ Agent Team Hierarchy                          [?] [⊕] [⊖]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ┌───────────────┐                              │
│              │ Orchestrator  │                              │
│              │    (You)       │                              │
│              └───────┬───────┘                              │
│                      │                                      │
│                      ▼                                      │
│              ┌───────────────┐                              │
│              │   Tech Lead   │                              │
│              │   (Planner)   │                              │
│              └───────┬───────┘                              │
│            ┌─────────┴─────────┐                            │
│            ▼                   ▼                            │
│     ┌─────────────┐      ┌─────────────┐                    │
│     │  Dev Lead   │      │  Dev Lead   │                    │
│     │      A      │      │      B      │                    │
│     └──────┬──────┘      └──────┬──────┘                    │
│            │                   │                            │
│            ▼                   ▼                            │
│     ┌─────────────┐      ┌─────────────┐                    │
│     │ Dev Senior  │      │ Dev Senior  │                    │
│     │      A1     │      │      B1     │                    │
│     └─────────────┘      └─────────────┘                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Legend: ● Orchestrator  ● Tech Lead  ● Dev Lead  ● Dev Senior│
└─────────────────────────────────────────────────────────────┘
```

**Node styling:**
- Default: `--bg-surface`, `--border-subtle`
- Hover: border `--accent-primary`, scale 1.02
- Selected: fill `--accent-subtle`, border `--accent-primary`, detail panel opens

**Detail panel (slides in from right):**
```
┌─────────────────────────────────┐
│ ← Back                          │  ← Click to close
├─────────────────────────────────┤
│ Orchestrator                    │  ← Selected node title
│                                 │
│ Role: Coordinates the team      │
│ Tools: All default tools        │
│ Model: claude-sonnet-4-5        │
│                                 │
│ System Prompt:                  │
│ "You are the team coordinator.  │
│  Analyze tasks and delegate to  │
│  specialized agents..."         │
│                                 │
│ [Copy Prompt]                   │
└─────────────────────────────────┘
```

**Controls:**
- `?` button: show/hide legend
- `⊕` `⊖`: zoom in/out
- Pan: drag to move viewport

**Legend:**
- Color dots for each agent role
- Positioned below diagram or in corner

---

### 3.10 Previous/Next Navigation

```
┌─────────────────────────────────────────────────────────────┐
│ ◀ Previous                              Next ▶              │
│                                                             │
│ Chapter 1: Install in 5 minutes      Chapter 3: Reading... │
└─────────────────────────────────────────────────────────────┘
```

**Style:**
- Full-width container, border-top `--border-subtle`
- Two columns: prev (left), next (right)
- Arrow + chapter title
- Hover: arrow animates (◀ → ◀◀)
- Active: full row highlight on hover

---

## 4. Component States

### 4.1 Buttons

| State | Style |
|-------|-------|
| Default | bg `--bg-surface`, border `--border-subtle`, text `--text-primary` |
| Hover | bg `--bg-elevated`, border `--border-active` |
| Active/Pressed | bg `--bg-deep`, scale 0.98 |
| Disabled | opacity 0.5, cursor not-allowed |
| Loading | spinner icon replaces text |

**Primary button:**
| State | Style |
|-------|-------|
| Default | bg `--accent-primary`, text white |
| Hover | bg `--accent-hover` |
| Active | bg `--accent-hover`, scale 0.98 |
| Disabled | opacity 0.5 |

### 4.2 Sidebar Chapter Link

| State | Style |
|-------|-------|
| Default | text `--text-secondary` |
| Hover | bg `--bg-elevated`, text `--text-primary` |
| Active | left border 3px `--accent-primary`, bg `--accent-subtle`, text `--text-primary` |
| Completed | checkmark `--success` prefix |
| Disabled | opacity 0.5 |

### 4.3 Code Simulator Controls

| Control | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Play | `▶` outline | fill accent | — | grayed |
| Pause | `⏸` filled | lighter | — | grayed |
| Step | `⏭` outline | fill | — | grayed |
| Reset | `↺` outline | fill | — | grayed |
| Speed | dropdown | highlight | — | grayed |

### 4.4 Diagram Nodes

| State | Style |
|-------|-------|
| Default | `--bg-surface`, `--border-subtle` |
| Hover | border `--accent-primary`, scale 1.02 |
| Selected | fill `--accent-subtle`, border `--accent-primary` |
| Disabled | opacity 0.3 |

---

## 5. Responsive Behavior

### 5.1 Breakpoints

| Name | Width | Layout Change |
|------|-------|---------------|
| Mobile | < 768px | Sidebar hidden, hamburger menu |
| Tablet | 768px - 1023px | Sidebar collapsible, content full width |
| Desktop | 1024px+ | Sidebar fixed 280px |

### 5.2 Mobile Adaptations

| Element | Desktop | Mobile |
|---------|---------|--------|
| Sidebar | Fixed left | Off-canvas drawer |
| Header | Hidden | Visible with hamburger |
| Code block | Full width | Horizontal scroll |
| Diagram | Full width | Scale to fit, zoom controls visible |
| Simulator controls | Inline | Stack vertically if needed |
| Chapter nav | Inline | Stack vertically |

### 5.3 Touch Interactions

| Element | Touch Behavior |
|---------|---------------|
| Sidebar module header | Tap to expand/collapse |
| Chapter link | Tap to navigate |
| Diagram node | Tap to select (no hover state) |
| Code block | Horizontal scroll with momentum |
| Animated sequence | Tap play/pause |

---

## 6. Animation Specifications

### 6.1 Sidebar Expand/Collapse

```
Duration: 200ms
Easing: ease-out
Animation: height from 0 to auto (max-height trick)
Arrow rotation: 0deg → -90deg
```

### 6.2 Page Transitions

```
Duration: 300ms
Easing: ease-in-out
Effect: Fade out current → Fade in new
```

### 6.3 Code Block Hover

```
Duration: 150ms
Effect: border-color transition, subtle shadow
```

### 6.4 Thinking Block Expand

```
Duration: 200ms
Easing: ease-out
Animation: max-height from 0 to content height
Arrow rotation: 0deg → 90deg
```

### 6.5 Diagram Node Select

```
Duration: 150ms
Effect: scale 1 → 1.02, border color change
Detail panel: slide in from right, 250ms
```

### 6.6 Simulator Typing Effect

```
Characters per second: 30 (adjustable via speed)
Cursor blink: 500ms on/off
```

### 6.7 Animated Sequence Step Transition

```
Duration: 400ms
Easing: ease-in-out
Effect: Fade out current → Fade in next
Arrow dash animation: continuous 1s loop
```

---

## 7. Accessibility

### 7.1 Color Contrast

| Element | Contrast Ratio | WCAG Level |
|---------|-----------------|------------|
| Body text | > 7:1 | AAA |
| Muted text | > 4.5:1 | AA |
| Interactive elements | > 3:1 | AA |

### 7.2 Keyboard Navigation

| Element | Key | Action |
|---------|-----|--------|
| Sidebar | Tab | Move focus between chapters |
| Sidebar | Enter | Navigate to chapter |
| Sidebar module | Enter/Space | Expand/collapse |
| Simulator | Tab | Move focus between controls |
| Simulator | Space | Play/Pause |
| Simulator | Arrow keys | Step through |
| Diagram | Tab | Move focus between nodes |
| Diagram | Enter/Space | Select node |
| Callout | Tab | Focusable if contains links |

### 7.3 ARIA

| Element | ARIA Attribute | Value |
|---------|----------------|-------|
| Sidebar | role="navigation" | — |
| Chapter list | aria-label="Chapter navigation" | — |
| Module header | aria-expanded | "true"/"false" |
| Active chapter | aria-current="page" | — |
| Simulator controls | role="toolbar" | — |
| Diagram | role="img" | aria-label describing diagram |
| Diagram node | role="button" | aria-label with node name |

### 7.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Visual Pacing

### 8.1 Chapter Page Flow

```
┌────────────────────────────────────────┐
│ Chapter Header (full width)            │  ← Big, bold entry
│                                        │
├────────────────────────────────────────┤
│                                        │
│ Introduction prose                      │  ← Breathing room, ~48px top
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ Callout: Key concept             │   │  ← Visual break
│ └──────────────────────────────────┘   │
│                                        │
│ More prose                             │  ← Back to reading
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ Code Simulator                   │   │  ← Interactive break
│ │                                  │   │
│ │ [Controls]                       │   │
│ │ [Output]                         │   │
│ └──────────────────────────────────┘   │
│                                        │
│ Even more prose                         │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ Interactive Diagram             │   │  ← Visual/interactive
│ │                                  │   │
│ │ [Nodes] [Detail Panel]           │   │
│ └──────────────────────────────────┘   │
│                                        │
│ Closing prose                          │  ← Calm ending
│                                        │
├────────────────────────────────────────┤
│ ◀ Previous      Next ▶                │  ← Navigation
└────────────────────────────────────────┘
```

### 8.2 Rhythm Guidelines

- **Hero sections** (chapter header): 48px top padding
- **Between prose and component**: 32px margin
- **Between prose paragraphs**: 16px margin
- **Callout to prose**: 24px margin
- **Code simulator to prose**: 32px margin
- **Between diagrams**: 48px margin

---

## 9. Special Elements

### 9.1 Progress Indicator (Chapter Header)

```
Progress: Chapter 3 of 8 in Module 2
━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░░░░
```

- 4px height bar
- bg: `--border-subtle`
- Fill: `--accent-primary`
- Animated fill on scroll (optional)

### 9.2 Completion Badge

```
✓ Completed
```

- Small pill shape
- bg: `--success-subtle`
- text: `--success`
- 12px font
- Checkmark icon prefix

### 9.3 "Try It Yourself" Section

```
┌─────────────────────────────────────────────────────────────┐
│ 🧪 Try it yourself                                          │
│                                                             │
│ Now that you've seen how pi works, try it yourself!         │
│                                                             │
│ 1. Install pi: `npm install -g @mariozechner/pi-coding-agent`
│ 2. Set your API key: `export ANTHROPIC_API_KEY=sk-...`      │
│ 3. Run pi and try the prompt from this chapter             │
│                                                             │
│ Command to copy:                                            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ npm install -g @mariozechner/pi-coding-agent            │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                        [Copy Command]       │
└─────────────────────────────────────────────────────────────┘
```

**Style:**
- Border: dashed `--success`
- Background: `--success-subtle`
- Icon: `🧪` or lightbulb
- Steps: numbered list
- Code block: for terminal commands

### 9.4 Chapter Complete Checkmark

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│            ✓ Chapter Complete                               │
│                                                             │
│            You've learned:                                   │
│            • What pi is and when to use it                  │
│            • How to install and configure pi                 │
│            • Your first interaction with pi                 │
│                                                             │
│                   [Next Chapter →]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Style:**
- Centered, max-width 400px
- Large checkmark icon (48px, `--success`)
- List of takeaways
- Primary button for next chapter

---

## 10. Error States

### 10.1 Simulator Error

```
┌─────────────────────────────────────────────────────────────┐
│ ✗ Simulation Error                                          │
│                                                             │
│ Unable to load interaction script.                          │
│                                                             │
│ [Try Again]                              [Report Issue]      │
└─────────────────────────────────────────────────────────────┘
```

**Style:**
- Border: `--error`
- Background: `--error-subtle`
- Icon: `✗` in `--error`
- Retry button primary, report button ghost

### 10.2 Image/Diagram Load Error

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│          🖼                          │
│                                                             │
│     Diagram could not be loaded.                            │
│     [Retry]                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 Empty State (No Chapters Started)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              🚀 Ready to start learning?                    │
│                                                             │
│              Begin with Module 1: Getting Started           │
│                                                             │
│                   [Start Here]                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. Component Inventory Summary

| Component | Variants | States |
|-----------|----------|--------|
| Button | primary, secondary, ghost | default, hover, active, disabled, loading |
| Sidebar | desktop, mobile drawer | expanded, collapsed, active chapter |
| Chapter Header | — | default |
| Content Area | — | default, scrolled |
| Code Block | — | idle, playing, paused, completed, error |
| Simulator Output | — | streaming, complete |
| Callout | info, tip, warning, error | — |
| Animated Sequence | — | not started, playing, paused, completed |
| Interactive Diagram | d3, mermaid | default, node hovered, node selected |
| Detail Panel | — | hidden, visible |
| Previous/Next Nav | — | default, hover |
| Progress Bar | — | — |
| Completion Badge | — | — |
| Try It Yourself | — | — |
| Chapter Complete | — | — |
| Error State | simulation, image, empty | — |

---

## 12. File Structure for Reference

```
docs/superpowers/
├── SPEC.md
├── IMPLEMENTATION_PLAN.md
├── TASK_LIST.md
├── ui.md                           ← This file
├── SUMMARY.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   └── attachments/
│       ├── animations/
│       │   ├── session-branching.json
│       │   └── agent-communication.json
│       └── diagrams/
├── src/
│   ├── layouts/
│   │   └── ChapterLayout.astro
│   ├── components/
│   │   ├── Sidebar.astro
│   │   ├── CodeSimulator.astro
│   │   ├── AnimatedSequence.astro
│   │   ├── InteractiveDiagram.astro
│   │   ├── Callout.astro
│   │   └── ChapterNav.astro
│   ├── assets/
│   │   ├── pi-simulator.js
│   │   ├── animation-controller.js
│   │   ├── diagram-renderer.js
│   │   └── styles/
│   │       └── global.css
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── chapters/
    ├── module-1/
    ├── module-2/
    ├── module-3/
    ├── module-a/
    ├── module-b/
    └── module-c/
```