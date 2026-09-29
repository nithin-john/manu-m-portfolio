// src/components/Services.js
// Specialized Forensic & Quality Audit Protocols

export default class Services {
  constructor(sel) { this.sel = sel; }

  mount() {
    const el = document.querySelector(this.sel);
    if (!el) return;

    const svcs = [
      {
        icon: 'bi-fingerprint',
        t: 'Forensic Quality Control & Defect Trace',
        d: 'End-to-end QC architecture design, inspection protocol development, and live defect interception across manufacturing and enterprise operations.',
        n: '01',
      },
      {
        icon: 'bi-shield-lock',
        t: 'ISO 9001 & Statutory Audits',
        d: 'Full compliance audits, forensic vulnerability analysis, and zero-defect implementation aligned with international regulatory frameworks.',
        n: '02',
      },
      {
        icon: 'bi-graph-up-arrow',
        t: 'Statistical Crime & Defect Analytics',
        d: 'Statistical process control (SPC), trend anomaly identification, and real-time executive telemetry dashboards converting raw data into actionable defenses.',
        n: '03',
      },
      {
        icon: 'bi-cpu',
        t: 'Process Engineering & Defect Prevention',
        d: 'Operational workflow mapping, bottleneck removal, and root-cause failure elimination to maintain continuous first-pass yield.',
        n: '04',
      },
      {
        icon: 'bi-people',
        t: 'Quality Squad Training & Capability',
        d: 'Customized forensic quality training programmes, statutory awareness workshops, and capability building for engineering taskforces.',
        n: '05',
      },
      {
        icon: 'bi-incognito',
        t: 'Creative Tech & Systems Investigation',
        d: 'Bridging technical engineering standards with futuristic creative execution — digital architecture verification and zero-tolerance quality consulting.',
        n: '06',
      },
    ];

    el.innerHTML = `
      <section class="services section" id="services" aria-labelledby="svc-h">
        <div class="wrap">
          <div class="label anim from-up"><i class="bi bi-shield-shaded"></i> Operational Services</div>
          <div class="rule anim from-up d1"></div>
          <h2 id="svc-h" class="display anim from-up d1">Forensic <em>Services</em></h2>
          <div class="services-grid">
            ${svcs.map(s => `
              <div class="svc-card anim from-up">
                <div class="svc-ic"><i class="bi ${s.icon}"></i></div>
                <h3 class="svc-t">${s.t}</h3>
                <p class="svc-d">${s.d}</p>
                <div class="svc-num" aria-hidden="true">${s.n}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
