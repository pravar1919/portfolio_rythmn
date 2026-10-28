"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#partner", label: "Engage" },
  { href: "/#celebrations", label: "Celebrations" },
];

/** `tone` is the colour of the page behind the bar before it turns solid on scroll. */
export function Nav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  const dark = tone === "dark" && !scrolled;
  const solid = scrolled
    ? "bg-paper/85 text-ink shadow-[0_1px_0_rgb(11_16_32/0.08)] backdrop-blur-xl"
    : dark
      ? "text-white"
      : "text-ink";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${solid}`}>
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Rythmn AI, home">
          <Image src="/brand/logo-mark.png" alt="" width={32} height={32} className="size-8" />
          <span className="text-[17px] font-semibold tracking-tight">Rythmn AI</span>
        </Link>

        <ul className="hidden items-center gap-8 text-[14px] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-underline py-1 opacity-80 transition-opacity hover:opacity-100">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/#contact" className="btn-amber hidden !px-5 !py-2.5 text-[14px] sm:inline-flex">
            Start a project
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-current/20 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="border-t border-line bg-paper text-ink md:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {[...links, { href: "/#contact", label: "Start a project" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-3xl">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
