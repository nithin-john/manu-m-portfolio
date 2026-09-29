/**
 * AISection.js
 * HUMAN + MACHINE // DESIGNING WITH INTELLIGENCE
 * Interactive workflow architecture visualizing how human engineering judgment fusions with algorithmic automation
 */

export class AISection {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.render();
  }

  render() {
    const ai = this.data.aiSection;
    this.container.innerHTML = `
      <section class="section" id="ai-intelligence" aria-label="Human and Machine Intelligence">
        <div class="container">
          <div class="ai-section-box">
            <div style="max-width: 780px;">
              <div class="sys-badge" style="margin-bottom: 1.25rem;">
                <span>${ai.badge}</span>
              </div>
              <h2 style="font-size: clamp(2.2rem, 4vw, 3.5rem); margin-bottom: 1rem; color: var(--text-primary);">
                ${ai.title}
              </h2>
              <p style="font-size: 1.15rem; line-height: 1.6; color: var(--accent-cyan); margin-bottom: 1.25rem;">
                ${ai.lead}
              </p>
              <p style="font-size: 1rem; line-height: 1.7; color: var(--text-secondary);">
                ${ai.concept}
              </p>
            </div>

            <!-- Interactive Symbiosis Pipeline Nodes -->
            <div class="ai-nodes-grid">
              ${ai.workflowNodes.map(node => `
                <div class="ai-node-card interactive-hover">
                  <span class="node-idx">${node.id} // NODE</span>
                  <h3 class="node-title">${node.name}</h3>
                  <p class="font-mono" style="font-size: 0.72rem; color: var(--text-muted);">${node.role}</p>

                  <div class="node-layer-spec">
                    <span class="spec-human"><strong>Human Role:</strong> ${node.humanRole}</span>
                    <span class="spec-machine"><strong>AI Layer:</strong> ${node.aiRole}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
