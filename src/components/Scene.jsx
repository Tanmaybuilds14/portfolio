import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const projectScreens = ['/omega-1.png', '/adshub-1.png', '/jobportal.png'];
const sectionPositions = [0, 0.2, 0.4, 0.6, 0.8, 1];

function easedKeyframe(values, progress) {
  const scaled = THREE.MathUtils.clamp(progress, 0, 1) * (values.length - 1);
  const index = Math.min(values.length - 2, Math.floor(scaled));
  const local = THREE.MathUtils.smoothstep(scaled - index, 0, 1);
  return THREE.MathUtils.lerp(values[index], values[index + 1], local);
}

function visibilityAt(progress, center, width = 0.16) {
  const distance = Math.abs(progress - center);
  return 1 - THREE.MathUtils.smoothstep(distance, width * 0.35, width);
}

function Keyboard() {
  const keys = useMemo(() => {
    const rows = [10, 10, 9];
    return rows.flatMap((count, row) => Array.from({ length: count }, (_, index) => ({
      x: (index - (count - 1) / 2) * 0.235,
      z: row * 0.22,
      key: `${row}-${index}`,
    })));
  }, []);

  return (
    <group position={[0, -1.37, 1.03]} rotation={[-0.05, 0, 0]}>
      <RoundedBox args={[2.75, 0.13, 0.92]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color="#101722" metalness={0.65} roughness={0.28} />
      </RoundedBox>
      {keys.map((key) => (
        <RoundedBox
          key={key.key}
          args={[0.18, 0.045, 0.15]}
          radius={0.025}
          smoothness={2}
          position={[key.x, 0.085, key.z - 0.22]}
        >
          <meshStandardMaterial color="#273246" roughness={0.42} />
        </RoundedBox>
      ))}
      <RoundedBox args={[1.12, 0.045, 0.15]} radius={0.025} smoothness={2} position={[0, 0.085, 0.44]}>
        <meshStandardMaterial color="#34425a" roughness={0.42} />
      </RoundedBox>
    </group>
  );
}

function ScreenDisplay({ scrollProgress, reducedMotion }) {
  const textures = useTexture(projectScreens);
  const projectMaterials = useRef([]);
  const projectMeshes = useRef([]);
  const scanLine = useRef(null);
  const accentMaterial = useRef(null);

  useMemo(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
    });
  }, [textures]);

  const accentColors = useMemo(() => [
    new THREE.Color('#5794ff'),
    new THREE.Color('#70a5ff'),
    new THREE.Color('#a77bff'),
    new THREE.Color('#ff8b5f'),
    new THREE.Color('#55e1bd'),
    new THREE.Color('#78a8ff'),
  ], []);

  const mixedAccent = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const progress = scrollProgress.get();
    const projectCenters = sectionPositions.slice(2, 5);

    projectMaterials.current.forEach((material, index) => {
      if (!material) return;
      const targetOpacity = visibilityAt(progress, projectCenters[index], 0.155);
      material.opacity = reducedMotion
        ? targetOpacity
        : THREE.MathUtils.damp(material.opacity, targetOpacity, 11, delta);
    });

    projectMeshes.current.forEach((mesh, index) => {
      if (!mesh) return;
      const offset = (projectCenters[index] - progress) * 1.25;
      mesh.position.x = reducedMotion
        ? offset
        : THREE.MathUtils.damp(mesh.position.x, offset, 9, delta);
      const targetScale = 1 + visibilityAt(progress, projectCenters[index], 0.15) * 0.018;
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, targetScale, 8, delta));
    });

    const scaled = THREE.MathUtils.clamp(progress, 0, 1) * (accentColors.length - 1);
    const colorIndex = Math.min(accentColors.length - 2, Math.floor(scaled));
    mixedAccent.lerpColors(
      accentColors[colorIndex],
      accentColors[colorIndex + 1],
      THREE.MathUtils.smoothstep(scaled - colorIndex, 0, 1),
    );

    if (accentMaterial.current) accentMaterial.current.color.lerp(mixedAccent, 0.08);

    if (scanLine.current) {
      scanLine.current.position.y = reducedMotion
        ? 0
        : -0.82 + ((state.clock.elapsedTime * 0.22) % 1.64);
      scanLine.current.material.opacity = reducedMotion ? 0 : 0.14;
    }
  });

  return (
    <group position={[0, 0.2, 0.132]}>
      <mesh>
        <planeGeometry args={[4.1, 1.86]} />
        <meshBasicMaterial color="#07101d" toneMapped={false} />
      </mesh>

      <group position={[0, 0, 0.006]}>
        <mesh position={[-1.42, 0.56, 0]}>
          <planeGeometry args={[0.72, 0.06]} />
          <meshBasicMaterial ref={accentMaterial} color="#5794ff" toneMapped={false} />
        </mesh>
        <mesh position={[-1.04, 0.27, 0]}>
          <planeGeometry args={[1.48, 0.08]} />
          <meshBasicMaterial color="#263a59" toneMapped={false} />
        </mesh>
        <mesh position={[-1.3, 0.05, 0]}>
          <planeGeometry args={[0.96, 0.055]} />
          <meshBasicMaterial color="#365075" toneMapped={false} />
        </mesh>
        <mesh position={[-1.12, -0.16, 0]}>
          <planeGeometry args={[1.32, 0.055]} />
          <meshBasicMaterial color="#233650" toneMapped={false} />
        </mesh>
        <mesh position={[0.88, 0.08, 0]}>
          <circleGeometry args={[0.52, 48]} />
          <meshBasicMaterial color="#0c1b30" toneMapped={false} />
        </mesh>
        <mesh position={[0.88, 0.08, 0.004]}>
          <ringGeometry args={[0.35, 0.39, 48]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.7} toneMapped={false} />
        </mesh>
      </group>

      {textures.map((texture, index) => (
        <mesh
          key={projectScreens[index]}
          ref={(element) => { projectMeshes.current[index] = element; }}
          position={[0, 0, 0.016 + index * 0.002]}
          renderOrder={2 + index}
        >
          <planeGeometry args={[4.06, 1.82]} />
          <meshBasicMaterial
            ref={(element) => { projectMaterials.current[index] = element; }}
            map={texture}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}

      <mesh ref={scanLine} position={[0, -0.8, 0.03]} renderOrder={8}>
        <planeGeometry args={[4.03, 0.018]} />
        <meshBasicMaterial
          color="#9bc2ff"
          transparent
          opacity={0.14}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <group position={[0, -0.79, 0.038]}>
        {[0, 1, 2].map((index) => (
          <mesh key={index} position={[(index - 1) * 0.2, 0, 0]}>
            <circleGeometry args={[0.028, 16]} />
            <meshBasicMaterial color={index === 0 ? '#70a5ff' : '#34445c'} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Computer({ scrollProgress, reducedMotion }) {
  const computer = useRef(null);
  const monitor = useRef(null);
  const orbit = useRef(null);
  const pulse = useRef(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const progress = scrollProgress.get();
    const isMobile = viewport.width < 7.2;

    const desktopX = [1.9, 2.32, 1.78, 1.78, 1.78, 2.15];
    const desktopY = [-0.05, -0.18, -0.06, -0.06, -0.06, -0.1];
    const mobileX = [0.25, 0.42, 0.18, 0.18, 0.18, 0.35];
    const mobileY = [1.35, 1.48, 1.5, 1.5, 1.5, 1.38];
    const rotations = [-0.08, -0.32, -0.12, 0.02, 0.14, 0.28];
    const scales = isMobile
      ? [0.62, 0.58, 0.6, 0.6, 0.6, 0.58]
      : [1.02, 0.96, 1, 1, 1, 0.96];

    const targetX = easedKeyframe(isMobile ? mobileX : desktopX, progress);
    const targetY = easedKeyframe(isMobile ? mobileY : desktopY, progress);
    const targetRotation = easedKeyframe(rotations, progress);
    const targetScale = easedKeyframe(scales, progress);
    const idle = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.75) * 0.045;
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.07;
    const pointerY = reducedMotion ? 0 : state.pointer.y * 0.035;
    const damping = reducedMotion ? 100 : 5.5;

    if (computer.current) {
      computer.current.position.x = THREE.MathUtils.damp(computer.current.position.x, targetX + pointerX, damping, delta);
      computer.current.position.y = THREE.MathUtils.damp(computer.current.position.y, targetY + idle + pointerY, damping, delta);
      computer.current.rotation.y = THREE.MathUtils.damp(computer.current.rotation.y, targetRotation + pointerX * 0.45, damping, delta);
      const nextScale = THREE.MathUtils.damp(computer.current.scale.x, targetScale, damping, delta);
      computer.current.scale.setScalar(nextScale);
    }

    if (monitor.current) {
      const projectEnergy = visibilityAt(progress, 0.6, 0.31);
      const targetTilt = projectEnergy * 0.035;
      monitor.current.rotation.z = THREE.MathUtils.damp(monitor.current.rotation.z, targetTilt, 5, delta);
    }

    if (orbit.current && !reducedMotion) {
      orbit.current.rotation.z += delta * (0.08 + visibilityAt(progress, 0.6, 0.38) * 0.12);
      orbit.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
    }

    if (pulse.current) {
      const contactVisibility = visibilityAt(progress, 1, 0.18);
      const cycle = reducedMotion ? 0.5 : (Math.sin(state.clock.elapsedTime * 1.8) + 1) / 2;
      const scale = 1 + cycle * 0.42;
      pulse.current.scale.setScalar(scale);
      pulse.current.material.opacity = contactVisibility * (0.18 - cycle * 0.12);
    }
  });

  return (
    <group ref={computer} position={[1.9, -0.05, 0]}>
      <group ref={orbit} position={[0, 0.15, -1.15]} rotation={[0.15, -0.1, 0]}>
        <mesh>
          <torusGeometry args={[3.25, 0.012, 8, 160]} />
          <meshBasicMaterial color="#427bd3" transparent opacity={0.28} toneMapped={false} />
        </mesh>
        <mesh rotation={[0.4, 0.1, 0.6]}>
          <torusGeometry args={[3.65, 0.008, 8, 160]} />
          <meshBasicMaterial color="#7259d5" transparent opacity={0.16} toneMapped={false} />
        </mesh>
        {[0, 1, 2, 3].map((index) => {
          const angle = (index / 4) * Math.PI * 2;
          return (
            <mesh key={index} position={[Math.cos(angle) * 3.25, Math.sin(angle) * 3.25, 0]}>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshBasicMaterial color="#7fb0ff" toneMapped={false} />
            </mesh>
          );
        })}
      </group>

      <group ref={monitor}>
        <RoundedBox args={[4.52, 2.3, 0.22]} radius={0.14} smoothness={5} castShadow>
          <meshStandardMaterial color="#111a28" metalness={0.78} roughness={0.24} />
        </RoundedBox>
        <ScreenDisplay scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
        <mesh position={[0, -1.45, -0.03]} castShadow>
          <cylinderGeometry args={[0.17, 0.24, 0.72, 32]} />
          <meshStandardMaterial color="#1a2535" metalness={0.82} roughness={0.22} />
        </mesh>
        <RoundedBox args={[1.42, 0.12, 0.72]} radius={0.08} smoothness={4} position={[0, -1.82, 0]} castShadow>
          <meshStandardMaterial color="#151f2e" metalness={0.82} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 1.04, 0.14]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#6da4ff" toneMapped={false} />
        </mesh>
      </group>

      <Keyboard />

      <group position={[2.05, -1.36, 0.98]}>
        <RoundedBox args={[0.58, 0.15, 0.82]} radius={0.2} smoothness={5} castShadow>
          <meshStandardMaterial color="#162132" metalness={0.62} roughness={0.28} />
        </RoundedBox>
        <mesh position={[0, 0.081, -0.08]}>
          <planeGeometry args={[0.018, 0.28]} />
          <meshBasicMaterial color="#4f8ff7" toneMapped={false} />
        </mesh>
      </group>

      <RoundedBox args={[5.8, 0.18, 2.5]} radius={0.12} smoothness={4} position={[0, -1.62, 0.28]} receiveShadow castShadow>
        <meshStandardMaterial color="#111a25" metalness={0.44} roughness={0.38} />
      </RoundedBox>
      <mesh position={[0, -1.75, 0.28]}>
        <boxGeometry args={[4.9, 0.035, 1.86]} />
        <meshBasicMaterial color="#376fae" transparent opacity={0.18} toneMapped={false} />
      </mesh>

      <mesh ref={pulse} position={[0, 0.1, -0.85]}>
        <ringGeometry args={[2.6, 2.63, 96]} />
        <meshBasicMaterial color="#6da4ff" transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Experience({ scrollProgress, reducedMotion }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 7, 6]} intensity={2.8} color="#dbe9ff" castShadow />
      <pointLight position={[-3, 1, 4]} intensity={16} distance={9} color="#316fd7" />
      <pointLight position={[4, -1, 3]} intensity={9} distance={7} color="#805ad5" />

      <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={0.03} floatIntensity={0.08}>
        <Computer scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      </Float>

      <Sparkles
        count={reducedMotion ? 20 : 75}
        scale={[12, 7, 5]}
        size={1.5}
        speed={reducedMotion ? 0 : 0.18}
        opacity={0.32}
        color="#6a9bea"
      />
    </>
  );
}

function Scene({ scrollProgress, reducedMotion }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 38, near: 0.1, far: 60 }}
      dpr={[1, 1.7]}
      shadows
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#05070c', 12, 30]} />
      <Suspense fallback={null}>
        <Experience scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default Scene;
