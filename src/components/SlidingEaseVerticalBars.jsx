import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "motion/react";

const noise = (x, y, t) => {
  const n =
    Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t) +
    Math.sin(x * 0.03 - t) * Math.cos(y * 0.01 + t);
  return (n + 1) / 2;
};

const hexToRgb = (hex) =>
  [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ].join(", ");

const DARK_PALETTE = {
  background: "#141210",
  line: "rgba(255, 252, 250, 0.14)",
  bar: "#fffcfa",
  accent: "#d92d20",
};

const LIGHT_PALETTE = {
  background: "#fffcfa",
  line: "rgba(20, 18, 16, 0.12)",
  bar: "#141210",
  accent: "#d92d20",
};

export default function SlidingEaseVerticalBars({
  backgroundColor,
  lineColor,
  barColor,
  accentBarColor,
  adaptive = true,
  accentEvery = 6,
  lineWidth = 1,
  animationSpeed = 0.005,
  removeWaveLine = true,
}) {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() =>
      setIsDark(el.getAttribute("data-theme") === "dark")
    );
    observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const colors = useMemo(() => {
    if (!adaptive) {
      return {
        background: backgroundColor ?? DARK_PALETTE.background,
        line: lineColor ?? DARK_PALETTE.line,
        bar: barColor ?? DARK_PALETTE.bar,
        accent: accentBarColor ?? DARK_PALETTE.accent,
      };
    }
    return isDark ? DARK_PALETTE : LIGHT_PALETTE;
  }, [adaptive, isDark, backgroundColor, lineColor, barColor, accentBarColor]);
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameId = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isDown: false });
  const transitionBursts = useRef([]);
  const reduce = useReducedMotion();

  const getMouseInfluence = (x, y, maxDistance = 60) => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getTransitionBurstInfluence = (x, y, currentTime) => {
    let totalInfluence = 0;
    transitionBursts.current.forEach((burst) => {
      const age = currentTime - burst.time;
      const maxAge = 2500;
      if (age < maxAge) {
        const dx = x - burst.x;
        const dy = y - burst.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const burstRadius = (age / maxAge) * 120;
        const burstWidth = 30;
        if (Math.abs(distance - burstRadius) < burstWidth) {
          const burstStrength = (1 - age / maxAge) * burst.intensity;
          const proximityToBurst = 1 - Math.abs(distance - burstRadius) / burstWidth;
          totalInfluence += burstStrength * proximityToBurst;
        }
      }
    });
    return Math.min(totalInfluence, 1.5);
  };

  const generatePattern = (seed, width, height, numLines) => {
    const pattern = [];
    const lineSpacing = width / numLines;
    for (let i = 0; i < numLines; i++) {
      const lineBars = [];
      let currentY = 0;
      while (currentY < height) {
        const noiseVal = noise(i * lineSpacing, currentY, seed);
        if (noiseVal > 0.5) {
          const barLength = 6 + noiseVal * 14;
          const barWidth = 1.5 + noiseVal * 2;
          lineBars.push({ y: currentY + barLength / 2, height: barLength, width: barWidth });
          currentY += barLength + 8;
        } else {
          currentY += 8;
        }
      }
      pattern.push(lineBars);
    }
    return pattern;
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const currentTime = Date.now();
    timeRef.current += animationSpeed;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const numLines = Math.max(4, Math.floor(width / 15));
    const lineSpacing = width / numLines;
    const pattern1 = generatePattern(0, width, height, numLines);
    const pattern2 = generatePattern(5, width, height, numLines);
    const baseCycleTime = timeRef.current % (Math.PI * 2);
    const mouseInfluenceOnCycle = getMouseInfluence(width / 2, height / 2, 180) * 0.5;
    const adjustedCycleTime = baseCycleTime + mouseInfluenceOnCycle;
    let easingFactor;
    if (adjustedCycleTime < Math.PI * 0.1) {
      easingFactor = 0;
    } else if (adjustedCycleTime < Math.PI * 0.9) {
      easingFactor = (adjustedCycleTime - Math.PI * 0.1) / (Math.PI * 0.8);
    } else if (adjustedCycleTime < Math.PI * 1.1) {
      easingFactor = 1;
    } else if (adjustedCycleTime < Math.PI * 1.9) {
      easingFactor = 1 - (adjustedCycleTime - Math.PI * 1.1) / (Math.PI * 0.8);
    } else {
      easingFactor = 0;
    }
    const smoothEasing =
      easingFactor < 0.5
        ? 4 * easingFactor * easingFactor * easingFactor
        : 1 - Math.pow(-2 * easingFactor + 2, 3) / 2;

    const baseRgb = hexToRgb(colors.bar);
    const accentRgb = hexToRgb(colors.accent);

    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < numLines; i++) {
      const x = i * lineSpacing + lineSpacing / 2;
      const lineMouseInfluence = getMouseInfluence(x, height / 2);
      ctx.beginPath();
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = lineWidth + lineMouseInfluence * 1.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      const bars1 = pattern1[i] || [];
      const bars2 = pattern2[i] || [];
      const maxBars = Math.max(bars1.length, bars2.length);
      const rgb = i % accentEvery === accentEvery - 1 ? accentRgb : baseRgb;
      for (let j = 0; j < maxBars; j++) {
        let bar1 = bars1[j];
        let bar2 = bars2[j];
        if (!bar1) bar1 = { y: bar2.y - 40, height: 0, width: 0 };
        if (!bar2) bar2 = { y: bar1.y + 40, height: 0, width: 0 };
        const barMouseInfluence = getMouseInfluence(x, bar1.y);
        const burstInfluence = getTransitionBurstInfluence(x, bar1.y, currentTime);
        const baseWaveOffset =
          Math.sin(i * 0.3 + j * 0.5 + timeRef.current * 2) * 6 * (smoothEasing * (1 - smoothEasing) * 4);
        const mouseWaveOffset = barMouseInfluence * Math.sin(timeRef.current * 3 + i * 0.2) * 8;
        const burstWaveOffset = burstInfluence * Math.sin(timeRef.current * 4 + j * 0.3) * 12;
        const y = bar1.y + (bar2.y - bar1.y) * smoothEasing + baseWaveOffset + mouseWaveOffset + burstWaveOffset;
        const bh =
          bar1.height + (bar2.height - bar1.height) * smoothEasing + barMouseInfluence * 4 + burstInfluence * 6;
        const bw =
          bar1.width + (bar2.width - bar1.width) * smoothEasing + barMouseInfluence * 1.5 + burstInfluence * 2;
        if (bh > 0.1 && bw > 0.1) {
          const intensity = Math.min(1, 0.8 + barMouseInfluence * 0.2 + burstInfluence * 0.3);
          ctx.fillStyle = `rgba(${rgb}, ${intensity})`;
          ctx.fillRect(x - bw / 2, y - bh / 2, bw, bh);
        }
      }
    }

    if (!removeWaveLine) {
      transitionBursts.current.forEach((burst) => {
        const age = currentTime - burst.time;
        const maxAge = 2500;
        if (age < maxAge) {
          const progress = age / maxAge;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 252, 250, ${(1 - progress) * 0.2 * burst.intensity})`;
          ctx.lineWidth = 1.5;
          ctx.arc(burst.x, burst.y, progress * 120, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    }
  }, [colors, accentEvery, lineWidth, animationSpeed, removeWaveLine]);

  const animate = useCallback(() => {
    drawFrame();
    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.isDown = false;
  }, []);

  const handleMouseDown = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.isDown = true;
    transitionBursts.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
      intensity: 2,
    });
    const now = Date.now();
    transitionBursts.current = transitionBursts.current.filter((b) => now - b.time < 2500);
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    resizeCanvas();
    if (!reduce) {
      animate();
    } else {
      drawFrame();
    }
    const observer = new ResizeObserver(() => {
      resizeCanvas();
      if (reduce) drawFrame();
    });
    observer.observe(wrap);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      transitionBursts.current = [];
    };
  }, [animate, drawFrame, resizeCanvas, handleMouseMove, handleMouseLeave, handleMouseDown, handleMouseUp, reduce]);

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full overflow-hidden" style={{ backgroundColor: colors.background }}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
