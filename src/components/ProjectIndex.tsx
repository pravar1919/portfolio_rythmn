"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/content/projects";

/**
 * Every live product as an index. On desktop a screenshot of the hovered project trails the
 * cursor; the rows themselves carry all the information, so the preview is decorative.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 26, mass: 0.7 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 26, mass: 0.7 });

  const fine = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

  function move(e: React.PointerEvent) {
    const r = box.current!.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }
  function enterRow(i: number, e: React.PointerEvent) {
    if (!fine()) return;
    if (active === null) {
      const r = box.current!.getBoundingClientRect();
      x.jump(e.clientX - r.left);
      y.jump(e.clientY - r.top);
    }
    setActive(i);
  }

  return (
    <div ref={box} className="relative" onPointerMove={move} onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-ivory/20">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            onPointerEnter={(e) => enterRow(i, e)}
            className={`group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-ivory/20 py-6 transition-[opacity,padding] duration-500 ease-out-expo md:grid-cols-12 md:py-8 ${
              active !== null && active !== i ? "md:opacity-45" : ""
            } ${active === i ? "md:pl-4" : ""}`}
          >
            <span className="font-mono text-[12px] text-sand md:col-span-1">0{i + 1}</span>
            <Link
              href={`/work/${p.slug}`}
              className="font-display text-[clamp(1.9rem,4.2vw,3.6rem)] leading-none tracking-[-0.025em] text-ivory md:col-span-5"
            >
              {p.name}
            </Link>
            <span className="col-start-2 text-[13.5px] text-sand md:col-span-3 md:col-start-auto">
              {p.kind} · {p.sector.split(" · ")[0]}
            </span>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="col-start-2 font-mono text-[13px] text-ivory/85 link-underline hover:text-clay-soft md:col-span-3 md:col-start-auto md:justify-self-end"
            >
              {p.url.replace("https://", "")} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
      >
        <div
          className={`-mt-[110px] ml-8 w-[300px] overflow-hidden rounded-[4px] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] transition-[opacity,transform] duration-500 ease-out-expo lg:w-[360px] ${
            active === null ? "scale-90 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="relative aspect-[16/10] bg-forest-3">
            {projects.map((p, i) => (
              <Image
                key={p.slug}
                src={p.hero.src}
                alt=""
                fill
                sizes="360px"
                className={`object-cover object-top transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
