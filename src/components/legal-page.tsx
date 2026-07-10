import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-ink text-ivory">
        <Container width="default" className="pt-32 pb-16 md:pt-40 md:pb-20">
          <Eyebrow tone="bronze">{eyebrow}</Eyebrow>
          <h1 className="mt-8 font-display text-4xl md:text-6xl leading-[1.0] tracking-tight">
            {title}
          </h1>
          {updated && (
            <div className="mt-6 text-sm text-ivory/60">Last updated: {updated}</div>
          )}
        </Container>
      </section>
      <Section tone="ivory">
        <Container width="narrow">
          <article className="prose prose-lg max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-charcoal [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-charcoal [&_a]:text-bronze [&_a]:underline">
            {children}
          </article>
        </Container>
      </Section>
    </>
  );
}
