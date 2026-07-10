import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { DiagramHubSpoke } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "Private Client Services",
  description:
    "Family office and succession planning for promoter families, entrepreneurs and globally mobile Indian families.",
};

const services = [
  {
    href: "/private-client/wills-execution",
    label: "01",
    title: "Wills & Executorship Services",
    body: "Bespoke wills, codicils, letters of wishes and execution services.",
    bullets: ["Will Drafting", "Codicils", "Letter of Wishes", "Executorship Services"],
  },
  {
    href: "/private-client/family-trust",
    label: "02",
    title: "Family Trust",
    body: "Family trust structures for multi-generational stewardship.",
    bullets: [
      "Discretionary/Determinate Family Trust",
      "Asset Protection Trust",
      "Specific Situation Trust",
      "Professional Trustee Services",
    ],
  },
  {
    href: "/private-client/business-holding-trust",
    label: "03",
    title: "Business Holding Trusts",
    body: "Business-continuity trust structures for listed, unlisted and to be listed (pre-IPO) family entities.",
    bullets: [
      "Promoter-holding Trusts",
      "Pre-IPO Planning",
      "Trust for Unlisted Shareholding Structures",
      "Control and Voting Frameworks",
    ],
  },
  {
    href: "/private-client/family-constitution-council",
    label: "04",
    title: "Family Constitution & Council",
    body: "Governance frameworks that turn family values and decision rights into working rules.",
    bullets: ["Family Constitution", "Family Council", "Family Governance", "Family Business Board"],
  },
  {
    href: "/private-client/cross-border-structuring-solutions",
    label: "05",
    title: "Cross Border/GIFT City Structuring Solutions",
    body: "Constructing across legal, tax and cross border regulations providing practical solutions to families.",
    bullets: [
      "Externalisation Planning",
      "India Entry Planning",
      "Cross-border Trusts",
      "GIFT City Family Vehicles",
      "Coordination Across Multi Jurisdiction Council",
    ],
  },
  {
    href: "/private-client/citizenship-residency",
    label: "06",
    title: "Citizenship & Residency",
    body: "Contingency planning for families considering residence and citizenship pathways.",
    bullets: ["Residency Planning", "Immigration Planning", "Foreign Advisor Co-ordination", "Structure Impact Review"],
  },
  {
    href: "/private-client/wealth-protection-structures",
    label: "07",
    title: "Wealth Protection Structures",
    body: "Structures designed to possibly future protect family wealth from disputes, unexpected fragmentation, business risk and unplanned succession events.",
    bullets: ["Asset protection", "Ring-fencing", "Contingency planning", "Documentation review"],
  },
];

const forces = [
  {
    title: "Internationalisation",
    body: "Families increasingly span multiple jurisdictions, with members residing in different countries for education and business — making cross-border structuring essential.",
  },
  {
    title: "Reputational Risk",
    body: "Heightened regulatory scrutiny and media attention demand that family wealth structures be managed intelligently and proactively to protect family reputation.",
  },
  {
    title: "Tax Environment",
    body: "Active discourse around the reintroduction of estate duty or inheritance tax in India makes proactive structuring more urgent than ever.",
  },
  {
    title: "Continuity",
    body: "A declining ratio of next-generation members willing to both own and operate the family business raises existential questions for promoter families.",
  },
  {
    title: "Litigation",
    body: "Wealth-driven family feuds remain a leading cause of disputes in India, with gifts and wills increasingly contested in court.",
  },
];

export default function PrivateClientPage() {
  return (
    <>
      <PageHero
        photoKey="privateClientHero"
        eyebrow="Private Client Services"
        title={
          <>
            Family Office &
            <br />
            <span className="text-bronze italic">Succession Planning.</span>
          </>
        }
        description="Every family situation is unique. Preserving wealth for future generations is among the most important responsibilities a wealth creator carries — and one of the most daunting transitions to manage."
      />
      <ContextBand />
      <FivesForces />
      <HubDiagramBand />
      <ServicesGrid />
      <CTABand />
    </>
  );
}

function HubDiagramBand() {
  return (
    <Section tone="ivory" className="!pb-8 md:!pb-10">
      <Container width="default">
        <div className="text-center mb-8">
          <Eyebrow tone="bronze" className="justify-center">The CAWT Hub</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-ink max-w-2xl mx-auto leading-tight">
            One platform —
            <span className="italic text-bronze"> six coordinated practices.</span>
          </h2>
        </div>
        <DiagramHubSpoke />
      </Container>
    </Section>
  );
}

function ContextBand() {
  return (
    <Section tone="ivory">
      <Container width="default">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow tone="bronze">The Indian Context</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              Why detailed planning matters
              <span className="italic text-bronze"> today.</span>
            </h2>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
            <Headline value="<5%" label="of family-run businesses survive beyond three generations" />
            <Headline value="1,42,000+" label="millionaires relocated in 2025 — India leading" />
            <Headline value="₹125 Lac Cr" label="Indian intergenerational wealth transfer expected next decade" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Headline({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line pt-4">
      <div className="font-display text-3xl md:text-4xl text-bronze leading-none">
        {value}
      </div>
      <div className="mt-4 text-sm text-muted leading-relaxed">{label}</div>
    </div>
  );
}

function FivesForces() {
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Five Forces</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Reshaping family wealth
            <span className="italic text-bronze"> in India.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-12 gap-px bg-line">
          {forces.map((f, i) => (
            <div
              key={f.title}
              className={`bg-ivory p-8 md:p-10 ${
                i < 3 ? "md:col-span-4" : "md:col-span-6"
              }`}
            >
              <div className="font-display text-bronze text-3xl">
                0{i + 1}
              </div>
              <h3 className="mt-4 font-display text-2xl text-ink">{f.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ServicesGrid() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Our Offerings</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Comprehensive service suite —
            <span className="italic text-bronze"> tailored to your needs.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group bg-ivory-2 border border-line p-10 hover:border-bronze transition-colors ${
                i === services.length - 1 && services.length % 2 === 1
                  ? "md:col-span-2 md:w-1/2 md:mx-auto"
                  : ""
              }`}
            >
              <div className="flex items-start justify-end">
                <ArrowUpRight className="h-5 w-5 text-ink/40 group-hover:text-bronze transition-colors" />
              </div>
              <h3 className="mt-6 font-display text-2xl md:text-3xl text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{s.body}</p>
              <ul className="mt-6 space-y-2 text-sm text-ink/80">
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

function CTABand() {
  return (
    <Section tone="ink">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze" className="justify-center">Begin the conversation</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          Every family is unique — your
          <span className="italic text-bronze"> structure should be too.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <CTA href="/contact" variant="secondary" size="lg">
            Speak to our team
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
