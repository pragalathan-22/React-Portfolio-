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
  return (
    <div className="bg-black text-white relative">
      {/* Navigation – ALWAYS ON TOP */}
      <Navigation />

      {/* HERO – SCROLLABLE PARALLAX SECTION */}
      <HeroParallax />

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
