import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ReviewsSection from '@/components/ReviewsSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import EditableText from '@/components/EditableText';
import { getSiteContent } from '@/lib/content';
import {
  Armchair,
  Coffee,
  Trees,
  Flame,
  Sparkles,
  ArrowRight,
  Wifi,
  Heart,
  MessageCircle,
  Clock,
  Compass,
  CheckCircle2,
  Calendar,
  Volume2,
  BookOpen,
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const currentYear = new Date().getFullYear();
  return {
    title: `Aroma Coffee & Eatery - Specialty Roastery & Warm Sanctuary ${currentYear}`,
    description:
      `Aroma Coffee & Eatery in Senopati offers artisanal Indonesian specialty coffee, cozy reading lounges, high-speed Wi-Fi, and a tranquil shaded garden patio designed for focus, remote work, and meaningful connection in ${currentYear}.`,
    keywords: [
      'Aroma Coffee Jakarta',
      'specialty coffee Senopati',
      'cozy cafe for remote work Jakarta',
      'pet-friendly cafe South Jakarta',
      'slow bar manual brew V60',
      'quiet coffee shop with wifi',
    ],
    openGraph: {
      title: `Aroma Coffee & Eatery - Specialty Roastery & Warm Sanctuary ${currentYear}`,
      description:
        `Artisanal Indonesian specialty coffee, cozy reading lounges, high-speed Wi-Fi, and a tranquil shaded garden patio in Senopati, South Jakarta.`,
      url: 'https://aromacoffee.id',
      siteName: 'Aroma Coffee & Eatery',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: 'Aroma Coffee & Eatery Interior Lounge',
        },
      ],
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const data = await getSiteContent();
  const { zones = [], menu = [], schedule = [], general } = data;
  const currentYear = new Date().getFullYear();

  // Highlight first 4 curated menu items to avoid e-commerce clutter
  const featuredMenu = menu.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Navigation */}
      <Navbar data={data} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection data={data} />

        {/* Section 1: The Aroma Space Philosophy */}
        <section className="py-16 sm:py-24 bg-[#0c0907] border-b border-amber-950/40 relative text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Text */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Our Philosophy &amp; Story</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  A Thoughtful Space Designed for Your Peace of Mind
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  We believe a great coffee shop is more than just caffeine; it is a sacred pause in the middle of a hurried urban day. Aroma Coffee &amp; Eatery was built from reclaimed Indonesian teak wood, bathed in soft 2700K amber lighting, and curated with peaceful acoustics so your thoughts can flow freely.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-[#140e0b] border border-amber-950/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Volume2 className="w-4 h-4" />
                      <span>Acoustic Comfort</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Gentle lo-fi jazz at comfortable conversational volume. No blaring music or noisy disturbances.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#140e0b] border border-amber-950/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Wifi className="w-4 h-4" />
                      <span>Reliable Power &amp; Wi-Fi</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      100 Mbps fiber internet with dedicated power outlets accessible at every work desk.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#140e0b] border border-amber-950/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Coffee className="w-4 h-4" />
                      <span>Single-Origin Focus</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Ethically sourced beans from Aceh Gayo, Bali Kintamani, Toraja, and Flores roasted in small batches.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#140e0b] border border-amber-950/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <BookOpen className="w-4 h-4" />
                      <span>Slow Living Vibe</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      Curated art books, design journals, and deep armchairs designed for unrushed reading.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/ambiance"
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors group"
                  >
                    <span>Read more about our spatial design</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Image Composition - Zero Overlap Layout */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-950/80 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
                    alt="Aroma Coffee warm living room and cafe atmosphere"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Atmosphere First
                    </span>
                  </div>

                  {/* Bottom Quote */}
                  <div className="absolute bottom-5 left-5 right-5 text-left z-10">
                    <p className="text-sm sm:text-base font-semibold text-white">
                      &quot;A place where time slows down and genuine thoughts have room to breathe.&quot;
                    </p>
                  </div>
                </div>

                {/* Clean Status Card Below Image - 100% visible, no overlap */}
                <div className="bg-[#16100d] border border-amber-700/40 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-zinc-400 font-medium">Opening Hours Daily</p>
                      <p className="text-sm font-bold text-white">{general.openingHoursWeekday}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                    Walk-ins Welcome
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Four Cafe Zones Preview */}
        <section className="py-16 sm:py-24 bg-[#090605] border-b border-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Armchair className="w-3.5 h-3.5" />
                  <span>Curated Spaces</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Four Distinct Zones for Every Mood
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-light">
                  Whether you are seeking absolute focus for deep work, a social chat at the manual brew slow bar, or fresh air in our pet-friendly garden.
                </p>
              </div>

              <Link
                href="/ambiance"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18110e] border border-amber-900/50 text-amber-300 hover:text-white hover:bg-amber-900/30 text-xs sm:text-sm font-semibold transition-all shrink-0 self-start md:self-auto"
              >
                <span>Full Spaces Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="group rounded-3xl bg-[#120d0a] border border-amber-950/70 overflow-hidden flex flex-col hover:border-amber-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/40"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={zone.image}
                      alt={zone.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a] via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full border border-white/10">
                      {zone.vibe}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition-colors">
                        {zone.name}
                      </h3>
                      <p className="text-xs text-amber-500/90 font-medium mt-0.5">{zone.subtitle}</p>
                      <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed font-light">
                        {zone.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-950/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-zinc-400 truncate max-w-[170px]">
                        {zone.bestFor}
                      </span>
                      <Link
                        href={`/ambiance#${zone.id}`}
                        className="text-amber-400 font-bold hover:underline shrink-0"
                      >
                        Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Curated Signature Menu (Minimalist, not an e-commerce catalog) */}
        <section className="py-16 sm:py-24 bg-[#0c0806] border-b border-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Artisanal Selection</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Curated Flavors, Not an Overwhelming Catalog
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-light">
                  We deliberately refrain from offering dozens of confusing items. Every single cup and pastry here is mastered with passion, premium ingredients, and precise craftsmanship.
                </p>
              </div>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/30 text-xs sm:text-sm font-semibold transition-all shrink-0 self-start md:self-auto"
              >
                <span>View All 8 Curated Items</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMenu.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#140e0b] border border-amber-950/70 overflow-hidden flex flex-col group hover:border-amber-600/50 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-transparent to-transparent" />
                    {item.badge && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-md shadow-md">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 text-xs font-black text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-700/40">
                      {item.price}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      {item.origin && (
                        <p className="text-[11px] text-amber-500 font-medium mt-0.5">
                          Origin: {item.origin}
                        </p>
                      )}
                      <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-950/60 space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[10px] bg-amber-950/40 border border-amber-800/40 text-amber-300/90 px-2 py-0.5 rounded-full font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      <a
                        href={`https://wa.me/${general.whatsapp}?text=Hello%20Aroma%20Coffee,%20is%20the%20${encodeURIComponent(
                          item.name
                        )}%20available%20today?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#1d1511] hover:bg-[#261c16] text-zinc-300 hover:text-white border border-amber-900/40 text-xs font-medium transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Inquire Availability</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Daily Rhythm & Coffee Hours */}
        <section className="py-16 sm:py-20 bg-[#0a0705] border-b border-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Daily Rhythm</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Every Hour Has Its Own Coffee Magic
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
                Discover the ideal rhythm to visit Aroma Coffee based on the mood and energy you seek.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#120d0a] border border-amber-950/60 relative flex flex-col justify-between hover:border-amber-700/50 transition-colors"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">
                      {item.time}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.label}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-amber-950/40 text-[11px] text-amber-300/80 font-medium">
                    Best for: <span className="text-white">{item.ideal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Guest Reviews */}
        <ReviewsSection />

        {/* Section 6: Location & Visit Guide */}
        <LocationSection />

        {/* Section 7: Quick Reservation CTA Strip */}
        <section className="py-14 sm:py-20 bg-gradient-to-r from-amber-950/40 via-[#18110d] to-amber-950/40 border-t border-amber-950/60 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#120d0a] border border-amber-700/40 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Table &amp; Space Reservation
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Planning a Work Session, Team Meet, or Quiet Reading Afternoon?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Walk-ins are always warmly welcomed. If you wish to guarantee a specific desk with power outlets or a shaded garden table for your group, reserve ahead in seconds.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <Link
                  href="/reservation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-amber-950/50 transition-all hover:scale-[1.03]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table Online</span>
                </Link>

                <a
                  href={`https://wa.me/${general.whatsapp}?text=Hello%20Aroma%20Coffee,%20I%20would%20like%20to%20reserve%20a%20table.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-5 py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.03]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Barista</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
