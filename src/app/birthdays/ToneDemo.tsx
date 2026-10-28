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
  { id: "friendly", label: "Friendly", bg: "#e7dac6", ink: "#252720", text: (n) => `Happy birthday, ${n}! Another year of being the person everyone’s glad to see. Hope today is easy, loud and full of cake.` },
  { id: "funny", label: "Funny", bg: "#c9d2b3", ink: "#1f2a1c", text: (n) => `${n}, scientists confirm you are now one year closer to complaining about your knees. Happy birthday — we’re still thrilled you were born.` },
  { id: "romantic", label: "Romantic", for: ["partner"], bg: "#e8c2b0", ink: "#4a1d10", text: (n) => `Happy birthday, ${n}. Of all the days in the year, this is the one I’m most grateful for — it’s the one that gave me you.` },
  { id: "emotional", label: "Emotional", bg: "#bcc8c0", ink: "#1b2e24", text: (n) => `${n}, I don’t say it enough: you’ve made the hard years lighter and the good ones brighter. Happy birthday.` },
  { id: "heartfelt", label: "Heartfelt", bg: "#e3a988", ink: "#3d1a0c", text: (n) => `Happy birthday, ${n}. Thank you for all the kindness you hand out without keeping count. Today, it all comes back to you.` },
  { id: "playful", label: "Playful", bg: "#e2c27a", ink: "#3a2a07", text: (n) => `LEVEL UP! ${n} has unlocked a new year. New perks: wisdom +1, cake +∞. Press start to celebrate.` },
  { id: "professional", label: "Professional", for: ["colleague"], bg: "#d6d1c4", ink: "#252720", text: (n) => `Happy birthday, ${n}. Working with you makes the hard days easier and the good days better. Wishing you a brilliant year ahead.` },
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
        <span className="eyebrow inline-block rounded-full bg-forest px-3 py-1.5 text-[10.5px] text-ivory">Demo · try it</span>
        <fieldset>
          <legend className="eyebrow text-muted">Who is it for?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {recipients.map((x) => (
              <Chip key={x.id} on={x.id === who} onClick={() => pickWho(x.id)}>
                {x.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="eyebrow text-muted">Tone</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {available.map((x) => (
              <Chip key={x.id} on={x.id === t.id} onClick={() => pickTone(x.id)}>
                {x.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="eyebrow text-muted">Their name</span>
          <input
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-3 font-display text-[22px] outline-none transition-[border-color,box-shadow] focus:border-charcoal focus:shadow-[0_1px_0_0_currentColor] focus-visible:outline-none"
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
                className="group absolute inset-0 flex flex-col items-center justify-center rounded-[6px] bg-forest text-ivory shadow-[0_40px_80px_-40px_rgb(37_39_32/0.6)]"
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
                <span className="eyebrow mt-4 text-sand transition-colors group-hover:text-ivory">
                  Tap to open <span className="sr-only">the {t.label.toLowerCase()} card</span>
                </span>
              </motion.button>
            ) : (
              <motion.div
                key={`open-${t.id}-${who}`}
                initial={{ opacity: 0, rotateY: -80, scale: 0.98 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-between rounded-[6px] p-8 shadow-[0_40px_80px_-40px_rgb(37_39_32/0.6)] sm:p-10"
                style={{ background: t.bg, color: t.ink }}
                role="status"
              >
                <p className="eyebrow opacity-80">{t.label} · for {r.label.toLowerCase()}</p>
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
        on ? "border-forest bg-forest text-ivory" : "border-line-strong text-charcoal hover:border-charcoal"
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
  const colors = ["#c56a45", "#243b2f", "#d9c7ae", "#e2c27a", "#984a29", "#8fa58a"];
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
