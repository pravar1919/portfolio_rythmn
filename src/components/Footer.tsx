import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="on-forest relative bg-charcoal text-sand">
      <div className="shell grid gap-12 pt-20 pb-14 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-6">
          <p className="kicker text-sand">Say hello</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 block font-display text-[clamp(2.1rem,5.2vw,4.6rem)] leading-[0.95] tracking-[-0.03em] text-ivory transition-colors hover:text-clay-soft"
          >
            {site.email}
          </a>
          <p className="mt-8 max-w-sm text-[14px] leading-relaxed">
            {site.legalName}
            <br />
            {site.location}
          </p>
        </div>
        <FooterCol
          className="md:col-span-2 md:col-start-7"
          title="Studio"
          links={[
            ["Work", "/#work"],
            ["Services", "/#services"],
            ["Engagement models", "/#partner"],
            ["Contact", "/#contact"],
          ]}
        />
        <FooterCol
          className="md:col-span-2"
          title="Celebrations"
          links={[
            ["Wedding websites", "/weddings"],
            ["Birthday microsites", "/birthdays"],
          ]}
        />
        <FooterCol
          className="md:col-span-2"
          title="Elsewhere"
          links={[
            ["LinkedIn", site.social.linkedin],
            ["Instagram", site.social.instagram],
            ["Facebook", site.social.facebook],
          ]}
          external
        />
      </div>
      <div className="shell">
        <div className="flex flex-col gap-3 border-t border-ivory/15 py-7 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="Rythmn AI, home" className="text-ivory">
          <Wordmark className="!text-[19px]" accent="text-clay-soft" />
        </Link>
        <p>Screens and recordings on this site are captured from the live products.</p>
        <p>© {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, external, className }: { title: string; links: [string, string][]; external?: boolean; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow text-sand/80">{title}</p>
      <ul className="mt-5 space-y-3 text-[15px] text-ivory">
        {links.map(([label, href]) => (
          <li key={href}>
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline">
                {label} <span aria-hidden className="text-sand/70">↗</span>
              </a>
            ) : (
              <Link href={href} className="link-underline">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
