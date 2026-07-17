# CAWT Website — IT Configuration Guide

**Audience:** CAWT IT team (Azure / Microsoft 365 / Google admins).
**Goal:** provision three external services so the website's backend
features switch on. You provision and hand the IDs/secrets back to the
website team (Deepak), who stores them in the hosting platform (Vercel)
and redeploys.

You are configuring:

| Part | Service | Enables |
|---|---|---|
| A | Google Analytics 4 | Visitor analytics / reporting |
| B | Azure AD (Entra) app + Microsoft Graph | Auto-booking on founder calendars + confirmation emails |
| C | Azure Cosmos DB for MongoDB (free tier) | The site's database — enquiries + prospect tracking ("mini-CRM") |

> **How secrets travel:** send all IDs, keys and connection strings to the
> website team through a **password manager share or encrypted channel** —
> never plain email, chat, or a ticket body. Secrets in this guide are
> marked 🔑.

---

## Part A — Google Analytics 4 (≈10 min)

GA4 gives aggregate traffic reporting (audience, acquisition, behaviour).
It is free and needs only a Google account.

### A.1 Create the property
1. Go to **https://analytics.google.com** → sign in.
2. **Admin** (gear, bottom-left) → **Create** → **Account**.
   - Account name: `Cap Alpha WhiteTrust`.
   - Click **Next**.
3. Property:
   - Property name: `cawt.ai`
   - Reporting time zone: **(GMT+05:30) India Standard Time**
   - Currency: **Indian Rupee (₹)**
   - **Next**.
4. Business details: **B2B**, size **Small (≤10)**. **Next**.
5. Objectives: tick **Generate leads** + **Examine user behaviour**.
   **Create** → accept Terms.

### A.2 Create a Web data stream
1. Platform: **Web**.
2. Website URL: `https://cawt-website.vercel.app`
   (will change to `https://cawt.ai` once DNS is cut over — see A.4).
   Stream name: `CAWT website`.
3. **Create stream**.
4. Copy the **Measurement ID** shown at the top — format `G-XXXXXXXXXX`.

### A.3 Hand back to website team
🔑 **`G-XXXXXXXXXX`** (the Measurement ID).

> Note: the site only fires GA4 **after** the visitor accepts the cookie
> banner (consent-gated, GDPR/DPDP-friendly). That is expected behaviour.

### A.4 Later — when cawt.ai goes live
Admin → Data Streams → open the stream → update the URL to `https://cawt.ai`.
No code change required.

---

## Part B — Azure AD app for Microsoft Graph (≈30 min)

This lets the website's contact form email a thank-you confirmation to the
prospect and notify the founder mailboxes of the new enquiry — all
server-to-server. (Meeting scheduling itself is handled separately by the
"Book an appointment" links, which point to Microsoft Bookings.)

**Who can do this:** a **Global Administrator** of the CAWT Microsoft 365
tenant. Steps B.4 (restricting the app) require Exchange admin rights too.

### B.1 Register the app
1. Go to **https://entra.microsoft.com** → sign in as tenant admin.
2. **Applications → App registrations → + New registration**.
   - Name: `cawt-website-booking`
   - Supported account types: **Accounts in this organizational directory only (Single tenant)**
   - Redirect URI: leave blank.
   - **Register**.
3. From **Overview**, copy:
   - 🔑 **Application (client) ID**
   - 🔑 **Directory (tenant) ID**

### B.2 Grant API permissions (Application, not Delegated)
1. App → **API permissions → + Add a permission → Microsoft Graph → Application permissions**.
2. Add these four:
   - `Calendars.ReadWrite`
   - `Mail.Send`
   - `MailboxSettings.Read`
   - `User.Read.All`
3. Click **Grant admin consent for {tenant}** → confirm. All four must
   read **"Granted for …"**.

### B.3 Create a client secret
1. App → **Certificates & secrets → + New client secret**.
2. Description: `cawt-website`. Expiry: **24 months** (calendar a renewal
   reminder ~1 month before).
3. **Add** → immediately copy the secret **Value** (not the Secret ID).
   🔑 **Client secret value** — shown only once.

### B.4 Restrict the app to only the booking mailboxes (important)
By default the app can access **every mailbox** in the tenant. Lock it to
just the booking mailboxes using an **Application Access Policy**.

Run in PowerShell as the Exchange admin:

```powershell
Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser
Connect-ExchangeOnline

# Mail-enabled security group holding ONLY the booking mailboxes
New-DistributionGroup `
  -Name "CAWT-Booking-Mailboxes" `
  -Type "Security" `
  -PrimarySmtpAddress "cawt-booking-mailboxes@cawt.ai" `
  -Members "neerajaggarwal@cawt.ai","niyati@cawt.ai","chirag@cawt.ai","contact@cawt.ai"

# Restrict the app to that group only
New-ApplicationAccessPolicy `
  -AppId "<Application (client) ID from B.1>" `
  -PolicyScopeGroupId "cawt-booking-mailboxes@cawt.ai" `
  -AccessRight RestrictAccess `
  -Description "Restrict CAWT website booking app to founder mailboxes only"

# Verify
Test-ApplicationAccessPolicy -Identity "neerajaggarwal@cawt.ai" -AppId "<Application (client) ID>"
```

Replace the member emails with the real booking mailbox UPNs.

### B.5 Hand back to website team
🔑 Tenant ID · 🔑 Client ID · 🔑 Client secret value ·
**Booking mailbox UPNs** (comma-separated, e.g.
`neerajaggarwal@cawt.ai,niyati@cawt.ai,chirag@cawt.ai`) ·
**From-mailbox** for confirmation emails (one UPN).

---

## Part C — Azure Cosmos DB for MongoDB, free tier (≈20 min)

This is the website's database. The app speaks the **MongoDB wire
protocol**, and **Azure Cosmos DB for MongoDB (RU model)** is wire-protocol
compatible — so this is a drop-in. **No application code rewrite** is
needed; the site just needs the connection string.

We recommend the **RU-based** API with **Free Tier** enabled:
- Free Tier gives **1000 RU/s + 25 GB free, forever** (1 free-tier account
  per Azure subscription) — far more than this low-traffic site needs.
- Host the account in an **India region** (closest to the website's Mumbai
  hosting) for low latency.

### C.1 Create the account
1. Azure Portal → **Create a resource → Azure Cosmos DB → Create**.
2. API: **Azure Cosmos DB for MongoDB**.
3. Configuration: **Request unit (RU) database account**.
4. Settings:
   - Resource group: existing CAWT RG, or new `rg-cawt-web`.
   - Account name: `cawt-prod-db` (becomes `cawt-prod-db.mongo.cosmos.azure.com`).
   - Location: **Central India** (or nearest India region offering free tier).
   - Capacity mode: **Provisioned throughput**.
   - **Apply Free Tier Discount: Apply** ← do not skip this.
   - Server version: **6.0** (or latest offered).
5. **Review + create → Create**. Provisioning takes a few minutes.

### C.2 Get the connection string
1. Open the account → left nav **Settings → Connection strings**.
2. Copy the **PRIMARY CONNECTION STRING**. It looks like:
   ```
   mongodb://cawt-prod-db:<KEY>@cawt-prod-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&...
   ```
   🔑 Send this whole string. (It already contains the key and
   `retrywrites=false` — the site is built to work with it as-is.)

### C.3 Networking
The website runs on Vercel, whose outbound IPs are not fixed. Either:
- **Simplest:** leave Cosmos default networking (key-secured, public
  endpoint) — access requires the key in the connection string. **OR**
- **Hardened (optional, later):** if you want IP allow-listing, we can
  move the site to a fixed-egress setup and share the IP range. Not
  required for go-live.

> The site does **not** need any database/collection pre-created — they are
> created automatically on first write (`enquiries`, `events`).

### C.4 Hand back to website team
🔑 The PRIMARY CONNECTION STRING from C.2.

---

## What the website team does with all this

The website team adds these to the Vercel project as environment
variables (Production) and redeploys. **Listed here only so you know where
your values land — no action for IT.**

| Env var | From |
|---|---|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Part A (`G-…`) |
| `AZURE_TENANT_ID` | Part B |
| `AZURE_CLIENT_ID` | Part B |
| `AZURE_CLIENT_SECRET` | Part B 🔑 |
| `BOOKING_MAILBOXES` | Part B (comma-separated UPNs) |
| `NOTIFICATION_FROM_MAILBOX` | Part B (one UPN) |
| `MONGODB_URI` | Part C 🔑 (Cosmos connection string) |
| `MONGODB_DB` | `cawt` |

---

## Joint verification (after the site redeploys)

1. **GA4:** open the live site in incognito, accept cookies, browse →
   GA4 → Reports → **Realtime** shows 1 user within ~30s.
2. **Booking:** submit the contact form with a test (non-founder) email →
   within ~10s you get a Teams invite + confirmation email; the picked
   founder sees the meeting in Outlook. A second submission picks the
   next founder (round-robin).
3. **Database / CRM:** the internal `/dashboard` stops saying "MongoDB not
   configured", the test enquiry appears, and page-view counts rise as you
   browse.

---

## Ownership / handover notes
- The Azure AD app and Cosmos DB are already inside CAWT's own tenant /
  subscription — nothing to transfer later.
- GA4 lives under whichever Google account created it; grant a CAWT-owned
  Google account **Administrator** access so it survives staff changes.
- Rotate the Graph client secret and Cosmos key at any formal handover.
