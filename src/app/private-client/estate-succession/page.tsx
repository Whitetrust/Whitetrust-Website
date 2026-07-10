import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { DiagramTrustFlow, DiagramLifecycle } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "Estate & Succession Planning",
  description:
    "Estate and succession planning that transforms a wealth creator's intention into structure across generations.",
};

export default function Page() {
  return (
    <>
      <PageHero
        photoKey="estateBand"
        eyebrow="Private Client · Estate & Succession"
        title={
          <>
            Estate & Succession
            <br />
            <span className="text-bronze italic">Planning.</span>
          </>
        }
        description="Every family situation is unique. A well-crafted estate and succession plan transforms an intention into a structure — ensuring that the wealth creator's vision endures for current and future generations of the family."
      />
      <WealthLifecycle />
      <WhyNow />
      <Deliverables />
      <Approach />
      <CaseStudy />
      <CtaBand />
    </>
  );
}

function WealthLifecycle() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">The Wealth Lifecycle</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              Four stages —
              <span className="italic text-bronze"> one continuous mandate.</span>
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-12 text-muted leading-relaxed">
            Preserving wealth for future generations is among the most
            important responsibilities a wealth creator carries. Yet managing a
            seamless transition of family wealth from one generation to the next
            can be one of the most daunting challenges they face.
          </p>
        </div>
        <DiagramLifecycle />
      </Container>
    </Section>
  );
}

function WhyNow() {
  const drivers = [
    {
      title: "Rising HNI population",
      body: "Number of dollar millionaires in India growing rapidly, with material assets now spread across multiple classes and jurisdictions.",
    },
    {
      title: "Global families",
      body: "Children studying or settled in different jurisdictions — the US, UK, Gulf and Singapore — creating multi-jurisdictional planning complexity.",
    },
    {
      title: "Family feuds",
      body: "Wealth-driven disputes are a leading cause of litigation in India. Wills and gifts are increasingly contested in court.",
    },
    {
      title: "Tax & legal evolution",
      body: "Active discourse around the reintroduction of estate duty or inheritance tax in India makes proactive structuring more urgent than ever.",
    },
    {
      title: "Untimely events",
      body: "Divorce, sudden death, and breakup of the joint family system disrupt families with no documented succession plan.",
    },
    {
      title: "Slow legal redress",
      body: "Indian judicial framework is not conducive to speedy resolution. Pre-emptive structuring keeps families out of court.",
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Why Plan Now</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Drivers behind the need for planning
            <span className="italic text-bronze"> non-optional.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {drivers.map((d) => (
            <div key={d.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{d.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Deliverables() {
  const items = [
    {
      title: "Will Drafting",
      body: "Bespoke wills drafted from first principles, partner-reviewed, witnessed and registered where appropriate. Covers movable, immovable and digital assets.",
    },
    {
      title: "Codicils",
      body: "Amendments to existing wills — change of executor, addition of bequest, updates following major life events such as marriage, divorce or new beneficiaries.",
    },
    {
      title: "Letters of Wishes",
      body: "Non-binding guidance to trustees on the settlor's intentions for distributions — flexibility without rigidity, the cornerstone of discretionary trust drafting.",
    },
    {
      title: "Family Settlements",
      body: "Documented arrangements between family members governing the division and stewardship of shared assets — minimising future disputes.",
    },
    {
      title: "Power of Attorney",
      body: "General and special POAs covering specific transactions or ongoing administration — drafted with clear scope and time limits.",
    },
    {
      title: "Executorship Services",
      body: "Acting as professional executor or co-executor under your will — administering the estate, obtaining probate, distributing bequests and resolving creditor claims.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">What We Deliver</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Documents and services —
            <span className="italic text-bronze"> partner-reviewed throughout.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {items.map((i) => (
            <div key={i.title} className="bg-ivory p-8">
              <h3 className="font-display text-2xl text-ink">{i.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Approach() {
  const steps = [
    {
      title: "Discover",
      body: "Understand objectives, family circumstances, residency status, asset map and growth-vs-preservation goals.",
    },
    {
      title: "Design",
      body: "Architect the family-office or wealth-holding structure in the simplest form that achieves the family's vision.",
    },
    {
      title: "Implement",
      body: "Execute step-by-step — entity setup, asset transfer, documentation, banking and regulatory filings.",
    },
    {
      title: "Steward",
      body: "Provide ongoing trustee, governance, accounting and global coordination with deadlines, transactions and ad-hoc support.",
    },
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="mb-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">Our Approach</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
              How we engage
              <span className="italic text-bronze"> with your family.</span>
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-12 text-ivory/70 leading-relaxed">
            A four-phase methodology — designed to reduce complexity, not
            multiply it. The structure is built around the family&apos;s objectives,
            circumstances, assets and long-term vision.
          </p>
        </div>
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <li key={s.title} className="grid md:grid-cols-12 gap-6 border-t border-ivory/15 pt-6">
              <div className="md:col-span-1 font-display text-2xl text-bronze">
                0{i + 1}
              </div>
              <div className="md:col-span-4 font-display text-xl text-ivory">
                {s.title}
              </div>
              <div className="md:col-span-7 text-sm text-ivory/70 leading-relaxed">
                {s.body}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function CaseStudy() {
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Eyebrow tone="bronze">Case Study</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              Protecting the
              <span className="italic text-bronze"> next generation.</span>
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              A leading auto-parts manufacturer with a single child — a son
              completing his studies and joining the family business with
              plans to expand into adjacent industries.
            </p>
          </div>
          <div className="md:col-span-7 bg-ivory border border-line p-10">
            <Eyebrow tone="bronze">The Need</Eyebrow>
            <p className="mt-3 text-ink leading-relaxed">
              Smooth, contested-proof succession of wealth — while ring-fencing
              the family corpus from any unforeseen liabilities arising from
              the son&apos;s expansion plans, and ensuring the inheritance reaches
              future grandchildren.
            </p>
            <div className="mt-8 pt-6 border-t border-line">
              <Eyebrow tone="bronze">The Solution</Eyebrow>
              <p className="mt-3 text-ink leading-relaxed">
                An irrevocable discretionary family trust holding surplus
                financial investments — with the wife, son and future
                grandchildren as beneficiaries. CAWT acts as professional
                trustee with a defined Letter of Wishes guiding distributions.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-12 border-t border-line">
          <div className="text-center mb-6">
            <Eyebrow tone="bronze" className="justify-center">Structure</Eyebrow>
          </div>
          <DiagramTrustFlow />
        </div>
      </Container>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section tone="ink-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Begin the conversation</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          Every estate plan begins with a
          <span className="italic text-bronze"> private conversation.</span>
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
