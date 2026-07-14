import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { photos } from "@/lib/photos";

export default function LeadershipSection() {
  const founders = [
    {
      slug: "neeraj-aggarwal",
      name: "Neeraj Aggarwal",
      role: "Co-Founder & CEO",
      years: "25+",
      bio: "Funds, Private Clients, Capital Markets and Global Structuring.",
      photo: photos.founderNeeraj,
    },
    {
      slug: "niyati-doshi",
      name: "Niyati Vijay Doshi",
      role: "Co-Founder & COO",
      years: "15+",
      bio: "Estate & succession planning, fiduciary services and governance.",
      photo: photos.founderNiyati,
    },
    {
      slug: "chirag-shetty",
      name: "Chirag Shetty",
      role: "Co-Founder & CBO",
      years: "20+",
      bio: "Banking, fund administration and business development.",
      photo: photos.founderChirag,
    },
  ];

  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <Reveal className="mb-12">
          <Eyebrow tone="bronze">Leadership</Eyebrow>

          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
            Three co-founders.
            <br />
            <span className="italic text-bronze">
              One accountable partnership.
            </span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {founders.map((f, i) => (
            <Reveal key={f.slug} index={i}>
              <Link
                href={`/leadership#${f.slug}`}
                className="group bg-[var(--surface)] border border-[var(--line-rule)] flex flex-col h-full hover:border-bronze transition"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <img
                    src={f.photo.url}
                    alt={f.photo.alt}
                    className={`absolute inset-0 w-full h-full object-cover ${f.photo.focal}`}
                  />
                </div>

                <div className="p-6">
                  <div className="text-sm uppercase tracking-wide text-bronze">
                    {f.role}
                  </div>

                  <h3 className="mt-2 text-2xl font-display">
                    {f.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted">
                    {f.years} Experience
                  </p>

                  <p className="mt-4 text-muted">
                    {f.bio}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}