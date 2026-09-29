// src/components/Navbar.js

export default class Navbar {
  constructor(sel) {
    this.sel = sel;
    this.nav = null;
    this.mobile = null;
  }

  mount() {
    const c = document.querySelector(this.sel);
    if (!c) return;

    c.innerHTML = `
      <header class="navbar" id="navbar" role="banner">
        <a href="#hero-mount" class="nav-logo" aria-label="Manu MA Crime Scene Investigation">
          <i class="bi bi-shield-shaded"></i> MANU <span>MA</span> <small class="nav-unit-tag">GOTHAM QC UNIT</small>
        </a>

        <nav class="nav-links" aria-label="Investigation Navigation">
          <a href="#about-mount"><i class="bi bi-file-earmark-person"></i> Dossier</a>
          <a href="#work-mount"><i class="bi bi-folder2-open"></i> Evidence</a>
          <a href="#experience-mount"><i class="bi bi-clock-history"></i> Timeline</a>
          <a href="#skills-mount"><i class="bi bi-fingerprint"></i> Crime Lab</a>
          <a href="#process-mount"><i class="bi bi-diagram-3"></i> Protocol</a>
          <a href="#contact-mount" class="nav-cta"><i class="bi bi-broadcast"></i> Secure Dispatch</a>
        </nav>

        <button class="nav-burger" id="nav-burger" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </header>

      <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
        <a href="#about-mount" class="mob-link"><i class="bi bi-file-earmark-person"></i> Dossier</a>
        <a href="#work-mount" class="mob-link"><i class="bi bi-folder2-open"></i> Evidence</a>
        <a href="#experience-mount" class="mob-link"><i class="bi bi-clock-history"></i> Timeline</a>
        <a href="#skills-mount" class="mob-link"><i class="bi bi-fingerprint"></i> Crime Lab</a>
        <a href="#contact-mount" class="mob-link"><i class="bi bi-broadcast"></i> Dispatch</a>
      </div>
    `;

    this.nav = document.getElementById('navbar');
    this.mobile = document.getElementById('mobile-nav');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) this.nav.classList.add('scrolled');
      else this.nav.classList.remove('scrolled');
    }, { passive: true });

    const burger = document.getElementById('nav-burger');
    burger.addEventListener('click', () => {
      const open = this.mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      this.mobile.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    this.mobile.querySelectorAll('.mob-link').forEach(a => {
      a.addEventListener('click', () => {
        this.mobile.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        this.mobile.setAttribute('aria-hidden', true);
        document.body.style.overflow = '';
      });
    });
  }
}
