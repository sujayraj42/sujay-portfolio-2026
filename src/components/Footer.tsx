export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-[#050505]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-widest text-[#555]">
          © 2026 SUJAY CHAKRAVARTI · ALL RIGHTS RESERVED
        </p>
        <p className="font-mono text-[10px] tracking-widest text-[#555]">
          BUILT WITH REACT + TAILWIND + FRAMER MOTION
        </p>
      </div>
    </footer>
  );
}
