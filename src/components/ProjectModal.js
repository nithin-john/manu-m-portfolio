// src/components/ProjectModal.js

export default class Modal {
  constructor(sel) { this.sel = sel; this.el = null; }

  mount() {
    const container = document.querySelector(this.sel);
    if (!container) return;

    container.innerHTML = `
      <div class="modal-back" id="proj-modal" role="dialog" aria-modal="true"
           aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-box">
          <div class="modal-head">
            <h2 class="modal-title" id="modal-title">Project</h2>
            <button class="modal-close" aria-label="Close modal">✕</button>
          </div>
          <div class="modal-body">
            <div class="modal-img">
              <img id="m-img" src="" alt="" />
            </div>
            <p class="modal-desc" id="m-desc"></p>
            <div class="modal-tags" id="m-tags"></div>
          </div>
        </div>
      </div>
    `;

    this.el = container.querySelector('#proj-modal');
    this.el.querySelector('.modal-close').addEventListener('click', () => this.close());
    this.el.addEventListener('click', e => { if (e.target === this.el) this.close(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.el.classList.contains('open')) this.close();
    });
  }

  open(p) {
    if (!this.el) return;
    this.el.querySelector('#modal-title').textContent = p.title;
    const img = this.el.querySelector('#m-img');
    img.src = p.image; img.alt = p.title;
    this.el.querySelector('#m-desc').textContent = p.description;
    this.el.querySelector('#m-tags').innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    this.el.classList.add('open');
    this.el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.el.querySelector('.modal-close').focus(), 100);
  }

  close() {
    if (!this.el) return;
    this.el.classList.remove('open');
    this.el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
