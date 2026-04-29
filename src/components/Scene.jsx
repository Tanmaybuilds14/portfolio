import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const CameraRig = ({ currentView }) => {
  useFrame((state) => {
    const isContact = currentView === 'contact';
    // Move camera to center (inside orb) when in contact view, else normal distance
    const targetPos = isContact ? new THREE.Vector3(0, 0, 0.01) : new THREE.Vector3(0, 0, 8);
    state.camera.position.lerp(targetPos, 0.04);
  });
  return null;
};

// An elegant floating abstract shape (Water Drop)
const AbstractShape = ({ currentView }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const isContact = currentView === 'contact';

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.position.y = Math.sin(t / 2) * 0.2;

    // Smoothly interpolate distortion and speed
    if (materialRef.current) {
      const targetDistort = isContact ? 1.0 : 0.4;
      const targetSpeed = isContact ? 4 : 2;
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.05);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.05);
    }
  });

  return (
    <Sphere args={[1.5, 64, 64]} ref={meshRef}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={isContact ? 0.8 : 0.2}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.5}
        transmission={0.8}
        ior={1.2}
        thickness={1}
        clearcoat={1}
        clearcoatRoughness={0}
        envMapIntensity={2}
        side={THREE.DoubleSide}
      />
    </Sphere>
  );
};

const Scene = ({ introFinished, currentView }) => {
  const isContact = currentView === 'contact';
  // Trigger animations for both the projects list and individual project pages
  const isProjectRelated = currentView === 'projects' || (currentView && currentView.includes('-project'));

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={isContact ? 2 : 0.5} />
      <directionalLight position={[10, 10, 5]} intensity={isContact ? 4 : 2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#bae6fd" />

      {/* Abstract Water Drop */}
      <AbstractShape currentView={currentView} />

      {/* Starry Background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={isProjectRelated ? 25 : 1}
      />

      <CameraRig currentView={currentView} />

      <OrbitControls
        enabled={!isContact}
        enableZoom={false}
        enablePan={false}
        autoRotate={!isContact}
        autoRotateSpeed={isProjectRelated ? 26 : 0.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
    </Canvas>
  );
};

export default Scene;
