import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/lib/content';
import {
  Armchair,
  Trees,
  Coffee,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Wifi,
  Volume2,
  BookOpen,
  ArrowRight,
  MapPin,
  Heart,
  Calendar,
  MessageCircle,
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const currentYear = new Date().getFullYear();
  return {
    title: `Ambiance & Spaces - Aroma Coffee & Eatery ${currentYear}`,
    description:
      `Explore 4 curated relaxation & work zones at Aroma Coffee Senopati: The Living Room Co-Work Lounge, Interactive Slow Bar, Shaded Pet-Friendly Garden Patio, and The Creative Nook for ${currentYear}.`,
    keywords: [
      'cafe ambiance Jakarta',
      'cozy cafe Senopati',
      'pet friendly cafe Jakarta',
      'best cafe to work with laptop Jakarta',
      'outdoor garden coffee shop',
      'quiet coffee shop South Jakarta',
    ],
  };
}

export default async function AmbiancePage() {
  const data = await getSiteContent();
  const { zones = [], schedule = [], general } = data;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] flex flex-col selection:bg-amber-600 selection:text-white">
      <Navbar data={data} />

      <main className="flex-1">
        {/* Header Hero Section */}
        <section className="relative py-16 sm:py-24 bg-[#0d0907] border-b border-amber-950/40 overflow-hidden text-left">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 left-0 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Armchair className="w-3.5 h-3.5" />
              <span>Space Architecture &amp; Atmosphere</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.15]">
              A Quiet Sanctuary Designed for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Peace, Focus &amp; Stillness
              </span>.
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 mt-4 max-w-2xl font-light leading-relaxed">
              We designed Aroma Coffee &amp; Eatery to be the antithesis of sterile, noisy urban coffee shops. Built with warm Indonesian teak wood, acoustic dampening panels, gentle 2700K lighting, and lush greenery, every room offers its own unique soul and comfort.
            </p>

            {/* Quick Zone Navigation Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-6 text-xs">
              <span className="text-zinc-500">Jump to zone:</span>
              {zones.map((zone) => (
                <a
                  key={zone.id}
                  href={`#${zone.id}`}
                  className="px-3.5 py-1.5 rounded-full bg-[#18110e] hover:bg-amber-600/20 text-zinc-300 hover:text-amber-300 border border-amber-900/40 transition-colors"
                >
                  {zone.name.split('&')[0].trim()}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* The 4 Zones Detailed Breakdown */}
        <section className="py-16 sm:py-24 bg-[#090605] border-b border-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
            {zones.map((zone, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={zone.id}
                  id={zone.id}
                  className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-950/80 shadow-2xl group">
                      <Image
                        src={zone.image}
                        alt={zone.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full border border-amber-700/50">
                          {zone.vibe}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <p className="text-xs font-medium text-amber-200">
                          Best for: <span className="text-white font-bold">{zone.bestFor}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider uppercase">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{zone.subtitle}</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {zone.name}
                    </h2>

                    <p className="text-sm font-semibold text-amber-200/90 italic">
                      &quot;{zone.tagline}&quot;
                    </p>

                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      {zone.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        Zone Amenities:
                      </h4>
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {zone.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/reservation?zone=${encodeURIComponent(zone.name)}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Reserve Table in this Zone</span>
                      </Link>

                      <a
                        href={`https://wa.me/${general.whatsapp}?text=Hello%20Aroma%20Coffee,%20is%20there%20seating%20available%20at%20${encodeURIComponent(
                          zone.name
                        )}%20today?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#1b1410] hover:bg-[#251b15] text-amber-300 border border-amber-800/40 font-semibold px-4 py-3 rounded-xl text-xs sm:text-sm transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Ask Barista</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Space Amenities Grid */}
        <section className="py-16 sm:py-20 bg-[#0c0806] border-b border-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comfort Standards</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Designed with Remote Workers &amp; Readers in Mind
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
                Every detail is considered so you can settle in comfortably for hours without friction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <Wifi className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-base">100 Mbps Symmetrical Wi-Fi</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Enterprise-grade fiber with zero captive portal redirects or password expirations. Perfect for video calls, heavy code deploys, and file downloads.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Sound-Absorbing Interiors</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Solid wood acoustics and fabric drapery minimize echo, keeping room noise gentle and conversations intimate.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <Trees className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-base">Pet-Friendly Shaded Garden</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Bring your four-legged companions! We provide fresh water bowls and shaded benches amidst tropical plants.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <Armchair className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Ergonomic Seating Heights</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Tables paired to match comfortable typing posture, along with plush reading armchairs for relaxed afternoons.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Curated Library Shelves</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Browse through hard-to-find coffee table books on Japanese architecture, Scandinavian interior design, and specialty coffee culture.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <Coffee className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Filter Coffee Slow Bar</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Pull up a stool at the barista counter. Learn brewing ratios, smell fresh ground beans, and taste seasonal single-origin harvests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Rhythm Timeline */}
        <section className="py-16 sm:py-20 bg-[#0a0705] border-b border-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Daily Experience Timeline</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Daily Rhythm at Aroma Coffee
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
                Plan your visit according to the atmosphere that best matches your tasks.
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

        {/* Bottom CTA Banner */}
        <section className="py-14 sm:py-20 bg-gradient-to-r from-amber-950/40 via-[#18110d] to-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#120d0a] border border-amber-700/40 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Join Us in Senopati
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Ready to Experience the Space in Person?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Walk right in whenever you like! If you have a specific spot in mind or are visiting with a team, you can reserve a table in advance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <Link
                  href="/reservation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-md hover:scale-[1.03] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table</span>
                </Link>

                <Link
                  href="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1e1612] hover:bg-[#281d18] text-amber-300 border border-amber-800/40 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all"
                >
                  <Coffee className="w-4 h-4" />
                  <span>View Curated Menu</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
