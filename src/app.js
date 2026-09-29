// src/app.js
// Main Application Entry: Mounts components, initializes smooth scroll, and starts Gotham Crime Scene Investigation Engine

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

import Navbar           from './components/Navbar.js';
import Hero             from './components/Hero.js';
import About            from './components/About.js';
import Work             from './components/SelectedWork.js';
import Experience       from './components/Experience.js';
import Skills           from './components/Skills.js';
import Process          from './components/Process.js';
import Services         from './components/Services.js';
import CV               from './components/CVSection.js';
import Contact          from './components/Contact.js';
import Footer           from './components/Footer.js';
import Modal            from './components/ProjectModal.js';
import Cursor           from './components/CustomCursor.js';
import Preloader        from './components/Preloader.js';
import CrimeSceneEngine from './components/CrimeSceneEngine.js';

async function boot() {
  // 1. Mount all core UI components
  const modal = new Modal('#modal-mount');
  modal.mount();

  new Navbar('#nav-mount').mount();
  const hero = new Hero('#hero-mount');
  hero.mount();
  new About('#about-mount').mount();
  const work = new Work('#work-mount', modal);
  work.mount();
  new Experience('#experience-mount').mount();
  new Skills('#skills-mount').mount();
  new Process('#process-mount').mount();
  new Services('#services-mount').mount();
  new CV('#cv-mount').mount();
  new Contact('#contact-mount').mount();
  new Footer('#footer-mount').mount();

  // 2. Forensic Cursor
  new Cursor().init();

  // 3. Lenis Smooth Scroll
  if (window.Lenis) {
    const lenis = new window.Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    if (window.gsap) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
    } else {
      function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // 4. Preloader sequence
  const preloader = new Preloader();
  await preloader.run();

  // 5. Scroll reveals for all sections
  initReveals();

  // 6. Hero entrance animation
  hero.animate();

  // 7. Start Bat-Family Crime Scene Investigation Canvas & HUD
  const crimeEngine = new CrimeSceneEngine();
  crimeEngine.init();
}

function initReveals() {
  const items = document.querySelectorAll('.section-slide-up, .anim');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

boot().catch(console.error);
