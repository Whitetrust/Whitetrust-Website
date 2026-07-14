import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { photos } from "@/lib/photos";

export default function LeadershipSection() {
function FoundersStrip() {
  const founders = [
    { slug: "neeraj-aggarwal", name: "Neeraj Aggarwal", role: "Co-Founder & CEO", years: "25", bio: "Funds, Private Clients, Capital Markets & Corporate Services. Most recently Regional Commercial Head — India, Mauritius & Middle East at Apex Group.", quals: "TEP · LLB · CFP · MBA", photo: photos.founderNeeraj },
    { slug: "niyati-doshi", name: "Niyati Vijay Doshi", role: "Co-Founder & COO", years: "15", bio: "Estate & succession planning, fund services, financial-legal-compliance expertise across Vistra, BSE and Intuit Consulting Pvt Ltd.", quals: "CA · CS · Gen.LLB · B.Com", photo: photos.founderNiyati },
    { slug: "chirag-shetty", name: "Chirag Shetty", role: "Co-Founder & CBO", years: "20+", bio: "Banking, fund administration and business development across India, Mauritius, Middle East and Southeast Asia. Senior leadership at Apex, Kotak Mahindra and HSBC.", quals: "B.Com · MMS (NLDIMSR)", photo: photos.founderChirag },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <Reveal className="mb-12">
          <Eyebrow tone="bronze">Leadership</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-[var(--on-surface)] leading-tight">
            Three co-founders.
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
