# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Specified in the project brief: Next.js App Router, TypeScript strict, React, CSS Modules with native Flexbox/Grid and CSS custom properties (no Tailwind, no Bootstrap), GSAP + ScrollTrigger, Auth.js, Neon PostgreSQL with Drizzle, SMTP2GO, Stripe, GA4, Hostinger. Auth.js version and Hostinger plan (shared Node.js vs VPS) are still open decisions.

## Users

Mixed buyers, no single priority: founders and startups, established SMB owners, and in-house marketing or brand leads, all evaluating a creative studio. A second audience is WWYW's own administrators, who run content, leads, payments and analytics from the backend.

## Product Purpose

WWYW (wwyw.io) is a creative studio's site plus an integrated business platform: a public portfolio and inquiry funnel, a visual CMS that controls all public content and presentation, a lightweight CRM, Stripe payments, SEO/AEO tooling and analytics reporting. Success: visitors submit project inquiries, and administrators manage the whole business without developer help. A client portal is Phase 2.

## Positioning

Design and engineering in one team. The same people do the creative direction and the custom web app, CMS and e-commerce build, so ambitious ideas ship as working products rather than hand-offs.

## Operating Context

Services: creative website design and development, custom web applications, e-commerce, digital product engineering, UI/UX, creative technology, website modernization, ongoing support. Admins use the CMS for pages, portfolio, media, forms, leads, invoices, SEO and motion settings. Admin roles: Super Admin, Administrator, Editor, Content Manager, Marketing, Finance, Viewer.

## Capabilities and Constraints

- Every meaningful public element is editable through the CMS via a versioned JSON page model and typed component registry; no arbitrary HTML, JS or CSS.
- Admin login requires MFA (email OTP and TOTP). Authorization is server-side.
- WCAG 2.2 AA; reduced-motion support; Core Web Vitals targets LCP 2.5s, INP 200ms, CLS 0.1.
- Design tokens are editable and the brand palette is not final. The public site is bold and editorial; the dashboard is clean and structured, built on the DesignMD "Tax and Finance Website Design System" (MIT, Storm Cube) foundation.
- Undecided: Auth.js v4 vs v5 beta, Hostinger plan, object storage provider, GA4-only vs GTM.

## Brand Commitments

Name: WWYW. Domain: wwyw.io. Tone: confident, premium, imaginative; not a generic agency or SaaS template. No logo or voice guidelines supplied yet.

## Evidence on Hand

None yet. No case studies, client names, testimonials, metrics or imagery have been supplied. Do not invent clients, results, ratings or reviews; use clearly marked placeholder slots until real material is provided.

## Product Principles

1. Design and engineering are one craft; the site itself is the proof.
2. Everything shown is editable by the owner; nothing is hard-coded content.
3. Every control is real: persisted, validated, authorized.
4. Expressive motion never costs usability, accessibility or speed.
5. Claims are only made from real data.

## Accessibility & Inclusion

WCAG 2.2 AA target; keyboard operability, visible focus, skip links, reduced-motion alternatives, accessible forms and error announcements.
