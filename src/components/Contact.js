// src/components/Contact.js
// Secure Dispatch & Gotham Comms Line

import { portfolioData } from '../data/portfolio.js';

export default class Contact {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;

    const c = portfolioData.contact;

    el.innerHTML = `
      <section class="contact section" id="contact" aria-labelledby="contact-h">
        <div class="wrap">
          <div class="contact-grid">

            <div>
              <div class="label anim from-up"><i class="bi bi-broadcast"></i> Secure Comms Line</div>
              <div class="rule anim from-up d1"></div>
              <h2 id="contact-h" class="contact-h anim from-up d1">
                Initiate<br><span>Dispatch</span>
              </h2>
              <p class="contact-sub anim from-up d2">
                Whether commissioning a quality control investigation, initiating a statutory audit,
                or seeking consulting on zero-defect architectures — establish direct contact below.
              </p>
              <div class="channels anim from-up d3">
                <a href="mailto:${c.email}" class="channel" aria-label="Email Lead Investigator">
                  <span class="ch-ic"><i class="bi bi-envelope-check"></i></span>
                  <div>
                    <div class="ch-l">Encrypted Dispatch</div>
                    <div class="ch-v">${c.email}</div>
                  </div>
                  <span class="ch-arr" aria-hidden="true"><i class="bi bi-arrow-right"></i></span>
                </a>
                ${c.phone ? `
                <a href="tel:${c.phone.replace(/\s/g,'')}" class="channel" aria-label="Direct Phone Line">
                  <span class="ch-ic"><i class="bi bi-telephone-inbound"></i></span>
                  <div>
                    <div class="ch-l">Secure Voice Line</div>
                    <div class="ch-v">${c.phone}</div>
                  </div>
                  <span class="ch-arr" aria-hidden="true"><i class="bi bi-arrow-right"></i></span>
                </a>` : ''}
                <a href="${c.linkedin || '#'}" class="channel" target="_blank" rel="noopener" aria-label="LinkedIn Network">
                  <span class="ch-ic"><i class="bi bi-shield-shaded"></i></span>
                  <div>
                    <div class="ch-l">Professional Network</div>
                    <div class="ch-v">Connect via LinkedIn</div>
                  </div>
                  <span class="ch-arr" aria-hidden="true"><i class="bi bi-arrow-right"></i></span>
                </a>
              </div>
            </div>

            <div class="contact-img-wrap anim from-right d2">
              <div class="contact-frame" id="contact-frame">
                <img src="images/contact-dog.jpg"
                     alt="Manu MA on field assignment"
                     loading="lazy" />
                <div class="evidence-tag-corner"><i class="bi bi-tag-fill"></i> EVIDENCE #04-K9</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;

    const frame = document.getElementById('contact-frame');
    if (frame) {
      frame.addEventListener('mousemove', e => {
        const r = frame.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`;
      });
      frame.addEventListener('mouseleave', () => { frame.style.transform = ''; });
    }
  }
}
