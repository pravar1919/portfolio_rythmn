"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/content/projects";

/**
 * Featured project, laid out asymmetrically. On desktop, hovering the screenshot swaps in the
 * real screen recording and a small label follows the cursor. Touch and reduced-motion users get
 * the still screenshot. The image morphs into the case-study hero on navigation.
 */
export function ProjectCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });

  const fine = () => matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;

  function place(e: React.PointerEvent, jump = false) {
    const r = ref.current!.getBoundingClientRect();
    x[jump ? "jump" : "set"](e.clientX - r.left);
    y[jump ? "jump" : "set"](e.clientY - r.top);
  }
  function enter(e: React.PointerEvent) {
    if (!fine()) return;
    place(e, true);
    setHover(true);
    if (!video.current) return;
    video.current.preload = "auto";
    video.current.currentTime = 0;
    video.current.play().then(() => setPlaying(true)).catch(() => {});
  }
  function leave() {
    setHover(false);
    video.current?.pause();
    setPlaying(false);
  }

  const flip = index % 2 === 1;
  const domain = p.url.replace("https://", "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-8 lg:grid-cols-12 lg:gap-10"
    >
      <figure className={flip ? "lg:order-2 lg:col-span-7 lg:col-start-6 lg:mt-24" : "lg:col-span-8"}>
        <Link
          ref={ref}
          href={`/work/${p.slug}`}
          onPointerEnter={enter}
          onPointerLeave={leave}
          onPointerMove={(e) => hover && place(e)}
          className={`group relative block overflow-hidden rounded-[6px] border border-line bg-sand-2 ${hover ? "cursor-none" : ""}`}
          aria-label={`${p.name} case study`}
        >
          <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={p.hero.src}
                alt={p.hero.alt}
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                className={`object-cover object-top transition-[transform,opacity] duration-[1.4s] ease-out-expo group-hover:scale-[1.025] ${playing ? "opacity-0" : "opacity-100"}`}
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
            </div>
          </ViewTransition>
          <motion.span
            aria-hidden
            style={{ x, y }}
            className="pointer-events-none absolute top-0 left-0 z-10 -mt-12 -ml-12 grid size-24 place-items-center"
          >
            <span
              className={`grid size-24 place-items-center whitespace-pre-line rounded-full bg-clay text-center text-[12px] leading-tight font-medium text-ivory transition-transform duration-500 ease-out-expo ${
                hover ? "scale-100" : "scale-0"
              }`}
            >
              {playing ? "Live\nrecording" : "View\ncase"}
            </span>
          </motion.span>
        </Link>
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-[12.5px] text-muted">
          <span className="font-mono">{domain}</span>
          <span className="hidden sm:inline">Fig. 0{index + 1} — captured from the live site</span>
        </figcaption>
      </figure>

      <div className={`flex flex-col ${flip ? "lg:order-1 lg:col-span-4" : "lg:col-span-4 lg:col-start-9 lg:pt-6"}`}>
        <p className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-none text-terracotta italic" aria-hidden>
          0{index + 1}
        </p>
        <p className="eyebrow mt-6 text-muted">
          {p.kind} <span aria-hidden>·</span> {p.sector}
        </p>
        <h3 className="headline mt-3 text-[clamp(2.2rem,3.4vw,3.2rem)]">{p.name}</h3>
        <p className="mt-4 text-[16.5px] leading-relaxed text-charcoal/85">{p.title}</p>
        <ul className="mt-6 space-y-3 border-t border-line pt-6">
          {p.outcomes.slice(0, 2).map((o) => (
            <li key={o} className="flex gap-3 text-[14.5px] leading-snug text-muted">
              <span aria-hidden className="mt-[9px] h-px w-4 shrink-0 bg-terracotta" />
              {o}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14.5px]">
          <Link href={`/work/${p.slug}`} className="font-medium text-clay link-rule">
            Read the case study →
          </Link>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-muted link-underline hover:text-charcoal">
            Visit live site ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}
