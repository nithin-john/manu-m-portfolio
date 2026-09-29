// src/components/Footer.js
// Gotham QC Unit Crime Scene Footer

export default class Footer {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;
    const year = new Date().getFullYear();

    el.innerHTML = `
      <footer class="footer" aria-label="Investigation footer">
        <div class="wrap">
          <div class="footer-inner">
            <div class="footer-logo">
              <i class="bi bi-shield-shaded"></i> MANU <span>MA</span> <small class="nav-unit-tag">GOTHAM INVESTIGATION DIVISION</small>
            </div>
            <div class="footer-copy">© ${year} Manu MA. Forensic Quality Systems. All case rights reserved.</div>
            <nav class="footer-links" aria-label="Footer links">
              <a href="#about-mount"><i class="bi bi-file-earmark-person"></i> Dossier</a>
              <a href="#work-mount"><i class="bi bi-folder2-open"></i> Evidence</a>
              <a href="#skills-mount"><i class="bi bi-fingerprint"></i> Crime Lab</a>
              <a href="#contact-mount"><i class="bi bi-broadcast"></i> Dispatch</a>
              <a href="public/cv/MANU_MA_RESUME.pdf" target="_blank" rel="noopener"><i class="bi bi-file-earmark-pdf"></i> PDF</a>
            </nav>
            <div class="footer-avail">
              <span class="avail-dot" aria-hidden="true"></span>
              <i class="bi bi-shield-check"></i> INVESTIGATION STATUS: 100% QUALITY
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}
