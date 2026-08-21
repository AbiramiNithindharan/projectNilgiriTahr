# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

**Project Nilgiri Tahr** — the public website for the Tamil Nadu Forest Department's
conservation programme for the Nilgiri Tahr (state animal). It is a single Next.js
application that carries four distinct surfaces:

1. **Public conservation site** — home, who-we-are, what-we-do, photo gallery, and a
   set of protected-area / administrative-unit pages.
2. **Newsroom** — categories, posts and downloadable posters, authored in Sanity Studio.
3. **Donations** — Razorpay checkout, signature verification, Supabase persistence, and
   an emailed PDF receipt.
4. **Merchandise store (`/e-com`)** — *work in progress, see "Current state" below.*
5. **Admin dashboard (`/donation-admin`)** — donations, contact messages, volunteer
   registrations, and product CRUD, behind JWT auth.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript (strict) |
| Styling | **CSS Modules**, one `*.module.css` per component/route. No Tailwind, no CSS-in-JS. |
| CMS | Sanity v4, Studio embedded at `/studio` via `next-sanity` |
| Database / storage | Supabase (Postgres + Storage bucket `products`) |
| Serverless | 3 Supabase Deno Edge Functions in `supabase/functions/` |
| Payments | Razorpay (checkout.js loaded client-side + server order/verify/webhook) |
| Auth (admin) | `jose` JWT in an httpOnly `admin_token` cookie, enforced in `src/middleware.ts` |
| Rate limiting | Upstash Redis (`@upstash/ratelimit`) |
| Email | Resend; PDF receipts generated with `pdf-lib` |
| Animation / UI | Framer Motion, Swiper, `@tanstack/react-table`, `react-hot-toast`, `lucide-react` |
| Deployment | **Vercel** — env vars are set in the Vercel project dashboard |

Package manager is **npm** (`package-lock.json` is committed).

## Commands

```bash
npm run dev      # next dev — http://localhost:3000, Studio at /studio
npm run build    # next build
npm start        # next start
npm run lint     # next lint  (NOTE: eslint is ignored during builds, see next.config.ts)
```

There is **no test suite** in this repo. Do not claim a change is verified by tests;
verify by running the app.

## Layout

```
src/
  app/                      App Router. Public pages, /studio, /admin, /donation-admin, /e-com, /api
    api/                    Route handlers (see "API surface")
    layout.tsx              Root layout: fonts, Toaster, ClientProtection
    client-layout.tsx       Client wrapper: Header/Footer + CartProvider, hides chrome per route
  components/               Shared components, each in its own folder with a .module.css
  context/CartContext.tsx   Cart state, persisted to localStorage
  data/                     Hard-coded page content (administrativeAreas, gallery data)
  lib/
    dashboard/auth/         jwt, cookies, requireAdmin, verify-csrf
    dashboard/security/     audit-log, in-memory rateLimiter
    redis/                  Upstash client, named rate limiters, getIP
    validation/             contact + volunteer validators, in-memory rate limit
    sanityClient.ts  supabaseClient.ts  supabaseServer.ts  razorpay.ts  email.ts  verifyWebhook.ts
  sanity/                   Schema types, structure, image builder, live client
  middleware.ts             Security headers + /donation-admin route protection
supabase/functions/         Deno edge functions: contact-email, volunteer-register, send-email
```

Path alias: `@/*` → `./src/*`.

### Conventions to follow

- One component per folder, colocated with its CSS Module: `components/Foo/Foo.tsx` +
  `Foo.module.css`. Match this when adding components.
- Route pages that need interactivity are split into a server `page.tsx` plus a
  `*Client.tsx` marked `"use client"` (e.g. `banner-content-1/`, `news-categories/`).
  Several older pages mark `page.tsx` itself as a client component — both patterns exist.
- Static page copy lives in `src/data/` or inline consts in the page (see
  `victory-sections/[victorySectionId]/page.tsx`), *not* in the CMS. Only newsroom
  content is CMS-driven.
- Images: remote images are restricted to `cdn.sanity.io` in `next.config.ts`. Supabase
  Storage URLs are used with plain `<img>` tags, not `next/image`.

## Two Supabase clients — pick deliberately

- `supabaseClient` (`lib/supabaseClient.ts`) — **anon** key, safe for the browser.
- `supabaseAdmin` (`lib/supabaseServer.ts`) — **service role** key, server-only.
  Never import this into a client component.

All server routes use `supabaseAdmin`. The anon client is now used in exactly one place —
`e-com/store/[id]/page.tsx`, a browser-side read of the public product catalogue. Keep it
that way: if a query needs privileges, it belongs in a route handler behind
`requireAdmin()`, not in a client component.

## Auth model

There are **two independent** access mechanisms:

1. **Dashboard admin** — `POST /api/donation-admin/login` checks credentials against
   `DONATE_ADMIN_USER` / `DONATE_ADMIN_PASS`, signs a 2h JWT into an httpOnly
   `admin_token` cookie, plus a readable `csrf_token` cookie. `src/middleware.ts`
   redirects unauthenticated `/donation-admin/*` requests to `/admin?tab=donation`.
   Mutating admin routes call `requireAdmin()` **and** `verifyCSRF()`; the client reads
   the `csrf_token` cookie and sends it as the `x-csrf-token` header.
2. **CMS access** — `POST /api/verify-password` checks a single `ADMIN_PASSWORD` and sets
   an `adminAuth` cookie, then the client redirects to `/studio`. **Nothing enforces this
   cookie, by decision** — Sanity's own login is the intended and only gate on `/studio`.
   A guard was drafted in `middleware.ts` but checked the wrong cookie (`admin_token`,
   which comes from the *dashboard* login, not the CMS one) and would have locked out
   content editors; it has been removed. `/studio` stays in the middleware matcher so
   security headers still apply.

`/admin` is the single current entry point (tabbed: "News Admin" / "Dashboard Login").
**`/cms-access-portal` is dead code** — a legacy duplicate of the CMS tab. Leave it alone
unless asked to remove it.

## API surface

| Route | Purpose |
|---|---|
| `POST /api/razorpay-order` | Creates a Razorpay order (₹10–₹1,00,000) |
| `POST /api/verify-payment` | Verifies HMAC signature, de-dupes by `payment_id`, inserts into `donations`, emails PDF receipt |
| `POST /api/razorpay-webhook` | Verifies webhook signature. Currently **logs only** — the DB write is a TODO |
| `/api/contact-submit` | `POST` is public (contact form, proxies to the `contact-email` edge function). `GET`/`DELETE`/`PATCH` are **admin-only** via `requireAdmin()` |
| `/api/volunteer-submit` | Same shape for volunteers (`volunteer-register` edge function) |
| `GET /api/donation-admin/donations` | Admin-only donations list |
| `GET /api/donation-admin/stats` | Admin-only dashboard aggregates (donation totals, unique donors, contact counts, latest 5 messages) |
| `POST /api/donation-admin/login`, `/logout` | Session |
| `GET/POST /api/donation-admin/products`, `GET/PUT/DELETE .../products/[id]` | Product CRUD + image upload to the `products` bucket |
| `POST /api/revalidate` | Sanity webhook target — revalidates `/` and category/post paths |
| `POST /api/verify-password` | CMS password gate |
| `GET /api/download` | Proxies a remote file URL as a PDF download |

Public form endpoints use Upstash rate limiters and a `company` honeypot field.

## Database

Schema is managed **by hand in the Supabase dashboard Table Editor**. There are no
migrations in this repo — `supabase/` contains only edge functions. The live database is
the source of truth.

The table below is **inferred from query usage in the code** and may be incomplete or
wrong about types, defaults, and constraints. **Verify in the Supabase dashboard before
relying on it.**

| Table | Columns seen in code |
|---|---|
| `donations` | id, payment_id, order_id, razorpay_signature, receipt_no, name, email, amount, status, created_at |
| `products` | id, title, price, description, product_code, category, image_url, created_at |
| `product_stock` | product_id, size, stock |
| `contact_messages` | id, name, email, message, is_replied, created_at |
| `volunteer_registrations` | id, name, email, phone, interest, is_replied, created_at |
| `admin_logs` | action, admin_username, ip, user_agent |

Storage bucket: `products` (public URLs, files keyed `${Date.now()}-${filename}`).

## Sanity

Document types: `post`, `poster`, `category`, `author`, `blockContent`.
`category.categoryType` (`post` | `poster`) drives the reference filters on both
`post.category` and `poster.category` — keep that in sync if you add types.
Config reads `SANITY_STUDIO_*` first, falling back to `NEXT_PUBLIC_SANITY_*`
(`src/sanity/config.ts`).

## Environment variables

`.env` / `.env.local` are gitignored; production values live in Vercel. Keys in use:

```
NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET / _API_VERSION
SANITY_STUDIO_PROJECT_ID / _DATASET / _API_VERSION
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_FUNCTION_URL
NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
JWT_SECRET, JWT_EXPIRES_IN, DONATE_ADMIN_USER, DONATE_ADMIN_PASS, ADMIN_PASSWORD
RESEND_API_KEY, RESEND_FROM_EMAIL
UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
```

Never print secret values into logs, code, or chat.

## Current state / known rough edges

Things that look like bugs but are known — don't "fix" them as a side effect of
unrelated work, and don't assume they're intentional either. Ask.

- **Razorpay is test-mode only.** No live account has been opened and no KYC has been
  submitted, so no real payment has ever been processed. The donation flow is complete in
  code (order → signature verification → `donations` row → emailed PDF receipt) but runs
  entirely on test keys; donation rows currently in the DB are test data. Outstanding
  business/compliance requirements are tracked in `requirements.md`.
- **E-com checkout is unfinished.** `e-com/checkout/CheckoutClient.tsx` `handleSubmit`
  only `console.log`s the form. There is no orders table, no payment call, and
  `/e-com/order_success` is a static "Payment Successful" page. Store browsing, cart,
  and admin product CRUD do work.
- **The CSP is `Content-Security-Policy-Report-Only`.** It reports violations but blocks
  nothing. Before switching it to enforcing, walk every page — Studio, `/donate`,
  `/e-com`, gallery, news — and clear the console violations. Do not rename the header
  without doing that pass.
- **Public form POSTs have no CSRF check, deliberately.** The `csrf_token` cookie is only
  issued at admin login, so a member of the public has no token and every submission
  would 403. `contact-submit` / `volunteer-submit` `POST` rely on the honeypot, the
  validators and the Upstash rate limiter instead. Admin `DELETE`/`PATCH` on those same
  routes *do* verify CSRF.
- `ClientProtection` blocks right-click and drag **on images only** site-wide, plus
  selection and copy on `/photo-gallery` and `/news-categories`. Text elsewhere is
  selectable by design (screen-reader accessibility). DevTools key-blocking was removed.

## Open questions (unresolved — confirm before assuming)

- **RLS status is still unverified.** Server code no longer depends on it — every
  privileged path uses the service-role key — but nobody has confirmed whether RLS is
  enabled on `donations`, `products`, `product_stock`, `contact_messages`,
  `volunteer_registrations` or `admin_logs`. Target state: RLS **on** everywhere, with
  anon `SELECT` allowed only on `products` and `product_stock` (needed by the public
  catalogue read in `e-com/store/[id]/page.tsx`). Check the dashboard before assuming.
- `ip_address` / `user_agent` are no longer collected on contact and volunteer
  submissions. They were being sent to the edge functions and silently dropped; whether
  to persist them depends on the data-retention answer (R20 in `requirements.md`).

## Working style for this repo

- Don't reformat or restructure files you weren't asked to change.
- Match the existing style: CSS Modules, `@/` imports, `NextResponse.json`, and the
  existing emoji-prefixed `console.log`/`console.error` conventions in route handlers.
- Secrets, admin credentials, and payment logic (`verify-payment`, `verifyWebhook`) are
  security-sensitive. Flag rather than silently alter the signature-verification paths.
