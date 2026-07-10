import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Fund Services",
  description:
    "IFSCA-licensed fund management platform at GIFT City — enabling global, domestic and family-office managers to launch and run Indian Focussed / Global Schemes via Third-Party Fund Management.",
};

const services = [
  {
    href: "/fund-services/gift-city-platform-services",
    label: "01",
    title: "GIFT City Platform Services",
    body: "India inbound and outbound fund platform support through GIFT City IFSC structures.",
    bullets: [
      "India inbound structures",
      "Outbound allocation structures",
      "FME platform support",
      "IFSCA coordination",
    ],
  },
  {
    href: "/fund-services/gift-city-fund-setup",
    label: "02",
    title: "GIFT City Fund Setup",
    body: "End-to-end setup assistance for managers launching funds through GIFT City IFSC.",
    bullets: [
      "Fund structuring",
      "PPM and documents",
      "IFSCA filing coordination",
      "First-close readiness",
    ],
  },
  {
    href: "/fund-services/global-fund-structures-solutions",
    label: "03",
    title: "Global Fund Structures & Solutions",
    body: "Coordination and structuring across global fund platforms and offshore vehicles.",
    bullets: [
      "Structure feasibility",
      "Manager coordination",
      "Investor-base assessment",
      "Cross-border interaction review",
    ],
  },
  {
    href: "/fund-services/fund-accounting-administration",
    label: "04",
    title: "Fund Accounting & Administration",
    body: "Fund accounting, NAV, investor services and compliance coordination.",
    bullets: [
      "NAV computation with audit-ready trails",
      "End-to-end investor onboarding",
      "FATCA & CRS reporting across jurisdictions",
      "Proactive regulatory filings",
    ],
  },
];

const beneficiaries = [
  {
    title: "Global Asset Managers",
    body: "International managers seeking India exposure without setting up a standalone IFSC entity — ideal if you're already regulated in Singapore, Dubai, Cayman, the UK or the US.",
  },
  {
    title: "Domestic Fund Managers",
    body: "SEBI-registered PMS or AIF managers looking to launch USD-denominated offshore schemes with GIFT City tax advantages, without a separate FME registration.",
  },
  {
    title: "Family Offices & SFOs",
    body: "UHNI families and single family offices structuring a private investment vehicle through GIFT City — retaining full control over investment decisions.",
  },
  {
    title: "Boutique & Emerging Managers",
    body: "First-time managers leveraging GIFT City infrastructure to launch institutional-grade funds cost-effectively.",
  },
  {
    title: "NRI & Diaspora Managers",
    body: "Managers in the US, UK, Gulf or Southeast Asia running India-focused or global funds — leveraging the 100% NRI contribution carve-out for FPIs.",
  },
  {
    title: "PE / VC Sponsors",
    body: "Private equity and venture capital sponsors structuring Cat I or Cat II AIFs for deal-by-deal or pooled strategies via GIFT City.",
  },
];

export default function FundServicesPage() {
  return (
    <>
      <PageHero
        photoKey="fundServicesHero"
        eyebrow="Fund Services"
        title={
          <>
            GIFT City IFSC —
            <br />
            <span className="text-bronze italic">India&apos;s global fund hub.</span>
          </>
        }
        description="On 24 July 2025 IFSCA notified the Fund Management (Amendment) Regulations enabling Third-Party Fund Management. CAWT is building an IFSCA-licensed FME platform — allowing global, domestic and family-office managers to launch and run Indian Focussed / Global Schemes without setting up their own IFSC entity."
      />
      <GiftStats />
      <TaxRegime />
      <ServicesGrid />
      <WhoBenefits />
      <Process />
      <CTABand />
    </>
  );
}

function GiftStats() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">The GIFT IFSC Ecosystem</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              Growth across FMEs, schemes
              <span className="italic text-bronze"> and commitments.</span>
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-12 text-muted leading-relaxed">
            India&apos;s first and only International Financial Services Centre,
            legally treated as non-resident territory under FEMA. Designed to
            compete with Singapore, Dubai, Mauritius and Cayman — a unified
            regulator, USD-denominated structures, and one of the most
            competitive tax frameworks in the world.
          </p>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-bronze">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-bronze" />
            As of March 2026
          </span>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">IFSCA Fund Management Snapshot</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line">
          <Stat value="217" label="Active FMEs" />
          <Stat value="360" label="Schemes notified" />
          {/* Cumulative commitments: $32.1bn is the Dec-2025 figure carried forward —
              awaiting client's official IFSCA Mar-2026 total. Investors-onboarded stat
              removed pending updated numbers (client instruction). */}
          <Stat value="$32.1bn" label="Cumulative commitments" />
        </div>
      </Container>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-ivory p-8 md:p-10">
      <div className="font-display text-4xl md:text-5xl text-bronze leading-none">
        {value}
      </div>
      <div className="mt-4 text-xs uppercase tracking-[0.15em] text-muted">
        {label}
      </div>
    </div>
  );
}

function TaxRegime() {
  const items = [
    { value: "0%", label: "Corporate Tax", sub: "Tax holiday for 20 of first 25 years (Sec. 80LA)" },
    { value: "0%", label: "GST", sub: "On services provided by FME in IFSC to IFSC-based funds" },
    { value: "0%", label: "MAT", sub: "For companies opting Sec. 115BAA" },
    { value: "0%", label: "Capital Gains Tax", sub: "On specified securities transferred on IFSC exchanges" },
    { value: "0%", label: "STT / CTT", sub: "Securities & Commodities Transaction Tax not applicable" },
    { value: "0%", label: "Stamp Duty", sub: "On specified securities transferred on IFSC exchanges" },
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Tax Regime</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            A best-in-class
            <span className="italic text-bronze"> fiscal framework.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
          {items.map((it) => (
            <div key={it.label} className="border-t border-ivory/15 pt-6">
              <div className="font-display text-5xl text-bronze leading-none">
                {it.value}
              </div>
              <div className="mt-4 font-display text-xl text-ivory">{it.label}</div>
              <div className="mt-2 text-sm text-ivory/60 leading-relaxed">
                {it.sub}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ivory/40">
          Subject to prescribed conditions. Readers should refer to relevant
          CBDT, CBIC and GST Council notifications.
        </p>
      </Container>
    </Section>
  );
}

function ServicesGrid() {
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Our Offerings</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            The CAWT platform —
            <span className="italic text-bronze"> end-to-end fund services.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-ivory border border-line p-8 hover:border-bronze transition-colors flex flex-col"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-3xl text-bronze">{s.label}</span>
                <ArrowUpRight className="h-5 w-5 text-ink/40 group-hover:text-bronze transition-colors" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{s.body}</p>
              <ul className="mt-6 space-y-2 text-sm text-ink/80 flex-1">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-bronze">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WhoBenefits() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Who Benefits</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Built for managers
            <span className="italic text-bronze"> at every scale.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {beneficiaries.map((b) => (
            <div key={b.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{b.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Initial Conversation",
      body: "Share your fund strategy, investor base and target markets. We assess fit and advise on optimal structure.",
    },
    {
      n: "02",
      title: "Due Diligence & Onboarding",
      body: "Eligibility assessment of the external manager as per IFSCA's fit-and-proper criteria.",
    },
    {
      n: "03",
      title: "Fund Structuring",
      body: "Working with your legal advisors to draft the PPM, fund documents and investor agreements.",
    },
    {
      n: "04",
      title: "IFSCA Filing",
      body: "We file the fund application with IFSCA and manage the regulatory approval process.",
    },
    {
      n: "05",
      title: "Fund Launch",
      body: "Investor onboarding, KYC completion and first close. You begin managing the portfolio.",
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Path to Launch</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            From first call to
            <span className="italic text-bronze"> first close.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-px bg-line">
          {steps.map((s) => (
            <div key={s.n} className="bg-ivory p-6 md:p-8">
              <div className="font-display text-4xl text-bronze">{s.n}</div>
              <h3 className="mt-5 font-display text-lg text-ink leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CTABand() {
  return (
    <Section tone="ink-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Start a conversation</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          Discuss your fund strategy and
          <span className="italic text-bronze"> target markets.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <CTA href="/contact" variant="secondary" size="lg">
            Speak with our team
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
