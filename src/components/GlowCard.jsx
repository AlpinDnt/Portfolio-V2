import { useEffect, useRef } from "react";

/*
 * Spotlight card v2 — rewritten for smoothness:
 * - Cursor position is measured RELATIVE to the card (no more
 *   `background-attachment: fixed` + viewport coords, which repainted
 *   heavily and jumped whenever an ancestor had a transform).
 * - The glow is a plain radial-gradient layer faded in with an opacity
 *   transition (opacity-only = compositor-friendly, no per-frame repaint
 *   of filters, masks or blurs).
 * - Vars update at most once per frame via rAF, per card.
 */

export default function GlowCard({
  children,
  className = "",
  glow = "var(--accent)",
  size = 260,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x.toFixed(1)}px`);
      el.style.setProperty("--my", `${y.toFixed(1)}px`);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      style={{ "--spot-size": `${size}px`, "--spot-color": glow }}
    >
      <div className="spotlight-inner">{children}</div>
    </div>
  );
}
