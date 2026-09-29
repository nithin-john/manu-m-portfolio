// src/components/Skills.js
// Crime Lab Capabilities & Forensic Toolkit

import { portfolioData } from '../data/portfolio.js';

export default class Skills {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;

    const cats = ['all', ...new Set(portfolioData.skills.map(s => s.category))];

    const filters = cats.map(c => `
      <button class="sf-btn ${c === 'all' ? 'active' : ''}" data-filter="${c}">
        <i class="bi ${c === 'forensics' ? 'bi-fingerprint' : c === 'technical' ? 'bi-cpu' : c === 'management' ? 'bi-shield-shaded' : 'bi-grid-fill'}"></i>
        ${c === 'all' ? 'All Disciplines' : c.charAt(0).toUpperCase() + c.slice(1)}
      </button>
    `).join('');

    const cards = portfolioData.skills.map(s => `
      <div class="skill-card anim from-up" data-category="${s.category}">
        <div class="sc-ic"><i class="bi ${s.icon}"></i></div>
        <div class="sc-n">${s.name}</div>
        <div class="sc-l"><i class="bi bi-patch-check"></i> ${s.level}</div>
      </div>
    `).join('');

    el.innerHTML = `
      <section class="skills section" id="skills" aria-labelledby="skills-h">
        <div class="wrap">
          <div>
            <div class="label anim from-up"><i class="bi bi-fingerprint"></i> Crime Lab Arsenal</div>
            <div class="rule anim from-up d1"></div>
            <h2 id="skills-h" class="display anim from-up d1">Forensic <em>Capabilities</em></h2>
            <div class="skill-filters anim from-up d2" role="group" aria-label="Filter forensic skills">
              ${filters}
            </div>
          </div>
          <div class="skills-grid" id="skills-grid">
            ${cards}
          </div>
        </div>
      </section>
    `;

    // Filter logic
    const grid = el.querySelector('#skills-grid');
    el.querySelectorAll('.sf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.querySelectorAll('.sf-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        grid.querySelectorAll('.skill-card').forEach(c => {
          c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none';
        });
      });
    });
  }
}
