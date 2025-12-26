import { useEffect, useRef, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroParallax } from "./components/HeroParallax";
import { ProfileSummary } from "./components/ProfileSummary";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      // Cancel any pending animation frame
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      
      // Schedule update for next frame
      rafId.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial scroll position
    setScrollY(window.scrollY);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden relative">
      {/* Navigation – ALWAYS ON TOP */}
      <Navigation />

      {/* HERO – SCROLLABLE PARALLAX SECTION */}
      <HeroParallax scrollY={scrollY} />

      {/* SCROLLING CONTENT */}
      <main className="relative z-10">
        <ProfileSummary />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
