# CAWT Website — Developer Guide

A practical guide for a developer picking this project up to **extend and maintain** it.
It focuses on *how to make changes*. For first-time setup, environment variables,
Microsoft Graph / Sanity / Mongo provisioning and ownership handover, read
[`README.md`](./README.md) and [`SETUP.md`](./SETUP.md) first — this guide does not repeat them.

---

## 0. TL;DR — get running in 3 commands

```bash
npm install
cp .env.example .env.local     # everything is optional in dev; app degrades gracefully
npm run dev                     # http://localhost:3000
```

- `npm run dev` — local dev server (hot reload)
- `npm run lint` — ESLint (run before every commit; CI/Vercel will fail on errors)
- `npm run build` — production build **locally** (only to catch build errors; you do NOT need this to deploy)

You can develop the whole marketing site with **no env vars at all**. Booking, analytics,
CMS and the dashboard simply no-op or fall back until their keys are present.

---

## 1. Read this first — it is NOT stock Next.js

This repo runs **Next.js 16 (App Router + Turbopack)** with React 19 and Tailwind v4.
See [`AGENTS.md`](./AGENTS.md):

> This version has breaking changes — APIs, conventions and file structure may differ
> from older Next.js. Check `node_modules/next/dist/docs/` before relying on training-data habits.

Concrete differences you will hit:

| Thing | Here | Old Next.js |
|---|---|---|
| Middleware file | **`src/proxy.ts`** | `middleware.ts` |
| Dynamic route params | `params` is a **Promise** — `const { slug } = await params` | plain object |
| Styling | **Tailwind v4** (CSS-first config in `src/app/globals.css`, no `tailwind.config.js`) | v3 + JS config |
| Server vs Client | Everything is a **Server Component** unless the file starts with `"use client"` | — |

When in doubt, copy the pattern from an existing file rather than inventing one.

---

## 2. Project map (what lives where)

```
src/
├── app/                         # Routes (App Router — folder = URL segment)
│   ├── page.tsx                 # Home
│   ├── about/ contact/ leadership/ insights/ ...   # marketing pages
│   ├── private-client/          # Overview page.tsx + [slug] detail route
│   ├── fund-services/           # Overview page.tsx + [slug] detail route
│   ├── corporate-services/      # Overview page.tsx + [slug] detail route
│   ├── api/book/route.ts        # POST: contact form → booking pipeline
│   ├── api/track/route.ts       # POST: prospect page-view events
│   ├── r/[token]/route.ts       # GET: tokenised prospect redirect + cookie
│   ├── dashboard/               # Basic-auth internal dashboard
│   ├── studio/[[...tool]]/      # Embedded Sanity Studio (/studio)
│   ├── layout.tsx               # Root layout: fonts, header, footer, consent, analytics
│   └── globals.css              # Tailwind v4 config + design tokens (colours, fonts)
├── components/                  # Reusable UI (see §4)
├── lib/                         # Data + integrations (see §3)
├── proxy.ts                     # Middleware (gates /dashboard)
sanity/schemas/                  # Blog content model (post, author, category)
sanity.config.ts                 # Studio config
next.config.ts                   # Image remote hosts, formats
vercel.json                      # Deploy region (bom1), function limits
```

**The mental model:** most of the site is *content-driven*. Copy, nav and service
definitions live in a few `src/lib/*.ts` files and page-level arrays — you rarely
touch layout/markup to change wording.

---

## 3. Where the content lives (edit these, not the markup)

### `src/lib/site.ts` — the single source of truth for company data + navigation
- Company name, emails, phones, addresses, CIN, co-founders.
- `nav.primary` — the header menu, including the Private/Fund/Corporate dropdowns.
- **Change a phone number, email, or a nav label here and it updates everywhere** (header, footer, contact page all read from `site`).

### `src/lib/service-pages.ts` — all service **detail** pages, as data
Three arrays: `privateClientServices`, `fundServices`, `corporateServices`.
Each entry is a `ServicePage`:

```ts
{
  slug: "wills-execution",              // → /private-client/wills-execution
  href: "/private-client/wills-execution",
  category: "Private Clients",
  eyebrow: "Private Clients",
  title: "Wills & Executorship Services",
  lead: "Bespoke wills, codicils, ...", // subtitle under the hero
  photoKey: "estateBand",               // key into src/lib/photos.ts
  sections: [
    { title: "What We Do", body: "…", bullets: ["Will Drafting", "Codicils", …] },
    { title: "Outcome",    body: "…" },  // bullets optional
  ],
}
```

These render automatically through the dynamic route `…/[slug]/page.tsx`, which calls
`getService(category, slug)` and hands the object to
[`src/components/service-detail-page.tsx`](./src/components/service-detail-page.tsx).
**You never write JSX to add a service page — you add a data object.**

### Overview pages carry their own card arrays
`private-client/page.tsx` and `fund-services/page.tsx` each define a local `services`
array for the **overview grid cards** (title / body / bullets shown on the landing page).
`corporate-services/page.tsx` is different — its cards read straight from
`corporateServices` in `service-pages.ts`.

> ⚠️ Consequence: for Private Client and Fund Services, a service's copy exists in **two
> places** — the overview card array *and* the `service-pages.ts` detail object. If you
> change a title or bullets, update **both** so the landing card and the detail page match.
> (This is exactly what the July client-feedback round touched — see §9.)

### `src/lib/photos.ts` — image registry
Maps `photoKey`s (e.g. `estateBand`, `giftCityBand`) to image URLs + focal point + alt text.
Add a key here, then reference it from a `ServicePage.photoKey` or `<PageHero photoKey=…>`.

### `src/lib/founders.ts` — founder bios (used on `/leadership` and home strip).

---

## 4. UI building blocks (use these for a consistent look)

Compose pages from these primitives instead of raw `<div>`s — they encode the design system.

| Component | Purpose | Key props |
|---|---|---|
| `Section` | Full-width band + vertical rhythm | `tone`: `ivory` \| `ivory-2` \| `ink` \| `ink-2`; `className`, `id` |
| `Container` | Centered max-width wrapper | `width`: `default` \| `wide` |
| `Eyebrow` | Small uppercase kicker with rule | `tone`: `bronze` \| `ivory` \| `ink` |
| `PageHero` | Standard page hero (photo + title + lead) | `photoKey`, `eyebrow`, `title`, `description` |
| `CTA` | Button / link | `href`, `variant`: `primary` \| `secondary` \| `ghost` \| `outline-ivory`; `size` |
| `ServiceDetailPage` | Renders a `ServicePage` object end-to-end | `service` |
| `Reveal` | Scroll-in animation wrapper | `index` (stagger) |
| `DiagramHubSpoke`, `DiagramLifecycle`, … | Inline SVG diagrams | see `components/diagrams.tsx` |

**Colour / tone rules of thumb**
- `tone="ivory"` / `ivory-2` → light section, use `text-ink` for copy, `Eyebrow tone="bronze"`.
- `tone="ink"` / `ink-2` → dark section, use `text-ivory`, `CTA variant="secondary"` (bronze) so the button reads on dark.
- Accent colour is **bronze** (`text-bronze` / `bg-bronze`); italic bronze spans are the house style for the second half of a headline.
- Design tokens (the actual hex values, fonts `--font-display` Fraunces / Inter) live in `src/app/globals.css`. Change a brand colour there, once.

---

## 5. Common tasks (recipes)

### Change a phone number, email, address, or company name
Edit `src/lib/site.ts`. Done — header, footer and contact page all update.

### Rename a nav item
Edit the matching `label` in `nav.primary` in `src/lib/site.ts`. Keep the `href` unchanged
unless you also rename the route folder/slug.

### Add a new service page (Private / Fund / Corporate)
1. Add a `ServicePage` object to the right array in `src/lib/service-pages.ts` (pick a unique `slug`).
2. Add a nav child under the right dropdown in `src/lib/site.ts` (`href: "/…/<slug>"`).
3. Add an overview card:
   - Private Client / Fund Services → add to the local `services` array in that page's `page.tsx`.
   - Corporate Services → nothing to do; it maps over `corporateServices` automatically.
4. Ensure `photoKey` exists in `src/lib/photos.ts`.
The detail page at `/…/<slug>` renders automatically via the `[slug]` route.

### Edit copy/bullets on an existing service
Update **both** the overview card array (in the overview `page.tsx`) **and** the detail
object (in `service-pages.ts`) — see the warning in §3.

### Add a brand-new marketing page (e.g. `/careers`)
Create `src/app/careers/page.tsx`, `export const metadata`, and default-export a component
built from `PageHero` + `Section`/`Container`. Add a nav entry in `site.ts` if it should be linked.

### Change the homepage hero carousel
Edit the `slides` array in `src/components/hero-carousel.tsx` (eyebrow, headline, blurb, sub-list).
The service box is height-locked (`min-h` on the `<ul>`) so all slides stay the same size — keep that.

### Edit a diagram
All diagrams are hand-authored inline SVG in `src/components/diagrams.tsx`. The family-office
wheel is `DiagramHubSpoke` (its six labels are the `spokes` array). Node circle radius and font
size are set there; bump them together if labels overflow.

### Add or edit a blog / insights post
Content is **not** in code — it's in **Sanity**. Go to `/studio` (needs
`NEXT_PUBLIC_SANITY_PROJECT_ID`), log in, add a Post. It appears at `/insights/<slug>`
within ~60s (ISR). The content model is in `sanity/schemas/`; the renderer is
`src/components/portable-text.tsx`.

### Add a legal/policy page
Legal pages (`/privacy`, `/terms`, `/disclosures`) share `src/components/legal-page.tsx`.
Follow one of the existing pages as a template.

---

## 6. Backend touchpoints (only if you extend features)

| Area | Entry point | Notes |
|---|---|---|
| Contact form → booking | `src/app/api/book/route.ts` → `src/lib/booking.ts` → `src/lib/graph.ts` | zod-validated, writes Mongo, round-robins mailboxes, books via MS Graph, emails confirmation. No-ops cleanly if Graph env absent. |
| Prospect tracking | `src/app/r/[token]/route.ts`, `src/components/page-tracker.tsx`, `src/app/api/track/route.ts` | Token cookie `cawt_p` (90d); visits stored in Mongo. |
| Internal dashboard | `src/app/dashboard/*`, gated by `src/proxy.ts` + `src/lib/dashboard-auth.ts` | Basic auth. Dev creds `dev` / `dev`. |
| Consent / cookies | `src/components/consent-provider.tsx`, `cookie-banner.tsx`, `src/lib/consent.ts` | Region-aware (EEA/UK opt-in). Analytics load only after consent. |
| Env access | `src/lib/env.ts` | Centralised, validated reads — add new env vars here, not `process.env` scattered around. |

Data lives in MongoDB collections: `enquiries`, `events`, `prospect_visits`, `state`.

---

## 7. Dev → deploy workflow

```bash
npm run lint                     # must pass
git add -A && git commit -m "…"  # work on a feature branch, not main
```

**Deploying (Vercel builds on their side — do not run a local prod build to "deploy"):**

```bash
vercel deploy            # → PREVIEW / stage URL (safe, shareable, does not touch production)
vercel deploy --prod     # → PRODUCTION (aliased to cawt-website.vercel.app / cawt.ai)
```

- Use a **preview** deploy to review changes on a real URL before going live.
- If GitHub is connected to the Vercel project, pushes to `main` auto-deploy to production
  and every branch/PR gets its own preview URL.
- The project is linked via `.vercel/` (git-ignored). A fresh clone runs `vercel link` once.

---

## 8. Gotchas / house rules

- **Run `npm run lint` before committing.** Vercel's build fails on ESLint errors; unused
  imports and unescaped apostrophes in JSX (`&apos;`) are the usual culprits.
- **Two-places rule** for Private/Fund service copy (overview card *and* detail object).
- **`params` is a Promise** in dynamic routes — `await` it.
- **Middleware is `src/proxy.ts`**, not `middleware.ts`.
- **Tailwind v4** — no `tailwind.config.js`; tokens/utilities are configured in `globals.css`.
- **Remote images** must have their host allow-listed in `next.config.ts` (`images.remotePatterns`).
- **Pin Next 16** deliberately; read the upgrade guide before bumping major versions.
- Keep `.env.local` out of git (it already is) and never paste secrets into source.

---

## 9. Context: July 2026 client-feedback round (round 2)

The most recent content pass applied the client's "final changes" PDF. Touch-points, so you
know where recent edits landed:

- `src/lib/site.ts` — footer company name now includes **"Global"**; several nav labels renamed.
- `src/app/contact/page.tsx` — "Contact Us" cap; first block is company-only; founders moved to their own block.
- `src/components/site-footer.tsx` — contact section now mirrors the contact page (company + all founders).
- `src/app/about/page.tsx` — current-year numbers moved directly under the hero.
- `src/app/fund-services/page.tsx` — "Fund Accounting & Administration" card bullets updated.
- `src/app/private-client/page.tsx` — service card titles/bullets, reduced hub padding, dark CTA band ("Speak to our team").
- `src/components/diagrams.tsx` — `DiagramHubSpoke` six spoke labels relabelled.
- `src/lib/service-pages.ts` — titles/leads/bullets for Wills, Family Trust, Business Holding Trusts, Family Constitution, Cross Border/GIFT City, Citizenship & Residency, Wealth Protection, Setup Services, Registered Office.
- `src/components/hero-carousel.tsx` — service box height equalised; sub-labels aligned to new titles.

The source feedback documents are in the sibling `feedbacks/` folder.

---

## 10. Stack reference

Next.js 16.2 · React 19.2 · TypeScript 5 · Tailwind 4 · Sanity v5 (`next-sanity` 12) ·
MongoDB 7 driver · Microsoft Graph Client v3 + Azure Identity v4 · Framer Motion ·
zod · react-hook-form · date-fns · lucide-react (icons).

Any mid-level React/Next developer can maintain this. The two non-obvious areas are the
booking pipeline (`src/lib/booking.ts`) and the auth gate (`src/proxy.ts`).
