import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
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
      <Nav tone="dark" />
      <Suspense fallback={<main id="main" className="min-h-[100svh] bg-night" />}>
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

  return (
    <main id="main">
        <header className="relative overflow-hidden bg-night pt-32 pb-16 text-white md:pt-40 md:pb-24 grain">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{ background: `radial-gradient(60% 70% at 85% 10%, ${p.accent}55, transparent 60%)` }}
          />
          <div className="shell relative">
            <Fade>
              <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap gap-3 text-white/50">
                <Link href="/#work" className="hover:text-white">
                  Work
                </Link>
                <span aria-hidden>/</span>
                <span className="text-amber">{p.kind}</span>
                <span aria-hidden>·</span>
                <span>{p.sector}</span>
              </nav>
            </Fade>
            <h1 className="headline mt-8 text-[clamp(3rem,8vw,7.5rem)]">
              <WordRise text={p.name} />
            </h1>
            <Fade d={0.25} className="mt-8 grid gap-8 lg:grid-cols-12">
              <p className="text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug text-white/75 lg:col-span-8">{p.title}</p>
              <div className="flex items-start gap-3 lg:col-span-4 lg:justify-end">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-amber">
                  Visit {p.url.replace("https://", "")} <span aria-hidden>↗</span>
                </a>
              </div>
            </Fade>
          </div>
        </header>

        <div className="bg-night pb-4">
          <div className="shell">
            <ParallaxImage
              src={p.hero.src}
              alt={p.hero.alt}
              width={1800}
              height={1125}
              preload
              sizes="(min-width: 1320px) 1240px, 100vw"
              className="rounded-[20px] ring-1 ring-white/10"
            />
          </div>
        </div>

        <section aria-label="Project summary" className="border-b border-line">
          <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <dl className="space-y-6 text-[14px]">
                <Meta k="Client" v={p.kind === "Our product" ? "Rythmn AI (our own product)" : p.name} />
                <Meta k="Sector" v={p.sector} />
                <Meta k="Live at" v={<a href={p.url} target="_blank" rel="noopener noreferrer" className="link-underline">{p.url.replace("https://", "")} ↗</a>} />
                <Meta k="Stack" v={p.stack.join(" · ")} />
              </dl>
            </Reveal>
            <div className="space-y-12 lg:col-span-7 lg:col-start-6">
              <Reveal>
                <h2 className="eyebrow text-muted">The challenge</h2>
                <p className="mt-4 text-[clamp(1.15rem,1.5vw,1.35rem)] leading-relaxed">{p.challenge}</p>
              </Reveal>
              <Reveal>
                <h2 className="eyebrow text-muted">What we built</h2>
                <p className="mt-4 text-[clamp(1.15rem,1.5vw,1.35rem)] leading-relaxed">{p.solution}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="outcomes-h" className="py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <h2 id="outcomes-h" className="eyebrow text-muted">
                Outcomes
              </h2>
            </Reveal>
            <ol className="mt-8 border-t border-ink">
              {p.outcomes.map((o, n) => (
                <Reveal as="li" key={o} delay={n * 0.06} className="grid gap-4 border-b border-line py-8 md:grid-cols-12">
                  <span className="font-mono text-[12px] md:col-span-1" style={{ color: p.accent }}>
                    0{n + 1}
                  </span>
                  <p className="headline text-[clamp(1.7rem,3vw,2.7rem)] leading-[1.08] md:col-span-11">{o}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="demo-h" className="relative bg-night py-20 text-white md:py-28 grain">
          <div className="shell">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-amber">Screen recording</p>
                <h2 id="demo-h" className="headline mt-4 text-[clamp(2.2rem,4vw,3.6rem)]">
                  The live site, unedited.
                </h2>
              </div>
              <p className="max-w-[40ch] text-[14px] text-white/50">
                Recorded from {p.url.replace("https://", "")} in a desktop browser{celebration ? ", with private family details hidden" : ""}.
              </p>
            </Reveal>
            <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
              <Reveal className="overflow-hidden rounded-[18px] bg-ink-2 p-2 ring-1 ring-white/10 lg:col-span-9">
                <InViewVideo
                  src={p.video.src}
                  poster={p.video.poster}
                  label={`Screen recording of ${p.name}`}
                  className="aspect-[16/10] w-full rounded-[12px] bg-night object-cover object-top"
                />
              </Reveal>
              <Reveal delay={0.15} className="mx-auto w-[min(260px,70vw)] lg:col-span-3 lg:w-full">
                <div className="overflow-hidden rounded-[34px] border-[6px] border-ink-2 bg-night shadow-2xl ring-1 ring-white/10">
                  <Image src={p.mobile.src} alt={p.mobile.alt} width={780} height={1688} sizes="260px" className="h-auto w-full" />
                </div>
                <p className="mt-3 text-center font-mono text-[11px] text-white/40">On a phone</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="gallery-h" className="py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <h2 id="gallery-h" className="eyebrow text-muted">
                Inside the product
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {p.shots.map((s, n) => (
                <Reveal key={s.src} delay={(n % 2) * 0.08} className={n === 0 && p.shots.length % 2 === 1 ? "md:col-span-2" : ""}>
                  <figure>
                    <div className="overflow-hidden rounded-[16px] ring-1 ring-line">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={1800}
                        height={1125}
                        sizes={n === 0 && p.shots.length % 2 === 1 ? "(min-width: 1320px) 1240px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                        className="h-auto w-full transition-transform duration-[1.2s] ease-out-expo hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="mt-3 text-[13px] text-muted">{s.alt}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="eng-h" className="bg-paper-2 py-20 md:py-28">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-muted">Under the hood</p>
              <h2 id="eng-h" className="headline mt-4 text-[clamp(2rem,3.4vw,3rem)]">
                Engineering decisions that matter to the business.
              </h2>
            </Reveal>
            <ul className="space-y-6 lg:col-span-7 lg:col-start-6">
              {p.engineering.map((e, n) => (
                <Reveal as="li" key={e} delay={n * 0.06} className="flex gap-5 border-t border-ink/15 pt-6 text-[17px] leading-relaxed">
                  <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full" style={{ background: p.accent }} />
                  {e}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="shell grid gap-6 md:grid-cols-2">
            <Reveal className="flex flex-col justify-between rounded-[24px] bg-ink p-8 text-white md:p-12">
              <h2 className="headline text-[clamp(2rem,3.4vw,3rem)]">
                {celebration ? "Want one for your celebration?" : "Building something like this?"}
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={celebration ? `${landing}#enquire` : "/#contact"} className="btn-amber">
                  {celebration ? "See packages & enquire" : "Start a project"} <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href={`/work/${next.slug}`} className="group block h-full overflow-hidden rounded-[24px] ring-1 ring-line">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={next.hero.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="eyebrow text-muted">Next case study</p>
                    <p className="headline mt-2 text-[1.9rem]">{next.name}</p>
                  </div>
                  <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">
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
      <dd className="mt-1.5 text-[15px]">{v}</dd>
    </div>
  );
}
