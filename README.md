# Project Nilgiri Tahr

Public website for the Tamil Nadu Forest Department's conservation programme for the
Nilgiri Tahr, the state animal. A single Next.js application covering the public
conservation site, a Sanity-authored newsroom, online donations, a merchandise store, and
an admin dashboard.

## Prerequisites

- Node.js 20 or later
- npm (the repo commits `package-lock.json`)
- Accounts/credentials for Sanity, Supabase, Razorpay, Resend and Upstash Redis

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000 and Sanity Studio at http://localhost:3000/studio.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve a production build |
| `npm run lint` | ESLint (note: linting is skipped during builds — see `next.config.ts`) |

There is no test suite. Verify changes by running the app. `npx tsc --noEmit` is the
effective type gate, since ESLint does not run at build time.

## Environment variables

Copy the names below into `.env.local`; values are not in the repo. Production values are
set in the Vercel project dashboard.

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

The Supabase Edge Functions in `supabase/functions/` read their own secrets, set with
`supabase secrets set`: `PROJECT_URL`, `SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`RESEND_FROM_EMAIL` and `ADMIN_NOTIFY_EMAIL`.

## Key routes

| Route | What it is |
|---|---|
| `/` | Public conservation site |
| `/news-categories` | Newsroom — posts and posters authored in Sanity |
| `/donate` | Donation flow (Razorpay) |
| `/e-com` | Merchandise store — **checkout is incomplete**, see `requirements.md` |
| `/studio` | Sanity Studio, gated by Sanity's own login |
| `/admin` | Entry point — CMS access and dashboard login |
| `/donation-admin` | Admin dashboard, gated by JWT in `src/middleware.ts` |

## Payments

Razorpay currently runs on **test keys only**. No live account has been opened and no
real payment has ever been processed. Outstanding business, KYC and compliance items are
tracked in [`requirements.md`](requirements.md).

## Further reading

- [`CLAUDE.md`](CLAUDE.md) — architecture, conventions, data model and known rough edges
- [`requirements.md`](requirements.md) — outstanding business and compliance requirements

## Deployment

Deployed on Vercel. Environment variables are managed in the Vercel project dashboard.
