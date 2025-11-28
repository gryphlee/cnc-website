"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows, Environment, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Tumatanggap na ng prop na 'isQuantum'
function CNCMachine({ isQuantum }: { isQuantum: boolean }) {
  const headRef = useRef<THREE.Group>(null!);
  // Internal timer para sa smooth animation loop
  const [t, setT] = useState(0);

  useFrame((state, delta) => {
    // Speed multiplier: Classic = Slow (1x), Quantum = Fast (2.5x)
    const speed = isQuantum ? delta * 2.5 : delta; 
    const nextT = t + speed;
    setT(nextT);

    let x, y, z;

    if (isQuantum) {
      // QUANTUM PATH: Complex "Lissajous" Star Pattern (Mabilis & Sharp)
      x = Math.sin(nextT * 2) * 2.5; 
      y = Math.cos(nextT * 3) * 2;   
      z = Math.sin(nextT * 5) > 0 ? 0.2 : -0.5; // Rapid cutting
    } else {
      // CLASSIC PATH: Figure 8 (Infinity Loop) - Smooth & Slow
      x = Math.cos(nextT) * 2;
      y = Math.sin(nextT * 2) * 1;
      z = Math.sin(nextT) > 0 ? 0.5 : -0.5;
    }

    // Apply movement
    headRef.current.position.x = THREE.MathUtils.lerp(headRef.current.position.x, x, 0.1);
    headRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, y, 0.1);
    headRef.current.position.y = THREE.MathUtils.lerp(headRef.current.position.y, 1 + z, 0.1);
  });

  // Color logic
  const trailColor = isQuantum ? "#a855f7" : "#22d3ee"; // Purple vs Cyan
  const bitColor = isQuantum ? "#d8b4fe" : "#f59e0b";

  return (
    <group>
      {/* Stock Material */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[5.5, 0.5, 4.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Moving Head */}
      <group ref={headRef} position={[0, 1, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        
        {/* TRAIL (The glowing line) */}
        <Trail width={0.2} length={12} color={trailColor} attenuation={(t) => t * t}>
            <mesh position={[0, -0.3, 0]}>
              <coneGeometry args={[0.08, 0.6, 32]} />
              <meshStandardMaterial color={bitColor} emissive={bitColor} emissiveIntensity={2} />
            </mesh>
        </Trail>

        {/* Laser Guide */}
        <mesh position={[0, -2, 0]}>
           <cylinderGeometry args={[0.01, 0.01, 4, 8]} />
           <meshBasicMaterial color={trailColor} opacity={0.3} transparent />
        </mesh>
      </group>
    </group>
  );
}

export default function DigitalTwin({ isQuantum }: { position: any, isQuantum: boolean }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [12, 12, 12], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {/* Spotlight changes color based on mode */}
        <spotLight position={[0, 10, 0]} intensity={2} color={isQuantum ? "#a855f7" : "#22d3ee"} />
        
        <CNCMachine isQuantum={isQuantum} />
        
        <ContactShadows opacity={0.7} scale={15} blur={2} />
        <Grid sectionSize={1} cellColor="#1e293b" sectionColor={isQuantum ? "#a855f7" : "#06b6d4"} infiniteGrid fadeDistance={25} />
        <Environment preset="city" />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}