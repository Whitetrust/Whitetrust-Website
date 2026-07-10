import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { corporateServices } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Corporate Services",
  description:
    "Corporate structuring, entity setup, annual administration, directorship and registered office services for businesses entering or operating in India.",
};

export default function CorporateServicesPage() {
  return (
    <>
      <PageHero
        photoKey="aboutHero"
        eyebrow="Corporate Services"
        title={
          <>
            Corporate structuring
            <br />
            <span className="text-bronze italic">& governance.</span>
          </>
        }
        description="Entity setup, India entry options, annual administration, compliance, directorship and registered office services delivered through a well-experienced team."
      />
      <Section tone="ivory">
        <Container width="wide">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <Eyebrow tone="bronze">What We Do</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink leading-tight">
                A practical operating layer for
                <span className="italic text-bronze"> entities and sponsors.</span>
              </h2>
            </div>
            <p className="md:col-span-7 md:pt-12 text-muted leading-relaxed">
              CAWT supports businesses, global sponsors and family offices that
              need an India-ready entity structure, governance rhythm and
              compliance backbone. Each service has a dedicated scope and can
              be combined into one continuous operating mandate.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-ivory-2 border border-line p-8 hover:border-bronze transition-colors"
              >
                <div className="flex items-start justify-end">
                  <ArrowUpRight className="h-5 w-5 text-ink/40 group-hover:text-bronze transition-colors" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink leading-snug">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {service.lead}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ink">
        <Container width="default" className="text-center">
          <Eyebrow tone="bronze" className="justify-center">
            Corporate Services
          </Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
            Discuss entity setup or
            <span className="italic text-bronze"> governance support.</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <CTA href="/contact" variant="secondary" size="lg">
              Send us a quick enquiry
            </CTA>
          </div>
        </Container>
      </Section>
    </>
  );
}
