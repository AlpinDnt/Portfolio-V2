import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Ticker from "./components/Ticker.jsx";
import Skills from "./components/Skills.jsx";
import SelectedWork from "./components/SelectedWork.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Assistant from "./components/Assistant.jsx";

function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[var(--accent)]"
    />
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("alpindnt-theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0e0d0b" : "#fffcfa");
    try {
      localStorage.setItem("alpindnt-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <div className="grain min-h-screen antialiased">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--pill)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--pill-ink)]"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))} />
      <main>
        <Hero />
        <Ticker />
        <Skills />
        <SelectedWork />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))} theme={theme} />
      <Assistant />
    </div>
  );
}
