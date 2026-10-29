'use client';

import Link from 'next/link';
import { Coffee, Heart, MapPin, Phone, Mail, Lock } from 'lucide-react';
import { STORE_INFO } from '@/data/coffeeData';
import EditableText from './EditableText';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080504] border-t border-amber-950/60 text-zinc-400 py-12 sm:py-16 pb-24 lg:pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-amber-950/40">
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 shrink-0 overflow-hidden ring-1 ring-amber-500/40 shadow-lg shadow-amber-950/40">
                <img
                  src="/logo.svg"
                  alt="Aroma Coffee & Eatery"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  Aroma <span className="text-amber-500 font-light">Coffee</span>
                </span>
                <span className="text-[10px] uppercase font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded ml-1.5">
                  Eatery
                </span>
              </div>
            </div>

            <EditableText
              contentKey="ui.footerTagline"
              initialValue="A peaceful sanctuary designed for souls who need a moment to pause, reflect, and enjoy fine artisanal coffee."
              as="p"
              className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm block"
              multiline
            />

            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Aroma Coffee"
                className="w-9 h-9 rounded-xl bg-[#140e0b] border border-amber-950 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-700/50 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Hotline"
                className="w-9 h-9 rounded-xl bg-[#140e0b] border border-amber-950 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-700/50 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Page Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/ambiance" className="hover:text-amber-400 transition-colors">
                  Ambiance &amp; Spaces
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Curated Menu
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-amber-400 transition-colors">
                  Table Reservation
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-amber-400 transition-colors">
                  Location &amp; Hours
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Cafe Zones
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/ambiance#zone-indoor" className="hover:text-amber-400 transition-colors">
                  The Living Room Lounge
                </Link>
              </li>
              <li>
                <Link href="/ambiance#zone-slowbar" className="hover:text-amber-400 transition-colors">
                  The Slow Bar Counter
                </Link>
              </li>
              <li>
                <Link href="/ambiance#zone-garden" className="hover:text-amber-400 transition-colors">
                  Garden Patio (Pet-Friendly)
                </Link>
              </li>
              <li>
                <Link href="/ambiance#zone-nook" className="hover:text-amber-400 transition-colors">
                  Creative Meeting Nook
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Opening Hours</h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-zinc-500 block">Mon - Fri:</span>
                <span className="text-white font-medium">{STORE_INFO.openingHours.weekday}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Sat - Sun:</span>
                <span className="text-white font-medium">{STORE_INFO.openingHours.weekend}</span>
              </div>
              <p className="text-[11px] text-emerald-400 pt-1 font-medium">
                Walk-ins Always Welcome
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-zinc-500">
            <p>© {currentYear} Aroma Coffee &amp; Eatery. All rights reserved.</p>
            <span>•</span>
            <Link
              href="/admin"
              className="text-zinc-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1 text-[11px]"
              title="Portal Admin & Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span>Brewed with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <EditableText
              contentKey="ui.footerHeartText"
              initialValue="for mindful coffee lovers"
              as="span"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
