import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function WireframeShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.15;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.y += delta * 0.3;
      edgesRef.current.rotation.x += delta * 0.15;
    }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.4, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  const positions = useMemo(() => {
    const pos = edges.attributes.position;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i += 2) {
      points.push(
        new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)),
        new THREE.Vector3(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1))
      );
    }
    return points;
  }, [edges]);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial wireframe color="#E8FF00" transparent opacity={0.15} />
      </mesh>
      <group ref={edgesRef}>
        {positions.map((_, i) =>
          i % 2 === 0 ? (
            <Line
              key={i}
              points={[positions[i], positions[i + 1]]}
              color="#E8FF00"
              lineWidth={1.5}
              transparent
              opacity={0.6}
            />
          ) : null
        )}
      </group>
    </group>
  );
}

const slotWords = ["Builder.", "Creator.", "Coder.", "Innovator."];

export default function Hero() {
  const [slotIndex, setSlotIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<{ x: number; y: number; glow: boolean }[]>(() => {
    if (typeof window === "undefined") return [];
    const cols = Math.ceil(window.innerWidth / 24);
    const rows = Math.ceil(window.innerHeight / 24);
    const initialDots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        initialDots.push({ x: c * 24, y: r * 24, glow: false });
      }
    }
    return initialDots;
  });

  // Slot machine cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setSlotIndex((prev) => (prev + 1) % slotWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Dot grid proximity glow
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setDots((prev) =>
        prev.map((dot) => {
          const dx = dot.x - e.clientX;
          const dy = dot.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { ...dot, glow: dist < 120 };
        })
      );
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex items-end pb-16 md:pb-24"
    >
      {/* Dot grid canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full transition-colors duration-300"
            style={{
              left: dot.x,
              top: dot.y,
              background: dot.glow ? "#E8FF00" : "rgba(255,255,255,0.08)",
              boxShadow: dot.glow ? "0 0 6px #E8FF00" : "none",
            }}
          />
        ))}
      </div>

      {/* Main content - left aligned, bottom third */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        {/* Left block ~80% */}
        <div className="md:col-span-10">
          <motion.p
            className="font-mono text-[11px] md:text-xs tracking-widest text-[#555] mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            — FULL STACK DEVELOPER · OPEN TO WORK
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(60px,12vw,160px)] font-bold leading-[0.9] tracking-[-0.04em] text-[#F0F0F0]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              SUJAY
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(60px,12vw,160px)] font-bold leading-[0.9] tracking-[-0.04em] text-[#F0F0F0]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            >
              CHAKRAVARTI
            </motion.h1>
          </div>

          {/* Yellow rule */}
          <motion.div
            className="h-[2px] bg-[#E8FF00] mt-6 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
          />

          {/* Slot machine cycler */}
          <div className="mt-6 h-[40px] overflow-hidden">
            <motion.div
              key={slotIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display text-2xl md:text-3xl text-[#E8FF00]"
            >
              {slotWords[slotIndex]}
            </motion.div>
          </div>
        </div>

        {/* Right vertical text */}
        <div className="hidden md:flex md:col-span-2 justify-end items-end">
          <p className="vertical-text font-mono text-[10px] tracking-widest text-[#555]">
            BCA · LPU · JALANDHAR · 2026
          </p>
        </div>
      </div>

      {/* 3D Wireframe - bottom right */}
      <div className="absolute bottom-8 right-8 w-[200px] h-[200px] md:w-[280px] md:h-[280px] z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <WireframeShape />
        </Canvas>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-12 flex flex-col items-center gap-2 z-10">
        <span className="vertical-text font-mono text-[10px] tracking-widest text-[#555]">
          SCROLL
        </span>
        <motion.div
          className="w-[1px] h-8 bg-[#555]"
          animate={{ scaleY: [1, 0.5, 1], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
