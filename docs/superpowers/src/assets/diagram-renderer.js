/**
 * Diagram Renderer - D3-based interactive diagrams and Mermaid support
 */

export class DiagramRenderer {
  constructor(container, config = {}) {
    this.container = container;
    this.config = config;
    this.type = config.type || 'd3'; // 'd3' or 'mermaid'
    this.nodes = config.nodes || [];
    this.links = config.links || [];
    this.selectedNode = null;
    this.eventListeners = {};
    this.svg = null;

    this.init();
  }

  init() {
    this.setupContainer();
    this.render();
  }

  setupContainer() {
    // Clear container
    this.container.innerHTML = '';

    // Create SVG element for D3 diagrams
    if (this.type === 'd3') {
      this.svg = document.createElementNS('http://www.w3.org/2000/svg');
      this.svg.setAttribute('class', 'diagram-svg');
      this.svg.setAttribute('viewBox', '0 0 600 400');
      this.container.appendChild(this.svg);
    }
  }

  render() {
    if (this.type === 'mermaid') {
      this.renderMermaid();
    } else {
      this.renderD3();
    }
  }

  renderD3() {
    // Basic D3-like rendering using SVG
    // For a full D3 implementation, you would include D3.js library

    const nodeWidth = 140;
    const nodeHeight = 50;
    const horizontalSpacing = 180;
    const verticalSpacing = 80;

    // Calculate node positions based on hierarchy
    const positions = this.calculateNodePositions(nodeWidth, nodeHeight, horizontalSpacing, verticalSpacing);

    // Render links first (so they're behind nodes)
    this.links.forEach(link => {
      const fromPos = positions[link.from];
      const toPos = positions[link.to];

      if (fromPos && toPos) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        // Create a curved path
        const midX = (fromPos.x + nodeWidth + toPos.x) / 2;
        const d = `M ${fromPos.x + nodeWidth} ${fromPos.y + nodeHeight / 2}
                   C ${midX} ${fromPos.y + nodeHeight / 2},
                     ${midX} ${toPos.y + nodeHeight / 2},
                     ${toPos.x} ${toPos.y + nodeHeight / 2}`;

        path.setAttribute('d', d);
        path.setAttribute('class', 'diagram-link');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'var(--border-subtle)');
        path.setAttribute('stroke-width', '2');
        this.svg?.appendChild(path);
      }
    });

    // Render nodes
    this.nodes.forEach(node => {
      const pos = positions[node.id];
      if (!pos) return;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'diagram-node');
      g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
      g.style.cursor = 'pointer';

      // Node background
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('class', 'node-bg');
      rect.setAttribute('width', nodeWidth.toString());
      rect.setAttribute('height', nodeHeight.toString());
      rect.setAttribute('rx', '8');
      rect.setAttribute('fill', 'var(--bg-surface)');
      rect.setAttribute('stroke', 'var(--border-subtle)');
      rect.setAttribute('stroke-width', '2');
      g.appendChild(rect);

      // Node label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'node-label');
      text.setAttribute('x', (nodeWidth / 2).toString());
      text.setAttribute('y', (nodeHeight / 2 + 5).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'var(--text-primary)');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', '500');
      text.textContent = node.label || node.id;
      g.appendChild(text);

      // Node type indicator (colored dot)
      if (node.type) {
        const colors = {
          orchestrator: 'var(--accent-primary)',
          techlead: 'var(--tool-call)',
          devlead: 'var(--success)',
          devsenior: 'var(--warning)'
        };
        const dotColor = colors[node.type] || 'var(--text-muted)';

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', '12');
        dot.setAttribute('cy', '12');
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', dotColor);
        g.appendChild(dot);
      }

      // Click handler
      g.addEventListener('click', () => this.selectNode(node));

      // Hover effects
      g.addEventListener('mouseenter', () => {
        rect.setAttribute('stroke', 'var(--accent-primary)');
        rect.setAttribute('filter', 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.3))');
      });

      g.addEventListener('mouseleave', () => {
        if (this.selectedNode?.id !== node.id) {
          rect.setAttribute('stroke', 'var(--border-subtle)');
          rect.removeAttribute('filter');
        }
      });

      this.svg?.appendChild(g);
    });
  }

  calculateNodePositions(nodeWidth, nodeHeight, hSpacing, vSpacing) {
    const positions = {};
    const centerX = 300;

    // Build hierarchy levels
    const levels = {};

    this.nodes.forEach(node => {
      const level = node.level || 0;
      if (!levels[level]) levels[level] = [];
      levels[level].push(node);
    });

    // Position each level
    Object.keys(levels).forEach(levelStr => {
      const level = parseInt(levelStr);
      const nodesAtLevel = levels[level];
      const totalWidth = (nodesAtLevel.length - 1) * hSpacing;
      const startX = centerX - totalWidth / 2 - nodeWidth / 2;

      nodesAtLevel.forEach((node, index) => {
        positions[node.id] = {
          x: startX + index * hSpacing,
          y: 50 + level * vSpacing
        };
      });
    });

    return positions;
  }

  renderMermaid() {
    // Mermaid rendering would require the Mermaid library
    // For now, render a placeholder
    this.container.innerHTML = `
      <div class="mermaid-placeholder">
        <pre class="mermaid-code">${this.config.source || 'graph TD\n  A[Node A] --> B[Node B]'}</pre>
      </div>
    `;
  }

  selectNode(node) {
    this.selectedNode = node;
    this.emit('nodeSelect', { node });

    // Update visual state
    const nodeElements = this.svg?.querySelectorAll('.diagram-node') || [];
    nodeElements.forEach(el => {
      const rect = el.querySelector('rect');
      if (el.__data__?.id === node.id) {
        rect?.setAttribute('stroke', 'var(--accent-primary)');
        rect?.setAttribute('fill', 'var(--accent-subtle)');
      } else {
        rect?.setAttribute('stroke', 'var(--border-subtle)');
        rect?.setAttribute('fill', 'var(--bg-surface)');
      }
    });
  }

  getSelectedNodeDetails() {
    if (!this.selectedNode) return null;
    return {
      ...this.selectedNode,
      description: this.selectedNode.description || `${this.selectedNode.label || this.selectedNode.id} agent`,
      tools: this.selectedNode.tools || ['read', 'bash', 'edit', 'write'],
      model: this.selectedNode.model || 'claude-sonnet-4-5',
      systemPrompt: this.selectedNode.systemPrompt || `You are a ${this.selectedNode.label || this.selectedNode.id}.`
    };
  }

  // Event emitter
  on(event, callback) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(callback);
  }

  off(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(cb => cb(data));
    }
  }

  destroy() {
    this.container.innerHTML = '';
  }
}

// Diagram configurations for different diagram types
export const diagramConfigs = {
  'agent-team-hierarchy': {
    type: 'd3',
    nodes: [
      { id: 'orchestrator', label: 'Orchestrator (You)', type: 'orchestrator', level: 0 },
      { id: 'techlead', label: 'Tech Lead', type: 'techlead', level: 1 },
      { id: 'devlead-a', label: 'Dev Lead A', type: 'devlead', level: 2 },
      { id: 'devlead-b', label: 'Dev Lead B', type: 'devlead', level: 2 },
      { id: 'devsenior-a', label: 'Dev Senior A1', type: 'devsenior', level: 3 },
      { id: 'devsenior-b', label: 'Dev Senior B1', type: 'devsenior', level: 3 }
    ],
    links: [
      { from: 'orchestrator', to: 'techlead' },
      { from: 'techlead', to: 'devlead-a' },
      { from: 'techlead', to: 'devlead-b' },
      { from: 'devlead-a', to: 'devsenior-a' },
      { from: 'devlead-b', to: 'devsenior-b' }
    ]
  },

  'event-bus': {
    type: 'd3',
    nodes: [
      { id: 'ext-a', label: 'Extension A', type: 'extension', level: 0 },
      { id: 'eventbus', label: 'Event Bus', type: 'eventbus', level: 1 },
      { id: 'ext-b', label: 'Extension B', type: 'extension', level: 2 },
      { id: 'ext-c', label: 'Extension C', type: 'extension', level: 2 }
    ],
    links: [
      { from: 'ext-a', to: 'eventbus' },
      { from: 'eventbus', to: 'ext-b' },
      { from: 'eventbus', to: 'ext-c' }
    ]
  },

  'session-tree': {
    type: 'd3',
    nodes: [
      { id: 'root', label: 'User: Hello', level: 0 },
      { id: 'a1', label: 'Assistant: Hi!', level: 1 },
      { id: 'a2', label: 'User: Do task', level: 2 },
      { id: 'a3a', label: 'Assistant: Doing A', level: 3 },
      { id: 'a3b', label: 'Assistant: Doing B', level: 3 }
    ],
    links: [
      { from: 'root', to: 'a1' },
      { from: 'a1', to: 'a2' },
      { from: 'a2', to: 'a3a' },
      { from: 'a2', to: 'a3b' }
    ]
  },

  'extension-lifecycle': {
    type: 'd3',
    nodes: [
      { id: 'discover', label: 'Discover', level: 0, type: 'system' },
      { id: 'load', label: 'Load', level: 1, type: 'system' },
      { id: 'register', label: 'Register', level: 2, type: 'system' },
      { id: 'ready', label: 'Ready', level: 3, type: 'system' },
      { id: 'events', label: 'Events', level: 4, type: 'system' },
      { id: 'unload', label: 'Unload', level: 5, type: 'system' }
    ],
    links: [
      { from: 'discover', to: 'load' },
      { from: 'load', to: 'register' },
      { from: 'register', to: 'ready' },
      { from: 'ready', to: 'events' },
      { from: 'events', to: 'unload' }
    ]
  },

  'session-jsonl': {
    type: 'd3',
    nodes: [
      { id: 'entry1', label: '{"role":"user"...}', level: 0, type: 'entry' },
      { id: 'entry2', label: '{"role":"assistant"...}', level: 0, type: 'entry' },
      { id: 'entry3', label: '{"type":"compaction"...}', level: 0, type: 'compaction' },
      { id: 'entry4', label: '{"role":"user"...}', level: 0, type: 'entry' }
    ],
    links: []
  }
};