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
import { CeremonyExplorer, InvitePreview } from "./Interactive";
import { cormorant } from "./fonts";

export const metadata: Metadata = {
  title: "Wedding websites & digital invitations",
  description:
    "Personalised wedding websites and digital invitations with illustrations of the couple, ceremony schedules for Mehendi, Haldi, Sangeet, Baraat and Reception, countdowns, venue maps, RSVPs and WhatsApp sharing.",
  alternates: { canonical: "/weddings" },
  openGraph: { title: "Wedding websites & digital invitations — Rythmn AI", images: [{ url: "/og/wedding.jpg", width: 1200, height: 630 }] },
};

const live = projectBySlug["romit-ayushi-wedding"];

const features = [
  ["Illustrations of the two of you", "Custom caricature-style art of the couple, drawn into each ceremony."],
  ["Every ceremony, in order", "Mehendi, Haldi, Sangeet, Baraat, Pheras, Reception — with times, venues and add-to-calendar."],
  ["Countdown to the muhurat", "A live countdown to the moment that matters most."],
  ["Venue maps & directions", "Embedded maps and one-tap directions, plus travel and stay notes for out-of-town guests."],
  ["Photo galleries", "Your pre-wedding shoot now, the wedding photos after."],
  ["RSVP", "Guests confirm per ceremony; you get a clean guest list to export."],
  ["Music", "Your song, playing when a guest taps — never on its own."],
  ["Made for WhatsApp", "A beautiful link preview, and a site that loads fast on any phone."],
];

const packages = [
  {
    name: "Digital invitation",
    desc: "An animated invitation that opens like a card — the one link you send instead of a PDF.",
    items: ["Names, blessings and wedding date", "Ceremony list with countdown", "Venue map and directions", "Music and a custom WhatsApp preview"],
  },
  {
    name: "Wedding website",
    desc: "The full site for guests: everything in the invitation, plus a home for every ceremony.",
    items: ["Illustrated card for each ceremony", "Add-to-calendar for every event", "Travel, stay and dress-code notes", "Photo gallery and RSVP", "Your own domain name"],
    featured: true,
  },
  {
    name: "Signature",
    desc: "Fully bespoke art direction for couples who want something no one has seen before.",
    items: ["Custom illustrations for every ceremony", "Bilingual content (English + Hindi or your language)", "Private pages for family-only details", "Updates through the wedding week", "Post-wedding photo gallery"],
  },
];

const steps = [
  ["Tell us your story", "Names, dates, ceremonies, venues and a few photos of the two of you."],
  ["Illustrations & design", "We draw the couple and design the invitation around your wedding’s colours."],
  ["Your changes", "Review it on your own phone and tell us what to change."],
  ["Share it", "It goes live on its own link or domain, ready to send on WhatsApp."],
  ["Keep it current", "Timings change. We update the site so guests always see the latest."],
];

const faqs = [
  ["Do guests need to install anything?", "No. It’s a link that opens in any phone browser — WhatsApp shows a proper preview card when you share it."],
  ["Can we change details after it goes live?", "Yes. Every detail lives in one place, so a changed time or venue is a quick update, and guests see it straight away."],
  ["Can family phone numbers and addresses stay private?", "Yes. We can keep personal details off public pages, or put them behind a family-only page."],
  ["Can it be in Hindi or another language?", "Yes — bilingual invitations are part of the Signature package, and available on the others on request."],
  ["What happens after the wedding?", "The site can stay up as a keepsake, with your wedding photos added to the gallery."],
];

export default function Weddings() {
  return (
    <>
      <Nav />
      <main id="main" className={`${cormorant.variable} text-charcoal`}>
        {/* hero */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
          <Image src="/weddings/flora-tl.webp" alt="" width={420} height={338} sizes="320px" className="pointer-events-none absolute top-14 -left-24 w-48 opacity-70 md:top-20 md:w-72" />
          <Image src="/weddings/flora-br.webp" alt="" width={420} height={314} sizes="320px" className="pointer-events-none absolute -right-16 bottom-0 w-56 opacity-70 md:w-80" />
          <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Fade>
                <p className="kicker text-clay">Rythmn AI · Wedding websites & digital invitations</p>
              </Fade>
              <Fade d={0.1}>
                <h1 className="mt-7 font-wedding text-[clamp(3.2rem,7.2vw,6.8rem)] leading-[0.94] font-medium tracking-[-0.01em] text-forest">
                  A wedding website as <em className="text-terracotta">beautiful</em> as the wedding.
                </h1>
              </Fade>
              <Fade d={0.18}>
                <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-muted">
                  Personalised invitations and wedding sites with the two of you illustrated in every ceremony — schedules, countdowns,
                  maps and RSVPs your guests open again and again. Designed for Indian weddings, built for phones and WhatsApp.
                </p>
              </Fade>
              <Fade d={0.26} className="mt-9 flex flex-wrap gap-3">
                <Link href="#enquire" className="btn-primary">
                  Plan your wedding website <span aria-hidden>→</span>
                </Link>
                <a href={live.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  See a live wedding site ↗
                </a>
              </Fade>
            </div>
            <Unveil d={0.2} className="relative lg:col-span-6">
              <div className="relative">
                <div className="overflow-hidden rounded-[6px] border border-line-strong shadow-[0_40px_80px_-40px_rgb(37_39_32/0.4)]">
                  <Image src="/work/wedding/wedding-hero.webp" alt={live.hero.alt} width={1800} height={1125} preload loading="eager" sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
                </div>
                <div className="absolute -bottom-10 -left-4 w-[30%] overflow-hidden rounded-[18px] border-[5px] border-ivory shadow-[0_30px_50px_-28px_rgb(37_39_32/0.55)] sm:-left-10">
                  <Image src="/work/wedding/wedding-mobile-intro.webp" alt={live.mobile.alt} width={780} height={1688} sizes="200px" className="h-auto w-full" />
                </div>
              </div>
            </Unveil>
          </div>
        </section>

        {/* live project */}
        <section aria-labelledby="live-h" className="border-y border-line bg-sand-2 py-20 md:py-28">
          <div className="shell">
            <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="kicker text-clay">Live wedding · Alwar, November 2026</p>
                <h2 id="live-h" className="mt-4 font-wedding text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.95] font-medium text-forest">
                  Romit & Ayushi <span className="text-clay italic">#ROHI</span>
                </h2>
              </div>
              <p className="text-[16px] leading-relaxed text-muted md:col-span-5">
                Two days, seven ceremonies, one resort in the Aravalli hills. The site opens on a Ganesh invocation and an invitation card,
                then walks guests through every ceremony. Family names and phone numbers are hidden in these captures.
              </p>
            </Reveal>
            <RevealMask className="mt-12 overflow-hidden rounded-[6px] border border-line-strong bg-ivory">
              <InViewVideo src={live.video.src} poster={live.video.poster} label="Screen recording of the Romit & Ayushi wedding website" className="aspect-[16/10] w-full object-cover object-top" />
            </RevealMask>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {live.shots.slice(1, 4).map((s, i) => (
                <Reveal key={s.src} delay={i * 0.08}>
                  <figure>
                    <div className="overflow-hidden rounded-[4px] border border-line-strong">
                      <Image src={s.src} alt={s.alt} width={1800} height={1125} sizes="(min-width: 768px) 33vw, 100vw" className="h-auto w-full" />
                    </div>
                    <figcaption className="mt-2 text-[13px] text-muted">{s.alt}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
              <a href={live.url} target="_blank" rel="noopener noreferrer" className="font-medium link-rule">
                Open romitayushi.in ↗
              </a>
              <Link href={`/work/${live.slug}`} className="link-underline">
                Read how it was built →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ceremonies */}
        <section aria-labelledby="cer-h" className="py-20 md:py-28">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="kicker text-clay">Made for Indian weddings</p>
              <h2 id="cer-h" className="mt-4 font-wedding text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.95] font-medium text-forest">
                Every ceremony gets its moment.
              </h2>
            </Reveal>
            <div className="mt-14">
              <CeremonyExplorer />
            </div>
          </div>
        </section>

        {/* features */}
        <section aria-labelledby="feat-h" className="on-forest relative bg-forest py-20 text-ivory md:py-28 grain">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="kicker text-clay-soft">What’s included</p>
              <h2 id="feat-h" className="mt-4 font-wedding text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.95] font-medium">
                Everything your guests ask you on WhatsApp — answered once.
              </h2>
            </Reveal>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-[6px] bg-ivory/20 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={(i % 4) * 0.05} className="bg-forest p-7">
                  <span aria-hidden className="text-clay-soft">✦</span>
                  <h3 className="mt-3 font-wedding text-[24px] leading-tight">{t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-sand">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* try it */}
        <section aria-labelledby="try-h" className="py-20 md:py-28">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="kicker text-clay">Try it</p>
              <h2 id="try-h" className="mt-4 font-wedding text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.95] font-medium text-forest">
                Put your names on it.
              </h2>
              <p className="mt-4 text-[16px] text-muted">A quick taste of the invitation card and countdown. Your real one is designed from scratch around you.</p>
            </Reveal>
            <div className="mt-12">
              <InvitePreview />
            </div>
          </div>
        </section>

        {/* packages */}
        <section id="packages" aria-labelledby="pk-h" className="scroll-mt-20 border-t border-line bg-sand-2 py-20 md:py-28">
          <div className="shell">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="kicker text-clay">Packages</p>
                <h2 id="pk-h" className="mt-4 font-wedding text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.95] font-medium text-forest">
                  Choose a starting point.
                </h2>
              </div>
              <p className="max-w-[42ch] text-[15px] text-muted">
                Every wedding is different, so every quote is too. Tell us about yours and we’ll send a fixed price.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {packages.map((p, i) => (
                <Reveal
                  key={p.name}
                  delay={i * 0.08}
                  className={`flex flex-col rounded-[6px] border p-8 ${p.featured ? "on-forest border-forest bg-forest text-ivory" : "border-line-strong bg-ivory"}`}
                >
                  <h3 className="font-wedding text-[34px] leading-none">{p.name}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${p.featured ? "text-sand" : "text-muted"}`}>{p.desc}</p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[14px]">
                        <span aria-hidden className={p.featured ? "text-clay-soft" : "text-clay"}>✦</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-8 flex items-center justify-between border-t pt-5 ${p.featured ? "border-ivory/20" : "border-line-strong"}`}>
                    <span className="font-wedding text-[20px] italic">Custom quote</span>
                    <Link href="#enquire" className="text-[14px] font-medium link-underline" aria-label={`Enquire about the ${p.name} package`}>
                      Enquire →
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* process + faq */}
        <section aria-labelledby="how-h" className="py-20 md:py-28">
          <div className="shell grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="kicker text-clay">How it works</p>
                <h2 id="how-h" className="mt-4 font-wedding text-[clamp(2.4rem,4.4vw,3.8rem)] leading-[0.95] font-medium text-forest">
                  From your story to every guest’s phone.
                </h2>
              </Reveal>
              <ol className="mt-10 space-y-6">
                {steps.map(([t, d], i) => (
                  <Reveal as="li" key={t} delay={i * 0.05} className="flex gap-5">
                    <span className="font-wedding text-[28px] leading-none text-clay italic">{i + 1}</span>
                    <div>
                      <h3 className="text-[17px] font-medium">{t}</h3>
                      <p className="mt-1 text-[14px] text-muted">{d}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="kicker text-clay">Questions couples ask</p>
              </Reveal>
              <div className="mt-6 divide-y divide-line-strong border-y border-line-strong">
                {faqs.map(([q, a]) => (
                  <details key={q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-wedding text-[22px] leading-snug">
                      {q}
                      <span aria-hidden className="text-clay transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* enquire */}
        <section id="enquire" aria-labelledby="enq-h" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-sand-2 py-20 md:py-28">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="kicker text-clay">Enquire</p>
              <h2 id="enq-h" className="mt-4 font-wedding text-[clamp(2.8rem,5.8vw,5.2rem)] leading-[0.95] font-medium text-forest">
                Tell us about your wedding.
              </h2>
              <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-muted">
                Share the basics and we’ll come back with ideas and a fixed quote. Booking early leaves the most time for illustrations.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ContactForm
                theme="ivory"
                subject="Wedding website enquiry"
                submitLabel="Send enquiry"
                fields={[
                  { name: "name", label: "Your name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "couple", label: "Couple’s names", placeholder: "e.g. Aarav & Meera" },
                  { name: "date", label: "Wedding date & city", placeholder: "e.g. 14 Feb, Udaipur" },
                  { name: "package", label: "Package", type: "select", options: [...packages.map((p) => p.name), "Not sure yet"] },
                  { name: "message", label: "Ceremonies & anything else", type: "textarea", required: true, placeholder: "Which ceremonies, roughly how many guests, any ideas or colours you love…" },
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
