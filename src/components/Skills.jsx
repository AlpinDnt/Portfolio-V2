import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { skills } from "../data.js";

function SkillRow({ item, open, onToggle, index }) {
  return (
    <div className="border-b border-[var(--line)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="grid w-full grid-cols-12 items-center gap-2 py-5 text-left"
      >
        <span className="col-span-8 sm:col-span-9">
          <span className="block font-display text-3xl font-bold uppercase leading-none tracking-tight transition-transform duration-300 hover:translate-x-1 sm:text-5xl">
            {item.name}
          </span>
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {item.tags}
          </span>
        </span>
        <span className="col-span-3 text-right font-mono text-sm text-[var(--muted)] sm:col-span-2">
          {item.years}
        </span>
        <span className="col-span-1 flex justify-end">
          <Plus
            className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
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
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
                0{index + 1}
              </span>
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
      </div>
    </section>
  );
}
