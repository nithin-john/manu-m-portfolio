// src/components/About.js
// Agent Dossier & Forensic Background Profile

export default class About {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;
    el.innerHTML = `
      <section class="about section" id="about">
        <div class="wrap">
          <div class="about-grid">
            <div class="about-img-wrap anim from-left">
              <div class="about-frame" id="about-frame">
                <img src="images/about-mountain.jpg" alt="Manu MA at field viewpoint" loading="lazy" />
                <div class="about-overlay"></div>
                <div class="evidence-tag-corner"><i class="bi bi-tag-fill"></i> EVIDENCE #02-FIELD</div>
              </div>
            </div>
            <div>
              <div class="label anim from-up"><i class="bi bi-folder2-open"></i> Agent Dossier</div>
              <div class="rule anim from-up d1"></div>
              <h2 class="display anim from-up d1" style="font-size:clamp(32px,4.5vw,68px);">
                Forensic<br>Rigor Meets <em>Strategy</em>
              </h2>
              <div class="rule anim from-up d2"></div>
              <h3 class="about-h anim from-up d2">
                A Quality Control Systems Investigator who audits processes with forensic precision
                to guarantee zero defect leakage.
              </h3>
              <p class="about-body anim from-up d3">
                Based in India, I've conducted high-stakes quality audits across banking, automotive, and industrial sectors
                — inspecting operational workflows against ISO and statutory benchmarks.
                Backed by a First Class engineering degree from Maria College of Engineering &amp; Technology,
                I deploy systematic root-cause investigation methodologies to fortify systems.
              </p>
              <div class="about-facts anim from-up d3">
                <div class="fact">
                  <div class="fact-l"><i class="bi bi-geo-alt-fill"></i> Field Location</div>
                  <div class="fact-v">Kerala, India</div>
                </div>
                <div class="fact">
                  <div class="fact-l"><i class="bi bi-mortarboard-fill"></i> Engineering Degree</div>
                  <div class="fact-v">B.E. — 80% First Class</div>
                </div>
                <div class="fact">
                  <div class="fact-l"><i class="bi bi-shield-check"></i> Quality Credential</div>
                  <div class="fact-v">Tisat 2019 Certified</div>
                </div>
                <div class="fact">
                  <div class="fact-l"><i class="bi bi-fingerprint"></i> Specialization</div>
                  <div class="fact-v">Zero-Defect Systems</div>
                </div>
              </div>
              <a href="#work-mount" class="btn btn-cyan anim from-up d4" style="display:inline-flex;width:fit-content;">
                <i class="bi bi-folder-check"></i> Inspect Solved Cases →
              </a>
            </div>
          </div>
        </div>
      </section>
    `;

    const frame = document.getElementById('about-frame');
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
