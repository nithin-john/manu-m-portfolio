// src/components/JellyfishScene.js
// Ultra-smooth Three.js procedural jellyfish floating & swimming across the light portfolio

export default class JellyfishScene {
  constructor() {
    this.canvas = document.getElementById('jellyfish-canvas') || document.getElementById('bats-canvas');
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.jellies = [];
    this.particles = null;
    this.clock = null;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.raf = null;
    this.scrollY = 0;
  }

  init() {
    if (!this.canvas || !window.THREE) return;

    const THREE = window.THREE;
    this.clock = new THREE.Clock();

    // 1. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);

    // 2. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 9);

    // 3. Ambient & Point Lighting (Natural lighting for light aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(4, 8, 6);
    this.scene.add(dirLight);

    const purpleGlow = new THREE.PointLight(0xa855f7, 2.5, 30);
    purpleGlow.position.set(-5, 4, 4);
    this.scene.add(purpleGlow);

    const cyanGlow = new THREE.PointLight(0x0284c7, 2.0, 30);
    cyanGlow.position.set(5, -3, 3);
    this.scene.add(cyanGlow);

    // 4. Subtle Ambient Floating Plankton Particles
    this.createParticles(THREE, 120);

    // 5. Create Jellyfish fleet
    this.createJellies(THREE, 7);

    // 6. Interactive Event Listeners
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    // 7. Render Loop
    this.animate();
  }

  createParticles(THREE, count) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x8b0000,
      size: 0.05,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  createJellies(THREE, count) {
    // Rich jewel and crimson translucent tones that contrast with light background
    const palette = [
      { cap: 0x8b0000, tent: 0xa80010, glow: 0xd90429 }, // Blood Red
      { cap: 0x7c3aed, tent: 0x6d28d9, glow: 0xa855f7 }, // Amethyst Violet
      { cap: 0x0284c7, tent: 0x0369a1, glow: 0x38bdf8 }, // Deep Ocean Blue
      { cap: 0xbe185d, tent: 0x9d174d, glow: 0xf43f5e }, // Ruby Rose
      { cap: 0x4f46e5, tent: 0x4338ca, glow: 0x818cf8 }, // Indigo
      { cap: 0x0f766e, tent: 0x115e59, glow: 0x14b8a6 }, // Emerald Teal
      { cap: 0x991b1b, tent: 0x7f1d1d, glow: 0xef4444 }, // Deep Crimson
    ];

    const initialPositions = [
      { x: -4.0, y:  2.0, z:  0.2, scale: 0.44 },
      { x:  3.5, y: -2.2, z: -0.5, scale: 0.48 },
      { x: -1.5, y: -4.8, z: -1.5, scale: 0.38 },
      { x:  4.2, y:  3.8, z: -1.0, scale: 0.40 },
      { x: -4.2, y: -1.0, z: -0.2, scale: 0.46 },
      { x:  2.0, y:  2.5, z:  0.8, scale: 0.42 },
      { x:  0.4, y: -0.8, z: -1.8, scale: 0.36 },
    ];

    for (let i = 0; i < count; i++) {
      const col = palette[i % palette.length];
      const cfg = initialPositions[i % initialPositions.length];
      const scale = cfg.scale * (0.9 + Math.random() * 0.25);
      const jelly = this.buildJelly(THREE, col, scale);

      jelly.group.position.set(cfg.x, cfg.y, cfg.z);

      // Swimming dynamics
      jelly.phase = Math.random() * Math.PI * 2;
      jelly.speed = 0.5 + Math.random() * 0.3;
      jelly.baseY = cfg.y;
      jelly.baseX = cfg.x;
      jelly.swimDir = new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        0.5 + Math.random() * 0.4,
        (Math.random() - 0.5) * 0.2
      ).normalize();

      this.scene.add(jelly.group);
      this.jellies.push(jelly);
    }
  }

  buildJelly(THREE, colors, scale) {
    const group = new THREE.Group();

    // ── 1. Bell (Outer Translucent Umbrella) ────────────────────
    const bellGeo = new THREE.SphereGeometry(1, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.54);
    const pos = bellGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const r = Math.sqrt(x * x + z * z);
      // Bell curvature flared rim
      const flare = r * r * 0.36;
      pos.setY(i, y - flare);
    }
    bellGeo.computeVertexNormals();

    const bellMat = new THREE.MeshPhysicalMaterial({
      color: colors.cap,
      transparent: true,
      opacity: 0.65, // Rich opacity for light background
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.45,
      thickness: 0.6,
      ior: 1.33,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const bell = new THREE.Mesh(bellGeo, bellMat);
    group.add(bell);

    // ── 2. Inner Organelle Dome ─────────────────────────────────
    const innerGeo = new THREE.SphereGeometry(0.55, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const innerMat = new THREE.MeshBasicMaterial({
      color: colors.glow,
      transparent: true,
      opacity: 0.45,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // ── 3. Outer Rim Ring ───────────────────────────────────────
    const rimGeo = new THREE.TorusGeometry(0.97, 0.035, 10, 52);
    const rimMat = new THREE.MeshBasicMaterial({
      color: colors.tent,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -0.36;
    group.add(rim);

    // ── 4. Flowing Tentacles ────────────────────────────────────
    const tentacles = [];
    const tentCount = 16;
    for (let t = 0; t < tentCount; t++) {
      const angle = (t / tentCount) * Math.PI * 2;
      const isInner = t % 2 === 0;
      const radius = isInner ? 0.45 : 0.82;
      const length = 2.4 + Math.random() * 1.5;
      const segments = 16;

      const tentGeo = new THREE.BufferGeometry();
      const verts = new Float32Array((segments + 1) * 3);

      for (let s = 0; s <= segments; s++) {
        const norm = s / segments;
        verts[s * 3 + 0] = Math.cos(angle) * radius;
        verts[s * 3 + 1] = -norm * length;
        verts[s * 3 + 2] = Math.sin(angle) * radius;
      }
      tentGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));

      const tentMat = new THREE.LineBasicMaterial({
        color: isInner ? colors.glow : colors.tent,
        transparent: true,
        opacity: isInner ? 0.7 : 0.5,
        linewidth: 1,
      });

      const tentLine = new THREE.Line(tentGeo, tentMat);
      tentLine.position.y = -0.36;
      group.add(tentLine);

      tentacles.push({
        line: tentLine,
        geo: tentGeo,
        angle,
        radius,
        length,
        segments,
        phase: Math.random() * Math.PI * 2,
      });
    }

    group.scale.setScalar(scale);

    return { group, bell, bellMat, inner, tentacles, scale };
  }

  animate() {
    this.raf = requestAnimationFrame(() => this.animate());
    const t = this.clock.getElapsedTime();

    // Smooth cursor lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;

    this.camera.position.x = this.mouse.x * 0.5;
    this.camera.position.y = this.mouse.y * 0.35;
    this.camera.lookAt(0, 0, 0);

    const scrollOffset = this.scrollY * 0.0018;

    // Plankton drift
    if (this.particles) {
      const pAttr = this.particles.geometry.attributes.position;
      for (let i = 0; i < pAttr.count; i++) {
        let py = pAttr.getY(i) + 0.003;
        if (py > 12) py = -12;
        pAttr.setY(i, py);
      }
      pAttr.needsUpdate = true;
      this.particles.position.y = scrollOffset * 0.5;
    }

    // Animate each jellyfish
    const boundsY = 10;
    this.jellies.forEach((jelly) => {
      const phase = jelly.phase;
      const speed = jelly.speed;

      // Pulse expansion & propulsion
      const rawPulse = Math.sin(t * speed * 2.2 + phase);
      const isThrust = rawPulse > 0.2;
      const pulse = Math.pow(Math.max(0, rawPulse), 1.5);

      // Bell deformation
      const bellScaleY = 0.82 + pulse * 0.38;
      const bellScaleXZ = 1.05 - pulse * 0.16;
      jelly.bell.scale.set(bellScaleXZ, bellScaleY, bellScaleXZ);

      // Propulsion upward drift
      const propulsion = isThrust ? 0.015 * speed : 0.005 * speed;
      jelly.group.position.y += propulsion;

      // Horizontal undulation
      const sway = Math.sin(t * speed * 0.7 + phase) * 0.006;
      jelly.group.position.x += sway;

      // Smooth wrap-around
      const viewY = jelly.group.position.y - scrollOffset;
      if (viewY > boundsY) {
        jelly.group.position.y -= boundsY * 2;
      } else if (viewY < -boundsY) {
        jelly.group.position.y += boundsY * 2;
      }

      // Tilt
      jelly.group.rotation.z = Math.sin(t * speed * 0.8 + phase) * 0.12 + (this.mouse.x * 0.08);
      jelly.group.rotation.x = Math.sin(t * speed * 0.6 + phase * 0.5) * 0.08 - (this.mouse.y * 0.05);

      // Tentacle trailing waves
      jelly.tentacles.forEach((tent) => {
        const geo = tent.geo;
        const posAttr = geo.attributes.position;
        for (let s = 0; s <= tent.segments; s++) {
          const norm = s / tent.segments;
          const waveAmp = norm * 0.24 * (1 + pulse * 0.5);
          const waveFreq = t * speed * 3.2 + tent.phase + norm * Math.PI * 3.5;

          const ox = Math.cos(tent.angle) * tent.radius + Math.sin(waveFreq) * waveAmp;
          const oz = Math.sin(tent.angle) * tent.radius + Math.cos(waveFreq * 0.9 + 1.2) * waveAmp;
          const oy = -norm * tent.length + Math.sin(waveFreq * 0.5) * waveAmp * 0.2;

          posAttr.setX(s, ox);
          posAttr.setZ(s, oz);
          posAttr.setY(s, oy);
        }
        posAttr.needsUpdate = true;
      });
    });

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
