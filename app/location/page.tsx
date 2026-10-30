import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationSection from '@/components/LocationSection';
import EditableText from '@/components/EditableText';
import Hideable from '@/components/Hideable';
import { MapPin, Navigation, Car, Train, Clock, ShieldCheck, Bike, Sparkles, MessageCircle } from 'lucide-react';
import { getSiteContent } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const currentYear = new Date().getFullYear();
  return {
    title: `Location, Hours & Directions - Aroma Coffee & Eatery ${currentYear}`,
    description:
      `Visit Aroma Coffee & Eatery at Jl. Senopati No. 88, Kebayoran Baru, South Jakarta. Directions from MRT Senayan, parking information, and daily opening hours for ${currentYear}.`,
    keywords: [
      'Aroma Coffee address',
      'how to get to Aroma Coffee Senopati',
      'MRT Senayan to Senopati cafe',
      'coffee shop opening hours Senopati',
      'cafe with parking Senopati Jakarta',
    ],
  };
}

export const dynamic = 'force-dynamic';

export default async function LocationPage() {
  const data = await getSiteContent();
  const { general, ui = {} } = data;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] flex flex-col selection:bg-amber-600 selection:text-white">
      <Navbar data={data} />

      <main className="flex-1">
        {/* Main Location & Amenities Section */}
        <Hideable id="location.main" label="Bagian Lokasi & Jam Buka">
          <LocationSection data={data} />
        </Hideable>

        {/* Transportation & Access Guide */}
        <Hideable id="location.transit" label="Panduan Transportasi & Parkir">
          <section className="py-16 sm:py-20 bg-[#0d0907] border-t border-amber-950/40 text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Navigation className="w-3.5 h-3.5" />
                <EditableText
                  contentKey="ui.transitBadge"
                  initialValue={ui.transitBadge || 'Transit & Parking'}
                  as="span"
                />
              </div>

              <EditableText
                contentKey="ui.transitTitle"
                initialValue={ui.transitTitle || 'Getting Here is Simple & Convenient'}
                as="h2"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 block"
              />

              <EditableText
                contentKey="ui.transitSubtitle"
                initialValue={
                  ui.transitSubtitle ||
                  'Nestled in the leafy heart of Senopati, Aroma Coffee is easily reached whether by public transit, car, motorcycle, or bicycle.'
                }
                as="p"
                multiline
                className="text-xs sm:text-sm text-zinc-400 font-light mb-8 max-w-2xl block"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Transit 1 */}
                <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/60 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                    <Train className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Public Transit (MRT &amp; TransJakarta)</h3>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    Alight at <strong>Senayan MRT Station</strong> (Exit Sudirman). From there, it is a short 5-7 minute ride or taxi ride through Senopati.
                  </p>
                  <div className="text-[11px] text-emerald-400 font-medium pt-1">
                    &bull; 1.2 km from MRT Senayan
                  </div>
                </div>

                {/* Transit 2 */}
                <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/60 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Private Vehicle (Cars &amp; Bikes)</h3>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    Direct access via Jl. Senopati Raya. We provide dedicated on-site car parking and motorcycle slots with courteous valet assistance during busy hours.
                  </p>
                  <div className="text-[11px] text-amber-400 font-medium pt-1">
                    &bull; On-site parking with security guard
                  </div>
                </div>

                {/* Transit 3 */}
                <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/60 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                    <Bike className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Cycling &amp; Morning Runs</h3>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    Popular with morning cyclists and GBK runners! We feature safe bike racks in our front garden and free filtered drinking water bottle refills.
                  </p>
                  <div className="text-[11px] text-emerald-400 font-medium pt-1">
                    &bull; Free bike rack &amp; water refills
                  </div>
                </div>
              </div>

              {/* Nearby Neighborhood Landmarks */}
              <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#120d0a] border border-amber-950/70">
                <h3 className="text-base font-bold text-white mb-4">Nearby South Jakarta Landmarks</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#18110e] border border-amber-950/50">
                    <span className="text-amber-400 font-bold block">GBK Sports Complex</span>
                    <span className="text-zinc-400 text-[11px]">6 mins away</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18110e] border border-amber-950/50">
                    <span className="text-amber-400 font-bold block">SCBD Financial Center</span>
                    <span className="text-zinc-400 text-[11px]">5 mins away</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18110e] border border-amber-950/50">
                    <span className="text-amber-400 font-bold block">Plaza Senayan</span>
                    <span className="text-zinc-400 text-[11px]">8 mins away</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#18110e] border border-amber-950/50">
                    <span className="text-amber-400 font-bold block">Senopati Dining Hub</span>
                    <span className="text-zinc-400 text-[11px]">Walking distance</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Hideable>
      </main>

      <Footer />
    </div>
  );
}
