export type Founder = {
  slug: string;
  name: string;
  role: string;
  years: string;
  shortBio: string;
  longBio: string[];
  qualifications: string;
  geographies?: string;
  career: { firm: string; role: string }[];
  practiceAreas?: { title: string; body: string }[];
};

export const founders: Founder[] = [
  {
    slug: "neeraj-aggarwal",
    name: "Neeraj Aggarwal",
    role: "Founder & Chief Executive Officer",
    years: "25",
    shortBio:
      "Funds, Private Clients, Capital Markets & Corporate Services across India, Mauritius and the Middle East.",
    longBio: [
      "Neeraj is the Founder & CEO of Cap Alpha WhiteTrust Global Private Limited — a one-stop platform offering integrated solutions across estate and succession planning, family funds, GIFT City and cross-border structures for UHNI families, alongside end-to-end fund services for global investors deploying capital into India.",
      "He brings over 25 years across Funds, Private Clients, Capital Markets and Corporate Services — having held senior leadership roles across global platforms. Most recently, he was Regional Commercial Head for India, Mauritius and the Middle East at Apex Group.",
    ],
    qualifications: "TEP (STEP Singapore) · LLB · CFP · MBA · Solicitors & CS (Pursuing)",
    career: [
      {
        firm: "Apex Group",
        role: "Regional Commercial Head — India, Mauritius & Middle East",
      },
      { firm: "Vistra", role: "Commercial Head — India & Mauritius (11 years)" },
      { firm: "Kotak Group", role: "Estate Planning & Private Trust Structuring" },
      { firm: "ICICI Bank", role: "Banking, Insurance & Mutual Funds" },
    ],
  },
  {
    slug: "niyati-doshi",
    name: "Niyati Vijay Doshi",
    role: "Founder & Chief Operating Officer",
    years: "15",
    shortBio:
      "Estate & succession planning, fund services, and financial, legal & compliance expertise across Vistra, BSE and Intuit Consulting Pvt. Ltd.",
    longBio: [
      "Niyati is the Founder & COO of Cap Alpha WhiteTrust — a multi-disciplinary professional bringing together a rare combination of financial, legal and compliance expertise.",
      "With over 15 years across estate & succession planning and end-to-end fund services, she advises entrepreneurs, promoter families, senior executives and family offices on the full spectrum of succession and estate matters — known for her meticulous documentation and ability to navigate complex multi-jurisdictional structures.",
    ],
    qualifications: "Chartered Accountant (CA) · Company Secretary (CS) · Gen.LLB (Mumbai University) · B.Com",
    career: [
      { firm: "CAWT", role: "Founder & COO — All practice areas" },
      { firm: "Vistra", role: "Fund Services, Estate Planning & Compliance" },
      { firm: "BSE Ltd.", role: "Capital Markets, Regulatory & Governance" },
      {
        firm: "Intuit Consulting",
        role: "Advisory Practice",
      },
    ],
    practiceAreas: [
      { title: "Estate Planning", body: "Wills, Letters of Wishes & Family Trusts" },
      { title: "Family Governance", body: "Settlements, arrangements & frameworks" },
      { title: "Trust Operations", body: "Trustee services, structuring & compliance" },
      { title: "AIF Structuring", body: "SEBI AIFs and IFSCA AIFs advisory" },
    ],
  },
  {
    slug: "chirag-shetty",
    name: "Chirag Shetty",
    role: "Founder & Chief Business Officer",
    years: "20+",
    shortBio:
      "Banking, fund administration and business development across India, Mauritius, the Middle East and Southeast Asia.",
    longBio: [
      "Chirag is the Founder & Chief Business Officer of Cap Alpha WhiteTrust — bringing over 20 years of experience spanning banking, fund administration and business development across India, Mauritius, the Middle East and Southeast Asia.",
      "He has deep expertise in fund structuring, GIFT City operations and cross-border investment solutions — having held senior leadership roles across Apex Group, Dovetail Capital, Kotak Mahindra and HSBC.",
    ],
    qualifications: "B.Com · MMS (NLDIMSR, Mumbai)",
    geographies: "India · Mauritius · Middle East · Southeast Asia",
    career: [
      {
        firm: "Apex Group",
        role: "Director & Head, Business Development — India · Fund Administration",
      },
      {
        firm: "Dovetail Capital",
        role: "Founding Team — Sales Lead, Fund Solutions & Administration",
      },
      {
        firm: "Kotak Mahindra",
        role: "Banking & Financial Institutions · NBFC Financing & PE Coverage",
      },
      {
        firm: "HSBC",
        role: "Commercial Banking · Trade, Treasury & Working Capital",
      },
    ],
  },
];
