// src/components/BatsScene.js
// Ultra-realistic 3D Bats flight simulation: Black bats and Blood Red bats gliding and swooping in Three.js

export default class BatsScene {
  constructor() {
    this.canvas = document.getElementById('bats-canvas') || document.getElementById('jellyfish-canvas');
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.bats = [];
    this.clock = null;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.raf = null;
    this.scrollY = 0;
  }

  init() {
    if (!this.canvas || !window.THREE) return;

    const THREE = window.THREE;
    this.clock = new THREE.Clock();

    // 1. Transparent WebGL Renderer
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
    this.camera.position.set(0, 0, 11);

    // 3. Cinematic Lighting (Sharp specular highlights across leathery wings)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.1);
    sunLight.position.set(6, 12, 8);
    this.scene.add(sunLight);

    const bloodGlow = new THREE.PointLight(0x8b0000, 2.5, 25);
    bloodGlow.position.set(-6, -2, 5);
    this.scene.add(bloodGlow);

    // 4. Create Limited Fleet of 6 Realistic 3D Bats (3 Black, 3 Blood Red)
    this.createRealBats(THREE, 6);

    // 5. Event Listeners
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    // 6. Start Animation Loop
    this.animate();
  }

  createRealBats(THREE, count) {
    // Elegant starting positions spread comfortably in 3D view
    const waypoints = [
      { x: -5.0, y:  2.8, z: -1.0, isRed: true,  speed: 0.045 },
      { x:  4.2, y: -1.5, z:  0.8, isRed: false, speed: 0.040 },
      { x: -2.0, y: -3.8, z: -2.0, isRed: true,  speed: 0.048 },
      { x:  3.5, y:  3.5, z: -0.5, isRed: false, speed: 0.042 },
      { x: -4.5, y: -0.8, z:  1.2, isRed: false, speed: 0.046 },
      { x:  1.5, y:  1.2, z: -1.5, isRed: true,  speed: 0.044 },
    ];

    for (let i = 0; i < count; i++) {
      const cfg = waypoints[i % waypoints.length];
      const bat = this.buildAnatomicalBat(THREE, cfg.isRed);

      bat.group.position.set(cfg.x, cfg.y, cfg.z);

      // Organic flight characteristics
      bat.speed = cfg.speed;
      bat.flapFreq = 6.5 + (i % 3) * 0.8; // Realistic wingbeat frequency (6-8 Hz)
      bat.phase = (i * Math.PI) / 3;
      bat.wanderAngle = (i * Math.PI) / 2.5;
      bat.wanderSpeed = 0.012 + (i % 2 === 0 ? 0.004 : -0.004);
      bat.divePhase = i * 1.2;
      bat.glideTimer = Math.random() * 5.0; // Intermittent soaring/gliding

      this.scene.add(bat.group);
      this.bats.push(bat);
    }
  }

  buildAnatomicalBat(THREE, isBloodRed) {
    const group = new THREE.Group();

    // Palette: Pitch Black vs Deep Blood Red
    const bodyHex = isBloodRed ? 0x6e0008 : 0x080808;
    const wingHex = isBloodRed ? 0x9b0014 : 0x121212;
    const boneHex = isBloodRed ? 0x450005 : 0x040404;
    const eyeHex  = isBloodRed ? 0xff2244 : 0x8b0000;

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: bodyHex,
      roughness: 0.7,
      metalness: 0.1,
    });

    const boneMat = new THREE.MeshStandardMaterial({
      color: boneHex,
      roughness: 0.5,
      metalness: 0.3,
    });

    const membraneMat = new THREE.MeshStandardMaterial({
      color: wingHex,
      roughness: 0.65,
      metalness: 0.15,
      side: THREE.DoubleSide,
      transparent: isBloodRed,
      opacity: isBloodRed ? 0.94 : 1.0,
    });

    // ── 1. Torso / Ribcage ──────────────────────────────────────
    const torsoGeo = new THREE.CylinderGeometry(0.14, 0.07, 0.75, 10);
    torsoGeo.rotateX(Math.PI / 2); // Lay forward along Z
    const torso = new THREE.Mesh(torsoGeo, bodyMat);
    group.add(torso);

    // ── 2. Bat Head, Snout & Pointed Ears ───────────────────────
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.07, 0.42);

    // Cranium
    const craniumGeo = new THREE.SphereGeometry(0.16, 10, 10);
    const cranium = new THREE.Mesh(craniumGeo, bodyMat);
    headGroup.add(cranium);

    // Snout / Muzzle
    const snoutGeo = new THREE.ConeGeometry(0.09, 0.2, 8);
    snoutGeo.rotateX(Math.PI / 2);
    snoutGeo.translate(0, -0.04, 0.15);
    const snout = new THREE.Mesh(snoutGeo, bodyMat);
    headGroup.add(snout);

    // Pointed Bat Ears
    const earGeo = new THREE.ConeGeometry(0.07, 0.32, 5);
    earGeo.translate(0, 0.16, 0);

    const leftEar = new THREE.Mesh(earGeo, bodyMat);
    leftEar.position.set(-0.1, 0.1, -0.02);
    leftEar.rotation.z = 0.22;
    leftEar.rotation.x = -0.15;
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, bodyMat);
    rightEar.position.set(0.1, 0.1, -0.02);
    rightEar.rotation.z = -0.22;
    rightEar.rotation.x = -0.15;
    headGroup.add(rightEar);

    // Glowing Eyes
    const eyeGeo = new THREE.SphereGeometry(0.025, 6, 6);
    const eyeMat = new THREE.MeshBasicMaterial({ color: eyeHex });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.08, 0.05, 0.16);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.08, 0.05, 0.16);
    headGroup.add(rightEye);

    group.add(headGroup);

    // ── 3. Tail & Interfemoral Membrane (Uropatagium) ───────────
    const tailShape = new THREE.Shape();
    tailShape.moveTo(0, 0);
    tailShape.lineTo(0.35, -0.35);
    tailShape.lineTo(0, -0.6); // Tail tip
    tailShape.lineTo(-0.35, -0.35);
    tailShape.closePath();

    const tailGeo = new THREE.ShapeGeometry(tailShape);
    const tailMesh = new THREE.Mesh(tailGeo, membraneMat);
    tailMesh.rotation.x = Math.PI / 2;
    tailMesh.position.set(0, -0.02, -0.35);
    group.add(tailMesh);

    // ── 4. Articulated 2-Stage Wings (Shoulder + Elbow/Fingers) ──
    // Build Left Wing
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.12, 0.06, 0.12);

    // Upper arm bone
    const armGeo = new THREE.CylinderGeometry(0.03, 0.025, 0.55, 6);
    armGeo.rotateZ(Math.PI / 2);
    armGeo.translate(-0.27, 0, 0);
    const leftArm = new THREE.Mesh(armGeo, boneMat);
    leftShoulder.add(leftArm);

    // Inner arm membrane
    const innerShape = new THREE.Shape();
    innerShape.moveTo(0, 0.08);
    innerShape.lineTo(-0.55, 0.02);
    innerShape.lineTo(-0.55, -0.4);
    innerShape.quadraticCurveTo(-0.25, -0.35, 0, -0.3);
    innerShape.closePath();

    const innerGeo = new THREE.ShapeGeometry(innerShape);
    const leftInnerMembrane = new THREE.Mesh(innerGeo, membraneMat);
    leftShoulder.add(leftInnerMembrane);

    // Outer Hand/Fingers Pivot (Elbow/Wrist)
    const leftElbow = new THREE.Group();
    leftElbow.position.set(-0.55, 0, 0);

    // Outer Scalloped Bat Membrane (4 fingers)
    const outerShape = new THREE.Shape();
    outerShape.moveTo(0, 0.02);
    outerShape.lineTo(-1.1, 0.22); // Long primary finger tip
    outerShape.quadraticCurveTo(-0.85, -0.15, -0.7, -0.35); // Scallop 1
    outerShape.quadraticCurveTo(-0.5, -0.2, -0.35, -0.38); // Scallop 2
    outerShape.quadraticCurveTo(-0.15, -0.25, 0, -0.4); // Scallop 3
    outerShape.closePath();

    const outerGeo = new THREE.ShapeGeometry(outerShape);
    const leftOuterMembrane = new THREE.Mesh(outerGeo, membraneMat);
    leftElbow.add(leftOuterMembrane);

    // Finger bone ridges
    const finger1Geo = new THREE.CylinderGeometry(0.015, 0.008, 1.15, 4);
    finger1Geo.rotateZ(Math.PI / 2 + 0.18);
    finger1Geo.translate(-0.55, 0.1, 0);
    const finger1 = new THREE.Mesh(finger1Geo, boneMat);
    leftElbow.add(finger1);

    leftShoulder.add(leftElbow);
    group.add(leftShoulder);

    // Build Right Wing (Mirrored)
    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.12, 0.06, 0.12);

    const rightArm = new THREE.Mesh(armGeo, boneMat);
    rightArm.rotation.y = Math.PI;
    rightShoulder.add(rightArm);

    const rightInnerMembrane = new THREE.Mesh(innerGeo, membraneMat);
    rightInnerMembrane.scale.set(-1, 1, 1);
    rightShoulder.add(rightInnerMembrane);

    const rightElbow = new THREE.Group();
    rightElbow.position.set(0.55, 0, 0);

    const rightOuterMembrane = new THREE.Mesh(outerGeo, membraneMat);
    rightOuterMembrane.scale.set(-1, 1, 1);
    rightElbow.add(rightOuterMembrane);

    const rightFinger = new THREE.Mesh(finger1Geo, boneMat);
    rightFinger.rotation.y = Math.PI;
    rightElbow.add(rightFinger);

    rightShoulder.add(rightElbow);
    group.add(rightShoulder);

    // Global scale
    const scale = 0.65 + Math.random() * 0.25;
    group.scale.setScalar(scale);

    return {
      group,
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      isBloodRed,
      scale,
    };
  }

  animate() {
    this.raf = requestAnimationFrame(() => this.animate());
    const t = this.clock.getElapsedTime();

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;

    this.camera.position.x = this.mouse.x * 0.7;
    this.camera.position.y = this.mouse.y * 0.5;
    this.camera.lookAt(0, 0, 0);

    const scrollOffset = this.scrollY * 0.002;
    const boundsX = 13;
    const boundsY = 9;
    const boundsZ = 6;

    this.bats.forEach((bat) => {
      // Periodic gliding cycle: bats flap for 3 seconds then glide smoothly for 2 seconds
      const cycleTime = (t * 0.5 + bat.phase) % 5.0;
      const isGliding = cycleTime > 3.2;

      let flapRad = 0;
      let elbowRad = 0;

      if (!isGliding) {
        // Natural wingbeat: downstroke produces propulsion, upstroke folds wing
        const rawFlap = Math.sin(t * bat.flapFreq + bat.phase);
        flapRad = rawFlap * 0.65;
        // Elbow flexes inward on upstroke to mimic real bat aerodynamics
        elbowRad = rawFlap > 0 ? rawFlap * 0.35 : rawFlap * 0.15;
      } else {
        // Subtle soaring dihedral angle during glide
        flapRad = 0.08 + Math.sin(t * 1.5 + bat.phase) * 0.04;
        elbowRad = 0.05;
      }

      // Apply wing flapping
      bat.leftShoulder.rotation.z = -flapRad;
      bat.rightShoulder.rotation.z = flapRad;

      bat.leftElbow.rotation.z = -elbowRad;
      bat.rightElbow.rotation.z = elbowRad;

      // Slight wing sweep on downstroke
      bat.leftShoulder.rotation.y = -Math.abs(flapRad) * 0.2;
      bat.rightShoulder.rotation.y = Math.abs(flapRad) * 0.2;

      // Flight trajectory & smooth curving
      bat.wanderAngle += bat.wanderSpeed;
      bat.divePhase += 0.012;

      // Swooping flight path
      bat.group.position.x += Math.cos(bat.wanderAngle) * bat.speed * 1.6;
      bat.group.position.y += Math.sin(bat.divePhase) * 0.035 + (flapRad > 0 ? 0.008 : -0.005);
      bat.group.position.z += Math.sin(bat.wanderAngle * 0.8) * bat.speed * 1.1;

      // Banking into flight curves
      const targetRoll = Math.sin(bat.wanderAngle) * 0.5;
      const targetPitch = Math.sin(bat.divePhase) * 0.25;
      const targetYaw = bat.wanderAngle + Math.PI / 2;

      bat.group.rotation.y = targetYaw;
      bat.group.rotation.z = targetRoll;
      bat.group.rotation.x = targetPitch;

      // Screen boundary wrap-around
      const viewY = bat.group.position.y - scrollOffset;

      if (bat.group.position.x > boundsX) bat.group.position.x = -boundsX;
      else if (bat.group.position.x < -boundsX) bat.group.position.x = boundsX;

      if (viewY > boundsY) bat.group.position.y -= boundsY * 2;
      else if (viewY < -boundsY) bat.group.position.y += boundsY * 2;

      if (bat.group.position.z > boundsZ) bat.group.position.z = -boundsZ;
      else if (bat.group.position.z < -boundsZ) bat.group.position.z = boundsZ;
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
