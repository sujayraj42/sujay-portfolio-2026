import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aboutStats } from "@/utils/data";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    let current = 0;
    const step = Math.max(1, Math.floor(numeric / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= numeric) {
        current = numeric;
        clearInterval(interval);
      }
      setDisplay(current + suffix);
    }, 30);
    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <span className="font-display text-3xl md:text-5xl font-bold text-[#F0F0F0]">
        {display}
      </span>
      <span className="font-mono text-[10px] tracking-wider text-[#555] mt-1 uppercase">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const words =
    "I build full-stack web experiences — from pixel-perfect frontends to structured backends — and have led events for 20,000+ people.".split(
      " "
    );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#050505] overflow-hidden"
    >
      {/* Watermark */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 watermark opacity-40 select-none pointer-events-none">
        01
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Left column ~30% */}
        <div className="md:col-span-4 relative">
          <p className="font-mono text-[11px] tracking-widest text-[#E8FF00] mb-4">
            01 / ABOUT
          </p>

          {/* Timeline dots */}
          <div className="flex flex-col items-start gap-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E8FF00]" />
              <span className="font-mono text-[11px] text-[#555]">2020</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#555]" />
              <span className="font-mono text-[11px] text-[#555]">2022</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#555]" />
              <span className="font-mono text-[11px] text-[#555]">2023</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F5FF]" />
              <span className="font-mono text-[11px] text-[#F0F0F0]">2026</span>
            </div>
            <div className="w-[1px] h-24 bg-[#555] ml-[3px] -mt-4 -mb-4" />
          </div>
        </div>

        {/* Right column ~70% */}
        <div className="md:col-span-8">
          <p className="font-display text-xl md:text-[28px] leading-[1.4] text-[#F0F0F0]">
            {words.map((word, i) => {
              const isHighlight =
                word.includes("full-stack") || word.includes("20,000+");
              return (
                <motion.span
                  key={i}
                  className={`inline-block mr-[0.3em] ${
                    isHighlight ? "highlight-bar" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 md:gap-16 mt-16 pt-8 border-t border-white/10">
            {aboutStats.map((stat) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
