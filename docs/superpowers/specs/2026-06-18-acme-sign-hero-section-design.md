# Design Spec: ACME Sign & Graphics — Next.js Hero Section
**Date:** 2026-06-18  
**Scope:** Hero section only (navbar + hero body + stats strip). Single-page Next.js component prototype. Subsequent sections (Services, About, Contact) are out of scope for this phase.  
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion  
**Audience:** B2B — business owners, marketing managers, procurement teams across Atlantic Canada

---

## 1. Project Overview

A pixel-faithful Next.js recreation of the Roofline hero layout, re-skinned for **ACME Sign & Graphics Company** — a B2B sign, print, and branding company based in Dartmouth, Nova Scotia. The layout features a sticky navbar with a Services mega-dropdown, a two-column gradient hero with an animated image slider, and a semi-transparent stats strip at the bottom.

The prototype uses stock images (Unsplash) as placeholders. No backend, no CMS, no database. All content is hardcoded in component data files for easy future extraction to a CMS.

---

## 2. Content

### Navbar
| Element | Value |
|---|---|
| Logo text line 1 | **ACME SIGN** |
| Logo text line 2 | & GRAPHICS COMPANY |
| Nav links | HOME · SERVICES ▾ · VEHICLE WRAPS · LED SIGNS · CONTACT US |
| CTA button | GET A QUOTE |

**Services dropdown items:**
- Channel Signs
- Dimension Signs
- Illuminated Signs
- Safety & Parking Signs
- Window Graphics
- Banners
- Decals & Stickers
- Apparel
- Gallery
- Artwork Guidelines
- Sign Service

### Hero Left Column
| Element | Value |
|---|---|
| Headline | "Let us help you make a great first impression!" |
| Body copy | "ACME SIGN & Graphics specializes in creating highly effective signs, programmable LED signs and displays, vehicle wrap designs, custom apparel and branding assets — for businesses of any size, at a price that fits your budget." |
| Primary CTA | "Get a Quote" (black pill button) |
| Info card label | "Serving Atlantic Canada businesses for 20+ years" |
| Info card phone | +1 (902) 468-5171 |

### Hero Right Column — Image Slider
| Slide | Label | Image subject |
|---|---|---|
| 1 | LED Signs & Displays | Programmable outdoor LED sign |
| 2 | Vehicle Wraps | Commercial van/truck wrap |
| 3 | Channel Signs | Illuminated storefront lettering |

Auto-advances every 5 seconds. Clickable tab labels with animated fill progress bars. Smooth cross-fade transition between images.

### Stats Strip
| Element | Value |
|---|---|
| Left text | "Trusted by businesses across Atlantic Canada" |
| Stat 1 | **500+** Businesses Served |
| Stat 2 | **100%** Custom Solutions |

---

## 3. Visual Design

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--red` | `#CC0000` | Logo, accents, slider active bar highlight |
| `--red-dark` | `#8B0000` | Gradient start (far left) |
| `--orange` | `#E8720A` | Gradient end (far right) |
| `--black` | `#111111` | CTA buttons, nav text |
| `--white` | `#FFFFFF` | Navbar background, headline text |

**Hero background gradient:** `135deg, #8B0000 0% → #CC0000 35% → #D44000 70% → #E8720A 100%`

### Typography
| Element | Font | Weight | Size |
|---|---|---|---|
| Logo "ACME SIGN" | DM Sans | 800 | 18px / uppercase |
| Hero headline | DM Sans | 800 | clamp(40px, 4.5vw, 64px) |
| Body copy | DM Sans | 400 | 16px |
| Nav links | DM Sans | 600 | 13px / uppercase |
| Stats numbers | DM Sans | 800 | 36px |

**Note:** B2B choice — DM Sans (not Playfair Display) throughout. Serif italic feels consumer/editorial; DM Sans bold feels professional/corporate for B2B sign company.

### Layout
- Navbar: fixed, 68px tall, `z-index: 50`
- Hero: `min-height: calc(100vh - 68px)`, CSS Grid `grid-cols-[1fr_520px]`, padding `60px 72px`
- Image card: `460px` tall, `border-radius: 20px`, `box-shadow: 0 32px 80px rgba(0,0,0,0.35)`
- Stats strip: `backdrop-filter: blur(8px)`, `background: rgba(255,255,255,0.1)`

---

## 4. Component Architecture

```
acme-sign-nextjs/
├── app/
│   ├── layout.tsx          # Root layout, font imports, metadata
│   └── page.tsx            # Composes Navbar + HeroSection
├── components/
│   ├── Navbar.tsx          # Fixed nav with Services dropdown
│   └── HeroSection.tsx     # Full hero: left col + right slider + stats strip
├── data/
│   └── hero.ts             # All text content + slide data (easy CMS extraction later)
├── lib/
│   └── types.ts            # TypeScript interfaces for hero data
└── public/
    └── (no local images — Unsplash URLs in hero.ts)
```

**Component responsibilities:**
- `Navbar` — sticky positioning, dropdown open/close state, GET A QUOTE button
- `HeroSection` — gradient background, two-column grid, `SliderCard` sub-component, stats strip
- `SliderCard` (inside HeroSection) — image cross-fade, animated progress bars via `requestAnimationFrame`, click-to-jump

---

## 5. Interactions & Animation

| Interaction | Behaviour |
|---|---|
| Image auto-advance | Every 5000ms via `setInterval`, resets on manual click |
| Progress bar fill | `requestAnimationFrame` loop, `scaleX(0 → 1)` transform over 5s |
| Slide image transition | CSS `opacity` cross-fade, 700ms ease |
| Services dropdown | Toggle on click (not hover — B2B users on desktop but accessible) |
| GET A QUOTE hover | Background darkens to `#CC0000` red |
| Nav link hover | Color transitions to `#111111` |

---

## 6. Responsiveness

| Breakpoint | Hero layout |
|---|---|
| `≥ 1024px` | Two-column grid (content left, image right) |
| `768px–1023px` | Single column, image card below text, `360px` tall |
| `< 768px` | Single column, `300px` image card, nav links hidden (hamburger placeholder) |

---

## 7. Out of Scope
- Backend, API routes, form submission
- CMS integration
- Authentication
- Services pages, Vehicle Wraps page, LED Signs page
- Real contact form (GET A QUOTE links to `#contact` placeholder)
- SEO meta beyond basic `<title>` and `<meta description>`
- Hamburger mobile menu (nav hidden on mobile — placeholder for next phase)
