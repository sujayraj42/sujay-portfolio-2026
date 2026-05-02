import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/utils/data";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [drawerProject, setDrawerProject] = useState<(typeof projects)[0] | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <section
        id="work"
        className="relative w-full py-24 md:py-40 bg-[#050505]"
        onMouseMove={handleMouseMove}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <p className="font-mono text-[11px] tracking-widest text-[#E8FF00] mb-2">
            03 / THE WORK
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-16">
            PROJECTS
          </h2>

          <div ref={listRef} className="flex flex-col">
            {projects.map((project) => (
              <div
                key={project.id}
                data-project-hover
                className="group relative border-b border-white/10 py-6 md:py-8 transition-colors hover:bg-[#E8FF00]/5"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                onClick={() => setDrawerProject(project)}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Index number */}
                  <div className="w-16 md:w-24 flex-shrink-0 overflow-hidden">
                    <span className="font-mono text-xl md:text-3xl text-[#555] group-hover:text-[#E8FF00] transition-colors">
                      {project.index}
                    </span>
                    <motion.span
                      className="font-mono text-xl md:text-3xl text-[#E8FF00] block"
                      initial={{ y: 40 }}
                      animate={{ y: activeProject === project.id ? 0 : 40 }}
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>

                  {/* Project name */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-[40px] font-bold text-[#F0F0F0] group-hover:translate-x-5 transition-transform duration-300">
                      {project.name}
                      {project.subtitle && (
                        <span className="text-[#555] text-lg md:text-2xl font-normal">
                          {" "}
                          — {project.subtitle}
                        </span>
                      )}
                      {project.starred && (
                        <span className="text-[#E8FF00] ml-2">★</span>
                      )}
                    </h3>
                  </div>

                  {/* Tech + year */}
                  <div className="hidden md:flex items-center gap-4">
                    <div className="flex gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-1 rounded border border-white/10 text-[#555]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[#555]">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating preview card */}
        <AnimatePresence>
          {activeProject !== null && (
            <motion.div
              className="fixed z-50 w-72 pointer-events-none hidden md:block"
              style={{
                left: mousePos.x + 20,
                top: mousePos.y - 40,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass rounded-lg p-4">
                <p className="font-body text-sm text-[#F0F0F0]/80 leading-relaxed">
                  {projects.find((p) => p.id === activeProject)?.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Project Drawer */}
      <AnimatePresence>
        {drawerProject && (
          <ProjectDrawer
            project={drawerProject}
            onClose={() => setDrawerProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectDrawer({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[150] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className="relative w-[90vw] max-w-[900px] h-full bg-[#0a0a0a] border-l border-white/10 overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="p-8 md:p-16">
          <button
            onClick={onClose}
            className="font-mono text-xs text-[#555] hover:text-[#F0F0F0] mb-12 block"
          >
            ← CLOSE
          </button>

          <span className="font-mono text-[11px] text-[#E8FF00] tracking-widest">
            PROJECT {project.index}
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0] mt-2">
            {project.name}
          </h2>
          {project.subtitle && (
            <p className="font-display text-xl text-[#555] mt-2">
              {project.subtitle}
            </p>
          )}

          <div className="h-[2px] w-full bg-[#E8FF00] my-8 origin-left" />

          <p className="font-body text-lg text-[#F0F0F0]/80 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="mt-8">
            <p className="font-mono text-[10px] tracking-widest text-[#555] mb-3">
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1 rounded-full border border-[#E8FF00]/30 text-[#E8FF00]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-[#F0F0F0] hover:bg-[#E8FF00] hover:text-[#050505] hover:border-[#E8FF00] transition-all"
              >
                <FiGithub />
                <span className="font-mono text-sm">GitHub</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-[#F0F0F0] hover:bg-[#E8FF00] hover:text-[#050505] hover:border-[#E8FF00] transition-all"
              >
                <FiExternalLink />
                <span className="font-mono text-sm">Live Site</span>
              </a>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <span className="font-mono text-xs text-[#555]">{project.year}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
