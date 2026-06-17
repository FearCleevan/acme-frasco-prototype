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
                    className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
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
