import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { events } from "@/utils/data";

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ target, label }: { target: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    if (!Number.isFinite(numeric)) { setDisplay(target); return; }
    let cur = 0;
    const step = Math.max(1, Math.floor(numeric / 30));
    const id = window.setInterval(() => {
      cur += step;
      if (cur >= numeric) { cur = numeric; window.clearInterval(id); }
      setDisplay(cur + suffix);
    }, 36);
    return () => window.clearInterval(id);
  }, [inView, target]);
  return <span ref={ref} className="inline-block">{display} <span className="text-lg md:text-2xl font-mono font-normal text-white/35">{label}</span></span>;
}

function useIsDesktop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const h = () => setV(m.matches);
    h(); m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return v;
}

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!desktop || reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => { window.clearTimeout(t); ctx.revert(); };
  }, [desktop, reduced]);

  // mobile / reduced-motion: vertical cards with horizontal scroll snap
  if (!desktop || reduced) {
    return (
      <section id="events" className="relative bg-[#050505] overflow-hidden py-16">
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
          <p className="font-mono text-[11px] tracking-widest text-[#E8FF00]">04 / THE STAGE</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-2">EXPERIENCE</h2>
          <p className="font-mono text-xs text-white/30 mt-2">Swipe horizontally on desktop · scroll vertically on mobile</p>
        </div>
        <div className="mt-8 px-6 md:px-12 max-w-[1600px] mx-auto flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
          {events.map((ev, i) => (
            <article key={ev.id} className="snap-start shrink-0 w-[84vw] max-w-[560px] rounded-2xl border border-white/5 bg-white/[0.02] p-7 md:p-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-[#E8FF00] border border-[#E8FF00]/20 px-2 py-1 rounded-full">{ev.role.toUpperCase()}</span>
                <span className="font-mono text-[10px] text-white/25">0{i + 1}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">{ev.name}</h3>
              <p className="font-display text-5xl font-bold text-[#E8FF00]"><AnimatedNumber target={ev.stat} label={ev.statLabel} /></p>
              <div className="flex flex-wrap gap-2">
                {ev.speakers.map((s) => <span key={s} className="font-mono text-[10px] px-3 py-1 rounded-full border border-white/10 text-white/55">{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="events" ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
      <div className="pt-14 pb-4 px-6 md:px-12 max-w-[1600px] mx-auto flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-widest text-[#E8FF00]">04 / THE STAGE</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mt-2">EXPERIENCE</h2>
        </div>
        <span className="hidden md:block font-mono text-[11px] tracking-widest text-white/25">— SCROLL TO EXPLORE → PINNED</span>
      </div>
      <div ref={trackRef} className="flex w-max will-change-transform py-6">
        {events.map((ev, i) => (
          <article key={ev.id} className="w-[86vw] md:w-[560px] h-[min(70vh,560px)] shrink-0 mx-3 md:mx-6 relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-7 md:p-10 flex flex-col justify-between">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="font-display text-[120px] md:text-[180px] font-bold text-white/[0.03] whitespace-nowrap">{ev.name.split(" ")[0]}</span>
            </div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block">
              <span className="vertical-text font-mono text-[10px] tracking-widest text-[#E8FF00]">{ev.role.toUpperCase()}</span>
            </div>
            <div className="relative z-10 ml-0 md:ml-8">
              <span className="font-mono text-[10px] text-white/30 tracking-wider">0{i + 1}</span>
              <h3 className="font-display text-xl md:text-[26px] font-bold text-white mt-2 leading-tight">{ev.name}</h3>
            </div>
            <div className="relative z-10 ml-0 md:ml-8">
              <p className="font-display text-5xl md:text-6xl font-bold text-[#E8FF00]"><AnimatedNumber target={ev.stat} label={ev.statLabel} /></p>
              <div className="flex flex-wrap gap-2 mt-5">
                {ev.speakers.map((s) => <span key={s} className="font-mono text-[10px] px-3 py-1 rounded-full border border-white/10 text-white/55">{s}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
