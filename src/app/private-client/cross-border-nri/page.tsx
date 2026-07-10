import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { WorldMap } from "@/components/world-map";
import { DiagramTwoPillar } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "Cross-Border & NRI Advisory",
  description:
    "Multi-jurisdictional estate, trust and wealth structuring for globally mobile Indian families — across the US, UK, Gulf and Singapore. Fully FEMA / OPI / LRS compliant.",
};

export default function Page() {
  return (
    <>
      <PageHero
        photoKey="crossBorderBand"
        eyebrow="Private Client · Cross-Border / NRI"
        title={
          <>
            For globally mobile
            <br />
            <span className="text-bronze italic">Indian families.</span>
          </>
        }
        description="One in four Indian UHNI families now has a member studying, working or settled abroad. CAWT specialises in the cross-border structuring that holds these families' wealth together — across residency status, currency, tax and jurisdiction."
      />
      <MapBand />
      <Realities />
      <ServicesGrid />
      <RouteMap />
      <CaseStudy />
      <Compliance />
      <CtaBand />
    </>
  );
}

function MapBand() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="text-center mb-8">
          <Eyebrow tone="bronze" className="justify-center">Diaspora Corridor</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-ink max-w-3xl mx-auto leading-tight">
            Mumbai &amp; GIFT City —
            <span className="italic text-bronze"> connecting four diaspora clusters.</span>
          </h2>
        </div>
        <WorldMap />
      </Container>
    </Section>
  );
}

function Realities() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">The Reality</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              Families are
              <span className="italic text-bronze"> already global.</span>
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-12 text-muted leading-relaxed">
            Children studying or settled abroad. Investments in offshore funds.
            Real estate across two or three countries. The planning has to be
            global from day one — not retrofitted later.
          </p>
        </div>
        <div className="grid sm:grid-cols-4 gap-px bg-line border border-line">
          {[
            { v: "US", l: "California, NY/NJ, Texas hubs" },
            { v: "UK", l: "London, Birmingham, Manchester" },
            { v: "Gulf", l: "Dubai, Abu Dhabi, Doha, Riyadh" },
            { v: "Singapore", l: "Permanent residents, Employment Pass holders" },
          ].map((s) => (
            <div key={s.v} className="bg-ivory p-8">
              <div className="font-display text-4xl text-bronze">{s.v}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ServicesGrid() {
  const items = [
    {
      title: "Cross-border trust structuring",
      body: "Trusts settled by resident Indians with NR beneficiaries — drafted to satisfy FEMA, OPI and source-state tax rules. CAWT acts as professional trustee.",
    },
    {
      title: "GIFT City family vehicles",
      body: "IFSCA-compliant family investment funds and family trusts using the GIFT City framework — USD-denominated, with full repatriation and a competitive tax regime.",
    },
    {
      title: "FEMA / OPI / LRS planning",
      body: "Inbound and outbound investment structuring within India's foreign-exchange framework — for residents holding overseas assets and NRIs investing in India.",
    },
    {
      title: "Tax-aligned cross-border vehicles",
      body: "Coordinated structuring with US, UK, UAE or Singapore counsel — addressing PFIC, throwback rules, residency-trigger thresholds and treaty positions.",
    },
    {
      title: "Wills across jurisdictions",
      body: "Coordinated wills for assets in India and abroad — avoiding accidental revocation, forced-heirship surprises and probate delay.",
    },
    {
      title: "Contingency citizenship & residency",
      body: "Reviewing options for second residency or citizenship as part of the family's risk and mobility planning. Coordination with specialist providers.",
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">What We Deliver</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Cross-border services —
            <span className="italic text-bronze"> end-to-end.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {items.map((i) => (
            <div key={i.title} className="bg-ivory p-8">
              <h3 className="font-display text-xl text-ink leading-snug">
                {i.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function RouteMap() {
  const routes = [
    {
      title: "Inbound",
      sub: "Global capital into India",
      body: "FPI, AIF or FDI routes — including GIFT IFSC AIFs for global investors. Each AIF registered as a segregated Category I FPI in India where the FPI route applies.",
    },
    {
      title: "Outbound",
      sub: "Indian capital deployed globally",
      body: "OPI and LRS routes for resident Indian investors deploying into global funds — including GIFT IFSC AIFs structured for outbound exposure.",
    },
    {
      title: "Inheritance & gifting",
      sub: "Between residents and non-residents",
      body: "Cross-border bequests and lifetime gifts structured within FEMA's resident/non-resident framework — coordinated with source-state tax counsel.",
    },
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Routes & Structures</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            Three flows —
            <span className="italic text-bronze"> mapped to the regulator.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {routes.map((r) => (
            <div key={r.title} className="bg-ink-2 border border-ivory/10 p-8">
              <div className="font-display text-3xl text-bronze">{r.title}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.15em] text-ivory/60">
                {r.sub}
              </div>
              <p className="mt-4 text-sm text-ivory/75 leading-relaxed">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CaseStudy() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">Case Study</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              Global Citizens —
              <span className="italic text-bronze"> a three-country family.</span>
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Mr. A, 55, resident Indian, with three children settled outside
              India — one in the UK, two in the US. Material assets across
              real estate, financial assets, cash and Investment-Co shares.
            </p>
          </div>
          <div className="md:col-span-7 bg-ivory-2 border border-line p-10">
            <Eyebrow tone="bronze">The Two-Pillar Solution</Eyebrow>
            <div className="mt-6 space-y-6">
              <div>
                <div className="font-display text-xl text-ink">
                  Pillar 1 — Family Trust
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Financial assets and Investment-Co shares settled into a
                  discretionary family trust for the children and grandchildren.
                  Compliant with FEMA and OPI/LRS frameworks for NRI
                  beneficiaries. CAWT as professional trustee with a defined
                  Letter of Wishes.
                </p>
              </div>
              <div className="pt-6 border-t border-line">
                <div className="font-display text-xl text-ink">
                  Pillar 2 — Will
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Real estate remains under a clearly drafted will — avoiding
                  the complications of settling immovable Indian property into
                  trust for NR beneficiaries.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-12 border-t border-line">
          <div className="text-center mb-6">
            <Eyebrow tone="bronze" className="justify-center">Structure</Eyebrow>
          </div>
          <DiagramTwoPillar />
        </div>
      </Container>
    </Section>
  );
}

function Compliance() {
  return (
    <Section tone="ivory-2">
      <Container width="default">
        <Eyebrow tone="bronze">Compliance Backbone</Eyebrow>
        <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink max-w-3xl leading-tight">
          Frameworks we work
          <span className="italic text-bronze"> within — every time.</span>
        </h2>
        <ul className="mt-10 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-ink">
          {[
            "FEMA, 1999 & RBI Master Directions",
            "OPI (Overseas Portfolio Investment) framework",
            "LRS (Liberalised Remittance Scheme)",
            "Income-tax Act — Sections 9, 5, 6 (residency, source rules)",
            "DTAA positions — US, UK, UAE, Singapore",
            "FATCA & CRS reporting",
            "PMLA & beneficial-ownership reporting",
            "IFSCA framework where GIFT City vehicles are used",
          ].map((c) => (
            <li key={c} className="flex gap-3 text-sm">
              <span className="text-bronze">·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section tone="ink-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Cross-border conversation</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          Multi-jurisdictional planning —
          <span className="italic text-bronze"> one accountable partner.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <CTA href="/contact" variant="secondary" size="lg">
            Book a 30-minute call
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
