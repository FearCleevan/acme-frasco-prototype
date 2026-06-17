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
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: '68px',
        /* Same gradient as the hero — the right strip bleeds into the hero below */
        background:
          'linear-gradient(135deg, #8B0000 0%, #CC0000 45%, #D44000 72%, #E8720A 100%)',
      }}
    >
      <div className="flex h-full items-stretch">

        {/* White nav panel — floats left, leaves a gradient strip on the right */}
        <div
          className="flex flex-1 items-center justify-between bg-white pl-8 pr-8 lg:pl-12 lg:pr-10"
          style={{
            borderRadius: '0 0 28px 0',
            boxShadow: '6px 4px 24px rgba(0,0,0,0.10)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-tight select-none shrink-0 mr-8 lg:mr-12"
          >
            <span className="font-extrabold text-[18px] tracking-tight leading-none">
              <span className="text-[#111111]">ACME </span>
              <span className="text-[#CC0000]">SIGN</span>
            </span>
            <span className="text-[9px] font-semibold tracking-[0.14em] text-gray-400 uppercase mt-0.5">
              &amp; Graphics Company
            </span>
          </Link>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-5 flex-1">
            {links.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                    className={`flex items-center gap-1 text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                      pathname === link.href
                        ? 'text-[#CC0000]'
                        : 'text-gray-500 hover:text-[#111111]'
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
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
                  className={`text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                    pathname === link.href
                      ? 'text-[#CC0000]'
                      : 'text-gray-500 hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA button */}
          <Link
            href="#contact"
            className="ml-6 shrink-0 bg-[#111111] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-[#CC0000] transition-colors whitespace-nowrap"
          >
            Get a Quote
          </Link>
        </div>

        {/* Gradient strip — 72px on the right, same gradient as hero,
            creates the visual continuity between navbar and hero section */}
        <div className="w-[72px] shrink-0" />

      </div>
    </header>
  );
}
