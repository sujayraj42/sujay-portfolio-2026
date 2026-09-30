import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Cursor() {
  const { x, y } = useMousePosition();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);
  const projectRef = useRef(false);
  const hiddenRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const frame = () => {
      ringPos.current.x = lerp(ringPos.current.x, x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, y, 0.14);
      if (dotRef.current) {
        const op = hiddenRef.current ? 0 : 1;
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
        dotRef.current.style.opacity = String(op);
      }
      if (ringRef.current) {
        const s = hoverRef.current ? 1.45 : 1;
        const rot = hoverRef.current ? 45 : 0;
        const extra = projectRef.current ? " scale(0.85)" : "";
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${s}) rotate(${rot}deg)${extra}`;
        ringRef.current.style.opacity = hiddenRef.current ? "0" : "1";
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hoverRef.current = !!t.closest("a, button, [data-hover]");
      projectRef.current = !!t.closest("[data-project-hover]");
    };
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-hover]")) hoverRef.current = false;
      if (t.closest("[data-project-hover]")) projectRef.current = false;
    };
    const leave = () => { hiddenRef.current = true; };
    const enter = () => { hiddenRef.current = false; };

    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  // No custom cursor on touch/coarse pointers
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E8FF00] pointer-events-none z-[10000] max-md:hidden" style={{ willChange: "transform", mixBlendMode: "difference" as never }} aria-hidden />
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#E8FF00]/80 pointer-events-none z-[9999] max-md:hidden" style={{ willChange: "transform" }} aria-hidden />
    </>
  );
}
