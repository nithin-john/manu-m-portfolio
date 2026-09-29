// src/data/portfolio.js — Verified CV Data with Crime Scene & Forensic Theming

export const portfolioData = {
  personal: {
    name: 'Manu MA',
    title: 'Lead Forensic Quality Engineer & Systems Investigator',
    tagline: 'Precision Investigation • Zero-Defect Standards • Bat-Family Audit Protocol',
    location: 'Kerala, India',
    badge: 'CASE ID: QC-2026 // GOTHAM INVESTIGATION PROTOCOL',
  },

  contact: {
    email: 'manuma@email.com',
    phone: '',
    linkedin: '#',
    github: '#',
  },

  // Bat-Family Active Crime Scene Investigation Team
  investigationTeam: [
    {
      name: 'Batman',
      codename: 'The Dark Knight',
      role: 'Lead Detective & Root Cause Analysis',
      icon: 'bi-incognito',
      status: 'FORENSIC SCAN ACTIVE',
      color: '#000000',
      comms: 'Triangulating process defect vectors. Standard compliance verified.',
    },
    {
      name: 'Nightwing',
      codename: 'Dick Grayson',
      role: 'Perimeter Recon & Workflow Surveillance',
      icon: 'bi-radar',
      status: 'AERIAL RECON CLEAR',
      color: '#0055ff',
      comms: 'Sector 4 process line secure. Zero operational deviations detected.',
    },
    {
      name: 'Red Hood',
      codename: 'Jason Todd',
      role: 'Ballistics & Impact Stress Verification',
      icon: 'bi-crosshair',
      status: 'BALLISTICS MAPPED',
      color: '#c00000',
      comms: 'Stress tolerance thresholds tested. Mechanical integrity certified.',
    },
    {
      name: 'Robin',
      codename: 'Damian Wayne',
      role: 'Cryptographic Audit & Data Inspection',
      icon: 'bi-terminal',
      status: 'DECRYPTION LOGGED',
      color: '#00aa44',
      comms: 'Audit trails decrypted and matched against regulatory standards.',
    },
    {
      name: 'Catwoman',
      codename: 'Selina Kyle',
      role: 'Infiltration Vectors & Physical QC Audit',
      icon: 'bi-eye',
      status: 'VAULT INTEGRITY CHECK',
      color: '#8b008b',
      comms: 'Assembly line access pathways examined. Vulnerability surface zero.',
    },
    {
      name: 'Batman Beyond',
      codename: 'Terry McGinnis',
      role: 'Nanotech Metrology & Future-Tech Analysis',
      icon: 'bi-cpu',
      status: 'NANOTECH TELEMETRY ACTIVE',
      color: '#e50914',
      comms: 'Sub-micron dimensional accuracy scan completed. 99.8% precision.',
    },
  ],

  experience: [
    {
      period: '2021 — Present',
      role: 'Quality Control Lead Investigator',
      company: 'State Bank of India (SBI)',
      badge: 'CASE FILE #SBI-QC',
      icon: 'bi-shield-check',
      description:
        'Led forensic quality control operations ensuring total regulatory compliance across banking architectures. Audited branch workflows, established tamper-proof inspection frameworks, and instituted data-driven corrective action protocols across multi-tier banking systems.',
    },
    {
      period: '2019 — 2021',
      role: 'Automotive QA/QC Field Engineer',
      company: 'Concept Bikes',
      badge: 'CASE FILE #CB-AUTO',
      icon: 'bi-tools',
      description:
        'Conducted forensic inspection and quality verification for high-performance automotive assemblies. Developed supplier defect classification systems, managed component stress testing, and reduced field return rates through rigorous root-cause analysis.',
    },
    {
      period: '2019',
      role: 'Tisat Certification Credential',
      company: 'Professional Metrology & Testing Board',
      badge: 'CERTIFICATE #TISAT-2019',
      icon: 'bi-award',
      description:
        'Awarded Tisat quality credential in 2019 — an industry-benchmarked standard for non-destructive testing, dimensional metrology, and statutory regulatory compliance.',
    },
  ],

  education: [
    {
      degree: 'Bachelor of Engineering (B.E.)',
      institution: 'Maria College of Engineering & Technology',
      detail: 'First Class Honours — 80% Aggregate',
      icon: 'bi-mortarboard',
    },
    {
      degree: 'Higher Secondary Scientific Discipline',
      institution: 'Kerala State Board',
      detail: 'Science & Physical Mathematics Stream',
      icon: 'bi-book',
    },
  ],

  projects: [
    {
      id: 'project-01',
      evidenceId: 'EVIDENCE-ITEM #01',
      title: 'SBI Banking QC Architecture',
      subtitle: 'Classified Audit & Forensic Process Control',
      description:
        'Comprehensive forensic quality control system deployed across SBI operational processes. Implemented immutable digital audit trails, automated compliance tracking, and defect interception workflows that elevated audit readiness and regulatory adherence.',
      image: 'public/images/project-01.jpg',
      tags: ['Forensic Audit', 'Banking Compliance', 'Process Design', 'Zero-Defect'],
      crimeIcon: 'bi-shield-shaded',
      investigator: 'Batman & Robin',
    },
    {
      id: 'project-02',
      evidenceId: 'EVIDENCE-ITEM #02',
      title: 'Automotive Assembly QA Protocol',
      subtitle: 'Concept Bikes — Component Stress & Ballistics Analysis',
      description:
        'End-to-end quality assurance system for mechanical automotive sub-assemblies at Concept Bikes. Engineered precision inspection criteria, supplier audit matrices, and forensic failure mode analysis that minimized defect leakage.',
      image: 'public/images/project-02.jpg',
      tags: ['Automotive QA', 'Stress Analysis', 'Supplier Audits', 'Mechanical QC'],
      crimeIcon: 'bi-crosshair',
      investigator: 'Red Hood & Nightwing',
    },
    {
      id: 'project-03',
      evidenceId: 'EVIDENCE-ITEM #03',
      title: 'Tisat Metrology Precision Station',
      subtitle: 'Dimensional Forensics & Calibration Rig',
      description:
        'Engineered an advanced metrology calibration station complying with Tisat dimensional testing benchmarks. Implemented measurement system analysis (MSA), gauge repeatability and reproducibility (GR&R), and sub-millimeter forensic tolerances.',
      image: 'public/images/project-03.jpg',
      tags: ['Metrology', 'Calibration', 'Dimensional Forensics', 'Tisat'],
      crimeIcon: 'bi-search',
      investigator: 'Catwoman & Batman Beyond',
    },
  ],

  skills: [
    // Forensic & Quality Skills
    { name: 'Forensic Quality Control', icon: 'bi-fingerprint', level: 'Master Detective', category: 'forensics' },
    { name: 'ISO 9001 Regulatory Audit', icon: 'bi-shield-lock', level: 'Certified Lead', category: 'forensics' },
    { name: 'Root Cause Crime Analysis', icon: 'bi-search', level: 'Specialist', category: 'forensics' },
    { name: 'Statistical Process Control', icon: 'bi-graph-up-arrow', level: 'Advanced', category: 'forensics' },
    { name: 'Ballistic & Stress Testing', icon: 'bi-crosshair', level: 'Expert', category: 'forensics' },
    { name: 'Dimensional Metrology', icon: 'bi-rulers', level: 'Certified', category: 'forensics' },
    // Technical Investigation
    { name: 'Inspection Protocols', icon: 'bi-clipboard-check', level: 'Master', category: 'technical' },
    { name: 'Defect Fingerprinting', icon: 'bi-incognito', level: 'Specialist', category: 'technical' },
    { name: 'Process Architecture', icon: 'bi-diagram-3', level: 'Advanced', category: 'technical' },
    { name: 'Data Forensics & Analytics', icon: 'bi-terminal', level: 'Advanced', category: 'technical' },
    // Investigation Management
    { name: 'Taskforce Leadership', icon: 'bi-people', level: 'Senior', category: 'management' },
    { name: 'Chain of Custody Dossiers', icon: 'bi-file-earmark-lock', level: 'Forensic', category: 'management' },
    { name: 'Stakeholder Dispatch Comms', icon: 'bi-broadcast-pin', level: 'Direct', category: 'management' },
    { name: 'System Breach Mitigation', icon: 'bi-exclamation-triangle', level: 'Rapid Response', category: 'management' },
  ],
};
