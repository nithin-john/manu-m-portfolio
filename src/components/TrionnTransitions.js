/**
 * TrionnTransitions.js
 * GSAP + Lenis Powered Shutter Transitions & Kinetic Rolling Typography
 */

export class TrionnTransitions {
  constructor() {
    this.overlay = null;
    this.belts = [];
    this.counterEl = null;
    this.isTransitioning = false;
    this.lenis = null;
    this.init();
  }

  init() {
    this.initLenis();
    this.buildDOM();
    this.initCharacterRolls();
    this.runIntroPreloader();
    this.bindLinkTransitions();
  }

  initLenis() {
    // If Lenis smooth scroll library is present, initialize momentum scrolling
    if (typeof window.Lenis !== "undefined") {
      this.lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5
      });

      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      window.__LENIS__ = this.lenis;
      console.log("[LENIS] Smooth momentum scroll active.");
    }
  }

  buildDOM() {
    // 10 vertical shutter belts matching trionn.com exactly
    const preloaderWrap = document.createElement("div");
    preloaderWrap.id = "trionn-preloader";
    preloaderWrap.className = "pl-wrapper";
    preloaderWrap.innerHTML = `
      <div class="pl-overlay">
        ${Array.from({ length: 10 }).map((_, i) => `<div class="pl-belt" style="--belt-idx:${i};"></div>`).join("")}
      </div>

      <!-- Center Logo & Counter Badge -->
      <div class="pl-center-content">
        <div class="pl-monogram-box">
          <svg class="pl-corner-plus tl" width="13" height="13" viewBox="0 0 13 13"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#444"/><line x1="0" y1="6.5" x2="13" y2="6.5" stroke="#444"/></svg>
          <svg class="pl-corner-plus tr" width="13" height="13" viewBox="0 0 13 13"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#444"/><line x1="0" y1="6.5" x2="13" y2="6.5" stroke="#444"/></svg>
          <svg class="pl-corner-plus bl" width="13" height="13" viewBox="0 0 13 13"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#444"/><line x1="0" y1="6.5" x2="13" y2="6.5" stroke="#444"/></svg>
          <svg class="pl-corner-plus br" width="13" height="13" viewBox="0 0 13 13"><line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#444"/><line x1="0" y1="6.5" x2="13" y2="6.5" stroke="#444"/></svg>
          <span class="pl-logo-text">MMA // 01</span>
        </div>

        <div class="pl-tagline">
          <span>RIGOR</span><span class="pl-dot">·</span><span>PRECISION</span><span class="pl-dot">·</span><span>INTELLIGENCE</span>
        </div>

        <div class="pl-counter font-mono" id="pl-counter-num">00%</div>
      </div>
    `;

    document.body.appendChild(preloaderWrap);
    this.overlay = preloaderWrap;
    this.belts = preloaderWrap.querySelectorAll(".pl-belt");
    this.counterEl = preloaderWrap.querySelector("#pl-counter-num");
  }

  runIntroPreloader() {
    let progress = 0;
    const duration = 800; // ms
    const startTime = performance.now();

    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(1, elapsed / duration);
      const val = Math.floor(pct * 100);
      if (this.counterEl) {
        this.counterEl.textContent = `${val < 10 ? '0' + val : val}%`;
      }

      if (pct < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => this.openShutter(), 100);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  openShutter() {
    const center = this.overlay.querySelector(".pl-center-content");
    if (center) {
      center.style.opacity = "0";
      center.style.transform = "scale(0.92)";
      center.style.transition = "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    }

    if (window.gsap) {
      // Use GSAP timeline for silky smooth 120fps shutter exit
      window.gsap.to(this.belts, {
        yPercent: -100,
        stagger: 0.035,
        duration: 0.75,
        ease: "power4.inOut",
        onComplete: () => {
          this.overlay.classList.add("is-hidden");
          document.body.classList.add("site-ready");
          window.dispatchEvent(new CustomEvent("site-ready"));
        }
      });
    } else {
      // High-performance CSS fallback
      this.belts.forEach((belt, i) => {
        setTimeout(() => {
          belt.classList.add("shutter-open");
        }, i * 35);
      });

      setTimeout(() => {
        this.overlay.classList.add("is-hidden");
        document.body.classList.add("site-ready");
        window.dispatchEvent(new CustomEvent("site-ready"));
      }, this.belts.length * 35 + 500);
    }
  }

  triggerTransition(callback) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.overlay.classList.remove("is-hidden");

    if (window.gsap) {
      window.gsap.set(this.belts, { yPercent: -100 });
      window.gsap.to(this.belts, {
        yPercent: 0,
        stagger: 0.025,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          if (callback) callback();
          setTimeout(() => {
            window.gsap.to(this.belts, {
              yPercent: -100,
              stagger: 0.025,
              duration: 0.55,
              ease: "power3.inOut",
              onComplete: () => {
                this.overlay.classList.add("is-hidden");
                this.isTransitioning = false;
              }
            });
          }, 120);
        }
      });
    } else {
      this.belts.forEach((belt, i) => {
        setTimeout(() => {
          belt.classList.remove("shutter-open");
          belt.classList.add("shutter-closing");
        }, i * 25);
      });

      setTimeout(() => {
        if (callback) callback();

        setTimeout(() => {
          this.belts.forEach((belt, i) => {
            setTimeout(() => {
              belt.classList.remove("shutter-closing");
              belt.classList.add("shutter-open");
            }, i * 25);
          });

          setTimeout(() => {
            this.overlay.classList.add("is-hidden");
            this.isTransitioning = false;
          }, this.belts.length * 25 + 400);
        }, 80);
      }, this.belts.length * 25 + 250);
    }
  }

  bindLinkTransitions() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          this.triggerTransition(() => {
            if (this.lenis) {
              this.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
            } else {
              target.scrollIntoView({ behavior: "smooth" });
            }
          });
        }
      }
    });
  }

  initCharacterRolls() {
    const elements = document.querySelectorAll(".trionn-roll");
    elements.forEach((el) => {
      if (el.dataset.rolled) return;
      el.dataset.rolled = "true";
      const text = el.textContent.trim();
      const chars = Array.from(text);

      el.innerHTML = `
        <span class="roll-wrapper">
          <span class="roll-layer original">
            ${chars.map((c, idx) => `<span class="char" style="--char-idx:${idx}">${c === ' ' ? '&nbsp;' : c}</span>`).join("")}
          </span>
          <span class="roll-layer clone" aria-hidden="true">
            ${chars.map((c, idx) => `<span class="char" style="--char-idx:${idx}">${c === ' ' ? '&nbsp;' : c}</span>`).join("")}
          </span>
        </span>
      `;
    });
  }
}
