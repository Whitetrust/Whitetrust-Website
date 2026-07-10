"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Users, Globe2, Building2 } from "lucide-react";
import { Container } from "./container";
import { HeroPhoto } from "./hero-photo";
import { CTA } from "./button";
import { photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

const slides = [
  {
    eyebrow: "Private Client Services",
    line1: "Protecting what you have built",
    line2: "across generations.",
    blurb:
      "Estate and succession planning that turns a wealth creator's intention into lasting structure.",
    service: "Private Client Services",
    href: "/private-client",
    photo: photos.familyOfficeBand,
    Icon: Users,
    sub: [
      "Wills & Executorship",
      "Family Trusts",
      "Business Holding Trusts",
      "Family Constitution & Governance",
      "Cross-Border Structuring",
      "Wealth Protection Structures",
    ],
  },
  {
    eyebrow: "Fund Services",
    line1: "Mobilising capital",
    line2: "across borders.",
    blurb:
      "GIFT City platform and fund services for global, domestic and family-office managers entering India.",
    service: "Fund Services",
    href: "/fund-services",
    photo: photos.giftCityBand,
    Icon: Globe2,
    sub: [
      "GIFT City Platform Services",
      "GIFT City Fund Setup",
      "Global Fund Structures & Solutions",
      "Fund Accounting & Administration",
    ],
  },
  {
    eyebrow: "Corporate Services",
    line1: "From entry to expansion",
    line2: "structured for every stage.",
    blurb:
      "India entry, entity setup and governance support for businesses and sponsors at every stage.",
    service: "Corporate Services",
    href: "/corporate-services",
    photo: photos.fundAdminBand,
    Icon: Building2,
    sub: [
      "India Entry Services",
      "Setup Services",
      "Annual Administration & Compliance",
      "Directorship Services",
      "Registered Office Services",
    ],
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = slides[active];
  const Icon = slide.Icon;

  return (
    <section
      className="relative overflow-hidden bg-ink text-ivory min-h-[64vh] flex items-end"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="CAWT services"
    >
      {slides.map((s, i) => (
        <div
          key={s.service}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === active ? "opacity-100" : "opacity-0"
          )}
        >
          <HeroPhoto photo={s.photo} priority={i === 0} scrim="default" zoom={i === active} />
        </div>
      ))}

      <Container width="wide" className="relative pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Left: rotating headline */}
          <div className="lg:col-span-7 max-w-3xl">
            <div key={`copy-${active}`} className="cawt-fade-up">
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-bronze">
                {slide.eyebrow}
              </div>
              <h1 className="mt-7 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
                {slide.line1}
                <span className="block text-bronze italic">{slide.line2}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg text-ivory/80 leading-relaxed">
                {slide.blurb}
              </p>
            </div>
            <div className="mt-10">
              <CTA href="/contact" variant="secondary" size="lg">
                Book an appointment
              </CTA>
            </div>
          </div>

          {/* Right: rotating service box */}
          <div className="lg:col-span-5">
            <div
              key={`box-${active}`}
              className="cawt-fade-up relative overflow-hidden border border-ivory/15 bg-ink/70 backdrop-blur-md p-7 md:p-8"
            >
              <div className="flex items-center">
                <div className="inline-flex h-11 w-11 items-center justify-center border border-bronze/50 text-bronze">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h2 className="mt-6 font-display text-2xl md:text-3xl leading-tight text-ivory">
                {slide.service}
              </h2>
              <ul className="mt-5 space-y-2 text-sm text-ivory/75 min-h-[168px]">
                {slide.sub.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-bronze">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={slide.href}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-bronze hover:text-bronze-2"
              >
                Explore service
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.service}
                  type="button"
                  aria-label={`Show ${item.service}`}
                  aria-current={index === active}
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-1.5 transition-colors",
                    index === active ? "bg-bronze" : "bg-ivory/25 hover:bg-ivory/45"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
