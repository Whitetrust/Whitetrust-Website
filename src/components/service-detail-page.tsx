import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import type { ServicePage } from "@/lib/service-pages";

export function ServiceDetailPage({ service }: { service: ServicePage }) {
  return (
    <>
      <PageHero
        photoKey={service.photoKey}
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.lead}
      />
      <Section tone="ivory">
        <Container width="wide">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Eyebrow tone="bronze">{service.category}</Eyebrow>
              <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
                Practical support with
                <span className="italic text-bronze"> founder&apos;s oversight.</span>
              </h2>
            </div>
            <div className="md:col-span-8 grid gap-6">
              {service.sections.map((section) => (
                <article key={section.title} className="bg-ivory-2 border border-line p-8">
                  <h3 className="font-display text-2xl text-ink">{section.title}</h3>
                  <p className="mt-4 text-sm text-muted leading-relaxed">{section.body}</p>
                  {section.bullets && (
                    <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-ink/85">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-bronze">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="ink">
        <Container width="default" className="text-center">
          <Eyebrow tone="bronze" className="justify-center">
            Get in touch
          </Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight">
            Discuss your requirement with
            <span className="italic text-bronze"> the CAWT team.</span>
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
