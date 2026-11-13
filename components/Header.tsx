'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'INDEX', href: '/' },
    { label: 'ARCHIVE', href: '/archive' },
    { label: 'JOURNAL', href: '/essays' },
    { label: 'ABOUT & CONTACT', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between text-xs tracking-wider">
        {/* Brand / Wordmark */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-extrabold text-sm sm:text-base tracking-tight hover:opacity-80 transition-opacity uppercase font-sans whitespace-nowrap"
          >
            PIXEL PERFECT
          </Link>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono font-medium text-[11px]">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 transition-colors relative whitespace-nowrap ${
                  isActive
                    ? 'text-black font-bold border-b border-black'
                    : 'text-[#737373] hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Utility Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Status Indicator (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2 font-mono text-[10px] text-[#262626]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-widest">AVAILABLE FOR WORK</span>
          </div>

          {/* CTA Inquiries Button */}
          <Link
            href="/about#inquiries"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center space-x-1.5 border border-black px-2.5 sm:px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer (Clean Bauhaus Slide-down) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black bg-white px-6 py-6 font-mono space-y-6 animate-fadeIn">
          <nav className="flex flex-col divide-y divide-[#E5E5E5]">
            {navLinks.map((link, idx) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3.5 flex items-center justify-between text-xs tracking-wider transition-colors ${
                    isActive ? 'font-bold text-black' : 'text-[#525252] hover:text-black'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-[#A3A3A3] text-[10px]">0{idx + 1}.</span>
                    <span className="uppercase text-sm">{link.label}</span>
                  </span>
                  {isActive && <span className="text-black font-bold text-xs">■</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-[10px] text-[#737373]">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="uppercase tracking-widest text-black font-semibold">AVAILABLE FOR WORK</span>
            </div>
            <span className="uppercase text-[#A3A3A3]">CANON EOS R10</span>
          </div>
        </div>
      )}
    </header>
  );
}
