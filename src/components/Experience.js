// src/components/Experience.js
// Investigation Timeline & Field Record

import { portfolioData } from '../data/portfolio.js';

export default class Experience {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;
    const jobs = portfolioData.experience;
    const items = jobs.map(j => `
      <div class="titem anim from-up">
        <div class="tp"><i class="bi bi-calendar-event"></i> ${j.period}</div>
        <div class="tr">${j.role}</div>
        <div class="tc"><i class="bi ${j.icon}"></i> ${j.company} <span class="case-file-pill">${j.badge}</span></div>
        <p class="td">${j.description}</p>
      </div>
    `).join('');

    el.innerHTML = `
      <section class="experience section" id="experience">
        <div class="wrap">
          <div class="exp-grid">
            <div class="exp-sticky">
              <div class="label anim from-up"><i class="bi bi-clock-history"></i> Field Service Log</div>
              <div class="rule anim from-up d1"></div>
              <h2 class="display anim from-up d1" style="font-size:clamp(36px,5vw,72px);">Investigation<br><em>Record</em></h2>
              <div class="exp-img anim from-fade d2">
                <img src="images/experience-viewpoint.jpg" alt="Field viewpoint inspection" loading="lazy" />
                <div class="exp-img-lbl"><i class="bi bi-camera"></i> FIELD SURVEILLANCE // SECTOR ZERO</div>
              </div>
            </div>
            <div class="timeline" role="list">${items}</div>
          </div>
        </div>
      </section>
    `;
  }
}
