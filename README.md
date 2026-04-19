# Versani Website

The public marketing and admin site for **Versani** — an AI-powered hair color
consultation platform built exclusively for professional colorists.

> **Beauty Meets Intelligence.**

This repo is the brochure + commerce + admin site. The production app
(consultation, formula lab, Ask Versani) lives in a separate codebase
(`salon-muse-pro`) and shares auth + billing with this site via Supabase.

---

## Tech stack

- **Next.js 15.1** (App Router, server components by default)
- **React 19**
- **TypeScript 5.7** (strict)
- **Tailwind CSS 3.4** with oklch design tokens mirrored from the app
- **Motion** (Framer Motion) for entrance animations
- **clsx** + **tailwind-merge** for className composition
- Fonts: **Cormorant Garamond** (editorial serif) + **Inter** (sans),
  loaded via `next/font/google`

---

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available scripts:

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start dev server                     |
| `npm run build`     | Production build                     |
| `npm start`         | Start production server              |
| `npm run lint`      | Lint via `next lint`                 |
| `npm run type-check`| Type-check with `tsc --noEmit`       |

---

## Project structure

```
app/
├── layout.tsx              # Root layout, metadata, fonts, JSON-LD
├── page.tsx                # Homepage (Hero + placeholder sections)
├── globals.css             # Tailwind directives + oklch design tokens
├── manifest.ts             # PWA manifest
├── robots.ts               # robots.txt generator
├── sitemap.ts              # Dynamic sitemap
├── opengraph-image.tsx     # Dynamic OG image (Edge runtime)
└── admin/
    ├── layout.tsx          # Placeholder admin layout (feature-flagged)
    └── page.tsx            # Admin dashboard stub

components/
├── VersaniWordmark.tsx     # Gold serif wordmark
├── cn.ts                   # Re-export of the cn() utility
├── nav/
│   ├── SiteNav.tsx         # Top navigation
│   └── SiteFooter.tsx      # Luxury footer
├── sections/
│   └── Hero.tsx            # Homepage hero
└── ui/
    └── Button.tsx          # Gold solid / outline / ghost variants

lib/
├── cn.ts                   # clsx + tailwind-merge utility
├── supabase.ts             # Supabase client stub
└── stripe.ts               # Stripe client stub

public/
└── versani-monogram.png    # V monogram (favicon + PWA icon)
```

---

## Design system

Colors, typography, and motion are mirrored from the Versani app so the
website and product feel like a single brand:

- Dark oklch surfaces with a cool blue tint (`oklch(0.08 0.01 260)`).
- Signature luxury gold (`oklch(0.76 0.15 85)` ≈ `#D4AF37`).
- Editorial serif (Cormorant Garamond) for display text; Inter for UI.
- Restrained, slow, confident motion (Motion, `cubic-bezier(0.2,0,0,1)`).

Tokens live in `app/globals.css` and map through `tailwind.config.ts` so you
can use `bg-card`, `text-foreground`, `border-border`, `text-gold`, etc.

---

## Admin console

`/admin` is the future operator dashboard. Today it's a stub gated by a
feature flag (`NEXT_PUBLIC_ADMIN_ENABLED=true`). When the Supabase auth
integration lands, real guards will live in `app/admin/layout.tsx` and
middleware. Reports will surface MRR, churn, trial conversion, and
consultation volume.

---

## Connection to the Versani app

- **Auth:** shared Supabase project (same user pool).
- **Billing:** Stripe subscriptions created here; entitlements synced to
  the app via Supabase.
- **Branding:** design tokens in `app/globals.css` mirror the app's
  `src/index.css`. Keep them in sync.

---

## Environment variables

Copy `.env.local.example` to `.env.local`. Key vars:

| Variable                              | Purpose                         |
| ------------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                | Canonical URL for meta/sitemap  |
| `NEXT_PUBLIC_SUPABASE_URL`            | Supabase project URL            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`       | Supabase anon key               |
| `SUPABASE_SERVICE_ROLE_KEY`           | Server-only admin key           |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`  | Stripe publishable key          |
| `STRIPE_SECRET_KEY`                   | Stripe secret (server only)     |
| `STRIPE_WEBHOOK_SECRET`               | Webhook signature secret        |
| `NEXT_PUBLIC_STRIPE_PRICE_*`          | One per tier                    |
| `NEXT_PUBLIC_ADMIN_ENABLED`           | Temporary admin access flag     |

---

## Deployment

Vercel is the intended host.

```bash
npm i -g vercel
vercel link      # first time
vercel env pull  # sync env vars from the dashboard
vercel --prod
```

Security headers, compression, and image formats (AVIF/WebP) are
configured in `next.config.js`.

---

## Roadmap

- [ ] Pricing page with full tier comparison (Free Trial / Pro /
      Studio / Salon per-seat / Custom).
- [ ] Philosophy page.
- [ ] Live Supabase + Stripe wiring.
- [ ] Admin dashboard (real metrics).
- [ ] Case studies and editorial content.

---

## License

Copyright © Versani. All rights reserved.
