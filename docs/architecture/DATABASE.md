# Database ER plan (Drizzle / Neon Postgres)

Conventions: `uuid` PKs (v7 where possible), `created_at/updated_at timestamptz`, soft delete (`deleted_at`) only for content and CRM, money as integer minor units + currency, all FKs indexed.

## Domains and tables

**Identity & access**
- `users` (id, email unique citext, name, role, status, totp_secret_enc, totp_enabled_at, last_login_at)
- `session_revocations` (user_id, session_version, revoked_at); `users.session_version` int. No `sessions` table (v4 Credentials = JWT).
- `otp_challenges` (user_id, code_hash, purpose, expires_at, attempts, consumed_at)
- `recovery_codes` (user_id, code_hash, used_at)
- `roles_permissions` (role, permission) - seeded, policy source of truth
- `audit_log` (actor_id, action, entity, entity_id, diff jsonb, ip, ua, at)

**CMS**
- `pages` (id, slug unique, kind, status, published_version_id, parent_id, locale)
- `page_versions` (page_id, version_no, schema_version, content jsonb, author_id, note, published_at)
- `seo_meta` (entity_type, entity_id, title, description, canonical, og_media_id, robots, jsonld_overrides jsonb)
- `redirects` (from_path unique, to_path, status_code)
- `navigation` (location, items jsonb, version)
- `global_blocks` (key, content jsonb) - header, footer, CTA bands
- `portfolio_items` (slug, title, summary, services[], year, client_ref, status, content jsonb, cover_media_id) - empty until real work supplied
- `services` (slug, title, summary, content jsonb, sort)
- `posts` (optional journal; slug, content jsonb, author_id, published_at) - confirm in spec
- `media` (storage_path relative to media root, mime, bytes, width, height, alt, caption, focal_x, focal_y, checksum, uploaded_by)
- `media_variants` (media_id, kind, storage_key, width, height)
- `design_tokens` (scope public|admin, key, value, version) + `token_sets` (versioned snapshots)
- `motion_settings` (scope, key, value jsonb)
- `site_settings` (key, value jsonb)

**Forms & CRM**
- `forms` (key, schema jsonb, version, notify_emails[])
- `form_submissions` (form_id, payload jsonb, source_page, utm jsonb, ip_hash, spam_score, turnstile_verified bool, lead_id)
- `contacts` (name, email, phone, company_id, notes)
- `companies` (name, website, size, notes)
- `leads` (contact_id, company_id, source, status, budget_range, services[], message, owner_id, score)
- `lead_activities` (lead_id, type note|email|call|status, body, actor_id)
- `tags`, `entity_tags`
- `tasks` (entity_type, entity_id, assignee_id, due_at, done_at)

**Payments**
- `stripe_customers` (contact_id, stripe_id)
- `invoices` (number unique, contact_id, status, currency, total_minor, stripe_invoice_id, due_at, paid_at)
- `invoice_items` (invoice_id, description, qty, unit_minor)
- `payments` (invoice_id, stripe_payment_intent, amount_minor, status, paid_at)
- `stripe_events` (stripe_event_id unique, type, payload jsonb, processed_at) - idempotency
- `products`/`prices` only if the spec requires a catalogue (confirm)

**Email**
- `email_templates` (key, subject, body_blocks jsonb, version)
- `email_messages` (to, template_key, status, provider_id, error, sent_at, related_entity)
- `email_suppressions` (email, reason, at)

**Analytics & SEO**
- `analytics_snapshots` (source, metric, dimension jsonb, period, value, fetched_at) - real GA4 pulls only
- `seo_audits` (url, checks jsonb, score, run_at)

**Infrastructure**
- `background_jobs` (type, payload, status, run_at, attempts, max_attempts, locked_by, locked_at, last_error)
- `rate_limits` (key, window_start, count)
- `consents` (anon_id, categories jsonb, at) - if consent logging required

## Core relations
users 1-N page_versions.author_id; pages 1-N page_versions, pages.published_version_id -> page_versions; media 1-N media_variants; forms 1-N form_submissions N-1 leads; contacts N-1 companies; leads N-1 contacts, N-1 users(owner); leads 1-N lead_activities; contacts 1-N invoices 1-N invoice_items/payments; stripe_events drives invoices/payments status.

## Notes
- Migrations via drizzle-kit, reviewed SQL committed; no auto-push in prod.
- Sensitive columns (TOTP secret) encrypted at app level with a key from env.
- Indexes: pages(slug), leads(status, owner_id), background_jobs(status, run_at), email_messages(status), audit_log(entity, entity_id).
