"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollToSection } from "@/lib/scroll";

// TV configuration: maps mesh name patterns → scroll targets + labels
const TV_CONFIG: Record<
  string,
  { target: string; label: string; hint: string }
> = {
  CHADI: {
    target: "about",
    label: "CHADI",
    hint: "About me →",
  },
  VIDEASTZ: {
    target: "projects",
    label: "VIDEASTZ",
    hint: "My work →",
  },
  LOGO: {
    target: "home",
    label: "LOGO",
    hint: "Back to top →",
  },
};

// Determine which TV config applies based on mesh name
function getConfigForMesh(name: string): {
  target: string;
  label: string;
  hint: string;
} | null {
  const upper = name.toUpperCase();
  if (upper.includes("CHADI")) return TV_CONFIG.CHADI;
  if (upper.includes("VIDEASTZ") || upper.includes("MOTION")) return TV_CONFIG.VIDEASTZ;
  if (upper.includes("LOGO") || upper.includes("TV3") || upper.includes("TV_3"))
    return TV_CONFIG.LOGO;
  return null;
}

interface TVMeshProps {
  mesh: THREE.Mesh;
  config: { target: string; label: string; hint: string };
  index: number;
}

function TVMesh({ mesh, config, index }: TVMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timeRef = useRef(Math.random() * Math.PI * 2); // random phase

  // Clone the geometry + material so we can modify independently
  const clonedMesh = useRef<THREE.Mesh>(() => mesh.clone());

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    // Floating animation — unique per TV
    const floatY = Math.sin(timeRef.current * 0.6 + index * 1.2) * 0.08;
    const floatX = Math.sin(timeRef.current * 0.4 + index * 0.8) * 0.03;
    groupRef.current.position.y = mesh.position.y + floatY;
    groupRef.current.position.x = mesh.position.x + floatX;

    // Hover scale with smooth lerp
    const targetScale = hovered ? 1.06 : 1.0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Emissive glow on hover
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat && mat.emissive) {
        const targetEmissive = hovered ? 0.4 : 0.0;
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          targetEmissive,
          0.1
        );
      }
    }
  });

  const handleClick = useCallback(() => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    scrollToSection(config.target);
  }, [config.target]);

  return (
    <group
      ref={groupRef}
      position={mesh.position.clone()}
      rotation={mesh.rotation.clone()}
      scale={mesh.scale.clone()}
    >
      <primitive
        ref={meshRef}
        object={mesh.clone()}
        onPointerOver={(e: any) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "none";
        }}
        onClick={(e: any) => {
          e.stopPropagation();
          handleClick();
        }}
      />

      {/* HTML label that appears on hover */}
      {hovered && (
        <Html
          center
          position={[0, 1.4, 0]}
          style={{ pointerEvents: "none" }}
          distanceFactor={5}
        >
          <div
            className="tv-hint px-3 py-1.5 rounded text-xs whitespace-nowrap"
            style={{
              background: "rgba(8,8,8,0.85)",
              border: "1px solid rgba(232,213,176,0.25)",
              color: "var(--accent-warm)",
              backdropFilter: "blur(8px)",
              letterSpacing: "0.2em",
              boxShadow: "0 0 20px rgba(201,169,110,0.2)",
            }}
          >
            {config.hint}
          </div>
        </Html>
      )}
    </group>
  );
}

interface TVModelProps {
  url: string;
}

export default function TVModel({ url }: TVModelProps) {
  const { scene, nodes } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, mouse } = useThree();

  // Parallax camera on mouse move
  useFrame(() => {
    if (!camera) return;
    const targetX = mouse.x * 0.3;
    const targetY = mouse.y * 0.15;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1 + targetY, 0.04);
    camera.lookAt(0, 0, 0);
  });

  // Collect interactive meshes
  const tvMeshes: { mesh: THREE.Mesh; config: ReturnType<typeof getConfigForMesh> }[] =
    [];

  // Walk the scene graph and find all meshes
  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      const config = getConfigForMesh(mesh.name);
      if (config) {
        tvMeshes.push({ mesh, config });
      }
    }
  });

  // If we couldn't identify by name, assign TVs by order
  if (tvMeshes.length === 0) {
    let idx = 0;
    const configKeys = Object.keys(TV_CONFIG) as (keyof typeof TV_CONFIG)[];
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh && idx < configKeys.length) {
        const mesh = obj as THREE.Mesh;
        tvMeshes.push({ mesh, config: TV_CONFIG[configKeys[idx]] });
        idx++;
      }
    });
  }

  return (
    <group ref={groupRef}>
      {/* Render non-interactive parts of the scene */}
      <primitive object={scene} />

      {/* Render interactive TV meshes on top */}
      {tvMeshes.map(({ mesh, config }, i) =>
        config ? (
          <TVMesh key={mesh.uuid} mesh={mesh} config={config} index={i} />
        ) : null
      )}
    </group>
  );
}

// Pre-load GLB
useGLTF.preload("/hero.glb");
