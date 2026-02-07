"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sparkles,
  Float,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

const Petal = ({ rotation, scale }: any) => {
  return (
    <mesh rotation={rotation} scale={scale}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI / 1.5, 0, Math.PI / 1.5]} />
      <meshStandardMaterial
        color="#1e40af"
        emissive="#000022"
        roughness={0.3}
        metalness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const RealisticRose = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const petals = useMemo(() => {
    const items = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        rotation: [
          Math.PI / (1.2 + Math.random() * 0.5),
          (i * Math.PI * 2) / 8,
          (Math.random() - 0.5) * 0.3,
        ] as [number, number, number],
        scale: (0.4 + i * 0.04) as number,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {petals.map((props, i) => (
        <Petal key={i} {...props} />
      ))}

      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[0.04, 0.02, 6, 12]} />
        <meshStandardMaterial color="#064e3b" />
      </mesh>

      <mesh position={[0.4, -1.2, 0]} rotation={[0.4, 0, Math.PI / 2.5]}>
        <sphereGeometry args={[0.5, 16, 16]} scale={[1, 0.05, 0.3]} />
        <meshStandardMaterial color="#065f46" />
      </mesh>
      <mesh position={[-0.4, -2.2, 0]} rotation={[-0.4, 0, -Math.PI / 2.5]}>
        <sphereGeometry args={[0.5, 16, 16]} scale={[1, 0.05, 0.3]} />
        <meshStandardMaterial color="#065f46" />
      </mesh>
    </group>
  );
};

export default function Home() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#020617",
      }}
    >
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />

        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={150}
          color="#3b82f6"
          castShadow
        />
        <pointLight position={[-10, -5, -10]} intensity={50} color="#1e3a8a" />

        <Environment preset="night" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <RealisticRose />
        </Float>

        <ContactShadows
          position={[0, -4.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />

        <Sparkles
          count={120}
          scale={10}
          size={0.6}
          speed={0.3}
          color="#60a5fa"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-blue-950/40 to-transparent pointer-events-none" />
    </div>
  );
}
