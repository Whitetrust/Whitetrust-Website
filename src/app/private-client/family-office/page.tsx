import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { DiagramHubSpoke } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "Family Office & Governance",
  description:
    "Coordinating every dimension of family wealth — estate planning, asset protection, family governance, cross-border structures, philanthropy, compliance and trusteeship under one accountable partner.",
};

export default function Page() {
  return (
    <>
      <PageHero
        photoKey="familyOfficeBand"
        eyebrow="Private Client · Family Office"
        title={
          <>
            Every dimension of
            <br />
            <span className="text-bronze italic">family wealth.</span>
          </>
        }
        description="The CAWT Family Office Hub coordinates estate planning, asset protection, family governance, cross-border structures, philanthropy, compliance and trusteeship — under one roof, with one accountable partner across the entire wealth value chain."
      />
      <HubDiagram />
      <Governance />
      <Operations />
      <WhenItFits />
      <CtaBand />
    </>
  );
}

function HubDiagram() {
  const spokes = [
    {
      title: "Estate Planning",
      body: "Wills, trusts, Letters of Wishes, codicils, executorship.",
    },
    {
      title: "Asset Protection",
      body: "Ring-fencing structures and succession vehicles.",
    },
    {
      title: "Family Governance",
      body: "Family constitution, councils, decision-making frameworks.",
    },
    {
      title: "Cross-Border",
      body: "GIFT City, FEMA, OPI/LRS, NRI coordination, foreign-counsel liaison.",
    },
    {
      title: "Philanthropy",
      body: "Charitable trusts, CSR vehicles, family foundations.",
    },
    {
      title: "Compliance & Admin",
      body: "Trustee services, accounts, tax filings, reporting.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">The CAWT Hub</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            One platform.
            <span className="italic text-bronze"> Six coordinated practices.</span>
          </h2>
        </div>
        <div className="mb-16">
          <DiagramHubSpoke />
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-line">
          {spokes.map((s) => (
            <div key={s.title} className="bg-ivory p-8 md:p-10">
              <h3 className="font-display text-2xl text-ink">{s.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Governance() {
  const layers = [
    {
      title: "Family Constitution",
      body: "The written charter of the family — values, principles, decision-making rights, succession rules and conflict-resolution mechanics. The foundational document of the family office.",
    },
    {
      title: "Family Council",
      body: "Formal body of family members responsible for decisions on shared wealth — meeting cadence, quorum, voting and minute-keeping designed for continuity across generations.",
    },
    {
      title: "Trustee Architecture",
      body: "Professional trustee (CAWT), family co-trustee, or Private Trust Company (PTC) — calibrated to the family's control vs independence preferences.",
    },
    {
      title: "Investment Committee",
      body: "Where appropriate, a separate committee governing investment allocation across the family's wealth vehicles — supported by external advisors and CAWT secretariat.",
    },
    {
      title: "Next-Gen Education",
      body: "Structured induction of next-generation members into the family's wealth, governance and philanthropic frameworks — building stewardship capability over time.",
    },
    {
      title: "Conflict Resolution",
      body: "Pre-defined escalation and mediation pathways — designed to keep disputes inside the family and out of court.",
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Family Governance</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Frameworks that hold families together —
            <span className="italic text-bronze"> across generations.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {layers.map((l) => (
            <div key={l.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{l.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{l.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Operations() {
  const fns = [
    "Trustee services for private trusts",
    "Annual accounts & financial reporting",
    "Income-tax & TDS returns",
    "FEMA, OPI & LRS reporting",
    "FATCA & CRS where applicable",
    "Bank, broker & custodian coordination",
    "Distribution administration",
    "Legal & regulatory liaison",
    "Family meeting secretariat",
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">Operations</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
              The day-to-day work
              <span className="italic text-bronze"> we own.</span>
            </h2>
            <p className="mt-6 text-ivory/70 leading-relaxed">
              The family office is not the documents. It is the discipline of
              keeping them current, the compliance done on time, and the
              quarterly review that catches issues before they become problems.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {fns.map((f) => (
                <li key={f} className="flex gap-3 text-ivory/85">
                  <span className="text-bronze mt-1">·</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function WhenItFits() {
  const fits = [
    {
      title: "Promoter families with operating businesses",
      body: "Where business wealth needs to be governed separately from operating control — and where multi-generational continuity is a stated objective.",
    },
    {
      title: "First-generation wealth creators",
      body: "Entrepreneurs whose wealth has outpaced their existing advisor relationships — needing an integrated, partner-led platform rather than a stack of vendors.",
    },
    {
      title: "Senior executives with concentrated equity",
      body: "C-suite leaders, founders post-exit, or partners in financial services — with concentrated stock, ESOP overlays and cross-border family situations.",
    },
    {
      title: "Globally mobile Indian families",
      body: "Families with members in the US, UK, Gulf or Singapore — needing coordinated planning across jurisdictions, residency profiles and currency exposures.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Who This Is For</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Four profiles where the
            <span className="italic text-bronze"> hub model pays for itself.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {fits.map((f) => (
            <div key={f.title} className="bg-ivory-2 border border-line p-8">
              <h3 className="font-display text-2xl text-ink">{f.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{f.body}</p>
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
        <Eyebrow tone="bronze">Explore the hub</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          A founder-led conversation —
          <span className="italic text-bronze"> in confidence.</span>
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
