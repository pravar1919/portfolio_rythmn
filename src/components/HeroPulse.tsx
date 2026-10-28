"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's signature: a field of bars moving like a slow waveform — the "rhythm" in Rythmn.
 * The wave swells toward the pointer. Pauses off-screen; draws a single still frame for
 * reduced-motion users.
 */
export function HeroPulse({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const pointer = { x: -1, target: -1, strength: 0 };

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const gap = w < 640 ? 7 : 9;
      const n = Math.floor(w / gap);
      pointer.x += (pointer.target - pointer.x) * 0.08;
      pointer.strength += ((pointer.target >= 0 ? 1 : 0) - pointer.strength) * 0.05;
      const s = t / 1000;
      for (let i = 0; i < n; i++) {
        const x = i * gap + gap / 2;
        const u = i / n;
        let a =
          0.5 +
          0.28 * Math.sin(u * 9 + s * 0.9) +
          0.16 * Math.sin(u * 23 - s * 1.7) +
          0.08 * Math.sin(u * 57 + s * 2.3);
        // a broad envelope keeps the edges quiet and the centre alive
        a *= 0.35 + 0.65 * Math.sin(Math.PI * u) ** 1.5;
        if (pointer.x >= 0) {
          const d = (x - pointer.x) / (w * 0.08);
          a += pointer.strength * 0.55 * Math.exp(-d * d);
        }
        const bar = Math.max(2, a * h * 0.9);
        const hot = Math.min(1, Math.max(0, a - 0.45) * 2.2);
        ctx.fillStyle = `rgba(${255},${Math.round(179 + 40 * (1 - hot))},${Math.round(2 + 120 * (1 - hot))},${0.18 + hot * 0.7})`;
        ctx.fillRect(x - 1, (h - bar) / 2, 2, bar);
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw(4200);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(4200);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientY >= r.top - 120 && e.clientY <= r.bottom + 120;
      pointer.target = inside ? e.clientX - r.left : -1;
      if (pointer.x < 0 && inside) pointer.x = pointer.target;
    };
    const leave = () => (pointer.target = -1);
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
