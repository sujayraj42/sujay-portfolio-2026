import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/utils/data";

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#050505] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-[#E8FF00] mb-2">
          07 / THE PATH
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-16">
          EDUCATION
        </h2>

        <div className="relative">
          {/* Diagonal connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -rotate-12 origin-top hidden md:block" />

          <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto">
            {education.map((edu, i) => {
              const rotate = i % 2 === 0 ? "-rotate-1" : "rotate-1";
              const offset = i % 2 === 0 ? "md:-translate-x-8" : "md:translate-x-8";

              return (
                <motion.div
                  key={edu.id}
                  className={`relative glass rounded-lg p-6 md:p-8 ${rotate} ${offset} transition-transform hover:scale-[1.01]`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  {/* Active indicator */}
                  {edu.active && (
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#E8FF00] rounded-full" />
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ml-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-[#555]">
                          {edu.range}
                        </span>
                        {edu.active && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#E8FF00]/10 text-[#E8FF00] border border-[#E8FF00]/20">
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-[#F0F0F0]">
                        {edu.degree}
                      </h3>
                      <p className="font-body text-sm text-[#F0F0F0]/60 mt-1">
                        {edu.institution}
                      </p>
                      {edu.detail && (
                        <p className="font-mono text-xs text-[#555] mt-2">
                          {edu.detail}
                        </p>
                      )}
                    </div>

                    {edu.url && (
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[#555] hover:text-[#E8FF00] transition-colors underline underline-offset-4"
                      >
                        Visit →
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
