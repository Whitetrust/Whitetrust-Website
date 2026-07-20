import type { Metadata } from "next";
import { headers } from "next/headers";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConsentProvider } from "@/components/consent-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { Analytics } from "@/components/analytics";
import { PageTracker } from "@/components/page-tracker";
import { ThemeProvider, ThemeBootstrap } from "@/components/theme-provider";
import { CommandMenuProvider } from "@/components/command-menu-context";
import { CommandMenu } from "@/components/command-menu";
import { BackToTop } from "@/components/back-to-top";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { regimeForCountry } from "@/lib/consent";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.tagline}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.shortName,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/cawt-logo-blue.png", width: 1364, height: 802 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/cawt-logo-blue.png"],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/cawt-logo-blue.png`,
  description: site.description,
  email: site.contactEmail,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.registered,
    addressCountry: "IN",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const country = hdrs.get("x-vercel-ip-country");
  const regime = regimeForCountry(country);

  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <head>
        <ThemeBootstrap />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--surface)] text-[var(--on-surface)]">
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <ConsentProvider regime={regime}>
            <CommandMenuProvider>
              <SiteHeader />
              <main id="main" className="flex-1">{children}</main>
              <SiteFooter />
              <CookieBanner />
              <CommandMenu />
              <WhatsAppFloat />
              <BackToTop />
              <Analytics ga4Id={ga4Id} clarityId={clarityId} />
              <PageTracker />
            </CommandMenuProvider>
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
