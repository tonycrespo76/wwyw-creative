# Design-token adaptation plan

Source: `docs/design-system/DESIGN.md` (Storm Cube, MIT; see ATTRIBUTION.md). Inspected: 25 color tokens, 9 type styles (Instrument Sans only), 8 radii, 8 spacing values, ~30 component specs.

## Findings about the source system
- Light, calm, "precise instrument": navy `#1b2f6b` is the only brand color; green/amber/red are reserved for status (each with symbol + word); charts have their own 3 colors; footer is the only dark surface.
- Strong rules worth keeping for admin: tabular figures on all numbers, one 16px radius family, pills only for labels, flat surfaces with hairlines, status never color-only.
- Gaps for our use: no dark theme, no focus-ring/disabled/hover tokens, no table/kanban/sidebar/modal/toast/tabs specs, no data-table density, only 3 chart colors, no z-index/motion tokens. Navy is NIP Lab's identity, not WWYW's, so it should be a replaceable token.
- Contrast claims (12.6:1 navy, >=4.6:1 text) must be re-verified in our build, not trusted.

## Two token layers
`tokens.css` defines primitives (`--color-navy-600` ...) -> semantic tokens (`--color-action`, `--color-surface`, `--color-status-ok`) -> per-surface themes via `[data-surface="public"|"admin"]`. Tokens are stored in `design_tokens` so admins can edit semantic values (with contrast validation); primitives stay in code.

## Admin dashboard (DesignMD-based)
Adopt nearly wholesale: colors, Instrument Sans (self-hosted, Latin Extended), radii, 4/8px spacing, status pills, hairline cards, tabular numbers. Rename `primary` -> `--color-action` so brand can change. Add what is missing: focus ring (2px action + 2px offset), hover/active/disabled states, dark theme (later, not MVP), sidebar 240px/56px collapsed, data-table (row 44px, sticky header), kanban column, modal/drawer, toast, tabs, empty states, skeletons, chart palette extended to 6 with colorblind check, z-index scale, motion (120/200ms, reduced-motion respected). Max content width 1240px kept for forms; tables go fluid.

## Public site (bold, editorial) - NOT from DesignMD
Brand palette is not final, so ship a provisional token set clearly labelled and editable. Direction (to be refined with `/impeccable shape`, not decided here): oversized display type with a distinct display face paired with a text face (candidates evaluated at build time, self-hosted, licensing checked), fluid type scale via `clamp()`, high-contrast palette with one accent, asymmetric grid with 12-col layout, large section spacing, full-bleed media, GSAP-led reveal/scroll motion governed by `motion_settings`. Radii: sharp or minimal (unlike admin). It may share primitives (spacing scale, status colors for form feedback, focus ring) with admin so accessibility behaviour is identical.

## Process
1. Run `/impeccable shape` for public site and admin separately; capture results in project DESIGN.md (separate from the vendored file).
2. Build `tokens.css` + a token reference page in admin.
3. Verify contrast programmatically; fail CI on AA regressions.
