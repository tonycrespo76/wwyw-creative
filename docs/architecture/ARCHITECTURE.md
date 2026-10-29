# WWYW Architecture (Phase 0 proposal)

Status: proposal, revised for the decisions in `DECISIONS.md` (Auth.js v4, Hostinger shared plan, Hostinger storage, GA4 + GTM). Nothing is scaffolded.
Note: written from PHASE0.md, PRODUCT.md and the session brief; the full 29-section spec was not available to this session, so section-number references need a check against it.

## Stack
Next.js 16.4.3 App Router, React 19.3.1, TypeScript strict, CSS Modules + CSS custom properties (no Tailwind/Bootstrap), GSAP 3.15.0 + ScrollTrigger, Drizzle ORM 0.45.4 on Neon Postgres (`@neondatabase/serverless` 1.2.0), Zod 4.6.7, Vitest 5.0.5, Playwright 1.64.1, SMTP2GO (HTTP API), Stripe, GA4. Stable versions only (no prereleases).

## Runtime topology
- **Web process**: one Next.js app (`next start`), Node 24.
- **Job runner**: `background_jobs` drained with `FOR UPDATE SKIP LOCKED` by a cron-triggered endpoint (see consequences below; a dedicated worker only if hosting changes). Handles scheduled publishing, email send/retry, Stripe webhook reconciliation, sitemap/search-index rebuilds, GA4 report pulls. 
- **Postgres**: Neon (pooled URL for web, direct URL for migrations/worker).
- **Media storage**: Hostinger plan disk behind a `MediaStorage` interface. DB stores metadata only.
- **Edge**: Hostinger-managed TLS; Cloudflare proxy in front recommended for CDN/WAF. Security headers set in Next config.

## Source layout (planned)
```
src/
  app/
    (public)/        public site, rendered from page JSON
    (auth)/          login, OTP, TOTP enrol/verify
    (admin)/admin/   CMS, CRM, payments, SEO, analytics, settings
    portal/          reserved, Phase 2
    api/             route handlers: forms, stripe webhook, media, health
  cms/
    registry/        typed component registry (schema + renderer + editor per component)
    page-model/      versioned JSON schema, migrations, validators
  server/
    db/              drizzle schema, migrations, queries
    auth/            session, MFA, RBAC policy
    jobs/            queue + handlers
    services/        email, stripe, storage, analytics
  styles/            tokens.css, globals, per-surface themes
docs/
tests/               unit (vitest), e2e (playwright)
```

## Key design rules
1. **Page model**: each page has `page_versions` rows holding JSON `{schemaVersion, blocks:[{id,type,props}]}`. Only registered block types render; props validated by Zod on write and on render. No arbitrary HTML/JS/CSS. Publish = pointer swap to a version; drafts, history and rollback come free.
2. **Rendering**: public pages are server components reading the published version, cached with tag-based revalidation (`revalidateTag` on publish). GSAP runs in small client islands only; every animation has a `prefers-reduced-motion` path and a CMS motion setting.
3. **Auth**: Auth.js v4 Credentials; email OTP first factor, TOTP required second factor for all admin roles. JWT session plus DB revocation check, rate limits and lockout, hashed recovery codes.
4. **Authorization**: central `can(user, action, resource)` policy keyed on the seven roles (Super Admin, Administrator, Editor, Content Manager, Marketing, Finance, Viewer); checked in every server action/route handler, never only in UI. Middleware is a coarse gate only.
5. **Forms/leads**: public forms are CMS-defined, validated server-side, spam-protected: **Cloudflare Turnstile is required on every public form** (token verified server-side against Cloudflare siteverify before any processing, single-use, hostname and action checked), plus honeypot and rate limiting. Same for admin login/OTP request forms. No form block can be published without Turnstile enabled, stored as `leads`, emailed via queued job.
6. **Payments**: Stripe Checkout/Invoices; webhook is the source of truth (signature verified, idempotent via `stripe_events`). Test mode until explicitly switched.
7. **SEO/AEO**: per-page meta, OpenGraph, JSON-LD built from CMS data, sitemap.xml, robots.txt, llms.txt option. Structured data only from real content.
8. **Analytics**: GA4 (consent-gated); admin dashboard reads GA4 Data API through a service account, cached in DB. GTM per D5.
9. **Security**: CSP with nonces, HSTS, secure cookies, CSRF via same-site + origin checks on actions, audit log for all admin writes, secrets only in env, no secrets in client bundles.
10. **No fake functionality**: any module not built shows as absent, not as a stub screen; no seeded fake clients, metrics or testimonials. Placeholder slots are visibly marked and block publishing.

## Quality gates
WCAG 2.2 AA; LCP 2.5s / INP 200ms / CLS 0.1 budgets checked in CI via Playwright + Lighthouse; `tsc --noEmit`, ESLint, Vitest, Playwright on every PR.

## Consequences of the chosen decisions
- **Auth.js v4**: App Router support is partial, and the Credentials provider forces JWT sessions. Plan: v4 Credentials provider wrapping our own OTP + TOTP verification, short-lived signed JWT in an httpOnly cookie, and a `session_version` / `revoked_sessions` check in the DB on every privileged action so logout, role changes and lockout take effect immediately. Authorization always re-reads the user from the DB. Migrating to v5 stable later should be contained to `server/auth/`.
- **Shared hosting, no worker**: a long-lived worker cannot be assumed. The `background_jobs` queue stays, but is drained by (a) a Hostinger cron job calling a secret-protected `POST /api/internal/jobs/run` every minute, and (b) opportunistic draining after relevant requests. Handlers must be idempotent, time-boxed (<25s) and resumable. Open risks to test on the actual plan before building on it: cron minimum interval, Node memory/process limits, outbound HTTPS to Neon/SMTP2GO/Stripe, and whether `next start` is supported with our Node version.
- **Hostinger storage**: Hostinger has no S3-compatible object store, so media would live on the plan's disk, outside the deploy directory so deploys don't wipe it, served via a route handler or static alias, with derivatives generated by `sharp` on upload. Limits: plan disk quota, no CDN unless Cloudflare is placed in front of wwyw.io (recommended, free tier), backups must be arranged separately. The storage layer sits behind a `MediaStorage` interface (`put/get/delete/url`) so R2/S3 can replace it later without schema changes. To confirm: that the plan's Node app can write to a persistent path.
- **GA4 + GTM**: GTM container is the only analytics script; GA4 is configured inside it. Consent Mode v2 defaults to denied until the visitor accepts. Custom events (form_submit, cta_click, etc.) are pushed to `dataLayer` from code. Admin reporting still uses the GA4 Data API via a service account. GTM allows non-developer script injection, so the CSP must allow `googletagmanager.com` and GTM edit access is limited to Super Admin-level people.
