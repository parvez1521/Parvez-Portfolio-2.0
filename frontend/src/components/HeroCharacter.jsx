import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";

const SKIN = "#E0AC7E";
const HOODIE = "#22222C";
const DARK = "#101014";
const ACCENT = "#CCFF00";

function Boy() {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y =
      Math.sin(t * 0.4) * 0.3 + state.pointer.x * 0.3;
    group.current.rotation.x = state.pointer.y * -0.08;
    group.current.position.y = Math.sin(t * 1.4) * 0.05 - 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={group} position={[0, -0.15, 0]}>
        {/* legs */}
        <mesh position={[-0.16, -0.78, 0]}>
          <capsuleGeometry args={[0.11, 0.34, 8, 16]} />
          <meshStandardMaterial color="#16161d" roughness={0.7} />
        </mesh>
        <mesh position={[0.16, -0.78, 0]}>
          <capsuleGeometry args={[0.11, 0.34, 8, 16]} />
          <meshStandardMaterial color="#16161d" roughness={0.7} />
        </mesh>
        {/* sneakers */}
        <mesh position={[-0.16, -1.06, 0.06]}>
          <boxGeometry args={[0.2, 0.12, 0.36]} />
          <meshStandardMaterial color="#f2f2ec" roughness={0.5} />
        </mesh>
        <mesh position={[0.16, -1.06, 0.06]}>
          <boxGeometry args={[0.2, 0.12, 0.36]} />
          <meshStandardMaterial color="#f2f2ec" roughness={0.5} />
        </mesh>
        {/* hoodie body */}
        <mesh position={[0, -0.12, 0]}>
          <capsuleGeometry args={[0.34, 0.5, 12, 24]} />
          <meshStandardMaterial color={HOODIE} roughness={0.85} />
        </mesh>
        {/* arms */}
        <mesh position={[-0.44, -0.14, 0]} rotation={[0, 0, 0.45]}>
          <capsuleGeometry args={[0.09, 0.4, 8, 16]} />
          <meshStandardMaterial color={HOODIE} roughness={0.85} />
        </mesh>
        <mesh position={[0.44, -0.14, 0]} rotation={[0, 0, -0.45]}>
          <capsuleGeometry args={[0.09, 0.4, 8, 16]} />
          <meshStandardMaterial color={HOODIE} roughness={0.85} />
        </mesh>
        {/* hands */}
        <mesh position={[-0.56, -0.42, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.55} />
        </mesh>
        <mesh position={[0.56, -0.42, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.55} />
        </mesh>
        {/* head */}
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={SKIN} roughness={0.55} />
        </mesh>
        {/* cap */}
        <mesh position={[0, 0.73, 0]}>
          <sphereGeometry args={[0.315, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
          <meshStandardMaterial color={DARK} roughness={0.6} />
        </mesh>
        {/* cap brim */}
        <mesh position={[0, 0.74, 0.32]} rotation={[0.12, 0, 0]}>
          <boxGeometry args={[0.44, 0.045, 0.3]} />
          <meshStandardMaterial color={ACCENT} roughness={0.4} />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.11, 0.64, 0.27]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={DARK} roughness={0.3} />
        </mesh>
        <mesh position={[0.11, 0.64, 0.27]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={DARK} roughness={0.3} />
        </mesh>
        {/* smile */}
        <mesh position={[0, 0.56, 0.28]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.07, 0.013, 8, 16, Math.PI]} />
          <meshStandardMaterial color={DARK} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroCharacter() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.6], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      data-testid="hero-3d-canvas"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 4]} intensity={1.5} />
      <pointLight position={[-3, -2, 2]} intensity={8} color={ACCENT} />
      <Boy />
      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.5}
        scale={6}
        blur={2.6}
        far={2.4}
        color="#000000"
      />
    </Canvas>
  );
}
