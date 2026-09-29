// src/components/Process.js
// 5-Stage Crime Scene & Forensic Quality Investigation Methodology

export default class Process {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;

    const steps = [
      {
        n: '01',
        icon: 'bi-search',
        t: 'Crime Scene Discovery & Defect Mapping',
        d: 'Deploy forensic audit tools to isolate failure modes, inspect assembly tolerances, and establish baseline defect parameters using structured diagnostic frameworks.',
      },
      {
        n: '02',
        icon: 'bi-shield-lock',
        t: 'Statutory Standards & ISO Alignment',
        d: 'Benchmark workflows against ISO 9001 and high-security compliance mandates. Implement tamper-proof process checkpoints and chain-of-custody documentation.',
      },
      {
        n: '03',
        icon: 'bi-cpu',
        t: 'Forensic Process Engineering',
        d: 'Design defensive quality control architectures — from automated optical verification to real-time telemetry. Neutralize systemic vulnerabilities before production release.',
      },
      {
        n: '04',
        icon: 'bi-crosshair',
        t: 'Ballistic Stress & Non-Destructive Testing',
        d: 'Execute rigorous environmental stress cycles with documented forensic evidence. Statistical failure prediction, gauge repeatability analysis, and corrective countermeasures.',
      },
      {
        n: '05',
        icon: 'bi-patch-check-fill',
        t: 'Case Clearance & Continuous Monitoring',
        d: 'Formal case closure with comprehensive audit dossiers, personnel capability training, and live telemetry to maintain zero-defect standards permanently.',
      },
    ];

    const stepsHTML = steps.map(s => `
      <div class="pstep anim from-up">
        <div class="pstep-n">${s.n}</div>
        <div>
          <h3 class="pstep-t"><i class="bi ${s.icon}"></i> ${s.t}</h3>
          <p class="pstep-d">${s.d}</p>
        </div>
      </div>
    `).join('');

    el.innerHTML = `
      <section class="process section" id="process" aria-labelledby="proc-h">
        <div class="wrap">
          <div class="process-grid">
            <div class="process-sticky">
              <div class="label anim from-up"><i class="bi bi-diagram-3"></i> Investigation Methodology</div>
              <div class="rule anim from-up d1"></div>
              <h2 id="proc-h" class="display anim from-up d1">How Cases<br>Are <em>Solved</em></h2>
              <div class="process-img anim from-fade d2">
                <img src="images/process-hammock.jpg"
                     alt="Manu MA strategizing quality control"
                     loading="lazy" />
                <div class="process-img-lbl"><i class="bi bi-eye"></i> SYSTEM SURVEILLANCE // DISCIPLINED FORENSICS</div>
              </div>
            </div>
            <div>
              ${stepsHTML}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
