import { motion, useReducedMotion } from "motion/react";
import ScrollLinkedText from "./ScrollLinkedText.jsx";
import { personal } from "../data.js";

const stats = [
  ["11", "Live projects"],
  ["08+", "Core tech"],
  ["03", "Focus Areas"],
  ["01", "Base — Bali"],
];

const aboutText =
  "I am a Junior Web Developer based in Bali, focused on modern frontend work. I turn visual concepts into interactive, high-performance web apps — clean code, responsive layouts, and interfaces that feel instant. Currently deep in React.js, Tailwind CSS and modern web architecture. Learning every day, shipping every week.";

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
        text={aboutText}
        className="text-2xl font-semibold leading-[1.15] tracking-tight text-[var(--ink)] md:text-4xl lg:text-[2.75rem]"
        aside={<PhotoFigure reduce={reduce} />}
      />
      <div className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8 md:pb-24">
        <div className="lg:hidden">
          <PhotoFigure reduce={reduce} />
        </div>
        <div className="grid lg:grid-cols-12 lg:gap-10">
        <motion.dl
          className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4 lg:col-span-7"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {stats.map(([v, l]) => (
            <motion.div
              key={l}
              variants={
                reduce
                  ? {}
                  : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }
              }
              transition={{ duration: 0.45 }}
              className="bg-[var(--bg)] p-4"
            >
              <dt className="font-display text-3xl font-extrabold">{v}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {l}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
        </div>
      </div>
    </section>
  );
}
