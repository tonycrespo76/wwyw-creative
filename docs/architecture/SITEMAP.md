# Public sitemap (proposal)

All pages are CMS pages built from registry blocks. Copy below is structural only; no content is invented.

| Path | Purpose | Notes |
|---|---|---|
| `/` | Home: positioning (design + engineering), selected work, services, CTA | Work section shows placeholder slots until real portfolio exists |
| `/work` | Portfolio index with filters (service, year) | Hidden from nav/sitemap until >=1 real item |
| `/work/[slug]` | Case study | CMS portfolio item |
| `/services` | Services overview | 8 services from PRODUCT.md |
| `/services/[slug]` | Service detail | Web design/dev, custom web apps, e-commerce, digital product engineering, UI/UX, creative technology, modernization, support |
| `/about` | Studio, approach, team | Needs real team info |
| `/process` | How we work (optional) | Confirm in spec |
| `/journal`, `/journal/[slug]` | Articles (optional) | Confirm in spec; AEO value |
| `/contact` | Project inquiry form | Core conversion page |
| `/pricing` or `/start` | Payments/deposit entry (optional) | Only if Stripe public checkout is in scope |
| `/legal/privacy`, `/legal/terms`, `/legal/cookies` | Required legal | Text must come from the owner/legal |
| `/404`, `/500` | Branded errors | |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Generated | |
| `/portal/*` | Reserved, Phase 2 | Not built or linked |

Non-public: `/login`, `/login/verify`, `/login/mfa`, `/admin/**` (noindex, disallowed in robots).

## Built so far (catalogue addresses)
001 `/` home, 100 `/services`, 101-108 `/services/[slug]`, 200 `/about` (standards 210, people 220 reserved), 300 `/work` (301 reserved), 900 `/contact` (holding page, no form yet). Typing a three-digit address jumps to that page.
