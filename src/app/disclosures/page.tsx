import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Regulatory Disclosures" };

export default function DisclosuresPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Regulatory Disclosures"
      updated="2026-05-13"
    >
      <h2>Entity</h2>
      <p>
        Cap Alpha WhiteTrust Global Private Limited is a private company
        incorporated under the Companies Act, 2013, with its registered office
        at 8, Floor-2, Plot 58, Goa Mansion, Dr. Sunderlal Bahl Marg, Ballard
        Estate, Mumbai — 400 038, India.
      </p>

      <h2>Regulatory positioning</h2>
      <p>
        CAWT provides fiduciary, trust and fund services. Specific engagements
        are governed by their own engagement letters and the applicable
        regulatory framework, which may include but is not limited to:
      </p>
      <ul>
        <li>SEBI (Investment Advisers) Regulations, 2013</li>
        <li>IFSCA (Fund Management) Regulations, 2025</li>
        <li>Income-tax Act, 1961</li>
        <li>Foreign Exchange Management Act, 1999 (FEMA)</li>
        <li>Prevention of Money-Laundering Act, 2002 (PMLA)</li>
      </ul>

      <h2>GIFT City IFSC</h2>
      <p>
        References to a GIFT City branch indicate a planned office. The
        ability to provide IFSCA-regulated activities is subject to receipt of
        the requisite registration with the International Financial Services
        Centres Authority. References to tax treatment, the Fund Management
        (Amendment) Regulations, 2025 and Third-Party Fund Management apply
        only on satisfaction of prescribed conditions and remain subject to
        change by the relevant regulators.
      </p>

      <h2>No investment advice</h2>
      <p>
        Nothing on this website constitutes investment advice or a research
        report. Where CAWT provides investment-adviser services to a client,
        those services are governed by a written engagement and the relevant
        regulatory framework.
      </p>

      <h2>Tax information</h2>
      <p>
        Indian and IFSC tax treatment is summarised at a high level for
        general orientation only. Tax positions depend on facts and on
        statutory and judicial developments. Readers must consult their own
        tax advisors and the relevant CBDT, CBIC and GST Council notifications.
      </p>

      <h2>Updates</h2>
      <p>
        Material updates to our regulatory standing will be reflected on this
        page.
      </p>
    </LegalPage>
  );
}
