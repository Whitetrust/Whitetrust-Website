import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { CountUp } from "@/components/count-up";
import LeadershipSection from "@/components/leadership-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Cap Alpha WhiteTrust Global Private Limited is a premier fiduciary and fund services firm delivering estate planning, succession advisory and family fund solutions.",
};

const whyChoose = [
  {
    title: "60+ Years Combined Expertise Of Leadership Team",
    body: "Three founders with deep domain knowledge across fiduciary, fund administration and financial services.",
  },
  {
    title: "GIFT City Presence",
    body: "GIFT City FME Entity with third party platform play license enabling IFSCA compliance and cross border wealth and fund compliance.",
  },
  {
    title: "360° Integrated Platform",
    body: "One-stop solutions covering estate planning, trust structuring, AIF setup and cross-border advisory for global families.",
  },
  {
    title: "UHNI Focus On Ultra High Net Worth",
    body: "Dedicated advisory for promoter families, entrepreneurs, senior executives and family offices.",
  },
  {
    title: "KYC Compliance First",
    body: "Rigorous regulatory framework covering SEBI, IFSCA, Income Tax, FEMA and PMLA requirements.",
  },
  {
    title: "Multi-Gen Wealth",
    body: "Structures designed to protect and govern family wealth across generations with robust governance.",
  },
];

const numbers = [
  { to: 72, suffix: "+", comma: false, label: "Family Trusts in Process This Year" },
  { to: 12, suffix: "+", comma: false, label: "Funds in Process This Year" },
  { to: 10000, suffix: " Cr+", comma: true, label: "Assets in Process This Year" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        photoKey="aboutHero"
        eyebrow="About Us"
        title={
          <>
            Trusted structures for
            <br />
            <span className="text-bronze italic">wealth and institutions.</span>
          </>
        }
        description="Cap Alpha WhiteTrust Global Private Limited is a premier fiduciary and fund services firm delivering integrated estate planning, succession advisory and family fund solutions to Ultra High Net Worth families, alongside comprehensive focused fund services for global investors."
      />
      <Numbers />
      <WhoWeAre />
      <VisionMission />
      <WhyChooseUs />
      <LeadershipSection />
      <CTABand />
    </>
  );
}

function WhoWeAre() {
  return (
    <Section tone="ivory">
      <Container width="default">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow tone="bronze">Who Are We</Eyebrow>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
              A unified cross-asset-class platform.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-charcoal leading-relaxed text-justify">
            <p>
              <strong>Cap Alpha WhiteTrust Global Private Limited</strong> is a
              premier fiduciary and fund services firm delivering integrated
              estate planning, succession advisory and family fund solutions to
              Ultra High Net Worth families, alongside comprehensive focused
              fund services for global investors.
            </p>
            <p>
              Founded and led by three seasoned professionals collectively
              bringing over 60 years of deep expertise across fiduciary, fund
              administration and financial services, the firm offers a one-stop,
              unified cross-asset-class platform supporting the entire wealth
              value chain.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function VisionMission() {
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="grid gap-px bg-line md:grid-cols-2">
          <article id="vision" className="bg-ivory p-8 md:p-12 scroll-mt-28">
            <Eyebrow tone="bronze">Vision</Eyebrow>
            <h2 className="mt-6 font-display text-3xl text-ink leading-tight">
              To be the most trusted global partner for families and institutions.
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Delivering excellence in estate planning, succession structuring
              and fund services that protect wealth and preserve legacies
              across generations.
            </p>
          </article>
          <article id="mission" className="bg-ivory p-8 md:p-12 scroll-mt-28">
            <Eyebrow tone="bronze">Mission</Eyebrow>
            <h2 className="mt-6 font-display text-3xl text-ink leading-tight">
              To create certainty, clarity and confidence.
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              To empower families, businesses and institutions with trusted,
              end-to-end estate and succession planning and GIFT City fund
              services, creating confidence in how wealth is protected,
              structured and transferred across generations.
            </p>
          </article>
        </div>
      </Container>
    </Section>
  );
}

function WhyChooseUs() {
  return (
    <Section tone="ivory" id="why-choose-us" className="scroll-mt-28">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Why Choose Us?</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Deep expertise across the
            <span className="italic text-bronze"> wealth value chain.</span>
          </h2>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item, index) => (
            <article key={item.title} className="bg-ivory-2 p-8">
              <div className="font-display text-3xl text-bronze">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 font-display text-xl text-ink leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Numbers() {
  return (
    <Section tone="ink" id="our-numbers" className="scroll-mt-28">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Our Numbers</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl leading-tight">
            A platform already working across
            <span className="italic text-bronze"> families and funds.</span>
          </h2>
        </div>
        <div className="grid gap-px bg-ivory/15 sm:grid-cols-1 lg:grid-cols-3">
          {numbers.map((item) => (
            <div key={item.label} className="bg-ink-2 p-8">
              <div className="font-display text-4xl md:text-5xl text-bronze">
                <CountUp to={item.to} suffix={item.suffix} comma={item.comma} />
              </div>
              <div className="mt-4 text-sm uppercase tracking-[0.15em] text-ivory/70">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CTABand() {
  return (
    <Section tone="ivory">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze" className="justify-center">
          Get in touch
        </Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl mx-auto leading-tight">
          Speak with CAWT about your
          <span className="italic text-bronze"> wealth or fund requirement.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <CTA href="https://outlook.office.com/book/WhiteTrust@cawt.ai/?ismsaljsauthenabled" variant="primary" size="lg">
            Book an appointment
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
