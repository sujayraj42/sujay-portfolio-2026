import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const [exit, setExit] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setExit(true), 400);
          setTimeout(() => onComplete(), 1200);
          return 100;
        }
        return prev + 1;
      });
    }, 28);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* SVG SC Monogram stroke animation */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="mb-8"
          >
            <motion.path
              d="M30 40 Q20 40 20 55 Q20 70 35 70 L50 70"
              fill="none"
              stroke="#E8FF00"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M60 30 L60 90 M60 30 Q90 30 90 50 Q90 70 60 70 M60 70 Q90 70 90 90 Q90 110 60 110"
              fill="none"
              stroke="#E8FF00"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>

          <div className="font-mono text-sm tracking-widest text-[#555]">
            LOADING
          </div>
          <div className="font-mono text-3xl font-bold text-[#E8FF00] mt-2">
            {percent}%
          </div>

          {/* Split panels that slide away on exit */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#050505] border-b border-[#111]"
            initial={{ y: 0 }}
            animate={exit ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505] border-t border-[#111]"
            initial={{ y: 0 }}
            animate={exit ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
