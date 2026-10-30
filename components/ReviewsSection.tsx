'use client';

import Image from 'next/image';
import { Star, MessageSquareQuote, CheckCircle, Sparkles } from 'lucide-react';
import { SiteData, ReviewItem } from '@/lib/types';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { AddItemButton, ItemCardActions } from './ItemEditorControls';

const defaultEnglishReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Aulia Rahmadina',
    role: 'Product Designer & Daily Visitor',
    rating: 5,
    comment:
      'By far the most comfortable cafe to work from in Senopati! The Palm Sugar Latte and Truffle Croissant are heavenly. Fast Wi-Fi, abundant outlets, and the music volume is always spot on.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    favoriteSpot: 'The Living Room (Window Desk)',
  },
  {
    id: 'rev-2',
    name: 'Dimas Prasetyo',
    role: 'Coffee Enthusiast & Software Engineer',
    rating: 5,
    comment:
      'The V60 Kintamani Natural is extracted to perfection. The baristas are genuinely passionate and welcoming. The slow bar counter makes you want to sit and talk coffee for hours.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    favoriteSpot: 'Slow Bar Counter',
  },
  {
    id: 'rev-3',
    name: 'Jessica Tanuwijaya',
    role: 'Author & Creative Freelancer',
    rating: 5,
    comment:
      'The semi-outdoor garden patio is wonderfully shaded in the late afternoon. I love bringing my golden retriever along while working on my drafts. Truly pet-friendly and welcoming staff.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    favoriteSpot: 'Garden Patio Outdoor',
  },
];

export default function ReviewsSection({ data }: { data?: SiteData }) {
  const reviews = data?.reviews?.length ? data.reviews : defaultEnglishReviews;

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#0d0907] border-t border-amber-950/40 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Guest Stories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              <EditableText
                contentKey="ui.reviewsTitle"
                initialValue={data?.ui?.reviewsTitle || 'Warm Words from Regular Visitors'}
                as="span"
              />
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-light">
              <EditableText
                contentKey="ui.reviewsSubtitle"
                initialValue={
                  data?.ui?.reviewsSubtitle ||
                  'Genuine impressions from coffee lovers, creative professionals, and book readers who call Aroma Coffee & Eatery their favorite sanctuary.'
                }
                as="span"
                multiline
              />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AddItemButton
              type="review"
              collectionKey="reviews"
              label="+ Tambah Ulasan"
            />
          </div>
        </div>

        {/* Rating Overview Card */}
        <div className="bg-[#16100d] border border-amber-950/60 rounded-3xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="text-center md:text-left">
              <div className="text-4xl sm:text-5xl font-black text-amber-400">4.9</div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="border-l border-amber-950/80 pl-5 text-left">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Exceptional Rating on Google Reviews
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Based on 320+ authentic reviews from daily visitors
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-[#241a14] text-zinc-300 border border-amber-950 px-3 py-1.5 rounded-full">
              ☕ Consistent Brew Quality
            </span>
            <span className="text-xs bg-[#241a14] text-zinc-300 border border-amber-950 px-3 py-1.5 rounded-full">
              🥐 Warm French Pastries
            </span>
            <span className="text-xs bg-[#241a14] text-zinc-300 border border-amber-950 px-3 py-1.5 rounded-full">
              ⚡ 100 Mbps Stable Wi-Fi
            </span>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="bg-[#140e0b] border border-amber-950/50 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-600/40 transition-all shadow-md hover:shadow-xl relative group"
            >
              <ItemCardActions
                type="review"
                collectionKey="reviews"
                item={rev}
                index={idx}
                className="absolute top-4 right-4"
              />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light italic">
                  &ldquo;
                  <EditableText
                    contentKey={`reviews.${idx}.comment`}
                    initialValue={rev.comment}
                    as="span"
                    multiline
                  />
                  &rdquo;
                </p>
              </div>

              {/* Author & Favorite */}
              <div className="mt-6 pt-4 border-t border-amber-950/40">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/30 shrink-0">
                    <EditableImage
                      contentKey={`reviews.${idx}.avatar`}
                      initialSrc={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <EditableText
                      contentKey={`reviews.${idx}.name`}
                      initialValue={rev.name}
                      as="h3"
                      className="text-xs sm:text-sm font-bold text-white block truncate"
                    />
                    <EditableText
                      contentKey={`reviews.${idx}.role`}
                      initialValue={rev.role}
                      as="p"
                      className="text-[11px] text-zinc-400 block truncate"
                    />
                  </div>
                </div>

                <div className="mt-2.5 text-[11px] text-amber-400/90 bg-[#1c140f] px-2.5 py-1 rounded-lg border border-amber-900/30 flex items-center gap-1">
                  <span className="text-zinc-500 shrink-0">Favorite Spot: </span>
                  <EditableText
                    contentKey={`reviews.${idx}.favoriteSpot`}
                    initialValue={rev.favoriteSpot}
                    as="strong"
                    className="truncate"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
