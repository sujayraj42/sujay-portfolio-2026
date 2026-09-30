import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/utils/data";

gsap.registerPlugin(ScrollTrigger);

function HexGrid() {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center py-6 max-w-3xl mx-auto">
      {skills.languages.map((lang) => (
        <motion.div
          key={lang.name}
          className="hexagon w-[118px] h-[132px] md:w-36 md:h-40 flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 hover:bg-[#E8FF00]/10 hover:border-[#E8FF00]/30 transition-colors group text-center p-3"
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <span className="font-display text-[13px] md:text-base font-bold text-[#F0F0F0] group-hover:text-[#E8FF00]">{lang.name}</span>
          <div className="mt-2 w-10 h-10 rounded-full border-2 border-[#E8FF00]/30 flex items-center justify-center">
            <span className="font-mono text-[10px] text-[#E8FF00]">{lang.level}%</span>
          </div>
          <span className="font-mono text-[9px] text-white/30 mt-2 leading-tight line-clamp-2">{lang.desc}</span>
        </motion.div>
      ))}
    </div>
  );
}

function FloatingTags() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const coords = [
    { x: 4, y: 8 }, { x: 30, y: 18 }, { x: 58, y: 6 }, { x: 76, y: 26 },
    { x: 12, y: 48 }, { x: 44, y: 56 }, { x: 70, y: 50 }, { x: 8, y: 74 },
    { x: 34, y: 80 }, { x: 60, y: 76 }, { x: 84, y: 66 },
  ];
  return (
    <div ref={ref} className="relative w-full h-[380px] md:h-[420px] max-w-4xl mx-auto">
      {skills.frameworks.map((tag, i) => {
        const c = coords[i % coords.length];
        return (
          <motion.div
            key={tag}
            className="absolute px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] font-mono text-xs md:text-sm text-white/80 hover:border-[#E8FF00]/40 hover:text-[#E8FF00] transition-colors"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {tag}
          </motion.div>
        );
      })}
    </div>
  );
}

function TerminalPanel() {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLines(skills.backendLines.slice(0, i));
      if (i >= skills.backendLines.length) window.clearInterval(id);
    }, 520);
    return () => window.clearInterval(id);
  }, [inView]);
  return (
    <div ref={ref} className="w-full max-w-xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-[#FF3C00]" /><span className="w-3 h-3 rounded-full bg-[#E8FF00]" /><span className="w-3 h-3 rounded-full bg-[#00F5FF]" />
          <span className="font-mono text-[10px] tracking-widest text-white/30 ml-2">backend.config — node --trace</span>
        </div>
        <div className="p-4 min-h-[170px] font-mono text-sm">
          {lines.map((line, i) => (
            <motion.p key={i} className="text-white/75" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
              <span className="text-[#E8FF00]">$</span> {line}
            </motion.p>
          ))}
          <motion.span className="inline-block w-2 h-4 bg-[#E8FF00] ml-4 mt-1 align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }} aria-hidden />
        </div>
      </div>
    </div>
  );
}

function WordCloud() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const size: Record<string, string> = { large: "text-2xl md:text-4xl", medium: "text-lg md:text-2xl", small: "text-sm md:text-lg" };
  const colors = ["#E8FF00", "#FF3C00", "#00F5FF", "#F0F0F0"];
  return (
    <div ref={ref} className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-6 max-w-3xl mx-auto">
      {skills.softSkills.map((s, i) => (
        <motion.span key={s.name} className={`font-display font-bold ${size[s.size]}`} style={{ color: colors[i % colors.length] }} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}>
          {s.name}
        </motion.span>
      ))}
    </div>
  );
}

const panels = [
  { title: "LANGUAGES", comp: <HexGrid /> },
  { title: "FRAMEWORKS & TOOLS", comp: <FloatingTags /> },
  { title: "BACKEND", comp: <TerminalPanel /> },
  { title: "SOFT SKILLS", comp: <WordCloud /> },
];

function useIsDesktop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const h = () => setV(m.matches);
    h();
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return v;
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!desktop || reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    // refresh after fonts/layout
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => { window.clearTimeout(t); ctx.revert(); };
  }, [desktop, reduced]);

  // mobile: no pin — natural vertical stack with scroll progress + swipe hint
  if (!desktop || reduced) {
    return (
      <section id="skills" className="relative bg-[#050505] overflow-hidden py-16">
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
          <p className="font-mono text-[11px] tracking-widest text-[#E8FF00]">04 / THE ARSENAL</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0] mt-2">SKILLS</h2>
          <p className="font-mono text-xs text-white/30 mt-3">Swipe or scroll — languages · frameworks · backend · soft skills</p>
        </div>
        <div className="mt-8 flex flex-col gap-10 px-6 md:px-12 max-w-[1600px] mx-auto">
          {panels.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-white/25">0{i + 1}</span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white">{p.title}</h3>
              </div>
              {p.comp}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="skills" ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
      <div className="pt-14 pb-4 px-6 md:px-12 max-w-[1600px] mx-auto flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-widest text-[#E8FF00]">04 / THE ARSENAL</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0] mt-2">SKILLS</h2>
        </div>
        <span className="hidden md:block font-mono text-[11px] tracking-widest text-white/25">— SCROLL TO EXPLORE → PINNED</span>
      </div>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {panels.map((p, i) => (
          <div key={p.title} className="w-screen h-[min(68vh,680px)] flex flex-col px-6 md:px-16 border-r border-white/5 shrink-0">
            <div className="flex items-center gap-4 pt-6 pb-4">
              <span className="font-mono text-xs text-white/25">0{i + 1}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{p.title}</h3>
              <span className="ml-auto hidden md:block font-mono text-[10px] tracking-widest text-white/20">{i + 1} / {panels.length}</span>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">{p.comp}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
