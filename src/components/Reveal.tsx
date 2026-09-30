import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Reveal({ children, delay = 0, y = 24, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, stagger = 0.06 }: { children: React.ReactNode[] | React.ReactNode; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const arr = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref}>
      {arr.map((c, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * stagger, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          {c}
        </motion.div>
      ))}
    </div>
  );
}
