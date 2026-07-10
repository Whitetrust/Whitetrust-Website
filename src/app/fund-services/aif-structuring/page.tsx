import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "AIF Structuring — Category I, II & III",
  description:
    "End-to-end alternative investment fund structuring under IFSCA Fund Management Regulations, 2025 — Venture Capital, Restricted Schemes, PMS, REIT/InvIT and Special Situation Funds.",
};

export default function Page() {
  return (
    <>
      <PageHero
        photoKey="aifBand"
        eyebrow="Fund Services · AIF Structuring"
        title={
          <>
            Category I, II &amp; III —
            <br />
            <span className="text-bronze italic">scheme by scheme.</span>
          </>
        }
        description="A unified framework under the IFSCA (Fund Management) Regulations, 2025 — supporting the entire fund lifecycle, from FME registration and scheme structuring to ongoing administration."
      />
      <FmeCategories />
      <SchemeTypes />
      <ScopeMatrix />
      <TaxAdvantage />
      <CtaBand />
    </>
  );
}

function FmeCategories() {
  const fmes = [
    {
      title: "Authorised FME",
      networth: "USD 75,000",
      sub: "Lighter-touch",
      body: "Venture capital and angel schemes only. The entry-level FME tier — designed for emerging managers and early-stage strategies.",
    },
    {
      title: "Non-Retail FME",
      networth: "USD 500,000",
      sub: "Non-retail schemes",
      body: "Adds restricted schemes (Cat I/II/III AIF), PMS, REIT/InvIT, Special Situation Funds and Investment Trusts on private placement.",
    },
    {
      title: "Retail FME",
      networth: "USD 1,000,000",
      sub: "Full scope",
      body: "Full scope — including retail schemes, ETFs, and Third-Party Fund Management Services. The top-tier FME category.",
    },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">FME Categories</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Three FME tiers —
            <span className="italic text-bronze"> mapped to scope.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {fmes.map((f) => (
            <div key={f.title} className="bg-ivory-2 border border-line p-8">
              <div className="text-xs uppercase tracking-[0.15em] text-bronze">
                {f.sub}
              </div>
              <h3 className="mt-2 font-display text-2xl text-ink">{f.title}</h3>
              <div className="mt-6 pt-6 border-t border-line">
                <div className="text-xs uppercase tracking-[0.15em] text-muted">
                  Minimum net worth
                </div>
                <div className="mt-2 font-display text-3xl text-bronze">
                  {f.networth}
                </div>
              </div>
              <p className="mt-6 text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function SchemeTypes() {
  const cats = [
    {
      title: "Category I AIF",
      body: "Investment in start-ups, early-stage ventures, social ventures, SME, infrastructure or other socially or economically desirable sectors. Pass-through tax treatment.",
      examples: ["Venture Capital Funds", "Angel Schemes", "SME Funds", "Social Venture Funds"],
    },
    {
      title: "Category II AIF",
      body: "Funds that do not fall in Category I or III and do not undertake leverage other than to meet operational requirements. The largest AIF category in India.",
      examples: ["Private Equity Funds", "Debt Funds", "Real Estate Funds", "Distressed Asset Funds"],
    },
    {
      title: "Category III AIF",
      body: "Funds that employ diverse or complex trading strategies and may employ leverage including through investment in listed or unlisted derivatives.",
      examples: ["Hedge Funds", "Long-Short Strategies", "Arbitrage Funds", "Public Equity Funds"],
    },
  ];
  return (
    <Section tone="ivory-2">
      <Container width="wide">
        <div className="mb-16">
          <Eyebrow tone="bronze">Scheme Categories</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Three AIF categories —
            <span className="italic text-bronze"> seven strategy archetypes.</span>
          </h2>
        </div>
        <div className="space-y-6">
          {cats.map((c) => (
            <div
              key={c.title}
              className="bg-ivory border border-line p-8 md:p-10 grid md:grid-cols-12 gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl text-ink">
                  {c.title}
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm text-charcoal leading-relaxed">{c.body}</p>
              </div>
              <div className="md:col-span-3">
                <div className="text-xs uppercase tracking-[0.15em] text-bronze">
                  Typical strategies
                </div>
                <ul className="mt-3 space-y-1 text-sm text-ink/80">
                  {c.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ScopeMatrix() {
  const rows = [
    { activity: "Venture Capital / Angel Scheme", auth: true, nonRetail: true, retail: true },
    { activity: "Restricted Schemes (Cat I/II/III AIF)", auth: false, nonRetail: true, retail: true },
    { activity: "Retail Schemes & ETFs", auth: false, nonRetail: false, retail: true },
    { activity: "Portfolio Management Services (PMS)", auth: false, nonRetail: true, retail: true },
    { activity: "Special Situation Fund", auth: false, nonRetail: true, retail: true },
    { activity: "Investment Trusts (Private Placement)", auth: false, nonRetail: true, retail: true },
    { activity: "Third-Party Fund Management", auth: false, nonRetail: false, retail: true },
  ];
  return (
    <Section tone="ivory">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">Scope of Activities</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl leading-tight">
            Activity by
            <span className="italic text-bronze"> FME category.</span>
          </h2>
        </div>
        <div className="border border-line bg-ivory">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-ivory-2 border-b border-line text-xs uppercase tracking-[0.15em] text-muted">
            <div className="col-span-6">Activity</div>
            <div className="col-span-2 text-center">Authorised</div>
            <div className="col-span-2 text-center">Non-Retail</div>
            <div className="col-span-2 text-center">Retail</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.activity}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center ${
                i !== rows.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="col-span-6 text-sm text-ink">{r.activity}</div>
              <Check on={r.auth} />
              <Check on={r.nonRetail} />
              <Check on={r.retail} />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Source: IFSCA (Fund Management) Regulations, 2025.
        </p>
      </Container>
    </Section>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <div className="col-span-2 text-center">
      <span className={on ? "text-bronze font-display text-xl" : "text-line"}>
        {on ? "●" : "○"}
      </span>
    </div>
  );
}

function TaxAdvantage() {
  const items = [
    { v: "0%", l: "Corporate Tax", sub: "10 of first 15 years (Sec. 80LA)" },
    { v: "0%", l: "GST on management fees", sub: "FME to IFSC-based funds" },
    { v: "0%", l: "Capital Gains Tax", sub: "On specified securities transferred on IFSC exchanges" },
    { v: "0%", l: "STT / CTT / Stamp Duty", sub: "On specified IFSC-exchange transactions" },
    { v: "USD", l: "Denomination", sub: "Full repatriation; multi-currency operations" },
    { v: "NR", l: "Investor tax", sub: "NR investors exempt from Indian tax filing (conditions apply)" },
  ];
  return (
    <Section tone="ink">
      <Container width="wide">
        <div className="mb-12">
          <Eyebrow tone="bronze">The IFSC Edge</Eyebrow>
          <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            A fiscal framework built to
            <span className="italic text-bronze"> compete globally.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
          {items.map((i) => (
            <div key={i.l} className="border-t border-ivory/15 pt-6">
              <div className="font-display text-5xl text-bronze leading-none">
                {i.v}
              </div>
              <div className="mt-4 font-display text-xl text-ivory">{i.l}</div>
              <div className="mt-2 text-sm text-ivory/60 leading-relaxed">
                {i.sub}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ivory/40">
          Subject to prescribed conditions and applicable CBDT, CBIC and GST
          Council notifications.
        </p>
      </Container>
    </Section>
  );
}

function CtaBand() {
  return (
    <Section tone="ivory-2">
      <Container width="default" className="text-center">
        <Eyebrow tone="bronze">Structure your scheme</Eyebrow>
        <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink max-w-3xl mx-auto leading-tight">
          Discuss your strategy and
          <span className="italic text-bronze"> target investor base.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <CTA href="/contact" variant="primary" size="lg">
            Speak with our team
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
