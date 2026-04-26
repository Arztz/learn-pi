# Pi Learning Guide

An interactive tutorial website for learning pi coding agent from zero to hero.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
docs/superpowers/
├── src/
│   ├── components/     # Astro components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Astro pages
│   ├── styles/        # Global CSS
│   ├── assets/        # JavaScript modules
│   └── chapters/      # Learning content (MDX)
├── public/            # Static assets
└── dist/             # Built output
```

## Learning Path

1. **Module 1: Getting Started** - Install pi, first prompts
2. **Module 2: Core Workflow** - Files, bash, sessions, branching
3. **Module 3: Extending pi** - Custom tools, commands, events
4. **Module A: Agent Teams** - Multi-agent architectures
5. **Module B: Persistent Memory** - Context management
6. **Module C: Event Bus** - Extension communication

## Development

This site is built with [Astro](https://astro.build) and requires no server - all interactive features run client-side.

### Interactive Components

- **CodeSimulator** - Browser-based pi interaction simulator
- **AnimatedSequence** - Step-by-step animations
- **InteractiveDiagram** - Clickable node diagrams

### Adding Content

1. Create MDX file in `chapters/[module]/[chapter].mdx`
2. Use existing chapters as templates
3. Run `npm run build` to verify

## Deployment

The site deploys to static hosting (GitHub Pages, Netlify, etc.)

### GitHub Pages

Push to `main` branch and the GitHub Action will deploy automatically.

### Netlify

Connect the repository to Netlify - `netlify.toml` is already configured.

## License

MIT