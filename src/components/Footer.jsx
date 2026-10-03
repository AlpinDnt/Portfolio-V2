import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, Sun, Moon } from "@phosphor-icons/react";
import { personal, navLinks } from "../data.js";

export default function Footer({ theme, onToggleTheme }) {
  const reduce = useReducedMotion();

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-12 md:px-8">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 text-center font-display text-[18vw] font-extrabold uppercase leading-[0.85] tracking-tight lg:text-[11rem]"
        >
          Alpin<span className="text-stroke">dnt</span>
        </motion.p>

        <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 md:grid-cols-3">
          <div>
            <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--muted)]">
              {personal.name} — {personal.role} from {personal.location}. Built with React and
              Tailwind.
            </p>
            <p className="mt-3 font-mono text-xs text-[var(--muted)]">© 2026 {personal.nick}</p>
          </div>
          <nav aria-label="Sections" className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:text-[var(--ink)] hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:justify-end">
            <motion.button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              whileHover={reduce ? {} : { scale: 1.1, y: -2 }}
              whileTap={reduce ? {} : { scale: 0.94 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)]"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </motion.button>
            <motion.a
              href="#home"
              aria-label="Back to top"
              whileHover={reduce ? {} : { scale: 1.1, y: -2 }}
              whileTap={reduce ? {} : { scale: 0.94 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--pill)] text-[var(--pill-ink)]"
            >
              <ArrowUp className="h-5 w-5" weight="bold" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
