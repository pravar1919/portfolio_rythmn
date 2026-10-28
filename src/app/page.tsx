import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HeroPulse } from "@/components/HeroPulse";
import { Reveal } from "@/components/Reveal";
import { Fade, WordRise } from "@/components/Intro";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { lab, projectBySlug, projects } from "@/content/projects";
import { engagements, process, services } from "@/content/services";
import { site } from "@/content/site";

const featured = ["thaper-dental", "nutrition-simplified", "rythmnai-social", "astro"].map((s) => projectBySlug[s]);

export default function Home() {
  return (
    <>
      <Nav tone="dark" />
      <main id="main">
        <Hero />
        <Proof />
        <Work />
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
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white grain">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_70%_20%,rgb(11_111_232/0.16),transparent_60%)]" />
      <div className="shell flex flex-1 flex-col justify-center pt-28 pb-[16vh] md:pt-32">
        <Fade>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-white/55">
            <span className="text-amber">Software studio</span>
            <span aria-hidden>/</span>
            <span>SaaS · AI · Cloud</span>
            <span aria-hidden>/</span>
            <span>Alwar, India — working worldwide</span>
          </p>
        </Fade>
        <h1 className="headline mt-7 max-w-[15ch] text-[clamp(3.1rem,8.6vw,8.4rem)]">
          <WordRise text="The engineering partner for teams who need it" delay={0.05} />{" "}
          <WordRise text="shipped." className="text-amber italic" delay={0.45} />
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Fade d={0.2}>
            <p className="max-w-[54ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-white/70">
              Rythmn AI designs, builds and runs SaaS products, AI features and cloud infrastructure for startup founders and
              software agencies — Python, Django, FastAPI and React, from the first commit to production. Hire us for a
              fixed-scope build, a dedicated team, or quietly under your agency’s brand.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-amber">
                Start a project <span aria-hidden>→</span>
              </Link>
              <Link href="#work" className="btn-ghost-dark">
                See live work
              </Link>
            </div>
          </Fade>
          <Fade d={0.35}>
            <LiveList />
          </Fade>
        </div>
      </div>
      <HeroPulse className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[22vh] min-h-28 w-full" />
    </section>
  );
}

function LiveList() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm lg:w-[340px]">
      <p className="eyebrow text-white/45">Running in production now</p>
      <ul className="mt-4 space-y-2.5">
        {projects.map((p) => (
          <li key={p.slug}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 font-mono text-[13px] text-white/75 hover:text-white"
            >
              <span className="flex items-center gap-2.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {p.url.replace("https://", "")}
              </span>
              <span aria-hidden className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-amber">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Proof() {
  const facts = [
    { k: String(projects.length), v: "products live on their own domains, linked on this page — open any of them" },
    { k: "100", v: "Lighthouse desktop score on thaperdental.com, enforced in CI on every change" },
    { k: "3", v: "platforms — web, iOS and Android — with full parity for Nutrition Simplified’s client app" },
  ];
  return (
    <section aria-labelledby="proof-h" className="border-b border-line">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-muted">How we work</p>
          <h2 id="proof-h" className="headline mt-5 text-[clamp(2.4rem,4.4vw,4rem)]">
            We write the code, ship it, <em className="text-amber-deep">and stay</em> to keep it running.
          </h2>
        </Reveal>
        <div className="lg:col-span-7 lg:pt-3">
          <Reveal delay={0.1}>
            <p className="max-w-[58ch] text-[18px] leading-relaxed text-muted">
              No slideware and no hand-offs to a subcontractor. Every project below was built and deployed by us — and the
              client platforms still run on infrastructure we operate. That’s the evidence we’d rather show you than describe.
            </p>
          </Reveal>
          <dl className="mt-12 grid gap-8 sm:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={f.k + i} delay={0.15 + i * 0.08}>
                <dt className="headline text-[clamp(3.2rem,5vw,4.5rem)] text-ink">{f.k}</dt>
                <dd className="mt-3 border-t border-line pt-3 text-[14px] leading-snug text-muted">{f.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="relative scroll-mt-16 bg-night py-24 text-white md:py-36 grain">
      <div className="shell">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-amber">Selected work</p>
            <h2 id="work-h" className="headline mt-5 max-w-[16ch] text-[clamp(2.6rem,5.4vw,5rem)]">
              Live, linked, and in daily use.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[15px] text-white/55">
            On desktop, hover a project to watch an unedited recording of the live site. Every link opens the real thing.
          </p>
        </Reveal>
        <div className="mt-20 space-y-28 md:space-y-40">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>

        <div className="mt-32 border-t border-white/10 pt-16">
          <Reveal className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-white/45">From the workbench</p>
              <h3 className="headline mt-4 text-[clamp(2rem,3vw,2.75rem)]">More we’ve built.</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-white/55 md:col-span-6 md:col-start-7">
              Platforms in development, private client builds and internal tools. They aren’t publicly linkable yet — we’re happy
              to walk you through any of them on a call.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {lab.map((l, i) => (
              <Reveal as="li" key={l.name} delay={i * 0.05} className="group bg-night p-7 transition-colors hover:bg-ink-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[18px] font-medium">{l.name}</h4>
                  <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white/55 uppercase">
                    {l.status}
                  </span>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-white/70">{l.what}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/45">{l.proof}</p>
                <p className="mt-5 font-mono text-[11px] text-amber/80">{l.stack.join(" · ")}</p>
              </Reveal>
            ))}
            <li className="flex flex-col justify-between bg-amber p-7 text-ink">
              <p className="headline text-[1.9rem] leading-tight">Want the walkthrough?</p>
              <Link href="#contact" className="mt-6 inline-flex items-center gap-2 font-medium link-underline">
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
    <section id="services" aria-labelledby="services-h" className="scroll-mt-16 py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-muted">Services</p>
          <h2 id="services-h" className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)]">
            Outcomes first. <em className="text-amber-deep">Then</em> the stack.
          </h2>
        </Reveal>
        <ol className="mt-16 border-t border-ink">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.04} className="group grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8">
              <span className="font-mono text-[12px] text-muted md:col-span-1 md:pt-2">0{i + 1}</span>
              <h3 className="headline text-[clamp(1.9rem,2.8vw,2.6rem)] transition-colors group-hover:text-amber-deep md:col-span-4">
                {s.name}
              </h3>
              <div className="md:col-span-7">
                <p className="text-[18px] leading-relaxed">{s.outcome}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-muted">
                      {pt}
                    </li>
                  ))}
                </ul>
                {s.evidence.length > 0 && (
                  <p className="mt-5 text-[13px] text-muted">
                    <span className="eyebrow mr-2 text-ink/50">See it in</span>
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
    <section id="partner" aria-labelledby="partner-h" className="scroll-mt-16 bg-paper-2 py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-muted">For startups & agencies</p>
            <h2 id="partner-h" className="headline mt-5 text-[clamp(2.6rem,5vw,4.6rem)]">
              Your extra engineering team — <em className="text-amber-deep">under your name</em> if you like.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-[17px] leading-relaxed text-muted lg:col-span-5 lg:col-start-8 lg:pt-4">
            <p>
              <strong className="font-medium text-ink">Founders</strong> get a team that can take an idea to a production SaaS —
              auth, billing, admin, AI features and infrastructure — and explain every trade-off in plain language.
            </p>
            <p>
              <strong className="font-medium text-ink">Agencies</strong> get white-label capacity: we join your repos, your tools
              and, when you want, your client calls, so you can take on the Django, FastAPI, React or AI work you’d otherwise turn
              down.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.08} className={`flex flex-col rounded-3xl p-8 ${i === 1 ? "bg-ink text-white" : "bg-paper"}`}>
              <p className={`eyebrow ${i === 1 ? "text-amber" : "text-muted"}`}>{e.tag}</p>
              <h3 className="headline mt-4 text-[2.4rem]">{e.name}</h3>
              <p className={`mt-3 text-[15px] leading-relaxed ${i === 1 ? "text-white/65" : "text-muted"}`}>{e.desc}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {e.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[14px]">
                    <span aria-hidden className={i === 1 ? "text-amber" : "text-amber-deep"}>—</span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className={`mt-8 border-t pt-5 text-[13px] ${i === 1 ? "border-white/15 text-white/55" : "border-line text-muted"}`}>{e.price}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <p className="eyebrow text-muted">What working with us looks like</p>
          </Reveal>
          <ol className="mt-8 grid gap-8 md:grid-cols-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.08} className="relative border-t border-ink pt-6">
                <span className="font-mono text-[12px] text-amber-deep">{s.n}</span>
                <h3 className="mt-3 text-[19px] font-medium">{s.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.text}</p>
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
      cls: "bg-ivory text-maroon",
      font: "font-wedding italic",
    },
    {
      href: "/birthdays",
      eyebrow: "Birthday microsites",
      title: "Wishes they’ll open twice.",
      text: "Funny, romantic or heartfelt — interactive surprises with reveals, music, photos and confetti, sent as one link.",
      img: "/work/birthday/birthday-crash5.webp",
      alt: "Gold 'you absolute LEGEND' birthday reveal from BRO.exe",
      cls: "bg-[#0d0b07] text-[#f1dfb4]",
      font: "font-display italic",
    },
  ];
  return (
    <section id="celebrations" aria-labelledby="cel-h" className="scroll-mt-16 py-24 md:py-36">
      <div className="shell">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted">Also from the studio</p>
            <h2 id="cel-h" className="headline mt-5 text-[clamp(2.4rem,4.6vw,4.2rem)]">
              Personal digital experiences, built with the same care.
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-muted md:col-span-4 md:col-start-9">
            The engineering that runs a SaaS also makes a wedding invitation load fast on a guest’s phone over patchy mobile data — and
            look like nobody else’s.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.1}>
              <Link href={c.href} className={`group relative block overflow-hidden rounded-[28px] ${c.cls}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-7 md:p-9">
                  <p className="eyebrow opacity-70">{c.eyebrow}</p>
                  <h3 className={`mt-3 text-[clamp(2rem,3.2vw,2.8rem)] leading-tight ${c.font}`}>{c.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed opacity-75">{c.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium">
                    Explore packages <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section aria-labelledby="about-h" className="border-t border-line py-24 md:py-32">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-muted">The company</p>
          <h2 id="about-h" className="headline mt-5 text-[clamp(2.2rem,3.6vw,3.2rem)]">
            Rythmn AI
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-[18px] leading-relaxed text-muted lg:col-span-7 lg:col-start-6">
          <p>
            <span className="text-ink">{site.legalName}</span> is a software company in Alwar, Rajasthan. We build for clinics,
            practices, retailers, institutions and founders — and we build our own products, which keeps us honest about what it
            takes to run software after launch.
          </p>
          <p>
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
    <section id="contact" aria-labelledby="contact-h" className="relative scroll-mt-16 bg-night py-24 text-white md:py-36 grain">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-amber">Contact</p>
          <h2 id="contact-h" className="headline mt-5 text-[clamp(2.8rem,5.6vw,5.2rem)]">
            Tell us what you’re building.
          </h2>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-white/60">
            A few lines is enough. We’ll come back with questions, a rough approach, and a time for a free scoping call.
          </p>
          <a href={`mailto:${site.email}`} className="mt-10 inline-block font-display text-[clamp(1.8rem,3vw,2.6rem)] text-white link-underline">
            {site.email}
          </a>
          <p className="mt-4 text-[14px] text-white/45">
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
              LinkedIn ↗
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
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
