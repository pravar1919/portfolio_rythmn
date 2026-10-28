import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Fraunces, Schibsted_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  axes: ["opsz"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Rythmn AI — SaaS, AI & cloud engineering for startups and agencies",
    template: "%s · Rythmn AI",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e7",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/icon-512.png`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${schibsted.variable}`}>
      <body className="min-h-dvh overflow-x-clip" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[100] rounded-br-lg bg-forest px-4 py-3 font-medium text-ivory focus:not-sr-only focus:fixed focus:top-0 focus:left-0"
        >
          Skip to content
        </a>
        <Providers>
          {/* Every route change crossfades the page; named project images morph (see globals.css). */}
          <ViewTransition default="page">{children}</ViewTransition>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
