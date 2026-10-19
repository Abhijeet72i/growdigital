
import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface GlassHeaderProps {
  onOpenCommission: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const GlassHeader: React.FC<GlassHeaderProps> = ({
  onOpenCommission,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', href: '#/' },
    { id: 'services', label: 'Services', href: '#/services' },
    { id: 'work', label: 'Our Work', href: '#/work' },
    { id: 'process', label: 'Process', href: '#/process' },
    { id: 'about', label: 'About', href: '#/about' },
    { id: 'contact', label: 'Contact', href: '#/contact' },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-40 px-3 transition-all duration-300 sm:top-4 sm:px-6 pointer-events-none">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-white/12 px-4 shadow-2xl backdrop-blur-xl glass-nav pointer-events-auto sm:h-[76px] sm:px-6 lg:px-7">

        {/* GrowDigital Logo */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex shrink-0 items-center whitespace-nowrap py-1 transition-opacity hover:opacity-95"
          aria-label="GrowDigital Home"
        >
          <img
            src="/images/grow_digital_logo_transparent.png"
            alt="GrowDigital"
            className="h-12 w-auto max-w-[180px] object-contain sm:h-14 sm:max-w-[230px] lg:h-16 lg:max-w-[260px]"
            onError={(e) => {
              console.error(
                'GrowDigital logo not found. Check public/images/grow_digital_logo_transparent.png'
              );
              e.currentTarget.style.visibility = 'hidden';
            }}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 text-xs font-medium md:flex lg:gap-6 sm:text-sm">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative cursor-pointer py-1 transition-colors ${
                  isActive
                    ? 'font-bold text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'text-slate-200 hover:text-orange-400'
                }`}
              >
                <span className="whitespace-nowrap">{item.label}</span>

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.7)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <button
          type="button"
          onClick={() => handleNavClick('contact')}
          className="hidden shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 to-orange-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:from-orange-400 hover:to-orange-500 hover:shadow-orange-500/35 sm:inline-flex"
        >
          <span>Get a Free Quote</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={mobileMenuOpen}
          className="cursor-pointer p-1.5 text-neutral-300 hover:text-white focus:outline-none md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-6xl space-y-4 rounded-2xl border border-white/12 px-6 py-5 shadow-2xl glass-panel pointer-events-auto md:hidden">

          {/* Mobile Logo */}
          <div className="border-b border-white/10 pb-4">
            <img
              src="/images/grow_digital_logo_transparent.png"
              alt="GrowDigital"
              className="h-12 w-auto max-w-[200px] object-contain"
            />
          </div>

          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`py-1 text-left text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'font-bold text-orange-400'
                    : 'text-neutral-200 hover:text-sky-300'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-orange-500/20 transition-colors hover:from-orange-400 hover:to-orange-500"
            >
              <span>Get a Free Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default GlassHeader;
