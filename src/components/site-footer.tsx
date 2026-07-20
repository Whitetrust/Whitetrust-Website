import Link from "next/link";
import Image from "next/image";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <Container width="wide" className="py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Image
              src="/cawt-logo-white.png"
              alt="Cap Alpha WhiteTrust"
              className="h-14 w-auto"
              width={4695}
              height={2761}
            />
            <p className="mt-6 text-ivory/70 max-w-md leading-relaxed">
              {site.footerName}
            </p>
          </div>

          <div className="md:col-span-5 text-sm">
            <Eyebrow tone="ivory">Contact</Eyebrow>
            <div className="mt-4 space-y-3 text-ivory/80">
              <a
                href={`mailto:${site.contactEmail}`}
                className="block hover:text-bronze transition-colors"
              >
                {site.contactEmail}
              </a>
              <a
                href={site.phoneHref}
                className="block hover:text-bronze transition-colors"
              >
                {site.phone}
              </a>
              <div className="pt-4 mt-1 border-t border-ivory/15">
                <div className="text-ivory/50 text-[0.7rem] uppercase tracking-[0.15em]">
                  Co-Founders
                </div>
                <div className="mt-3 space-y-3">
                  {site.coFounders.map((f) => (
                    <div key={f.email}>
                      <div className="text-ivory/90">{f.name}</div>
                      <a
                        href={`mailto:${f.email}`}
                        className="block text-ivory/70 hover:text-bronze transition-colors"
                      >
                        {f.email}
                      </a>
                      <a
                        href={f.phoneHref}
                        className="block text-ivory/70 hover:text-bronze transition-colors"
                      >
                        {f.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 text-ivory/60 text-xs leading-relaxed">
                Registered Office
                <br />
                {site.address.registered}
              </div>
              <div className="text-ivory/60 text-xs leading-relaxed">
                Correspondence
                <br />
                {site.address.correspondence}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-ivory/50">
          <div>
            © {new Date().getFullYear()} {site.footerName}. All rights reserved.
            <span className="block mt-1">CIN: {site.cin}</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-bronze">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-bronze">
              Terms
            </Link>
            <Link href="/disclosures" className="hover:text-bronze">
              Regulatory Disclosures
            </Link>
          </div>
        </div>

        <p className="mt-8 text-[11px] text-ivory/40 leading-relaxed max-w-4xl">
          This website is for informational purposes only and does not
          constitute investment, legal, tax or regulatory advice. Information
          contained herein is general in nature and not tailored to any
          particular person or circumstance. Prospective clients and investors
          should conduct independent due diligence and consult appropriate
          advisors before acting on any information.
        </p>
      </Container>
    </footer>
  );
}
