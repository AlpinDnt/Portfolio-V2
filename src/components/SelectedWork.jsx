import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { projects, archive } from "../data.js";

function ArrowCursor({ sx, sy, side, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 will-change-transform"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={side}
                initial={{ opacity: 0, x: side === "left" ? -14 : 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: side === "left" ? 14 : -14 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {side === "left" ? (
                  <ArrowLeft className="h-8 w-8" weight="bold" />
                ) : (
                  <ArrowRight className="h-8 w-8" weight="bold" />
                )}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SelectedWork() {
  const items = projects.items;
  const [[idx, direction], setState] = useState([0, 0]);
  const reduce = useReducedMotion();
  const item = items[idx];
  const trackRef = useRef(null);
  const sideRef = useRef("right");
  const visibleRef = useRef(false);
  const [cSide, setCSide] = useState("right");
  const [cVisible, setCVisible] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  // raw mouse pos (no re-render) + smoothed springs for buttery follow
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.55 });
  const sy = useSpring(my, { stiffness: 260, damping: 28, mass: 0.55 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = (e) => setFinePointer(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const go = useCallback(
    (dir) => setState((prev) => [(prev[0] + dir + items.length) % items.length, dir]),
    [items.length]
  );
  const goTo = useCallback((i) => {
    setState((prev) => [i, i > prev[0] ? 1 : -1]);
  }, []);

  // Keyboard navigation: ← / →
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const updateCursor = (e) => {
    if (!finePointer || reduce || !trackRef.current) return;
    // hide over interactive elements so links/buttons keep normal cursor
    if (e.target.closest?.("a,button")) {
      if (visibleRef.current) {
        visibleRef.current = false;
        setCVisible(false);
      }
      return;
    }
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x - 36);
    my.set(y - 36);
    const nextSide = x < rect.width / 2 ? "left" : "right";
    if (nextSide !== sideRef.current) {
      sideRef.current = nextSide;
      setCSide(nextSide);
    }
    if (!visibleRef.current) {
      visibleRef.current = true;
      setCVisible(true);
    }
  };

  const hideCursor = () => {
    visibleRef.current = false;
    setCVisible(false);
  };

  const handleTrackClick = (e) => {
    // let links / buttons work normally
    if (e.target.closest?.("a,button")) return;
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    go(x < rect.width / 2 ? -1 : 1);
  };

  return (
    <section id="work" className="scroll-mt-20 bg-[var(--pill)] text-[var(--pill-ink)]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-7xl">
            Explore
            <span className="block">selected work</span>
          </h2>
        </Reveal>

        <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] opacity-70">
          <motion.span key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            0{idx + 1} of 0{items.length}
          </motion.span>
        </div>

        <div
          ref={trackRef}
          onMouseMove={updateCursor}
          onMouseLeave={hideCursor}
          onClick={handleTrackClick}
          className="group/carousel relative mt-4 overflow-hidden rounded-2xl md:cursor-none"
        >
          {finePointer && !reduce && (
            <ArrowCursor sx={sx} sy={sy} side={cSide} visible={cVisible} />
          )}

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.article
              key={item.id}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction >= 0 ? 64 : -64 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? {} : { opacity: 0, x: direction >= 0 ? -64 : 64 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              className="grid cursor-grab gap-0 active:cursor-grabbing md:cursor-none md:grid-cols-2"
            >
              <div className="group relative min-h-64 overflow-hidden md:min-h-[420px]">
                <motion.img
                  src={item.image}
                  alt={`${item.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  initial={reduce ? false : { scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                  {item.category}
                </span>
              </div>
              <div className="flex flex-col justify-center bg-[var(--card)] p-7 text-[var(--ink)] md:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {item.index} — {item.year}
                </p>
                <h3 className="mt-2 font-display text-5xl font-extrabold uppercase leading-none tracking-tight md:text-6xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${item.title} tech`}>
                  {item.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] text-[var(--muted)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Visit site <ArrowUpRight className="h-4 w-4" weight="bold" />
                  </motion.a>
                  <motion.a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold"
                  >
                    <GithubLogo className="h-4 w-4" /> Source
                  </motion.a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* progress + dots */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-current/15">
            <motion.div
              key={idx}
              className="h-full bg-current"
              initial={{ width: "0%" }}
              animate={{ width: `${((idx + 1) / items.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex gap-2">
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${p.title}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-current" : "w-2.5 bg-current/30 hover:bg-current/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* archive list — different family from carousel */}
        <div className="mt-12 border-t border-current/15 pt-6">
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{archive.title}</h3>
          <ul className="mt-4 divide-y divide-current/10">
            {items.map((p) => (
              <li key={p.id}>
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-3"
                >
                  <span className="font-mono text-xs opacity-60">{p.year}</span>
                  <span className="font-display text-2xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    {p.title}
                  </span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] opacity-60 sm:block">
                    {p.category}
                  </span>
                  <ArrowUpRight className="ml-auto h-5 w-5 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">{archive.note}</p>
        </div>
      </div>
    </section>
  );
}
