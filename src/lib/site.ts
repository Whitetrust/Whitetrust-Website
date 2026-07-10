export const site = {
  name: "Cap Alpha WhiteTrust Global Private Limited",
  footerName: "Cap Alpha WhiteTrust Global Pvt. Ltd.",
  shortName: "CAWT",
  tagline: "Family Office & Succession Planning",
  description:
    "Premier fiduciary and fund services firm delivering integrated estate planning, succession advisory, family fund solutions and Indian Focussed / Global fund services for global investors.",
  url: "https://www.cawt.ai",
  email: "neerajaggarwal@cawt.ai",
  founderEmail: "neerajaggarwal@cawt.ai",
  contactEmail: "contact@cawt.ai",
  cin: "U66190MH2026PTC470065",
  phone: "+91 91364 59136",
  phoneHref: "tel:+919136459136",
  secondaryPhone: "+91 98193 16054",
  secondaryPhoneHref: "tel:+919819316054",
  whatsappHref: "https://wa.me/+919136459136",
  address: {
    registered:
      "8, Floor-2, Plot 58, Goa Mansion, Dr. Sunderlal Bahl Marg, Fort, Mumbai — 400 001",
    correspondence:
      "A/1605, One Lodha Place, Senapati Bapat Marg, Lower Parel, Mumbai — 400 013",
  },
  locations: ["Mumbai", "GIFT City (Upcoming)", "Delhi"],
  coFounders: [
    {
      name: "Neeraj Aggarwal",
      email: "neerajaggarwal@cawt.ai",
      phone: "+91 98206 61411",
      phoneHref: "tel:+919820661411",
    },
    {
      name: "Chirag Shetty",
      email: "chiragshetty@cawt.ai",
      phone: "+91 98193 16054",
      phoneHref: "tel:+919819316054",
    },
    {
      name: "Niyati Doshi",
      email: "niyatidoshi@cawt.ai",
      phone: "+91 98330 80248",
      phoneHref: "tel:+919833080248",
    },
  ],
} as const;

export const nav = {
  primary: [
    { label: "About Us", href: "/about" },
    {
      label: "Private Clients",
      href: "/private-client",
      children: [
        { label: "Overview", href: "/private-client" },
        { label: "Wills & Executorship Services", href: "/private-client/wills-execution" },
        { label: "Family Trust", href: "/private-client/family-trust" },
        { label: "Business Holding Trusts", href: "/private-client/business-holding-trust" },
        { label: "Family Constitution & Council", href: "/private-client/family-constitution-council" },
        { label: "Cross Border/GIFT City Structuring Solutions", href: "/private-client/cross-border-structuring-solutions" },
        { label: "Citizenship & Residency", href: "/private-client/citizenship-residency" },
        { label: "Wealth Protection Structures", href: "/private-client/wealth-protection-structures" },
      ],
    },
    {
      label: "Fund Services",
      href: "/fund-services",
      children: [
        { label: "Overview", href: "/fund-services" },
        { label: "GIFT City Platform Services", href: "/fund-services/gift-city-platform-services" },
        { label: "GIFT City Fund Setup", href: "/fund-services/gift-city-fund-setup" },
        { label: "Global Fund Structures & Solutions", href: "/fund-services/global-fund-structures-solutions" },
        { label: "Fund Accounting & Administration", href: "/fund-services/fund-accounting-administration" },
      ],
    },
    {
      label: "Corporate Services",
      href: "/corporate-services",
      children: [
        { label: "Overview", href: "/corporate-services" },
        { label: "India Entry Services", href: "/corporate-services/india-entry-strategy" },
        { label: "Setup Services", href: "/corporate-services/setup-of-entity" },
        { label: "Accounting, Tax, RBI & ROC Compliance", href: "/corporate-services/annual-administration-compliance" },
        { label: "Directorship Services", href: "/corporate-services/directorship-services" },
        { label: "Registered Office Services", href: "/corporate-services/registered-office-services" },
      ],
    },
    { label: "News & Insights", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
  ],
} as const;
