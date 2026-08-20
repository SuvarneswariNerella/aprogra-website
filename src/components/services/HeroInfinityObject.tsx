import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  scale: number;
  heightVariation: number;

  constructor(scale = 1.8, heightVariation = 0.45) {
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

export default function HeroInfinityObject() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Warm, editorial studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight1.position.set(4, 5, 4);
    scene.add(directionalLight1);

    const accentLight = new THREE.PointLight(0xff4a1c, 3.5, 12);
    accentLight.position.set(-3, -2, 3);
    scene.add(accentLight);

    const blueRimLight = new THREE.PointLight(0x3b82f6, 3.0, 12);
    blueRimLight.position.set(3, -3, -2);
    scene.add(blueRimLight);

    // 3D Infinity Tube - Frosted Glass & Precision Metal Aesthetic
    const infinityCurve = new InfinityCurve(1.65, 0.38);
    const tubeGeometry = new THREE.TubeGeometry(infinityCurve, 160, 0.22, 20, true);

    const tubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222638,
      emissive: 0x0a0c16,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
      transmission: 0.35,
      ior: 1.45,
      transparent: true,
      opacity: 0.95,
    });

    const infinityMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    
    // Outer hairline halo
    const wireframeGeo = new THREE.TubeGeometry(infinityCurve, 100, 0.225, 8, true);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xff4a1c,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);

    const group = new THREE.Group();
    group.add(infinityMesh);
    group.add(wireframeMesh);
    scene.add(group);

    // Mouse tilt tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotX = y * 0.35;
      targetRotY = x * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      group.rotation.y = elapsedTime * 0.35 + (targetRotY * 0.8);
      group.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 + (targetRotX * 0.8);
      group.rotation.z = Math.cos(elapsedTime * 0.3) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tubeGeometry.dispose();
      wireframeGeo.dispose();
      tubeMaterial.dispose();
      wireframeMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[280px] sm:min-h-[340px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
      aria-label="3D Interactive Infinity Core"
    />
  );
}
