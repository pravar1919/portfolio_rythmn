import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HeroPulse } from "@/components/HeroPulse";
import { Reveal, RevealMask } from "@/components/Reveal";
import { Fade, Unveil, WordRise } from "@/components/Intro";
import { ParallaxImage } from "@/components/Media";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectIndex } from "@/components/ProjectIndex";
import { ContactForm } from "@/components/ContactForm";
import { lab, projectBySlug, projects } from "@/content/projects";
import { engagements, process, services } from "@/content/services";
import { site } from "@/content/site";

const featured = ["thaper-dental", "nutrition-simplified", "rythmnai-social", "astro"].map((s) => projectBySlug[s]);

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Proof />
        <Work />
        <Index />
        <Services />
        <Partner />
        <Celebrations />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  const thaper = projectBySlug["thaper-dental"];
  const nutrition = projectBySlug["nutrition-simplified"];
  return (
    <section aria-labelledby="hero-h" className="relative pt-28 md:pt-36">
      <div className="shell">
        <Fade>
          <div className="grid gap-3 border-b border-line pb-5 text-[12.5px] text-muted sm:grid-cols-3">
            <p className="kicker text-clay">Software studio</p>
            <p>SaaS · AI · Cloud engineering</p>
            <p className="sm:text-right">Alwar, India — working worldwide</p>
          </div>
        </Fade>
        <h1 id="hero-h" className="headline mt-10 text-[clamp(3.1rem,9.4vw,9.75rem)] md:mt-14">
          <WordRise text="The engineering partner for teams who need it" delay={0.05} />{" "}
          <WordRise text="shipped." className="text-terracotta italic" delay={0.45} />
        </h1>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Fade d={0.25} className="lg:col-span-4 lg:pt-2">
            <p className="text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-charcoal/85">
              Rythmn AI designs, builds and runs SaaS products, AI features and cloud infrastructure for startup founders and
              software agencies — Python, Django, FastAPI and React, from the first commit to production. Hire us for a
              fixed-scope build, a dedicated team, or quietly under your agency’s brand.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-primary">
                Start a project <span aria-hidden>→</span>
              </Link>
              <Link href="#work" className="btn-outline">
                See live work
              </Link>
            </div>
          </Fade>

          <div className="relative lg:col-span-7 lg:col-start-6">
            <Unveil d={0.2}>
              <ParallaxImage
                src={thaper.hero.src}
                alt={thaper.hero.alt}
                width={1800}
                height={1125}
                preload
                amount={36}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="rounded-[6px] border border-line bg-sand-2"
              />
            </Unveil>
            <Unveil d={0.55} className="absolute -bottom-12 -left-3 w-[27%] sm:-left-8 lg:-left-16">
              <div className="overflow-hidden rounded-[18px] border-[5px] border-ivory shadow-[0_30px_50px_-28px_rgb(37_39_32/0.55)]">
                <Image src={nutrition.mobile.src} alt={nutrition.mobile.alt} width={780} height={1688} sizes="200px" className="h-auto w-full" />
              </div>
            </Unveil>
            <p className="mt-4 pl-[30%] text-[12.5px] text-muted sm:pl-[26%] lg:pl-[22%]">
              <span className="font-mono">thaperdental.com</span> and the Nutrition Simplified client app — both live, both ours to run.
            </p>
          </div>
        </div>
      </div>
      <HeroPulse className="pointer-events-none mt-16 block h-20 w-full md:mt-24 md:h-24" />
    </section>
  );
}

function Proof() {
  const facts = [
    { k: String(projects.length), v: "products live on their own domains, linked on this page — open any of them" },
    { k: "100", v: "Lighthouse desktop score on thaperdental.com, enforced in CI on every change" },
    { k: "3", v: "platforms — web, iOS and Android — with full parity for Nutrition Simplified’s client app" },
  ];
  return (
    <section aria-labelledby="proof-h" className="border-y border-line">
      <div className="shell grid gap-14 py-24 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="kicker text-muted">How we work</p>
          <h2 id="proof-h" className="headline mt-6 text-[clamp(2.5rem,4.8vw,4.6rem)]">
            We write the code, ship it, <em className="text-terracotta">and stay</em> to keep it running.
          </h2>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          <Reveal delay={0.1}>
            <p className="text-[18px] leading-relaxed text-muted">
              No slideware and no hand-offs to a subcontractor. Every project below was built and deployed by us — and the
              client platforms still run on infrastructure we operate. That’s the evidence we’d rather show you than describe.
            </p>
          </Reveal>
        </div>
        <dl className="grid gap-10 border-t border-charcoal pt-10 sm:grid-cols-3 lg:col-span-12 lg:mt-6">
          {facts.map((f, i) => (
            <Reveal key={f.k + i} delay={0.1 + i * 0.08} className={i === 1 ? "sm:mt-12" : i === 2 ? "sm:mt-24" : ""}>
              <dt className="headline text-[clamp(4rem,8vw,7.5rem)] leading-[0.85]">{f.k}</dt>
              <dd className="mt-5 max-w-[30ch] text-[14.5px] leading-snug text-muted">{f.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="scroll-mt-16 py-24 md:py-40">
      <div className="shell">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="kicker text-clay">Selected work</p>
            <h2 id="work-h" className="headline mt-6 text-[clamp(2.8rem,6.6vw,6.6rem)]">
              Live, linked, and <em>in daily use.</em>
            </h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-muted md:col-span-4">
            On desktop, hover a project to watch an unedited recording of the live site. Every link opens the real thing.
          </p>
        </Reveal>
        <div className="mt-20 space-y-28 md:mt-28 md:space-y-44">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section aria-labelledby="index-h" className="on-forest relative bg-forest py-24 text-ivory md:py-36 grain">
      <div className="shell relative">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="kicker text-clay-soft">Running in production now</p>
            <h2 id="index-h" className="headline mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)]">
              The full index.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-sand md:col-span-4 md:col-start-9">
            Every name opens its case study; every domain opens the live product in a new tab.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <ProjectIndex projects={projects} />
        </Reveal>

        <div className="mt-28 md:mt-36">
          <Reveal className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="kicker text-sand">From the workbench</p>
              <h3 className="headline mt-5 text-[clamp(2.1rem,3.4vw,3.2rem)]">More we’ve built.</h3>
            </div>
            <p className="text-[15.5px] leading-relaxed text-sand md:col-span-5 md:col-start-8">
              Platforms in development, private client builds and internal tools. They aren’t publicly linkable yet — we’re happy
              to walk you through any of them on a call.
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 border-t border-l border-ivory/20 md:grid-cols-2 lg:grid-cols-3">
            {lab.map((l, i) => (
              <Reveal as="li" key={l.name} delay={(i % 3) * 0.06} className="min-w-0 border-r border-b border-ivory/20 p-7 transition-colors duration-500 hover:bg-forest-2 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h4 className="font-display text-[1.75rem] leading-tight">{l.name}</h4>
                  <span className="mt-1 shrink-0 rounded-full border border-ivory/30 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.12em] text-sand uppercase">
                    {l.status}
                  </span>
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ivory/90">{l.what}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-sand">{l.proof}</p>
                <p className="mt-6 font-mono text-[11.5px] text-clay-soft">{l.stack.join(" · ")}</p>
              </Reveal>
            ))}
            <li className="flex min-w-0 flex-col justify-between border-r border-b border-ivory/20 bg-clay p-7 text-ivory md:col-span-2 md:p-8">
              <p className="headline text-[2.2rem] leading-tight">Want the walkthrough?</p>
              <Link href="#contact" className="mt-8 inline-flex items-center gap-2 font-medium link-rule">
                Book a call <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" aria-labelledby="services-h" className="scroll-mt-16 py-24 md:py-40">
      <div className="shell">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="kicker text-muted">Services</p>
            <h2 id="services-h" className="headline mt-6 text-[clamp(2.8rem,6.2vw,6rem)]">
              Outcomes first. <em className="text-terracotta">Then</em> the stack.
            </h2>
          </div>
        </Reveal>
        <ol className="mt-16 border-t border-charcoal md:mt-24">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.04} className="group grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <span className="font-display text-[1.4rem] text-muted italic transition-colors duration-500 group-hover:text-terracotta md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="headline text-[clamp(2rem,3vw,2.8rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:col-span-5">
                {s.name}
              </h3>
              <div className="md:col-span-6">
                <p className="text-[18px] leading-relaxed">{s.outcome}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-muted">
                      {pt}
                    </li>
                  ))}
                </ul>
                {s.evidence.length > 0 && (
                  <p className="mt-5 text-[13.5px] text-muted">
                    <span className="eyebrow mr-2 text-charcoal">See it in</span>
                    {s.evidence.join(", ")}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Partner() {
  return (
    <section id="partner" aria-labelledby="partner-h" className="scroll-mt-16 bg-sand py-24 md:py-40">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="kicker text-charcoal/80">For startups & agencies</p>
            <h2 id="partner-h" className="headline mt-6 text-[clamp(2.6rem,5.4vw,5.2rem)]">
              Your extra engineering team — <em>under your name</em> if you like.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-[17px] leading-relaxed text-charcoal/80 lg:col-span-4 lg:col-start-9 lg:pt-20">
            <p>
              <strong className="font-semibold text-charcoal">Founders</strong> get a team that can take an idea to a production SaaS —
              auth, billing, admin, AI features and infrastructure — and explain every trade-off in plain language.
            </p>
            <p>
              <strong className="font-semibold text-charcoal">Agencies</strong> get white-label capacity: we join your repos, your tools
              and, when you want, your client calls, so you can take on the Django, FastAPI, React or AI work you’d otherwise turn
              down.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3">
          {engagements.map((e, i) => {
            const dark = i === 1;
            return (
              <Reveal
                key={e.name}
                delay={i * 0.08}
                className={`flex flex-col rounded-[6px] p-8 md:p-10 ${dark ? "on-forest bg-forest text-ivory md:-mt-8 md:mb-8" : "bg-ivory"}`}
              >
                <p className={`eyebrow ${dark ? "text-clay-soft" : "text-clay"}`}>{e.tag}</p>
                <h3 className="headline mt-5 text-[2.6rem]">{e.name}</h3>
                <p className={`mt-4 text-[15px] leading-relaxed ${dark ? "text-sand" : "text-muted"}`}>{e.desc}</p>
                <ul className="mt-7 flex-1 space-y-3">
                  {e.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[14.5px]">
                      <span aria-hidden className="mt-[10px] h-px w-4 shrink-0 bg-terracotta" />
                      {it}
                    </li>
                  ))}
                </ul>
                <p className={`mt-9 border-t pt-5 text-[13.5px] ${dark ? "border-ivory/20 text-sand" : "border-line text-muted"}`}>{e.price}</p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="kicker text-charcoal/80">What working with us looks like</p>
          </Reveal>
          <ol className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {process.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.08} className="border-t border-charcoal pt-6">
                <span className="font-display text-[2.2rem] leading-none text-clay italic">{s.n}</span>
                <h3 className="mt-4 text-[19px] font-semibold">{s.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal/80">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Celebrations() {
  const cards = [
    {
      href: "/weddings",
      eyebrow: "Wedding websites & invitations",
      title: "Every ceremony, illustrated.",
      text: "Mehendi to Reception — schedules, countdowns, maps and RSVPs, with the couple drawn into every scene.",
      img: "/work/wedding/wedding-hero.webp",
      alt: "Illustrated couple on the Romit & Ayushi wedding website",
      cls: "md:col-span-7",
    },
    {
      href: "/birthdays",
      eyebrow: "Birthday microsites",
      title: "Wishes they’ll open twice.",
      text: "Funny, romantic or heartfelt — interactive surprises with reveals, music, photos and confetti, sent as one link.",
      img: "/work/birthday/birthday-crash5.webp",
      alt: "Gold 'you absolute LEGEND' birthday reveal from BRO.exe",
      cls: "md:col-span-5 md:mt-40",
    },
  ];
  return (
    <section id="celebrations" aria-labelledby="cel-h" className="scroll-mt-16 py-24 md:py-40">
      <div className="shell">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="kicker text-muted">Also from the studio</p>
            <h2 id="cel-h" className="headline mt-6 text-[clamp(2.6rem,5.4vw,5.2rem)]">
              Personal digital experiences, <em className="text-terracotta">built with the same care.</em>
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-muted md:col-span-4">
            The engineering that runs a SaaS also makes a wedding invitation load fast on a guest’s phone over patchy mobile data — and
            look like nobody else’s.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
          {cards.map((c, i) => (
            <div key={c.href} className={c.cls}>
              <Link href={c.href} className="group block">
                <RevealMask delay={i * 0.12}>
                  <div className="overflow-hidden rounded-[6px] border border-line">
                    <ParallaxImage
                      src={c.img}
                      alt={c.alt}
                      width={1800}
                      height={1125}
                      amount={30}
                      sizes={i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                      className="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.03]"
                    />
                  </div>
                </RevealMask>
                <Reveal delay={0.1 + i * 0.12} className="mt-7 grid gap-3">
                  <p className="kicker text-clay">{c.eyebrow}</p>
                  <h3 className={`text-[clamp(2.2rem,3.4vw,3.2rem)] leading-[1.02] tracking-[-0.02em] headline ${i === 0 ? "italic" : ""}`}>
                    {c.title}
                  </h3>
                  <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-muted">{c.text}</p>
                  <span className="mt-2 inline-flex items-center gap-2 text-[14.5px] font-medium">
                    <span className="link-rule">Explore packages</span>
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                  </span>
                </Reveal>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section aria-labelledby="about-h" className="border-t border-line py-24 md:py-36">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="kicker text-muted">The company</p>
          <h2 id="about-h" className="headline mt-6 text-[clamp(2.2rem,3.4vw,3.2rem)]">
            Rythmn AI
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8 lg:col-start-5">
          <p className="font-display text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.18] tracking-[-0.015em]">
            {site.legalName} is a software company in Alwar, Rajasthan. We build for clinics, practices, retailers, institutions and
            founders — <em className="text-terracotta">and we build our own products,</em> which keeps us honest about what it takes to run
            software after launch.
          </p>
          <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-muted">
            We work remotely with teams in any time zone, over written specs, weekly demos and shared repositories. You own the code,
            the accounts and the infrastructure from day one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="on-forest relative scroll-mt-16 bg-forest py-24 text-ivory md:py-40 grain">
      <div className="shell relative grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="kicker text-clay-soft">Contact</p>
          <h2 id="contact-h" className="headline mt-6 text-[clamp(3rem,6.4vw,6.2rem)]">
            Tell us what you’re <em>building.</em>
          </h2>
          <p className="mt-7 max-w-[40ch] text-[17px] leading-relaxed text-sand">
            A few lines is enough. We’ll come back with questions, a rough approach, and a time for a free scoping call.
          </p>
          <a href={`mailto:${site.email}`} className="mt-10 inline-block font-display text-[clamp(1.7rem,2.6vw,2.4rem)] link-rule">
            {site.email}
          </a>
          <p className="mt-5 text-[14px] text-sand">
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ivory">
              LinkedIn ↗
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <ContactForm
            subject="New project enquiry"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "company", label: "Company or agency" },
              { name: "timeline", label: "Timeline", placeholder: "e.g. MVP in 3 months" },
              {
                name: "need",
                label: "What do you need?",
                type: "select",
                required: true,
                options: [
                  "SaaS or MVP build",
                  "AI / LLM / RAG feature",
                  "Python, Django, FastAPI or React development",
                  "Cloud, DevOps or modernisation",
                  "Dedicated or white-label team",
                  "Wedding website",
                  "Birthday microsite",
                  "Something else",
                ],
              },
              { name: "message", label: "Project details", type: "textarea", required: true, placeholder: "What are you building, and what does done look like?" },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
