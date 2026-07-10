import type { PhotoKey } from "@/lib/photos";

export type ServicePage = {
  slug: string;
  href: string;
  category: "Private Clients" | "Fund Services" | "Corporate Services";
  eyebrow: string;
  title: string;
  lead: string;
  photoKey: PhotoKey;
  sections: Array<{ title: string; body: string; bullets?: string[] }>;
};

export const privateClientServices: ServicePage[] = [
  {
    slug: "wills-execution",
    href: "/private-client/wills-execution",
    category: "Private Clients",
    eyebrow: "Private Clients",
    title: "Wills & Executorship Services",
    lead:
      "Bespoke wills, codicils, letters of wishes and executorship services.",
    photoKey: "estateBand",
    sections: [
      {
        title: "What We Do",
        body:
          "We help wealth creators document how assets should pass, who should administer the estate, and how contingencies should be handled across family branches and jurisdictions.",
        bullets: ["Will Drafting", "Codicils", "Letter of Wishes", "Executorship Services"],
      },
      {
        title: "Outcome",
        body:
          "A clear succession document set that reduces ambiguity, avoids avoidable disputes and gives the family a practical execution path.",
      },
    ],
  },
  {
    slug: "family-trust",
    href: "/private-client/family-trust",
    category: "Private Clients",
    eyebrow: "Private Clients",
    title: "Family Trust",
    lead:
      "Discretionary, determinate and hybrid family trust structures for multi-generational stewardship.",
    photoKey: "trustsBand",
    sections: [
      {
        title: "Trust Architecture",
        body:
          "We design the settlor, trustee, protector, beneficiary and distribution framework around the family’s objectives and control preferences.",
        bullets: ["Discretionary/Determinate Family Trust", "Asset Protection Trust", "Specific Situation Trust", "Professional Trustee Services"],
      },
      {
        title: "Governance",
        body:
          "Structures are supported by clear decision rules, documentation standards and periodic review points.",
      },
    ],
  },
  {
    slug: "business-holding-trust",
    href: "/private-client/business-holding-trust",
    category: "Private Clients",
    eyebrow: "Private Clients",
    title: "Business Holding Trusts",
    lead:
      "Business-continuity trust structures for listed, unlisted and to be listed (pre-IPO) family entities.",
    photoKey: "trustsBand",
    sections: [
      {
        title: "Control & Continuity",
        body:
          "We help promoter families separate economic benefit and management control so the business can continue through family transitions.",
        bullets: ["Promoter-holding Trusts", "Pre-IPO Planning", "Trust for Unlisted Shareholding Structures", "Control and Voting Frameworks"],
      },
      {
        title: "Family Alignment",
        body:
          "The structure can be paired with family governance documents so ownership, liquidity, exits and disputes have a pre-agreed path.",
      },
    ],
  },
  {
    slug: "family-constitution-council",
    href: "/private-client/family-constitution-council",
    category: "Private Clients",
    eyebrow: "Private Clients",
    title: "Family Constitution & Council",
    lead:
      "Governance frameworks that turn family values, ownership expectations and decision rights into working rules.",
    photoKey: "familyOfficeBand",
    sections: [
      {
        title: "Family Governance",
        body:
          "We facilitate and document the family constitution, family council charter and committee structure needed for long-term alignment.",
        bullets: ["Family Constitution", "Family Council", "Family Governance", "Family Business Board"],
      },
      {
        title: "Working Rhythm",
        body:
          "The goal is a governance system the family can actually operate: clear agendas, clear rights, clear escalation paths.",
      },
    ],
  },
  {
    slug: "cross-border-structuring-solutions",
    href: "/private-client/cross-border-structuring-solutions",
    category: "Private Clients",
    eyebrow: "Private Clients",
    title: "Cross Border/GIFT City Structuring Solutions",
    lead:
      "Constructing across legal, tax and cross border regulations providing practical solutions to families.",
    photoKey: "crossBorderBand",
    sections: [
      {
        title: "Cross-Border Planning",
        body:
          "We coordinate Indian legal, tax, FEMA and foreign-advisor inputs into one practical family structure.",
        bullets: ["Externalisation Planning", "India Entry Planning", "Cross-border Trusts", "GIFT City Family Vehicles", "Coordination Across Multi Jurisdiction Council"],
      },
      {
        title: "Use Case",
        body:
          "Useful when a family is becoming NRI or coming back to India or assets are spread globally.",
      },
    ],
  },
  {
    slug: "citizenship-residency",
    href: "/private-client/citizenship-residency",
    category: "Private Clients",
    eyebrow: "Private Clients",
    title: "Citizenship & Residency",
    lead:
      "Contingency planning for globally mobile families considering residence, citizenship and investment-migration pathways.",
    photoKey: "crossBorderBand",
    sections: [
      {
        title: "Residency Planning",
        body:
          "We help families evaluate residency and citizenship decisions in the context of wealth holding, succession, tax and family mobility.",
        bullets: ["Residency Planning", "Immigration Planning", "Foreign Advisor Co-ordination", "Structure Impact Review"],
      },
      {
        title: "Integrated View",
        body:
          "Mobility choices should not sit apart from trusts, wills, family vehicles and tax residence. We connect the pieces.",
      },
    ],
  },
  {
    slug: "wealth-protection-structures",
    href: "/private-client/wealth-protection-structures",
    category: "Private Clients",
    eyebrow: "Private Clients",
    title: "Wealth Protection Structures",
    lead:
      "Structures designed to possibly future protect family wealth from disputes, unexpected fragmentation, business risk and unplanned succession events.",
    photoKey: "privateClientHero",
    sections: [
      {
        title: "Protection Framework",
        body:
          "We combine trusts, holding structures, governance documents and contingency provisions to reduce preventable leakage and disputes.",
        bullets: ["Asset protection trusts", "Ring-fencing frameworks", "Contingency planning", "Family dispute prevention", "Documentation review"],
      },
      {
        title: "Stewardship",
        body:
          "The best protection is not secrecy or complexity. It is a clear, compliant and regularly reviewed structure.",
      },
    ],
  },
];

export const fundServices: ServicePage[] = [
  {
    slug: "gift-city-platform-services",
    href: "/fund-services/gift-city-platform-services",
    category: "Fund Services",
    eyebrow: "Fund Services",
    title: "GIFT City Platform Services",
    lead:
      "India inbound and outbound fund platform support through GIFT City IFSC structures.",
    photoKey: "giftCityBand",
    sections: [
      {
        title: "Platform Scope",
        body:
          "CAWT supports managers and families using GIFT City as a regulated platform for India-focused and global fund strategies.",
        bullets: ["India inbound structures", "Outbound allocation structures", "FME platform support", "IFSCA coordination", "Investor onboarding"],
      },
      {
        title: "Why It Matters",
        body:
          "GIFT City combines USD-denominated structures, an IFSC regulatory regime and tax-efficient operating conditions under one ecosystem.",
      },
    ],
  },
  {
    slug: "gift-city-fund-setup",
    href: "/fund-services/gift-city-fund-setup",
    category: "Fund Services",
    eyebrow: "Fund Services",
    title: "GIFT City Fund Setup",
    lead:
      "End-to-end fund setup assistance for managers launching schemes through GIFT City IFSC.",
    photoKey: "fundServicesHero",
    sections: [
      {
        title: "Setup Support",
        body:
          "We support the fund setup journey from structure selection through application, documentation and launch readiness.",
        bullets: ["Scheme structuring", "PPM and documents", "IFSCA filing coordination", "Service-provider coordination", "First-close readiness"],
      },
      {
        title: "Manager Experience",
        body:
          "The objective is a clean launch path that lets managers focus on strategy and investors while CAWT coordinates the regulated setup layer.",
      },
    ],
  },
  {
    slug: "global-fund-structures-solutions",
    href: "/fund-services/global-fund-structures-solutions",
    category: "Fund Services",
    eyebrow: "Fund Services",
    title: "Global Fund Structures & Solutions",
    lead:
      "Coordination and structuring across global fund platforms and offshore vehicles for managers and families.",
    photoKey: "aifBand",
    sections: [
      {
        title: "Structuring Coordination",
        body:
          "We help evaluate how global fund structures may sit alongside Indian, GIFT City or other offshore vehicles.",
        bullets: ["Structure feasibility", "Manager and advisor coordination", "Investor-base assessment", "Cross-border interaction review", "Ongoing administration planning"],
      },
      {
        title: "Integrated Platform View",
        body:
          "The right structure depends on target investors, tax residence, strategy, custody, reporting and India exposure. We compare those tradeoffs upfront.",
      },
    ],
  },
  {
    slug: "fund-accounting-administration",
    href: "/fund-services/fund-accounting-administration",
    category: "Fund Services",
    eyebrow: "Fund Services",
    title: "Fund Accounting & Administration",
    lead:
      "Fund accounting, NAV, investor services and compliance coordination for active fund vehicles.",
    photoKey: "fundAdminBand",
    sections: [
      {
        title: "Administration Layer",
        body:
          "We support the operating backbone required by fund managers, investors and regulators.",
        bullets: ["Fund accounting", "NAV computation", "Investor onboarding", "Capital calls and distributions", "FATCA / CRS support", "Regulatory filings"],
      },
      {
        title: "Control Environment",
        body:
          "Administration is built around audit trails, segregation, service-provider coordination and predictable reporting calendars.",
      },
    ],
  },
];

export const corporateServices: ServicePage[] = [
  {
    slug: "india-entry-strategy",
    href: "/corporate-services/india-entry-strategy",
    category: "Corporate Services",
    eyebrow: "Corporate Services",
    title: "India Entry Services",
    lead:
      "Market-entry structuring support for global businesses, managers and family offices entering India.",
    photoKey: "fundServicesHero",
    sections: [
      {
        title: "Entry Planning",
        body:
          "We help evaluate entity form, regulatory permissions, tax posture, banking, governance and operating readiness for India entry.",
        bullets: ["Market-entry structure", "Regulatory pathway", "Banking and compliance readiness", "Advisor coordination", "Implementation roadmap"],
      },
    ],
  },
  {
    slug: "setup-of-entity",
    href: "/corporate-services/setup-of-entity",
    category: "Corporate Services",
    eyebrow: "Corporate Services",
    title: "Setup Services",
    lead:
      "Entity setup coordination for companies, LLPs, offices and investment vehicles.",
    photoKey: "aboutHero",
    sections: [
      {
        title: "Formation Support",
        body:
          "We coordinate the formation steps needed to get an entity ready for operations and compliance.",
        bullets: ["Entity-selection support", "Incorporation Services", "One Time Registrations", "Banking Readiness", "Governance Documents"],
      },
    ],
  },
  {
    slug: "annual-administration-compliance",
    href: "/corporate-services/annual-administration-compliance",
    category: "Corporate Services",
    eyebrow: "Corporate Services",
    title: "Accounting, Tax, RBI & ROC Compliance Services",
    lead:
      "Annual compliance — Cosec, Income Tax and GST — with calendars, filings and entity administration support.",
    photoKey: "fundAdminBand",
    sections: [
      {
        title: "Ongoing Administration",
        body:
          "We support routine entity administration so statutory, regulatory and board obligations are tracked and completed.",
        bullets: ["Annual Compliance Calendar", "Board and Shareholder Documentation", "Statutory Filings", "Bookkeeping and Accounting", "Cosec Services", "Income Tax and GST Services"],
      },
    ],
  },
  {
    slug: "directorship-services",
    href: "/corporate-services/directorship-services",
    category: "Corporate Services",
    eyebrow: "Corporate Services",
    title: "Directorship Services",
    lead:
      "Professional directorship and governance support for entities requiring local oversight and disciplined board processes.",
    photoKey: "contactHero",
    sections: [
      {
        title: "Governance Support",
        body:
          "We support compliant board functioning, documentation discipline and governance oversight for client entities.",
        bullets: ["Board process support", "Governance documentation", "Resident-director coordination", "Compliance oversight", "Meeting discipline"],
      },
    ],
  },
  {
    slug: "registered-office-services",
    href: "/corporate-services/registered-office-services",
    category: "Corporate Services",
    eyebrow: "Corporate Services",
    title: "Registered Office Services",
    lead:
      "Registered office and correspondence support for entities that need a reliable address and document-handling layer.",
    photoKey: "aboutHero",
    sections: [
      {
        title: "Office Layer",
        body:
          "We support document receipt, registered-address coordination and administrative workflows linked to entity compliance.",
        bullets: ["Registered office support", "Document receipt", "Correspondence coordination", "Compliance notifications", "Record maintenance"],
      },
    ],
  },
];

export function getService(category: ServicePage["category"], slug: string) {
  const all =
    category === "Private Clients"
      ? privateClientServices
      : category === "Fund Services"
      ? fundServices
      : corporateServices;
  return all.find((service) => service.slug === slug) ?? null;
}
