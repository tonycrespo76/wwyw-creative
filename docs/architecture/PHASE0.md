# WWYW Phase 0: Discovery and Verification

Date: 2026-10-29. Status: design dependencies resolved (updated later same day); **decisions D1-D5 answered; see DECISIONS.md.**

## Environment
- Repo: empty, not a git repository. Node v24.16.0, npm 12.0.1 (no pnpm). git 2.39.5.

## Required design tools
| Dependency | Result |
|---|---|
| `/impeccable` skill | **Installed** locally (v4.8.0); its `context` command runs and loads PRODUCT.md. |
| DesignMD MCP | **Connected.** Kit downloaded to `docs/design-system/DESIGN.md` with `ATTRIBUTION.md` (MIT, stormcube). |
| DesignMD system page | Publicly readable (MIT, Storm Cube Marketing Agency, v1). Summary only, not a download. See below. |

Page summary (not yet integrated): navy primary `#1b2f6b`, neutrals, status colors (ok/warning/error), Instrument Sans, 4px spacing scale, 1240px max width, button/input/card/chip components. Light and minimal, so it fits the admin dashboard better than the public site. Per the spec, the integration step is on hold until the MCP or the `.md` download is available.

## Versions (npm, 2026-10-29, stable tags only)
next 16.4.3 (Node >=20.9) · react 19.3.1 · drizzle-orm 0.45.4 (1.0 is beta, skip) · next-auth: `latest` is 4.24.15, v5 (Auth.js) is still `beta`, 5.0.0-beta.32 · @auth/drizzle-adapter 1.11.3 · gsap 3.15.0 · zod 4.6.7 · vitest 5.0.5 · @playwright/test 1.64.1 · @neondatabase/serverless 1.2.0.

**Conflict:** the spec requires Auth.js/NextAuth and forbids prereleases. Only v4 is stable, and it supports the App Router poorly with credentials plus MFA. See decision D1.

## Hostinger: owner has Business Web Hosting, which is on the supported list for managed Node.js apps. Limits still need the Phase 1 spike.

### Notes (per Hostinger's own pages, unverified in practice)
- Managed Node.js web apps run on Business Web Hosting and Cloud Startup/Professional/Enterprise plans, with Node 18/20/22/24. Next.js SSR/API routes are claimed supported.
- VPS needs manual setup.
- Open risks: shared resource limits, no confirmed support for background workers/cron (needed for scheduled publishing, email retry, webhook reconciliation), and unknown outbound access. A VPS is the safer match for section 19.2.

## Architecture (summary)
Single Next.js App Router app, route groups `(public)`, `(auth)`, `(admin)`, `api`, and a reserved `portal`. Drizzle + Neon Postgres. A versioned JSON page model with a typed component registry. A separate worker process drives a Postgres-backed job queue (`background_jobs`, `SKIP LOCKED`). Object storage is required for media. The database entity plan, sitemap and component inventory follow section 11 and section 5 of the spec and will be written into `DATABASE.md`/`CMS.md` once the blockers clear.

## Decisions needed
- **D1 Auth:** Auth.js v5 beta (pinned), or stable v4, or a small custom session layer on Argon2id + DB sessions?
- **D2 Hosting:** Hostinger Node.js plan or VPS? Which plan do you own?
- **D3 Object storage:** Cloudflare R2, S3, or Hostinger-compatible alternative?
- **D4 Design dependencies:** install `/impeccable` and connect DesignMD MCP, or approve using the public MIT page content plus a documented alternative review.
- **D5 Analytics:** GA4 only, or GTM too?

## Credentials needed later
Neon project + connection strings, SMTP2GO API key and verified sender (SPF/DKIM/DMARC on wwyw.io), Stripe test keys + webhook secret, GA4 property + service account, object-storage bucket, Hostinger access, error-monitoring DSN.
