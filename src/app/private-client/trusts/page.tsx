import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Private Trust Structuring",
  description:
    "Discretionary, determinate, asset-protection, promoter-holding, charitable and ESOP trust structures — partner-reviewed, audit-ready, FEMA / PMLA / SEBI compliant.",
};

export default function Page() {
  return (
    <>
      <PageHero
        photoKey="trustsBand"
        eyebrow="Private Client · Trusts"
        title={
          <>
            Trust structures
            <br />
            <span className="text-bronze italic">from first principles.</span>
          </>
        }
        description="The right trust is the one that achieves your family's vision in the simplest form. We architect, draft and administer trust structures across the full spectrum — from discretionary family trusts to listed-promoter holding trusts and employee-benefit vehicles."
      />
      <WhyTrusts />
      <PrivateClients />
      <CorporateClients />
      <Structuring />
      <Compliance />
      <CtaBand />
    </>
  );
}

function WhyTrusts() {
  const reasons = [
    {
      title: "Multi-generational duty",
      body: "Examining tax, commercial and regulatory implications upfront — to preserve and protect transferred assets across generations.",
    },
    {
      title: "Asset protection",
      body: "Separate structures designed to shield family assets from unforeseen liabilities, creditor claims and litigation risk.",
    },
    {
      title: "Consolidated wealth",
      body: "Strategies that elevate beyond a single business — treating the original company as part, not the entirety, of the family's wealth.",
    },
    {
      title: "Holistic legacy",
      body: "Process-driven succession planning anchored to family values and long-term legacy preservation.",
    },
    {
      title: "Globally mobile",
      body: "Multi-jurisdictional planning and cross-border governance for families with members in the US, UK, Gulf and Singapore.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">What Modern Families Seek</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Why trust structures —
            <span className="italic text-bronze"> and why now.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-12 gap-px bg-line">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`bg-ivory p-8 md:p-10 ${
                i < 3 ? "md:col-span-4" : "md:col-span-6"
              }`}
            >
              <div className="font-display text-bronze text-3xl">0{i + 1}</div>
              <h3 className="mt-4 font-display text-2xl text-ink">{r.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PrivateClients() {
  const trusts = [
    {
      title: "Discretionary Family Trust",
      body: "Irrevocable trust with trustee discretion over distributions to a class of beneficiaries — flexibility through changing family circumstances, guided by a Letter of Wishes.",
      use: "UHNI families seeking flexibility, asset protection and multi-generational governance.",
    },
    {
      title: "Determinate / Specific Trust",
      body: "Fixed entitlements to named beneficiaries in defined proportions — clarity and predictability where flexibility is not required.",
      use: "Where beneficiaries' entitlements are settled and unlikely to need adjustment.",
    },
    {
      title: "Asset Protection Trust",
      body: "Ring-fencing structure to shield assets from creditor claims, litigation risk and exposure from operating businesses or professional liabilities.",
      use: "Promoters expanding into new industries, professionals with personal-liability exposure.",
    },
    {
      title: "Charitable & Philanthropy Trust",
      body: "Structured giving vehicle for sustained, governed philanthropy — with documented charitable objects, trustee oversight and tax-efficient operations.",
      use: "Families with ongoing philanthropic intent and CSR or institutional giving objectives.",
    },
    {
      title: "Trust for Specially Abled",
      body: "Dedicated structure designed for the long-term care and financial provision of a specially-abled family member — secure, governed, and continuing beyond the wealth creator's lifetime.",
      use: "Families with a specially-abled child or dependent.",
    },
    {
      title: "Letters of Wishes",
      body: "Non-binding guidance from the settlor to the trustee — preserving flexibility while communicating intent. The cornerstone of discretionary trust drafting.",
      use: "Accompanies every discretionary trust.",
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Private Clients</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            For families, founders
            <span className="italic text-bronze"> and individuals.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {trusts.map((t) => (
            <div key={t.title} className="bg-ivory border border-line p-8">
              <h3 className="font-display text-2xl text-ink">{t.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{t.body}</p>
              <div className="mt-5 pt-4 border-t border-line">
                <div className="text-xs uppercase tracking-[0.15em] text-bronze">
                  Typical use
                </div>
                <div className="mt-2 text-sm text-ink/85">{t.use}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CorporateClients() {
  const items = [
    {
      title: "Promoter Holding Trust — Listed",
      body: "Holding vehicle for promoter shareholding in listed companies — supporting takeover-code disclosures, succession of control and family alignment around listed wealth.",
    },
    {
      title: "Promoter Holding Trust — Unlisted",
      body: "Long-term holding structure for closely held businesses — separating governance, ownership and economic interest across the promoter family.",
    },
    {
      title: "Pre-IPO Trust Structures",
      body: "Pre-listing structuring of promoter and family shareholdings to optimise for SEBI takeover code, listing-date lock-ins and post-IPO succession.",
    },
    {
      title: "Employee Benefit & ESOP Trust",
      body: "ESOP, RSU and SAR administration trusts — including grant administration, vesting tracking, secondary-sale management and statutory compliance.",
    },
    {
      title: "Private Trust Company (PTC)",
      body: "A bespoke corporate trustee owned and governed by the family — combining institutional governance with family control. Suited to the largest, most complex mandates.",
    },
    {
      title: "Family Constitution",
      body: "The governance overlay that sits above the trust structures — defining how family members make decisions, resolve disputes and steward shared assets.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Corporate & Promoter Clients</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            For promoter groups
            <span className="italic text-bronze"> and corporate sponsors.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
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

function Structuring() {
  const flow = [
    {
      n: "01",
      title: "Settlor decision",
      body: "Choice of irrevocable vs revocable, discretionary vs determinate, single vs multi-trust architecture. The most consequential decision in the structure.",
    },
    {
      n: "02",
      title: "Trustee architecture",
      body: "CAWT as professional trustee, family member co-trustee, Private Trust Company, or a hybrid — calibrated to control, continuity and independence.",
    },
    {
      n: "03",
      title: "Beneficiary class",
      body: "Defined class and contingent beneficiaries. Cross-border considerations where children or grandchildren are non-residents.",
    },
    {
      n: "04",
      title: "Trust deed drafting",
      body: "Bespoke deed, partner-reviewed. Letter of Wishes drafted in parallel. Schedule of assets prepared with custodian and bank confirmation.",
    },
    {
      n: "05",
      title: "Settlement & stamp duty",
      body: "Execution, stamping and registration as applicable. PAN, bank accounts, demat — all opened in trust name with audit-ready documentation.",
    },
    {
      n: "06",
      title: "Ongoing trusteeship",
      body: "Annual accounts, distribution decisions, tax filings, compliance reporting, family meetings — continuous stewardship.",
    },
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">How We Structure</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            A six-stage process —
            <span className="italic text-bronze"> nothing skipped.</span>
          </h2>
        </div>
        <ol className="grid md:grid-cols-2 gap-px bg-ivory/15">
          {flow.map((f) => (
            <li key={f.n} className="bg-ink p-8 md:p-10">
              <div className="font-display text-bronze text-3xl">{f.n}</div>
              <h3 className="mt-4 font-display text-xl text-ivory">{f.title}</h3>
              <p className="mt-3 text-sm text-ivory/70 leading-relaxed">{f.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function Compliance() {
  const items = [
    "Indian Trusts Act, 1882",
    "Income-tax Act, 1961",
    "FEMA, 1999",
    "Prevention of Money-Laundering Act, 2002",
    "SEBI Takeover Regulations (where applicable)",
    "Companies Act, 2013 (for PTC structures)",
    "GST law (for service-based trust operations)",
    "FATCA & CRS reporting where beneficiaries are non-residents",
  ];
  return (
    <Section tone="ivory">
      <Container width="default">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">Compliance-First</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              Audit-ready
              <span className="italic text-bronze"> from day one.</span>
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Every trust we structure is built to withstand regulatory and
              audit scrutiny. We do not paper over risk.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-ink">
              {items.map((c) => (
                <li key={c} className="flex gap-3 text-sm">
                  <span className="text-bronze">·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section tone="ink-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Discuss your structure</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          The right trust depends on
          <span className="italic text-bronze"> your family&apos;s vision.</span>
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
