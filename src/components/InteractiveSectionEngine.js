// src/components/InteractiveSectionEngine.js
// Interactive Animated Section Loader & 3D Glassmorphism Physics Engine
// Features:
// 1. ScrollTrigger / IntersectionObserver-driven staggered 3D entrance animations for every section
// 2. Interactive 3D glass card tilt physics with cursor-following specular glare
// 3. Forensic number decryption / counter roll-up animations on section load

export default class InteractiveSectionEngine {
  constructor() {
    this.sections = [
      '#hero',
      '#about',
      '#work',
      '#experience',
      '#skills',
      '#process',
      '#services',
      '#cv',
      '#contact',
    ];
    this.hasAnimated = new Set();
  }

  init() {
    this.initInteractiveCards();
    this.initSectionScrollAnimations();
    this.initCounterAnimations();
  }

  // ── 1. Interactive 3D Card Tilt & Specular Cursor Glare ──────
  initInteractiveCards() {
    const cardSelectors = [
      '.cyber-pcard',
      '.svc-card',
      '.skill-card',
      '.fact',
      '.channel',
      '.pstep',
      '.portrait-container',
      '.about-frame',
      '.exp-img',
      '.process-img',
      '.contact-frame',
    ];

    const cards = document.querySelectorAll(cardSelectors.join(', '));

    cards.forEach((card) => {
      card.classList.add('glass-interactive');

      // Mousemove: Calculate 3D Tilt angles and cursor glare coordinates
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7; // max -7deg to +7deg
        const rotateY = ((x - centerX) / centerX) * 7;   // max -7deg to +7deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
        card.style.setProperty('--glare-x', `${((x / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${((y / rect.height) * 100).toFixed(1)}%`);
      }, { passive: true });

      // Mouseleave: Reset smooth spring physics
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        setTimeout(() => {
          card.style.transition = '';
        }, 500);
      });
    });
  }

  // ── 2. Interactive Animated Section Load On Scroll ──────────
  initSectionScrollAnimations() {
    const sections = document.querySelectorAll('section, .section, #hero, #about, #work, #experience, #skills, #process, #services, #cv, #contact');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          this.animateSectionIn(el);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    });

    sections.forEach((s) => {
      s.classList.add('section-anim-target');
      observer.observe(s);
    });
  }

  animateSectionIn(section) {
    if (this.hasAnimated.has(section)) return;
    this.hasAnimated.add(section);

    section.classList.add('section-interactive-loaded');

    // Stagger child cards and components inside section
    const childItems = section.querySelectorAll(
      '.crime-tape-header, .label, h2.display, .rule, .about-h, .about-body, .cyber-pcard, .svc-card, .skill-card, .pstep, .titem, .fact, .channel, .cv-inner'
    );

    if (window.gsap && childItems.length > 0) {
      window.gsap.fromTo(childItems,
        {
          opacity: 0,
          y: 45,
          rotateX: 6,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'opacity,y,rotateX,scale',
        }
      );
    } else {
      // Fallback CSS class
      childItems.forEach((child, i) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, i * 70);
      });
    }

    // Trigger number counter decryption if present
    this.triggerSectionCounters(section);
  }

  // ── 3. Forensic Digit Decryption Roll-Up Animations ─────────
  initCounterAnimations() {
    // Initialized when sections animate in
  }

  triggerSectionCounters(section) {
    const counters = section.querySelectorAll('.hstat-n, .fact-v');
    counters.forEach((counter) => {
      const text = counter.innerText.trim();
      const match = text.match(/([0-9.]+)/);
      if (!match) return;

      const targetNum = parseFloat(match[1]);
      const prefix = text.split(match[1])[0] || '';
      const suffix = text.split(match[1])[1] || '';

      let current = 0;
      const duration = 1200;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        current = (targetNum * ease);

        const formatted = targetNum % 1 !== 0 ? current.toFixed(1) : Math.floor(current);
        counter.innerHTML = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerHTML = `${prefix}${targetNum}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    });
  }
}
