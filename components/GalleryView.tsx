'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SiteData } from '@/lib/types';
import {
  Camera,
  MapPin,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Share2,
  Check,
} from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  title: string;
  spot: string;
  category: string;
  image: string;
  description: string;
}

interface GalleryViewProps {
  photos: GalleryPhoto[];
  data: SiteData;
}

export default function GalleryView({ photos, data }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [copied, setCopied] = useState(false);
  const { general } = data;

  const categories = [
    'All',
    'Spaces & Architecture',
    'Coffee & Manual Brew',
    'Bakery & Artisanal Brunch',
    'Garden & Pet Companions',
  ];

  const filteredPhotos = photos.filter((photo) => {
    if (selectedCategory === 'All') return true;
    return photo.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, filteredPhotos]);

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-left">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-md shadow-amber-950/40 scale-105'
                  : 'bg-[#18110e] text-zinc-300 hover:text-white hover:bg-[#241a15] border border-amber-950/70'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Photos Masonry/Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative rounded-3xl overflow-hidden bg-[#140e0b] border border-amber-950/70 hover:border-amber-600/50 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Badge Top */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                  {photo.category}
                </span>
              </div>

              {/* Zoom Action Icon Top Right */}
              <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105">
                <Maximize2 className="w-4 h-4 text-amber-400" />
              </div>

              {/* Caption Bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{photo.spot}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                  {photo.title}
                </h3>
                <p className="text-xs text-zinc-300 font-light line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-16 bg-[#140e0b] rounded-3xl border border-amber-950/60 p-8">
          <Camera className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No photos in this category</h4>
          <p className="text-xs text-zinc-400 mt-1">Please select &quot;All&quot; to view all cafe moments.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#140e0b] border border-amber-950/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-amber-950/60 bg-[#120d0a]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {activePhoto.spot}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy page link"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  aria-label="Close dialog"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View with Prev / Next Navigation */}
            <div className="relative flex-1 bg-black/60 min-h-[300px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
                priority
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Bottom Details */}
            <div className="p-4 sm:p-6 bg-[#120d0a] border-t border-amber-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <h2 className="text-base sm:text-lg font-bold text-white">{activePhoto.title}</h2>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>

              <a
                href={`https://wa.me/${general.whatsapp}?text=Hello%20Aroma%20Coffee,%20I%20am%20interested%20in%20the%20*${encodeURIComponent(
                  activePhoto.title
                )}*%20featured%20in%20your%20gallery!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shrink-0 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Ask Barista About This Spot</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
