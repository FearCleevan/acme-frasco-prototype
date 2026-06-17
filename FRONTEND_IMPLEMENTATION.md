# ACME Sign & Graphics — Frontend Implementation

**Project:** `acme-sign-nextjs/` (inside `acme-frasco-prototype/`)  
**Stack:** Next.js 14 (App Router) · TypeScript 5 · Tailwind CSS 3.4 · `next/font/google` · `next/image`  
**Scope:** Hero section prototype only — Navbar + HeroSection + Stats Strip  
**Backend dependency:** None. All content is hardcoded mock data in `data/hero.ts`.

---

## Overview

This frontend reproduces the Roofline template hero layout for **ACME Sign & Graphics Company**, a B2B sign, print, and branding company in Dartmouth, Nova Scotia. The implementation is a single Next.js page with two components:

- `Navbar` — fixed top bar with Services mega-dropdown and GET A QUOTE CTA
- `HeroSection` — red-to-orange gradient hero with animated image slider and stats strip

All UI text content lives in `data/hero.ts`. No API calls, no forms, no database. Images are Unsplash stock photo URLs — placeholder for real assets.

---

## Phase-by-Phase Execution

### Phase 1 — Project Scaffold
**Goal:** Running Next.js dev server at `localhost:3000`.

What gets built:
- `acme-sign-nextjs/` folder via `npx create-next-app@14`
- `next.config.ts` configured with Unsplash remote image domains
- `tailwind.config.ts` extended with DM Sans font variable
- `FRONTEND_IMPLEMENTATION.md` and `BACKEND_IMPLEMENTATION.md` copied into project root

Completion check: `npm run dev` starts without errors. Default Next.js page visible at `localhost:3000`.

---

### Phase 2 — Types + Data Layer
**Goal:** Typed content data ready for components to consume.

Files created:
- `lib/types.ts` — TypeScript interfaces: `NavLink`, `NavDropdownItem`, `SlideItem`, `StatItem`, `HeroData`
- `data/hero.ts` — All nav links (with 11-item Services dropdown) and hero content (headline, description, 3 slides, phone, stats)

Sample data values:
- Headline: "Let us help you make a great first impression!"
- Phone: +1 (902) 468-5171 (placeholder)
- Slides: LED Signs & Displays · Vehicle Wraps · Channel Signs
- Stats: 500+ Businesses Served · 100% Custom Solutions

Completion check: `npx tsc --noEmit` passes with zero errors.

---

### Phase 3 — Navbar Component
**Goal:** Fixed white navbar visible at top of page with working dropdown.

Files created/modified:
- `app/globals.css` — Tailwind directives + `scroll-behavior: smooth`
- `app/layout.tsx` — DM Sans font (via `next/font/google`), page metadata, `<body>` wrapper
- `components/Navbar.tsx` — Fixed nav, logo, all links, Services dropdown (click to open/close), GET A QUOTE pill
- `app/page.tsx` — Renders `<Navbar>` + placeholder content

UI behaviour:
- Logo: "ACME SIGN" (black + red) / "& Graphics Company" (small grey subtitle)
- Services dropdown: 11 items, opens on click, closes on blur or item click
- GET A QUOTE: black pill → red on hover
- Nav links: grey uppercase → black on hover

Completion check: All nav items visible, dropdown opens/closes correctly.

---

### Phase 4 — Hero Left Column + Layout
**Goal:** Gradient background + left column content visible. Right column is a placeholder.

Files created/modified:
- `components/HeroSection.tsx` (initial version — left column only)
- `app/page.tsx` — adds `<HeroSection data={heroData} />`

UI elements:
- Background: `linear-gradient(135deg, #8B0000 → #CC0000 → #D44000 → #E8720A)`
- Subtle grid dot/line pattern overlay
- Headline: `clamp(40px, 4.5vw, 64px)` DM Sans extrabold white
- Description: 16px white/80 opacity, max-width 420px
- CTA: "Get a Quote →" black pill, hover lifts -1px
- Info card: semi-transparent dark rounded panel, badge text + phone with icon

Completion check: Full gradient visible, left column content readable, no layout shift.

---

### Phase 5 — Image Slider Card (Right Column)
**Goal:** Animated 3-slide image card with progress bars auto-advancing every 5 seconds.

Files modified:
- `components/HeroSection.tsx` — adds right column with `next/image` slides + `requestAnimationFrame` progress bars

Animation logic:
- `goTo(index)` — cancels any running `rAF`/timer, resets all fills, starts new rAF loop for current slide
- Progress bar: `scaleX(0 → 1)` transform over 5000ms, origin-left, no CSS transition (pure rAF)
- Image cross-fade: CSS `opacity` transition `700ms` ease
- Clicking a label tab calls `goTo(i)` immediately

Completion check: Images load, bars animate, clicking tabs jumps slides.

---

### Phase 6 — Stats Strip + Final Polish
**Goal:** Complete hero matching the design spec. Production build passes.

Files modified:
- `components/HeroSection.tsx` — replaces stats placeholder with real stats strip

Stats strip layout:
- Left: "Trusted by businesses across Atlantic Canada" (15px, white/85)
- Right: `500+` and `100%` counters — number in white extrabold, symbol in `#CC0000`
- Background: `rgba(255,255,255,0.1)` with `backdrop-filter: blur(8px)`

Completion check: `npm run build` exits with zero errors. All 6 visual elements confirmed in browser.

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| DM Sans instead of Playfair Display | B2B corporate feel; serif italic reads as consumer/editorial |
| `requestAnimationFrame` for progress bars | Precise timing control; CSS transitions can't reliably sync with `setTimeout` |
| `data/hero.ts` for all content | Easy extraction to CMS (Contentful, Sanity) without touching component code |
| Click-to-open dropdown (not hover) | B2B users on desktop expect click; hover causes accidental opens on tab navigation |
| No Framer Motion | Reduces bundle size; the one animation (slider) needs rAF precision anyway |

---

## File Structure (Final)

```
acme-sign-nextjs/
├── app/
│   ├── globals.css           # Tailwind base, scroll-behavior
│   ├── layout.tsx            # DM Sans font, metadata, body
│   └── page.tsx              # Navbar + HeroSection composition
├── components/
│   ├── Navbar.tsx            # Fixed nav, dropdown
│   └── HeroSection.tsx       # Hero grid, slider, stats
├── data/
│   └── hero.ts               # All content (nav + hero)
├── lib/
│   └── types.ts              # TypeScript interfaces
├── next.config.ts            # Unsplash remote image pattern
├── tailwind.config.ts        # DM Sans font family
├── FRONTEND_IMPLEMENTATION.md
└── BACKEND_IMPLEMENTATION.md
```
