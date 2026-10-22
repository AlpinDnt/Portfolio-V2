import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { skills } from "../data.js";

function SkillRow({ item, open, onToggle, index }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <div
      className={`border-b border-[var(--line)] transition-colors duration-300 ${
        open ? "bg-[var(--bg-soft)]/40" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group grid w-full grid-cols-12 items-center gap-2 py-5 text-left"
      >
        <span className="col-span-8 sm:col-span-9">
          <span
            aria-hidden="true"
            className={`block font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
              open
                ? "text-[var(--accent-red)]"
                : "text-[var(--faint)] group-hover:text-[var(--ink)]"
            }`}
          >
            {number}
          </span>
          <span className="mt-1 block font-display text-3xl font-bold uppercase leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
            {item.name}
          </span>
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {item.tags}
          </span>
        </span>
        <span className="col-span-3 text-right font-mono text-sm text-[var(--faint)] sm:col-span-2">
          {item.years}
        </span>
        <span className="col-span-1 flex justify-end">
          <Plus
            className={`h-5 w-5 transition-all duration-300 ${
              open
                ? "rotate-45 text-[var(--accent-red)]"
                : "text-[var(--faint)] group-hover:text-[var(--ink)]"
            }`}
            weight="bold"
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[65ch] pb-6 leading-relaxed text-[var(--muted)]">
              {item.desc}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  const [openIdx, setOpenIdx] = useState(-1);
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl">
            {skills.title}
          </h2>
        </Reveal>
        <motion.div
          className="mt-8 border-t border-[var(--line)]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          {skills.items.map((item, i) => (
            <SkillRow
              key={item.name}
              item={item}
              index={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx((v) => (v === i ? -1 : i))}
            />
          ))}
        </motion.div>
        <p className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-red)]" aria-hidden="true" />
          Currently learning: {skills.learning}
        </p>
      </div>
    </section>
  );
}
