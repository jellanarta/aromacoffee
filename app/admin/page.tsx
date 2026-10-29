'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SiteData,
  CafeZone,
  CuratedMenuItem,
  ScheduleItem,
  ReviewItem,
} from '@/lib/types';
import { uploadImageFile } from '@/lib/imageUpload';
import {
  Lock,
  Save,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Coffee,
  Sparkles,
  Phone,
  ArrowLeft,
  Loader2,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  Users,
  Compass,
  Star,
  Layers,
  Calendar,
  LogOut,
  ChevronRight,
  Sliders,
} from 'lucide-react';

type TabType =
  | 'general'
  | 'hero'
  | 'zones'
  | 'menu'
  | 'schedule'
  | 'reviews'
  | 'hiddenElements';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<string>('all');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Check login authentication from localStorage
  useEffect(() => {
    const savedPass =
      localStorage.getItem('aroma_admin_pwd') ||
      localStorage.getItem('aroma_admin_pass') ||
      localStorage.getItem('melali_admin_pass');

    if (savedPass) {
      setPassword(savedPass);
      setIsAuthenticated(true);
      setCheckingAuth(false);
    } else {
      setCheckingAuth(false);
      router.replace('/login?redirect=/admin');
    }
  }, [router]);

  // Load site content on auth
  useEffect(() => {
    if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated]);

  const loadContent = async () => {
    try {
      const res = await fetch('/api/get-content');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        const directRes = await fetch('/data/content.json');
        if (directRes.ok) {
          const json = await directRes.json();
          setData(json);
        }
      }
    } catch (err) {
      console.error('Failed to load content', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aroma_admin_pwd');
    localStorage.removeItem('aroma_admin_auth');
    localStorage.removeItem('aroma_admin_pass');
    localStorage.removeItem('melali_admin_pass');
    localStorage.removeItem('aroma_edit_mode');
    setIsAuthenticated(false);
    setPassword('');
    router.push('/login');
  };

  const handleUploadImage = async (
    file: File,
    onSuccess: (url: string) => void,
    fieldId: string
  ) => {
    try {
      setUploadingField(fieldId);
      setStatusMessage(null);
      const url = await uploadImageFile(file);
      onSuccess(url);
      setStatusMessage({
        type: 'success',
        text: 'Foto berhasil divalidasi, dikompresi ke WebP tajam, dan disimpan!',
      });
    } catch (error: any) {
      setStatusMessage({ type: 'error', text: error.message || 'Gagal upload gambar' });
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data, password }),
      });

      const resJson = await res.json();
      if (!res.ok) {
        setStatusMessage({
          type: 'error',
          text: resJson.error || 'Gagal menyimpan perubahan ke server',
        });
      } else {
        setStatusMessage({
          type: 'success',
          text: resJson.committedToGitHub
            ? 'Perubahan berhasil disimpan & otomatis di-commit ke repository GitHub!'
            : 'Perubahan berhasil disimpan secara lokal!',
        });
      }
    } catch (error: any) {
      setStatusMessage({
        type: 'error',
        text: error.message || 'Terjadi kesalahan koneksi saat menyimpan',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0d0a08] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !data) {
    return null;
  }

  const filteredMenu =
    menuCategoryFilter === 'all'
      ? data.menu || []
      : (data.menu || []).filter((item) => item.category === menuCategoryFilter);

  return (
    <div className="min-h-screen bg-[#0a0806] text-zinc-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#120d0a]/95 backdrop-blur-md border-b border-amber-950/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 shadow-lg shadow-amber-950/60 overflow-hidden ring-1 ring-amber-500/40">
              <img
                src={data.general?.logo || '/logo.svg'}
                alt="Aroma Coffee"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>{data.general?.siteName || 'Aroma Coffee & Eatery'}</span>
                <span className="text-[10px] font-semibold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full hidden sm:inline-block">
                  Dashboard
                </span>
              </h1>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Pusat Kontrol Konten, Menu, Foto &amp; Jam Operasional
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Live Website with visual editor active */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-amber-950/80 text-zinc-300 hover:text-white hover:border-amber-700/50 text-xs font-semibold transition-all"
            title="Buka Website dengan Mode Editor Visual"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Lihat Website</span>
          </Link>

          {/* Quick Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/50 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-amber-950/80 transition-colors"
            title="Logout Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Status Alert Notification Bar */}
      {statusMessage && (
        <div
          className={`px-4 sm:px-8 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold transition-all ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/90 border-b border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/90 border-b border-red-500/40 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5 max-w-7xl mx-auto w-full">
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-xs opacity-75 hover:opacity-100 p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar Tabs */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-[#120d0a] border border-amber-950/80 rounded-2xl p-2.5 space-y-1 shadow-xl sticky top-20">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-amber-500/80 border-b border-amber-950/60 mb-1">
              Menu Dashboard
            </div>

            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'general'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4" />
                <span>Umum &amp; Kontak</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'hero'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Hero &amp; UI Teks</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('zones')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'zones'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4" />
                <span>Area &amp; Suasana ({data.zones?.length || 0})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'menu'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Coffee className="w-4 h-4" />
                <span>Katalog Menu ({data.menu?.length || 0})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'schedule'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Ritual / Jadwal ({data.schedule?.length || 0})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4" />
                <span>Review Pengunjung ({data.reviews?.length || 0})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('hiddenElements')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'hiddenElements'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <EyeOff className="w-4 h-4" />
                <span>Sembunyikan Bagian</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </aside>

        {/* Tab Content Panels */}
        <main className="flex-1 bg-[#120d0a] border border-amber-950/80 rounded-3xl p-5 sm:p-8 shadow-xl text-left min-w-0">
          {/* ================= 1. TAB: GENERAL & KONTAK ================= */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="border-b border-amber-950/60 pb-4">
                <h2 className="text-xl font-bold text-white">Informasi Umum &amp; Kontak</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Atur identitas kafe, alamat, jam operasional, dan nomor kontak WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Nama Kafe / Brand
                  </label>
                  <input
                    type="text"
                    value={data.general?.siteName || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, siteName: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tagline Utama
                  </label>
                  <input
                    type="text"
                    value={data.general?.tagline || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, tagline: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Nomor WhatsApp (Format: 6285941304719)
                  </label>
                  <input
                    type="text"
                    value={data.general?.whatsapp || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, whatsapp: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Nomor Telepon Tampilan
                  </label>
                  <input
                    type="text"
                    value={data.general?.phone || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, phone: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    value={data.general?.email || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, email: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Akun Instagram URL
                  </label>
                  <input
                    type="text"
                    value={data.general?.instagram || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, instagram: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Jam Buka Hari Kerja (Weekday)
                  </label>
                  <input
                    type="text"
                    value={data.general?.openingHoursWeekday || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, openingHoursWeekday: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Jam Buka Akhir Pekan (Weekend)
                  </label>
                  <input
                    type="text"
                    value={data.general?.openingHoursWeekend || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, openingHoursWeekend: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    value={data.general?.address || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, address: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Google Maps Link URL
                  </label>
                  <input
                    type="text"
                    value={data.general?.googleMapsUrl || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, googleMapsUrl: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Deskripsi Ringkas Kafe (Untuk SEO &amp; Meta)
                  </label>
                  <textarea
                    rows={3}
                    value={data.general?.description || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        general: { ...data.general, description: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Logo Uploader */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-zinc-950 border border-amber-950/80 space-y-3">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Logo Kafe (File atau URL)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-900 p-0.5 overflow-hidden shrink-0 ring-1 ring-amber-500/50">
                      <img
                        src={data.general?.logo || '/logo.svg'}
                        alt="Logo"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        value={data.general?.logo || ''}
                        onChange={(e) =>
                          setData({
                            ...data,
                            general: { ...data.general, logo: e.target.value },
                          })
                        }
                        placeholder="/logo.svg atau URL gambar..."
                        className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Logo Baru</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleUploadImage(
                                file,
                                (url) =>
                                  setData({
                                    ...data,
                                    general: { ...data.general, logo: url },
                                  }),
                                'logo'
                              );
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. TAB: HERO & UI ================= */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="border-b border-amber-950/60 pb-4">
                <h2 className="text-xl font-bold text-white">Teks Hero &amp; Bagian Tampilan</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Atur teks headline sambutan, subtitle, dan tombol aksi di halaman beranda.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Badge Pill Atas
                  </label>
                  <input
                    type="text"
                    value={data.ui?.heroBadge || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        ui: { ...data.ui, heroBadge: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Judul Utama Headline Hero
                  </label>
                  <input
                    type="text"
                    value={data.ui?.heroTitle || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        ui: { ...data.ui, heroTitle: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Subtitle Penjelasan Hero
                  </label>
                  <textarea
                    rows={4}
                    value={data.ui?.heroSubtitle || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        ui: { ...data.ui, heroSubtitle: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Tombol Utama (CTA 1)
                    </label>
                    <input
                      type="text"
                      value={data.ui?.heroCtaPrimary || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          ui: { ...data.ui, heroCtaPrimary: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Tombol Kedua (CTA 2)
                    </label>
                    <input
                      type="text"
                      value={data.ui?.heroCtaSecondary || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          ui: { ...data.ui, heroCtaSecondary: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Tombol Reservasi (CTA 3)
                    </label>
                    <input
                      type="text"
                      value={data.ui?.heroCtaTertiary || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          ui: { ...data.ui, heroCtaTertiary: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-950/60">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Footer Tagline
                    </label>
                    <textarea
                      rows={2}
                      value={data.ui?.footerTagline || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          ui: { ...data.ui, footerTagline: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Footer Subtitle Heart Note
                    </label>
                    <textarea
                      rows={2}
                      value={data.ui?.footerHeartText || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          ui: { ...data.ui, footerHeartText: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 3. TAB: CAFE ZONES ================= */}
          {activeTab === 'zones' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-950/60 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Area &amp; Suasana Kafe</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Kelola spot duduk, deskripsi kenyamanan, suasana (vibe), dan foto masing-masing area.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newZone: CafeZone = {
                      id: `zone-${Date.now()}`,
                      name: 'Area Baru',
                      subtitle: 'Deskripsi singkat area',
                      tagline: 'Tagline suasana area',
                      description: 'Penjelasan lengkap suasana dan kenyamanan di area ini.',
                      features: ['Wi-Fi Kencang', 'Stopkontak di setiap meja'],
                      vibe: 'Tenang & Nyaman',
                      bestFor: 'Kerja santai atau membaca buku',
                      image:
                        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
                    };
                    setData({ ...data, zones: [...(data.zones || []), newZone] });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Area Baru</span>
                </button>
              </div>

              <div className="space-y-6">
                {(data.zones || []).map((zone, idx) => (
                  <div
                    key={zone.id || idx}
                    className="p-5 rounded-2xl bg-zinc-950 border border-amber-950/80 space-y-4 relative"
                  >
                    <div className="flex items-center justify-between border-b border-amber-950/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-base text-white">{zone.name}</h3>
                      </div>
                      <button
                        onClick={() => {
                          const updated = (data.zones || []).filter((_, i) => i !== idx);
                          setData({ ...data, zones: updated });
                        }}
                        className="text-zinc-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
                        title="Hapus Area"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Nama Area
                        </label>
                        <input
                          type="text"
                          value={zone.name}
                          onChange={(e) => {
                            const updated = [...data.zones];
                            updated[idx].name = e.target.value;
                            setData({ ...data, zones: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={zone.subtitle}
                          onChange={(e) => {
                            const updated = [...data.zones];
                            updated[idx].subtitle = e.target.value;
                            setData({ ...data, zones: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Tagline Suasana
                        </label>
                        <input
                          type="text"
                          value={zone.tagline}
                          onChange={(e) => {
                            const updated = [...data.zones];
                            updated[idx].tagline = e.target.value;
                            setData({ ...data, zones: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Suasana (Vibe)
                        </label>
                        <input
                          type="text"
                          value={zone.vibe}
                          onChange={(e) => {
                            const updated = [...data.zones];
                            updated[idx].vibe = e.target.value;
                            setData({ ...data, zones: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Paling Cocok Untuk (Best For)
                        </label>
                        <input
                          type="text"
                          value={zone.bestFor}
                          onChange={(e) => {
                            const updated = [...data.zones];
                            updated[idx].bestFor = e.target.value;
                            setData({ ...data, zones: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Deskripsi Lengkap
                        </label>
                        <textarea
                          rows={3}
                          value={zone.description}
                          onChange={(e) => {
                            const updated = [...data.zones];
                            updated[idx].description = e.target.value;
                            setData({ ...data, zones: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Zone Photo */}
                      <div className="sm:col-span-2 space-y-2">
                        <label className="block text-xs font-semibold text-zinc-300">
                          Foto Area
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="w-24 h-16 rounded-xl bg-zinc-900 border border-amber-950/80 overflow-hidden shrink-0">
                            <img
                              src={zone.image}
                              alt={zone.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 w-full space-y-2">
                            <input
                              type="text"
                              value={zone.image}
                              onChange={(e) => {
                                const updated = [...data.zones];
                                updated[idx].image = e.target.value;
                                setData({ ...data, zones: updated });
                              }}
                              className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                            <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Foto Area</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleUploadImage(
                                      file,
                                      (url) => {
                                        const updated = [...data.zones];
                                        updated[idx].image = url;
                                        setData({ ...data, zones: updated });
                                      },
                                      `zone-${idx}`
                                    );
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="sm:col-span-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-zinc-300">
                            Fasilitas / Keunggulan Area
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...data.zones];
                              updated[idx].features = [
                                ...(updated[idx].features || []),
                                'Fasilitas baru',
                              ];
                              setData({ ...data, zones: updated });
                            }}
                            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Tambah Fasilitas</span>
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {(zone.features || []).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => {
                                  const updated = [...data.zones];
                                  updated[idx].features[fIdx] = e.target.value;
                                  setData({ ...data, zones: updated });
                                }}
                                className="flex-1 bg-zinc-900 border border-amber-950 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...data.zones];
                                  updated[idx].features.splice(fIdx, 1);
                                  setData({ ...data, zones: updated });
                                }}
                                className="text-zinc-500 hover:text-red-400 p-1"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 4. TAB: MENU CATALOG ================= */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-950/60 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Katalog Menu &amp; Minuman</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Kelola menu kopi signature, manual brew, bakery, dan non-coffee beserta harga dan tasting notes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newItem: CuratedMenuItem = {
                      id: `menu-${Date.now()}`,
                      name: 'Menu Baru',
                      category: 'signature',
                      price: 'IDR 38,000',
                      description: 'Deskripsi racikan menu kopi istimewa.',
                      origin: 'House Blend Specialty',
                      tastingNotes: ['Cokelat', 'Karamel'],
                      pairing: 'Sangat cocok dinikmati dengan croissant hangat.',
                      image:
                        'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
                      badge: 'New Item ✨',
                    };
                    setData({ ...data, menu: [...(data.menu || []), newItem] });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Menu Baru</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'Semua Menu' },
                  { key: 'signature', label: 'Signature Espresso' },
                  { key: 'manual', label: 'Slow Bar V60' },
                  { key: 'pastry', label: 'Bakery & Croissant' },
                  { key: 'non-coffee', label: 'Artisan Non-Coffee' },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setMenuCategoryFilter(cat.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      menuCategoryFilter === cat.key
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-amber-950/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredMenu.map((item) => {
                  const realIdx = (data.menu || []).findIndex((m) => m.id === item.id);
                  if (realIdx === -1) return null;

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-zinc-950 border border-amber-950/80 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-amber-950/60 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-amber-950/80 overflow-hidden shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-white">{item.name}</h3>
                            <span className="text-[11px] font-semibold text-amber-400">
                              {item.price}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const updated = [...data.menu];
                            updated.splice(realIdx, 1);
                            setData({ ...data, menu: updated });
                          }}
                          className="text-zinc-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
                          title="Hapus Menu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1">
                            Nama Menu
                          </label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const updated = [...data.menu];
                              updated[realIdx].name = e.target.value;
                              setData({ ...data, menu: updated });
                            }}
                            className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1">
                            Kategori
                          </label>
                          <select
                            value={item.category}
                            onChange={(e) => {
                              const updated = [...data.menu];
                              updated[realIdx].category = e.target.value as any;
                              setData({ ...data, menu: updated });
                            }}
                            className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="signature">Signature Espresso</option>
                            <option value="manual">Slow Bar Hand-Pour</option>
                            <option value="pastry">Fresh Bakery</option>
                            <option value="non-coffee">Artisan Non-Coffee</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1">
                            Harga
                          </label>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => {
                              const updated = [...data.menu];
                              updated[realIdx].price = e.target.value;
                              setData({ ...data, menu: updated });
                            }}
                            placeholder="IDR 36,000"
                            className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-zinc-300 mb-1">
                            Deskripsi Racikan
                          </label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...data.menu];
                              updated[realIdx].description = e.target.value;
                              setData({ ...data, menu: updated });
                            }}
                            className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1">
                            Badge Penanda
                          </label>
                          <input
                            type="text"
                            value={item.badge || ''}
                            onChange={(e) => {
                              const updated = [...data.menu];
                              updated[realIdx].badge = e.target.value;
                              setData({ ...data, menu: updated });
                            }}
                            placeholder="House Signature ⭐"
                            className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 mb-1">
                            Origin Biji Kopi
                          </label>
                          <input
                            type="text"
                            value={item.origin || ''}
                            onChange={(e) => {
                              const updated = [...data.menu];
                              updated[realIdx].origin = e.target.value;
                              setData({ ...data, menu: updated });
                            }}
                            className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-zinc-300 mb-1">
                            Tasting Notes (pisahkan dengan koma)
                          </label>
                          <input
                            type="text"
                            value={(item.tastingNotes || []).join(', ')}
                            onChange={(e) => {
                              const updated = [...data.menu];
                              updated[realIdx].tastingNotes = e.target.value
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean);
                              setData({ ...data, menu: updated });
                            }}
                            placeholder="Brown Sugar, Toasted Almond, Creamy Finish"
                            className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        {/* Image URL & Upload */}
                        <div className="sm:col-span-3 space-y-2">
                          <label className="block text-xs font-semibold text-zinc-300">
                            Foto Menu
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              value={item.image}
                              onChange={(e) => {
                                const updated = [...data.menu];
                                updated[realIdx].image = e.target.value;
                                setData({ ...data, menu: updated });
                              }}
                              className="flex-1 bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold cursor-pointer shrink-0">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleUploadImage(
                                      file,
                                      (url) => {
                                        const updated = [...data.menu];
                                        updated[realIdx].image = url;
                                        setData({ ...data, menu: updated });
                                      },
                                      `menu-${realIdx}`
                                    );
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 5. TAB: SCHEDULE RITUALS ================= */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-950/60 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Ritual Suasana &amp; Jadwal</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Atur pembagian suasana pagi, siang deep work, dan santai sore di Aroma Coffee.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newSched: ScheduleItem = {
                      time: '08:00 AM - 12:00 PM WIB',
                      label: 'Ritual Baru',
                      description: 'Penjelasan suasana pada jam ini.',
                      ideal: 'Aktivitas yang paling cocok dilakukan.',
                    };
                    setData({
                      ...data,
                      schedule: [...(data.schedule || []), newSched],
                    });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Ritual Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {(data.schedule || []).map((sched, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950 border border-amber-950/80 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-amber-950/60 pb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-sm text-white">{sched.label}</span>
                      </div>
                      <button
                        onClick={() => {
                          const updated = [...data.schedule];
                          updated.splice(idx, 1);
                          setData({ ...data, schedule: updated });
                        }}
                        className="text-zinc-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Rentang Waktu
                        </label>
                        <input
                          type="text"
                          value={sched.time}
                          onChange={(e) => {
                            const updated = [...data.schedule];
                            updated[idx].time = e.target.value;
                            setData({ ...data, schedule: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Nama Ritual / Suasana
                        </label>
                        <input
                          type="text"
                          value={sched.label}
                          onChange={(e) => {
                            const updated = [...data.schedule];
                            updated[idx].label = e.target.value;
                            setData({ ...data, schedule: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Deskripsi Suasana
                        </label>
                        <textarea
                          rows={2}
                          value={sched.description}
                          onChange={(e) => {
                            const updated = [...data.schedule];
                            updated[idx].description = e.target.value;
                            setData({ ...data, schedule: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Paling Cocok Untuk (Ideal For)
                        </label>
                        <input
                          type="text"
                          value={sched.ideal}
                          onChange={(e) => {
                            const updated = [...data.schedule];
                            updated[idx].ideal = e.target.value;
                            setData({ ...data, schedule: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 6. TAB: REVIEWS ================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-950/60 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Review &amp; Testimoni Pengunjung</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Kelola cerita pengalaman dan ulasan pelanggan setia kafe.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newRev: ReviewItem = {
                      id: `rev-${Date.now()}`,
                      name: 'Nama Pengunjung',
                      role: 'Profesi / Pelanggan Harian',
                      rating: 5,
                      comment: 'Kopi dan suasananya sangat berkesan dan nyaman untuk bekerja.',
                      avatar:
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
                      favoriteSpot: 'The Living Room',
                    };
                    setData({
                      ...data,
                      reviews: [...(data.reviews || []), newRev],
                    });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Review Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {(data.reviews || []).map((rev, idx) => (
                  <div
                    key={rev.id || idx}
                    className="p-5 rounded-2xl bg-zinc-950 border border-amber-950/80 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-amber-950/60 pb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-white">{rev.name}</h3>
                          <p className="text-[11px] text-zinc-400">{rev.role}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const updated = [...data.reviews];
                          updated.splice(idx, 1);
                          setData({ ...data, reviews: updated });
                        }}
                        className="text-zinc-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Nama Pengunjung
                        </label>
                        <input
                          type="text"
                          value={rev.name}
                          onChange={(e) => {
                            const updated = [...data.reviews];
                            updated[idx].name = e.target.value;
                            setData({ ...data, reviews: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Profesi / Pekerjaan
                        </label>
                        <input
                          type="text"
                          value={rev.role}
                          onChange={(e) => {
                            const updated = [...data.reviews];
                            updated[idx].role = e.target.value;
                            setData({ ...data, reviews: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Spot Favorit
                        </label>
                        <input
                          type="text"
                          value={rev.favoriteSpot}
                          onChange={(e) => {
                            const updated = [...data.reviews];
                            updated[idx].favoriteSpot = e.target.value;
                            setData({ ...data, reviews: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                          Komentar Review
                        </label>
                        <textarea
                          rows={2}
                          value={rev.comment}
                          onChange={(e) => {
                            const updated = [...data.reviews];
                            updated[idx].comment = e.target.value;
                            setData({ ...data, reviews: updated });
                          }}
                          className="w-full bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-3 space-y-2">
                        <label className="block text-xs font-semibold text-zinc-300">
                          Foto Avatar
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={rev.avatar}
                            onChange={(e) => {
                              const updated = [...data.reviews];
                              updated[idx].avatar = e.target.value;
                              setData({ ...data, reviews: updated });
                            }}
                            className="flex-1 bg-zinc-900 border border-amber-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Avatar</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleUploadImage(
                                    file,
                                    (url) => {
                                      const updated = [...data.reviews];
                                      updated[idx].avatar = url;
                                      setData({ ...data, reviews: updated });
                                    },
                                    `rev-${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 7. TAB: HIDDEN ELEMENTS ================= */}
          {activeTab === 'hiddenElements' && (
            <div className="space-y-6">
              <div className="border-b border-amber-950/60 pb-4">
                <h2 className="text-xl font-bold text-white">Sembunyikan / Tampilkan Bagian Website</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Matikan atau hidupkan komponen tertentu di website dengan satu klik tanpa perlu menghapus datanya.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'section-philosophy', label: 'Filosofi & Story Kafe' },
                  { id: 'section-zones', label: 'Daftar Area & Suasana (Living Room, dll)' },
                  { id: 'section-menu', label: 'Katalog Menu Unggulan di Beranda' },
                  { id: 'section-schedule', label: 'Ritual Suasana & Jam Buka' },
                  { id: 'section-reviews', label: 'Review & Testimoni Pelanggan' },
                  { id: 'section-reservation-banner', label: 'Banner Ajakan Reservasi Meja' },
                  { id: 'section-location', label: 'Peta & Lokasi Kafe' },
                  { id: 'section-top-notice', label: 'Banner Jam Buka Paling Atas' },
                ].map((elem) => {
                  const isHidden = !!(data.hiddenElements && data.hiddenElements[elem.id]);

                  return (
                    <div
                      key={elem.id}
                      className="p-4 rounded-2xl bg-zinc-950 border border-amber-950/80 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-semibold text-xs sm:text-sm text-white block">
                          {elem.label}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">{elem.id}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const currentMap = data.hiddenElements || {};
                          setData({
                            ...data,
                            hiddenElements: {
                              ...currentMap,
                              [elem.id]: !isHidden,
                            },
                          });
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isHidden
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {isHidden ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Tersembunyi</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Tampil</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
