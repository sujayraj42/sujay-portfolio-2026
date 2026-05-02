import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/utils/data";

gsap.registerPlugin(ScrollTrigger);

function HexGrid() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center py-8">
      {skills.languages.map((lang) => (
        <motion.div
          key={lang.name}
          className="hexagon w-28 h-32 md:w-36 md:h-40 flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:bg-[#E8FF00]/10 hover:border-[#E8FF00]/40 transition-all group"
          whileHover={{ scale: 1.1 }}
        >
          <span className="font-display text-sm md:text-base font-bold text-[#F0F0F0] group-hover:text-[#E8FF00]">
            {lang.name}
          </span>
          <div className="mt-2 w-10 h-10 rounded-full border-2 border-[#E8FF00]/30 flex items-center justify-center">
            <span className="font-mono text-[10px] text-[#E8FF00]">
              {lang.level}%
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#555] mt-2 text-center px-2 leading-tight">
            {lang.desc}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function FloatingTags() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const coords = [
    { x: 5, y: 10 },
    { x: 30, y: 25 },
    { x: 55, y: 8 },
    { x: 75, y: 30 },
    { x: 15, y: 55 },
    { x: 45, y: 60 },
    { x: 70, y: 55 },
    { x: 10, y: 80 },
    { x: 35, y: 85 },
    { x: 60, y: 80 },
    { x: 85, y: 70 },
  ];

  return (
    <div ref={ref} className="relative w-full h-[400px] md:h-[500px]">
      {skills.frameworks.map((tag, i) => {
        const coord = coords[i % coords.length];
        return (
          <motion.div
            key={tag}
            className="absolute px-4 py-2 rounded-full border border-white/10 bg-white/5 font-mono text-xs md:text-sm text-[#F0F0F0] hover:border-[#E8FF00]/40 hover:text-[#E8FF00] transition-colors"
            style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
            initial={{ opacity: 0, scale: 0.5, x: ((i * 47) % 100) - 50 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, x: 0 }
                : {}
            }
            transition={{ delay: i * 0.08, duration: 0.5 }}
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
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= skills.backendLines.length) {
        setLines(skills.backendLines.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="w-full max-w-xl mx-auto">
      <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-[#FF3C00]" />
          <span className="w-3 h-3 rounded-full bg-[#E8FF00]" />
          <span className="w-3 h-3 rounded-full bg-[#00F5FF]" />
          <span className="font-mono text-[10px] text-[#555] ml-2">
            backend.config
          </span>
        </div>
        <div className="p-4 min-h-[180px]">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className="font-mono text-sm text-[#F0F0F0]/80"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[#E8FF00]">$</span> {line}
            </motion.p>
          ))}
          <motion.span
            className="inline-block w-2 h-4 bg-[#E8FF00] ml-4 mt-1"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
}

function WordCloud() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const sizeClasses: Record<string, string> = {
    large: "text-2xl md:text-4xl",
    medium: "text-lg md:text-2xl",
    small: "text-sm md:text-lg",
  };

  const colors = ["#E8FF00", "#FF3C00", "#00F5FF", "#F0F0F0"];

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-8 max-w-3xl mx-auto"
    >
      {skills.softSkills.map((skill, i) => (
        <motion.span
          key={skill.name}
          className={`font-display font-bold ${sizeClasses[skill.size]}`}
          style={{ color: colors[i % colors.length] }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1 }}
        >
          {skill.name}
        </motion.span>
      ))}
    </div>
  );
}

const panels = [
  { title: "LANGUAGES", component: <HexGrid /> },
  { title: "FRAMEWORKS & TOOLS", component: <FloatingTags /> },
  { title: "BACKEND", component: <TerminalPanel /> },
  { title: "SOFT SKILLS", component: <WordCloud /> },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const ctx = gsap.context(() => {
      const scrollWidth = trigger.scrollWidth - window.innerWidth;
      gsap.to(trigger, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
      <div className="py-16 px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-[#E8FF00] mb-2">
          02 / THE ARSENAL
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0]">
          SKILLS
        </h2>
      </div>

      <div ref={triggerRef} className="flex w-max">
        {panels.map((panel, i) => (
          <div
            key={i}
            className="w-screen h-[calc(100vh-200px)] flex flex-col px-6 md:px-16 border-r border-white/5"
          >
            <div className="flex items-center gap-4 mb-8 pt-8">
              <span className="font-mono text-xs text-[#555]">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-[#F0F0F0]">
                {panel.title}
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {panel.component}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
