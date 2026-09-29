// src/components/CrimeSceneEngine.js
// Interactive Gotham Crime Scene & Bat-Family Active Investigation Engine
// Features: Batman, Robin, Red Hood, Nightwing, Catwoman, Batman Beyond
// autonomously moving around the website investigating evidence, scanning crime scenes,
// deploying forensic beams, and communicating via tactical comms.

export default class CrimeSceneEngine {
  constructor() {
    this.canvas = document.getElementById('crime-scene-canvas') || document.getElementById('jellyfish-canvas');
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: this.width * 0.5, y: this.height * 0.3, isMoving: false, lastMove: 0 };
    this.raf = null;
    this.scrollY = window.scrollY;

    // Atmospheric Rain & Forensic Mist Particles
    this.particles = [];

    // Temporary Dropped Evidence Markers (by Robin or interaction)
    this.dynamicPins = [];

    // Ballistic Trajectory Lasers
    this.lasers = [
      { startX: 0.08, startY: 0.18, endX: 0.88, endY: 0.42, color: 'rgba(220, 20, 60, 0.45)', pulse: 0, speed: 0.03 },
      { startX: 0.92, startY: 0.22, endX: 0.22, endY: 0.72, color: 'rgba(0, 150, 255, 0.4)',  pulse: 1.5, speed: 0.025 },
      { startX: 0.14, startY: 0.82, endX: 0.78, endY: 0.32, color: 'rgba(255, 0, 50, 0.35)', pulse: 3.0, speed: 0.02 },
      { startX: 0.84, startY: 0.62, endX: 0.32, endY: 0.88, color: 'rgba(0, 200, 100, 0.35)', pulse: 4.5, speed: 0.035 },
    ];

    // Fixed Crime Scene Evidence Markers
    this.evidenceNodes = [
      { id: 'EV-01', label: 'BALLISTIC IMPACT', x: 0.15, y: 0.25, radius: 14 },
      { id: 'EV-02', label: 'LATENT PRINT #9', x: 0.85, y: 0.35, radius: 14 },
      { id: 'EV-03', label: 'SYSTEM INFILTRATION', x: 0.22, y: 0.60, radius: 14 },
      { id: 'EV-04', label: 'DNA MATCH: 99.8%', x: 0.78, y: 0.72, radius: 14 },
      { id: 'EV-05', label: 'TIMELINE BREACH', x: 0.48, y: 0.88, radius: 14 },
    ];

    // Bat-Family Active Roving Operatives Configuration
    this.operativesData = [
      {
        id: 'batman',
        name: 'Batman',
        codename: 'The Dark Knight',
        role: 'Forensic Lead & Root Cause Analysis',
        color: '#111111',
        accent: '#ffe600',
        glow: 'rgba(0, 150, 255, 0.4)',
        beamColor: 'rgba(0, 160, 255, 0.28)',
        icon: 'bi-shield-shaded',
        speed: 1.2,
        initX: 0.20,
        initY: 0.22,
        quotes: [
          'Analyzing ballistic trajectory. Point of origin: rooftop.',
          'Latent fingerprint identified. Cross-referencing GCPD files.',
          'Sub-surface fracture detected. Defect vector isolated.',
          'Quality metrics compromised. Zero-tolerance standard initiated.',
          'Triangulating perpetrator exit route. Follow the telemetry.',
        ],
      },
      {
        id: 'nightwing',
        name: 'Nightwing',
        codename: 'Dick Grayson',
        role: 'Acrobatic Recon & Perimeter Security',
        color: '#0055ff',
        accent: '#00d4ff',
        glow: 'rgba(0, 212, 255, 0.5)',
        beamColor: 'rgba(0, 212, 255, 0.28)',
        icon: 'bi-radar',
        speed: 1.5,
        initX: 0.75,
        initY: 0.18,
        quotes: [
          'Acrobatic perimeter sweep complete. Rooftop access sealed.',
          'Found scuff marks on ventilation grille. High-agility suspect.',
          'Escaped via service conduit. Relaying coordinates to Batman.',
          'Process workflow verified. Operating within certified tolerances.',
        ],
      },
      {
        id: 'redhood',
        name: 'Red Hood',
        codename: 'Jason Todd',
        role: 'Ballistics & Stress Impact Forensics',
        color: '#c00000',
        accent: '#ff2222',
        glow: 'rgba(220, 20, 20, 0.55)',
        beamColor: 'rgba(255, 30, 30, 0.32)',
        icon: 'bi-crosshair',
        speed: 1.3,
        initX: 0.35,
        initY: 0.55,
        quotes: [
          'Recovered 9mm casing at EV-01. Professional double-tap pattern.',
          'Structural impact exceeded 1,200 MPa. High-caliber penetration.',
          'Ballistics trajectory verified. Keep your head down.',
          'Thermal powder residue is fresh. They were here 12 minutes ago.',
        ],
      },
      {
        id: 'robin',
        name: 'Robin',
        codename: 'Damian Wayne',
        role: 'Cryptographic Audit & Evidence Tagging',
        color: '#00aa44',
        accent: '#ffe600',
        glow: 'rgba(0, 180, 80, 0.5)',
        beamColor: 'rgba(0, 200, 100, 0.28)',
        icon: 'bi-terminal',
        speed: 1.4,
        initX: 0.65,
        initY: 0.48,
        quotes: [
          'Evidence Marker planted. Chain of custody cryptographically signed.',
          'Harvested soil residue. Traces match Gotham industrial dockyard.',
          'Firewall audit log decrypted. Unauthorized key exchange flagged.',
          'DNA sequencing complete: 99.8% match confidence.',
        ],
      },
      {
        id: 'catwoman',
        name: 'Catwoman',
        codename: 'Selina Kyle',
        role: 'Infiltration Vectors & Physical QC Audit',
        color: '#8b008b',
        accent: '#c084fc',
        glow: 'rgba(192, 132, 252, 0.5)',
        beamColor: 'rgba(192, 132, 252, 0.28)',
        icon: 'bi-eye',
        speed: 1.2,
        initX: 0.82,
        initY: 0.68,
        quotes: [
          'High-security vault lock was cracked without tripping the alarms.',
          'Found the encrypted micro-drive hidden behind the panel.',
          'Laser tripwire bypassed using frequency jammer. Clever.',
          'Prowling perimeter. Physical QC tolerances passed with style.',
        ],
      },
      {
        id: 'batman-beyond',
        name: 'Batman Beyond',
        codename: 'Terry McGinnis',
        role: 'Nanotech Metrology & Future-Tech Analysis',
        color: '#e50914',
        accent: '#ff0033',
        glow: 'rgba(255, 0, 50, 0.6)',
        beamColor: 'rgba(255, 20, 40, 0.32)',
        icon: 'bi-cpu',
        speed: 1.7,
        initX: 0.45,
        initY: 0.80,
        quotes: [
          'WayneTech cyber-link active. Sub-micron dimensional scan logged.',
          'Nanotech sensor array detecting residual thermal footprints.',
          'Cybernetic thrusters at 85%. Aerial scanning grid synchronized.',
          'Future-tech metrology confirms zero-defect standard.',
        ],
      },
    ];

    this.roamingSquad = [];
    this.squadLayer = null;
  }

  init() {
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.onResize();

    // Atmosphere rain & forensic dust
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        len: 12 + Math.random() * 20,
        speed: 4 + Math.random() * 5,
      });
    }

    // Event Listeners
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isMoving = true;
      this.mouse.lastMove = performance.now();
    }, { passive: true });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    // Mount the Roving Bat-Family Squad onto DOM
    this.mountRovingSquad();

    // Start render loop
    this.animate();
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  // Find dynamic targets on screen (evidence markers, project cards, headers, cursor)
  getRandomTarget(agentId) {
    const targets = [];

    // 1. Evidence marker screen positions
    this.evidenceNodes.forEach(ev => {
      targets.push({
        x: ev.x * this.width,
        y: ev.y * this.height,
        label: ev.id,
      });
    });

    // 2. Dynamic dropped pins
    this.dynamicPins.forEach(pin => {
      targets.push({ x: pin.x, y: pin.y, label: pin.id });
    });

    // 3. User cursor (if recently moved)
    if (performance.now() - this.mouse.lastMove < 4000) {
      targets.push({
        x: Math.max(60, Math.min(this.width - 60, this.mouse.x + (Math.random() - 0.5) * 160)),
        y: Math.max(60, Math.min(this.height - 60, this.mouse.y + (Math.random() - 0.5) * 160)),
        label: 'CURSOR TELEMETRY',
      });
    }

    // 4. Random perimeter patrol points
    targets.push({
      x: 80 + Math.random() * (this.width - 160),
      y: 90 + Math.random() * (this.height - 180),
      label: 'PERIMETER SWEEP',
    });

    // Pick a random target
    return targets[Math.floor(Math.random() * targets.length)];
  }

  mountRovingSquad() {
    // Remove legacy HUD if present
    const legacyHud = document.getElementById('bat-family-hud');
    if (legacyHud) legacyHud.remove();

    // Remove existing layer if any
    let layer = document.getElementById('bat-squad-layer');
    if (layer) layer.remove();

    layer = document.createElement('div');
    layer.id = 'bat-squad-layer';
    layer.className = 'bat-squad-layer';
    layer.setAttribute('aria-label', 'Bat-Family Crime Scene Investigation Squad');
    document.body.appendChild(layer);
    this.squadLayer = layer;

    // Initialize each operative
    this.roamingSquad = this.operativesData.map(data => {
      const initialX = data.initX * this.width;
      const initialY = data.initY * this.height;

      // Create operative DOM element
      const el = document.createElement('div');
      el.className = `mini-operative op-${data.id}`;
      el.id = `op-agent-${data.id}`;
      el.setAttribute('data-agent', data.name);
      el.setAttribute('title', `${data.name} // ${data.role} (Click to trigger tactical pulse)`);

      el.innerHTML = `
        <div class="mini-op-wrap">
          <div class="mini-scan-beam" style="--beam-color: ${data.beamColor};"></div>
          <div class="mini-op-body" style="--op-accent: ${data.accent}; --op-glow: ${data.glow};">
            <div class="mini-op-ears ears-${data.id}"></div>
            <div class="mini-op-avatar">
              <i class="bi ${data.icon}"></i>
            </div>
            ${data.id === 'batman-beyond' ? '<div class="mini-op-thrusters"><span class="flame flame-l"></span><span class="flame flame-r"></span></div>' : ''}
            ${data.id === 'batman' ? '<div class="mini-op-cape"></div>' : ''}
          </div>
          <div class="mini-op-nametag">
            <span class="nametag-dot" style="background:${data.accent};"></span>
            <span class="nametag-text">${data.name}</span>
          </div>
          <div class="mini-comms-bubble" id="bubble-${data.id}">
            <div class="bubble-header">
              <i class="bi bi-broadcast"></i>
              <span>${data.name.toUpperCase()} // FORENSIC LOG</span>
            </div>
            <div class="bubble-body">Scanning...</div>
          </div>
        </div>
      `;

      layer.appendChild(el);

      const agent = {
        ...data,
        el,
        bubbleEl: el.querySelector('.mini-comms-bubble'),
        bubbleBody: el.querySelector('.bubble-body'),
        beamEl: el.querySelector('.mini-scan-beam'),
        x: initialX,
        y: initialY,
        targetX: initialX,
        targetY: initialY,
        targetLabel: 'CRIME PERIMETER',
        facing: 1,
        state: 'PATROL', // 'PATROL' | 'SCAN' | 'ACTION'
        timer: Math.floor(Math.random() * 120),
        quoteIdx: 0,
        isHovered: false,
        isInteracting: false,
      };

      // Set first target
      const t = this.getRandomTarget(agent.id);
      agent.targetX = t.x;
      agent.targetY = t.y;
      agent.targetLabel = t.label;

      // Mouse Hover: Stop & inspect cursor coordinates
      el.addEventListener('mouseenter', () => {
        agent.isHovered = true;
        this.triggerComms(agent, `Inspecting user telemetry. Status: ${agent.role}`);
      });

      el.addEventListener('mouseleave', () => {
        agent.isHovered = false;
        setTimeout(() => {
          if (!agent.isHovered && agent.state !== 'SCAN') {
            agent.bubbleEl.classList.remove('active');
          }
        }, 1200);
      });

      // Click: Execute signature crime investigation action!
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.triggerSpecialAction(agent);
      });

      return agent;
    });
  }

  triggerComms(agent, customText = null) {
    if (!agent.bubbleEl || !agent.bubbleBody) return;
    const text = customText || agent.quotes[agent.quoteIdx % agent.quotes.length];
    agent.quoteIdx++;
    agent.bubbleBody.textContent = text;
    agent.bubbleEl.classList.add('active');
  }

  hideComms(agent) {
    if (agent.bubbleEl && !agent.isHovered) {
      agent.bubbleEl.classList.remove('active');
    }
  }

  triggerSpecialAction(agent) {
    agent.isInteracting = true;
    agent.state = 'ACTION';
    agent.timer = 180;

    // Special signature actions per character
    if (agent.id === 'batman') {
      this.triggerComms(agent, 'TACTICAL BATSIGNAL DEPLOYED. Triangulating primary suspect.');
      // Zip across screen
      agent.targetX = Math.random() > 0.5 ? this.width * 0.8 : this.width * 0.2;
      agent.targetY = Math.random() > 0.5 ? this.height * 0.7 : this.height * 0.25;
    } else if (agent.id === 'robin') {
      // Drop an evidence marker right here!
      const newPinId = `EV-0${this.evidenceNodes.length + this.dynamicPins.length + 1}`;
      this.dynamicPins.push({
        id: newPinId,
        label: 'RESIDUE SAMPLE',
        x: agent.x,
        y: agent.y,
        radius: 12,
      });
      this.triggerComms(agent, `Secured fresh Evidence Pin [${newPinId}] at coordinates.`);
    } else if (agent.id === 'redhood') {
      this.triggerComms(agent, 'BALLISTIC BURST: Trajectory vector locked. Target pinpointed.');
    } else if (agent.id === 'nightwing') {
      this.triggerComms(agent, 'AERIAL SOMERSAULT: Rooftop vantage point re-established.');
      agent.targetY = 80;
    } else if (agent.id === 'catwoman') {
      this.triggerComms(agent, 'STEALTH PURSUIT: Security laser tripped. Moving to vault.');
      agent.targetX = this.width * 0.85;
    } else if (agent.id === 'batman-beyond') {
      this.triggerComms(agent, 'HYPER-THRUSTERS ENGAGED: Scanning Gotham airspace.');
      agent.targetX = Math.random() * this.width;
      agent.targetY = 100;
    }

    // Visual pulse effect
    agent.el.classList.add('action-pulse');
    setTimeout(() => {
      agent.el.classList.remove('action-pulse');
      agent.isInteracting = false;
    }, 1800);
  }

  animate() {
    this.raf = requestAnimationFrame(() => this.animate());
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);
    const time = performance.now() * 0.001;

    // ── 1. Forensic Chalk Floor Grid ──────────────────────────
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.035)';
    ctx.lineWidth = 1;
    const gridSpacing = 80;
    for (let x = 0; x < this.width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // ── 2. Ballistic Trajectory Laser Rays ────────────────────
    this.lasers.forEach(laser => {
      laser.pulse += laser.speed;
      const progress = (Math.sin(laser.pulse) + 1) * 0.5;

      const sx = laser.startX * this.width;
      const sy = (laser.startY * this.height) - (this.scrollY * 0.15) % this.height;
      const ex = laser.endX * this.width;
      const ey = (laser.endY * this.height) - (this.scrollY * 0.15) % this.height;

      ctx.beginPath();
      ctx.strokeStyle = laser.color;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.setLineDash([]);

      const px = sx + (ex - sx) * progress;
      const py = sy + (ey - sy) * progress;
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = laser.color.replace('0.4', '0.9');
      ctx.fill();
    });

    // ── 3. Numbered Evidence Markers (Fixed & Dropped) ────────
    const allMarkers = [
      ...this.evidenceNodes.map(n => ({ ...n, xPx: n.x * this.width, yPx: (n.y * this.height) - (this.scrollY * 0.22) % this.height })),
      ...this.dynamicPins.map(p => ({ ...p, xPx: p.x, yPx: p.y })),
    ];

    allMarkers.forEach((node, idx) => {
      const nx = node.xPx;
      const ny = node.yPx;

      const dist = Math.hypot(this.mouse.x - nx, this.mouse.y - ny);
      const isHovered = dist < 50;

      // Pulse radar circle
      const pulseSize = (node.radius || 12) + Math.sin(time * 3 + idx) * 3;
      ctx.beginPath();
      ctx.arc(nx, ny, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? '#8b0000' : 'rgba(139, 0, 0, 0.35)';
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.stroke();

      // Cone center
      ctx.beginPath();
      ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#8b0000';
      ctx.fill();

      // Yellow Evidence Tag
      ctx.fillStyle = '#ffe600';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.fillRect(nx + 6, ny - 14, 38, 13);
      ctx.strokeRect(nx + 6, ny - 14, 38, 13);

      ctx.font = 'bold 8.5px "Gilroy", sans-serif';
      ctx.fillStyle = '#000000';
      ctx.fillText(node.id, nx + 10, ny - 5);

      if (isHovered) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(nx + 6, ny + 4, 130, 20);
        ctx.strokeStyle = '#8b0000';
        ctx.strokeRect(nx + 6, ny + 4, 130, 20);

        ctx.font = '500 8.5px "Gilroy", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`FORENSIC: ${node.label}`, nx + 12, ny + 17);
      }
    });

    // ── 4. Roving Operatives Autonomous Investigation Loop ─────
    this.roamingSquad.forEach((agent, i) => {
      // Separation from other operatives to avoid stacking
      this.roamingSquad.forEach((other, j) => {
        if (i !== j) {
          const sepDist = Math.hypot(agent.x - other.x, agent.y - other.y);
          if (sepDist < 75 && sepDist > 0) {
            const push = (75 - sepDist) * 0.04;
            agent.x += ((agent.x - other.x) / sepDist) * push;
            agent.y += ((agent.y - other.y) / sepDist) * push;
          }
        }
      });

      // Handle States
      if (agent.isHovered) {
        // Paused on hover, scanning cursor
        agent.facing = this.mouse.x >= agent.x ? 1 : -1;
        agent.beamEl.classList.add('scanning');
      } else if (agent.state === 'PATROL' || agent.state === 'ACTION') {
        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 40) {
          // Reached destination -> Begin forensic scan
          agent.state = 'SCAN';
          agent.timer = 180 + Math.floor(Math.random() * 120); // 3-5 seconds
          agent.beamEl.classList.add('scanning');
          this.triggerComms(agent);
        } else {
          // Move towards target
          const moveSpeed = agent.state === 'ACTION' ? agent.speed * 2.2 : agent.speed;
          agent.vx = (dx / dist) * moveSpeed;
          agent.vy = (dy / dist) * moveSpeed;

          agent.x += agent.vx;
          agent.y += agent.vy;
          agent.facing = agent.vx >= 0 ? 1 : -1;

          agent.beamEl.classList.remove('scanning');
          this.hideComms(agent);
        }
      } else if (agent.state === 'SCAN') {
        agent.timer--;
        agent.beamEl.classList.add('scanning');

        // Draw active laser / forensic scan beam on canvas connecting to target
        ctx.beginPath();
        ctx.strokeStyle = agent.beamColor.replace('0.28', '0.6');
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.moveTo(agent.x + 20 * agent.facing, agent.y + 20);
        ctx.lineTo(agent.targetX, agent.targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Small pulse ripple at scan target
        ctx.beginPath();
        ctx.arc(agent.targetX, agent.targetY, 4 + Math.sin(time * 6) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = agent.accent;
        ctx.stroke();

        if (agent.timer <= 0) {
          // Scan finished -> Pick new target
          agent.state = 'PATROL';
          agent.beamEl.classList.remove('scanning');
          this.hideComms(agent);

          const nextTarget = this.getRandomTarget(agent.id);
          agent.targetX = nextTarget.x;
          agent.targetY = nextTarget.y;
          agent.targetLabel = nextTarget.label;
        }
      }

      // Bound within screen
      agent.x = Math.max(20, Math.min(this.width - 70, agent.x));
      agent.y = Math.max(30, Math.min(this.height - 80, agent.y));

      // Apply transform to DOM element smoothly
      agent.el.style.transform = `translate3d(${agent.x}px, ${agent.y}px, 0) scaleX(${agent.facing})`;

      // Keep speech bubble readable (cancel mirror flip)
      if (agent.bubbleEl) {
        agent.bubbleEl.style.transform = `scaleX(${agent.facing})`;
      }

      // Draw subtle trail on canvas for Batman Beyond rocket boots
      if (agent.id === 'batman-beyond') {
        ctx.beginPath();
        ctx.arc(agent.x - 10 * agent.facing, agent.y + 35, 3 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 30, 20, ${0.4 + Math.random() * 0.4})`;
        ctx.fill();
      }
    });

    // ── 5. Interactive Detective Vision Flashlight Beam ───────
    const grad = ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 10,
      this.mouse.x, this.mouse.y, 220
    );
    grad.addColorStop(0, 'rgba(0, 160, 255, 0.08)');
    grad.addColorStop(0.5, 'rgba(139, 0, 0, 0.04)');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.mouse.x, this.mouse.y, 220, 0, Math.PI * 2);
    ctx.fill();

    // ── 6. Gotham Atmospheric Rain Particles ──────────────────
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.lineWidth = 1;
    this.particles.forEach(p => {
      p.y += p.speed;
      if (p.y > this.height) {
        p.y = -p.len;
        p.x = Math.random() * this.width;
      }
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - 1, p.y + p.len);
      ctx.stroke();
    });
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.squadLayer) this.squadLayer.remove();
  }
}
