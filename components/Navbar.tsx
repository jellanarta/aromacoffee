'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteData } from '@/lib/types';
import { useAdminEdit } from './AdminEditContext';
import EditableText from './EditableText';
import {
  Coffee,
  Menu,
  X,
  MapPin,
  Sparkles,
  MessageCircle,
  Home,
  Armchair,
  BookOpen,
  Calendar,
  Lock,
  Edit3,
  Camera,
  ChevronDown,
  Sliders,
} from 'lucide-react';

const defaultGeneral = {
  siteName: 'Aroma Coffee & Eatery',
  tagline: 'Specialty Coffee Roastery & Warm Sanctuary',
  description: 'Artisanal Indonesian specialty coffee and cozy atmosphere.',
  phone: '+62 859-4130-4719',
  whatsapp: '6285941304719',
  email: 'jellanarta@gmail.com',
  address: 'Jl. Senopati No. 88, Kebayoran Baru, South Jakarta',
  googleMapsUrl: 'https://maps.google.com/?q=Jl.+Senopati+No.+88+Jakarta',
  openingHoursWeekday: '07:30 AM - 10:00 PM WIB',
  openingHoursWeekend: '07:00 AM - 11:00 PM WIB',
  instagram: 'https://instagram.com/aromacoffee.id',
  spotify: 'https://spotify.com',
  logo: '/logo.svg',
};

export default function Navbar({ data }: { data?: SiteData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, openLoginModal } = useAdminEdit();
  const general = data?.general || defaultGeneral;
  const ui = data?.ui || {};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize menu drawer events with MobileBottomNav ("More" button)
  useEffect(() => {
    const handleOpen = () => setMobileMenuOpen(true);
    const handleClose = () => setMobileMenuOpen(false);
    const handleToggle = () => setMobileMenuOpen((prev) => !prev);

    window.addEventListener('aroma-open-menu', handleOpen);
    window.addEventListener('aroma-close-menu', handleClose);
    window.addEventListener('aroma-toggle-menu', handleToggle);

    return () => {
      window.removeEventListener('aroma-open-menu', handleOpen);
      window.removeEventListener('aroma-close-menu', handleClose);
      window.removeEventListener('aroma-toggle-menu', handleToggle);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('aroma-menu-state', { detail: { open: mobileMenuOpen } })
    );
  }, [mobileMenuOpen]);

  const defaultWaLink = `https://wa.me/${general.whatsapp}?text=Hello%20Aroma%20Coffee,%20I%20would%20like%20to%20inquire%20about%20table%20availability.`;
  const ctaLink = ui.navCtaLink || '/reservation';

  const navLinks = [
    {
      nameKey: 'ui.navHome',
      linkKey: 'ui.navHomeLink',
      defaultName: 'Home',
      defaultHref: '/',
      icon: Home,
    },
    {
      nameKey: 'ui.navAmbiance',
      linkKey: 'ui.navAmbianceLink',
      defaultName: 'Ambiance',
      defaultHref: '/ambiance',
      icon: Armchair,
    },
    {
      nameKey: 'ui.navMenu',
      linkKey: 'ui.navMenuLink',
      defaultName: 'Menu',
      defaultHref: '/menu',
      icon: Coffee,
    },
    {
      nameKey: 'ui.navReservation',
      linkKey: 'ui.navReservationLink',
      defaultName: 'Reservation',
      defaultHref: '/reservation',
      icon: Calendar,
    },
    {
      nameKey: 'ui.navLocation',
      linkKey: 'ui.navLocationLink',
      defaultName: 'Location',
      defaultHref: '/location',
      icon: MapPin,
    },
    {
      nameKey: 'ui.navGallery',
      linkKey: 'ui.navGalleryLink',
      defaultName: 'Gallery',
      defaultHref: '/gallery',
      icon: Camera,
    },
  ];

  const isExploreActive = ['/ambiance', '/menu', '/gallery'].some((p) => pathname.startsWith(p));

  const exploreItems = [
    {
      nameKey: 'ui.navAmbiance',
      linkKey: 'ui.navAmbianceLink',
      defaultName: 'Ambiance & Spaces',
      defaultHref: '/ambiance',
      desc: '4 quiet co-work & garden cafe zones',
      icon: Armchair,
    },
    {
      nameKey: 'ui.navMenu',
      linkKey: 'ui.navMenuLink',
      defaultName: 'Curated Menu',
      defaultHref: '/menu',
      desc: '8 artisanal brews & freshly baked brunch',
      icon: Coffee,
    },
    {
      nameKey: 'ui.navGallery',
      linkKey: 'ui.navGalleryLink',
      defaultName: 'Photo Gallery',
      defaultHref: '/gallery',
      desc: 'Atmospheric photography & moments',
      icon: Camera,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Banner Notice: Live Hours & Address */}
      <div
        className={`transition-all duration-300 text-xs py-2 px-4 text-amber-200/90 hidden md:block ${
          isScrolled
            ? 'bg-[#0a0705]/95 border-b border-amber-950/40 opacity-80'
            : 'bg-transparent border-b border-white/5 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Daily: {general.openingHoursWeekday}
            </span>
            <span className="text-amber-950">•</span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <EditableText
                contentKey="general.address"
                initialValue={general.address}
                as="span"
              />
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Walk-in Welcome • High-Speed Wi-Fi • Pet-Friendly Patio</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar: Transparent on top, Rich Solid Glassmorphism on scroll */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d0907]/95 backdrop-blur-md border-b border-amber-950/80 shadow-2xl py-3 sm:py-3.5'
            : 'bg-transparent border-b border-transparent shadow-none py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 shadow-lg shadow-amber-950/50 group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden ring-1 ring-amber-500/40">
                <img
                  src={general.logo || '/logo.svg'}
                  alt={general.siteName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </Link>
            <div className="text-left">
              <Link href="/" className="hover:opacity-90 block">
                <EditableText
                  contentKey="general.siteName"
                  initialValue={general.siteName}
                  as="span"
                  className="font-bold text-base sm:text-lg tracking-tight text-white block leading-tight hover:text-amber-400 truncate"
                />
              </Link>
              <EditableText
                contentKey="general.tagline"
                initialValue={general.tagline}
                as="span"
                className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium block truncate max-w-[170px] sm:max-w-[260px]"
              />
            </div>
          </div>

          {/* Desktop Nav Links with Dropdown */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* 1. Home */}
            <div className="relative py-1">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'text-white font-semibold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <EditableText
                  contentKey="ui.navHome"
                  initialValue={ui.navHome || 'Home'}
                  linkKey="ui.navHomeLink"
                  initialLink="/"
                  as="span"
                />
              </Link>
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </div>

            {/* 2. Explore Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setExploreOpen(!exploreOpen)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  isExploreActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-300 hover:text-white'
                }`}
                aria-expanded={exploreOpen}
              >
                <span>Explore</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    exploreOpen ? 'rotate-180 text-amber-400' : 'text-zinc-400'
                  }`}
                />
              </button>

              {isExploreActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}

              {/* Dropdown Floating Card */}
              {exploreOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-72 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-[#140e0b]/95 border border-amber-900/60 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1">
                    {exploreItems.map((item) => {
                      const linkKeyClean = item.linkKey.replace('ui.', '');
                      const nameKeyClean = item.nameKey.replace('ui.', '');
                      const href = ui[linkKeyClean] || item.defaultHref;
                      const label = ui[nameKeyClean] || item.defaultName;
                      const active = pathname.startsWith(href);
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.defaultHref}
                          href={href}
                          onClick={() => setExploreOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            active
                              ? 'bg-amber-500/20 text-white'
                              : 'text-zinc-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              active
                                ? 'bg-amber-500 text-zinc-950 font-bold'
                                : 'bg-[#1e1510] text-amber-400 border border-amber-950'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left min-w-0">
                            <p className="text-xs font-bold leading-tight">{label}</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Location & Hours */}
            <div className="relative py-1">
              <Link
                href="/location"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith('/location')
                    ? 'text-white font-semibold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <EditableText
                  contentKey="ui.navLocation"
                  initialValue={ui.navLocation || 'Location & Hours'}
                  linkKey="ui.navLocationLink"
                  initialLink="/location"
                  as="span"
                />
              </Link>
              {pathname.startsWith('/location') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </div>

            {/* 4. Reservation */}
            <div className="relative py-1">
              <Link
                href="/reservation"
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith('/reservation')
                    ? 'text-white font-semibold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <EditableText
                  contentKey="ui.navReservation"
                  initialValue={ui.navReservation || 'Reservation'}
                  linkKey="ui.navReservationLink"
                  initialLink="/reservation"
                  as="span"
                />
              </Link>
              {pathname.startsWith('/reservation') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </div>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={defaultWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#1c1511] hover:bg-[#251d18] text-amber-300 border border-amber-800/40 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <EditableText
                contentKey="ui.navAskBarista"
                initialValue={ui.navAskBarista || 'Chat with Barista'}
                as="span"
              />
            </a>

            <Link
              href={ctaLink}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-950/40 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <EditableText
                contentKey="ui.navCtaButton"
                initialValue={ui.navCtaButton || 'Book a Table'}
                linkKey="ui.navCtaLink"
                initialLink={ctaLink}
                as="span"
              />
            </Link>

            {/* Quick Admin Dashboard / Login Button */}
            {isAuthenticated ? (
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 text-xs font-bold transition-all"
                title="Buka Dashboard Admin"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Dashboard</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="hidden md:inline-flex items-center gap-1.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-amber-400 border border-white/5 transition-colors"
                title="Login Editor Website"
                aria-label="Admin Login"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Mobile Drawer Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#120d0a] border-l border-amber-950/80 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            <div className="space-y-5 text-left">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-950/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 shrink-0 overflow-hidden ring-1 ring-amber-500/40">
                    <img
                      src={general.logo || '/logo.svg'}
                      alt={general.siteName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{general.siteName}</h3>
                    <p className="text-[10px] text-zinc-400">{general.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const linkKeyClean = link.linkKey.replace('ui.', '');
                  const nameKeyClean = link.nameKey.replace('ui.', '');
                  const href = ui[linkKeyClean] || link.defaultHref;
                  const label = ui[nameKeyClean] || link.defaultName;
                  const active = isActive(href);
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.defaultHref}
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-amber-500/20 text-amber-400 font-semibold'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Action CTA */}
              <div className="pt-4 border-t border-amber-950/60 space-y-2">
                <Link
                  href="/reservation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 text-xs font-bold py-3 rounded-xl shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </Link>

                <a
                  href={defaultWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat Barista via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Drawer Bottom Address */}
            <div className="pt-4 border-t border-amber-950/60 flex items-center justify-between text-xs text-zinc-500">
              <span>{general.address.split(',')[0]}</span>
              {isAuthenticated ? (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-amber-400 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Dashboard Admin</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openLoginModal();
                  }}
                  className="text-zinc-400 hover:text-amber-400 font-medium flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
