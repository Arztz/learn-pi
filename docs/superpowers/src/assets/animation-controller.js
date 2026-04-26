/**
 * Animation Controller - Handles animated sequences and step-based animations
 * Supports both Lottie (JSON) and CSS-based animations
 */

export class AnimationController {
  constructor(options = {}) {
    this.container = options.container || document.createElement('div');
    this.steps = options.steps || [];
    this.type = options.type || 'css'; // 'css' or 'lottie'
    this.autoplay = options.autoplay || false;
    this.speed = 1;

    this.currentStep = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.timeoutId = null;
    this.eventListeners = {};

    this.init();
  }

  init() {
    this.renderSteps();
    if (this.autoplay) {
      this.play();
    }
  }

  renderSteps() {
    // Create step indicators
    const indicators = document.createElement('div');
    indicators.className = 'step-indicators';

    this.steps.forEach((step, index) => {
      const dot = document.createElement('span');
      dot.className = 'step-dot';
      dot.dataset.step = index;
      if (index === 0) dot.classList.add('active');
      indicators.appendChild(dot);
    });

    this.container.appendChild(indicators);
  }

  play() {
    if (this.currentStep >= this.steps.length) {
      this.reset();
    }

    this.isPlaying = true;
    this.isPaused = false;
    this.updateUI();

    this.animateStep(this.currentStep);
  }

  pause() {
    this.isPaused = true;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.updateUI();
  }

  reset() {
    this.pause();
    this.currentStep = 0;
    this.renderActiveStep();
    this.emit('reset');
    this.updateUI();
  }

  step() {
    this.pause();
    this.isPlaying = false;

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.renderActiveStep();
    }

    this.updateUI();
  }

  seek(stepIndex) {
    this.currentStep = Math.max(0, Math.min(stepIndex, this.steps.length - 1));
    this.renderActiveStep();
    this.emit('seek', { step: this.currentStep });
    this.updateUI();
  }

  setSpeed(ratio) {
    this.speed = ratio;
  }

  animateStep(index) {
    if (this.isPaused) return;

    const step = this.steps[index];
    if (!step) {
      this.isPlaying = false;
      this.emit('complete');
      return;
    }

    // Render the step
    this.renderStep(index, step);

    // Calculate duration
    const baseDuration = step.duration || 1000;
    const adjustedDuration = baseDuration / this.speed;

    // Schedule next step
    this.timeoutId = setTimeout(() => {
      if (!this.isPaused) {
        this.currentStep++;
        this.updateStepIndicators();
        if (this.currentStep < this.steps.length) {
          this.animateStep(this.currentStep);
        } else {
          this.isPlaying = false;
          this.emit('complete');
        }
      }
    }, adjustedDuration);

    this.emit('step', { index, step });
  }

  renderStep(index, step) {
    // This is a base implementation - subclasses or specific implementations
    // should override this to render their specific step type

    const existing = this.container.querySelector('.animation-content');
    if (existing) {
      existing.remove();
    }

    const content = document.createElement('div');
    content.className = 'animation-content';

    if (this.type === 'css') {
      this.renderCSSStep(content, step);
    } else if (this.type === 'lottie') {
      this.renderLottieStep(content, step);
    }

    // Insert before step indicators
    const indicators = this.container.querySelector('.step-indicators');
    if (indicators) {
      this.container.insertBefore(content, indicators);
    } else {
      this.container.appendChild(content);
    }
  }

  renderCSSStep(container, step) {
    // Default CSS animation - can be overridden
    container.innerHTML = `
      <div class="css-animation" style="${step.style || ''}">
        ${step.content || ''}
      </div>
    `;
  }

  renderLottieStep(container, step) {
    // Lottie rendering would go here
    // For now, just show the content
    container.innerHTML = step.content || '';
  }

  renderActiveStep() {
    if (this.currentStep < this.steps.length) {
      this.renderStep(this.currentStep, this.steps[this.currentStep]);
      this.updateStepIndicators();
    }
  }

  updateStepIndicators() {
    const dots = this.container.querySelectorAll('.step-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index <= this.currentStep);
      dot.classList.toggle('completed', index < this.currentStep);
    });

    // Update step counter
    const counter = this.container.querySelector('.step-counter');
    if (counter) {
      counter.textContent = `${this.currentStep + 1} / ${this.steps.length}`;
    }
  }

  updateUI() {
    const playBtn = this.container.querySelector('.play-btn');
    const stepBtn = this.container.querySelector('.step-btn');

    if (playBtn) {
      playBtn.innerHTML = this.isPlaying && !this.isPaused ? '⏸' : '▶';
    }

    if (stepBtn) {
      stepBtn.disabled = this.isPlaying && !this.isPaused;
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

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.container.innerHTML = '';
  }
}

// CSS Animation definitions for common animations
export const animations = {
  'prompt-flow': {
    type: 'css',
    steps: [
      { content: '<div class="node user">User types prompt</div>', duration: 800 },
      { content: '<div class="node user">User types prompt</div><div class="arrow">↓</div><div class="node pi">pi receives</div>', duration: 600 },
      { content: '<div class="node user">User types prompt</div><div class="arrow">↓</div><div class="node pi processing">pi processes</div><div class="thinking-indicator">◐</div>', duration: 1000 },
      { content: '<div class="node user">User types prompt</div><div class="arrow">↓</div><div class="node pi">pi responds</div><div class="response">Hello! How can I help?</div>', duration: 800 }
    ]
  },

  'tool-execution': {
    type: 'css',
    steps: [
      { content: '<div class="node llm">LLM decides to use tool</div>', duration: 600 },
      { content: '<div class="node llm">LLM decides to use tool</div><div class="arrow">↓</div><div class="node tool">Tool call: read file</div>', duration: 600 },
      { content: '<div class="node llm">LLM decides to use tool</div><div class="arrow">↓</div><div class="node tool processing">Executing tool...</div>', duration: 800 },
      { content: '<div class="node llm">LLM decides to use tool</div><div class="arrow">↓</div><div class="node tool success">✓ Result: file contents</div>', duration: 600 }
    ]
  },

  'session-branching': {
    type: 'css',
    steps: [
      { content: '<div class="tree linear"><div class="node">A1</div><div class="node">A2</div><div class="node">A3</div></div>', duration: 600 },
      { content: '<div class="tree linear"><div class="node">A1</div><div class="node">A2</div><div class="node">A3</div></div><div class="branch-indicator">Branch at A2</div>', duration: 600 },
      { content: '<div class="tree branched"><div class="node">A1</div><div class="node branch-point">A2</div><div class="branch"><div class="node">A3a</div><div class="node">A4a</div></div><div class="branch"><div class="node">A3b</div><div class="node">A4b</div></div></div>', duration: 800 }
    ]
  },

  'typing-effect': {
    type: 'css',
    steps: [
      { content: '<span class="typing-effect">H<span class="typing-cursor"></span></span>', duration: 200 },
      { content: '<span class="typing-effect">He<span class="typing-cursor"></span></span>', duration: 150 },
      { content: '<span class="typing-effect">Hel<span class="typing-cursor"></span></span>', duration: 150 },
      { content: '<span class="typing-effect">Hell<span class="typing-cursor"></span></span>', duration: 150 },
      { content: '<span class="typing-effect">Hello<span class="typing-cursor"></span></span>', duration: 300 },
      { content: '<span class="typing-effect">Hello,<span class="typing-cursor"></span></span>', duration: 300 },
      { content: '<span class="typing-effect">Hello, <span class="typing-cursor"></span></span>', duration: 300 },
      { content: '<span class="typing-effect">Hello, world<span class="typing-cursor"></span></span>', duration: 400 }
    ]
  },

  'agent-communication': {
    type: 'css',
    steps: [
      { content: '<div style="display:flex;gap:4rem;justify-content:center;"><div class="agent-node"><div class="agent-avatar orchestrator">👤</div><span class="agent-label">You</span></div></div>', duration: 600 },
      { content: '<div style="display:flex;gap:4rem;justify-content:center;position:relative;"><div class="agent-node"><div class="agent-avatar orchestrator">👤</div><span class="agent-label">You</span></div><div class="agent-message sent" style="position:absolute;top:10px;left:50%;transform:translateX(-50%);">Implement auth</div></div>', duration: 800 },
      { content: '<div style="display:flex;gap:4rem;justify-content:center;"><div class="agent-node"><div class="agent-avatar techlead">🎯</div><span class="agent-label">Tech Lead</span></div></div>', duration: 600 },
      { content: '<div style="display:flex;gap:2rem;justify-content:center;position:relative;"><div class="agent-node"><div class="agent-avatar techlead">🎯</div><span class="agent-label">Tech Lead</span></div><div class="agent-message sent" style="position:absolute;top:10px;left:40%;">Dev Lead A</div><div class="agent-message sent" style="position:absolute;top:10px;left:60%;">Dev Lead B</div></div>', duration: 800 },
      { content: '<div style="display:flex;gap:1rem;justify-content:center;"><div class="agent-node"><div class="agent-avatar devlead">🔧</div><span class="agent-label">Dev A</span></div><div class="agent-node"><div class="agent-avatar devlead">🔧</div><span class="agent-label">Dev B</span></div></div>', duration: 600 }
    ]
  },

  'compaction': {
    type: 'css',
    steps: [
      { content: '<div style="display:flex;flex-direction:column;align-items:center;gap:1rem;"><div class="compact-before" style="width:200px;height:100px;background:var(--bg-elevated);border:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:center;border-radius:8px;">45,234 tokens</div><span style="color:var(--text-muted);font-size:0.875rem;">Full session history</span></div>', duration: 1000 },
      { content: '<div style="display:flex;align-items:center;gap:1rem;"><div class="compact-before" style="width:150px;height:80px;background:var(--bg-elevated);border:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:center;border-radius:8px;">45,234 tokens</div><span style="color:var(--accent-primary);font-size:1.5rem;">→</span><div class="compact-after" style="width:80px;height:60px;background:var(--accent-subtle);border:1px solid var(--accent-primary);display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:0.75rem;">2,341 tokens</div></div>', duration: 1500 },
      { content: '<div style="display:flex;flex-direction:column;align-items:center;gap:1rem;"><div class="compact-after" style="width:80px;height:60px;background:var(--success-subtle);border:1px solid var(--success);display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:0.75rem;color:var(--success);">2,341 tokens</div><span style="color:var(--success);font-size:0.875rem;">✓ Compacted!</span></div>', duration: 1000 }
    ]
  }
};