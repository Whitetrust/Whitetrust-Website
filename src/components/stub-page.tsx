import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";

export function StubPage({
  eyebrow,
  title,
  intro,
  bullets,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  bullets?: string[];
}) {
  return (
    <>
      <section className="bg-ink text-ivory">
        <Container width="wide" className="pt-32 pb-24 md:pt-40 md:pb-32">
          <Eyebrow tone="bronze">{eyebrow}</Eyebrow>
          <h1 className="mt-8 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl">
            {title}
          </h1>
          <p className="mt-10 max-w-3xl text-lg text-ivory/75 leading-relaxed">
            {intro}
          </p>
        </Container>
      </section>
      <Section tone="ivory">
        <Container width="default">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Eyebrow tone="bronze">Detailed page in progress</Eyebrow>
              <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight">
                We are preparing
                <span className="italic text-bronze"> the full write-up.</span>
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                In the meantime, our team can walk you through this offering in
                detail on a private call.
              </p>
              <div className="mt-8">
                <CTA href="/contact" variant="primary">
                  Request a detailed briefing
                </CTA>
              </div>
            </div>
            {bullets && bullets.length > 0 && (
              <div className="md:col-span-7">
                <div className="border-l border-line pl-8">
                  <Eyebrow tone="bronze">What this includes</Eyebrow>
                  <ul className="mt-6 space-y-3 text-ink">
                    {bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="text-bronze">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
