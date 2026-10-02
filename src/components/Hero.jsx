import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Asterisk } from "@phosphor-icons/react";
import { hero, personal } from "../data.js";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      {/* ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 82% 8%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-10 md:px-8 md:pt-14">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for freelance
        </motion.p>

        {/* kinetic headline — 2 visual lines */}
        <h1 className="mt-6 font-display font-extrabold uppercase leading-[0.88] tracking-tight">
          <motion.span
            className="block text-[17vw] sm:text-[13vw] lg:text-[10.5rem]"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Leading the web
          </motion.span>
          <motion.span
            className="block text-[17vw] sm:text-[13vw] lg:text-[10.5rem]"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            into <span className="text-stroke">clean</span>{" "}
            <motion.span
              className="inline-flex translate-y-[-0.08em] items-center overflow-hidden rounded-full align-middle"
              whileHover={reduce ? {} : { scale: 1.06, rotate: -2 }}
            >
              <img
                src="https://picsum.photos/seed/alpin-desk/320/160"
                alt="Alpin's workspace"
                className="h-[0.62em] w-[1.4em] rounded-full object-cover"
                loading="eager"
              />
            </motion.span>{" "}
            interfaces
          </motion.span>
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-[52ch] leading-relaxed text-[var(--muted)] md:col-span-7"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, I am {personal.short}. {hero.subtext}
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            <motion.a
              href={hero.primaryCta.href}
              whileHover={reduce ? {} : { scale: 1.04 }}
              whileTap={reduce ? {} : { scale: 0.96 }}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white"
            >
              {hero.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </motion.a>
            <motion.a
              href={hero.secondaryCta.href}
              whileHover={reduce ? {} : { scale: 1.04 }}
              whileTap={reduce ? {} : { scale: 0.96 }}
              className="inline-flex items-center whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--card)] px-7 py-3.5 text-sm font-semibold"
            >
              {hero.secondaryCta.label}
            </motion.a>
            {!reduce ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                aria-hidden="true"
                className="hidden text-[var(--accent)] sm:block"
              >
                <Asterisk className="h-8 w-8" weight="bold" />
              </motion.span>
            ) : null}
          </motion.div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[var(--line)] pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          <span>Bali — ID</span>
          <a href="#skills" className="group inline-flex items-center gap-2 hover:text-[var(--ink)]" aria-label="Scroll to skills">
            Scroll <ArrowDown className="h-4 w-4 animate-bounce transition-transform group-hover:translate-y-0.5" />
          </a>
          <span>v2026.01</span>
        </div>
      </div>
    </section>
  );
}
