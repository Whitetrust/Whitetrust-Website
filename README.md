# Cap Alpha WhiteTrust — cawt.ai

Marketing site, blog, prospect-activity tracking and booking automation for
**Cap Alpha WhiteTrust Global Private Limited**.

Built on Next.js 16 (App Router, Turbopack), TypeScript, Tailwind v4,
Sanity CMS, MongoDB Atlas, Microsoft Graph (calendar + email), Microsoft
Clarity and GA4.

---

## What it does

| Feature | Where | How it works |
|---|---|---|
| Marketing pages | `src/app/(routes)` | 13 static pages — Home, About, Leadership, Private Client + 4 detail, Fund Services + 3 detail, Insights index, Contact, Privacy/Terms/Disclosures. |
| Blog / news | `src/app/insights/*`, `sanity/`, `/studio` | Authored in embedded Sanity Studio at `/studio`. Rendered with Portable Text + YouTube embeds. ISR revalidates every 60s. |
| Contact form + booking | `src/app/contact/`, `src/app/api/book/`, `src/lib/booking.ts` | Validates with zod, persists to Mongo, round-robins across `BOOKING_MAILBOXES`, calls Graph `getSchedule` for next free 30-min slot in working hours, creates a Teams event, sends confirmation email. Graceful fallback if env not set. |
| Tokenised prospect tracking | `src/app/r/[token]/route.ts`, `src/components/page-tracker.tsx`, `src/app/api/track/` | A wealth manager shares `cawt.ai/r/<TOKEN>?to=/private-client/trusts`. The visitor gets a 90-day `cawt_p` cookie. Every page-view, dwell time and scroll depth is captured against that token. |
| Heatmaps / session replay | Microsoft Clarity | Loaded only when analytics consent is granted. Gives heatmaps, scroll-maps and session recordings out of the box. |
| Aggregate analytics | Google Analytics 4 | Loaded only when analytics consent is granted. Consent-mode signals included. |
| Cookie consent | `src/components/cookie-banner.tsx`, `src/lib/consent.ts` | Multi-jurisdiction aware via `x-vercel-ip-country`. EEA/UK = strict opt-in; India/US/UAE/Singapore = notice-and-choice. Three-toggle settings modal. |
| Internal dashboard | `src/app/dashboard/`, `src/proxy.ts` | Basic-auth-protected at `/dashboard`. Active prospects, top pages, recent enquiries. Per-prospect drill at `/dashboard/prospect/<TOKEN>` shows pages of interest, dwell, scroll, session timeline. |

---

## Local development

```bash
npm install
cp .env.example .env.local      # fill in keys you have
npm run dev                     # http://localhost:3000
```

Default dashboard creds in development: `dev / dev`.

Routes worth visiting:

- `/` — home
- `/studio` — Sanity Studio (needs `NEXT_PUBLIC_SANITY_PROJECT_ID`)
- `/dashboard` — internal dashboard (Basic Auth)
- `/r/<token>` — tokenised prospect redirect
- `/contact` → POST `/api/book`

---

## Environment variables

Copy `.env.example` to `.env.local` (local) or paste into Vercel's project
settings (production). Everything is optional in dev — the app degrades
gracefully.

### Microsoft Graph (booking + transactional email)

| Variable | Purpose |
|---|---|
| `AZURE_TENANT_ID` | The CAWT M365 tenant ID. |
| `AZURE_CLIENT_ID` | App registration client ID. |
| `AZURE_CLIENT_SECRET` | App registration client secret. |
| `BOOKING_MAILBOXES` | Comma-separated UPNs (e.g. `neerajaggarwal@cawt.ai,niyati@cawt.ai`). Round-robin pool. |
| `NOTIFICATION_FROM_MAILBOX` | Mailbox used to send confirmation emails. Defaults to first booking mailbox. |
| `NOTIFICATION_CC` | Comma-separated CC list (e.g. `contact@cawt.ai`). |
| `BOOKING_TIMEZONE` | IANA timezone for slot selection. Default `Asia/Kolkata`. |
| `BOOKING_WORK_START` / `BOOKING_WORK_END` | Working hours (24h). Default `10` / `18`. |
| `BOOKING_DURATION_MIN` | Meeting length. Default `30`. |
| `BOOKING_LOOKAHEAD_DAYS` | Search window. Default `7`. |
| `BOOKING_NOTICE_MIN` | Earliest slot from now. Default `60` minutes. |

### MongoDB Atlas

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Atlas connection string (free M0 tier is plenty). |
| `MONGODB_DB` | Database name. Default `cawt`. |

Collections used: `enquiries`, `events`, `prospect_visits`, `state`.

### Sanity CMS

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID. |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name. Default `production`. |
| `SANITY_API_READ_TOKEN` | Read token (only needed for drafts/previews). |

### Analytics

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX`. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Clarity project ID. |

### Internal dashboard

| Variable | Purpose |
|---|---|
| `DASHBOARD_BASIC_AUTH_USER` | Basic auth username. **Required in production.** |
| `DASHBOARD_BASIC_AUTH_PASSWORD` | Basic auth password. **Required in production.** |

---

## Microsoft Graph — what Neeraj's IT must do

This is the one piece I cannot configure for him. Send him this checklist:

1. **Azure AD app registration** in the CAWT M365 tenant.
   - Azure portal → Azure AD → App registrations → New registration.
   - Name: `cawt-website-booking`. Single tenant.
2. **API permissions** (Application — not Delegated):
   - `Calendars.ReadWrite`
   - `Mail.Send`
   - `MailboxSettings.Read`
   - `User.Read.All`
   - **Click "Grant admin consent for {tenant}"** after adding.
3. **Application Access Policy** — restrict the app to only the 4 booking
   mailboxes. PowerShell, ~5 minutes:
   ```powershell
   Connect-ExchangeOnline
   New-ApplicationAccessPolicy `
     -AppId <client-id> `
     -PolicyScopeGroupId <mail-enabled-security-group> `
     -AccessRight RestrictAccess `
     -Description "Restrict CAWT website to booking mailboxes only"
   ```
4. **Client secret** — App registration → Certificates & secrets → New
   client secret. Copy and share via password manager (not email).
5. **Provide:** Tenant ID, Client ID, Client Secret, list of booking
   mailbox UPNs.

Drop these into Vercel project settings as encrypted env vars. Booking
goes live the moment they're present.

---

## Sanity Studio setup

1. Create a Sanity project at https://www.sanity.io/manage.
2. Note the `projectId`. Add it as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. From the project root, run:
   ```bash
   npx sanity@latest login
   npx sanity@latest cors add https://www.cawt.ai --credentials
   ```
4. Visit `https://www.cawt.ai/studio` — log in with the Sanity-managed
   account. Add authors, categories, posts. Posts go live at `/insights`
   within 60 seconds (ISR).

---

## Vercel deployment

First-time deploy (one-shot, no GitHub needed):

```bash
npm install -g vercel
vercel login                     # browser flow
vercel link                      # pick / create the project (region: bom1)
vercel env pull .env.local       # syncs env from Vercel (optional)
vercel deploy --prod
```

Subsequent deploys: just `vercel deploy --prod`. If GitHub is connected,
every push to `main` auto-deploys.

### Custom domain — cawt.ai

1. In the Vercel project → Settings → Domains → add `cawt.ai` and
   `www.cawt.ai`.
2. Vercel shows DNS records. Add them at whoever hosts cawt.ai's DNS
   (typically a CNAME for `www`, an A record for the apex). Vercel
   issues a free Let's Encrypt cert automatically.

---

## Handover to CAWT

When ready to transfer ownership to the client:

1. **GitHub:** transfer the repository to CAWT's GitHub org (or hand them
   the zip and a fresh repo).
2. **Vercel:** Settings → Advanced → "Transfer Project" → CAWT's Vercel
   team. Re-add env vars under their account.
3. **Sanity:** Settings → "Transfer ownership" → invite CAWT admin →
   promote to owner → leave.
4. **MongoDB Atlas:** Organisation → Settings → invite CAWT admin →
   promote to Owner → leave.
5. **Google Analytics 4:** Admin → Account access management → grant
   `Administrator` to CAWT account.
6. **Microsoft Clarity:** Settings → Team → invite CAWT admin → promote
   to Admin.
7. **Azure AD app registration:** lives in CAWT's tenant from day one —
   nothing to transfer.
8. **DNS for cawt.ai:** CAWT keeps; just remove me from any registrar.
9. **Secrets:** share via password manager (1Password / Bitwarden vault),
   then rotate.

The codebase is plain Next.js / React / TS — any mid-level developer can
pick it up. The `proxy.ts` file (auth gate) and the booking pipeline in
`src/lib/booking.ts` are the two non-obvious bits.

---

## Architecture quick map

```
src/
├── app/
│   ├── (marketing pages)
│   ├── api/
│   │   ├── book/route.ts         POST: contact form → booking pipeline
│   │   └── track/route.ts        POST: page_view events
│   ├── r/[token]/route.ts        GET: tokenised prospect redirect + cookie
│   ├── dashboard/                Internal prospect dashboard
│   ├── studio/[[...tool]]/       Embedded Sanity Studio
│   └── layout.tsx                Root — fonts, consent, analytics, tracker
├── components/
│   ├── analytics.tsx             GA4 + Clarity (consent-gated)
│   ├── consent-provider.tsx      Context for cookie state
│   ├── cookie-banner.tsx         Banner + settings modal
│   ├── page-tracker.tsx          Fires page-view events
│   ├── site-header.tsx           Sticky header with nav
│   ├── site-footer.tsx
│   ├── portable-text.tsx         Sanity Portable Text renderer
│   └── (primitives)              Container, Section, Eyebrow, CTA, etc.
├── lib/
│   ├── site.ts                   Site metadata + nav config
│   ├── founders.ts               Founder data
│   ├── booking.ts                Round-robin scheduler
│   ├── graph.ts                  Microsoft Graph client
│   ├── mongo.ts                  Mongo client
│   ├── sanity.ts                 Sanity client + GROQ queries
│   ├── consent.ts                Consent state machine + regime detection
│   └── env.ts                    Validated env access
├── proxy.ts                      Next 16 middleware — gates /dashboard
sanity/
└── schemas/                      Post, Author, Category schemas
sanity.config.ts                  Studio config
vercel.json                       Region (bom1), function memory/timeouts
```

---

## Stack

- Next.js **16.2** (App Router, Turbopack)
- React 19.2
- TypeScript 5
- Tailwind CSS 4
- Sanity v5 + next-sanity 12
- MongoDB 7 driver
- Microsoft Graph Client v3 + Azure Identity v4
- Framer Motion (available; used sparingly)
- date-fns, zod, react-hook-form

---

## Maintenance notes

- **Sanity studio is heavy.** First `/studio` load can take 10+ seconds on
  cold start. This is normal and only affects admins.
- **Microsoft Graph `getSchedule`** has a 62-day max window. We use 7 days.
- **Mongo free tier (M0)** has a connection cap of ~500. Plenty for this
  traffic. Upgrade to M10 if outbound from the dashboard is heavy.
- **Vercel free tier** covers ~100GB bandwidth / month. Pro tier ($20/mo)
  required for advanced analytics, longer build minutes and team seats.
- **Pin Next 16 carefully.** v17+ will introduce more breaking changes —
  read the upgrade guide before bumping.
