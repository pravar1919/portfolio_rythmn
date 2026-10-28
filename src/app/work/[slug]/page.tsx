import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, RevealMask } from "@/components/Reveal";
import { Fade, WordRise } from "@/components/Intro";
import { InViewVideo, ParallaxImage } from "@/components/Media";
import { projectBySlug, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug[slug];
  if (!p) return {};
  return {
    title: `${p.name} — case study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.name} — a Rythmn AI case study`, description: p.summary, images: [{ url: p.og, width: 1200, height: 630 }] },
  };
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <>
      <Nav />
      <Suspense fallback={<main id="main" className="min-h-[100svh]" />}>
        <CaseStudy params={params} />
      </Suspense>
      <Footer />
    </>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const p = projectBySlug[slug];
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const celebration = p.kind === "Celebration";
  const landing = p.slug === "bro-exe" ? "/birthdays" : "/weddings";
  const domain = p.url.replace("https://", "");

  return (
    <main id="main">
      <header className="pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="shell">
          <Fade>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line pb-5 text-[12.5px] text-muted">
              <Link href="/#work" className="kicker text-clay hover:text-charcoal">
                Work
              </Link>
              <span aria-hidden>/</span>
              <span>{p.kind}</span>
              <span aria-hidden>·</span>
              <span>{p.sector}</span>
              <span className="ml-auto hidden font-mono sm:inline">
                Case study {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </nav>
          </Fade>
          <h1 className="headline mt-10 text-[clamp(3.2rem,9vw,9rem)] md:mt-14">
            <WordRise text={p.name} />
          </h1>
          <Fade d={0.25} className="mt-10 grid gap-8 lg:grid-cols-12">
            <p className="font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.01em] text-charcoal/90 lg:col-span-7">{p.title}</p>
            <div className="flex items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary max-w-full">
                <span className="truncate">Visit {domain}</span> <span aria-hidden>↗</span>
              </a>
            </div>
          </Fade>
        </div>
      </header>

      <div className="shell">
        <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
          <div>
            <ParallaxImage
              src={p.hero.src}
              alt={p.hero.alt}
              width={1800}
              height={1125}
              preload
              amount={40}
              sizes="(min-width: 1400px) 1304px, 100vw"
              className="rounded-[6px] border border-line bg-sand-2"
            />
          </div>
        </ViewTransition>
      </div>

      <section aria-label="Project summary">
        <div className="shell grid gap-14 py-20 md:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <dl className="space-y-6 text-[14px]">
              <Meta k="Client" v={p.kind === "Our product" ? "Rythmn AI (our own product)" : p.name} />
              <Meta k="Sector" v={p.sector} />
              <Meta k="Live at" v={<a href={p.url} target="_blank" rel="noopener noreferrer" className="link-rule">{domain} ↗</a>} />
              <Meta k="Stack" v={p.stack.join(" · ")} />
            </dl>
          </Reveal>
          <div className="space-y-14 lg:col-span-8 lg:col-start-5">
            <Reveal>
              <h2 className="kicker text-clay">The challenge</h2>
              <p className="mt-5 font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.25] tracking-[-0.01em]">{p.challenge}</p>
            </Reveal>
            <Reveal>
              <h2 className="kicker text-clay">What we built</h2>
              <p className="mt-5 text-[clamp(1.08rem,1.4vw,1.25rem)] leading-relaxed text-charcoal/85">{p.solution}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="outcomes-h" className="pb-20 md:pb-32">
        <div className="shell">
          <Reveal>
            <h2 id="outcomes-h" className="kicker text-muted">
              Outcomes
            </h2>
          </Reveal>
          <ol className="mt-8 border-t border-charcoal">
            {p.outcomes.map((o, n) => (
              <Reveal as="li" key={o} delay={n * 0.06} className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:py-10">
                <span className="font-display text-[1.5rem] leading-none text-terracotta italic md:col-span-1">0{n + 1}</span>
                <p className="headline text-[clamp(1.7rem,3.2vw,3rem)] leading-[1.08] md:col-span-10">{o}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="demo-h" className="on-forest relative bg-forest py-20 text-ivory md:py-32 grain">
        <div className="shell relative">
          <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="kicker text-clay-soft">Screen recording</p>
              <h2 id="demo-h" className="headline mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">
                The live site, <em>unedited.</em>
              </h2>
            </div>
            <p className="max-w-[40ch] text-[14.5px] leading-relaxed text-sand md:col-span-4 md:col-start-9">
              Recorded from {domain} in a desktop browser{celebration ? ", with private family details hidden" : ""}.
            </p>
          </Reveal>
          <div className="mt-14 grid items-end gap-8 lg:grid-cols-12">
            <RevealMask className="lg:col-span-9">
              <InViewVideo
                src={p.video.src}
                poster={p.video.poster}
                label={`Screen recording of ${p.name}`}
                className="aspect-[16/10] w-full rounded-[6px] bg-forest-3 object-cover object-top"
              />
            </RevealMask>
            <Reveal delay={0.15} className="mx-auto w-[min(250px,68vw)] lg:col-span-3 lg:w-full">
              <div className="overflow-hidden rounded-[30px] border-[6px] border-forest-3 bg-forest-3 shadow-[0_40px_60px_-30px_rgb(0_0_0/0.6)]">
                <Image src={p.mobile.src} alt={p.mobile.alt} width={780} height={1688} sizes="260px" className="h-auto w-full" />
              </div>
              <p className="mt-4 text-center text-[12.5px] text-sand">On a phone</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-h" className="py-20 md:py-32">
        <div className="shell">
          <Reveal>
            <h2 id="gallery-h" className="kicker text-muted">
              Inside the product
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-12">
            {p.shots.map((s, n) => {
              const wide = n === 0 && p.shots.length % 2 === 1;
              // pairs alternate 7/5 and 5/7 columns, so the gallery reads as a spread rather than a grid
              const k = n - (p.shots.length % 2);
              const col = wide ? "md:col-span-12" : k % 2 === Math.floor(k / 2) % 2 ? "md:col-span-7" : "md:col-span-5 md:mt-24";
              return (
                <figure key={s.src} className={col}>
                  <RevealMask delay={(n % 2) * 0.08}>
                    <div className="overflow-hidden rounded-[6px] border border-line">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={1800}
                        height={1125}
                        sizes={wide ? "(min-width: 1400px) 1304px, 100vw" : "(min-width: 768px) 58vw, 100vw"}
                        className="h-auto w-full transition-transform duration-[1.4s] ease-out-expo hover:scale-[1.02]"
                      />
                    </div>
                  </RevealMask>
                  <figcaption className="mt-4 flex gap-3 text-[13.5px] leading-snug text-muted">
                    <span className="font-mono text-clay">{String(n + 1).padStart(2, "0")}</span>
                    {s.alt}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="eng-h" className="bg-sand py-20 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="kicker text-charcoal/80">Under the hood</p>
            <h2 id="eng-h" className="headline mt-5 text-[clamp(2.2rem,3.8vw,3.6rem)]">
              Engineering decisions that matter to the business.
            </h2>
          </Reveal>
          <ul className="lg:col-span-6 lg:col-start-7">
            {p.engineering.map((e, n) => (
              <Reveal as="li" key={e} delay={n * 0.06} className="flex gap-5 border-t border-charcoal/25 py-6 text-[17px] leading-relaxed">
                <span aria-hidden className="mt-[13px] h-px w-5 shrink-0 bg-clay" />
                {e}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="shell grid gap-4 md:grid-cols-12">
          <Reveal className="on-forest flex flex-col justify-between rounded-[6px] bg-forest p-8 text-ivory md:col-span-5 md:p-12">
            <h2 className="headline text-[clamp(2.2rem,3.6vw,3.4rem)]">
              {celebration ? "Want one for your celebration?" : "Building something like this?"}
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={celebration ? `${landing}#enquire` : "/#contact"} className="btn-primary">
                {celebration ? "See packages & enquire" : "Start a project"} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <Link href={`/work/${next.slug}`} className="group block h-full overflow-hidden rounded-[6px] border border-line">
              <div className="relative aspect-[16/8] overflow-hidden bg-sand-2">
                <Image
                  src={next.hero.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover object-top transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-6 p-6 md:p-8">
                <div>
                  <p className="kicker text-muted">Next case study</p>
                  <p className="headline mt-3 text-[clamp(1.9rem,3vw,2.6rem)]">{next.name}</p>
                </div>
                <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong text-xl transition-[transform,background-color,color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-clay group-hover:text-ivory">
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Meta({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="eyebrow text-muted">{k}</dt>
      <dd className="mt-2 text-[15px] leading-snug">{v}</dd>
    </div>
  );
}
