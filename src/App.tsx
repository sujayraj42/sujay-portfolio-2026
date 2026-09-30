import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLenis, getLenis } from "@/hooks/useLenis";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Events from "@/sections/Events";
import Certifications from "@/sections/Certifications";
import Education from "@/sections/Education";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();
  const showLoader = loading && !reducedMotion;
  useLenis();

  // prevent Lenis scroll while loader is visible
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (showLoader) lenis.stop();
    else lenis.start();
  }, [showLoader]);

  useEffect(() => {
    if (reducedMotion) setLoading(false);
    const t = window.setTimeout(() => setLoading(false), 4200);
    return () => window.clearTimeout(t);
  }, [reducedMotion]);

  return (
    <div className="grain bg-[#050505] text-[#F0F0F0] min-h-screen">
      {showLoader && <Loader onComplete={() => setLoading(false)} />}
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-[#E8FF00] focus:text-black focus:rounded-full font-mono text-xs">
        Skip to content
      </a>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Events />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
