import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend or service
    alert("Message sent! (demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left ~60% */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-widest text-[#E8FF00] mb-4">
              07 / THE HANDSHAKE
            </p>
            <motion.h2
              className="font-display text-5xl md:text-[100px] font-bold text-[#F0F0F0] leading-[0.95]"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              LET'S TALK
              <span className="text-[#E8FF00]"> →</span>
            </motion.h2>

            <motion.p
              className="font-body text-lg md:text-xl text-[#F0F0F0]/60 mt-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Available for internships & junior Full Stack roles
            </motion.p>

            <div className="flex items-center gap-3 mt-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-sm text-[#F0F0F0]/60">
                Open to Work
              </span>
            </div>

            <p className="font-mono text-sm text-[#555] mt-4">
              Jalandhar, Punjab · India
            </p>
          </div>

          {/* Right ~40% */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              <a
                href="https://linkedin.com/in/sujay-2oo5/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-[#E8FF00]/40 bg-white/[0.02] transition-all"
              >
                <span className="font-display text-lg text-[#F0F0F0]">
                  LinkedIn
                </span>
                <span className="font-mono text-xs text-[#555] group-hover:text-[#E8FF00] transition-colors">
                  linkedin.com/in/sujay-2oo5/ →
                </span>
              </a>

              <a
                href="https://github.com/sujayraj42"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-[#E8FF00]/40 bg-white/[0.02] transition-all"
              >
                <span className="font-display text-lg text-[#F0F0F0]">
                  GitHub
                </span>
                <span className="font-mono text-xs text-[#555] group-hover:text-[#E8FF00] transition-colors">
                  github.com/sujayraj42 →
                </span>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/[0.02]">
                <span className="font-mono text-xs text-[#555]">LOCATION</span>
                <span className="font-body text-sm text-[#F0F0F0]">
                  Jalandhar, Punjab
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-20 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div className="relative">
              <label
                className={`absolute left-0 font-mono text-xs text-[#555] transition-all duration-300 ${
                  focused === "name" || form.name
                    ? "-top-5 text-[#E8FF00]"
                    : "top-3"
                }`}
              >
                NAME
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-b border-white/10 focus:border-[#E8FF00] py-3 text-[#F0F0F0] font-body outline-none transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label
                className={`absolute left-0 font-mono text-xs text-[#555] transition-all duration-300 ${
                  focused === "email" || form.email
                    ? "-top-5 text-[#E8FF00]"
                    : "top-3"
                }`}
              >
                EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-b border-white/10 focus:border-[#E8FF00] py-3 text-[#F0F0F0] font-body outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="relative mb-8">
            <label
              className={`absolute left-0 font-mono text-xs text-[#555] transition-all duration-300 ${
                focused === "message" || form.message
                  ? "-top-5 text-[#E8FF00]"
                  : "top-3"
              }`}
            >
              MESSAGE
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              rows={4}
              className="w-full bg-transparent border-b border-white/10 focus:border-[#E8FF00] py-3 text-[#F0F0F0] font-body outline-none transition-colors resize-none"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="group relative px-8 py-4 rounded-full border border-white/10 font-mono text-sm text-[#F0F0F0] overflow-hidden transition-colors hover:text-[#050505]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-[#E8FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              SEND MESSAGE <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
