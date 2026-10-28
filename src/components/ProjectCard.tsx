"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/content/projects";

/**
 * Featured project: tilts gently toward the cursor and, on hover, swaps the screenshot for the
 * real screen recording. Touch devices just get the screenshot.
 */
export function ProjectCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 120, damping: 18 });
  const spot = useTransform([mx, my], ([x, y]: number[]) => `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgb(255 255 255 / 0.10), transparent 45%)`);

  const fine = () => typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;

  function enter() {
    if (!fine() || !video.current) return;
    video.current.preload = "auto";
    video.current.currentTime = 0;
    video.current.play().then(() => setPlaying(true)).catch(() => {});
  }
  function leave() {
    mx.set(0.5);
    my.set(0.5);
    video.current?.pause();
    setPlaying(false);
  }
  function move(e: React.PointerEvent) {
    if (!fine()) return;
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${flip ? "" : ""}`}
    >
      <div className={`lg:col-span-8 ${flip ? "lg:order-2" : ""}`} style={{ perspective: 1400 }}>
        <motion.div style={{ rotateX: rx, rotateY: ry }} className="will-change-transform">
          <Link
            ref={ref}
            href={`/work/${p.slug}`}
            onPointerEnter={enter}
            onPointerLeave={leave}
            onPointerMove={move}
            className="group relative block overflow-hidden rounded-[22px] bg-ink-2 p-2 shadow-[0_40px_80px_-40px_rgb(6_9_20/0.6)] ring-1 ring-white/10 md:p-3"
            aria-label={`${p.name} case study`}
          >
            <div className="flex items-center gap-1.5 px-2 pb-2 md:pb-3">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-3 truncate font-mono text-[11px] text-white/45">{p.url.replace("https://", "")}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-night">
              <Image
                src={p.hero.src}
                alt={p.hero.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={`object-cover object-top transition-[transform,opacity] duration-[1.2s] ease-out-expo group-hover:scale-[1.03] ${playing ? "opacity-0" : "opacity-100"}`}
              />
              <video
                ref={video}
                src={p.video.src}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                tabIndex={-1}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
              />
              <motion.div aria-hidden style={{ background: spot }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute right-4 bottom-4 rounded-full bg-night/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white/80 uppercase opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                {playing ? "Live recording" : "View case study"}
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      <div className={`lg:col-span-4 ${flip ? "lg:order-1" : ""}`}>
        <p className="eyebrow flex items-center gap-3 text-white/45">
          <span className="font-mono text-amber">0{index + 1}</span>
          <span>{p.kind}</span>
          <span aria-hidden>·</span>
          <span>{p.sector}</span>
        </p>
        <h3 className="headline mt-4 text-[clamp(2rem,3.2vw,2.9rem)] text-white">{p.name}</h3>
        <p className="mt-4 text-[16px] leading-relaxed text-white/65">{p.title}</p>
        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
          {p.outcomes.slice(0, 2).map((o) => (
            <li key={o} className="flex gap-3 text-[14px] leading-snug text-white/80">
              <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber" />
              {o}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
          <Link href={`/work/${p.slug}`} className="font-medium text-amber link-underline">
            Read the case study →
          </Link>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-white/60 link-underline hover:text-white">
            Visit live site ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}
