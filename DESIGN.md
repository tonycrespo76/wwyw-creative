---
name: WWYW Public Site
description: A 1980s independent-label catalogue sleeve in black and white hairline, with three industrial code colours.
colors:
  ground: "#0b0b0c"
  ink: "#f4f4f1"
  ink-muted: "#a9a9a4"
  hairline: "rgb(244 244 241 / 0.28)"
  hairline-strong: "rgb(244 244 241 / 0.85)"
  code-hazard: "#ff5a1f"
  code-cobalt: "#2b4bff"
  code-signal: "#e7d733"
  on-code: "#0b0b0c"
  focus: "#e7d733"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 11vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5.5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.2
  lead:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "0.1em"
rounded:
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "40px"
  space-7: "64px"
  space-8: "112px"
  gutter: "clamp(1rem, 4vw, 3rem)"
  edge: "44px"
components:
  action-pill:
    backgroundColor: "{colors.code-hazard}"
    textColor: "{colors.on-code}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  action-pill-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-code}"
  index-row-hover:
    backgroundColor: "{colors.code-hazard}"
    textColor: "{colors.on-code}"
  nav-cell-hover:
    backgroundColor: "{colors.code-signal}"
    textColor: "{colors.on-code}"
  menu-toggle:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "46px"
---

# Design System: WWYW Public Site

## Overview

**Creative North Star: "The Catalogue Sleeve"**

The site is issued like an independent-label catalogue from the 1980s. Every page, service and the inquiry has a three-digit address (001 Studio, 100 Services, 200 About, 300 Work, 900 Start a project; services 101 to 108). One white-line generative plot owns a field of matte black, and the rest is hairline rules and unprinted black. Colour is not decoration: it is a code, and it appears only where something is selected or actionable.

Density is low and the structure is ruled: sections are separated by strong hairlines, lists are ruled rows, and numerals do the work that imagery does elsewhere. The voice is plain text everywhere; coded colour strips and numbers always sit beside the real words.

**Key Characteristics:**
- Matte black ground, off-white ink, three code colours used sparingly.
- Wide-set heavy grotesk numerals and headlines; small tracked caps for labels; tabular figures throughout.
- Hairline rules instead of cards, shadows or gradients.
- Three-digit addresses on every page and service.
- Interaction is a colour fill or a slide, never a lift.

## Colors

A near-monochrome black and bone palette with three industrial signal colours. The palette is provisional and token-driven (`src/styles/tokens.css`).

### Primary
- **Hazard Orange** (#ff5a1f): the single primary-action pill, the default hover fill for index rows, and the default tone of the entry marker bar.

### Secondary
- **Cobalt** (#2b4bff): second tone in the rotating entry code (hover fill, marker bar). Text on it is ink, not black.
- **Signal Yellow** (#e7d733): third tone; also the focus ring, text selection, link hover, and nav-cell hover fill.

### Neutral
- **Matte Black** (#0b0b0c): page ground, and the text colour on any code-colour fill.
- **Bone White** (#f4f4f1): primary ink, strong rules, and the pill hover fill.
- **Pencil Grey** (#a9a9a4): secondary text, codes in lists, edge labels.
- **Hairline** (rgba 244,244,241 at 28%): row dividers. **Strong Hairline** (same at 85%): section tops, list tops, outlines.

### Named Rules
**The Code Colour Rule.** Hazard, cobalt and signal appear only as the coded strip, the active or hovered entry, the focus ring, and the one primary-action pill. They are never used for body text, backgrounds of sections, or ornament.

**The Pairing Rule.** Black text on hazard and signal; ink text on cobalt. Never swap.

## Typography

**Display Font:** Archivo Variable (width axis, with Archivo and system-ui fallback)
**Body Font:** Archivo Variable
**Label Font:** Archivo Variable, uppercase, tracked

**Character:** One family used at its extremes. Headlines and numerals are weight 800 at 125% width with tight negative tracking; labels are small, bold and widely tracked like engraved caps. Tabular figures are set on `body`.

### Hierarchy
- **Display** (800, 125% width, clamp 3.25rem to 6rem, 0.95): the page numeral ("WWYW 001", "100") and the contact title.
- **Headline** (800, 125% width, clamp 2rem to 3.75rem, 1.0, -0.03em): section headings, with a small muted code (0.4em, top-aligned) beside them.
- **Title** (700, 1.375rem, 1.2): entry names in ruled lists. Index rows use a larger code (clamp 2.25rem to 4.5rem, 800) with a name at clamp 1.125rem to 1.75rem, 700.
- **Lead** (400, clamp 1.25rem to 1.75rem, 1.4): statements and intros, intros capped at 60ch.
- **Body** (400, 1.0625rem, 1.55): running copy, capped at 62ch.
- **Label** (700, 0.75rem, 0.1em tracking, uppercase): nav links, crumbs, text links, hints. Legal and hint lines use 0.08em.

### Named Rules
**The Numeral Rule.** Numbers are set in the wide heavy face and treated as the largest typographic event on a page; names follow at a smaller size.

**The Plain Words Rule.** Any code, strip or numeral is paired with its name in plain text.

## Layout

Single-column, left-aligned, ruled. Sections use `--space-8` (112px) vertical padding and a left padding of gutter plus 44px edge, which holds a vertical edge-code label (for example "WWYW 100") rotated along the margin, like film-frame marking. Gutter is `clamp(1rem, 4vw, 3rem)`. Lists are grids: a 5rem code column, a name column and a description column at 1.4fr.

The home hero is a column: a plot field filling the viewport (min height 16rem) above a text block (numeral, statement, action with strip, a caption labelling the plot as generative), then a five-cell index row. The index row (code over label, five equal cells split by hairlines) sits at the base of the home hero and in the footer on every other page. The header is 4.5rem with the wordmark and four text links.

Responsive: at 48rem the edge label and the entry marker are dropped and lists collapse to two columns. At 40rem the header links hide, a menu toggle appears, and the index row becomes two columns with the last cell spanning. At 30rem the hero action stacks.

Spacing scale: 4, 8, 12, 16, 24, 40, 64, 112px.

## Elevation & Depth

Flat. There are no shadows and no gradients in the build. Depth is conveyed by hairline rules, black-on-black layering (the hero text block is ground on top of the plot), and the one fixed pill. The mobile drawer is separated by a strong left hairline over a 72% black backdrop.

### Named Rules
**The Flat Rule.** Surfaces never lift. State is shown by a colour fill, an underline, or a horizontal slide.

## Shapes

Square by default: no radius on rows, cells, blocks or the skip link. Round shapes are reserved for two controls, the action pill and the menu toggle (999px). The coded strip is a row of narrow rectangular blocks (about 1.1rem wide, 3.25rem tall, 2px apart). Rules are 1px.

## Components

### Action Pill
Fixed at top right, hazard fill, black bold text (0.9375rem, 700), 12px by 24px padding. Hover or focus turns it ink-white and nudges it down 2px. On narrow screens it moves left of the menu toggle and shrinks to 0.875rem. It is the only filled primary action.

### Coded Strip
A row of colour blocks that spells the action words. Blocks scale up on load (GSAP, skipped for reduced motion) and the letters decode on hover or focus of the parent link. Purely visual; the plain label sits beside it.

### Index Row (home services)
Ruled row with a large code and name. Hover or focus fills the row with the entry tone (hazard, cobalt, signal rotating by position), switches text colour per the Pairing Rule and slides content right by 24px.

### Entry (list)
Three-column ruled row. Hover slides the row 24px and reveals a 24px marker bar in the margin in the entry tone. Reserved entries (placeholder work) are muted and have no marker.

### Catalogue Nav (index row)
Five equal cells, code at 1.25rem 700 wide, label in small muted caps. Hover or focus fills the cell signal yellow with black text. A hint line appears on fine pointers only.

### Text Link
Small tracked caps with a strong underline rule; hover colours text and rule signal yellow.

### Spec Row
Definition-list rows with the name left and the value right in bold wide type, separated by hairlines. Used for standards.

### Mobile Menu
A round outlined toggle (46px) opens a right drawer (up to 22rem, 88vw) of full-width ruled links with a code and a 1.5rem wide name; hover fills signal yellow. Backdrop and drawer slide on 420ms ease-out.

### Pulse Plot
A canvas of stacked 1px ink lines on black, filled with ground below each line so rows occlude. Static for reduced motion. Always captioned as generative, not data.

### Motion
Ease-out `cubic-bezier(0.16, 1, 0.3, 1)`; 160ms for colour, 420ms for movement. Reduced motion collapses all durations.

## Do's and Don'ts

### Do:
- **Do** give every page, section and entry a three-digit address and show it beside its name.
- **Do** use Matte Black (#0b0b0c) as ground and Bone White (#f4f4f1) as ink; use Pencil Grey for secondary text.
- **Do** separate content with 1px hairlines (28% for rows, 85% for section and list tops).
- **Do** keep code colours to the strip, the active entry, the focus ring and the single action pill.
- **Do** show focus with a 3px signal-yellow outline at 3px offset.
- **Do** honour reduced motion and keep all code or strip content duplicated in plain text.

### Don't:
- **Don't** use cards, shadows or gradients.
- **Don't** use code colours as section backgrounds, body text or ornament.
- **Don't** add rounded corners other than on the pill and the menu toggle.
- **Don't** introduce a second typeface; vary weight, width and size within Archivo.
- **Don't** invent clients, metrics or testimonials; unfilled work stays a visibly reserved slot.
