/**
 * pi Simulator - Browser-based mock of pi interactions
 * Renders pre-written interaction scripts with typing effects and tool calls
 */

export class PiSimulator {
  constructor(element, script) {
    this.element = element;
    this.script = typeof script === 'string' ? JSON.parse(script) : script;
    this.currentTurn = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.speed = 1;
    this.typingTimeout = null;
    this.eventListeners = {};
    this.init();
  }

  init() {
    this.render();
    this.bindControls();
  }

  render() {
    this.element.innerHTML = `
      <div class="pi-simulator">
        <div class="simulator-output" id="simulatorOutput"></div>
        <div class="simulator-controls">
          <button class="ctrl-btn play-btn" id="playBtn" aria-label="Play">
            <span class="icon">▶</span>
          </button>
          <button class="ctrl-btn step-btn" id="stepBtn" aria-label="Step">
            <span class="icon">⏭</span>
          </button>
          <button class="ctrl-btn reset-btn" id="resetBtn" aria-label="Reset">
            <span class="icon">↺</span>
          </button>
          <div class="speed-control">
            <label for="speedSelect">Speed:</label>
            <select id="speedSelect" class="speed-select">
              <option value="0.5">0.5x</option>
              <option value="1" selected>1x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>
      </div>
    `;

    this.outputElement = this.element.querySelector('#simulatorOutput');
    this.playBtn = this.element.querySelector('#playBtn');
    this.stepBtn = this.element.querySelector('#stepBtn');
    this.resetBtn = this.element.querySelector('#resetBtn');
    this.speedSelect = this.element.querySelector('#speedSelect');
  }

  bindControls() {
    this.playBtn?.addEventListener('click', () => this.togglePlay());
    this.stepBtn?.addEventListener('click', () => this.step());
    this.resetBtn?.addEventListener('click', () => this.reset());
    this.speedSelect?.addEventListener('change', (e) => {
      this.speed = parseFloat(e.target.value);
    });
  }

  togglePlay() {
    if (this.isPlaying && !this.isPaused) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.currentTurn >= this.script.turns?.length) {
      this.reset();
    }
    this.isPlaying = true;
    this.isPaused = false;
    this.updatePlayButton();
    this.playNextTurn();
  }

  pause() {
    this.isPaused = true;
    this.updatePlayButton();
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  step() {
    this.pause();
    this.isPlaying = false;
    if (this.currentTurn < this.script.turns?.length) {
      this.renderTurn(this.currentTurn);
      this.currentTurn++;
    }
    this.updatePlayButton();
  }

  reset() {
    this.pause();
    this.isPlaying = false;
    this.currentTurn = 0;
    this.outputElement.innerHTML = '';
    this.updatePlayButton();
    this.emit('reset');
  }

  setSpeed(ratio) {
    this.speed = ratio;
  }

  playNextTurn() {
    if (this.isPaused || this.currentTurn >= this.script.turns?.length) {
      if (this.currentTurn >= this.script.turns?.length) {
        this.isPlaying = false;
        this.updatePlayButton();
        this.emit('complete');
      }
      return;
    }

    const turn = this.script.turns[this.currentTurn];
    this.renderTurn(this.currentTurn);
    this.currentTurn++;

    // Schedule next turn
    const delay = this.calculateDelay(turn);
    this.typingTimeout = setTimeout(() => this.playNextTurn(), delay);
  }

  calculateDelay(turn) {
    // Base delay depends on content length and speed
    let baseDelay = 500; // minimum between turns

    if (turn.content) {
      baseDelay += turn.content.length * (30 / this.speed); // typing effect
    }
    if (turn.toolResult) {
      baseDelay += 300;
    }
    if (turn.thinking) {
      baseDelay += turn.thinking.length * (20 / this.speed);
    }

    return Math.min(baseDelay, 3000); // cap at 3 seconds
  }

  renderTurn(index) {
    const turn = this.script.turns[index];
    const turnElement = document.createElement('div');
    turnElement.className = `turn turn-${turn.role}`;
    turnElement.dataset.turnIndex = index;

    if (turn.role === 'user') {
      turnElement.innerHTML = `
        <div class="message user-message">
          <span class="message-prefix">></span>
          <span class="message-content">${this.escapeHtml(turn.content || '')}</span>
        </div>
      `;
    } else if (turn.role === 'assistant') {
      let html = '';

      // Thinking block
      if (turn.thinking) {
        html += `
          <div class="thinking-block" data-thought="${this.escapeHtml(turn.thinking)}">
            <button class="thinking-header" aria-expanded="false">
              <span class="thinking-icon">◐</span>
              <span>Thinking...</span>
            </button>
            <div class="thinking-content" style="display: none;">
              ${this.escapeHtml(turn.thinking)}
            </div>
          </div>
        `;
      }

      // Tool calls
      if (turn.toolCalls?.length) {
        html += '<div class="tool-calls">';
        turn.toolCalls.forEach(tc => {
          html += `
            <div class="tool-call" data-tool="${tc.name}">
              <span class="tool-icon">ℹ</span>
              <span class="tool-name">${tc.name}</span>
              ${this.formatArgs(tc.args)}
            </div>
          `;
        });
        html += '</div>';
      }

      // Tool result
      if (turn.toolResult) {
        const isError = turn.toolResult.isError;
        html += `
          <div class="tool-result ${isError ? 'error' : 'success'}">
            <span class="result-icon">${isError ? '✕' : '✓'}</span>
            <span class="result-label">Tool: ${turn.toolResult.toolName || 'result'}</span>
            <pre class="result-content">${this.escapeHtml(turn.toolResult.content || '')}</pre>
          </div>
        `;
      }

      // Text content
      if (turn.content) {
        html += `<div class="assistant-text">${this.formatText(turn.content)}</div>`;
      }

      turnElement.innerHTML = html;

      // Bind thinking toggle
      const thinkingHeader = turnElement.querySelector('.thinking-header');
      thinkingHeader?.addEventListener('click', () => {
        const expanded = thinkingHeader.getAttribute('aria-expanded') === 'true';
        thinkingHeader.setAttribute('aria-expanded', !expanded);
        const content = turnElement.querySelector('.thinking-content');
        if (content) {
          content.style.display = expanded ? 'none' : 'block';
        }
      });
    }

    this.outputElement?.appendChild(turnElement);
    this.outputElement?.scrollTop = this.outputElement?.scrollHeight;

    this.emit('turn', { index, turn });
  }

  formatArgs(args) {
    if (!args) return '';
    if (typeof args === 'string') return ` ${args}`;

    const entries = Object.entries(args).filter(([_, v]) => v !== undefined && v !== null);
    if (entries.length === 0) return '';

    let html = ' {';
    entries.forEach(([key, value], i) => {
      const comma = i < entries.length - 1 ? ',' : '';
      if (typeof value === 'string') {
        html += ` <span class="arg-key">${key}</span>: <span class="arg-string">"${this.escapeHtml(value)}"</span>${comma}`;
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        html += ` <span class="arg-key">${key}</span>: <span class="arg-number">${value}</span>${comma}`;
      } else {
        html += ` <span class="arg-key">${key}</span>: ${JSON.stringify(value)}${comma}`;
      }
    });
    html += ' }';
    return html;
  }

  formatText(text) {
    // Simple text formatting - convert newlines to <br>
    return this.escapeHtml(text).replace(/\n/g, '<br>');
  }

  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  updatePlayButton() {
    if (this.playBtn) {
      const icon = this.playBtn.querySelector('.icon');
      if (this.isPlaying && !this.isPaused) {
        icon.textContent = '⏸';
      } else {
        icon.textContent = '▶';
      }
    }

    // Update button states
    if (this.stepBtn) {
      this.stepBtn.disabled = this.isPlaying && !this.isPaused;
    }
  }

  // Event emitter pattern
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
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

  // Cleanup
  destroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.element.innerHTML = '';
  }
}

// Default script format
export const defaultScript = {
  turns: [
    {
      role: 'user',
      content: 'Hello, what can you do?'
    },
    {
      role: 'assistant',
      thinking: 'The user is greeting me and asking about my capabilities. I should respond in a friendly way and explain the tools I have available.',
      content: "Hello! I'm pi, a terminal coding harness. I can help you with:\n\n• Reading and writing files\n• Running bash commands\n• Searching through code\n• And much more when extended with custom tools!"
    }
  ]
};

// Export CSS separately for injection
export const simulatorCSS = `
.pi-simulator {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.simulator-output {
  max-height: 400px;
  overflow-y: auto;
  padding: var(--space-4);
  font-family: var(--font-code);
  font-size: 0.875rem;
}

.turn {
  margin-bottom: var(--space-4);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.user-message {
  background-color: rgba(16, 185, 129, 0.1);
  border-left: 3px solid var(--user-msg);
  padding: var(--space-3);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.message-prefix {
  color: var(--user-msg);
  margin-right: var(--space-2);
}

.thinking-block {
  background-color: var(--thinking-subtle);
  border-left: 3px solid var(--thinking);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: var(--space-3) 0;
}

.thinking-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-3);
  background: none;
  border: none;
  color: var(--thinking);
  font-family: var(--font-prose);
  font-size: 0.875rem;
  cursor: pointer;
}

.thinking-icon {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.thinking-content {
  padding: 0 var(--space-3) var(--space-3);
  color: var(--text-secondary);
}

.tool-calls {
  margin: var(--space-3) 0;
}

.tool-call {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background-color: var(--tool-call-subtle);
  border-left: 3px solid var(--tool-call);
  padding: var(--space-2) var(--space-3);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: var(--space-2) 0;
  font-family: var(--font-code);
  font-size: 0.8125rem;
  color: var(--tool-call);
}

.tool-icon {
  opacity: 0.7;
}

.tool-name {
  font-weight: 500;
}

.arg-key { color: var(--accent-primary); }
.arg-string { color: var(--success); }
.arg-number { color: var(--warning); }

.tool-result {
  padding: var(--space-3);
  margin: var(--space-2) 0;
  border-radius: var(--radius-md);
  font-family: var(--font-code);
  font-size: 0.8125rem;
}

.tool-result.success {
  background-color: var(--success-subtle);
  color: var(--success);
}

.tool-result.error {
  background-color: var(--error-subtle);
  color: var(--error);
}

.result-icon {
  margin-right: var(--space-2);
}

.result-content {
  margin-top: var(--space-2);
  white-space: pre-wrap;
  color: var(--text-primary);
  font-size: 0.8125rem;
}

.assistant-text {
  margin-top: var(--space-3);
  color: var(--text-primary);
  line-height: 1.6;
}

/* Controls */
.simulator-controls {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background-color: var(--bg-elevated);
  border-top: 1px solid var(--border-subtle);
}

.ctrl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.ctrl-btn:hover:not(:disabled) {
  background-color: var(--bg-elevated);
  color: var(--text-primary);
}

.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ctrl-btn.play-btn:hover:not(:disabled) {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.speed-select {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: var(--space-1) var(--space-2);
  color: var(--text-primary);
  font-size: 0.75rem;
  cursor: pointer;
}

.speed-select:focus {
  outline: none;
  border-color: var(--accent-primary);
}
`;