import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, RevealMask } from "@/components/Reveal";
import { Fade, Unveil } from "@/components/Intro";
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
      <Nav />
      <main id="main">
        {/* hero */}
        <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
          <div className="shell">
            <Fade>
              <p className="kicker border-b border-line pb-5 text-clay">Rythmn AI · Birthday microsites</p>
            </Fade>
            <div className="mt-10 grid gap-14 md:mt-14 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <Fade d={0.1}>
                  <h1 className="headline text-[clamp(3.2rem,8vw,7.6rem)]">
                    Birthday wishes they’ll <em className="text-terracotta">open twice.</em>
                  </h1>
                </Fade>
                <Fade d={0.18}>
                  <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted">
                    Turn a birthday message into a small interactive experience — reveals, photos, music and confetti, in a tone that’s
                    unmistakably yours. Sent as one link, opened on any phone.
                  </p>
                </Fade>
                <Fade d={0.26} className="mt-9 flex flex-wrap gap-3">
                  <Link href="#enquire" className="btn-primary">
                    Plan a surprise <span aria-hidden>→</span>
                  </Link>
                  <Link href="#try" className="btn-outline">
                    Try the demo
                  </Link>
                </Fade>
              </div>
              <Unveil d={0.2} className="relative lg:col-span-6">
                <div className="overflow-hidden rounded-[6px] border border-line">
                  <Image src={bro.hero.src} alt={bro.hero.alt} width={1800} height={1125} preload loading="eager" sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
                </div>
                <div className="absolute -bottom-10 -left-3 w-[27%] overflow-hidden rounded-[18px] border-[5px] border-ivory shadow-[0_30px_50px_-28px_rgb(37_39_32/0.55)] sm:-left-8">
                  <Image src={bro.mobile.src} alt={bro.mobile.alt} width={780} height={1688} sizes="180px" className="h-auto w-full" />
                </div>
              </Unveil>
            </div>
          </div>
        </section>

        {/* showcase */}
        <section aria-labelledby="bro-h" className="on-forest relative bg-forest py-20 text-ivory md:py-32 grain">
          <div className="shell relative">
            <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="kicker text-clay-soft">Live example · bro-exe.pages.dev</p>
                <h2 id="bro-h" className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)]">
                  BRO.exe — a birthday that <em>crashes on purpose.</em>
                </h2>
              </div>
              <p className="text-[16px] leading-relaxed text-sand md:col-span-4 md:col-start-9">{bro.summary}</p>
            </Reveal>
            <ol className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {acts.map((a, i) => (
                <Reveal as="li" key={a.n} delay={i * 0.08} className={i % 2 === 1 ? "lg:mt-16" : ""}>
                  <div className="overflow-hidden rounded-[4px] border border-ivory/15">
                    <Image src={a.img} alt={`${a.t}: ${a.d}`} width={1800} height={1125} sizes="(min-width: 1024px) 25vw, 50vw" className="h-auto w-full" />
                  </div>
                  <p className="eyebrow mt-5 text-clay-soft">{a.n}</p>
                  <h3 className="mt-2 font-display text-[1.8rem] leading-tight">{a.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-sand">{a.d}</p>
                </Reveal>
              ))}
            </ol>
            <RevealMask className="mt-16 overflow-hidden rounded-[6px] border border-ivory/15 bg-black">
              <InViewVideo src={bro.video.src} poster={bro.video.poster} label="Screen recording of the BRO.exe birthday microsite from boot to celebration" className="aspect-[16/10] w-full object-cover" />
            </RevealMask>
            <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <a href={bro.url} target="_blank" rel="noopener noreferrer" className="font-medium text-clay-soft link-rule">
                Open BRO.exe ↗
              </a>
              <Link href={`/work/${bro.slug}`} className="link-underline">
                Read how it was built →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* demo */}
        <section id="try" aria-labelledby="try-h" className="scroll-mt-20 py-24 md:py-36">
          <div className="shell">
            <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="kicker text-clay">Pick a tone</p>
                <h2 id="try-h" className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)]">
                  Same birthday, <em className="text-terracotta">seven different feelings.</em>
                </h2>
              </div>
              <p className="text-[16px] leading-relaxed text-muted md:col-span-4 md:col-start-9">
                Friendly, funny, romantic, emotional, heartfelt, playful or professional. Choose who it’s for, pick a tone, then open the card.
                Real projects are written and designed for one person.
              </p>
            </Reveal>
            <div className="mt-14 md:mt-20">
              <ToneDemo />
            </div>
          </div>
        </section>

        {/* features + audiences */}
        <section aria-labelledby="feat-h" className="border-t border-line py-24 md:py-36">
          <div className="shell">
            <Reveal className="max-w-3xl">
              <p className="kicker text-muted">What can go in it</p>
              <h2 id="feat-h" className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)]">
                Less card. <em className="text-terracotta">More moment.</em>
              </h2>
            </Reveal>
            <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={(i % 4) * 0.05} className="border-r border-b border-line p-7 transition-colors duration-500 hover:bg-ivory-2">
                  <h3 className="font-display text-[1.6rem] leading-tight">{t}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{d}</p>
                </Reveal>
              ))}
            </ul>
            <div className="mt-20 grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
              {audiences.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.06} className="border-t border-charcoal pt-6">
                  <h3 className="eyebrow text-clay">For {t.toLowerCase()}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* packages */}
        <section id="packages" aria-labelledby="pk-h" className="scroll-mt-20 bg-sand py-24 md:py-36">
          <div className="shell">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="kicker text-charcoal/80">Packages</p>
                <h2 id="pk-h" className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)]">
                  Small gesture or <em>grand surprise.</em>
                </h2>
              </div>
              <p className="max-w-[40ch] text-[15.5px] text-charcoal/80">Tell us who it’s for and when. We’ll send ideas and a fixed quote.</p>
            </Reveal>
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {packages.map((p, i) => (
                <Reveal
                  key={p.name}
                  delay={i * 0.08}
                  className={`flex flex-col rounded-[6px] p-8 md:p-10 ${p.featured ? "on-forest bg-forest text-ivory lg:-mt-8 lg:mb-8" : "bg-ivory"}`}
                >
                  <h3 className="headline text-[2.8rem]">{p.name}</h3>
                  <p className={`mt-4 text-[15px] leading-relaxed ${p.featured ? "text-sand" : "text-muted"}`}>{p.desc}</p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[14.5px]">
                        <span aria-hidden className="mt-[10px] h-px w-4 shrink-0 bg-terracotta" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-9 flex items-center justify-between border-t pt-5 ${p.featured ? "border-ivory/20" : "border-line"}`}>
                    <span className="font-display text-[1.3rem] italic">Custom quote</span>
                    <Link href="#enquire" className="text-[14px] font-medium link-rule" aria-label={`Enquire about the ${p.name} package`}>
                      Enquire →
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* enquire */}
        <section id="enquire" aria-labelledby="enq-h" className="on-forest relative scroll-mt-20 bg-forest py-24 text-ivory md:py-36 grain">
          <div className="shell relative grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="kicker text-clay-soft">Enquire</p>
              <h2 id="enq-h" className="headline mt-5 text-[clamp(2.8rem,6vw,5.6rem)]">
                Whose birthday <em>is it?</em>
              </h2>
              <p className="mt-6 max-w-[40ch] text-[16.5px] leading-relaxed text-sand">
                Tell us a little about them and the date. The more lead time, the more surprises we can build in.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
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
