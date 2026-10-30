import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditableText from '@/components/EditableText';
import EditableImage from '@/components/EditableImage';
import Hideable from '@/components/Hideable';
import { AddItemButton, ItemCardActions } from '@/components/ItemEditorControls';
import { getSiteContent } from '@/lib/content';
import {
  Coffee,
  Flame,
  Droplets,
  Wine,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Heart,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const currentYear = new Date().getFullYear();
  return {
    title: `Curated Menu - Aroma Coffee & Eatery ${currentYear}`,
    description:
      `Explore our barista-curated selection of handcrafted items: Signature Palm Sugar Latte, Single Origin V60 Kintamani, Artisan Matcha, and Freshly Baked Almond Croissants for ${currentYear}.`,
    keywords: [
      'Aroma Coffee menu',
      'specialty coffee prices Jakarta',
      'V60 manual brew menu Senopati',
      'almond croissant Senopati',
      'artisanal matcha latte Jakarta',
    ],
  };
}

export const dynamic = 'force-dynamic';

export default async function CuratedMenuPage() {
  const data = await getSiteContent();
  const { menu = [], general, ui = {} } = data;
  const currentYear = new Date().getFullYear();

  const getWaLink = (menuName: string) => {
    const text = `Hello Aroma Coffee, I would like to inquire about the availability of *${menuName}* for my visit today.`;
    return `https://wa.me/${general.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] flex flex-col selection:bg-amber-600 selection:text-white">
      <Navbar data={data} />

      <main className="flex-1">
        {/* Header Hero */}
        <Hideable id="menu.hero" label="Header Hero Menu">
          <section className="relative py-16 sm:py-24 bg-[#0d0907] border-b border-amber-950/40 overflow-hidden text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Coffee className="w-3.5 h-3.5" />
                <EditableText
                  contentKey="ui.menuHeroBadge"
                  initialValue={ui.menuHeroBadge || 'Barista-Curated Menu'}
                  as="span"
                />
              </div>

              <EditableText
                contentKey="ui.menuHeroTitle"
                initialValue={ui.menuHeroTitle || 'Curated Flavors, Not an Endless Catalog.'}
                as="h1"
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.15] block"
              />

              <EditableText
                contentKey="ui.menuHeroSubtitle"
                initialValue={
                  ui.menuHeroSubtitle ||
                  'We choose not to overwhelm you with pages of mediocre drinks. Every cup of coffee and freshly baked pastry below is handcrafted to order using single-origin beans, fresh dairy, and artisanal precision.'
                }
                as="p"
                multiline
                className="text-sm sm:text-base text-zinc-300 mt-4 max-w-2xl font-light leading-relaxed block"
              />

              <div className="flex flex-wrap items-center gap-4 pt-6 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  All items freshly prepared to order
                </span>
                <span className="text-amber-950">•</span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-amber-500" />
                  Dairy alternatives available (Oat &amp; Almond)
                </span>
                <span className="text-amber-950">•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  No artificial syrups
                </span>
              </div>
            </div>
          </section>
        </Hideable>

        {/* Curated Grid Display */}
        <Hideable id="menu.items" label="Katalog Menu Kopi & Pastry">
          <section className="py-16 sm:py-24 bg-[#090605] border-b border-amber-950/40 text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-amber-950/40 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Pilihan Menu Favorit Aroma Coffee
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Klik teks apa saja untuk mengedit nama, harga, atau catatan rasa.
                  </p>
                </div>
                <AddItemButton type="menu" collectionKey="menu" label="+ Tambah Menu Baru" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {menu.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="rounded-3xl bg-[#130e0b] border border-amber-950/70 overflow-hidden flex flex-col group hover:border-amber-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/40 relative"
                  >
                    {/* Item Card Actions */}
                    <div className="absolute top-3 right-3 z-30">
                      <ItemCardActions
                        type="menu"
                        collectionKey="menu"
                        item={item}
                        index={idx}
                      />
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden">
                      <EditableImage
                        contentKey={`menu.${idx}.image`}
                        initialSrc={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#130e0b] via-transparent to-transparent pointer-events-none" />

                      {item.badge && (
                        <div className="absolute top-3 left-3 z-10 pointer-events-auto">
                          <EditableText
                            contentKey={`menu.${idx}.badge`}
                            initialValue={item.badge}
                            as="span"
                            className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 px-2.5 py-1 rounded-md shadow-md block"
                          />
                        </div>
                      )}

                      <div className="absolute bottom-3 right-3 z-10 pointer-events-auto">
                        <EditableText
                          contentKey={`menu.${idx}.price`}
                          initialValue={item.price}
                          as="span"
                          className="text-sm font-black text-amber-300 bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl border border-amber-700/40 block"
                        />
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <EditableText
                          contentKey={`menu.${idx}.name`}
                          initialValue={item.name}
                          as="h3"
                          className="font-bold text-white text-base group-hover:text-amber-400 transition-colors block"
                        />

                        {item.origin && (
                          <p className="text-[11px] text-amber-400 font-medium">
                            Bean Origin:{' '}
                            <EditableText
                              contentKey={`menu.${idx}.origin`}
                              initialValue={item.origin}
                              as="span"
                              className="text-zinc-300 inline"
                            />
                          </p>
                        )}

                        <EditableText
                          contentKey={`menu.${idx}.description`}
                          initialValue={item.description}
                          as="p"
                          multiline
                          className="text-xs text-zinc-400 font-light leading-relaxed block"
                        />

                        {/* Tasting Notes */}
                        {item.tastingNotes && item.tastingNotes.length > 0 && (
                          <div className="pt-2">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                              Tasting Profile:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {item.tastingNotes.map((note, nIdx) => (
                                <span
                                  key={nIdx}
                                  className="text-[10px] bg-amber-950/40 border border-amber-800/40 text-amber-300/90 px-2 py-0.5 rounded-full font-medium"
                                >
                                  <EditableText
                                    contentKey={`menu.${idx}.tastingNotes.${nIdx}`}
                                    initialValue={note}
                                    as="span"
                                  />
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pairing Recommendation */}
                        {item.pairing && (
                          <div className="pt-2 text-[11px] text-zinc-400 bg-[#1a130f] p-2.5 rounded-xl border border-amber-950/60 font-light">
                            <span className="text-amber-400 font-semibold">Best paired with: </span>
                            <EditableText
                              contentKey={`menu.${idx}.pairing`}
                              initialValue={item.pairing}
                              as="span"
                              className="inline"
                            />
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-amber-950/60">
                        <a
                          href={getWaLink(item.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1a130f] hover:bg-[#241a14] text-zinc-300 hover:text-white border border-amber-900/40 text-xs font-semibold transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>Inquire with Barista</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Hideable>

        {/* Quality Standard Banner */}
        <Hideable id="menu.standards" label="Standar Kualitas Biji & Roastery">
          <section className="py-14 sm:py-20 bg-[#0c0806] border-b border-amber-950/40 text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/60 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Ethically Sourced Micro-Lots</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    We partner directly with coffee farmers across Aceh, Bali, and Sulawesi to secure top-tier specialty grade beans roasted in-house.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/60 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Fresh Daily In-House Bakery</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Our French butter croissants and sourdough pastries are rolled and baked every morning at 06:30 AM before the doors open.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#140e0b] border border-amber-950/60 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Custom Temperature &amp; Ratio</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Prefer a shorter brew time, lower acidity, or extra hot flat white? Our baristas tailor extraction precisely to your palate.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Hideable>

        {/* Bottom Banner */}
        <Hideable id="menu.cta" label="Banner CTA Bawah Menu">
          <section className="py-14 sm:py-20 bg-gradient-to-r from-amber-950/40 via-[#18110d] to-amber-950/40 text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#120d0a] border border-amber-700/40 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="space-y-3 max-w-xl">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Join Us in Person
                  </span>
                  <EditableText
                    contentKey="ui.menuCtaTitle"
                    initialValue={
                      ui.menuCtaTitle || 'Tasting is Best Experienced in the Cafe Atmosphere'
                    }
                    as="h3"
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight block"
                  />
                  <EditableText
                    contentKey="ui.menuCtaSubtitle"
                    initialValue={
                      ui.menuCtaSubtitle ||
                      'Coffee always tastes richest surrounded by natural wood, good music, and warm light. Come by or reserve a spot today.'
                    }
                    as="p"
                    multiline
                    className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed block"
                  />
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
                    href="/ambiance"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1e1612] hover:bg-[#281d18] text-amber-300 border border-amber-800/40 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all"
                  >
                    <span>Explore Spaces</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
