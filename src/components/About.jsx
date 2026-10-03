import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal.jsx";
import { personal } from "../data.js";

const stats = [
  ["11", "Live projects"],
  ["08+", "Core tech"],
  ["03", "Focus Areas"],
  ["01", "Base — Bali"],
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-20 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
            Built clean,
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="text-stroke block will-change-transform"
                initial={reduce ? false : { y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                shipped fast
              </motion.span>
            </span>
          </h2>
          <p className="mt-6 max-w-[60ch] leading-relaxed text-[var(--muted)]">
            I am a Junior Web Developer based in Bali, focused on modern frontend work. I turn
            visual concepts into interactive, high-performance web apps — clean code, responsive
            layouts, and interfaces that feel instant.
          </p>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-[var(--muted)]">
            Currently deep in React.js, Tailwind CSS and modern web architecture. Learning every
            day, shipping every week.
          </p>
          <motion.dl
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4"
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
                className="bg-[var(--bg)] p-5"
              >
                <dt className="font-display text-4xl font-extrabold">{v}</dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  {l}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
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
        </Reveal>
      </div>
    </section>
  );
}
