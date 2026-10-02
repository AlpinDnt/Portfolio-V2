import { ArrowUpRight, Browser, AppWindow, PaintBrush } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import GlowCard from "./GlowCard.jsx";
import { services } from "../data.js";

const icons = [Browser, AppWindow, PaintBrush];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl">
            {services.title}
          </h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Move your cursor across the cards — the light follows
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.items.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.name} delay={i * 0.06} className="h-full">
                <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                  <GlowCard className="h-full w-full">
                    <div className="flex h-full flex-col p-7 text-left">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                          {s.badge}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)]/60">
                          <Icon className="h-5 w-5 text-[var(--accent)]" weight="duotone" />
                        </span>
                      </div>

                      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
                        0{i + 1}
                      </p>
                      <h3 className="mt-1 font-display text-4xl font-bold uppercase leading-none tracking-tight">
                        {s.name}
                      </h3>

                      <p className="pt-3 text-sm leading-relaxed text-[var(--muted)]">
                        {s.desc}
                      </p>

                      <a
                        href={s.wa}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[var(--accent)]"
                      >
                        <span className="group-hover:underline">Start a project</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          weight="bold"
                        />
                      </a>
                    </div>
                  </GlowCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
