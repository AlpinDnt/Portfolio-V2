import { useState } from "react";
import { List, X, Sun, Moon, ArrowUpRight } from "@phosphor-icons/react";
import { navLinks, personal } from "../data.js";

export default function Nav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
          <a href="#home" aria-label="Back to top">
            <span className="rounded-full bg-[var(--pill)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pill-ink)]">
              {personal.nick} — {personal.role}
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === "light" ? "Switch to dark" : "Switch to light"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-transform hover:scale-105 active:scale-95"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--pill)] px-5 py-2.5 text-sm font-semibold text-[var(--pill-ink)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <List className="h-4 w-4" weight="bold" />
              MENU
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-[90] flex flex-col bg-[var(--pill)] text-[var(--pill-ink)]"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
           <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-8">
            <span className="rounded-full bg-[#141210] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#fffcfa]">
              {personal.nick} — menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="inline-flex items-center gap-2 rounded-full border border-[#fffcfa] bg-[#141210] px-5 py-2.5 text-sm font-semibold text-[#fffcfa] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <X className="h-4 w-4" weight="bold" />
              CLOSE
            </button>
          </div>
          <nav className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-1 px-4 md:px-8">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="menu-in group flex items-baseline gap-4 border-b border-current/15 py-3"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="font-mono text-xs opacity-60">0{i + 1}</span>
                <span className="font-display text-5xl font-bold uppercase leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-7xl">
                  {l.label}
                </span>
                <ArrowUpRight className="ml-auto h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </nav>
          <div className="mx-auto w-full max-w-[1400px] px-4 pb-8 md:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
              {personal.location} — {personal.email}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
