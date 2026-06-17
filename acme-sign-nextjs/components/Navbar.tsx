'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from '@/lib/types';

interface NavbarProps {
  links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ height: '72px' }}>

      {/* Full-width gradient background — same as hero, so the strip
          visible left/right of the pill seamlessly connects to the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #8B0000 0%, #CC0000 45%, #D44000 72%, #E8720A 100%)',
        }}
      />

      {/* Pill container */}
      <div className="relative h-full px-4 flex items-center">
        <div className="max-w-7xl w-full mx-auto relative">

          {/* White floating pill */}
          <div
            className="relative flex items-center justify-between bg-white px-6 lg:px-10"
            style={{
              height: '62px',
              borderRadius: '18px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none select-none shrink-0">
              <span className="font-extrabold text-[20px] tracking-tight leading-none">
                <span className="text-[#111111]">ACME </span>
                <span className="text-[#CC0000]">SIGN</span>
              </span>
              <span className="text-[9px] font-semibold tracking-[0.12em] text-gray-400 uppercase mt-0.5">
                &amp; Graphics Company
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {links.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 text-[13px] font-semibold tracking-wide uppercase transition-colors ${
                        pathname === link.href
                          ? 'text-[#CC0000]'
                          : 'text-gray-600 hover:text-[#CC0000]'
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          dropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide rounded-lg hover:bg-gray-50 hover:text-[#CC0000] transition-colors"
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
                    className={`text-[13px] font-semibold tracking-wide uppercase transition-colors ${
                      pathname === link.href
                        ? 'text-[#CC0000]'
                        : 'text-gray-600 hover:text-[#CC0000]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right: CTA + mobile button */}
            <div className="flex items-center gap-3">
              <Link
                href="#contact"
                className="hidden md:flex items-center justify-center bg-[#111111] text-white text-[11px] font-bold tracking-widest uppercase px-6 py-2.5 rounded-full hover:bg-[#CC0000] transition-colors whitespace-nowrap"
              >
                Get a Quote
              </Link>
              <button
                className="lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/*
              ─── CONCAVE CORNER CONNECTORS ─────────────────────────────────
              These two elements sit just below the pill's bottom corners.
              Each is an overflow:hidden box containing a white circle.
              The circle's curved edge, seen against the gradient background,
              creates the inward-curving "border inside" effect from the reference.

              Bottom-left connector:
              Circle is anchored to top-right → its left arc faces the gradient,
              making the bottom-left pill corner appear to curve inward.
            */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                left: 0,
                bottom: 0,
                width: '22px',
                height: '22px',
                transform: 'translateY(100%)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'white',
                }}
              />
            </div>

            {/* Bottom-right connector: circle anchored to top-left */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                right: 0,
                bottom: 0,
                width: '22px',
                height: '22px',
                transform: 'translateY(100%)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'white',
                }}
              />
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden mt-2 bg-white rounded-2xl shadow-lg p-4 relative z-50">
              <nav className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[13px] font-semibold text-gray-600 uppercase tracking-wide hover:text-[#CC0000] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className="mt-1 bg-[#111111] text-white text-center py-2.5 rounded-xl text-[12px] font-bold tracking-widest uppercase hover:bg-[#CC0000] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                </Link>
              </nav>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
