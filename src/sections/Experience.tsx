import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/utils/data";
import { FiBriefcase, FiCheckCircle, FiCalendar, FiMapPin, FiCpu } from "react-icons/fi";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#050505] overflow-hidden border-t border-white/[0.04]"
    >
      <div className="absolute top-1/2 left-6 -translate-y-1/2 watermark opacity-[0.03] select-none pointer-events-none hidden md:block">
        EXP
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#E8FF00]">
              02 / PROFESSIONAL JOURNEY
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-2">
              WORK EXPERIENCE
            </h2>
            <p className="font-mono text-xs text-white/30 mt-2 max-w-xl">
              Co-founding a digital agency studio, deploying production full-stack systems, and engineering B2B AI tooling.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/40 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full">
              STUDIO & INDEPENDENT CLIENTS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-9 relative overflow-hidden flex flex-col justify-between group hover:border-[#E8FF00]/30 transition-all ${
                i === 0 ? "lg:col-span-7" : "lg:col-span-5"
              }`}
            >
              {/* Top ambient highlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8FF00]/5 blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-[#E8FF00] bg-[#E8FF00]/10 border border-[#E8FF00]/25 px-2.5 py-1 rounded-full">
                    {exp.badge}
                  </span>
                  <div className="flex items-center gap-3 font-mono text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-[#E8FF00]" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin /> {exp.location}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-[#E8FF00] transition-colors">
                  {exp.role}
                </h3>
                <p className="font-mono text-sm text-white/60 mt-1 flex items-center gap-2">
                  <FiBriefcase className="text-[#E8FF00]" /> {exp.company}
                </p>

                <p className="font-body text-sm md:text-base text-white/70 mt-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                  <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                    Key Deliverables & Impact
                  </p>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 font-body text-xs md:text-sm text-white/65 leading-normal">
                        <FiCheckCircle className="text-[#E8FF00] shrink-0 mt-0.5 text-xs" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-3 flex items-center gap-1.5">
                  <FiCpu className="text-[#E8FF00]" /> Technologies & Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] md:text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-white/70 group-hover:border-[#E8FF00]/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
