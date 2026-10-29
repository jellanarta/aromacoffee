import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryView, { GalleryPhoto } from '@/components/GalleryView';
import { getSiteContent } from '@/lib/content';
import { Camera, Sparkles, Heart, Coffee, Armchair, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const currentYear = new Date().getFullYear();
  return {
    title: `Photo Gallery & Moments - Aroma Coffee & Eatery ${currentYear}`,
    description:
      `Explore authentic photo moments from Aroma Coffee & Eatery Senopati in ${currentYear}: Cozy teak living rooms, artisanal manual brews, pet-friendly shaded patio, and freshly baked croissants.`,
    keywords: [
      'Aroma Coffee photo gallery',
      'cozy cafe aesthetic Jakarta',
      'Senopati cafe interior photos',
      'pet friendly cafe gallery',
      'specialty coffee V60 photos',
      `best cafe photography ${currentYear}`,
    ],
  };
}

export default async function GalleryPage() {
  const data = await getSiteContent();
  const currentYear = new Date().getFullYear();

  const curatedPhotos: GalleryPhoto[] = [
    {
      id: 'gal-1',
      title: 'The Living Room & Co-Work Lounge',
      spot: 'Indoor Main Area • Senopati',
      category: 'Spaces & Architecture',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
      description:
        'Solid reclaimed Indonesian teak wood tables, ergonomic deep seating, 100 Mbps fiber Wi-Fi, and gentle warm 2700K lighting designed for deep focus.',
    },
    {
      id: 'gal-2',
      title: 'Single-Origin V60 Pour-Over Ritual',
      spot: 'Slow Bar Counter',
      category: 'Coffee & Manual Brew',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
      description:
        'Hand-poured extraction over Japanese Hario V60 paper filter, showcasing the bright jasmine floral and sweet citrus notes of Bali Kintamani beans.',
    },
    {
      id: 'gal-3',
      title: 'Shaded Garden Patio & Greenery',
      spot: 'Outdoor Garden Terrace',
      category: 'Garden & Pet Companions',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      description:
        'An open-air retreat surrounded by tropical foliage, shaded tree canopies, and pleasant evening breezes. Welcomes beloved pets all day long.',
    },
    {
      id: 'gal-4',
      title: 'Fresh Almond Frangipane Croissant',
      spot: 'In-House Bakery Station',
      category: 'Bakery & Artisanal Brunch',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
      description:
        'Artisanal French butter croissant rolled and baked fresh every morning at 06:30 AM, filled with sweet almond cream and toasted almond flakes.',
    },
    {
      id: 'gal-5',
      title: 'The Slow Bar & La Marzocco Machine',
      spot: 'Barista Service Area',
      category: 'Coffee & Manual Brew',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
      description:
        'Watch certified baristas dial in custom grind ratios, steam velvety microfoam, and share stories about weekly rotating micro-lot harvests.',
    },
    {
      id: 'gal-6',
      title: 'The Creative Meeting Nook',
      spot: 'Library Alcove Area',
      category: 'Spaces & Architecture',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      description:
        'An inspiring alcove accommodating up to 8 team members with acoustic baffles, dedicated power strips, and ample room for collaborative laptop sprints.',
    },
    {
      id: 'gal-7',
      title: 'Sparkling Yuzu Cold Brew Tonic',
      spot: 'Garden Patio Table',
      category: 'Coffee & Manual Brew',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1200&auto=format&fit=crop',
      description:
        '18-hour slow-steeped Arabica concentrate poured over Japanese yuzu puree, fizzy artisanal tonic water, and a fresh rosemary garnish.',
    },
    {
      id: 'gal-8',
      title: 'Pet Companions in the Garden',
      spot: 'Pet-Friendly Patio',
      category: 'Garden & Pet Companions',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop',
      description:
        'We believe coffee is best enjoyed with your faithful four-legged companion. Complimentary fresh water bowls and pet treats provided.',
    },
    {
      id: 'gal-9',
      title: 'Truffle Mushroom Beef Croissant',
      spot: 'Eatery Brunch Kitchen',
      category: 'Bakery & Artisanal Brunch',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
      description:
        'Crispy flaky butter pastry stuffed with tender smoked beef sirloin, sauteed champignon mushrooms, garlic cream, and aromatic truffle oil.',
    },
    {
      id: 'gal-10',
      title: 'Velvet Flat White Latte Art',
      spot: 'Living Room Lounge Table',
      category: 'Coffee & Manual Brew',
      image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1200&auto=format&fit=crop',
      description:
        'Single Origin Toraja Sapan double shot extracted over silky steamed milk with rich chocolate undertones, served at optimal 62°C.',
    },
    {
      id: 'gal-11',
      title: 'Sunlit Window Reading Counter',
      spot: 'Indoor Window Bar',
      category: 'Spaces & Architecture',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
      description:
        'Warm morning sunlight filtering through floor-to-ceiling glass, soft instrumental lo-fi jazz, and a quiet perch for your favorite novel.',
    },
    {
      id: 'gal-12',
      title: 'Evening Patio Under Fairy Lights',
      spot: 'Garden Terrace at Night',
      category: 'Garden & Pet Companions',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop',
      description:
        'When the golden hour turns to twilight, warm amber string lights glow across the garden patio for intimate dates and relaxing evening unwinding.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] flex flex-col selection:bg-amber-600 selection:text-white">
      <Navbar data={data} />

      <main className="flex-1">
        {/* Gallery Hero Header */}
        <section className="relative py-16 sm:py-24 bg-[#0d0907] border-b border-amber-950/40 overflow-hidden text-left">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 left-0 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Journey &amp; Atmosphere</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.15]">
              Moments of Warmth, Coffee &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Peaceful Stillness
              </span>.
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 mt-4 max-w-2xl font-light leading-relaxed">
              Take a visual tour through Aroma Coffee &amp; Eatery. Explore our quiet work nooks, manual brewing rituals, leafy pet-friendly patio, and freshly baked pastries.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                12 Curated Photography Moments
              </span>
              <span className="text-amber-950">•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Click any photo to enlarge in full-screen Lightbox
              </span>
            </div>
          </div>
        </section>

        {/* Main Gallery Section */}
        <section className="py-14 sm:py-20 bg-[#090605] border-b border-amber-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GalleryView photos={curatedPhotos} data={data} />
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-14 sm:py-20 bg-gradient-to-r from-amber-950/40 via-[#18110d] to-amber-950/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#120d0a] border border-amber-700/40 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Experience It in Person
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Pictures Only Tell Half the Story
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  The soothing aroma of freshly ground coffee beans and soft acoustic jazz are best experienced in person. Walk-ins are always welcomed!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <Link
                  href="/reservation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-md hover:scale-[1.03] transition-all"
                >
                  <span>Reserve Table</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1e1612] hover:bg-[#281d18] text-amber-300 border border-amber-800/40 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Explore Menu</span>
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
