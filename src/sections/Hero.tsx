import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function WireframeShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const s = delta * 0.28;
    if (meshRef.current) { meshRef.current.rotation.y += s; meshRef.current.rotation.x += s * 0.5; }
    if (edgesRef.current) { edgesRef.current.rotation.y += s; edgesRef.current.rotation.x += s * 0.5; }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.4, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  const points = useMemo(() => {
    const pos = edges.attributes.position;
    const pts: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < pos.count; i += 2) {
      pts.push([
        new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)),
        new THREE.Vector3(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1)),
      ]);
    }
    return pts;
  }, [edges]);

  useEffect(() => () => { geometry.dispose(); edges.dispose(); }, [geometry, edges]);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial wireframe color="#E8FF00" transparent opacity={0.14} />
      </mesh>
      <group ref={edgesRef}>
        {points.map(([a, b], i) => (
          <Line key={i} points={[a, b]} color="#E8FF00" lineWidth={1.2} transparent opacity={0.55} />
        ))}
      </group>
    </group>
  );
}

function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const gap = 24;
    const r = 1.1;
    const glowR = 110;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * gap + (gap * 0.5);
          const py = y * gap;
          const dx = px - mouse.current.x;
          const dy = py - mouse.current.y;
          const d = Math.hypot(dx, dy);
          const glow = d < glowR ? 1 - d / glowR : 0;
          if (glow > 0.02) {
            const a = 0.1 + glow * 0.9;
            ctx.fillStyle = `rgba(232,255,0,${a})`;
            ctx.shadowColor = "#E8FF00";
            ctx.shadowBlur = glow * 10;
            ctx.beginPath();
            ctx.arc(px, py, r + glow * 1.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = "rgba(255,255,255,0.08)";
            ctx.beginPath();
            ctx.arc(px, py, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none block" aria-hidden />;
}

const slotWords = ["Builder.", "Creator.", "Coder.", "Innovator."];

function CodeCard() {
  const lines = [
    "const sujay = {",
    "  role: 'Full Stack Developer & Co-Founder',",
    "  studio: 'Dev Krafters',",
    "  stack: ['React', 'Node.js', 'MongoDB', 'Firebase'],",
    "  topSkills: ['Cypress', 'REST APIs', 'Tailwind CSS'],",
    "  status: 'OPEN_TO_WORK',",
    "  location: 'Jalandhar, Punjab, IN',",
    "};",
    "sujay.ship(); // 9 projects live → prod",
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= lines.length) window.clearInterval(id);
    }, 200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="w-full max-w-[380px] rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#FF3C00]" /><span className="w-3 h-3 rounded-full bg-[#E8FF00]" /><span className="w-3 h-3 rounded-full bg-[#00F5FF]" />
        <span className="ml-2 font-mono text-[10px] tracking-widest text-white/40">sujay.config.ts — ~/portfolio</span>
      </div>
      <div className="p-4 font-mono text-[11px] md:text-xs leading-5">
        {lines.slice(0, visible).map((l, i) => (
          <div key={i} className="whitespace-pre text-white/70">
            <span className="text-[#E8FF00]/60 mr-2 select-none">{String(i + 1).padStart(2, "0")}</span>
            <span className={l.includes("OPEN_TO_WORK") ? "text-[#E8FF00]" : l.trim().startsWith("//") ? "text-white/35" : "text-white/75"}>{l}</span>
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-[#E8FF00] ml-7 mt-1 animate-pulse align-middle" aria-hidden />
      </div>
      <div className="px-4 pb-3 flex gap-2">
        <a href="#work" className="flex-1 text-center py-2 rounded-full bg-[#E8FF00] text-black font-mono text-[11px] tracking-widest hover:bg-[#eeff33] transition-colors">VIEW WORK →</a>
        <a href="#contact" className="flex-1 text-center py-2 rounded-full border border-white/10 text-white/80 font-mono text-[11px] tracking-widest hover:border-[#E8FF00]/40 hover:text-[#E8FF00] transition-colors">HIRE ME</a>
      </div>
    </div>
  );
}

export default function Hero() {
  const [slotIndex, setSlotIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  useEffect(() => {
    const id = window.setInterval(() => setSlotIndex((p) => (p + 1) % slotWords.length), 1900);
    return () => window.clearInterval(id);
  }, []);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] w-full overflow-hidden bg-[#050505] flex items-end">
      <DotCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />

      {/* subtle top meta bar */}
      <div className="absolute top-[58px] left-0 right-0 hidden md:flex justify-between px-12 max-w-[1600px] mx-auto w-full pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">EST. 2005 · JALANDHAR, PUNJAB</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">DEV KRAFTERS CO-FOUNDER · 00/08</span>
      </div>

      <motion.div style={{ y: yTitle, opacity: opacityHero }} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-28 pb-10 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <motion.p className="font-mono text-[11px] md:text-xs tracking-[0.18em] text-white/40 mb-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            — FULL STACK DEVELOPER · CO-FOUNDER @ DEV KRAFTERS · OPEN TO WORK
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1 className="font-display text-[clamp(56px,11vw,150px)] font-bold leading-[0.88] tracking-[-0.04em] text-[#F0F0F0]" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
              SUJAY
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 className="font-display text-[clamp(56px,11vw,150px)] font-bold leading-[0.88] tracking-[-0.04em] text-[#F0F0F0]" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}>
              CHAKRAVARTI
            </motion.h1>
          </div>

          <motion.div className="h-[2px] bg-[#E8FF00] mt-5 origin-left max-w-[720px]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: "easeInOut", delay: 0.85 }} />

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="h-[30px] overflow-hidden min-w-[160px]">
              <AnimatePresence mode="wait">
                <motion.div key={slotIndex} initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -28, opacity: 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="font-display text-2xl md:text-[28px] font-semibold text-[#E8FF00] leading-none">
                  {slotWords[slotIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="hidden md:inline h-4 w-px bg-white/10" />
            <span className="font-mono text-xs text-white/50">React · Node.js · MongoDB · Firebase · Cypress · Tailwind</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => scrollTo("#experience")} className="px-6 py-3 rounded-full bg-[#E8FF00] text-black font-mono text-xs tracking-widest hover:brightness-110 active:scale-[0.98] transition">EXPERIENCE —→</button>
            <button onClick={() => scrollTo("#work")} className="px-6 py-3 rounded-full border border-white/15 text-white font-mono text-xs tracking-widest hover:border-[#E8FF00]/60 hover:text-[#E8FF00] transition">VIEW PROJECTS</button>
            <a href="https://github.com/sujayraj42" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white/10 text-white/80 font-mono text-xs tracking-widest hover:border-[#E8FF00]/40 hover:text-[#E8FF00] transition">GITHUB</a>
            <a href="https://linkedin.com/in/sujay-2oo5/" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white/10 text-white/80 font-mono text-xs tracking-widest hover:border-[#E8FF00]/40 hover:text-[#E8FF00] transition">LINKEDIN</a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-[520px] border-t border-white/10 pt-5">
            {[
              { k: "Studio", v: "Dev Krafters" },
              { k: "Projects", v: "9 Shipped" },
              { k: "Stage Led", v: "20,000+" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-mono text-[10px] tracking-widest text-white/35">{s.k.toUpperCase()}</div>
                <div className="font-display text-lg font-bold text-white mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6">
          <CodeCard />
          <div className="hidden lg:block font-mono text-[10px] tracking-widest text-white/25 vertical-text">DEV KRAFTERS · MCA & BCA · JALANDHAR · FULL STACK BUILDER</div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 right-6 w-[180px] h-[180px] md:w-[280px] md:h-[280px] z-10 pointer-events-none opacity-90 max-md:hidden">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.7} />
          <WireframeShape />
        </Canvas>
      </div>

      <button onClick={() => scrollTo("#about")} className="absolute bottom-6 left-6 md:left-12 flex flex-col items-center gap-2 z-10 group" aria-label="Scroll to next section">
        <span className="vertical-text font-mono text-[10px] tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors">SCROLL</span>
        <motion.div className="w-px h-8 bg-white/20 group-hover:bg-[#E8FF00] transition-colors" animate={{ scaleY: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} style={{ transformOrigin: "top" }} />
      </button>
    </section>
  );
}
