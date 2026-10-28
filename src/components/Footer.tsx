import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative bg-night text-white/70 grain">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-white" aria-label="Rythmn AI, home">
            <Image src="/brand/logo-mark.png" alt="" width={39} height={32} className="h-8 w-auto" />
            <span className="text-[17px] font-semibold tracking-tight">Rythmn AI</span>
          </Link>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed">
            {site.legalName}
            <br />
            {site.location}
          </p>
          <a href={`mailto:${site.email}`} className="mt-5 inline-block font-display text-3xl text-white link-underline">
            {site.email}
          </a>
        </div>
        <FooterCol
          title="Studio"
          links={[
            ["Work", "/#work"],
            ["Services", "/#services"],
            ["Engagement models", "/#partner"],
            ["Contact", "/#contact"],
          ]}
        />
        <FooterCol
          title="Celebrations"
          links={[
            ["Wedding websites", "/weddings"],
            ["Birthday microsites", "/birthdays"],
          ]}
        />
        <FooterCol
          title="Elsewhere"
          links={[
            ["LinkedIn", site.social.linkedin],
            ["Instagram", site.social.instagram],
            ["Facebook", site.social.facebook],
          ]}
          external
        />
      </div>
      <div className="shell flex flex-col gap-2 border-t border-white/10 py-6 text-[12px] text-white/45 sm:flex-row sm:justify-between">
        <p>© {site.legalName}</p>
        <p>Screens and recordings on this site are captured from the live products.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, external }: { title: string; links: [string, string][]; external?: boolean }) {
  return (
    <div>
      <p className="eyebrow text-white/40">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[14px]">
        {links.map(([label, href]) => (
          <li key={href}>
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
                {label}
              </a>
            ) : (
              <Link href={href} className="link-underline hover:text-white">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
