'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Coffee, Sparkles, ArrowRight, Star, Clock, MapPin, Wifi, Armchair, Trees, Flame } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { SiteData } from '@/lib/types';

export default function HeroSection({ data }: { data?: SiteData }) {
  const ui = data?.ui || {};

  return (
    <section
      id="home"
      className="relative min-h-[480px] sm:min-h-[600px] lg:min-h-[660px] flex items-center bg-[#0d0a08] overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-amber-950/40 text-left"
    >
      {/* Background Ambience Gradient & Coffee Steam Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-700/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column - Strictly Left-Aligned */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Curated Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <EditableText
                contentKey="ui.heroBadge"
                initialValue={ui.heroBadge || 'Artisan Roastery & Peaceful Sanctuary'}
                as="span"
              />
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              <EditableText
                contentKey="ui.heroTitle"
                initialValue={ui.heroTitle || 'A Warm Sanctuary Amidst the Bustling City.'}
                as="span"
              />
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed">
              <EditableText
                contentKey="ui.heroSubtitle"
                initialValue={
                  ui.heroSubtitle ||
                  'More than just a coffee place. Aroma Coffee & Eatery offers a cozy haven steeped in natural teak wood, soulful lo-fi jazz, plush reading sofas, and a shaded garden patio to unwind over artisanal Indonesian single-origin brews.'
                }
                as="span"
                multiline
              />
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/ambiance"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-950/50 transition-all duration-300 hover:scale-[1.03] text-sm sm:text-base"
              >
                <Armchair className="w-5 h-5" />
                <EditableText
                  contentKey="ui.heroCtaPrimary"
                  initialValue={ui.heroCtaPrimary || 'Explore Cafe Ambiance'}
                  as="span"
                />
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 bg-[#1c1612] hover:bg-[#281f19] text-amber-300 border border-amber-700/40 font-semibold px-5 py-3.5 rounded-xl transition-all hover:scale-[1.02] text-sm sm:text-base"
              >
                <Coffee className="w-4 h-4" />
                <EditableText
                  contentKey="ui.heroCtaSecondary"
                  initialValue={ui.heroCtaSecondary || 'View Curated Menu'}
                  as="span"
                />
              </Link>

              <Link
                href="/reservation"
                className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white text-xs sm:text-sm font-medium px-3 py-2 transition-colors"
              >
                <span>Book a Table Online &rarr;</span>
              </Link>
            </div>

            {/* Atmosphere Highlights Metrics - Exactly 3 Clean Items */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-3 sm:p-0 rounded-2xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
                <div className="flex items-center gap-2 text-white font-extrabold text-base sm:text-lg">
                  <Armchair className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Indoor Lounge</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Full AC &amp; Comfy Sofas</p>
              </div>

              <div className="p-3 sm:p-0 rounded-2xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
                <div className="flex items-center gap-2 text-white font-extrabold text-base sm:text-lg">
                  <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100 Mbps Wi-Fi</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Outlets at Every Table</p>
              </div>

              <div className="p-3 sm:p-0 rounded-2xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
                <div className="flex items-center gap-2 text-white font-extrabold text-base sm:text-lg">
                  <Trees className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Garden Patio</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Shaded &amp; Pet-Friendly</p>
              </div>
            </div>
          </div>

          {/* Right Visual Card - Clean Structured Layout With Zero Overlap */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3.5">
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border border-amber-900/50 shadow-2xl bg-zinc-900 aspect-[4/4.5] sm:aspect-[4/4.8] group">
                <EditableImage
                  contentKey="ui.heroImage"
                  initialSrc={ui.heroImage || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop'}
                  alt="Aroma Coffee & Eatery Cozy Atmosphere"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 pointer-events-none" />

                {/* Top Badge: The Living Room */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/40 text-xs font-semibold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    The Living Room
                  </span>
                </div>

                {/* Bottom Overlay Label - Full Width, Beautiful & Unobstructed */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-left space-y-1.5 pointer-events-none">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight pointer-events-auto">
                    <EditableText
                      contentKey="ui.heroCardTitle"
                      initialValue={ui.heroCardTitle || 'Space to Breathe & Create'}
                      as="span"
                    />
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pointer-events-auto">
                    <EditableText
                      contentKey="ui.heroCardSubtitle"
                      initialValue={
                        ui.heroCardSubtitle ||
                        'Every nook is crafted to feel like home with the soothing aroma of freshly brewed single-origin beans.'
                      }
                      as="span"
                      multiline
                    />
                  </p>
                </div>
              </div>

              {/* Dual Info Badges below the image - Completely visible on mobile and desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#16100d] border border-amber-900/40 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg hover:border-amber-700/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Trees className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-white truncate">Pet-Friendly Garden</p>
                    <p className="text-[11px] text-zinc-400 truncate">Bring Your Companion</p>
                  </div>
                </div>

                <div className="bg-[#16100d] border border-amber-900/40 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg hover:border-amber-700/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-white truncate">Morning to Night</p>
                    <p className="text-[11px] text-zinc-400 truncate">07:30 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
