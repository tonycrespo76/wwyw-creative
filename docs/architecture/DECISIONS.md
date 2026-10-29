# Decisions (2026-10-29)

| ID | Decision | Trade-offs accepted |
|---|---|---|
| D1 | Auth.js v4 (stable) | JWT sessions only with Credentials; partial App Router support; revocation handled via DB `session_version`. |
| D2 | Hostinger Business Web Hosting (shared, managed Node.js) | No guaranteed long-lived worker; jobs run via cron-called endpoint; resource limits unverified, so Phase 1 starts with a hosting spike. |
| D3 | Hostinger (plan disk) for media | No object storage, CDN or built-in backups; abstracted behind `MediaStorage`; Cloudflare proxy recommended. |
| D4 | DesignMD kit + impeccable installed | Kit vendored in `docs/design-system/` with attribution. |
| D5 | GA4 + GTM | GTM can inject scripts; restricted access and CSP needed; Consent Mode v2. |
| D6 | Cloudflare Turnstile on all forms | Requires Cloudflare account; CSP must allow `challenges.cloudflare.com`; widget needs accessible fallback messaging. |

Repo hygiene rule (user): no mention of the AI assistant anywhere in the repository, including commit messages, trailers, PR text and docs. Local assistant tooling folders are git-ignored and never committed.
