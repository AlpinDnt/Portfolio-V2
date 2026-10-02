import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";

const noise = (x, y, t) => {
  const sin1 = Math.sin(x * 0.01 + t);
  const sin2 = Math.sin(y * 0.01 + t * 0.8);
  const sin3 = Math.sin((x + y) * 0.005 + t * 1.2);
  return (sin1 + sin2 + sin3) / 3;
};

export default function FlowingDots({
  backgroundColor = "#141210",
  particleColor = "255, 252, 250",
  accentColor = "217, 45, 32",
  accentEvery = 5,
  lineAlpha = 0.35,
  animationSpeed = 0.005,
  gridSize = 8,
  dotRadius = 1.6,
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameId = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const flowPointsRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    sizeRef.current = { w, h };
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    flowPointsRef.current = [];
    let i = 0;
    for (let x = gridSize / 2; x < w; x += gridSize) {
      for (let y = gridSize / 2; y < h; y += gridSize) {
        flowPointsRef.current.push({
          x,
          y,
          vx: 0,
          vy: 0,
          originalX: x,
          originalY: y,
          accent: i++ % accentEvery === 0,
        });
      }
    }
  }, [gridSize, accentEvery]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = sizeRef.current;
    timeRef.current += animationSpeed;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, w, h);

    flowPointsRef.current.forEach((point) => {
      const noiseValue = noise(point.x, point.y, timeRef.current);
      const angle = noiseValue * Math.PI * 4;

      const dx = mouseRef.current.x - point.x;
      const dy = mouseRef.current.y - point.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 60 && dist > 0.01) {
        const pushFactor = (1 - dist / 60) * 0.6;
        point.vx += (dx / dist) * pushFactor;
        point.vy += (dy / dist) * pushFactor;
      }

      point.vx += Math.cos(angle) * 0.1;
      point.vy += Math.sin(angle) * 0.1;
      point.vx *= 0.95;
      point.vy *= 0.95;

      const nextX = point.x + point.vx;
      const nextY = point.y + point.vy;
      const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
      const alpha = Math.min(0.85, speed * 8 + 0.3);
      const color = point.accent ? accentColor : particleColor;

      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(nextX, nextY);
      ctx.strokeStyle = `rgba(${color}, ${alpha * lineAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();

      point.x = nextX;
      point.y = nextY;
      if (nextX < 0) point.x = w;
      if (nextX > w) point.x = 0;
      if (nextY < 0) point.y = h;
      if (nextY > h) point.y = 0;

      point.vx += (point.originalX - point.x) * 0.01;
      point.vy += (point.originalY - point.y) * 0.01;
    });
  }, [backgroundColor, particleColor, accentColor, lineAlpha, animationSpeed, dotRadius]);

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
    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      flowPointsRef.current = [];
    };
  }, [animate, drawFrame, resizeCanvas, handleMouseMove, handleMouseLeave, reduce]);

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full overflow-hidden" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
