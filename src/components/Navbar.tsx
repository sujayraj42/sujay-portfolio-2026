import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/utils/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = navLinks.map((l) => l.href.slice(1));
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160) cur = `#${id}`;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] border-b transition-all duration-300 ${scrolled ? "bg-[#050505]/85 backdrop-blur-xl border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "bg-transparent border-transparent"}`}
        style={{ height: 56 }}
        aria-label="Primary"
      >
        <div className="flex items-center justify-between px-6 h-full max-w-[1600px] mx-auto gap-6">
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-mono text-lg font-bold tracking-tight text-[#E8FF00] flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Go to top — Sujay Chakravarti"
          >
            <span className="w-7 h-7 rounded-md bg-[#E8FF00] text-black grid place-items-center text-xs font-bold">SC</span>
            <span className="hidden sm:inline text-white/80 text-xs tracking-widest font-normal">SUJAY.CODE</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/5 rounded-full p-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setOpen(false);
                }}
                className={`font-mono text-[11px] tracking-widest px-3 py-1.5 rounded-full transition-colors ${active === l.href ? "bg-[#E8FF00] text-black" : "text-white/60 hover:text-white hover:bg-white/5"}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8FF00] text-black font-mono text-[11px] tracking-widest hover:brightness-110 transition">
              HIRE ME →
            </a>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="font-mono text-[10px] tracking-wider text-white/70">OPEN TO WORK</span>
            </div>
            <button
              className="md:hidden w-10 h-10 grid place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-white transition-all ${open ? "w-5 rotate-45 translate-y-1" : "w-5"}`} />
                <span className={`block h-0.5 bg-white transition-all ${open ? "w-5 -rotate-45 -translate-y-1" : "w-4"}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[120] bg-[#050505] flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 h-[56px] border-b border-white/5">
              <span className="font-mono text-xs tracking-widest text-[#E8FF00]">MENU</span>
              <button onClick={() => setOpen(false)} className="font-mono text-xs tracking-widest text-white/60 hover:text-white border border-white/10 rounded-full px-3 py-1">CLOSE ✕</button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-6 gap-1">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    window.setTimeout(() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }), 180);
                  }}
                  className="font-display text-[32px] font-bold tracking-tight text-white py-2 border-b border-white/5 flex justify-between items-center"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {l.label} <span className="font-mono text-xs text-white/20">{l.href}</span>
                </motion.a>
              ))}
              <div className="mt-8 flex gap-3">
                <a href="https://github.com/sujayraj42" target="_blank" rel="noreferrer" className="flex-1 text-center py-3 rounded-full border border-white/10 text-white font-mono text-xs tracking-widest">GITHUB</a>
                <a href="#contact" onClick={() => setOpen(false)} className="flex-1 text-center py-3 rounded-full bg-[#E8FF00] text-black font-mono text-xs tracking-widest">CONTACT →</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
