# CMS component inventory (typed registry)

Each entry = Zod props schema + server renderer + editor form + preview + a11y notes. Props are plain data, no raw HTML (rich text is a constrained node tree: p, h2-h4, ul/ol, a, strong, em, blockquote).

**Structure**: Section (background token, spacing, anchor id), Container/Grid (columns, gap, responsive collapse), Spacer, Divider, Marquee-free ticker (optional).
**Heroes**: HeroEditorial (headline, sub, CTAs, media), HeroStatement (oversized type), HeroMedia (video/image).
**Content**: Heading, RichText, Quote (attributed - must reference a real source), Stat/Metric (requires source field; blocks publish if empty), List/Checklist, Accordion/FAQ (also feeds FAQ JSON-LD), Timeline/Process steps, Table.
**Media**: Image (focal point, alt required), Gallery/Carousel, Video (poster, captions required), Logo wall (real clients only), Before/After.
**Work**: PortfolioGrid (query: tags, count), CaseStudyHeader, CaseStudyBody blocks, NextProject.
**Services**: ServiceList, ServiceCard, CapabilityMatrix.
**Conversion**: CTA band, Form (references `forms.key`; always renders the Turnstile widget, not removable), ContactCard, BookingLink (external URL), PaymentButton (Stripe, if enabled).
**Navigation/global**: Header, Footer, Breadcrumbs, AnnouncementBar.
**Trust (real data only)**: Testimonial, Award, Press mention, Team member.
**Motion settings per block**: preset (none, fade-up, reveal, parallax-lite, scrub), duration, stagger, trigger; global kill-switch; reduced-motion always resolves to none.
**Editor features**: draft/publish, version history + restore, schedule publish (job), preview URL, block reorder/duplicate/lock, validation panel (alt text, heading order, placeholder slots, contrast of chosen tokens), SEO panel, media library, token editor.
**Validation gates before publish**: every form block has Turnstile; no placeholder slots, alt text present, one H1, valid links, contrast pass.

Admin-only UI (not registry blocks): data tables, filter bars, kanban (leads), forms builder, invoice editor, analytics charts, settings.
