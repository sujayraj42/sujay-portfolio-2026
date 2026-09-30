import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/utils/data";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [drawer, setDrawer] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    if (!drawer) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawer(null); };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [drawer]);

  const onMove = (e: React.MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });

  return (
    <>
      <section id="work" className="relative w-full py-20 md:py-32 bg-[#050505] border-t border-white/[0.04]" onMouseMove={onMove}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#E8FF00]">03 / THE WORK</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-2">PROJECTS</h2>
              <p className="font-mono text-xs text-white/30 mt-2">9 shipped · hover for preview · click for details</p>
            </div>
            <span className="hidden md:block font-mono text-[11px] tracking-widest text-white/20">— FULL-STACK · PRODUCT · CRAFT</span>
          </div>

          <div className="mt-10 flex flex-col">
            {projects.map((p) => (
              <button
                key={p.id}
                data-project-hover
                onMouseEnter={() => setActiveId(p.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setDrawer(p)}
                onFocus={() => setActiveId(p.id)}
                onBlur={() => setActiveId(null)}
                className="group text-left relative border-b border-white/10 py-5 md:py-7 transition-colors hover:bg-[#E8FF00]/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8FF00]/40"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-14 md:w-20 shrink-0 flex items-center gap-2">
                    <span className="font-mono text-lg md:text-2xl text-white/25 group-hover:text-[#E8FF00] transition-colors">{p.index}</span>
                    <span className={`font-mono text-lg md:text-2xl text-[#E8FF00] transition-all duration-300 ${activeId === p.id ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 md:opacity-0"} hidden md:inline`}>→</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-[18px] md:text-[32px] font-bold text-white group-hover:translate-x-1 transition-transform duration-300 truncate">
                        {p.name}
                        {p.starred ? <span className="text-[#E8FF00] ml-2">★</span> : null}
                      </h3>
                      {p.badge && (
                        <span className="font-mono text-[9px] md:text-[10px] px-2 py-0.5 rounded-full border border-[#E8FF00]/30 text-[#E8FF00] bg-[#E8FF00]/10 shrink-0">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    {p.subtitle ? <p className="font-mono text-xs text-white/35 mt-1 truncate">{p.subtitle}</p> : null}
                    <p className="md:hidden font-mono text-[11px] text-white/40 mt-1 line-clamp-2">{p.description}</p>
                    <div className="md:hidden flex flex-wrap gap-1.5 mt-2">
                      {p.tech.slice(0, 3).map((t) => <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/40">{t}</span>)}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-3 shrink-0">
                    <div className="hidden lg:flex gap-1.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-white/40 group-hover:border-[#E8FF00]/20 group-hover:text-white/60 transition-colors">{t}</span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-white/25 bg-white/[0.03] border border-white/5 px-2 py-1 rounded-full">{p.year}</span>
                  </div>
                  <span className="md:hidden font-mono text-[10px] text-white/20">{p.year}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeId !== null && (
            <motion.div
              className="fixed z-50 w-72 pointer-events-none hidden md:block"
              style={{ left: mouse.x + 18, top: mouse.y - 20 }}
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="glass rounded-xl p-4 border border-white/10 bg-[#0a0a0a]/90 backdrop-blur">
                <p className="font-mono text-[11px] tracking-widest text-[#E8FF00]">PREVIEW</p>
                <p className="font-body text-sm text-white/75 leading-relaxed mt-2">{projects.find((x) => x.id === activeId)?.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {drawer && <ProjectDrawer project={drawer} onClose={() => setDrawer(null)} />}
      </AnimatePresence>
    </>
  );
}

function ProjectDrawer({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => { panelRef.current?.focus(); }, []);
  return (
    <motion.div className="fixed inset-0 z-[150] flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button aria-label="Close drawer backdrop" className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} details`}
        className="relative w-[92vw] max-w-[880px] h-full bg-[#0a0a0a] border-l border-white/10 overflow-y-auto outline-none"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="p-7 md:p-12">
          <button onClick={onClose} className="font-mono text-xs tracking-widest text-white/40 hover:text-white transition flex items-center gap-2">
            ← CLOSE <span className="text-[10px] border border-white/10 rounded px-1.5 py-0.5">ESC</span>
          </button>
          <span className="inline-block mt-8 font-mono text-[11px] tracking-widest text-[#E8FF00]">PROJECT {project.index} · {project.year} {project.badge ? `· ${project.badge}` : ""}</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-2 leading-tight">{project.name}</h2>
          {project.subtitle ? <p className="font-display text-lg text-white/40 mt-2">{project.subtitle}</p> : null}
          <div className="h-px w-full bg-[#E8FF00]/30 my-7" />
          <p className="font-body text-[15px] md:text-lg text-white/70 leading-relaxed max-w-2xl">{project.description}</p>
          <div className="mt-8">
            <p className="font-mono text-[10px] tracking-widest text-white/30 mb-3">TECH STACK</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-full border border-[#E8FF00]/25 text-[#E8FF00] bg-[#E8FF00]/5">{t}</span>)}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-10">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white hover:bg-[#E8FF00] hover:text-black hover:border-[#E8FF00] transition-colors font-mono text-sm">
                <FiGithub /> GitHub
              </a>
            ) : null}
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8FF00] text-black hover:brightness-110 transition font-mono text-sm">
                <FiExternalLink /> Live Site
              </a>
            ) : null}
          </div>
          <p className="mt-12 pt-6 border-t border-white/5 font-mono text-xs text-white/25">© 2026 Sujay Chakravarti · Crafted for top studios</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
