// src/components/Preloader.js

export default class Preloader {
  constructor() {
    this.el  = document.getElementById('preloader');
    this.bar = document.getElementById('pl-bar') || (this.el && this.el.querySelector('.pl-bar-inner'));
    this.num = document.getElementById('pl-num');
  }

  run() {
    return new Promise(resolve => {
      if (!this.el) { resolve(); return; }
      const gsap = window.gsap;
      let val = 0;

      const setBar = v => {
        if (this.bar) this.bar.style.width = v + '%';
        if (this.num) this.num.textContent = Math.floor(v);
      };

      if (gsap) {
        gsap.to({ v: 0 }, {
          v: 100, duration: 1.5, ease: 'power2.inOut',
          onUpdate: function() { setBar(this.targets()[0].v); },
          onComplete: () => this.hide(resolve)
        });
      } else {
        const step = () => {
          val = Math.min(val + 2, 100);
          setBar(val);
          if (val < 100) requestAnimationFrame(step);
          else setTimeout(() => this.hide(resolve), 200);
        };
        requestAnimationFrame(step);
      }
    });
  }

  hide(resolve) {
    const gsap = window.gsap;
    if (gsap) {
      gsap.to(this.el, {
        opacity: 0, duration: 0.6, ease: 'power2.out',
        onComplete: () => {
          this.el.style.display = 'none';
          document.body.classList.remove('is-loading');
          resolve();
        }
      });
    } else {
      this.el.style.transition = 'opacity 0.5s';
      this.el.style.opacity = '0';
      setTimeout(() => {
        this.el.style.display = 'none';
        document.body.classList.remove('is-loading');
        resolve();
      }, 500);
    }
  }
}
