'use client';

import React, { useState } from 'react';
import { useAdminEdit } from './AdminEditContext';
import { Check, X, Loader2, Upload, Trash2, Plus, Edit3 } from 'lucide-react';

export type ItemType = 'zone' | 'menu' | 'schedule' | 'review' | 'gallery' | 'faq';

interface EditableItemModalProps {
  type: ItemType;
  collectionKey: string;
  initialItem?: any;
  itemIndex?: number; // jika undefined = mode Tambah Baru
  isOpen: boolean;
  onClose: () => void;
}

export default function EditableItemModal({
  type,
  collectionKey,
  initialItem,
  itemIndex,
  isOpen,
  onClose,
}: EditableItemModalProps) {
  const { addItem, updateItem, deleteItem, uploadImage, showStatus } = useAdminEdit();
  const isEditing = itemIndex !== undefined && itemIndex !== null;

  // Form data state
  const [formData, setFormData] = useState<any>(() => {
    if (initialItem) {
      return {
        ...initialItem,
        title: initialItem.title || initialItem.label || '',
        label: initialItem.label || initialItem.title || '',
        ideal: initialItem.ideal || initialItem.recommended || '',
        features: Array.isArray(initialItem.features)
          ? initialItem.features.join('\n')
          : initialItem.features || '',
      };
    }

    if (type === 'zone') {
      return {
        id: `zone-${Date.now()}`,
        name: '',
        subtitle: 'Indoor Lounge • Full AC',
        tagline: 'Peaceful & Warm Sanctuary',
        description: '',
        features: 'High-speed Wi-Fi 100 Mbps\nPower outlets at every table\nComfortable seating',
        vibe: 'Warm, Calm & Cozy',
        bestFor: 'Work, reading, or thoughtful conversation',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
      };
    }

    if (type === 'menu') {
      return {
        id: `menu-${Date.now()}`,
        name: '',
        category: 'signature',
        price: 'IDR 38,000',
        tastingNotes: 'Caramel, Brown Sugar, Orange Blossom',
        origin: 'Gayo, Aceh (Washed)',
        pairing: 'Almond Butter Croissant',
        badge: 'House Favorite',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      };
    }

    if (type === 'schedule') {
      return {
        time: '07:30 AM - 11:00 AM WIB',
        label: 'Morning Calm & Coffee Ritual',
        description: 'Fresh morning air with newly roasted single-origin brews.',
        ideal: 'Breakfast coffee + croissant, reading the morning paper.',
      };
    }

    if (type === 'review') {
      return {
        id: `rev-${Date.now()}`,
        name: '',
        role: 'Creative Designer / Regular Guest',
        rating: 5,
        comment: '',
        favoriteSpot: 'The Living Room - Corner Sofa',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      };
    }

    if (type === 'gallery') {
      return {
        id: `gal-${Date.now()}`,
        title: '',
        spot: 'Indoor Main Area • Senopati',
        category: 'Spaces & Architecture',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
        description: '',
      };
    }

    if (type === 'faq') {
      return {
        q: '',
        a: '',
      };
    }

    return {};
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setFormData((prev: any) => ({
        ...prev,
        [type === 'review' ? 'avatar' : 'image']: url,
      }));
      showStatus('success', 'Foto berhasil diunggah!');
    } catch (err: any) {
      showStatus('error', err.message || 'Gagal upload foto');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi dasar
    if (type === 'zone' && !formData.name?.trim()) {
      showStatus('error', 'Nama zona wajib diisi!');
      return;
    }
    if (type === 'menu' && !formData.name?.trim()) {
      showStatus('error', 'Nama menu kopi wajib diisi!');
      return;
    }
    if (type === 'schedule') {
      const scheduleName = formData.title || formData.label;
      if (!scheduleName?.trim()) {
        showStatus('error', 'Nama ritme jadwal wajib diisi!');
        return;
      }
      formData.label = scheduleName;
      formData.title = scheduleName;
      formData.ideal = formData.ideal || formData.recommended || '';
    }
    if (type === 'review' && !formData.name?.trim()) {
      showStatus('error', 'Nama reviewer wajib diisi!');
      return;
    }
    if (type === 'gallery' && !formData.title?.trim()) {
      showStatus('error', 'Judul foto galeri wajib diisi!');
      return;
    }
    if (type === 'faq' && !formData.q?.trim()) {
      showStatus('error', 'Pertanyaan FAQ wajib diisi!');
      return;
    }

    // Transformasi data
    const itemToSave = { ...formData };
    if (type === 'zone' && typeof itemToSave.features === 'string') {
      itemToSave.features = itemToSave.features
        .split('\n')
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    try {
      setIsSaving(true);
      let success = false;
      if (isEditing) {
        success = await updateItem(collectionKey, itemIndex!, itemToSave);
      } else {
        success = await addItem(collectionKey, itemToSave);
      }

      if (success) {
        onClose();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const getTitle = () => {
    const prefix = isEditing ? 'Edit' : 'Tambah Baru';
    switch (type) {
      case 'zone':
        return `${prefix} Zona / Ruang Kafe`;
      case 'menu':
        return `${prefix} Menu Kopi / Makanan`;
      case 'schedule':
        return `${prefix} Ritme Jadwal Harian`;
      case 'review':
        return `${prefix} Ulasan Pengunjung`;
      case 'gallery':
        return `${prefix} Foto Galeri & Momen`;
      case 'faq':
        return `${prefix} Pertanyaan FAQ`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#140e0b] border border-amber-900/60 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">
          {getTitle()}
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Koleksi: <code className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{collectionKey}</code>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ================= ZONE FORM ================= */}
          {type === 'zone' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Area / Zona *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="The Living Room, The Slow Bar..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Subtitle / Status Ruangan</label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Main Indoor Area • Full AC"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Tagline Area</label>
                  <input
                    type="text"
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="Quiet, Cool & Tailored for Deep Focus"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Deskripsi Area</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan kenyamanan suasana, pencahayaan, dan aroma di area ini..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nuansa (Vibe)</label>
                  <input
                    type="text"
                    value={formData.vibe || ''}
                    onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                    placeholder="Focused, Peaceful & Productive"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Paling Cocok Untuk</label>
                  <input
                    type="text"
                    value={formData.bestFor || ''}
                    onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                    placeholder="Remote work, reading, quiet chats"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Fitur & Fasilitas (Satu per baris):
                </label>
                <textarea
                  rows={3}
                  value={formData.features || ''}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Power outlets at every table&#10;High-speed 100 Mbps Wi-Fi&#10;Quiet Lo-Fi background music"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none leading-relaxed font-mono"
                />
              </div>

              {/* Upload Foto Zone */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Foto Suasana Area</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-amber-950 shrink-0">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-amber-950 text-white font-mono"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs font-semibold cursor-pointer transition-colors">
                      {isUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Foto Baru (WebP Otomatis)</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= MENU FORM ================= */}
          {type === 'menu' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Minuman / Menu *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Signature Cinnamon Latte, V60 Aceh Gayo..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Kategori</label>
                  <select
                    value={formData.category || 'Specialty Coffee'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Specialty Coffee">Specialty Coffee</option>
                    <option value="Slow Bar Manual Brew">Slow Bar Manual Brew</option>
                    <option value="Artisanal Pastry">Artisanal Pastry</option>
                    <option value="Non-Coffee & Refreshers">Non-Coffee & Refreshers</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Harga (IDR)</label>
                  <input
                    type="text"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="IDR 38K atau Rp 38.000"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Badge Produk</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="House Favorite, Single Origin..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Tasting Notes / Profil Rasa</label>
                <input
                  type="text"
                  value={formData.tastingNotes || ''}
                  onChange={(e) => setFormData({ ...formData, tastingNotes: e.target.value })}
                  placeholder="Brown Sugar, Cinnamon, Floral, Caramel..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Asal Biji / Bahan (Origin)</label>
                  <input
                    type="text"
                    value={formData.origin || ''}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="Gayo, Aceh (Full Washed)"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Rekomendasi Pairing</label>
                  <input
                    type="text"
                    value={formData.pairing || ''}
                    onChange={(e) => setFormData({ ...formData, pairing: e.target.value })}
                    placeholder="Almond Croissant, Sourdough..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Upload Foto Menu */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Foto Minuman / Makanan</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-amber-950 shrink-0">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-amber-950 text-white font-mono"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs font-semibold cursor-pointer transition-colors">
                      {isUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Foto Produk</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= SCHEDULE FORM ================= */}
          {type === 'schedule' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Rentang Waktu *</label>
                  <input
                    type="text"
                    required
                    value={formData.time || ''}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="07:30 - 10:00 AM"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Badge Suasana</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Morning Focus, Evening Lo-Fi..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Ritual / Sesi *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="The Gentle Awakening, Deep Work Afternoon..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Deskripsi Ritual</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Gambarkan suasana kafe pada jam ini..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Rekomendasi Menu</label>
                <input
                  type="text"
                  value={formData.recommended || ''}
                  onChange={(e) => setFormData({ ...formData, recommended: e.target.value })}
                  placeholder="Single-Origin V60 Hand Pour & Plain Croissant"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                />
              </div>
            </>
          )}

          {/* ================= REVIEW FORM ================= */}
          {type === 'review' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Pengunjung *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dimas Arya, Sarah Wijaya..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Peran / Profesi</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Software Engineer, Author..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Isi Komentar / Ulasan</label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment || ''}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Tulis ulasan pengalaman berkunjung ke Aroma Coffee..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Spot / Meja Favorit</label>
                  <input
                    type="text"
                    value={formData.favoriteSpot || ''}
                    onChange={(e) => setFormData({ ...formData, favoriteSpot: e.target.value })}
                    placeholder="Garden Patio - Table 4, The Slow Bar..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Rating Bintang (1-5)</label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                  </select>
                </div>
              </div>

              {/* Upload Avatar */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Foto Profil / Avatar</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 border border-amber-950 shrink-0">
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={formData.avatar || ''}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-amber-950 text-white font-mono"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs font-semibold cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= GALLERY FORM ================= */}
          {type === 'gallery' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Judul Momen / Foto *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="The Living Room & Co-Work Lounge..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Spot / Area</label>
                  <input
                    type="text"
                    value={formData.spot || ''}
                    onChange={(e) => setFormData({ ...formData, spot: e.target.value })}
                    placeholder="Indoor Main Area • Senopati"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Kategori Galeri</label>
                  <select
                    value={formData.category || 'Spaces & Architecture'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                  >
                    <option value="Spaces & Architecture">Spaces &amp; Architecture</option>
                    <option value="Coffee & Manual Brew">Coffee &amp; Manual Brew</option>
                    <option value="Bakery & Artisanal Brunch">Bakery &amp; Artisanal Brunch</option>
                    <option value="Garden & Pet Companions">Garden &amp; Pet Companions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Deskripsi Cerita Foto</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ceritakan detail suasana atau momen ini..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none leading-relaxed"
                />
              </div>

              {/* Upload Foto */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Foto Galeri</label>
                <div className="space-y-2">
                  {formData.image && (
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-amber-950">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 text-xs p-2 rounded-lg bg-zinc-950 border border-amber-950 text-white font-mono"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs font-semibold cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= FAQ FORM ================= */}
          {type === 'faq' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Pertanyaan FAQ *</label>
                <input
                  type="text"
                  required
                  value={formData.q || ''}
                  onChange={(e) => setFormData({ ...formData, q: e.target.value })}
                  placeholder="Apakah bisa reservasi atau boleh walk-in?..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Jawaban Penjelasan *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.a || ''}
                  onChange={(e) => setFormData({ ...formData, a: e.target.value })}
                  placeholder="Tuliskan jawaban yang ramah, informatif, dan jelas..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl bg-zinc-950 border border-amber-950 text-white focus:border-amber-500 outline-none leading-relaxed"
                />
              </div>
            </>
          )}

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-950/60">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="py-2.5 px-4 rounded-xl border border-amber-950 text-zinc-400 hover:bg-white/5 font-semibold text-xs transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-950/50 flex items-center gap-2 transition-all hover:scale-105"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
