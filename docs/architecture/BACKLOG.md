# Phased backlog

Phase 0 (this) - discovery, docs, decisions. Exit: decisions answered (done, see DECISIONS.md); credentials plan agreed; hosting capability spike (below) passed.

**Phase 1 - Foundation**: *first, a hosting spike on the actual Hostinger plan: deploy a hello-world Next app, test persistent writable path, cron interval, outbound HTTPS to Neon/SMTP2GO/Stripe, memory limits; abort/replan if it fails.* Then: scaffold Next.js strict TS, lint/format/test tooling, CI; CSS Modules + tokens; env validation (Zod); Drizzle + Neon, first migrations; logging, error monitoring; security headers/CSP; deploy pipeline to chosen host; health endpoint.
**Phase 2 - Auth & admin shell**: email OTP, TOTP enrol/verify, recovery codes, sessions, rate limiting, RBAC policy + tests for all 7 roles, audit log, admin layout/nav, user management.
**Phase 3 - CMS core**: media library + storage, page model + registry (structure/content/media blocks), editor, versions/publish/rollback, navigation, SEO panel, redirects, token editor, preview.
**Phase 4 - Public site**: design direction via impeccable, templates, home/services/about/contact, GSAP motion + settings + reduced motion, a11y and Core Web Vitals pass, sitemap/robots/llms.txt/JSON-LD. Work pages only when real material exists.
**Phase 5 - Forms, CRM, email**: form builder, submissions, spam controls, leads pipeline, activities, tasks, SMTP2GO + templates + suppression, worker queue/retry, domain DNS (SPF/DKIM/DMARC).
**Phase 6 - Payments**: Stripe test mode, customers, invoices, Checkout, webhook + idempotency, reconciliation job, finance views; live-mode cutover checklist.
**Phase 7 - Analytics & SEO tools**: GTM + GA4 + Consent Mode v2, Data API snapshots, dashboard, SEO audit job, AEO checks.
**Phase 8 - Hardening & launch**: e2e suite, load/perf, security review, backups/restore drill, runbooks, content entry, launch.
**Phase 9 (later) - Client portal.**

## Status note: inquiry form
The contact form is built (validation, Turnstile verification, honeypot, in-memory rate limit). Saving is a development-only file store; production reports "not accepted yet" until the database module exists. Still to build: Postgres persistence, lead record creation, notification email through SMTP2GO, database-backed rate limiting, CSP allowance for challenges.cloudflare.com.
