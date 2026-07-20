import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { founders } from "@/lib/founders";
import { photos } from "@/lib/photos";

const FOUNDER_PHOTOS = {
  "neeraj-aggarwal": photos.founderNeeraj,
  "niyati-doshi": photos.founderNiyati,
  "chirag-shetty": photos.founderChirag,
} as const;

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Three founders, 50+ years combined expertise across Apex, Vistra, BSE, Kotak, ICICI and HSBC. The principals who lead every mandate at CAWT.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        photoKey="aboutHero"
        eyebrow="Leadership"
        title={
          <>
            Three founders.
            <br />
            <span className="text-bronze italic">One partnership.</span>
          </>
        }
        description="50+ years of combined leadership across fiduciary, fund administration and financial services — with senior practices held at Apex Group, Vistra, BSE, Kotak Group, ICICI Bank and HSBC. The principals you meet at the first conversation are the ones who steward your mandate for the long term."
      />
      {founders.map((f, i) => (
        <FounderBlock key={f.slug} founder={f} alternate={i % 2 === 1} />
      ))}
      <CTABand />
    </>
  );
}

function FounderBlock({
  founder,
  alternate,
}: {
  founder: (typeof founders)[number];
  alternate: boolean;
}) {
  return (
    <Section tone={alternate ? "ivory-2" : "ivory"} id={founder.slug}>
      <Container width="wide">
        <div className="grid gap-12 md:grid-cols-12">
          <div
            className={`md:col-span-5 ${
              alternate ? "md:order-2" : ""
            }`}
          >
            <div className="aspect-[4/5] bg-ink relative overflow-hidden">
              <Image
                src={FOUNDER_PHOTOS[founder.slug as keyof typeof FOUNDER_PHOTOS]?.url ?? photos.aboutHero.url}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className={`object-cover ${FOUNDER_PHOTOS[founder.slug as keyof typeof FOUNDER_PHOTOS]?.focal ?? ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="font-display text-7xl md:text-8xl text-bronze leading-none">
                  {founder.years}
                </div>
                <div className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/80">
                  Years of practice
                </div>
                {!FOUNDER_PHOTOS[founder.slug as keyof typeof FOUNDER_PHOTOS]?.url?.startsWith("/") && (
                  <div className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-ivory/40">
                    Portrait pending
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`md:col-span-7 ${
              alternate ? "md:order-1" : ""
            }`}
          >
            <Eyebrow tone="bronze">{founder.role}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-ink leading-tight">
              {founder.name}
            </h2>
            <div className="mt-8 space-y-5 text-base text-charcoal leading-relaxed max-w-2xl">
              {founder.longBio.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            <div className="mt-10">
              <div className="text-xs uppercase tracking-[0.15em] text-muted">
                Career
              </div>
              <ul className="mt-4 space-y-3 border-l border-line pl-6">
                {founder.career.map((c) => (
                  <li key={c.firm + c.role}>
                    <div className="font-display text-lg text-ink">{c.firm}</div>
                    <div className="text-sm text-muted">{c.role}</div>
                  </li>
                ))}
              </ul>
            </div>

            {founder.practiceAreas && (
              <div className="mt-10">
                <div className="text-xs uppercase tracking-[0.15em] text-muted">
                  Practice Areas
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {founder.practiceAreas.map((p) => (
                    <div key={p.title}>
                      <div className="font-display text-base text-bronze">
                        {p.title}
                      </div>
                      <div className="text-sm text-muted">{p.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-line text-sm">
              <div className="text-xs uppercase tracking-[0.15em] text-muted">
                Qualifications
              </div>
              <div className="mt-2 text-ink">{founder.qualifications}</div>
              {founder.geographies && (
                <>
                  <div className="mt-4 text-xs uppercase tracking-[0.15em] text-muted">
                    Geographies
                  </div>
                  <div className="mt-2 text-ink">{founder.geographies}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CTABand() {
  return (
    <Section tone="ink-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Speak with a founder</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
          Every mandate begins with a
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
