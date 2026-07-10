import Link from "next/link";
import { ArrowRight, ArrowUpRight, Users, Briefcase, UserCheck } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { DiagramLifecycle } from "@/components/diagrams";
import { HeroCarousel } from "@/components/hero-carousel";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Paths />
      <IntroBand />
      <WhyUs />
      <Approach />
      <FoundersStrip />
      <InsightsTeaser />
      <BookingBand />
    </>
  );
}

function Paths() {
  const paths = [
    {
      title: "Private Client Services",
      body: "Wills, family trusts, business holding trusts, family governance and wealth protection.",
      href: "/private-client",
      Icon: Users,
    },
    {
      title: "Fund Services",
      body: "GIFT City platform services, fund setup, global fund structures & solutions and fund administration.",
      href: "/fund-services",
      Icon: Briefcase,
    },
    {
      title: "Corporate Services",
      body: "India entry strategy, entity setup, annual administration, directorship and registered office support.",
      href: "/corporate-services",
      Icon: UserCheck,
    },
  ];
  return (
    <Section tone="ivory" className="!py-12 md:!py-16 border-y border-[var(--line-rule)]">
      <Container width="wide">
        <div className="grid md:grid-cols-3 gap-px bg-[var(--line-rule)]">
          {paths.map((p, i) => (
            <Reveal key={p.href} index={i}>
              <Link
                href={p.href}
                className="group block bg-[var(--surface)] p-8 h-full hover:bg-[var(--surface-2)] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <p.Icon className="h-5 w-5 text-bronze" />
                  <ArrowUpRight className="h-4 w-4 text-[var(--on-surface-muted)] group-hover:text-bronze group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="mt-6 font-display text-xl md:text-2xl text-[var(--on-surface)] leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--on-surface-muted)] leading-relaxed">
                  {p.body}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function IntroBand() {
  const aboutLinks = [
    { label: "Vision", href: "/about#vision" },
    { label: "Mission", href: "/about#mission" },
    { label: "Why choose us", href: "/about#why-choose-us" },
    { label: "Our numbers", href: "/about#our-numbers" },
  ];
  return (
    <Section tone="ivory">
      <Container width="default">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <Eyebrow tone="bronze">Who We Are</Eyebrow>
            <div className="mt-8 flex flex-col gap-3">
              {aboutLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--on-surface)] hover:text-bronze transition-colors"
                >
                  <span className="text-bronze">·</span>
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal index={1} className="md:col-span-8">
            <p className="font-display text-2xl md:text-3xl leading-snug text-[var(--on-surface)]">
              Every family situation is unique. A well-crafted estate and
              succession plan transforms intention into structure — ensuring
              the wealth creator&apos;s vision endures for current and future
              generations.
            </p>
            <p className="mt-8 text-base text-[var(--on-surface-muted)] leading-relaxed max-w-2xl">
              CAWT coordinates estate planning, private trust structuring,
              family governance, cross-border solutions and fund services under
              one roof, with one accountable advisor for the family.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 bg-ink text-ivory px-6 py-3 text-sm font-medium hover:bg-ink-2 transition-colors"
            >
              Know more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function WhyUs() {
  const items = [
    { eyebrow: "60+ Years", title: "Combined Leadership", body: "Three founders with senior-practice experience across global platforms." },
    { eyebrow: "100% Focus", title: "UHNI Specialisation", body: "A dedicated practice for promoter groups, entrepreneurs and senior executives — not a side desk inside a bank or audit firm." },
    { eyebrow: "360° Scope", title: "Integrated Platform", body: "Estate planning, trust structuring, AIF setup and cross-border advisory under one accountable partner." },
    { eyebrow: "GIFT City", title: "On-the-Ground IFSCA", body: "Upcoming GIFT City branch enabling IFSCA-compliant cross-border wealth and family-vehicle structuring." },
    { eyebrow: "Compliance First", title: "Audit-Ready Framework", body: "Robust governance across SEBI IA, IFSCA, Income Tax, FEMA and PMLA from day one. Trustee-grade documentation." },
    { eyebrow: "Built for Generations", title: "Multi-Generational Stewardship", body: "Structures and oversight designed to outlast the founders — preserving family alignment, not just transactions." },
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <Reveal className="md:col-span-5">
            <Eyebrow tone="bronze">Cap Alpha WhiteTrust Global Pvt. Ltd.</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
              Boutique by design.
              <br />
              <span className="text-bronze italic">Institutional in capability.</span>
            </h2>
          </Reveal>
          <Reveal index={1} className="md:col-span-7 md:pt-12">
            <p className="text-ivory/75 leading-relaxed">
              Founder-led from day one. Three principals on every mandate. Direct
              partner access, fast turnaround on changes, bespoke drafting from
              first principles — without the layered approval chains and template
              documents of global service factories.
            </p>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {items.map((it, i) => (
            <Reveal key={it.title} index={i % 3}>
              <div className="border-t border-ivory/15 pt-6">
                <Eyebrow tone="bronze">{it.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-display text-2xl text-ivory leading-snug">{it.title}</h3>
                <p className="mt-3 text-sm text-ivory/70 leading-relaxed">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Approach() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <Reveal className="mb-16">
          <Eyebrow tone="bronze">Our Approach</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-[var(--on-surface)] max-w-3xl leading-tight">
            A four-phase methodology
            <span className="italic text-bronze"> designed to reduce complexity</span>,
            not multiply it.
          </h2>
        </Reveal>
        <Reveal index={1}>
          <DiagramLifecycle />
        </Reveal>
      </Container>
    </Section>
  );
}

function FoundersStrip() {
  const founders = [
    { slug: "neeraj-aggarwal", name: "Neeraj Aggarwal", role: "Founder & CEO", years: "25", bio: "Funds, Private Clients, Capital Markets & Corporate Services. Most recently Regional Commercial Head — India, Mauritius & Middle East at Apex Group.", quals: "TEP · LLB · CFP · MBA", photo: photos.founderNeeraj },
    { slug: "niyati-doshi", name: "Niyati Vijay Doshi", role: "Founder & COO", years: "15", bio: "Estate & succession planning, fund services, financial-legal-compliance expertise across Vistra, BSE and advisory practice of Mr. G N Bajpai.", quals: "CA · CS · LLB · B.Com", photo: photos.founderNiyati },
    { slug: "chirag-shetty", name: "Chirag Shetty", role: "Founder & CBO", years: "20+", bio: "Banking, fund administration and business development across India, Mauritius, Middle East and Southeast Asia. Senior leadership at Apex, Kotak Mahindra and HSBC.", quals: "B.Com · MMS (NLDIMSR)", photo: photos.founderChirag },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <Reveal className="mb-12">
          <Eyebrow tone="bronze">Leadership</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-[var(--on-surface)] leading-tight">
            Three founders.
            <br />
            <span className="italic text-bronze">One accountable partnership.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {founders.map((f, i) => (
            <Reveal key={f.slug} index={i}>
              <Link
                href={`/leadership#${f.slug}`}
                className="group bg-[var(--surface)] border border-[var(--line-rule)] p-0 flex flex-col h-full hover:border-bronze transition-colors"
              >
                <div className="relative aspect-[4/5] bg-ink overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.photo.url}
                    alt={f.photo.alt}
                    className={`absolute inset-0 w-full h-full object-cover ${f.photo.focal} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-display text-5xl md:text-6xl text-bronze leading-none">
                      {f.years}
                    </div>
                    <div className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/70">
                      Years
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <Eyebrow tone="bronze">{f.role}</Eyebrow>
                  <h3 className="mt-3 font-display text-2xl text-[var(--on-surface)]">{f.name}</h3>
                  <p className="mt-3 text-sm text-[var(--on-surface-muted)] leading-relaxed">{f.bio}</p>
                  <div className="mt-6 pt-4 border-t border-[var(--line-rule)] text-xs text-[var(--on-surface-muted)]">
                    {f.quals}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function InsightsTeaser() {
  return (
    <Section tone="ivory">
      <Container width="wide">
        <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <Eyebrow tone="bronze">News &amp; Insights</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-[var(--on-surface)] leading-tight">
              Latest perspectives from
              <br />
              <span className="italic text-bronze">our practice.</span>
            </h2>
          </div>
          <Link href="/insights" className="text-sm font-medium text-bronze border-b border-bronze pb-1">
            All insights →
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 border-t border-[var(--line-rule)] pt-12">
          {[
            { tag: "Estate Planning", date: "Coming soon", title: "Why fewer than 5% of family businesses survive beyond three generations", photo: photos.estateBand },
            { tag: "GIFT City", date: "Coming soon", title: "TPFM: the new platform play for global asset managers entering India", photo: photos.giftCityBand },
            { tag: "Cross-Border", date: "Coming soon", title: "Structuring wealth for globally mobile Indian families across the US, UK, Gulf and Singapore", photo: photos.crossBorderBand },
          ].map((it, i) => (
            <Reveal key={it.title} index={i}>
              <article className="group h-full">
                <div className="aspect-[4/3] mb-6 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.photo.url}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover ${it.photo.focal} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-ink/40" />
                </div>
                <div className="flex gap-3 text-xs uppercase tracking-[0.15em] text-[var(--on-surface-muted)]">
                  <span className="text-bronze">{it.tag}</span>
                  <span>·</span>
                  <span>{it.date}</span>
                </div>
                <h3 className="mt-3 font-display text-xl text-[var(--on-surface)] leading-snug group-hover:text-bronze transition-colors">
                  {it.title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function BookingBand() {
  return (
    <Section tone="ink-2">
      <Container width="default">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-7">
            <Eyebrow tone="bronze">Begin the conversation</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory leading-tight">
              Talk to us about
              <span className="italic text-bronze"> wealth succession</span> or
              <span className="italic text-bronze"> GIFT City fund services.</span>
            </h2>
            <p className="mt-6 text-ivory/70 max-w-xl leading-relaxed">
              A 30-minute private call with one of our founders. We will respond
              within one business day with a confirmed time, on your time zone.
            </p>
          </Reveal>
          <Reveal index={1} className="md:col-span-5">
            <div className="bg-ink p-8 md:p-10 border border-ivory/10">
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-ivory/50 text-xs uppercase tracking-[0.15em]">Email</div>
                  <a href={`mailto:${site.email}`} className="block mt-1 text-ivory hover:text-bronze">{site.email}</a>
                </div>
                <div>
                  <div className="text-ivory/50 text-xs uppercase tracking-[0.15em]">Telephone</div>
                  <a href={site.phoneHref} className="block mt-1 text-ivory hover:text-bronze">{site.phone}</a>
                </div>
              </div>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 w-full justify-center bg-bronze text-ivory py-3 px-6 hover:bg-bronze-3 transition-colors">
                Book an appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
