import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E5E5] bg-white pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-8 mt-14 sm:mt-20 text-xs font-mono">
      <div className="max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
        {/* Main Section: Brand & Structured Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          {/* Brand & Micro-Subhead */}
          <div className="space-y-1">
            <Link
              href="/"
              className="font-extrabold text-black text-sm tracking-tight uppercase font-sans hover:opacity-80 block"
            >
              PIXEL PERFECT
            </Link>
            <p className="text-[10px] tracking-wider uppercase text-[#737373] leading-normal">
              STREET PHOTOGRAPHY & VISUAL JOURNAL
            </p>
          </div>

          {/* Navigation: Clean 2-column grid on mobile, inline row on desktop */}
          <nav className="grid grid-cols-2 sm:flex sm:items-center gap-x-6 sm:gap-x-8 gap-y-2.5 sm:gap-y-0 text-[10px] sm:text-[11px] tracking-wider text-[#525252]">
            <Link href="/" className="hover:text-black transition-colors py-0.5 whitespace-nowrap">
              INDEX
            </Link>
            <Link href="/archive" className="hover:text-black transition-colors py-0.5 whitespace-nowrap">
              ARCHIVE
            </Link>
            <Link href="/essays" className="hover:text-black transition-colors py-0.5 whitespace-nowrap">
              JOURNAL
            </Link>
            <Link href="/about" className="hover:text-black transition-colors py-0.5 whitespace-nowrap">
              ABOUT & CONTACT
            </Link>
          </nav>
        </div>

        {/* Colophon Bar */}
        <div className="border-t border-[#E5E5E5] pt-4 sm:pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-[#737373] tracking-wider">
          <div className="leading-normal">
            © {currentYear} ABHISHEK GANGWAR
          </div>
          <div className="text-[9px] text-[#A3A3A3] tracking-widest uppercase leading-normal">
            INDIA • CANON EOS R10
          </div>
        </div>
      </div>
    </footer>
  );
}
