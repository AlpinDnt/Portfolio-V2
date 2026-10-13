import { motion, useReducedMotion } from "motion/react";
import ScrollLinkedText from "./ScrollLinkedText.jsx";
import { personal } from "../data.js";

const aboutSegments = [
  { t: "I am a Junior Web Developer based in" },
  { t: "Bali,", cls: "text-[var(--accent)]" },
  { t: "focused on modern frontend work. I turn visual concepts into" },
  { t: "interactive,", cls: "italic" },
  { t: "high-performance web apps — clean code, responsive layouts, and interfaces that feel" },
  { t: "instant.", cls: "italic" },
  { t: "Currently deep in React.js, Tailwind CSS and modern web architecture. Learning every day, shipping every week." },
];

function PhotoFigure({ reduce }) {
  return (
    <motion.figure
      whileHover={reduce ? {} : { y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="overflow-hidden rounded-2xl border border-[var(--line)]"
    >
      <span className="block overflow-hidden">
        <motion.img
          src="/images/fotoku.jpeg"
          alt={`${personal.name} — portrait placeholder from Bali`}
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
          initial={reduce ? false : { scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
      <figcaption className="flex items-center justify-between bg-[var(--card)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>{personal.name}</span>
        <span>{personal.location}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-20 border-t border-[var(--line)]">
      <ScrollLinkedText
        sticky
        height="200vh"
        segments={aboutSegments}
        revealEnd={0.45}
        className="font-sans text-[1.65rem] font-semibold leading-[1.04] tracking-[-0.02em] text-[var(--ink)] md:text-5xl lg:text-[3.4rem]"
        aside={<PhotoFigure reduce={reduce} />}
      />
      <div className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8 md:pb-24">
        <div className="lg:hidden">
          <PhotoFigure reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
