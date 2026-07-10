# CAWT Website — Activation Guide

This document walks you through everything needed to unlock the remaining
features of the deployed CAWT website. Each section is self-contained.

The site is already live at **https://cawt-website.vercel.app**. Right now
it works as a brochure site only. Following these steps will turn on:

1. **Persistent storage** (MongoDB Atlas) — so contact form submissions,
   prospect activity, and the internal dashboard actually save data.
2. **Microsoft Clarity** — heatmaps and session recordings (free).
3. **Google Analytics 4** — aggregate audience reporting (free).
4. **Sanity CMS** — so Neeraj's team can write and publish blog posts.
5. **Microsoft Graph** — auto-booking on the 4 founder calendars + Teams
   invites (Neeraj's IT must do this, not you).

Order matters. Mongo first — most other things write to it.

---

## How to add environment variables to Vercel (read this first)

Every step below ends with "add these env vars to Vercel". Here's how:

### Option A — Vercel dashboard (recommended, easier)

1. Go to https://vercel.com/deepaks-projects-9dd541e0/cawt-website/settings/environment-variables
2. Click **Add New**.
3. Enter the **Key** (e.g. `MONGODB_URI`), the **Value**, leave
   environment as **Production** (or check all three — Production /
   Preview / Development), click **Save**.
4. Repeat for each variable.

### Option B — CLI

```powershell
cd C:\Users\deepakgupta13\Downloads\nagarro_development\neeraj website\cawt-website
vercel env add MONGODB_URI production
# CLI prompts you to paste the value, hit Enter
```

### After adding variables: redeploy

Env vars only take effect on the next deploy.

```powershell
vercel deploy --prod
```

(Or in the Vercel dashboard: Deployments → click the latest → "Redeploy".)

---

## Part 1 — MongoDB Atlas (you — 15 min)

**What it is:** a fully-managed MongoDB database hosted by MongoDB
themselves. The free tier ("M0") gives 512 MB storage — more than enough
for this site for years.

**What it unlocks:**
- Contact form submissions are saved (otherwise lost on restart).
- Page views, prospect activity, scroll/dwell data persist.
- The `/dashboard` route shows real numbers instead of "not configured".

### Step 1 — Create the cluster

1. Go to **https://www.mongodb.com/cloud/atlas/register** and sign up
   with your email (or Google).
2. After signup it asks "What is your goal?" — pick **Build a new
   application**. Language: **JavaScript**. Click **Finish**.
3. You land on the **Deploy your database** screen. Choose:
   - Cluster type: **M0 Free**.
   - Provider: **AWS**. Region: **Mumbai (ap-south-1)** (matches our
     Vercel region; lower latency).
   - Cluster name: `cawt-prod` (or anything you like).
   - Click **Create Deployment**.

### Step 2 — Create a database user

A modal appears titled "Connect to Cluster0" (or `cawt-prod`).

1. Atlas auto-creates a database user for you. Note the **username** and
   **password** — copy the password somewhere safe (you can't see it
   again).
2. Click **Create Database User**.

### Step 3 — Allow Vercel to connect (network access)

1. Still in the same modal, scroll to **Add a connection IP address**.
   Choose **Allow access from anywhere** → paste `0.0.0.0/0` → confirm.
   (This is fine because access is gated by username+password. Vercel's
   IPs change so we can't pin them.)
2. Click **Finish and Close**.

### Step 4 — Get the connection string

1. From the Atlas dashboard, click **Connect** next to your cluster.
2. Choose **Drivers** (not Compass or Shell).
3. Driver: **Node.js**, Version: **6.7 or later**.
4. Copy the connection string. It looks like:
   ```
   mongodb+srv://<USER>:<PASSWORD>@cawt-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<PASSWORD>` with the actual password you saved.** Leave
   `<USER>` if it auto-populated, otherwise replace with the username.

### Step 5 — Add to Vercel

| Env var | Value |
|---|---|
| `MONGODB_URI` | The full connection string from Step 4. |
| `MONGODB_DB` | `cawt` (or any name — must match what we expect). |

Add to Vercel (see "How to add env vars" above). Then `vercel deploy --prod`.

### Step 6 — Verify

1. Visit https://cawt-website.vercel.app/contact and submit the form.
2. Wait 60 seconds.
3. Go to https://cawt-website.vercel.app/dashboard (creds: `cawtadmin` /
   `eb6324786b825173de8b7ede`). The enquiry should appear under "Recent
   enquiries".
4. Click around the public site, then refresh the dashboard. Page-view
   counts should increase.

**You did it right if:** the dashboard no longer says "MongoDB not
configured" and your test submission shows up.

---

## Part 2 — Microsoft Clarity (you — 5 min)

**What it is:** Microsoft's free heatmap + session recording tool.
Shows where visitors click, how far they scroll, and lets you replay
anonymised sessions.

**What it unlocks:** heatmaps + scroll-maps + session replay on
`/dashboard`'s "Heatmaps" link (Clarity's own UI).

### Step 1 — Create a Clarity project

1. Go to **https://clarity.microsoft.com**.
2. Sign in with the Microsoft account on cawt.ai (or your personal MS
   account for now — you can transfer later).
3. Click **+ New project**.
4. Project name: `CAWT`. Website URL: `https://cawt-website.vercel.app`
   (you'll update this to `cawt.ai` later). Click **Add new project**.

### Step 2 — Get the project ID

1. After project creation, you'll see "Install tracking code".
2. Look for a line like:
   ```js
   c[a]=c[a]||function(){...}("clarity", "script", "abc12def34")
   ```
3. The string at the end (e.g. `abc12def34`) is your **project ID**.
   Copy it.

### Step 3 — Add to Vercel

| Env var | Value |
|---|---|
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | The 10-char ID from Step 2. |

Then `vercel deploy --prod`.

### Step 4 — Verify

1. Open https://cawt-website.vercel.app in **an incognito window**.
2. Accept the cookie banner (click **Accept all**). Click around.
3. Go back to Clarity. Within 2 minutes you'll see a "1 visit" indicator.
4. Within 30 minutes the session is replayable.

**You did it right if:** Clarity shows your test session.

---

## Part 3 — Google Analytics 4 (you — 10 min)

**What it is:** Google's free aggregate-traffic analytics.

**What it unlocks:** standard "Audience / Acquisition / Behaviour" reports
across the site. Complements Clarity (which gives you individual-session
insight).

### Step 1 — Create the property

1. Go to **https://analytics.google.com**.
2. Sign in with your Google account.
3. Click **Admin** (gear icon, bottom left).
4. Click **Create** → **Account**.
   - Account name: `Cap Alpha WhiteTrust`
   - Untick the four data-sharing settings if you want to keep usage
     private (your call), or leave defaults.
   - Click **Next**.
5. Property setup:
   - Property name: `cawt.ai`
   - Reporting time zone: `India Standard Time (Kolkata)`
   - Currency: `Indian Rupee`
   - Click **Next**.
6. Business details: pick **B2B**, **Small business (≤10 employees)**.
   Click **Next**.
7. Business objectives: tick **Generate leads** and **Examine user
   behaviour**. Click **Create**.
8. Accept Terms of Service.

### Step 2 — Create a Web data stream

1. Choose **Web** as platform.
2. Website URL: `https://cawt-website.vercel.app` (you'll add cawt.ai
   later). Stream name: `CAWT website`.
3. Click **Create stream**.
4. You land on a page showing the **Measurement ID** at the top — looks
   like `G-XXXXXXXXXX`. Copy it.

### Step 3 — Add to Vercel

| Env var | Value |
|---|---|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` from Step 2. |

Then `vercel deploy --prod`.

### Step 4 — Verify

1. Open https://cawt-website.vercel.app in incognito.
2. Accept the cookie banner. Browse a few pages.
3. In GA4 → **Reports** → **Realtime**. Within 30 seconds you should see
   "Users in the last 30 minutes: 1" and the pages you visited.

**You did it right if:** Realtime shows your test session.

---

## Part 4 — Sanity CMS (you — 15 min)

**What it is:** a headless content management system. Authors write posts
in a friendly UI (the "Studio" we embedded at `/studio`). Posts get
fetched and rendered on `/insights`.

**What it unlocks:**
- `/studio` becomes a working blog editor for Neeraj's team.
- `/insights` shows real posts instead of an empty state.

### Step 1 — Create the Sanity project

1. Go to **https://www.sanity.io/manage**.
2. Sign in with Google / GitHub / email.
3. Click **+ Create new project**.
4. Project name: `cawt-insights`.
5. Choose **Production** as the default dataset.
6. Click **Create project**.

### Step 2 — Get the project ID

1. After creation you land on the project dashboard.
2. The **Project ID** is shown at the top — looks like `abc123def`
   (lowercase letters + digits, 8 chars).
3. Copy it.

### Step 3 — Whitelist your domains (CORS)

The Studio runs at `cawt.ai/studio` (embedded in the Next.js app). Sanity
needs to know it's allowed to talk to itself from that origin.

1. In the Sanity project dashboard, go to **API** tab → **CORS origins**.
2. Click **+ Add CORS origin**.
3. Origin: `https://cawt-website.vercel.app` — tick **Allow credentials**.
   Click **Save**.
4. Repeat with origins:
   - `https://cawt.ai` (once you point the domain)
   - `https://www.cawt.ai`
   - `http://localhost:3000` (for local dev)

### Step 4 — Add to Vercel

| Env var | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | The 8-char ID from Step 2. |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

Then `vercel deploy --prod`.

### Step 5 — Verify + write first post

1. Visit https://cawt-website.vercel.app/studio
2. Log in with the same email you used in Step 1. Sanity sends you a
   magic link or signs you in directly.
3. You see the Studio interface with three content types: **Insight /
   News**, **Author**, **Category**.
4. Create an Author first (e.g. Neeraj Aggarwal), then a Category (e.g.
   "GIFT City"), then click **Insight / News** → **Create new**.
5. Fill in title, slug (auto), author, category, excerpt, body, publish
   date. Click **Publish** (top right).
6. Wait 60 seconds (ISR cache window).
7. Visit https://cawt-website.vercel.app/insights — your post appears.
   Click in to see the detail page.

**You did it right if:** the Studio loads, you can publish, and the post
shows on `/insights` within a minute.

### Step 6 — Invite Neeraj's team

1. Sanity dashboard → **Members** → **Invite**.
2. Enter their email. Role: **Editor** (can write/edit/publish) or
   **Administrator** (everything).
3. They click the link in the email, log in, can author content
   immediately.

---

## Part 5 — Microsoft Graph for auto-booking (Neeraj's IT — 30 min)

**Send this whole section to Neeraj.** You can't do this — only someone
with **Global Administrator** rights in the CAWT M365 tenant can.

**What it unlocks:** the contact form on https://cawt.ai/contact finds
the next free 30-minute slot in working hours across the 4 founder
mailboxes, books it, sends a Teams invite, and emails the prospect a
confirmation.

### Step 1 — Register an Azure AD app

1. Go to **https://entra.microsoft.com** and sign in with a tenant admin
   account (Neeraj or whoever holds Global Administrator role).
2. Left nav → **Applications** → **App registrations** → **+ New
   registration**.
3. Fill in:
   - Name: `cawt-website-booking`
   - Supported account types: **Single tenant** (Accounts in this
     organisational directory only)
   - Redirect URI: leave blank
4. Click **Register**.
5. From the Overview page, copy:
   - **Application (client) ID**
   - **Directory (tenant) ID**

### Step 2 — Grant API permissions

1. In the app's left nav → **API permissions**.
2. Click **+ Add a permission** → **Microsoft Graph** → **Application
   permissions** (not Delegated).
3. Search for and add these four:
   - `Calendars.ReadWrite`
   - `Mail.Send`
   - `MailboxSettings.Read`
   - `User.Read.All`
4. After adding them all, click **Grant admin consent for {tenant}**
   (button near the top). Confirm. All four should now show "Granted
   for…".

### Step 3 — Create a client secret

1. Left nav → **Certificates & secrets** → **+ New client secret**.
2. Description: `cawt-website-2026`. Expires: **24 months**.
3. Click **Add**.
4. **Copy the secret value immediately.** Once you leave this page you
   cannot see it again. Paste it into a password manager.

### Step 4 — Restrict app to only the 4 booking mailboxes

By default the app can access **every mailbox** in the tenant — too much.
Limit it.

Open Windows PowerShell as admin. Run:

```powershell
# Install the Exchange Online module if you don't have it
Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser

# Connect (uses your admin account; opens a browser to sign in)
Connect-ExchangeOnline

# Create a mail-enabled security group containing only the 4 founders
New-DistributionGroup `
  -Name "CAWT-Booking-Mailboxes" `
  -Type "Security" `
  -PrimarySmtpAddress "cawt-booking-mailboxes@cawt.ai" `
  -Members "neerajaggarwal@cawt.ai","niyati@cawt.ai","chirag@cawt.ai","contact@cawt.ai"

# Restrict the AAD app to only those mailboxes
New-ApplicationAccessPolicy `
  -AppId "<paste the Application (client) ID from Step 1>" `
  -PolicyScopeGroupId "cawt-booking-mailboxes@cawt.ai" `
  -AccessRight RestrictAccess `
  -Description "Restrict CAWT website booking app to founder mailboxes only"
```

Replace the founder emails with the actual mailbox UPNs. Adjust the
member list to match the 4 mailboxes you want round-robin to use.

### Step 5 — Hand the secrets back to Deepak

Send these (via password manager / signed email — **not Slack or plain
email**):

- **Tenant ID** (from Step 1)
- **Client ID** (from Step 1)
- **Client Secret** (from Step 3)
- **Booking mailbox UPNs** — comma-separated list of the email addresses
  to be in the round-robin pool (e.g.
  `neerajaggarwal@cawt.ai,niyati@cawt.ai,chirag@cawt.ai,contact@cawt.ai`)

### Step 6 — Deepak adds them to Vercel

| Env var | Value |
|---|---|
| `AZURE_TENANT_ID` | From Neeraj's IT. |
| `AZURE_CLIENT_ID` | From Neeraj's IT. |
| `AZURE_CLIENT_SECRET` | From Neeraj's IT (treat as password — encrypted in Vercel). |
| `BOOKING_MAILBOXES` | Comma-separated UPNs from Neeraj's IT. |
| `NOTIFICATION_FROM_MAILBOX` | The single mailbox to send confirmation emails from. Defaults to first in `BOOKING_MAILBOXES` if you skip this. |
| `NOTIFICATION_CC` | Optional. Comma-separated list of mailboxes to CC on every confirmation (e.g. `contact@cawt.ai`). |

Then `vercel deploy --prod`.

### Step 7 — Verify

1. Visit https://cawt-website.vercel.app/contact in incognito.
2. Fill in the form using your own email address (not a founder's).
3. Submit.
4. Within ~10 seconds:
   - You receive a Teams meeting invite at the email you entered.
   - You receive a confirmation email from `NOTIFICATION_FROM_MAILBOX`.
   - The founder whose calendar got picked sees the meeting in Outlook.
5. Submit a second test — the **next** founder in the round-robin pool
   should get this one.

**You did it right if:** an invite lands in your inbox within seconds,
the meeting has a working Teams join link, and a different founder is
selected on the second submission.

---

## All env vars at a glance

After completing everything, your Vercel project should have these
environment variables configured for **Production**:

| Env var | Source | Required? |
|---|---|---|
| `MONGODB_URI` | Atlas (Part 1) | Yes for dashboard / persistence |
| `MONGODB_DB` | `cawt` | Yes |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Clarity (Part 2) | Optional but recommended |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 (Part 3) | Optional but recommended |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity (Part 4) | Needed for blog |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Needed for blog |
| `AZURE_TENANT_ID` | Neeraj's IT (Part 5) | Needed for booking |
| `AZURE_CLIENT_ID` | Neeraj's IT (Part 5) | Needed for booking |
| `AZURE_CLIENT_SECRET` | Neeraj's IT (Part 5) | Needed for booking |
| `BOOKING_MAILBOXES` | Neeraj's IT (Part 5) | Needed for booking |
| `NOTIFICATION_FROM_MAILBOX` | Optional override | Optional |
| `NOTIFICATION_CC` | Optional override | Optional |
| `DASHBOARD_BASIC_AUTH_USER` | Already set (`cawtadmin`) | Yes |
| `DASHBOARD_BASIC_AUTH_PASSWORD` | Already set (random) | Yes |

You can list them anytime with:

```powershell
vercel env ls production
```

---

## Final checklist after activation

- [ ] Submit contact form — confirmation email arrives within 10 sec
- [ ] `/dashboard` shows real enquiry data
- [ ] Open site in incognito + accept cookies → Clarity records the session
- [ ] GA4 Realtime report shows your test visit
- [ ] Publish a test post in `/studio` → appears at `/insights` within 60s
- [ ] Share a tokenised link with someone (`https://cawt.ai/r/TEST01?to=/private-client`) → they show up under "Active prospects" in the dashboard
- [ ] Point cawt.ai DNS at Vercel (Vercel → Settings → Domains → Add)

---

## When something doesn't work

| Symptom | Likely cause |
|---|---|
| Contact form returns success but no email | `AZURE_*` env vars missing or admin consent not granted in Part 5 |
| Dashboard says "MongoDB not configured" | `MONGODB_URI` missing — or you forgot to redeploy after adding it |
| Clarity shows zero sessions even after browsing | You didn't accept the cookie banner — Clarity is consent-gated |
| GA4 Realtime is empty | Same — accept cookies first |
| `/studio` shows a project picker | `NEXT_PUBLIC_SANITY_PROJECT_ID` missing |
| `/insights` shows "Coming soon" forever | Sanity project ID set but no published posts |
| Booking picks the same person every time | You only set one mailbox in `BOOKING_MAILBOXES`; add more (comma-separated) |
| 401 on `/dashboard` even with right creds | Browser cached old auth — close the tab and reopen |

You can always see live logs in Vercel:
**Dashboard → cawt-website → Deployments → latest → Functions** — click any function to tail its logs.

---

## Ownership transfer (later, when handing off to CAWT)

Once Neeraj's team is happy with the site, transfer ownership of each
service to CAWT-owned accounts:

1. **Vercel** — Settings → Advanced → Transfer Project → CAWT team
2. **MongoDB Atlas** — Org Settings → Invite Neeraj as Owner → leave
3. **Sanity** — Project Members → Promote Neeraj to Owner → leave
4. **Google Analytics 4** — Admin → Account Access → grant Administrator
   to a CAWT account
5. **Microsoft Clarity** — Settings → Team → invite as Admin
6. **Azure AD app registration** — already in CAWT's tenant, nothing to
   transfer
7. **DNS** — already owned by CAWT, nothing to transfer

Rotate all secrets at handover. The README in this repo
([README.md](README.md)) covers this in more detail.
