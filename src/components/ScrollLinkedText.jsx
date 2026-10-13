import { useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

const FLOOR = 0.14;

function flatten(segments, text) {
  const list = segments ?? [{ t: text ?? "", cls: "" }];
  const out = [];
  list.forEach((seg, si) => {
    seg.t.split(" ").forEach((w, wi) => {
      if (w) out.push({ w, cls: seg.cls || "", key: `${si}-${wi}` });
    });
  });
  return out;
}

export default function ScrollLinkedText({
  text,
  segments = null,
  className = "",
  offset = ["start 0.85", "start 0.35"],
  sticky = false,
  height = "250vh",
  revealEnd = 0.6,
  aside = null,
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const elsRef = useRef([]);
  const reduce = useReducedMotion();
  const words = flatten(segments, text);
  const n = words.length;
  const slot = revealEnd / n;

  const { scrollYProgress } = useScroll({
    target: sticky ? containerRef : textRef,
    offset: sticky ? ["start start", "end end"] : offset,
  });

  // Write opacity straight to the DOM: deterministic, no WAAPI interception.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const els = elsRef.current;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const r0 = i * slot;
      const r1 = r0 + slot * 0.4;
      const t = Math.min(1, Math.max(0, (v - r0) / (r1 - r0)));
      el.style.opacity = String(FLOOR + t * (1 - FLOOR));
    }
  });

  if (reduce) {
    return (
      <p ref={textRef} className={className}>
        {words.map((w) => w.w).join(" ")}
      </p>
    );
  }

  const body = (
    <p ref={textRef} className={`${className}${aside && sticky ? " lg:col-span-7" : ""}`}>
      {words.map((word, i) => (
        <span key={word.key}>
          <span
            ref={(el) => {
              elsRef.current[i] = el;
            }}
            style={{ opacity: FLOOR }}
            className={word.cls || undefined}
          >
            {word.w}
          </span>
          {i < n - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );

  if (sticky) {
    return (
      <div ref={containerRef} className="relative" style={{ height }}>
        <div className="sticky top-16 flex min-h-[calc(100svh-4rem)] items-center px-4 py-10 md:px-8">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {body}
            {aside ? <div className="hidden lg:col-span-5 lg:block">{aside}</div> : null}
          </div>
        </div>
      </div>
    );
  }

  return body;
}
