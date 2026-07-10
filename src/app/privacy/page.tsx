import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

type Section = { heading?: string; body?: string[]; bullets?: string[]; after?: string[] };

const sections: Section[] = [
  {
    body: [
      'Cap Alpha WhiteTrust Global Private Limited ("CAWT", "Company", "we", "our", or "us") is committed to protecting the privacy and confidentiality of the personal information entrusted to us by our clients, prospective clients, business associates and visitors to our website.',
      "This Privacy Policy explains how we collect, use, store, disclose and protect your personal information gathered through this website. It does not extend to information collected through client onboarding agreements, engagement letters, or other offline documentation, which are governed separately by the terms agreed with each client.",
      "By accessing our website or providing your information to us, you acknowledge that you have read, understood and accepted the terms of this Privacy Policy.",
    ],
  },
  {
    heading: "Collection of Personal Information",
    body: [
      "CAWT may collect personal information that you voluntarily provide via email communications, enquiry forms, contact requests, newsletter sign-ups, meetings or any other lawful means initiated through this website.",
      "Such information may include, but is not limited to:",
    ],
    bullets: [
      "Name",
      "Contact information",
      "Email address",
      "Residential or business address",
      "Company details",
      "The nature of your enquiry, including general details of the services you are exploring (e.g., fund structuring, succession planning, GIFT City set-up)",
      "Any additional information necessary for providing our professional services",
    ],
    after: [
      "We collect only such information through the website as is reasonably necessary to respond to your enquiry and does not include client identification, financial, or compliance documentation, which is collected separately once an engagement commences and is governed by our client-facing terms and applicable regulatory requirements.",
    ],
  },
  {
    heading: "Use of Personal Information",
    body: ["Your personal information collected through this website may be used for purposes including:"],
    bullets: [
      "Respond to enquiries submitted through the website",
      "Route enquiries to the appropriate team based on jurisdiction or service line (e.g., GIFT City fund services, cross-border structuring, succession and estate planning, etc)",
      "Maintain internal records of website enquiries",
      "Improve the content, functionality and user experience of the website",
      "Send updates about our services where you have consented to receive them",
    ],
    after: [
      "We do not use website information for automated decision-making that produces legal or similarly significant effects on you.",
    ],
  },
  {
    heading: "Disclosure of Personal Information",
    body: [
      "CAWT does not sell, rent, or trade your personal information. Your information may be disclosed only under the following circumstances:",
    ],
    bullets: [
      "Where disclosure is required under applicable laws, regulations, court orders or directions issued by competent authorities;",
      "To our professional advisors, auditors, consultants, technology service providers, legal counsel, compliance professionals, or service providers who are bound by strict confidentiality obligations;",
      "To any successor entity in connection with a merger, acquisition, restructuring, or transfer of business;",
      "Where disclosure has been expressly authorised by you.",
    ],
    after: [
      "Where your information is shared with service providers located outside India, CAWT shall take reasonable steps to ensure that such service providers maintain standards of data protection substantially similar to those applicable under Indian law and use the information solely for the agreed purpose.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "CAWT maintains reasonable administrative, technical, and physical safeguards designed to protect personal information against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, copying, access, or misuse.",
      "Our security measures are proportionate to the sensitivity of the information collected. Information of a confidential financial or personal nature is afforded the highest level of protection through access controls, secure systems, encryption where appropriate, and periodic security reviews.",
      "While every reasonable effort is made to safeguard information, no method of electronic transmission or storage is completely secure. Accordingly, absolute security cannot be guaranteed.",
    ],
  },
  {
    heading: "Retention of Information",
    body: [
      "Personal information shall be retained only for as long as necessary to fulfil the purposes for which it was collected, comply with legal and regulatory obligations, resolve disputes, enforce contractual rights, or as otherwise required under applicable law.",
      "Upon expiry of the applicable retention period, information shall be securely deleted, anonymised, or destroyed.",
    ],
  },
  {
    heading: "Cookies and Website Analytics",
    body: [
      "Our website may use cookies and similar technologies to enhance user experience, understand website usage, improve functionality, and analyze visitor behavior. Users may modify their browser settings to disable cookies; however, certain portions of the website may not function properly if cookies are disabled. We use only such cookies as are reasonably necessary for the website to function and for basic, aggregated analytics; we do not use website cookies for targeted advertising.",
    ],
  },
  {
    heading: "Third-Party Websites",
    body: [
      "This website may contain links to third-party websites for user convenience. CAWT does not control or assume responsibility for the privacy practices, security measures, or content of such external websites. Users are encouraged to review the privacy policies of those websites before providing any personal information.",
    ],
  },
  {
    heading: "Your Rights",
    body: ["Subject to applicable law, you may have the right to:"],
    bullets: [
      "Request access to your personal information;",
      "Request correction or updating of inaccurate information;",
      "Request deletion of information where legally permissible;",
      "Withdraw consent where processing is based upon consent;",
      "Raise a grievance regarding the processing of your information.",
    ],
    after: ["Requests may be submitted using the contact details provided on our website."],
  },
  {
    heading: "Governing Law & Jurisdiction",
    body: [
      "This Privacy Policy is governed by the laws of India. Courts at Mumbai shall have exclusive jurisdiction over any disputes arising in connection with this Policy.",
    ],
  },
  {
    heading: "Changes to this Privacy Policy",
    body: [
      "CAWT reserves the right to amend, modify, or update this Privacy Policy at any time without prior notice. Any revised version shall become effective immediately upon publication on this website. Continued use of the website or our services following such publication constitutes acceptance of the revised Privacy Policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy">
      {sections.map((s, i) => (
        <div key={i}>
          {s.heading && <h2>{s.heading}</h2>}
          {s.body?.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
          {s.bullets && (
            <ul>
              {s.bullets.map((b, k) => (
                <li key={k}>{b}</li>
              ))}
            </ul>
          )}
          {s.after?.map((p, j) => (
            <p key={`after-${j}`}>{p}</p>
          ))}
        </div>
      ))}
    </LegalPage>
  );
}
