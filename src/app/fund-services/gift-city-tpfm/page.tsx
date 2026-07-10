import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { DiagramTpfm, DiagramInbound, DiagramOutbound } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "GIFT City Third-Party Fund Management (TPFM)",
  description:
    "Launch and run IFSC schemes under CAWT's IFSCA FME registration — without standing up your own IFSC entity. Notified under IFSCA's Fund Management (Amendment) Regulations, 2025.",
};

export default function Page() {
  return (
    <>
      <PageHero
        photoKey="giftCityBand"
        eyebrow="Fund Services · TPFM"
        title={
          <>
            Third-Party Fund Management
            <br />
            <span className="text-bronze italic">on the CAWT platform.</span>
          </>
        }
        description="On 24 July 2025, IFSCA notified the Fund Management (Amendment) Regulations, 2025 — enabling FMEs to launch and manage schemes on behalf of third-party fund managers, without the external manager needing IFSC registration or physical presence."
      />
      <WhatIs />
      <TpfmDiagramBand />
      <HowItWorks />
      <Beneficiaries />
      <Structures />
      <FeeProposal />
      <Process />
      <CtaBand />
    </>
  );
}

function TpfmDiagramBand() {
  return (
    <Section tone="ivory-2">
      <Container width="default">
        <div className="text-center mb-8">
          <Eyebrow tone="bronze" className="justify-center">Platform Flow</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-ink max-w-2xl mx-auto leading-tight">
            External manager →
            <span className="italic text-bronze"> CAWT FME → live scheme.</span>
          </h2>
        </div>
        <DiagramTpfm />
      </Container>
    </Section>
  );
}

function WhatIs() {
  return (
    <Section tone="ivory">
      <Container width="default">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">What is TPFM</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              A platform play —
              <span className="italic text-bronze"> not a holding-company shell.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-charcoal leading-relaxed">
            <p>
              The TPFM framework lets external fund managers — whether based
              in Singapore, Dubai, Cayman, the UK, the US, or domestically in
              India — launch and run IFSC schemes under the registration of an
              IFSCA-licensed FME (in this case, CAWT).
            </p>
            <p>
              The external manager retains full investment-decision authority.
              CAWT provides the IFSCA-licensed platform, the regulatory
              backbone, the local infrastructure and the ongoing liability
              perimeter required by the regulator. The result: institutional
              fund operations at a fraction of the time and cost of standing
              up your own IFSC entity.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "External Fund Manager",
      body: "Regulated in home jurisdiction (Singapore MAS, DFSA, FCA, SEC, SEBI, etc.). Approaches CAWT with strategy, investor base and target markets.",
    },
    {
      n: "02",
      title: "Platform Agreement",
      body: "Due diligence on the manager per IFSCA fit-and-proper criteria. Platform Agreement executed between manager and CAWT FME.",
    },
    {
      n: "03",
      title: "Scheme Launched",
      body: "Scheme registered under CAWT's IFSCA FME licence. Each scheme is an independent AIF with assets and liabilities segregated by law.",
    },
    {
      n: "04",
      title: "Manager Runs the Book",
      body: "External manager retains full investment-decision authority. Broker-agnostic and custodian-agnostic. Segregated Principal Officer for each AIF.",
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">How It Works</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Four steps —
            <span className="italic text-bronze"> from first call to scheme launch.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-px bg-line">
          {steps.map((s) => (
            <div key={s.n} className="bg-ivory p-8 md:p-10">
              <div className="font-display text-5xl text-bronze">{s.n}</div>
              <h3 className="mt-6 font-display text-xl text-ink leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-4 gap-px bg-line border border-line">
          {[
            { l: "Scheme corpus (min)", v: "USD 3 Mn", sub: "within 12 months" },
            { l: "Scheme corpus (max)", v: "USD 50 Mn", sub: "per scheme" },
            { l: "FME net worth", v: "+USD 500K", sub: "above standard FME" },
            { l: "Regulatory liability", v: "CAWT FME", sub: "fully retained" },
          ].map((s) => (
            <div key={s.l} className="bg-ivory p-6">
              <div className="text-xs uppercase tracking-[0.15em] text-muted">
                {s.l}
              </div>
              <div className="mt-2 font-display text-2xl text-bronze">{s.v}</div>
              <div className="mt-1 text-xs text-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Beneficiaries() {
  const items = [
    {
      title: "Global Asset Managers",
      body: "International managers seeking India exposure without standing up a standalone IFSC entity — ideal if already regulated in Singapore, Dubai, Cayman, UK or US.",
    },
    {
      title: "Domestic Fund Managers",
      body: "SEBI-registered PMS or AIF managers launching USD-denominated offshore schemes with GIFT City tax advantages — without a separate FME registration.",
    },
    {
      title: "Family Offices & SFOs",
      body: "UHNI families and single family offices structuring a private investment vehicle through GIFT City, retaining full control over investment decisions.",
    },
    {
      title: "Boutique & Emerging Managers",
      body: "First-time or emerging managers leveraging GIFT City infrastructure and the CAWT platform to launch institutional-grade funds cost-effectively.",
    },
    {
      title: "NRI & Diaspora Managers",
      body: "Managers in the US, UK, Gulf or Southeast Asia running India-focused or global funds via GIFT City — using the 100% NRI contribution carve-out for FPIs (≤25% per investor).",
    },
    {
      title: "PE / VC Sponsors",
      body: "Private equity and venture capital sponsors structuring Cat I or Cat II AIFs for deal-by-deal or pooled strategies via GIFT City.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Who Benefits</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Six manager profiles —
            <span className="italic text-bronze"> one shared platform.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {items.map((i) => (
            <div key={i.title} className="bg-ivory p-8">
              <h3 className="font-display text-xl text-ink">{i.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          SEBI carve-out for FPIs: 100% aggregate NRI/OCI contribution
          permitted with safeguards (≤25% per individual NRI/OCI investor).
        </p>
      </Container>
    </Section>
  );
}

function Structures() {
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Indicative Structures</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            Inbound and outbound —
            <span className="italic text-bronze"> through one FME.</span>
          </h2>
        </div>

        <div className="space-y-12">
          <div>
            <div className="text-xs uppercase tracking-[0.15em] text-bronze mb-3">
              Inbound — Global capital → India
            </div>
            <div className="bg-ivory p-6 md:p-10">
              <DiagramInbound />
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.15em] text-bronze mb-3">
              Outbound — Indian capital → Global
            </div>
            <div className="bg-ivory p-6 md:p-10">
              <DiagramOutbound />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FeeProposal() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Indicative Fee — Cat III AIF</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Illustrative pricing —
            <span className="italic text-bronze"> per scheme.</span>
          </h2>
          <p className="mt-4 text-sm text-muted max-w-2xl">
            Indicative only. Final fee subject to scope, scheme structure and
            mutual agreement.
          </p>
        </div>
        <div className="border border-line bg-ivory">
          <Row3
            head
            a="Particulars"
            b="Amount to CAWT"
            c="Out-of-Pocket"
          />
          <Row3
            a="Upfront set-up fee"
            b="USD 25,000 (one-time)"
            c="At actuals*"
          />
          <Row3
            a="AUM fee"
            b="p.a. on AUM (negotiated)"
            c="—"
          />
          <Row3
            a="Fixed running fee"
            b="USD 23,500 p.a.**"
            c="—"
            last
          />
        </div>
        <div className="mt-6 text-xs text-muted space-y-1 leading-relaxed">
          <div>* Upfront out-of-pocket includes IFSCA fees, legal fees, CPA fees and all other set-up costs.</div>
          <div>** Fixed running fee includes annual IFSCA fee, audit fee and tax certificate cost.</div>
          <div>Principal Officer salary, brokerage, FX conversion fees, and other out-of-pocket items are billed at actuals.</div>
        </div>
      </Container>
    </Section>
  );
}

function Row3({
  a,
  b,
  c,
  head,
  last,
}: {
  a: string;
  b: string;
  c: string;
  head?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`grid md:grid-cols-3 gap-6 px-8 py-5 ${
        head ? "bg-ivory-2" : ""
      } ${!last ? "border-b border-line" : ""}`}
    >
      <div className={head ? "text-xs uppercase tracking-[0.15em] text-muted" : "font-display text-lg text-ink"}>
        {a}
      </div>
      <div className={head ? "text-xs uppercase tracking-[0.15em] text-bronze" : "text-sm text-ink/85"}>
        {b}
      </div>
      <div className={head ? "text-xs uppercase tracking-[0.15em] text-muted" : "text-sm text-muted"}>
        {c}
      </div>
    </div>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Initial Conversation",
      body: "Share your strategy, investor base and target markets. We assess fit and advise on the optimal IFSCA structure.",
    },
    {
      n: "02",
      title: "Due Diligence",
      body: "Eligibility assessment of the external manager per IFSCA's fit-and-proper criteria.",
    },
    {
      n: "03",
      title: "Scheme Structuring",
      body: "Drafting of PPM, scheme documents and investor agreements — with your legal advisors.",
    },
    {
      n: "04",
      title: "IFSCA Filing",
      body: "CAWT files the scheme application with IFSCA and manages the regulatory approval process.",
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
        <div className="mb-12">
          <Eyebrow tone="bronze">Path to Launch</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            From first call —
            <span className="italic text-bronze"> to first close.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-px bg-line">
          {steps.map((s) => (
            <div key={s.n} className="bg-ivory p-6 md:p-8">
              <div className="font-display text-3xl text-bronze">{s.n}</div>
              <h3 className="mt-4 font-display text-lg text-ink leading-snug">
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

function CtaBand() {
  return (
    <Section tone="ink-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Discuss your scheme</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          Launch on the
          <span className="italic text-bronze"> CAWT TPFM platform.</span>
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
