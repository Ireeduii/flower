"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sparkles,
  Float,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

const Petal = ({ rotation, delay, scale }: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={meshRef} rotation={rotation} scale={scale}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI / 2, 0, Math.PI / 2]} />
      <meshStandardMaterial
        color="#1e40af"
        emissive="#000033"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const RealisticRose = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const petals = useMemo(() => {
    const items = [];

    for (let i = 0; i < 25; i++) {
      items.push({
        rotation: [
          Math.PI / (1.5 + Math.random()),
          (i * Math.PI) / 3,
          (Math.random() - 0.5) * 0.5,
        ] as [number, number, number],
        scale: (0.5 + i * 0.05) as number,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {petals.map((props, i) => (
        <Petal key={i} {...props} />
      ))}

      {/* Иш */}
      <mesh position={[0, -3.2, 0]}>
        <cylinderGeometry args={[0.05, 0.03, 6]} />
        <meshStandardMaterial color="#064e3b" />
      </mesh>

      <mesh position={[0.5, -1.5, 0]} rotation={[0, 0, Math.PI / 3]}>
        <sphereGeometry args={[0.4, 16, 16]} scale={[1, 0.05, 0.4]} />
        <meshStandardMaterial color="#065f46" />
      </mesh>
      <mesh position={[-0.5, -2.5, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <sphereGeometry args={[0.4, 16, 16]} scale={[1, 0.05, 0.4]} />
        <meshStandardMaterial color="#065f46" />
      </mesh>
    </group>
  );
};

export default function Home() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div className="absolute top-10 w-full text-center z-10">
        <h1 className="text-blue-500 text-2xl font-extralight tracking-[1em] opacity-50 uppercase">
          Midnight Rose
        </h1>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={35} />

        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          color="#3b82f6"
        />
        <pointLight position={[-10, -5, -5]} intensity={1} color="#1e3a8a" />

        <Environment preset="night" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <RealisticRose />
        </Float>

        <Sparkles
          count={200}
          scale={8}
          size={0.5}
          speed={0.4}
          color="#60a5fa"
        />

        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
    </div>
  );
}
