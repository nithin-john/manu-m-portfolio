// src/components/Hero.js
// Gotham Crime Scene Investigation Banner with Static Frame and Smooth Batman Alter-Ego Reveal

export default class Hero {
  constructor(sel) {
    this.sel = sel;
    this.container = null;
    this.batmanLayer = null;
    this.reticle = null;
    this.raf = null;

    // Smooth reveal state (interpolation)
    this.pos = {
      currX: 0,
      currY: 0,
      targetX: 0,
      targetY: 0,
      currRadius: 0,
      targetRadius: 0,
      currOpacity: 0,
      targetOpacity: 0,
    };
    this.isHovering = false;
  }

  mount() {
    const c = document.querySelector(this.sel);
    if (!c) return;

    c.innerHTML = `
      <section class="hero" id="hero" aria-label="Investigation Dossier Overview">
        <div class="hero-left">
          <!-- Police Tape Crime Scene Header -->
          <div class="crime-tape-header">
            <span class="tape-hazard-box"><i class="bi bi-exclamation-triangle-fill"></i> CRIME SCENE</span>
            <span class="tape-text">GOTHAM INVESTIGATION PROTOCOL // CASE FILE #QC-2026</span>
          </div>

          <h1 class="hero-h1">
            <span class="h-italic" id="hl1">Forensic</span>
            <span class="h-cyan"   id="hl2">Quality</span>
            <span class="h-light"  id="hl3">&amp; Systems Investigator</span>
          </h1>

          <p class="hero-sub">
            Manu MA — operating at the intersection of precision engineering rigour and forensic investigation.
            Deploying Bat-Family audit standards to intercept defects and secure zero-defect architectures.
          </p>

          <div class="hero-btns">
            <a href="#work-mount" class="btn btn-cyan">
              <i class="bi bi-search"></i> Examine Case Evidence
            </a>
            <a href="public/cv/MANU_MA_RESUME.pdf" class="btn btn-ghost" target="_blank" rel="noopener">
              <i class="bi bi-file-earmark-pdf"></i> Download Police Dossier
            </a>
          </div>

          <div class="hero-stats">
            <div>
              <div class="hstat-n"><i class="bi bi-shield-check"></i> 5+</div>
              <div class="hstat-l">Years Field Record</div>
            </div>
            <div>
              <div class="hstat-n"><i class="bi bi-crosshair"></i> 3+</div>
              <div class="hstat-l">Sectors Audited</div>
            </div>
            <div>
              <div class="hstat-n"><i class="bi bi-award"></i> 2019</div>
              <div class="hstat-l">Tisat Certified</div>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <!-- Compact cropped banner frame — strictly below navbar -->
          <div class="portrait-container" id="portrait-reveal-box">
            <!-- Normal Investigator Portrait -->
            <img
              class="portrait-img portrait-normal"
              src="images/hero-portrait.jpg"
              alt="Manu MA — Quality Control Lead"
              loading="eager"
            />

            <!-- Smooth Batman face reveal layer with feathered dynamic mask -->
            <div class="portrait-batman-layer" id="batman-layer">
              <img
                class="portrait-img portrait-batman"
                src="images/batman-portrait.jpg"
                alt="Manu MA — Dark Knight Alter-Ego"
                loading="eager"
              />
            </div>

            <!-- Detective Vision scanner reticle -->
            <div class="batman-reveal-reticle" id="reveal-reticle">
              <div class="reticle-ring"></div>
              <div class="reticle-core"></div>
              <div class="reticle-label"><i class="bi bi-incognito"></i> THE DARK KNIGHT // DETECTED</div>
            </div>

            <!-- Crime scene corner brackets -->
            <div class="cyber-bracket tl" aria-hidden="true"></div>
            <div class="cyber-bracket tr" aria-hidden="true"></div>
            <div class="cyber-bracket bl" aria-hidden="true"></div>
            <div class="cyber-bracket br" aria-hidden="true"></div>

            <!-- Crime Scene Evidence Badge -->
            <div class="portrait-status-badge">
              <span class="status-indicator"></span>
              <span class="status-text"><i class="bi bi-fingerprint"></i> HOVER TO REVEAL DARK KNIGHT IDENTITY</span>
            </div>
          </div>
        </div>

        <!-- Crime scene caution banner marquee -->
        <div class="hero-marquee" aria-hidden="true">
          <div class="mq-track">
            ${Array(6).fill(`
              <span class="mq-i"><i class="bi bi-shield-shaded"></i> POLICE LINE DO NOT CROSS</span>
              <span class="mq-i"><i class="bi bi-fingerprint"></i> GOTHAM FORENSIC CRIME LAB</span>
              <span class="mq-i"><i class="bi bi-crosshair"></i> ZERO-DEFECT QUALITY PROTOCOL</span>
              <span class="mq-i"><i class="bi bi-file-earmark-lock"></i> CHAIN OF CUSTODY VERIFIED</span>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    this.container = document.getElementById('portrait-reveal-box');
    this.batmanLayer = document.getElementById('batman-layer');
    this.reticle = document.getElementById('reveal-reticle');

    this.initSmoothBatmanReveal();
  }

  initSmoothBatmanReveal() {
    if (!this.container || !this.batmanLayer) return;

    const onMouseMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.pos.targetX = x;
      this.pos.targetY = y;
      this.pos.targetRadius = 135;
      this.pos.targetOpacity = 1;
      this.isHovering = true;
    };

    const onMouseEnter = (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.pos.currX = x;
      this.pos.currY = y;
      this.pos.targetX = x;
      this.pos.targetY = y;
      this.pos.targetRadius = 125;
      this.pos.targetOpacity = 1;
      this.isHovering = true;
    };

    const onMouseLeave = () => {
      this.pos.targetRadius = 0;
      this.pos.targetOpacity = 0;
      this.isHovering = false;
    };

    this.container.addEventListener('mousemove', onMouseMove, { passive: true });
    this.container.addEventListener('mouseenter', onMouseEnter, { passive: true });
    this.container.addEventListener('mouseleave', onMouseLeave, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      this.pos.currX = lerp(this.pos.currX, this.pos.targetX, 0.12);
      this.pos.currY = lerp(this.pos.currY, this.pos.targetY, 0.12);
      this.pos.currRadius = lerp(this.pos.currRadius, this.pos.targetRadius, 0.09);
      this.pos.currOpacity = lerp(this.pos.currOpacity, this.pos.targetOpacity, 0.09);

      if (this.pos.currOpacity > 0.005) {
        const rx = this.pos.currX.toFixed(1);
        const ry = this.pos.currY.toFixed(1);
        const rad = this.pos.currRadius.toFixed(1);

        const maskCSS = `radial-gradient(circle ${rad}px at ${rx}px ${ry}px, black 35%, rgba(0,0,0,0.85) 60%, transparent 100%)`;
        this.batmanLayer.style.webkitMaskImage = maskCSS;
        this.batmanLayer.style.maskImage = maskCSS;
        this.batmanLayer.style.opacity = this.pos.currOpacity.toFixed(3);

        if (this.reticle) {
          this.reticle.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
          this.reticle.style.opacity = (this.pos.currOpacity * 0.95).toFixed(3);
        }
      } else {
        this.batmanLayer.style.opacity = '0';
        if (this.reticle) this.reticle.style.opacity = '0';
      }

      this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }

  animate() {
    const gsap = window.gsap;
    if (!gsap) return;
    const tl = gsap.timeline({ delay: 0.1 });
    ['#hl1', '#hl2', '#hl3'].forEach((id, i) => {
      const el = document.querySelector(id);
      if (el) tl.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' }, i * 0.1);
    });
    if (this.container) {
      tl.from(this.container, { opacity: 0, y: 25, duration: 1.0, ease: 'power3.out' }, 0.2);
    }
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
