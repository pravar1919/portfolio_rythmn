import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Fade } from "@/components/Intro";
import { InViewVideo } from "@/components/Media";
import { ContactForm } from "@/components/ContactForm";
import { projectBySlug } from "@/content/projects";
import { ToneDemo } from "./ToneDemo";

export const metadata: Metadata = {
  title: "Personalised birthday microsites",
  description:
    "Interactive birthday surprises sent as one link: animated reveals, personal messages, photo galleries, music and confetti — funny, romantic, heartfelt or professional, for friends, partners, family and colleagues.",
  alternates: { canonical: "/birthdays" },
  openGraph: { title: "Birthday microsites — Rythmn AI", images: [{ url: "/og/birthday.jpg", width: 1200, height: 630 }] },
};

const bro = projectBySlug["bro-exe"];

const acts = [
  { n: "Act I", t: "The boot", d: "A retro terminal starts “diagnosing” the birthday friend.", img: "/work/birthday/birthday-step1.webp" },
  { n: "Act II", t: "The diagnosis", d: "brain.exe: occasionally responsive. maturity.dll: missing.", img: "/work/birthday/birthday-step2.webp" },
  { n: "Act III", t: "The crash", d: "ERROR 404: ANOTHER YEAR OF YOUR LIFE NOT FOUND.", img: "/work/birthday/birthday-crash.webp" },
  { n: "Act IV", t: "The celebration", d: "A gold reboot with roasts, a fake forecast, a gift and a sincere note.", img: "/work/birthday/birthday-step3.webp" },
];

const features = [
  ["Animated surprises", "Reveals, plot twists and staged moments that unfold as they tap."],
  ["Personal messages", "Your words — or we help you find them — in the tone that fits."],
  ["Photo galleries", "The best (and most embarrassing) photos, curated into the story."],
  ["Music", "Their song, playing at exactly the right moment."],
  ["Confetti & effects", "Celebration effects that feel earned, not tacked on."],
  ["Interactive bits", "Roast generators, quizzes, predictions and unlockable gifts."],
  ["One shareable link", "Opens instantly on any phone, with a custom WhatsApp preview."],
  ["Private by default", "No tracking, no sign-ups — and pages can stay unlisted."],
];

const audiences = [
  ["Friends", "Inside jokes, roasts and a sincere twist at the end."],
  ["Partners", "Romantic, personal, full of the moments only you two know."],
  ["Family", "Photos across the years and messages from everyone, in one place."],
  ["Colleagues", "A team card that’s actually fun to open — warm, but office-appropriate."],
];

const packages = [
  { name: "Wish", desc: "An animated birthday card on its own link — quick, personal and beautiful.", items: ["Personal message in your chosen tone", "Animated reveal and confetti", "Up to a handful of photos", "WhatsApp-ready link preview"] },
  { name: "Surprise", desc: "A story-driven microsite like BRO.exe, built around one person.", items: ["Multi-step interactive story", "Photo gallery and music", "Interactive extras (roasts, quizzes, gifts)", "Custom design and theme"], featured: true },
  { name: "Bespoke", desc: "For milestone birthdays and group surprises from many people.", items: ["Messages and videos from many contributors", "Fully custom concept and illustrations", "Timed unlock for the big moment", "Your own domain if you want one"] },
];

export default function Birthdays() {
  return (
    <>
      <Nav tone="dark" />
      <main id="main" className="bg-[#0d0b07] text-[#f1dfb4]">
        {/* hero */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgb(233_196_106/0.18),transparent_60%)]" />
          <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Fade>
                <p className="eyebrow text-[#e9c46a]">Rythmn AI · Birthday microsites</p>
              </Fade>
              <Fade d={0.1}>
                <h1 className="headline mt-6 text-[clamp(3.2rem,7vw,6.4rem)] text-[#fff6dd]">
                  Birthday wishes they’ll <em className="text-[#e9c46a]">open twice.</em>
                </h1>
              </Fade>
              <Fade d={0.18}>
                <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-[#f1dfb4]/70">
                  Turn a birthday message into a small interactive experience — reveals, photos, music and confetti, in a tone that’s
                  unmistakably yours. Sent as one link, opened on any phone.
                </p>
              </Fade>
              <Fade d={0.26} className="mt-9 flex flex-wrap gap-3">
                <Link href="#enquire" className="btn bg-[#e9c46a] text-[#0d0b07] hover:bg-[#f1d58a]">
                  Plan a surprise <span aria-hidden>→</span>
                </Link>
                <Link href="#try" className="btn border border-[#f1dfb4]/25 hover:border-[#f1dfb4]/60">
                  Try the demo
                </Link>
              </Fade>
            </div>
            <Fade d={0.18} className="relative lg:col-span-6">
              <div className="overflow-hidden rounded-[20px] border border-[#f1dfb4]/15 shadow-[0_40px_120px_-40px_rgb(233_196_106/0.35)]">
                <Image src={bro.hero.src} alt={bro.hero.alt} width={1800} height={1125} preload loading="eager" sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
              </div>
              <div className="absolute -bottom-8 -left-4 w-[28%] overflow-hidden rounded-[22px] border-[5px] border-[#1c1810] shadow-2xl sm:-left-8">
                <Image src={bro.mobile.src} alt={bro.mobile.alt} width={780} height={1688} sizes="180px" className="h-auto w-full" />
              </div>
            </Fade>
          </div>
        </section>

        {/* showcase */}
        <section aria-labelledby="bro-h" className="border-y border-[#f1dfb4]/10 bg-[#110e08] py-20 md:py-28">
          <div className="shell">
            <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="eyebrow text-[#e9c46a]">Live example · bro-exe.pages.dev</p>
                <h2 id="bro-h" className="headline mt-4 text-[clamp(2.4rem,4.6vw,4rem)] text-[#fff6dd]">
                  BRO.exe — a birthday that crashes on purpose.
                </h2>
              </div>
              <p className="text-[16px] leading-relaxed text-[#f1dfb4]/65 md:col-span-5">{bro.summary}</p>
            </Reveal>
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {acts.map((a, i) => (
                <Reveal as="li" key={a.n} delay={i * 0.08}>
                  <div className="overflow-hidden rounded-[14px] border border-[#f1dfb4]/10">
                    <Image src={a.img} alt={`${a.t}: ${a.d}`} width={1800} height={1125} sizes="(min-width: 1024px) 25vw, 50vw" className="h-auto w-full" />
                  </div>
                  <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-[#e9c46a] uppercase">{a.n}</p>
                  <h3 className="mt-1 font-display text-[1.7rem] text-[#fff6dd]">{a.t}</h3>
                  <p className="mt-1 text-[14px] text-[#f1dfb4]/60">{a.d}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-14 overflow-hidden rounded-[20px] border border-[#f1dfb4]/10 bg-black p-2">
              <InViewVideo src={bro.video.src} poster={bro.video.poster} label="Screen recording of the BRO.exe birthday microsite from boot to celebration" className="aspect-[16/10] w-full rounded-[14px] object-cover" />
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <a href={bro.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[#e9c46a] link-underline">
                Open BRO.exe ↗
              </a>
              <Link href={`/work/${bro.slug}`} className="link-underline">
                Read how it was built →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* demo */}
        <section id="try" aria-labelledby="try-h" className="scroll-mt-20 py-20 md:py-28">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="eyebrow text-[#e9c46a]">Pick a tone</p>
              <h2 id="try-h" className="headline mt-4 text-[clamp(2.4rem,4.6vw,4rem)] text-[#fff6dd]">
                Same birthday, seven different feelings.
              </h2>
              <p className="mt-4 text-[16px] text-[#f1dfb4]/65">
                Friendly, funny, romantic, emotional, heartfelt, playful or professional. Choose who it’s for, pick a tone, then open the card.
                Real projects are written and designed for one person.
              </p>
            </Reveal>
            <div className="mt-12">
              <ToneDemo />
            </div>
          </div>
        </section>

        {/* features + audiences */}
        <section aria-labelledby="feat-h" className="border-t border-[#f1dfb4]/10 py-20 md:py-28">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="eyebrow text-[#e9c46a]">What can go in it</p>
              <h2 id="feat-h" className="headline mt-4 text-[clamp(2.4rem,4.6vw,4rem)] text-[#fff6dd]">
                Less card. More moment.
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-[#f1dfb4]/10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={(i % 4) * 0.05} className="bg-[#0d0b07] p-7">
                  <h3 className="font-display text-[1.6rem] text-[#fff6dd]">{t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#f1dfb4]/60">{d}</p>
                </Reveal>
              ))}
            </ul>
            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {audiences.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.06} className="border-t border-[#e9c46a]/40 pt-5">
                  <h3 className="font-mono text-[12px] tracking-[0.18em] text-[#e9c46a] uppercase">For {t.toLowerCase()}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#f1dfb4]/75">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* packages */}
        <section id="packages" aria-labelledby="pk-h" className="scroll-mt-20 bg-[#110e08] py-20 md:py-28">
          <div className="shell">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-[#e9c46a]">Packages</p>
                <h2 id="pk-h" className="headline mt-4 text-[clamp(2.4rem,4.6vw,4rem)] text-[#fff6dd]">
                  Small gesture or grand surprise.
                </h2>
              </div>
              <p className="max-w-[40ch] text-[15px] text-[#f1dfb4]/60">Tell us who it’s for and when. We’ll send ideas and a fixed quote.</p>
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {packages.map((p, i) => (
                <Reveal
                  key={p.name}
                  delay={i * 0.08}
                  className={`flex flex-col rounded-[24px] border p-8 ${p.featured ? "border-[#e9c46a] bg-[#e9c46a] text-[#0d0b07]" : "border-[#f1dfb4]/15"}`}
                >
                  <h3 className="headline text-[2.6rem]">{p.name}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${p.featured ? "text-[#0d0b07]/75" : "text-[#f1dfb4]/65"}`}>{p.desc}</p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[14px]">
                        <span aria-hidden>✦</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-8 flex items-center justify-between border-t pt-5 ${p.featured ? "border-[#0d0b07]/20" : "border-[#f1dfb4]/15"}`}>
                    <span className="font-display text-[1.3rem] italic">Custom quote</span>
                    <Link href="#enquire" className="text-[14px] font-medium link-underline" aria-label={`Enquire about the ${p.name} package`}>
                      Enquire →
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* enquire */}
        <section id="enquire" aria-labelledby="enq-h" className="scroll-mt-20 border-t border-[#f1dfb4]/10 py-20 md:py-28">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-[#e9c46a]">Enquire</p>
              <h2 id="enq-h" className="headline mt-4 text-[clamp(2.6rem,5vw,4.4rem)] text-[#fff6dd]">
                Whose birthday is it?
              </h2>
              <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-[#f1dfb4]/65">
                Tell us a little about them and the date. The more lead time, the more surprises we can build in.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ContactForm
                subject="Birthday microsite enquiry"
                submitLabel="Send enquiry"
                fields={[
                  { name: "name", label: "Your name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "for", label: "Who is it for?", placeholder: "e.g. my best friend, my wife" },
                  { name: "date", label: "Birthday date" },
                  { name: "package", label: "Package", type: "select", options: [...packages.map((p) => p.name), "Not sure yet"] },
                  { name: "message", label: "Tone, ideas, inside jokes", type: "textarea", required: true, placeholder: "Funny or sentimental? Any stories, photos or songs that must be in it?" },
                ]}
              />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
