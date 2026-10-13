import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="will-change-[opacity]">
      {children}
    </motion.span>
  );
}

function Words({ text, progress }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <Word progress={progress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function ScrollLinkedText({
  text,
  className = "",
  offset = ["start 0.85", "start 0.35"],
  sticky = false,
  height = "250vh",
  aside = null,
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sticky ? containerRef : textRef,
    offset: sticky ? ["start start", "end end"] : offset,
  });

  if (reduce) {
    return (
      <p ref={textRef} className={className}>
        {text}
      </p>
    );
  }

  if (sticky) {
    return (
      <div ref={containerRef} className="relative" style={{ height }}>
        <div className="sticky top-16 flex min-h-[calc(100svh-4rem)] items-center px-4 py-10 md:px-8">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <p ref={textRef} className={`${className}${aside ? " lg:col-span-7" : ""}`}>
              <Words text={text} progress={scrollYProgress} />
            </p>
            {aside ? <div className="hidden lg:col-span-5 lg:block">{aside}</div> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <p ref={textRef} className={className}>
      <Words text={text} progress={scrollYProgress} />
    </p>
  );
}
