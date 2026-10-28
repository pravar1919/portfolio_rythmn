"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const recipients = [
  { id: "friend", label: "A friend", sign: "— your partner in crime" },
  { id: "partner", label: "My partner", sign: "— all my love, always" },
  { id: "family", label: "Family", sign: "— with love, from all of us" },
  { id: "colleague", label: "A colleague", sign: "— from everyone on the team" },
] as const;

type Rid = (typeof recipients)[number]["id"];

const tones: { id: string; label: string; for?: Rid[]; bg: string; ink: string; text: (n: string) => string }[] = [
  { id: "friendly", label: "Friendly", bg: "linear-gradient(140deg,#ffe8a3,#ffb86b)", ink: "#3b1d00", text: (n) => `Happy birthday, ${n}! Another year of being the person everyone’s glad to see. Hope today is easy, loud and full of cake.` },
  { id: "funny", label: "Funny", bg: "linear-gradient(140deg,#c7f9cc,#57cc99)", ink: "#06281a", text: (n) => `${n}, scientists confirm you are now one year closer to complaining about your knees. Happy birthday — we’re still thrilled you were born.` },
  { id: "romantic", label: "Romantic", for: ["partner"], bg: "linear-gradient(140deg,#ffd6e0,#ff7aa2)", ink: "#4a0420", text: (n) => `Happy birthday, ${n}. Of all the days in the year, this is the one I’m most grateful for — it’s the one that gave me you.` },
  { id: "emotional", label: "Emotional", bg: "linear-gradient(140deg,#d7e3fc,#8ea8f2)", ink: "#0d1b4a", text: (n) => `${n}, I don’t say it enough: you’ve made the hard years lighter and the good ones brighter. Happy birthday.` },
  { id: "heartfelt", label: "Heartfelt", bg: "linear-gradient(140deg,#fde2c8,#f4a77a)", ink: "#43190a", text: (n) => `Happy birthday, ${n}. Thank you for all the kindness you hand out without keeping count. Today, it all comes back to you.` },
  { id: "playful", label: "Playful", bg: "linear-gradient(140deg,#e9d5ff,#a78bfa)", ink: "#26114d", text: (n) => `LEVEL UP! ${n} has unlocked a new year. New perks: wisdom +1, cake +∞. Press start to celebrate.` },
  { id: "professional", label: "Professional", for: ["colleague"], bg: "linear-gradient(140deg,#e7e5e4,#a8a29e)", ink: "#1c1917", text: (n) => `Happy birthday, ${n}. Working with you makes the hard days easier and the good days better. Wishing you a brilliant year ahead.` },
];

export function ToneDemo() {
  const [who, setWho] = useState<Rid>("friend");
  const [tone, setTone] = useState("funny");
  const [name, setName] = useState("Sam");
  const [open, setOpen] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  const available = tones.filter((t) => !t.for || t.for.includes(who));
  const t = available.find((x) => x.id === tone) ?? available[0];
  const r = recipients.find((x) => x.id === who)!;

  function pickWho(id: Rid) {
    setWho(id);
    setOpen(false);
  }
  function pickTone(id: string) {
    setTone(id);
    setOpen(false);
  }
  function reveal() {
    setOpen(true);
    burst(canvas.current);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="space-y-7 lg:col-span-5">
        <span className="inline-block rounded-full bg-[#f1dfb4] px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-[#0d0b07] uppercase">Demo · try it</span>
        <fieldset>
          <legend className="eyebrow text-[#f1dfb4]/60">Who is it for?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {recipients.map((x) => (
              <Chip key={x.id} on={x.id === who} onClick={() => pickWho(x.id)}>
                {x.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="eyebrow text-[#f1dfb4]/60">Tone</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {available.map((x) => (
              <Chip key={x.id} on={x.id === t.id} onClick={() => pickTone(x.id)}>
                {x.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="eyebrow text-[#f1dfb4]/60">Their name</span>
          <input
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            className="mt-3 w-full rounded-xl border border-[#f1dfb4]/20 bg-white/5 px-4 py-3 text-[17px] text-[#f1dfb4] outline-none focus:border-[#f1dfb4]/70"
          />
        </label>
      </div>

      <div className="relative lg:col-span-7">
        <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full" />
        <div className="relative mx-auto aspect-[4/5] max-w-[440px] sm:aspect-[5/5]">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key={`closed-${t.id}-${who}`}
                type="button"
                onClick={reveal}
                initial={{ opacity: 0, rotateY: -12, scale: 0.96 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 80, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border border-[#f1dfb4]/25 bg-[#17130b] text-[#f1dfb4] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]"
                aria-label={`Open the ${t.label.toLowerCase()} birthday card for ${name || "them"}`}
              >
                <motion.span
                  aria-hidden
                  className="text-6xl"
                  animate={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
                >
                  🎁
                </motion.span>
                <span className="mt-6 font-display text-[2.2rem] italic">For {name || "you"}</span>
                <span className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase opacity-60 transition-opacity group-hover:opacity-100">Tap to open</span>
              </motion.button>
            ) : (
              <motion.div
                key={`open-${t.id}-${who}`}
                initial={{ opacity: 0, rotateY: -80, scale: 0.98 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-between rounded-[28px] p-8 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] sm:p-10"
                style={{ background: t.bg, color: t.ink }}
                role="status"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-70">{t.label} · for {r.label.toLowerCase()}</p>
                <p className="font-display text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.15]">{t.text(name || "you")}</p>
                <div className="flex items-end justify-between">
                  <p className="font-display text-[1.3rem] italic">{r.sign}</p>
                  <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-current/30 px-3 py-1.5 text-[12px] font-medium">
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
        on ? "border-[#f1dfb4] bg-[#f1dfb4] text-[#0d0b07]" : "border-[#f1dfb4]/25 text-[#f1dfb4]/80 hover:border-[#f1dfb4]/60"
      }`}
    >
      {children}
    </button>
  );
}

/** A small, dependency-free confetti burst drawn on the given canvas. */
export function burst(c: HTMLCanvasElement | null, count = 140) {
  if (!c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = (c.width = c.clientWidth * dpr);
  const h = (c.height = c.clientHeight * dpr);
  const colors = ["#f1dfb4", "#e9c46a", "#ff7aa2", "#57cc99", "#8ea8f2", "#ffb86b"];
  const parts = Array.from({ length: count }, () => ({
    x: w / 2 + (Math.random() - 0.5) * w * 0.2,
    y: h * 0.55,
    vx: (Math.random() - 0.5) * 18 * dpr,
    vy: (-Math.random() * 16 - 8) * dpr,
    r: (Math.random() * 4 + 3) * dpr,
    a: Math.random() * Math.PI,
    va: (Math.random() - 0.5) * 0.3,
    c: colors[(Math.random() * colors.length) | 0],
  }));
  let frame = 0;
  const step = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.vy += 0.45 * dpr;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.a += p.va;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.max(0, 1 - frame / 110);
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    }
    if (++frame < 110) requestAnimationFrame(step);
    else ctx.clearRect(0, 0, w, h);
  };
  requestAnimationFrame(step);
}
