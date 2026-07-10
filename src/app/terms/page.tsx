import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use" };

type Section = { heading?: string; body?: string[]; bullets?: string[]; after?: string[] };

const sections: Section[] = [
  {
    body: [
      'The following Terms of Use govern your access to and use of the website operated by Cap Alpha WhiteTrust Global Private Limited ("CAWT", "Company", "we", "our", or "us").',
      "By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use together with our Privacy Policy and any other policies published on this website.",
      "If you do not agree with these Terms of Use, you should discontinue use of this website immediately.",
    ],
  },
  {
    heading: "Disclaimer",
    body: [
      "The information, material, publications, opinions, and content made available through this website are intended solely for general informational purposes.",
      "Nothing contained on this website constitutes legal advice, tax advice, investment advice, fiduciary advice, financial planning advice, or any offer, solicitation, recommendation, or invitation to purchase or sell any financial product or service.",
      "Visitors should obtain independent professional advice before making financial, legal, estate planning, succession planning, or investment decisions.",
      "While CAWT endeavors to ensure that information provided on the website is accurate and current, no representation or warranty, express or implied, is made regarding the completeness, reliability, suitability, or accuracy of such information. CAWT reserves the right to modify, suspend, update, or remove any information available on the website without prior notice.",
    ],
  },
  {
    heading: "Restricted Persons and Selling Restrictions",
    body: [
      "This website and its content are not directed at, and are not intended for distribution to or use by, any person in any jurisdiction or country where such distribution or use would be contrary to local law or regulation, or would subject CAWT to any registration or licensing requirement within such jurisdiction.",
      'In particular, this website is not intended for access by, and no information on it should be treated as directed at, any "U.S. Person" as defined under applicable U.S. securities laws, unless otherwise expressly stated. It is the responsibility of any person accessing this website from outside India to inform themselves of, and to observe, any applicable local restrictions.',
    ],
  },
  {
    heading: "Disclaimer of Warranty and Limitation of Liability",
    body: [
      'This website and all information contained herein are provided on an "AS IS" and "AS AVAILABLE" basis. CAWT expressly disclaims all warranties, whether express or implied, including warranties of merchantability, fitness for a particular purpose, title, accuracy, non-infringement, or uninterrupted availability.',
      "To the fullest extent permitted by applicable law, CAWT, its directors, officers, employees, affiliates, consultants, and representatives shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or exemplary damages arising from or relating to:",
    ],
    bullets: [
      "Use of or inability to use the website;",
      "Reliance upon any information available on the website;",
      "Errors, inaccuracies, omissions, interruptions, delays, viruses, system failures, or technical malfunctions;",
      "Any third-party websites linked from this website.",
    ],
    after: ["Users access and use the website entirely at their own risk."],
  },
  {
    heading: "Website Content",
    body: [
      "All information published on this website is intended solely for informational purposes regarding the services offered by CAWT.",
      "Nothing on this website shall be interpreted as creating any contractual, fiduciary, advisory, or professional relationship unless expressly agreed in writing between CAWT and the relevant party.",
      "CAWT may modify, update, or remove website content at its sole discretion without prior notice and retain internal records of website content for such periods as may be required for regulatory or audit purposes.",
    ],
  },
  {
    heading: "User Restrictions",
    body: ["Users shall not:"],
    bullets: [
      "Copy, reproduce, distribute, publish, transmit, or commercially exploit any content from the website without prior written consent;",
      "Modify or remove copyright, trademark, or proprietary notices;",
      "Attempt to gain unauthorised access to any portion of the website;",
      "Introduce malicious software, viruses, bots, or automated systems designed to disrupt website operations;",
      "Reverse engineer, decompile, or interfere with website software or security mechanisms;",
      "Use the website in any manner contrary to applicable law.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "Unless otherwise stated, all content, graphics, text, logos, trademarks, service marks, designs, software, documents, publications, and other intellectual property appearing on this website are owned by or licensed to Cap Alpha WhiteTrust Global Private Limited and are protected under applicable intellectual property laws of India.",
      "No material may be copied, reproduced, modified, distributed, transmitted, displayed, or otherwise used without prior written permission from CAWT.",
    ],
  },
  {
    heading: "Links to Third-Party Websites",
    body: [
      "This website may contain links to third-party websites solely for user convenience.",
      "CAWT neither endorses nor assumes responsibility for the content, security, products, services, or privacy practices of such external websites. Users access third-party websites entirely at their own discretion and risk.",
    ],
  },
  {
    heading: "Privacy",
    body: [
      "Your use of this website may be monitored for security, operational, and analytical purposes. Information collected through the website shall be handled in accordance with the CAWT Privacy Policy.",
    ],
  },
  {
    heading: "Indemnification",
    body: [
      "You agree to indemnify and hold harmless CAWT, its directors, officers, employees, affiliates, consultants, and representatives from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of this website, or your violation of these Terms of Use.",
    ],
  },
  {
    heading: "Severability and Entire Agreement",
    body: [
      "If any provision of these Terms of Use is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.",
      "These Terms of Use, together with the Privacy Policy and any other policies published on this website, constitute the entire agreement between you and CAWT concerning your use of this website, and supersede any prior agreements or understandings, whether written or oral, relating to the subject matter herein.",
    ],
  },
  {
    heading: "Changes to Terms of Use",
    body: [
      "CAWT reserves the right to amend these Terms of Use at any time without prior notice. Any amendments shall become effective immediately upon publication on the website. Continued use of the website after publication of revised Terms constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms of Use shall be governed by and construed in accordance with the laws of India.",
      "Any dispute arising out of or relating to these Terms of Use or the use of this website shall be subject to the exclusive jurisdiction of the competent courts located in Mumbai, Maharashtra, India.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Use">
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
