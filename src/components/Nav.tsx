"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "@/components/Wordmark";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#partner", label: "Engage" },
  { href: "/#celebrations", label: "Celebrations" },
];

/** Sits on the ivory canvas everywhere; gains a hairline and a frosted ground once scrolled. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 24);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      style={{ viewTransitionName: "site-nav" }}
      className={`fixed inset-x-0 top-0 z-50 text-charcoal transition-[background-color,box-shadow] duration-500 ${
        scrolled || open ? "bg-ivory/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : ""
      }`}
    >
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="py-2" aria-label="Rythmn AI, home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-9 text-[14.5px] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-underline py-1">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/#contact" className="btn-primary hidden !px-5 !py-2.5 text-[14px] sm:inline-flex">
            Start a project
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line-strong md:hidden"
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
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ivory md:hidden"
          >
            <ul className="shell flex flex-col pt-6 pb-10">
              {[...links, { href: "/#contact", label: "Start a project" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4 font-display text-[2.4rem] leading-none">
                    {l.label}
                    <span className="text-[13px] font-sans text-muted">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="shell flex gap-6 text-[14px] text-muted">
              <Link href="/weddings" onClick={() => setOpen(false)} className="link-rule">
                Wedding websites
              </Link>
              <Link href="/birthdays" onClick={() => setOpen(false)} className="link-rule">
                Birthday microsites
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
