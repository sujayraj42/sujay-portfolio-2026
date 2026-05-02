import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/utils/data";

const accentMap: Record<string, string> = {
  primary: "#E8FF00",
  secondary: "#FF3C00",
  tertiary: "#00F5FF",
};

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const accent = accentMap[cert.accent] || "#E8FF00";
  const initials = cert.issuer
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative glass rounded-lg p-5 md:p-6 overflow-hidden group"
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: accent }}
      />

      <div className="flex items-start gap-4 ml-2">
        {/* Issuer badge */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
          style={{ background: accent + "20", color: accent }}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base md:text-lg font-bold text-[#F0F0F0] leading-snug">
            {cert.name}
          </h3>
          <p className="font-mono text-[11px] text-[#555] mt-1">
            {cert.issuer} · {cert.platform} · {cert.date}
          </p>
          {cert.credentialId && (
            <p className="font-mono text-[10px] text-[#555]/60 mt-1">
              ID: {cert.credentialId}
            </p>
          )}
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 font-mono text-xs text-[#F0F0F0]/50 hover:text-[#E8FF00] underline underline-offset-4 decoration-white/10 hover:decoration-[#E8FF00] transition-colors"
            >
              Verify →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section
      id="certs"
      className="relative w-full py-24 md:py-40 bg-[#050505] overflow-hidden"
    >
      {/* Watermark */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 watermark opacity-30 select-none pointer-events-none">
        05
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-[#E8FF00] mb-2">
          05 / THE PROOF
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-16">
          CERTIFICATIONS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className={i % 3 === 1 ? "md:mt-12" : i % 3 === 2 ? "md:mt-6" : ""}
            >
              <CertCard cert={cert} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
