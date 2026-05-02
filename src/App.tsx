import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
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
  useLenis();


  return (
    <div className="grain">
      {loading && !reducedMotion && (
        <Loader onComplete={() => setLoading(false)} />
      )}

      <Cursor />
      <Navbar />

      <main>
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
