import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Fund Administration & Compliance",
  description:
    "Investor-ready fund operations across the entire lifecycle — KYC/AML, NAV, audit, FATCA/CRS, custodian coordination and regulatory filings on the CAWT platform.",
};

export default function Page() {
  return (
    <>
      <PageHero
        photoKey="fundAdminBand"
        eyebrow="Fund Services · Administration"
        title={
          <>
            Investor-ready
            <br />
            <span className="text-bronze italic">across the lifecycle.</span>
          </>
        }
        description="A full-service fund administration platform — KYC/AML, NAV, audit, compliance and investor reporting infrastructure that meets the expectations of institutional, family-office and global investors from day one."
      />
      <Lifecycle />
      <FunctionsGrid />
      <Infrastructure />
      <ReportingCadence />
      <CtaBand />
    </>
  );
}

function Lifecycle() {
  const phases = [
    {
      n: "01",
      title: "Pre-Launch",
      body: "PPM drafting, investor agreements, scheme documents, IFSCA filings and fit-and-proper approvals.",
    },
    {
      n: "02",
      title: "Onboarding",
      body: "Investor KYC, AML screening, accredited-investor verification, subscription processing and capital-call handling.",
    },
    {
      n: "03",
      title: "Ongoing",
      body: "Fund accounting, NAV computation, investor statements, regulatory filings, FATCA/CRS, audit support.",
    },
    {
      n: "04",
      title: "Distributions",
      body: "Distribution waterfall, payment processing, tax certificates, investor communications.",
    },
    {
      n: "05",
      title: "Wind-Down",
      body: "Final NAV, residual asset disposal, final distributions, regulatory close-out and entity dissolution.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Lifecycle Coverage</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Every phase —
            <span className="italic text-bronze"> under one roof.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-px bg-line">
          {phases.map((p) => (
            <div key={p.n} className="bg-ivory p-6 md:p-8">
              <div className="font-display text-3xl text-bronze">{p.n}</div>
              <h3 className="mt-4 font-display text-lg text-ink leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FunctionsGrid() {
  const groups = [
    {
      title: "Accounting & NAV",
      items: [
        "Fund accounting in compliance with Ind-AS / IFRS",
        "NAV computation (daily, weekly or monthly cadence)",
        "Capital-call and distribution waterfall calculation",
        "Multi-currency book-keeping",
        "Equalisation and side-pocket accounting",
      ],
    },
    {
      title: "Investor Services",
      items: [
        "Investor onboarding & KYC",
        "AML and PMLA screening",
        "Subscription / redemption processing",
        "Investor statements and capital account reconciliation",
        "Investor portal access (where adopted)",
      ],
    },
    {
      title: "Compliance & Reporting",
      items: [
        "Annual & periodic IFSCA filings",
        "SEBI reporting (where SEBI AIF route used)",
        "FATCA & CRS reporting",
        "Income-tax returns and TDS",
        "FEMA and OPI/LRS filings where applicable",
      ],
    },
    {
      title: "Coordination",
      items: [
        "Custodian liaison & reconciliation",
        "Auditor coordination & support",
        "Banking and FX execution",
        "Regulator interactions",
        "Tax certificate issuance",
      ],
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Functional Coverage</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Four service blocks —
            <span className="italic text-bronze"> covering every operational need.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g) => (
            <div key={g.title} className="bg-ivory border border-line p-8 md:p-10">
              <h3 className="font-display text-2xl text-ink">{g.title}</h3>
              <ul className="mt-6 space-y-2.5 text-sm text-ink/85">
                {g.items.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="text-bronze">·</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Infrastructure() {
  const items = [
    {
      title: "KYC / AML systems",
      body: "Tooling and processes aligned to IFSCA AML/CFT framework, PMLA and PMLR requirements. Risk-based onboarding and ongoing monitoring.",
    },
    {
      title: "Valuation framework",
      body: "Independent valuation policies for listed and unlisted positions, with third-party valuer engagement where required by regulation or PPM.",
    },
    {
      title: "Audit network",
      body: "Established relationships with statutory auditors and tax auditors. Audit-ready books and clean trail across every transaction.",
    },
    {
      title: "Banking & custody",
      body: "Pre-built relationships with IFSC banking units and custodians — broker-agnostic and custodian-agnostic by design.",
    },
    {
      title: "Regulator interface",
      body: "Day-to-day engagement with IFSCA, SEZ authority and complementary regulators. Filing calendars and proactive compliance.",
    },
    {
      title: "Investor reporting",
      body: "Branded periodic reports, capital account statements, tax packages and ad-hoc investor queries handled in-house.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Infrastructure</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Investor-grade operations
            <span className="italic text-bronze"> from day one.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {items.map((i) => (
            <div key={i.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{i.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ReportingCadence() {
  const rows = [
    { who: "Investors", what: "Capital account statements", when: "Quarterly" },
    { who: "Investors", what: "NAV statement", when: "As per PPM (daily/weekly/monthly)" },
    { who: "Investors", what: "Annual report", when: "Annually" },
    { who: "IFSCA", what: "Quarterly fund report", when: "Within prescribed timelines" },
    { who: "IFSCA", what: "Annual filing", when: "Per IFSCA calendar" },
    { who: "Income-tax", what: "Returns & TDS", when: "Statutory dates" },
    { who: "FATCA / CRS", what: "Reportable account information", when: "Annually" },
    { who: "Auditor", what: "Audit trail & ledger access", when: "Continuous" },
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Reporting Cadence</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            Every report, every recipient —
            <span className="italic text-bronze"> on schedule.</span>
          </h2>
        </div>
        <div className="border border-ivory/15">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-ink-2 border-b border-ivory/15 text-xs uppercase tracking-[0.15em] text-ivory/60">
            <div className="col-span-3">Recipient</div>
            <div className="col-span-6">Report</div>
            <div className="col-span-3">Cadence</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.what}
              className={`grid grid-cols-12 gap-4 px-6 py-4 ${
                i !== rows.length - 1 ? "border-b border-ivory/10" : ""
              }`}
            >
              <div className="col-span-3 text-sm text-bronze">{r.who}</div>
              <div className="col-span-6 text-sm text-ivory">{r.what}</div>
              <div className="col-span-3 text-sm text-ivory/65">{r.when}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section tone="ivory-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Discuss your operations</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl mx-auto leading-tight">
          Outsource the operations —
          <span className="italic text-bronze"> focus on the portfolio.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <CTA href="/contact" variant="primary" size="lg">
            Speak with our team
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
