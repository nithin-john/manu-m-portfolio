/**
 * AIRevealPortrait.js
 * Holographic 3D Laser Scanner Engine (Transparent PNG Cutout - Zero Bubble Effect)
 * 
 * Features:
 * - Transparent PNG cutouts seamlessly blending into dark hero banner
 * - Directional holographic vertical laser scan plane (NO circular bubbles)
 * - 3D parallax tilt and perspective depth
 * - Atmospheric 3D cyan/violet backlight
 * - Laser beam emission particles & telemetry guide ticks
 * - Embedded Base64 fallback for 100% fail-safe rendering
 */

import { PROFILE_HUMAN_PNG, PROFILE_AI_PNG } from "../data/imagesBase64.js";

export class AIRevealPortrait {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.cleanSrc = options.cleanSrc || "images/profile.png";
    this.aiSrc = options.aiSrc || "images/profile-ai.png";

    this.width = 440;
    this.height = 640;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Physics & Scan State
    this.mouse = { x: 220, y: 320, inside: false };
    this.lerpPos = { x: 220, y: 320 };
    this.tilt = { x: 0, y: 0, currentX: 0, currentY: 0 };
    this.revealIntensity = 0; // 0 (human) to 1 (active laser scan)
    this.targetIntensity = 0;

    // Laser particles system
    this.particles = [];
    this.maxParticles = 35;

    // Time & Animation
    this.animFrameId = null;
    this.time = 0;

    this.init();
  }

  init() {
    this.buildDOM();
    this.setupEvents();
    this.resizeCanvas();
    this.startLoop();
    this.triggerLaserSweepDemo();
  }

  buildDOM() {
    this.container.innerHTML = `
      <div id="portrait-stage-mount" style="position:relative; width:100%; display:flex; justify-content:center;">
        <!-- Atmospheric 3D Ambient Backlight -->
        <div class="portrait-ambient-backlight" aria-hidden="true"></div>

        <div class="portrait-frame" id="portrait-frame">
          <!-- 3D Specular Light Sheen -->
          <div class="portrait-3d-sheen" id="portrait-sheen"></div>

          <!-- Base Clean Portrait Layer (Human Cutout PNG) -->
          <img 
            src="${this.cleanSrc}" 
            alt="Manu MA - Professional Human Portrait" 
            class="portrait-layer-clean" 
            id="img-clean" 
          />
          
          <!-- Hidden Futuristic AI Layer (Laser Revealed Cutout PNG) -->
          <img 
            src="${this.aiSrc}" 
            alt="Manu MA - Futuristic AI Identity" 
            class="portrait-layer-ai" 
            id="img-ai" 
          />

          <!-- Hardware-Accelerated Interactive Canvas (Laser Beam, Particles, Telemetry) -->
          <canvas class="portrait-canvas-overlay" id="portrait-canvas"></canvas>

          <!-- Reveal Instruction Pill -->
          <div class="reveal-hint-pill" id="reveal-hint" style="background:rgba(8,10,14,0.8); border:1px solid rgba(0,240,255,0.3);">
            <span class="hint-icon" style="color:#00f0ff;">⚡</span>
            <span>MOVE CURSOR TO ACTIVATE 3D LASER SCAN</span>
          </div>

          <!-- Realtime Telemetry Strip -->
          <div class="portrait-telemetry-badge" style="background:rgba(8,10,14,0.7); border:1px solid rgba(255,255,255,0.06);">
            <span class="portrait-status-active" id="telemetry-mode">IDENTITY: HUMAN</span>
            <span id="telemetry-coords">SCAN: INACTIVE</span>
            <span>SYS: MMA-96</span>
          </div>
        </div>
      </div>
    `;

    this.frame = this.container.querySelector("#portrait-frame");
    this.imgClean = this.container.querySelector("#img-clean");
    this.imgAi = this.container.querySelector("#img-ai");
    this.canvas = this.container.querySelector("#portrait-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.hintPill = this.container.querySelector("#reveal-hint");
    this.telemetryMode = this.container.querySelector("#telemetry-mode");
    this.telemetryCoords = this.container.querySelector("#telemetry-coords");

    // Fail-safe image fallback handlers: if local file fails, use embedded base64 PNG
    this.imgClean.onerror = () => {
      console.warn("[IMG] Clean PNG fallback to embedded asset.");
      this.imgClean.src = PROFILE_HUMAN_PNG;
    };

    this.imgAi.onerror = () => {
      console.warn("[IMG] AI PNG fallback to embedded asset.");
      this.imgAi.src = PROFILE_AI_PNG;
    };
  }

  setupEvents() {
    // Mouse Enter / Move / Leave
    this.frame.addEventListener("mouseenter", (e) => {
      this.mouse.inside = true;
      this.targetIntensity = 1;
      this.updateCursorPosition(e);
      if (this.hintPill) this.hintPill.classList.add("faded");
      if (this.telemetryMode) {
        this.telemetryMode.innerHTML = `<span style="color:#00f0ff;">[3D LASER SCAN: ACTIVE]</span>`;
      }
      window.dispatchEvent(new CustomEvent("portrait-hover-start"));
    });

    this.frame.addEventListener("mousemove", (e) => {
      this.updateCursorPosition(e);
    });

    this.frame.addEventListener("mouseleave", () => {
      this.mouse.inside = false;
      this.targetIntensity = 0;
      this.tilt.x = 0;
      this.tilt.y = 0;
      if (this.hintPill) this.hintPill.classList.remove("faded");
      if (this.telemetryMode) {
        this.telemetryMode.textContent = "IDENTITY: HUMAN";
      }
      window.dispatchEvent(new CustomEvent("portrait-hover-end"));
    });

    // Touch Support for Mobile
    this.frame.addEventListener("touchstart", (e) => {
      this.mouse.inside = true;
      this.targetIntensity = 1;
      this.updateTouchPosition(e);
      if (this.hintPill) this.hintPill.classList.add("faded");
      if (this.telemetryMode) {
        this.telemetryMode.innerHTML = `<span style="color:#00f0ff;">[3D LASER SCAN: ACTIVE]</span>`;
      }
    }, { passive: true });

    this.frame.addEventListener("touchmove", (e) => {
      this.updateTouchPosition(e);
    }, { passive: true });

    this.frame.addEventListener("touchend", () => {
      this.mouse.inside = false;
      this.targetIntensity = 0;
      this.tilt.x = 0;
      this.tilt.y = 0;
      if (this.hintPill) this.hintPill.classList.remove("faded");
      if (this.telemetryMode) {
        this.telemetryMode.textContent = "IDENTITY: HUMAN";
      }
    }, { passive: true });

    // Window Resize
    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
  }

  updateCursorPosition(e) {
    const rect = this.frame.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    this.mouse.x = x;
    this.mouse.y = y;

    // Calculate 3D Parallax Tilt (-1 to 1)
    this.tilt.x = (x / rect.width - 0.5) * 2;
    this.tilt.y = (y / rect.height - 0.5) * 2;

    // Emit laser sparks along the vertical beam
    if (this.particles.length < this.maxParticles && Math.random() > 0.3) {
      this.spawnLaserParticle(x, y);
    }

    if (this.telemetryCoords) {
      const scanPct = Math.round((x / rect.width) * 100);
      this.telemetryCoords.textContent = `PLANE: ${scanPct}% // Y: ${Math.round(y)}px`;
    }
  }

  updateTouchPosition(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = this.frame.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));
      this.mouse.x = x;
      this.mouse.y = y;
      this.tilt.x = (x / rect.width - 0.5) * 1.5;
      this.tilt.y = (y / rect.height - 0.5) * 1.5;
      this.spawnLaserParticle(x, y);

      if (this.telemetryCoords) {
        const scanPct = Math.round((x / rect.width) * 100);
        this.telemetryCoords.textContent = `PLANE: ${scanPct}% // Y: ${Math.round(y)}px`;
      }
    }
  }

  spawnLaserParticle(laserX, cursorY) {
    // Spawn particles distributed along the vertical laser plane near cursor
    const yOffset = (Math.random() - 0.5) * 140;
    const py = Math.max(40, Math.min(this.height - 60, cursorY + yOffset));
    const vx = (Math.random() - 0.5) * 3;
    const vy = (Math.random() - 0.5) * 2;

    this.particles.push({
      x: laserX + (Math.random() - 0.5) * 6,
      y: py,
      vx: vx,
      vy: vy,
      size: 1 + Math.random() * 2.5,
      alpha: 0.9,
      decay: 0.025 + Math.random() * 0.03,
      color: Math.random() > 0.25 ? "#00f0ff" : "#8a2be2"
    });
  }

  resizeCanvas() {
    if (!this.frame || !this.canvas) return;
    const rect = this.frame.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  }

  triggerLaserSweepDemo() {
    // Initial gentle laser sweep on page load to reveal the 3D identity
    setTimeout(() => {
      if (!this.mouse.inside) {
        this.targetIntensity = 0.85;
        this.mouse.x = this.width * 0.55;
        this.mouse.y = this.height * 0.35;
        setTimeout(() => {
          if (!this.mouse.inside) {
            this.targetIntensity = 0;
          }
        }, 1400);
      }
    }, 800);
  }

  startLoop() {
    const loop = () => {
      this.updatePhysics();
      this.render();
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  updatePhysics() {
    this.time += 0.035;

    // Smooth inertia interpolation (Lerp factor)
    const lerpFactor = 0.15;
    this.lerpPos.x += (this.mouse.x - this.lerpPos.x) * lerpFactor;
    this.lerpPos.y += (this.mouse.y - this.lerpPos.y) * lerpFactor;

    // 3D Parallax Tilt Lerp
    this.tilt.currentX += (this.tilt.x - this.tilt.currentX) * 0.1;
    this.tilt.currentY += (this.tilt.y - this.tilt.currentY) * 0.1;

    // Apply 3D Perspective Tilt on the Frame
    if (this.frame) {
      const rotY = this.tilt.currentX * 10; // deg
      const rotX = -this.tilt.currentY * 10; // deg
      this.frame.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      
      const sheenX = ((this.tilt.currentX * 0.5 + 0.5) * 100).toFixed(1);
      const sheenY = ((this.tilt.currentY * 0.5 + 0.5) * 100).toFixed(1);
      this.frame.style.setProperty('--sheen-x', `${sheenX}%`);
      this.frame.style.setProperty('--sheen-y', `${sheenY}%`);
    }

    // Intensity fade in / fade out lerp
    this.revealIntensity += (this.targetIntensity - this.revealIntensity) * 0.12;

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const laserX = this.lerpPos.x;
    const cursorY = this.lerpPos.y;
    const intensity = this.revealIntensity;

    // 1. UPDATE DIRECTIONAL LINEAR MASK ON AI IMAGE (NO BUBBLE)
    // Linear gradient reveal along laser X axis with soft 30px feathering
    if (this.imgAi) {
      if (intensity > 0.005) {
        const feather = 30;
        const x1 = Math.max(0, laserX - feather);
        const x2 = Math.min(this.width, laserX + 10);
        const maskVal = `linear-gradient(to right, black 0%, black ${x1}px, rgba(0,0,0,0.4) ${laserX}px, transparent ${x2}px)`;
        this.imgAi.style.webkitMaskImage = maskVal;
        this.imgAi.style.maskImage = maskVal;
        this.imgAi.style.opacity = `${intensity}`;
      } else {
        this.imgAi.style.opacity = "0";
      }
    }

    if (intensity <= 0.005) {
      return;
    }

    // 2. RENDER HOLOGRAPHIC VERTICAL LASER SCAN LINE (NO BUBBLE)
    ctx.save();
    ctx.globalAlpha = intensity;

    // Laser beam vertical glow
    const laserGlow = ctx.createLinearGradient(laserX - 16, 0, laserX + 16, 0);
    laserGlow.addColorStop(0, "rgba(0, 240, 255, 0)");
    laserGlow.addColorStop(0.35, "rgba(0, 240, 255, 0.2)");
    laserGlow.addColorStop(0.5, "rgba(0, 240, 255, 0.65)");
    laserGlow.addColorStop(0.65, "rgba(138, 43, 226, 0.2)");
    laserGlow.addColorStop(1, "rgba(0, 240, 255, 0)");

    ctx.fillStyle = laserGlow;
    ctx.fillRect(laserX - 16, 0, 32, this.height);

    // Sharp central laser line
    ctx.strokeStyle = "rgba(0, 240, 255, 0.95)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(laserX, 0);
    ctx.lineTo(laserX, this.height);
    ctx.stroke();

    // Subtle horizontal laser cross-ticks at cursor position
    ctx.strokeStyle = "rgba(0, 240, 255, 0.8)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(laserX - 14, cursorY);
    ctx.lineTo(laserX + 14, cursorY);
    ctx.stroke();

    // Laser guide indicators at top and bottom
    ctx.fillStyle = "#00f0ff";
    ctx.beginPath();
    ctx.moveTo(laserX - 6, 4);
    ctx.lineTo(laserX + 6, 4);
    ctx.lineTo(laserX, 12);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(laserX - 6, this.height - 4);
    ctx.lineTo(laserX + 6, this.height - 4);
    ctx.lineTo(laserX, this.height - 12);
    ctx.closePath();
    ctx.fill();

    // Floating micro telemetry tag along laser beam
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00f0ff";
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = 4;
    ctx.fillText("LASER_SCAN // 3D_ALIGN", laserX + 10, cursorY - 10);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText(`X: ${Math.round(laserX)}px`, laserX + 10, cursorY + 4);

    ctx.restore();

    // 3. RENDER LASER SPARK PARTICLES
    this.renderParticles(ctx);
  }

  renderParticles(ctx) {
    ctx.save();
    for (const p of this.particles) {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }
}
