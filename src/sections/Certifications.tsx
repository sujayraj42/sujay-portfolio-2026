import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/utils/data";

const accentMap: Record<string, string> = { primary: "#E8FF00", secondary: "#FF3C00", tertiary: "#00F5FF" };

function CertCard({ cert, index }: { cert: (typeof certifications)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const accent = accentMap[cert.accent] ?? "#E8FF00";
  const initials = cert.issuer.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative glass rounded-xl p-5 md:p-6 overflow-hidden group hover:border-white/10 transition-colors"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />
      <div className="flex items-start gap-4 ml-2">
        <div className="w-10 h-10 rounded-lg grid place-items-center font-mono text-xs font-bold shrink-0" style={{ background: accent + "18", color: accent, border: `1px solid ${accent}30` }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-[15px] md:text-lg font-bold text-white leading-snug">{cert.name}</h3>
          <p className="font-mono text-[11px] text-white/30 mt-1">{cert.issuer} · {cert.platform} · {cert.date}</p>
          {cert.credentialId ? <p className="font-mono text-[10px] text-white/20 mt-1">ID: {cert.credentialId}</p> : null}
          {cert.verifyUrl ? (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex mt-3 font-mono text-xs text-white/40 hover:text-[#E8FF00] underline underline-offset-4 decoration-white/10 hover:decoration-[#E8FF00] transition-colors">
              Verify →
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certs" className="relative w-full py-20 md:py-32 bg-[#050505] overflow-hidden border-t border-white/[0.04]">
      <div className="absolute top-1/2 right-6 -translate-y-1/2 watermark opacity-[0.04] select-none pointer-events-none hidden md:block">06</div>
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#E8FF00]">06 / THE PROOF</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-2">CERTIFICATIONS</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {certifications.map((c, i) => (
            <div key={c.id} className={i % 3 === 1 ? "lg:mt-8" : i % 3 === 2 ? "lg:mt-4" : ""}>
              <CertCard cert={c} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
