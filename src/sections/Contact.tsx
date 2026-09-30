import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = form.name.trim().length >= 2 && emailRegex.test(form.email) && form.message.trim().length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!valid) { setError("Please fill all fields correctly (message ≥ 10 chars)."); return; }
    const subject = encodeURIComponent(`Portfolio inquiry — ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}\n\n— sent from sujay-portfolio-2026`);
    // Try mailto; also show success so portfolio feels complete even without backend
    window.location.href = `mailto:sujayraj42@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="relative w-full bg-[#050505] overflow-hidden border-t border-white/[0.04]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#E8FF00]">07 / THE HANDSHAKE</p>
            <motion.h2 className="font-display text-[44px] md:text-[92px] font-bold leading-[0.9] tracking-[-0.04em] text-white mt-3" initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              LET'S TALK <span className="text-[#E8FF00]">→</span>
            </motion.h2>
            <motion.p className="font-body text-base md:text-lg text-white/50 mt-6 max-w-lg" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
              Available for internships & junior Full Stack roles. Top studios — if you value craft, performance and clean code, let's build.
            </motion.p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Open to Work
              </span>
              <span className="font-mono text-xs text-white/30">Jalandhar, Punjab · India · UTC+5:30</span>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              <a href="https://linkedin.com/in/sujay-2oo5/" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#E8FF00]/30 transition-colors">
                <span className="font-display font-semibold text-white">LinkedIn</span>
                <span className="font-mono text-xs text-white/30 group-hover:text-[#E8FF00]">sujay-2oo5 →</span>
              </a>
              <a href="https://github.com/sujayraj42" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#E8FF00]/30 transition-colors">
                <span className="font-display font-semibold text-white">GitHub</span>
                <span className="font-mono text-xs text-white/30 group-hover:text-[#E8FF00]">sujayraj42 →</span>
              </a>
              <a href="mailto:sujayraj42@gmail.com" className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#E8FF00]/30 transition-colors sm:col-span-2">
                <span className="font-mono text-xs text-white/30">EMAIL</span>
                <span className="font-mono text-xs text-white group-hover:text-[#E8FF00] break-all">sujayraj42@gmail.com →</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7" initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}>
              <p className="font-mono text-[11px] tracking-widest text-white/25 mb-4">SEND A MESSAGE — MAILTO (NO BACKEND NEEDED)</p>
              <div className="grid grid-cols-1 gap-5">
                <div className="relative">
                  <label htmlFor="c-name" className={`absolute left-0 font-mono text-xs transition-all ${focused === "name" || form.name ? "-top-3 text-[#E8FF00]" : "top-3 text-white/30"}`}>NAME *</label>
                  <input id="c-name" type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} className="w-full bg-transparent border-b border-white/10 focus:border-[#E8FF00] py-3 text-white outline-none transition-colors" required minLength={2} />
                </div>
                <div className="relative">
                  <label htmlFor="c-email" className={`absolute left-0 font-mono text-xs transition-all ${focused === "email" || form.email ? "-top-3 text-[#E8FF00]" : "top-3 text-white/30"}`}>EMAIL *</label>
                  <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} className="w-full bg-transparent border-b border-white/10 focus:border-[#E8FF00] py-3 text-white outline-none transition-colors" required />
                </div>
                <div className="relative">
                  <label htmlFor="c-msg" className={`absolute left-0 font-mono text-xs transition-all ${focused === "message" || form.message ? "-top-3 text-[#E8FF00]" : "top-3 text-white/30"}`}>MESSAGE * (≥ 10 chars)</label>
                  <textarea id="c-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} rows={4} className="w-full bg-transparent border-b border-white/10 focus:border-[#E8FF00] py-3 text-white outline-none resize-none transition-colors" required minLength={10} />
                  <div className="flex justify-between mt-2">
                    <span className="font-mono text-[10px] text-white/20">{form.message.length} chars</span>
                    <span className={`font-mono text-[10px] ${valid ? "text-emerald-400" : "text-white/20"}`}>{valid ? "✓ ready to send" : "fill all fields"}</span>
                  </div>
                </div>
              </div>
              {error ? <p role="alert" className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 font-mono text-xs text-red-300">{error}</p> : null}
              {sent ? <p role="status" className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 font-mono text-xs text-emerald-300">✓ Message handoff done — your mail app should have opened. I'll reply within 24h.</p> : null}
              <motion.button type="submit" disabled={!valid} className="mt-6 w-full group relative overflow-hidden rounded-full border border-white/10 bg-white text-black font-mono text-xs tracking-widest py-4 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E8FF00] hover:border-[#E8FF00] transition-colors" whileTap={{ scale: 0.98 }}>
                <span className="relative z-10 flex items-center justify-center gap-2">SEND MESSAGE <span className="group-hover:translate-x-0.5 transition-transform">→</span></span>
              </motion.button>
              <p className="font-mono text-[10px] text-white/25 mt-3 text-center">No spam. Replies within 24h. Craft over volume.</p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
