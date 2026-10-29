"use client";

import { useEffect, useRef } from "react";
import styles from "./PulsePlot.module.css";

// Generative stacked-line plot. Decorative: it is not data and says so in the page.
const ROWS = 46;
const POINTS = 120;

function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise(x: number, seed: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i + seed * 57) * (1 - u) + hash(i + 1 + seed * 57) * u;
}

export function PulsePlot() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let visible = true;
    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const left = width * 0.08;
      const right = width * 0.92;
      const top = height * 0.12;
      const bottom = height * 0.92;
      const span = right - left;
      const rowGap = (bottom - top) / (ROWS - 1);
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#f4f4f1";
      ctx.fillStyle = "#0b0b0c";

      for (let r = 0; r < ROWS; r++) {
        const baseY = top + r * rowGap;
        ctx.beginPath();
        for (let p = 0; p <= POINTS; p++) {
          const u = p / POINTS;
          const envelope = Math.exp(-Math.pow((u - 0.5) / 0.22, 2));
          const n = noise(u * 9 + r * 0.35 + t * 0.00035, r + 1) - 0.5;
          const spike = noise(u * 22 - r * 0.2, r + 90) - 0.5;
          const y = baseY - (n * 0.9 + spike * 0.5) * envelope * rowGap * 6;
          const x = left + u * span;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(right, bottom + rowGap * 2);
        ctx.lineTo(left, bottom + rowGap * 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        for (let p = 0; p <= POINTS; p++) {
          const u = p / POINTS;
          const envelope = Math.exp(-Math.pow((u - 0.5) / 0.22, 2));
          const n = noise(u * 9 + r * 0.35 + t * 0.00035, r + 1) - 0.5;
          const spike = noise(u * 22 - r * 0.2, r + 90) - 0.5;
          const y = baseY - (n * 0.9 + spike * 0.5) * envelope * rowGap * 6;
          const x = left + u * span;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || now - last < 40) return;
      last = now;
      draw(now);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      resize();
      if (reduced.matches) {
        draw(0);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    observer.observe(canvas);
    const onResize = () => start();
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
