// src/components/CustomCursor.js

export default class Cursor {
  constructor() {
    this.dot  = document.getElementById('cursor-dot');
    this.ring = document.getElementById('cursor-ring');
    this.mx = -200; this.my = -200;
    this.rx = -200; this.ry = -200;
    this.raf = null;
  }

  init() {
    if (!this.dot || !this.ring) return;

    document.addEventListener('mousemove', e => {
      this.mx = e.clientX;
      this.my = e.clientY;
      this.dot.style.left = this.mx + 'px';
      this.dot.style.top  = this.my + 'px';
    }, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      this.rx = lerp(this.rx, this.mx, 0.11);
      this.ry = lerp(this.ry, this.my, 0.11);
      this.ring.style.left = this.rx + 'px';
      this.ring.style.top  = this.ry + 'px';
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);

    // Hover states — run after components mount
    setTimeout(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => this.ring.classList.add('is-link'));
        el.addEventListener('mouseleave', () => this.ring.classList.remove('is-link'));
      });
      document.querySelectorAll('.pcard').forEach(el => {
        el.addEventListener('mouseenter', () => { this.ring.classList.add('is-view'); this.ring.classList.remove('is-link'); });
        el.addEventListener('mouseleave', () => this.ring.classList.remove('is-view'));
      });
    }, 600);

    document.addEventListener('mouseleave', () => { this.dot.style.opacity = '0'; this.ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { this.dot.style.opacity = '1'; this.ring.style.opacity = '0.5'; });
  }
}
