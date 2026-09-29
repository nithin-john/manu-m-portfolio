// src/components/CVSection.js
// Secure Dossier Vault & Evidence Credentials

import { portfolioData } from '../data/portfolio.js';

export default class CV {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;

    const edu = portfolioData.education;

    el.innerHTML = `
      <section class="cv section" id="cv" aria-labelledby="cv-h">
        <div class="wrap">
          <div class="cv-inner">
            <div>
              <div class="label anim from-up"><i class="bi bi-file-earmark-lock"></i> Classified Dossier</div>
              <div class="rule anim from-up d1"></div>
              <h2 id="cv-h" class="cv-h anim from-up d1">
                Download<br><span>Police Dossier</span>
              </h2>
              <p class="cv-desc anim from-up d2">
                Access my verified professional service record, statutory inspection credentials,
                technical qualifications, and chain of custody documentation. Available for authorized review.
              </p>
              <a href="public/cv/MANU_MA_RESUME.pdf"
                 class="cv-btn anim from-up d3"
                 target="_blank" rel="noopener noreferrer"
                 aria-label="Download Manu MA police dossier PDF">
                <i class="bi bi-file-earmark-pdf"></i> Access Dossier (PDF)
              </a>
            </div>

            <div class="anim from-right d2">
              <div class="label anim from-up" style="margin-bottom:28px;"><i class="bi bi-mortarboard"></i> Academic &amp; Technical Foundation</div>
              <div class="edu-list">
                ${edu.map(e => `
                  <div class="edu-item">
                    <div class="edu-d"><i class="bi ${e.icon}"></i> ${e.degree}</div>
                    <div class="edu-i">${e.institution}</div>
                    <div class="edu-dt">${e.detail}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
