import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aboutStats } from "@/utils/data";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    if (!Number.isFinite(numeric)) { setDisplay(value); return; }
    let cur = 0;
    const step = Math.max(1, Math.floor(numeric / 40));
    const id = window.setInterval(() => {
      cur += step;
      if (cur >= numeric) { cur = numeric; window.clearInterval(id); }
      setDisplay(cur + suffix);
    }, 28);
    return () => window.clearInterval(id);
  }, [inView, value]);
  return (
    <div ref={ref} className="flex flex-col items-start min-w-[96px]">
      <span className="font-display text-3xl md:text-5xl font-bold text-white tabular-nums">{display}</span>
      <span className="font-mono text-[10px] tracking-widest text-white/30 mt-1 uppercase">{label}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const words = "I build full-stack web experiences — from pixel-perfect frontends to structured backends — and have led events for 20,000+ people.".split(" ");

  return (
    <section id="about" ref={sectionRef} className="relative w-full py-20 md:py-36 bg-[#050505] overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0 brutal-grid opacity-[0.18] pointer-events-none" />
      <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 watermark opacity-[0.06] select-none pointer-events-none hidden md:block">01</div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#E8FF00]">01 / ABOUT</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-2">The Human Behind the Code</h2>
          <p className="font-mono text-xs text-white/30 mt-3 leading-relaxed">LPU · BCA · Jalandhar. Builder of SHIPPED products. Leader of 20K+ human moments on stage.</p>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-[11px] leading-5 text-white/60">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF3C00]" /><span className="w-2 h-2 rounded-full bg-[#E8FF00]" /><span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
              <span className="ml-2 text-[10px] tracking-widest text-white/25">README.md</span>
            </div>
            <p><span className="text-[#E8FF00]">$</span> whoami — Sujay · Full Stack</p>
            <p className="text-white/35">→ Frontend obsessed. Backend disciplined.</p>
            <p className="text-white/35">→ Events: stage management at scale.</p>
          </div>

          <div className="hidden md:flex flex-col gap-3 mt-8">
            {[
              { y: "2020", l: "Started programming journey" },
              { y: "2022", l: "ADCA & Higher Secondary (Science)" },
              { y: "2023", l: "BCA @ Lovely Professional University" },
              { y: "2025", l: "Co-Founded Dev Krafters Studio" },
              { y: "2026", l: "MCA @ DBUU · Open to full-stack roles", active: true },
            ].map((t) => (
              <div key={t.y} className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${t.active ? "bg-[#E8FF00] shadow-[0_0_10px_rgba(232,255,0,0.8)]" : "bg-white/20"}`} />
                <span className={`font-mono text-[11px] ${t.active ? "text-white" : "text-white/35"}`}>{t.y} — {t.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-8">
          <p className="font-display text-[22px] md:text-[30px] leading-[1.45] text-white">
            {words.map((w, i) => {
              const hl = w.includes("full-stack") || w.includes("20,000+");
              return (
                <motion.span
                  key={i}
                  className={`inline-block mr-[0.32em] ${hl ? "highlight-bar" : ""}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              );
            })}
          </p>

          <p className="font-body text-sm md:text-base text-white/60 mt-5 leading-relaxed">
            I'm a self-driven Full Stack Web Developer and builder who takes ideas from concept to live deployment — not just localhost repos, but real production apps on the internet. As Co-Founder of <span className="text-[#E8FF00] font-semibold">Dev Krafters</span>, I engineer custom B2B applications with Gemini Vision AI quoting, WhatsApp pipelines, and automated GST generation.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Node.js", "MongoDB", "Firebase", "Cypress", "REST APIs", "Tailwind CSS", "Gemini Vision API", "Puppeteer", "GSAP & Three.js"].map((k) => (
              <span key={k} className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/70 hover:border-[#E8FF00]/30 hover:text-[#E8FF00] transition-colors">{k}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-8 md:gap-14 mt-10 pt-8 border-t border-white/10">
            {aboutStats.map((s) => <AnimatedStat key={s.label} value={s.value} label={s.label} />)}
          </div>

          <div className="mt-8 flex gap-3">
            <a href="#experience" className="px-6 py-3 rounded-full bg-[#E8FF00] text-black font-mono text-xs tracking-widest hover:brightness-110 transition">EXPERIENCE →</a>
            <a href="#work" className="px-6 py-3 rounded-full border border-white/10 text-white/80 font-mono text-xs tracking-widest hover:border-[#E8FF00]/40 hover:text-[#E8FF00] transition">SEE WORK</a>
          </div>
        </div>
      </div>
    </section>
  );
}
