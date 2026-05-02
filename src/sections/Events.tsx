import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { events } from "@/utils/data";

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ target, label }: { target: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    let current = 0;
    const step = Math.max(1, Math.floor(numeric / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= numeric) {
        current = numeric;
        clearInterval(interval);
      }
      setDisplay(current + suffix);
    }, 40);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span ref={ref} className="inline-block">
      {display} <span className="text-lg md:text-2xl text-[#555]">{label}</span>
    </span>
  );
}

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const ctx = gsap.context(() => {
      const scrollWidth = strip.scrollWidth - window.innerWidth;
      gsap.to(strip, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden"
    >
      <div className="py-16 px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-[#E8FF00] mb-2">
          04 / THE STAGE
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-[#F0F0F0]">
          EXPERIENCE
        </h2>
      </div>

      <div ref={stripRef} className="flex w-max">
        {events.map((event, i) => (
          <div
            key={event.id}
            className="w-[85vw] md:w-[600px] h-[70vh] flex-shrink-0 mx-4 md:mx-8 relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02]"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-display text-[120px] md:text-[180px] font-bold text-white/[0.03] whitespace-nowrap">
                {event.name.split(" ")[0]}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
              {/* Role tag - vertical left edge */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span className="vertical-text font-mono text-[10px] tracking-widest text-[#E8FF00]">
                  {event.role.toUpperCase()}
                </span>
              </div>

              <div className="ml-8">
                <span className="font-mono text-[10px] text-[#555] tracking-wider">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl md:text-3xl font-bold text-[#F0F0F0] mt-2 leading-tight">
                  {event.name}
                </h3>
              </div>

              <div className="ml-8">
                <p className="font-display text-5xl md:text-7xl font-bold text-[#E8FF00]">
                  <AnimatedNumber target={event.stat} label={event.statLabel} />
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {event.speakers.map((speaker) => (
                    <span
                      key={speaker}
                      className="font-mono text-[10px] px-3 py-1 rounded-full border border-white/10 text-[#F0F0F0]/60"
                    >
                      {speaker}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
