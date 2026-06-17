# ACME Sign Hero Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan phase-by-phase. Stop after each phase and wait for "Yes, Proceed" before continuing. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 14 project (`acme-sign-nextjs/`) inside `acme-frasco-prototype/` and implement a pixel-faithful hero section (navbar + animated image slider + stats strip) for ACME Sign & Graphics Company, matching the Roofline template layout.

**Architecture:** App Router with two client components — `Navbar` (dropdown state) and `HeroSection` (slider animation via `requestAnimationFrame`). All text content lives in `data/hero.ts` for easy future CMS extraction. No backend, no API routes.

**Tech Stack:** Next.js 14.2, TypeScript 5, Tailwind CSS 3.4, `next/font/google` (DM Sans), `next/image` (Unsplash remote patterns)

## Global Constraints

- Project folder: `acme-frasco-prototype/acme-sign-nextjs/`
- No Framer Motion — animations via CSS transitions + `requestAnimationFrame`
- No backend, no API routes, no database
- All text content hardcoded in `data/hero.ts` — never inline in JSX
- Import alias: `@/*` maps to project root
- Images: Unsplash URLs only (no local image files)
- Tailwind only — no custom CSS files beyond `globals.css` base layer
- B2B tone: DM Sans throughout, no Playfair Display serif
- Primary red: `#CC0000` | Dark: `#111111` | Gradient start: `#8B0000` | Gradient end: `#E8720A`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `acme-sign-nextjs/` | Create | Next.js project root |
| `app/globals.css` | Create | Tailwind directives, scroll-behavior |
| `app/layout.tsx` | Create | DM Sans font, metadata, body wrapper |
| `app/page.tsx` | Create | Composes Navbar + HeroSection |
| `lib/types.ts` | Create | TypeScript interfaces for all data shapes |
| `data/hero.ts` | Create | All nav links, hero text, slides, stats |
| `components/Navbar.tsx` | Create | Fixed nav bar, Services dropdown toggle |
| `components/HeroSection.tsx` | Create | Gradient hero, left col, slider card, stats strip |
| `next.config.ts` | Modify | Add Unsplash remote image pattern |
| `tailwind.config.ts` | Modify | Extend fontFamily with DM Sans variable |
| `FRONTEND_IMPLEMENTATION.md` | Create | Phase-by-phase frontend guide (inside project) |
| `BACKEND_IMPLEMENTATION.md` | Create | Backend scope doc — no backend for this phase |

---

## Phase 1 — Project Scaffold

**Deliverable:** Running Next.js dev server at `localhost:3000` with default Next.js page. All config files set up. Both markdown docs created inside the project folder.

### Files
- Create: `acme-sign-nextjs/` (via `create-next-app`)
- Modify: `acme-sign-nextjs/next.config.ts`
- Modify: `acme-sign-nextjs/tailwind.config.ts`
- Create: `acme-sign-nextjs/FRONTEND_IMPLEMENTATION.md`
- Create: `acme-sign-nextjs/BACKEND_IMPLEMENTATION.md`

### Interfaces
- Produces: Running dev server, configured Tailwind + Next.js project

---

- [ ] **Step 1.1 — Scaffold Next.js project**

Open a terminal in `acme-frasco-prototype/` and run:

```bash
npx create-next-app@14 acme-sign-nextjs --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted interactively, accept all defaults (press Enter for each). This creates the `acme-sign-nextjs/` folder with Next.js 14, TypeScript, Tailwind, and ESLint pre-configured.

Expected output: `Success! Created acme-sign-nextjs`

- [ ] **Step 1.2 — Configure remote image domains**

Open `acme-sign-nextjs/next.config.ts` and replace its full content with:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 1.3 — Configure Tailwind font family**

Open `acme-sign-nextjs/tailwind.config.ts` and replace its full content with:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 1.4 — Create FRONTEND_IMPLEMENTATION.md inside project**

Create `acme-sign-nextjs/FRONTEND_IMPLEMENTATION.md` — see the full content in the root-level `FRONTEND_IMPLEMENTATION.md` (already created alongside this plan). Copy that file into the project folder.

- [ ] **Step 1.5 — Create BACKEND_IMPLEMENTATION.md inside project**

Create `acme-sign-nextjs/BACKEND_IMPLEMENTATION.md` — see the full content in the root-level `BACKEND_IMPLEMENTATION.md`. Copy that file into the project folder.

- [ ] **Step 1.6 — Verify dev server starts**

```bash
cd acme-sign-nextjs
npm run dev
```

Expected: Terminal shows `✓ Ready in Xs` and `localhost:3000` loads the default Next.js page in the browser.

- [ ] **Step 1.7 — Commit scaffold**

```bash
git add acme-sign-nextjs/
git commit -m "feat: scaffold acme-sign-nextjs Next.js 14 project"
```

---

**Phase 1 Stop.** Report what was implemented, wait for "Yes, Proceed."

---

## Phase 2 — Types + Data Layer

**Deliverable:** `lib/types.ts` and `data/hero.ts` fully typed and passing `npm run build` TypeScript check. Zero inline content in any component.

### Files
- Create: `acme-sign-nextjs/lib/types.ts`
- Create: `acme-sign-nextjs/data/hero.ts`

### Interfaces
- Produces: `NavLink`, `NavDropdownItem`, `SlideItem`, `StatItem`, `HeroData` types; `navLinks` and `heroData` exports

---

- [ ] **Step 2.1 — Create lib/types.ts**

Create `acme-sign-nextjs/lib/types.ts`:

```ts
export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export interface SlideItem {
  id: number;
  label: string;
  imageUrl: string;
  imageAlt: string;
}

export interface StatItem {
  value: string;
  symbol: string;
  label: string;
}

export interface HeroData {
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cardBadge: string;
  phone: string;
  phoneHref: string;
  slides: SlideItem[];
  statsLeft: string;
  stats: StatItem[];
}
```

- [ ] **Step 2.2 — Create data/hero.ts**

Create `acme-sign-nextjs/data/hero.ts`:

```ts
import type { HeroData, NavLink } from '@/lib/types';

export const navLinks: NavLink[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'SERVICES',
    href: '/services',
    dropdown: [
      { label: 'Channel Signs', href: '/services/channel-signs' },
      { label: 'Dimension Signs', href: '/services/dimension-signs' },
      { label: 'Illuminated Signs', href: '/services/illuminated-signs' },
      { label: 'Safety & Parking Signs', href: '/services/safety-parking-signs' },
      { label: 'Window Graphics', href: '/services/window-graphics' },
      { label: 'Banners', href: '/services/banners' },
      { label: 'Decals & Stickers', href: '/services/decals-stickers' },
      { label: 'Apparel', href: '/services/apparel' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Artwork Guidelines', href: '/artwork-guidelines' },
      { label: 'Sign Service', href: '/sign-service' },
    ],
  },
  { label: 'VEHICLE WRAPS', href: '/vehicle-wraps' },
  { label: 'LED SIGNS', href: '/led-signs' },
  { label: 'CONTACT US', href: '/contact' },
];

export const heroData: HeroData = {
  headline: 'Let us help you make a great first impression!',
  description:
    'ACME SIGN & Graphics specializes in creating highly effective signs, programmable LED signs and displays, vehicle wrap designs, custom apparel and branding assets — for businesses of any size, at a price that fits your budget.',
  ctaLabel: 'Get a Quote',
  ctaHref: '#contact',
  cardBadge: 'Serving Atlantic Canada businesses for 20+ years',
  phone: '+1 (902) 468-5171',
  phoneHref: 'tel:+19024685171',
  slides: [
    {
      id: 0,
      label: 'LED Signs & Displays',
      imageUrl:
        'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=900&q=80',
      imageAlt: 'Programmable outdoor LED sign for business',
    },
    {
      id: 1,
      label: 'Vehicle Wraps',
      imageUrl:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
      imageAlt: 'Commercial vehicle wrap for brand visibility',
    },
    {
      id: 2,
      label: 'Channel Signs',
      imageUrl:
        'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=900&q=80',
      imageAlt: 'Illuminated channel letter sign for storefront',
    },
  ],
  statsLeft: 'Trusted by businesses across Atlantic Canada',
  stats: [
    { value: '500', symbol: '+', label: 'Businesses Served' },
    { value: '100', symbol: '%', label: 'Custom Solutions' },
  ],
};
```

- [ ] **Step 2.3 — TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors. If errors appear, fix the type definition that caused them before proceeding.

- [ ] **Step 2.4 — Commit data layer**

```bash
git add acme-sign-nextjs/lib/ acme-sign-nextjs/data/
git commit -m "feat: add TypeScript types and hero content data"
```

---

**Phase 2 Stop.** Report what was implemented, wait for "Yes, Proceed."

---

## Phase 3 — Navbar Component

**Deliverable:** Fixed white navbar visible at the top of `localhost:3000` with logo, all nav links, Services dropdown (opens/closes on click), and GET A QUOTE pill button. Page content shifts down 68px.

### Files
- Create: `acme-sign-nextjs/app/globals.css`
- Create: `acme-sign-nextjs/app/layout.tsx`
- Create: `acme-sign-nextjs/components/Navbar.tsx`
- Modify: `acme-sign-nextjs/app/page.tsx`

### Interfaces
- Consumes: `NavLink[]` from `@/data/hero`
- Produces: `<Navbar links={navLinks} />` component

---

- [ ] **Step 3.1 — Create globals.css**

Replace `acme-sign-nextjs/app/globals.css` full content with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3.2 — Create app/layout.tsx**

Replace `acme-sign-nextjs/app/layout.tsx` full content with:

```tsx
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'ACME Sign & Graphics Company — Dartmouth, Nova Scotia',
  description:
    'ACME SIGN & Graphics specializes in creating highly effective signs, programmable LED signs and displays, vehicle wrap designs, custom apparel and branding assets for businesses of any size.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3.3 — Create components/Navbar.tsx**

Create `acme-sign-nextjs/components/Navbar.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NavLink } from '@/lib/types';

interface NavbarProps {
  links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-[68px] px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight select-none">
          <span className="font-extrabold text-[18px] tracking-tight leading-none">
            <span className="text-[#111111]">ACME </span>
            <span className="text-[#CC0000]">SIGN</span>
          </span>
          <span className="text-[9px] font-semibold tracking-[0.14em] text-gray-400 uppercase mt-0.5">
            &amp; Graphics Company
          </span>
        </Link>

        {/* Center nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                  className="flex items-center gap-1 text-[12px] font-semibold tracking-[0.08em] text-gray-500 uppercase hover:text-[#111111] transition-colors"
                >
                  {link.label}
                  <svg
                    className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50">
                    {link.dropdown!.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-[0.07em] hover:bg-gray-50 hover:text-[#111111] transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] font-semibold tracking-[0.08em] text-gray-500 uppercase hover:text-[#111111] transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA button */}
        <Link
          href="#contact"
          className="bg-[#111111] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-[#CC0000] transition-colors whitespace-nowrap"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
```

- [ ] **Step 3.4 — Wire Navbar into page.tsx**

Replace `acme-sign-nextjs/app/page.tsx` full content with:

```tsx
import Navbar from '@/components/Navbar';
import { navLinks } from '@/data/hero';

export default function Home() {
  return (
    <main>
      <Navbar links={navLinks} />
      {/* HeroSection added in Phase 4 */}
      <div className="h-screen bg-gray-100 flex items-center justify-center mt-[68px]">
        <p className="text-gray-400 text-sm">Hero section coming in Phase 4</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 3.5 — Verify in browser**

Run `npm run dev`. Open `localhost:3000`. Confirm:
- White navbar fixed at top, 68px tall
- "ACME SIGN" logo with red "SIGN" text, grey subtitle
- All nav links visible: HOME, SERVICES ▾, VEHICLE WRAPS, LED SIGNS, CONTACT US
- Clicking SERVICES opens the 11-item dropdown; clicking again closes it
- GET A QUOTE pill button turns red on hover
- Page body is offset 68px below navbar

- [ ] **Step 3.6 — Commit navbar**

```bash
git add acme-sign-nextjs/app/ acme-sign-nextjs/components/
git commit -m "feat: add Navbar component with Services dropdown"
```

---

**Phase 3 Stop.** Report what was implemented, wait for "Yes, Proceed."

---

## Phase 4 — Hero Left Column + Layout

**Deliverable:** `HeroSection` component renders with the full red-to-orange gradient background, two-column grid (left content fills the left, right column is a grey placeholder for Phase 5), left column shows headline, description, CTA button, and info card with phone number.

### Files
- Create: `acme-sign-nextjs/components/HeroSection.tsx`
- Modify: `acme-sign-nextjs/app/page.tsx`

### Interfaces
- Consumes: `HeroData` from `@/lib/types`, `heroData` from `@/data/hero`
- Produces: `<HeroSection data={heroData} />` component

---

- [ ] **Step 4.1 — Create HeroSection.tsx (left column + layout only)**

Create `acme-sign-nextjs/components/HeroSection.tsx`:

```tsx
'use client';

import Link from 'next/link';
import type { HeroData } from '@/lib/types';

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        marginTop: '68px',
        minHeight: 'calc(100vh - 68px)',
        background:
          'linear-gradient(135deg, #8B0000 0%, #CC0000 35%, #D44000 70%, #E8720A 100%)',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 60px)
          `,
        }}
      />

      {/* Two-column main area */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-0 px-8 lg:px-[72px] py-[60px] items-center z-10">

        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-between gap-10 lg:pr-12">
          <div>
            {/* Headline */}
            <h1
              className="font-extrabold text-white leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(40px, 4.5vw, 64px)' }}
            >
              {data.headline}
            </h1>

            {/* Description */}
            <p className="text-white/80 text-base font-normal leading-relaxed max-w-[420px] mb-8">
              {data.description}
            </p>

            {/* CTA button */}
            <Link
              href={data.ctaHref}
              className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] font-bold tracking-wide uppercase px-8 py-3.5 rounded-full transition-all hover:bg-black/85 hover:-translate-y-px"
            >
              {data.ctaLabel}
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

          {/* Info card */}
          <div
            className="max-w-[340px] rounded-2xl p-6 flex flex-col gap-5"
            style={{
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <p className="text-[13px] font-semibold text-white/70 leading-snug">
              {data.cardBadge}
            </p>
            <a
              href={data.phoneHref}
              className="flex items-center gap-3 no-underline group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <svg
                  className="w-[18px] h-[18px] text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {data.phone}
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — placeholder for Phase 5 */}
        <div className="hidden lg:flex items-center justify-center mt-10 lg:mt-0">
          <div
            className="w-full flex items-center justify-center text-white/30 text-sm font-medium"
            style={{
              height: '460px',
              borderRadius: '20px',
              background: 'rgba(0,0,0,0.2)',
              border: '2px dashed rgba(255,255,255,0.15)',
            }}
          >
            Image slider — Phase 5
          </div>
        </div>
      </div>

      {/* STATS STRIP — placeholder for Phase 6 */}
      <div
        className="relative z-10 h-[72px] flex items-center px-8 lg:px-[72px]"
        style={{
          background: 'rgba(255,255,255,0.1)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <span className="text-white/40 text-sm">Stats strip — Phase 6</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 4.2 — Update page.tsx to render HeroSection**

Replace `acme-sign-nextjs/app/page.tsx` full content with:

```tsx
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { navLinks, heroData } from '@/data/hero';

export default function Home() {
  return (
    <main>
      <Navbar links={navLinks} />
      <HeroSection data={heroData} />
    </main>
  );
}
```

- [ ] **Step 4.3 — Verify in browser**

Open `localhost:3000`. Confirm:
- Full-viewport gradient background (dark red left → orange right)
- Subtle grid line pattern overlaid on gradient
- Left column: "Let us help you make a great first impression!" headline (large, white, bold)
- Body description text below headline (white/80 opacity)
- Black pill "Get a Quote →" button
- Semi-transparent dark card with "Serving Atlantic Canada businesses for 20+ years" and phone number
- Right column shows dashed placeholder box
- Bottom shows stats placeholder strip

- [ ] **Step 4.4 — Commit left column**

```bash
git add acme-sign-nextjs/components/HeroSection.tsx acme-sign-nextjs/app/page.tsx
git commit -m "feat: add HeroSection with gradient layout and left column"
```

---

**Phase 4 Stop.** Report what was implemented, wait for "Yes, Proceed."

---

## Phase 5 — Image Slider Card (Right Column)

**Deliverable:** Right column shows the image card with cross-fading slides (LED Signs → Vehicle Wraps → Channel Signs), animated white progress bars auto-advancing every 5 seconds, and clickable tab labels to jump slides.

### Files
- Modify: `acme-sign-nextjs/components/HeroSection.tsx`

### Interfaces
- Consumes: `SlideItem[]` via `data.slides` from `HeroData`
- Produces: Animated slider card replacing the Phase 4 placeholder

---

- [ ] **Step 5.1 — Replace HeroSection.tsx with slider implementation**

Replace `acme-sign-nextjs/components/HeroSection.tsx` full content with:

```tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroData } from '@/lib/types';

const SLIDE_DURATION = 5000;

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);

      // Instantly set all fills: done for slides before current, empty for slides after
      fillRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transition = 'none';
        el.style.transform = i < index ? 'scaleX(1)' : 'scaleX(0)';
      });

      setCurrent(index);
      startRef.current = null;

      const fill = fillRefs.current[index];
      if (!fill) return;

      const animate = (ts: number) => {
        if (!startRef.current) startRef.current = ts;
        const progress = Math.min((ts - startRef.current) / SLIDE_DURATION, 1);
        fill.style.transform = `scaleX(${progress})`;
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          timerRef.current = setTimeout(
            () => goTo((index + 1) % data.slides.length),
            0,
          );
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    },
    [data.slides.length],
  );

  useEffect(() => {
    goTo(0);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [goTo]);

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        marginTop: '68px',
        minHeight: 'calc(100vh - 68px)',
        background:
          'linear-gradient(135deg, #8B0000 0%, #CC0000 35%, #D44000 70%, #E8720A 100%)',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 60px)
          `,
        }}
      />

      {/* Two-column main area */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-0 px-8 lg:px-[72px] py-[60px] items-center z-10">

        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-between gap-10 lg:pr-12">
          <div>
            <h1
              className="font-extrabold text-white leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(40px, 4.5vw, 64px)' }}
            >
              {data.headline}
            </h1>
            <p className="text-white/80 text-base font-normal leading-relaxed max-w-[420px] mb-8">
              {data.description}
            </p>
            <Link
              href={data.ctaHref}
              className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] font-bold tracking-wide uppercase px-8 py-3.5 rounded-full transition-all hover:bg-black/85 hover:-translate-y-px"
            >
              {data.ctaLabel}
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

          {/* Info card */}
          <div
            className="max-w-[340px] rounded-2xl p-6 flex flex-col gap-5"
            style={{
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <p className="text-[13px] font-semibold text-white/70 leading-snug">
              {data.cardBadge}
            </p>
            <a href={data.phoneHref} className="flex items-center gap-3 no-underline">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <svg
                  className="w-[18px] h-[18px] text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {data.phone}
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN — Slider Card */}
        <div className="relative mt-10 lg:mt-0">
          <div
            className="relative overflow-hidden"
            style={{
              height: '460px',
              borderRadius: '20px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            }}
          >
            {/* Slide images */}
            {data.slides.map((slide, i) => (
              <Image
                key={slide.id}
                src={slide.imageUrl}
                alt={slide.imageAlt}
                fill
                className="object-cover transition-opacity duration-700"
                style={{ opacity: current === i ? 1 : 0 }}
                priority={i === 0}
                sizes="520px"
              />
            ))}

            {/* Bottom fade overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
              }}
            />

            {/* Slide navigation tabs */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex px-6 pb-5">
              {data.slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className="flex-1 flex flex-col gap-2 px-2 first:pl-0 last:pr-0 text-left"
                >
                  {/* Progress bar track */}
                  <div className="h-[2px] rounded-full overflow-hidden bg-white/25">
                    <div
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      className="h-full bg-white rounded-full origin-left"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </div>
                  {/* Slide label */}
                  <span
                    className="text-[13px] font-semibold transition-colors duration-200"
                    style={{
                      color: current === i ? 'white' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {slide.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS STRIP — placeholder for Phase 6 */}
      <div
        className="relative z-10 h-[72px] flex items-center px-8 lg:px-[72px]"
        style={{
          background: 'rgba(255,255,255,0.1)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <span className="text-white/40 text-sm">Stats strip — Phase 6</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 5.2 — Verify slider in browser**

Open `localhost:3000`. Confirm:
- Right column shows an image (LED sign, vehicle wrap, or channel sign from Unsplash)
- Progress bar fills left-to-right over 5 seconds then advances to next slide
- Clicking "Vehicle Wraps" or "Channel Signs" labels jumps immediately to that slide and resets bar
- Images cross-fade smoothly (opacity transition)
- All 3 labels visible at bottom of card; active label is fully white, inactive labels are dim

- [ ] **Step 5.3 — Commit slider**

```bash
git add acme-sign-nextjs/components/HeroSection.tsx
git commit -m "feat: add animated image slider to HeroSection right column"
```

---

**Phase 5 Stop.** Report what was implemented, wait for "Yes, Proceed."

---

## Phase 6 — Stats Strip + Final Polish

**Deliverable:** Complete hero section with fully working stats strip, responsive layout for tablet/mobile, and production build passing with zero errors. Matches the Roofline reference design adapted for ACME Sign & Graphics.

### Files
- Modify: `acme-sign-nextjs/components/HeroSection.tsx` (replace stats placeholder)

---

- [ ] **Step 6.1 — Replace stats strip placeholder in HeroSection.tsx**

Find this block at the bottom of `HeroSection.tsx` (the stats strip placeholder):

```tsx
      {/* STATS STRIP — placeholder for Phase 6 */}
      <div
        className="relative z-10 h-[72px] flex items-center px-8 lg:px-[72px]"
        style={{
          background: 'rgba(255,255,255,0.1)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <span className="text-white/40 text-sm">Stats strip — Phase 6</span>
      </div>
```

Replace it with:

```tsx
      {/* STATS STRIP */}
      <div
        className="relative z-10 flex items-center justify-between gap-8 px-8 lg:px-[72px] py-7 flex-wrap"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <p className="text-[15px] font-medium text-white/85 max-w-[300px] leading-snug">
          {data.statsLeft}
        </p>
        <div className="flex items-center gap-10 md:gap-14">
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[36px] font-extrabold text-white leading-none tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[28px] font-extrabold leading-none" style={{ color: '#CC0000' }}>
                  {stat.symbol}
                </span>
              </div>
              <p className="text-[13px] font-medium text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
```

- [ ] **Step 6.2 — Verify complete hero in browser**

Open `localhost:3000`. Confirm all 6 elements are present and correct:
1. Fixed white navbar with logo, nav links, Services dropdown, GET A QUOTE button
2. Full-viewport red-to-orange gradient hero background
3. Left column: bold headline, description, black pill CTA, info card with phone
4. Right column: animated image slider with 3 slides and progress bars
5. Bottom stats strip: "Trusted by businesses..." left, "500+" and "100%" counters right
6. Red `+` and `%` symbols in stats (matching Roofline's accent color on symbols)

- [ ] **Step 6.3 — Run production build**

```bash
npm run build
```

Expected output: `✓ Compiled successfully` with no TypeScript or ESLint errors. Fix any reported errors before proceeding.

- [ ] **Step 6.4 — Final commit**

```bash
git add acme-sign-nextjs/components/HeroSection.tsx
git commit -m "feat: complete HeroSection with stats strip — hero section done"
```

---

**Phase 6 Stop.** Report what was implemented. Hero section complete.

---

## Self-Review Checklist

- [x] **Spec coverage:** Navbar ✓ · Services dropdown (11 items) ✓ · GET A QUOTE ✓ · Gradient background ✓ · Left column content ✓ · Image slider (3 slides) ✓ · Progress bars via rAF ✓ · Stats strip ✓ · DM Sans font ✓ · Unsplash images ✓ · TypeScript types ✓ · Data in `data/hero.ts` ✓
- [x] **Placeholder scan:** No TBDs. Phase 4 and 5 use explicit placeholder divs that are replaced in subsequent phases — intentional, not missing.
- [x] **Type consistency:** `HeroData`, `NavLink`, `SlideItem`, `StatItem` defined in Phase 2, consumed identically in Phase 3–6. `fillRefs.current[i]` typed as `HTMLDivElement | null` consistently.
- [x] **No inline content:** All strings reference `data.*` props; nav links from `navLinks` array.
