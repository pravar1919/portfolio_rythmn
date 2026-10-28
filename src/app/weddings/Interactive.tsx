"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Ceremony = { id: string; name: string; line: string; includes: string[]; art?: { src: string; w: number; h: number; alt: string } };

// Illustrations are from the live Romit & Ayushi site; Mehendi had no event there, so it has none.
const ceremonies: Ceremony[] = [
  { id: "mehendi", name: "Mehendi", line: "Henna, songs and the bride’s hands in the spotlight.", includes: ["Time, venue and dress code", "Song list or playlist link", "Photo wall from guests"] },
  { id: "haldi", name: "Haldi", line: "Turmeric, marigolds and a little chaos.", includes: ["Morning schedule with add-to-calendar", "What to wear (and what not to)", "Illustrated event card"], art: { src: "/weddings/haldi.webp", w: 316, h: 561, alt: "Illustration of a couple at their haldi, smearing turmeric on each other" } },
  { id: "sangeet", name: "Sangeet", line: "Two families, one dance floor.", includes: ["Performance line-up", "Music and venue directions", "Illustrated event card"], art: { src: "/weddings/sangeet.webp", w: 333, h: 569, alt: "Illustration of a couple dancing under a disco ball at the sangeet" } },
  { id: "baraat", name: "Baraat", line: "The groom rides out, the dhol leads the way.", includes: ["Assembly point and route map", "Timings for both families", "Illustrated event card"], art: { src: "/weddings/baraat.webp", w: 590, h: 437, alt: "Illustration of a groom on a white horse under a red umbrella, with dhol players" } },
  { id: "pheras", name: "Pheras", line: "Seven vows around the sacred fire.", includes: ["Muhurat time and live countdown", "Ceremony notes for guests", "Illustrated event card"], art: { src: "/weddings/pheras.webp", w: 927, h: 430, alt: "Illustration of a couple at the sacred fire under the mandap" } },
  { id: "reception", name: "Reception", line: "Dinner, toasts and a last dance.", includes: ["Venue map and parking", "RSVP with meal preferences", "Illustrated event card"], art: { src: "/weddings/reception.webp", w: 424, h: 720, alt: "Illustration of a couple walking in arm in arm at the reception" } },
];

export function CeremonyExplorer() {
  const [active, setActive] = useState("haldi");
  const c = ceremonies.find((x) => x.id === active)!;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Ceremonies" className="flex flex-wrap gap-2">
          {ceremonies.map((x) => (
            <button
              key={x.id}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={x.id === active}
              aria-controls="ceremony-panel"
              onClick={() => setActive(x.id)}
              className={`rounded-full border px-4 py-2 font-wedding text-[18px] transition-colors ${
                x.id === active ? "border-maroon bg-maroon text-ivory" : "border-maroon/25 text-maroon hover:border-maroon/60"
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={c.id}
            id="ceremony-panel"
            role="tabpanel"
            aria-labelledby={`tab-${c.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8"
          >
            <h3 className="font-wedding text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-maroon italic">{c.name}</h3>
            <p className="mt-3 text-[17px] text-maroon/75">{c.line}</p>
            <ul className="mt-6 space-y-2.5">
              {c.includes.map((i) => (
                <li key={i} className="flex gap-3 text-[15px] text-maroon/85">
                  <span aria-hidden className="text-gold">✦</span>
                  {i}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative flex min-h-[420px] items-center justify-center lg:col-span-7">
        <div aria-hidden className="absolute inset-6 rounded-[50%_50%_24px_24px/30%_30%_24px_24px] border border-gold/40 bg-white/40" />
        <AnimatePresence mode="wait">
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 px-10 py-10"
          >
            {c.art ? (
              <Image src={c.art.src} alt={c.art.alt} width={c.art.w} height={c.art.h} className="mx-auto h-auto max-h-[380px] w-auto drop-shadow-[0_20px_30px_rgb(91_15_30/0.18)]" />
            ) : (
              <div className="grid size-56 place-items-center rounded-full border border-dashed border-gold/60 text-center font-wedding text-[20px] text-maroon/70 italic">
                Your couple,
                <br />
                illustrated
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <p className="absolute right-0 bottom-0 left-0 z-10 text-center text-[12px] text-maroon/80">
          Illustrations from Romit & Ayushi’s live site — every couple gets their own.
        </p>
      </div>
    </div>
  );
}

function until(target: number, now: number) {
  const d = Math.max(0, target - now);
  return { days: Math.floor(d / 864e5), hours: Math.floor(d / 36e5) % 24, mins: Math.floor(d / 6e4) % 60, secs: Math.floor(d / 1e3) % 60 };
}

/** A clearly-labelled demo: visitors type their own names and date and see an invitation card. */
export function InvitePreview() {
  const [a, setA] = useState("Aarav");
  const [b, setB] = useState("Meera");
  const [date, setDate] = useState("");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // pick a default date ~120 days out, then tick every second
    const first = setTimeout(() => {
      setDate((d) => d || new Date(Date.now() + 120 * 864e5).toISOString().slice(0, 10));
      setNow(Date.now());
    }, 0);
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);

  const target = date ? new Date(`${date}T18:00:00`).getTime() : 0;
  const left = now && target ? until(target, now) : null;
  const pretty = date ? new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <form className="space-y-5 lg:col-span-4" onSubmit={(e) => e.preventDefault()} aria-label="Invitation preview inputs">
        <span className="inline-block rounded-full bg-maroon px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-ivory uppercase">Demo · try it</span>
        <Field label="Partner one" value={a} onChange={setA} />
        <Field label="Partner two" value={b} onChange={setB} />
        <label className="block">
          <span className="eyebrow text-maroon/70">Wedding date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-xl border border-maroon/20 bg-white/70 px-4 py-3 text-maroon outline-none focus:border-maroon"
          />
        </label>
        <p className="text-[13px] text-maroon/80">Nothing you type leaves your browser.</p>
      </form>
      <div className="lg:col-span-8">
        <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-[28px] border border-gold/40 bg-[radial-gradient(120%_80%_at_50%_0%,#fff,#fbf1e6)] px-6 py-14 text-center shadow-[0_40px_80px_-40px_rgb(91_15_30/0.35)] sm:px-12">
          <Image src="/weddings/flora-tl.webp" alt="" width={420} height={338} sizes="208px" className="pointer-events-none absolute -top-6 -left-8 w-40 opacity-90 sm:w-52" />
          <Image src="/weddings/flora-br.webp" alt="" width={420} height={314} sizes="208px" className="pointer-events-none absolute -right-8 -bottom-6 w-40 opacity-90 sm:w-52" />
          <p className="relative font-wedding text-[13px] tracking-[0.3em] text-gold uppercase">Together with their families</p>
          <p className="relative mt-6 font-wedding text-[clamp(2.4rem,7vw,3.8rem)] leading-[1.05] text-maroon italic" aria-live="polite">
            {a || "…"} <span className="text-gold">&</span> {b || "…"}
          </p>
          <p className="relative mt-4 font-wedding text-[15px] tracking-[0.25em] text-maroon/80 uppercase">{pretty}</p>
          <div className="relative mx-auto mt-8 grid max-w-sm grid-cols-4 gap-2" aria-label="Countdown">
            {(["days", "hours", "mins", "secs"] as const).map((k) => (
              <div key={k} className="rounded-xl border border-gold/30 bg-white/60 py-3">
                <p className="font-wedding text-[28px] leading-none text-maroon tabular-nums">{left ? String(left[k]).padStart(2, "0") : "--"}</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-maroon/80 uppercase">{k}</p>
              </div>
            ))}
          </div>
          <p className="relative mt-8 font-wedding text-[17px] text-maroon/70 italic">Haldi · Sangeet · Pheras · Reception</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="eyebrow text-maroon/70">{label}</span>
      <input
        value={value}
        maxLength={24}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-maroon/20 bg-white/70 px-4 py-3 font-wedding text-[20px] text-maroon outline-none focus:border-maroon"
      />
    </label>
  );
}
