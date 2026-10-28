"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

/**
 * A muted demo recording that plays only while on screen (and never for reduced-motion users,
 * who get the poster and a play button instead).
 */
export function InViewVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.controls = true;
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.preload = "auto";
          v.play().catch(() => setManual(true));
        } else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={manual}
      aria-label={label}
    />
  );
}

/** An image that drifts slightly slower than the page as it scrolls past. */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className,
  preload,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  amount = 60,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  preload?: boolean;
  sizes?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="scale-[1.12]">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} preload={preload} loading={preload ? "eager" : undefined} className="h-auto w-full" />
      </motion.div>
    </div>
  );
}
