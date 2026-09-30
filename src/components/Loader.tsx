import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = window.setInterval(() => {
      // ease out increment — starts fast, slows near 100
      const inc = p < 60 ? 2 : p < 85 ? 1 : Math.random() > 0.6 ? 1 : 0;
      p = Math.min(100, p + inc);
      setPercent(p);
      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setExit(true), 380);
        window.setTimeout(() => onComplete(), 1100);
      }
    }, 24);
    return () => window.clearInterval(id);
  }, [onComplete]);

  // lock scroll while loading
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, []);

  return (
    <AnimatePresence>
      {!exit ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-live="polite"
          aria-busy="true"
        >
          {/* subtle grid */}
          <div className="absolute inset-0 brutal-grid opacity-[0.35] pointer-events-none" />

          {/* SC monogram */}
          <svg width="132" height="132" viewBox="0 0 120 120" className="mb-7 relative z-10" aria-hidden>
            <motion.path
              d="M30 40 Q20 40 20 55 Q20 70 35 70 L50 70"
              fill="none" stroke="#E8FF00" strokeWidth={3} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M60 30 L60 90 M60 30 Q90 30 90 50 Q90 70 60 70 M60 70 Q90 70 90 90 Q90 110 60 110"
              fill="none" stroke="#E8FF00" strokeWidth={3} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.22 }}
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center">
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#555]">LOADING — SUJAY.CODE</span>
            <span className="font-mono text-4xl font-bold text-[#E8FF00] mt-1 tabular-nums">{String(percent).padStart(3, "0")}%</span>
            <div className="mt-5 w-[220px] h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-[#E8FF00]" style={{ width: `${percent}%` }} transition={{ ease: "linear" }} />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#6a6a6a] mt-3">crafting the experience…</span>
          </div>

          {/* split panels */}
          <motion.div className="absolute top-0 left-0 w-full h-1/2 bg-[#050505] border-b border-white/[0.04]" initial={{ y: 0 }} animate={exit ? { y: "-100%" } : { y: 0 }} transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505] border-t border-white/[0.04]" initial={{ y: 0 }} animate={exit ? { y: "100%" } : { y: 0 }} transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
