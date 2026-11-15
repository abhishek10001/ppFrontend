'use client';

import { useState, useEffect } from 'react';
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

  // Close sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock background scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
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
          {/* Status Indicator (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-2 font-mono text-[10px] text-[#262626]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-widest">AVAILABLE FOR WORK</span>
          </div>

          {/* CTA Inquiries Button: Hidden on smaller screens as requested, visible on md+ */}
          <Link
            href="/about#inquiries"
            onClick={() => setMobileMenuOpen(false)}
            className="hidden md:inline-flex items-center space-x-1.5 border border-black px-2.5 sm:px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 border border-black text-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Sidebar Drawer (Bauhaus Black Monolith) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 h-full w-[85%] sm:w-[380px] max-w-[380px] bg-black text-white z-50 shadow-2xl border-l border-[#262626] flex flex-col justify-between p-6 sm:p-8 font-mono transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Top Header inside Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#262626] pb-4">
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight uppercase font-sans text-white">
                PIXEL PERFECT
              </span>
              <span className="text-[9px] text-[#737373] tracking-widest uppercase mt-0.5">
                CURATORIAL NAVIGATION
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 border border-[#333] hover:border-white text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A] transition-colors flex items-center space-x-1.5 text-[10px] uppercase tracking-wider"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
              <span>CLOSE</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col divide-y divide-[#1F1F1F]">
            {navLinks.map((link, idx) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              const descriptions: Record<string, string> = {
                '/': 'Selected Works & Visual Index',
                '/archive': 'Full Archival Plates & Metadata',
                '/essays': 'Field Dispatches & Practice Notes',
                '/about': 'Photographer Bio & Canonical Desk'
              };
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-4 transition-colors group flex items-start justify-between ${
                    isActive ? 'text-white' : 'text-[#8A8A8A] hover:text-white'
                  }`}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] text-[#525252] font-mono">0{idx + 1}.</span>
                      <span className={`text-base tracking-wider uppercase font-sans font-bold ${isActive ? 'text-white underline decoration-1 underline-offset-4' : 'group-hover:text-white'}`}>
                        {link.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#666] tracking-wider pl-7 font-mono">
                      {descriptions[link.href] || ''}
                    </span>
                  </div>
                  {isActive ? (
                    <span className="text-white text-xs font-bold font-mono">■</span>
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-white transition-colors mt-1" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Actions & Bottom Colophon */}
        <div className="space-y-5 pt-6 border-t border-[#262626] mt-6">
          {/* Prominent Mobile 'Get in Touch' Inquiries Button */}
          <Link
            href="/about#inquiries"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 px-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-between hover:bg-neutral-200 transition-colors"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Status & Camera System */}
          <div className="space-y-2 text-[10px] text-[#737373]">
            <div className="flex items-center justify-between">
              <span className="uppercase text-[#525252]">STATUS</span>
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="uppercase tracking-widest text-emerald-400 font-semibold">AVAILABLE FOR WORK</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#1F1F1F]">
              <span className="uppercase text-[#525252]">PLATFORM</span>
              <span className="uppercase text-[#A3A3A3]">CANON EOS R10</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#1F1F1F]">
              <span className="uppercase text-[#525252]">DISPATCH DESK</span>
              <span className="uppercase text-[#A3A3A3]">ABHISHEK GANGWAR</span>
            </div>
          </div>

          <div className="text-[9px] text-[#404040] uppercase tracking-wider text-center pt-2">
            © {new Date().getFullYear()} PIXEL PERFECT • ALL RIGHTS RESERVED
          </div>
        </div>
      </aside>
    </header>
  );
}
