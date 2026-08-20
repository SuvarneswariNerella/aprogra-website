import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useServicesStore } from '@/store/servicesStore';

// Parametric Bernoulli Lemniscate Curve for smooth 3D Infinity Tube
class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  scale: number;
  heightVariation: number;

  constructor(scale = 2.4, heightVariation = 0.55) {
    super();
    this.scale = scale;
    this.heightVariation = heightVariation;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const theta = t * Math.PI * 2;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    const denom = 1 + sinT * sinT;

    const x = (this.scale * Math.SQRT2 * cosT) / denom;
    const y = (this.scale * Math.SQRT2 * sinT * cosT) / denom;
    const z = Math.sin(theta * 2) * this.heightVariation;

    return optionalTarget.set(x, y, z);
  }
}

export default function ThreeInfinityCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentChapter, chapterProgress, hoveredBulletIndex, mousePosition } = useServicesStore();
  
  // Store refs to synchronize with animation frame without React re-mounting
  const stateRef = useRef({
    currentChapter: 0,
    chapterProgress: 0,
    hoveredBulletIndex: null as number | null,
    mouseTarget: { x: 0, y: 0 },
    mouseCurrent: { x: 0, y: 0 },
  });

  useEffect(() => {
    stateRef.current.currentChapter = currentChapter;
    stateRef.current.chapterProgress = chapterProgress;
    stateRef.current.hoveredBulletIndex = hoveredBulletIndex;
  }, [currentChapter, chapterProgress, hoveredBulletIndex]);

  useEffect(() => {
    stateRef.current.mouseTarget = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070913, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x1a2035, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xff4a1c, 4, 25);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const rimLightBlue = new THREE.PointLight(0x3b82f6, 5, 25);
    rimLightBlue.position.set(-6, -3, 4);
    scene.add(rimLightBlue);

    const rimLightPurple = new THREE.PointLight(0xec4899, 4.5, 25);
    rimLightPurple.position.set(0, 5, -4);
    scene.add(rimLightPurple);

    // --- MASTER CONTAINER ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. INFINITY MESH (Core Motif)
    const infinityCurve = new InfinityCurve(2.2, 0.6);
    const tubeGeometry = new THREE.TubeGeometry(infinityCurve, 200, 0.28, 24, true);

    const infinityMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x182449,
      emissive: 0x0c1326,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      transmission: 0.45,
      ior: 1.5,
      transparent: true,
      opacity: 0.92,
    });

    const infinityMesh = new THREE.Mesh(tubeGeometry, infinityMaterial);
    masterGroup.add(infinityMesh);

    // Inner Glowing Wireframe Contour
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4a1c,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeMesh = new THREE.Mesh(tubeGeometry, wireframeMaterial);
    wireframeMesh.scale.set(1.02, 1.02, 1.02);
    masterGroup.add(wireframeMesh);

    // 2. CHAPTER 1: INTERLOCKING GEOMETRIC ARCHITECTURE NODES (Web & App)
    const webGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });

    const webNodes: THREE.Mesh[] = [];
    const webOffsets = [
      [-1.8, 0.8, 0], [-1.0, 1.4, 0.5], [0, 1.8, -0.3], [1.0, 1.4, 0.5], [1.8, 0.8, 0],
      [1.8, -0.8, 0], [1.0, -1.4, -0.5], [0, -1.8, 0.3], [-1.0, -1.4, -0.5], [-1.8, -0.8, 0]
    ];
    webOffsets.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(cubeGeo, cubeMat.clone());
      node.position.set(x, y, z);
      node.scale.set(0.5, 0.5, 0.5);
      webGroup.add(node);
      webNodes.push(node);
    });

    // Connecting laser line between web nodes
    const webLineMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.4 });
    const webLinePoints = webOffsets.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    webLinePoints.push(webLinePoints[0]); // loop back
    const webLineGeo = new THREE.BufferGeometry().setFromPoints(webLinePoints);
    const webLine = new THREE.Line(webLineGeo, webLineMat);
    webGroup.add(webLine);
    masterGroup.add(webGroup);

    // 3. CHAPTER 2: NEURAL AI VECTOR SWARM & AGENTIC ORBITS
    const aiGroup = new THREE.Group();
    const aiParticleCount = 450;
    const aiParticleGeo = new THREE.BufferGeometry();
    const aiPositions = new Float32Array(aiParticleCount * 3);
    const aiColors = new Float32Array(aiParticleCount * 3);

    for (let i = 0; i < aiParticleCount; i++) {
      const angle = (i / aiParticleCount) * Math.PI * 4;
      const radius = 1.6 + Math.sin(angle * 3) * 0.7;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (radius * 0.6);
      const z = Math.sin(angle * 5) * 0.8;

      aiPositions[i * 3] = x;
      aiPositions[i * 3 + 1] = y;
      aiPositions[i * 3 + 2] = z;

      // Color interpolation: Purple to Magenta to Orange
      const color = new THREE.Color();
      if (i % 3 === 0) color.setHex(0x8b5cf6);
      else if (i % 3 === 1) color.setHex(0xec4899);
      else color.setHex(0xff4a1c);

      aiColors[i * 3] = color.r;
      aiColors[i * 3 + 1] = color.g;
      aiColors[i * 3 + 2] = color.b;
    }

    aiParticleGeo.setAttribute('position', new THREE.BufferAttribute(aiPositions, 3));
    aiParticleGeo.setAttribute('color', new THREE.BufferAttribute(aiColors, 3));

    const aiParticleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const aiParticles = new THREE.Points(aiParticleGeo, aiParticleMat);
    aiGroup.add(aiParticles);

    // Central Neural Core
    const aiCoreGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const aiCoreMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      wireframe: true,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.8
    });
    const aiCore = new THREE.Mesh(aiCoreGeo, aiCoreMat);
    aiGroup.add(aiCore);
    masterGroup.add(aiGroup);

    // 4. CHAPTER 3: MODULAR PRODUCT ARCHITECTURE & SAAS SLABS
    const saasGroup = new THREE.Group();
    const slabGeo = new THREE.BoxGeometry(2.4, 0.15, 1.8);
    const slabMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      metalness: 0.3,
      roughness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.75,
      ior: 1.4,
    });

    const slabs: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = (i - 1.5) * 0.65;
      saasGroup.add(slab);
      slabs.push(slab);
    }
    masterGroup.add(saasGroup);

    // 5. CHAPTER 4: TRANSLUCENT DESIGN PANELS & UI FRAMES
    const designGroup = new THREE.Group();
    const panelGeo = new THREE.PlaneGeometry(1.6, 2.2);
    const panelMat = new THREE.MeshPhysicalMaterial({
      color: 0xf43f5e,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    });

    const panels: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set((i - 1) * 0.7, 0, (i - 1) * 0.5);
      panel.rotation.y = (i - 1) * -0.25;
      panel.rotation.z = (i - 1) * 0.08;
      designGroup.add(panel);
      panels.push(panel);
    }
    masterGroup.add(designGroup);

    // 6. CHAPTER 5: GLOBAL SOVEREIGN CLOUD & EDGE SPHERES
    const cloudGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(1.8, 28, 28);
    const sphereWireMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const cloudSphere = new THREE.Mesh(sphereGeo, sphereWireMat);
    cloudGroup.add(cloudSphere);

    // Orbiting Satellite Rings
    const orbitRingGeo = new THREE.TorusGeometry(2.4, 0.03, 16, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6
    });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing1.rotation.x = Math.PI / 3;
    const orbitRing2 = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing2.rotation.y = Math.PI / 3;
    cloudGroup.add(orbitRing1);
    cloudGroup.add(orbitRing2);
    masterGroup.add(cloudGroup);

    // Ambient floating dust particles
    const dustCount = 180;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 14;
      dustPositions[i + 1] = (Math.random() - 0.5) * 10;
      dustPositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.35
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const { currentChapter, chapterProgress, hoveredBulletIndex, mouseTarget } = stateRef.current;

      // Smooth mouse lerping for parallax
      stateRef.current.mouseCurrent.x += (mouseTarget.x - stateRef.current.mouseCurrent.x) * 0.06;
      stateRef.current.mouseCurrent.y += (mouseTarget.y - stateRef.current.mouseCurrent.y) * 0.06;

      const mx = stateRef.current.mouseCurrent.x;
      const my = stateRef.current.mouseCurrent.y;

      // Master rotation & parallax tilt
      masterGroup.rotation.x = my * 0.35;
      masterGroup.rotation.y = elapsedTime * 0.25 + mx * 0.45;
      masterGroup.position.x = mx * 0.5;
      masterGroup.position.y = -my * 0.4;

      // Base infinity morph & breathing
      const pulseSpeed = hoveredBulletIndex !== null ? 4.0 : 1.5;
      const pulseIntensity = Math.sin(elapsedTime * pulseSpeed) * 0.04;
      
      // Update light intensities
      if (hoveredBulletIndex !== null) {
        keyLight.intensity = 6.0;
        wireframeMaterial.opacity = 0.45;
      } else {
        keyLight.intensity = 4.0;
        wireframeMaterial.opacity = 0.15;
      }

      // Smooth Morphing Between Chapters (0 to 6)
      // Ch 0 (Intro): Full Infinity Mesh visible, sub-groups scaled down
      // Ch 1 (Web): Web nodes expand along the loop
      // Ch 2 (AI): Swarm particles activate and spin
      // Ch 3 (SaaS): Layered slabs float and rotate
      // Ch 4 (Design): UI panels slide into parallax view
      // Ch 5 (Cloud): Sovereign edge globe expands
      // Ch 6 (Convergence): Recombines back into glowing single infinity

      // Target Scales & Opacities based on currentChapter
      const lerpFactor = 0.08;

      // Master Infinity Mesh scale
      const isIntroOrOutro = currentChapter === 0 || currentChapter === 6;
      const targetInfScale = isIntroOrOutro ? 1.0 + pulseIntensity : 0.75 + pulseIntensity * 0.5;
      infinityMesh.scale.lerp(new THREE.Vector3(targetInfScale, targetInfScale, targetInfScale), lerpFactor);
      wireframeMesh.scale.lerp(new THREE.Vector3(targetInfScale * 1.02, targetInfScale * 1.02, targetInfScale * 1.02), lerpFactor);

      // Chapter 1 Web Nodes
      const targetWebScale = currentChapter === 1 ? 1.0 : 0.001;
      webGroup.scale.lerp(new THREE.Vector3(targetWebScale, targetWebScale, targetWebScale), lerpFactor);
      webGroup.rotation.z = elapsedTime * 0.1;

      // Chapter 2 AI Swarm
      const targetAiScale = currentChapter === 2 ? 1.1 : 0.001;
      aiGroup.scale.lerp(new THREE.Vector3(targetAiScale, targetAiScale, targetAiScale), lerpFactor);
      aiGroup.rotation.y = elapsedTime * 0.4;
      aiCore.rotation.x = elapsedTime * 0.5;
      aiCore.rotation.y = elapsedTime * 0.6;

      // Chapter 3 SaaS Slabs
      const targetSaasScale = currentChapter === 3 ? 1.0 : 0.001;
      saasGroup.scale.lerp(new THREE.Vector3(targetSaasScale, targetSaasScale, targetSaasScale), lerpFactor);
      slabs.forEach((s, idx) => {
        s.rotation.y = Math.sin(elapsedTime * 0.8 + idx) * 0.25;
      });

      // Chapter 4 Design Panels
      const targetDesignScale = currentChapter === 4 ? 1.0 : 0.001;
      designGroup.scale.lerp(new THREE.Vector3(targetDesignScale, targetDesignScale, targetDesignScale), lerpFactor);
      panels.forEach((p, idx) => {
        p.position.y = Math.sin(elapsedTime * 1.2 + idx * 1.5) * 0.12;
      });

      // Chapter 5 Cloud Sphere
      const targetCloudScale = currentChapter === 5 ? 1.0 : 0.001;
      cloudGroup.scale.lerp(new THREE.Vector3(targetCloudScale, targetCloudScale, targetCloudScale), lerpFactor);
      cloudSphere.rotation.y = elapsedTime * 0.2;
      orbitRing1.rotation.z = elapsedTime * 0.3;
      orbitRing2.rotation.z = -elapsedTime * 0.25;

      // Chapter 6 Convergence Glow
      if (currentChapter === 6) {
        infinityMaterial.emissive.setHex(0xff4a1c);
        infinityMaterial.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 3) * 0.3;
      } else {
        infinityMaterial.emissive.setHex(0x0c1326);
        infinityMaterial.emissiveIntensity = 0.2;
      }

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tubeGeometry.dispose();
      infinityMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
