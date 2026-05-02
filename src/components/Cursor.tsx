import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Cursor() {
  const { x, y } = useMousePosition();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isProjectHover = useRef(false);

  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      if (ringRef.current) {
        const scale = isHovering.current ? 1.5 : 1;
        const rotation = isHovering.current ? 45 : 0;
        const crosshair = isProjectHover.current ? "scale(0.8)" : "";
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${scale}) rotate(${rotation}deg) ${crosshair}`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hover]")) {
        isHovering.current = true;
      }
      if (target.closest("[data-project-hover]")) {
        isProjectHover.current = true;
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hover]")) {
        isHovering.current = false;
      }
      if (target.closest("[data-project-hover]")) {
        isProjectHover.current = false;
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [x, y]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E8FF00] pointer-events-none z-[10000] mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#E8FF00] pointer-events-none z-[9999] transition-colors"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
