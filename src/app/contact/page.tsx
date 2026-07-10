import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a private 30-minute conversation with one of the CAWT founders. We respond within one business day with a confirmed time on your timezone.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        photoKey="contactHero"
        eyebrow="Contact"
        title={
          <>
            Contact
            <span className="text-bronze italic"> Us.</span>
          </>
        }
        description="Reach out to our founders directly, or send us a note using the form below. We will respond with the right next step."
      />

      <Section tone="ivory">
        <Container width="wide">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Eyebrow tone="bronze">Direct contact</Eyebrow>
              <h2 className="mt-6 font-display text-3xl text-ink leading-tight">
                Or reach us
                <span className="italic text-bronze"> directly.</span>
              </h2>
              <div className="mt-8 space-y-6 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-muted">
                    Email
                  </div>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="mt-1 block text-ink hover:text-bronze text-base"
                  >
                    {site.contactEmail}
                  </a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-muted">
                    Telephone
                  </div>
                  <a
                    href={site.phoneHref}
                    className="mt-1 block text-ink hover:text-bronze text-base"
                  >
                    {site.phone}
                  </a>
                </div>
                <div className="pt-4 border-t border-line">
                  <div className="text-xs uppercase tracking-[0.15em] text-muted">
                    Registered Office
                  </div>
                  <div className="mt-2 text-ink leading-relaxed">
                    {site.address.registered}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-muted">
                    Correspondence
                  </div>
                  <div className="mt-2 text-ink leading-relaxed">
                    {site.address.correspondence}
                  </div>
                </div>
                <div className="pt-4 border-t border-line">
                  <div className="text-xs uppercase tracking-[0.15em] text-muted">
                    Co-Founders
                  </div>
                  <div className="mt-3 space-y-4">
                    {site.coFounders.map((f) => (
                      <div key={f.email}>
                        <div className="text-ink font-medium">{f.name}</div>
                        <a
                          href={`mailto:${f.email}`}
                          className="mt-0.5 block text-ink/80 hover:text-bronze"
                        >
                          {f.email}
                        </a>
                        <a
                          href={f.phoneHref}
                          className="block text-ink/80 hover:text-bronze"
                        >
                          {f.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="bg-ivory-2 border border-line p-8 md:p-10">
                <Eyebrow tone="bronze">Request a conversation</Eyebrow>
                <h2 className="mt-4 font-display text-3xl text-ink">
                  Tell us a little about yourself
                </h2>
                <p className="mt-3 text-sm text-muted">
                  All information you provide is held in strict confidence and
                  used only to schedule a follow-up.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
