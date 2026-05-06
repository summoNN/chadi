"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Preload,
} from "@react-three/drei";
import TVModel from "./TVModel";
import * as THREE from "three";

function SceneLighting() {
  return (
    <>
      {/* Ambient — low so the scene stays moody */}
      <ambientLight intensity={0.3} color="#ffecd1" />

      {/* Key light — warm from upper left */}
      <directionalLight
        position={[-4, 6, 4]}
        intensity={1.2}
        color="#ffe0a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill light — cool from right */}
      <directionalLight
        position={[5, 2, -3]}
        intensity={0.4}
        color="#b0c8ff"
      />

      {/* Rim light — golden from below/back */}
      <pointLight
        position={[0, -2, -3]}
        intensity={0.8}
        color="#c9a96e"
        distance={10}
      />

      {/* Screen glow simulation */}
      <pointLight
        position={[0, 1, 3]}
        intensity={0.5}
        color="#ffe8a0"
        distance={8}
      />
    </>
  );
}

interface SceneProps {
  className?: string;
}

export default function Scene({ className = "" }: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 1, 6], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <SceneLighting />

        <Suspense fallback={null}>
          {/* HDRI environment for reflections (subtle) */}
          <Environment preset="city" background={false} />

          <TVModel url="/hero.glb" />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.5}
            scale={14}
            blur={2.5}
            far={4}
            color="#c9a96e"
          />

          <Preload all />
        </Suspense>

        {/* Disable orbit controls so we keep camera parallax via mouse only */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
