// src/components/SelectedWork.js
// Classified Case Evidence & Solved Investigations with Bat-Family Operative Metadata

import { portfolioData } from '../data/portfolio.js';

export default class Work {
  constructor(sel, modal) {
    this.sel = sel;
    this.modal = modal;
  }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;

    const projects = portfolioData.projects;

    const cards = projects.map((p, i) => `
      <article
        class="cyber-pcard anim from-up d${i + 1}"
        data-idx="${i}"
        tabindex="0"
        role="button"
        aria-label="Examine Evidence: ${p.title}"
      >
        <!-- Top Forensic Case Header -->
        <div class="pcard-hud-bar">
          <span class="hud-sys-id"><i class="bi bi-tag-fill"></i> ${p.evidenceId}</span>
          <div class="hud-status-badge">
            <span class="hud-beacon"></span>
            <span><i class="bi ${p.crimeIcon}"></i> CHAIN OF CUSTODY VERIFIED</span>
          </div>
        </div>

        <!-- Evidence Photography Shell -->
        <div class="pcard-img-shell">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          
          <!-- Ballistic laser scanline sweep -->
          <div class="cyber-scanline" aria-hidden="true"></div>

          <!-- Police evidence stamp watermark -->
          <div class="evidence-stamp-badge"><i class="bi bi-shield-check"></i> SOLVED CASE</div>
        </div>

        <!-- Forensic Metadata & Case Details -->
        <div class="pcard-meta-area">
          <div class="pcard-cat"><i class="bi bi-person-badge"></i> INVESTIGATOR: ${p.investigator}</div>
          <h3 class="pcard-title-text">${p.title}</h3>
          <p class="pcard-desc-text">${p.subtitle}</p>

          <div class="pcard-tag-row">
            ${p.tags.map((t) => `<span class="cyber-tag"><i class="bi bi-check2"></i> ${t}</span>`).join('')}
          </div>
        </div>

        <!-- Case Inspection Trigger -->
        <div class="pcard-action-bar">
          <span class="action-label"><i class="bi bi-folder2-open"></i> Inspect Case Dossier</span>
          <div class="action-arrow-icon" aria-hidden="true">
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>
      </article>
    `).join('');

    el.innerHTML = `
      <section class="work section" id="work">
        <div class="wrap">
          <div class="work-header">
            <div class="label anim from-up"><i class="bi bi-folder-check"></i> Case Evidence Files</div>
            <div class="rule anim from-up d1"></div>
            <h2 class="display anim from-up d1">Solved <em>Investigations</em></h2>
          </div>
          <div class="projects-grid">
            ${cards}
          </div>
        </div>
      </section>
    `;

    // Modal click triggers
    el.querySelectorAll('.cyber-pcard').forEach((card) => {
      const open = () => {
        const p = projects[parseInt(card.dataset.idx)];
        if (this.modal) this.modal.open(p);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }
}
