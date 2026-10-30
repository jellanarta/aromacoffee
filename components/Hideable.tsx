'use client';

import React from 'react';
import { useAdminEdit } from './AdminEditContext';
import { Eye, EyeOff } from 'lucide-react';

interface HideableProps {
  id: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Hideable({
  id,
  label,
  children,
  className = '',
}: HideableProps) {
  const { isAuthenticated, isEditMode, isElementHidden, toggleHide, isSaving } = useAdminEdit();
  const hidden = isElementHidden(id);

  // Jika pengunjung biasa atau mode edit dimatikan
  if (!isAuthenticated || !isEditMode) {
    if (hidden) {
      // Benar-benar di-hide beserta teks dan seluruh isinya dari DOM!
      return null;
    }
    return <>{children}</>;
  }

  // Jika mode edit aktif & elemen sedang di-hide:
  if (hidden) {
    return (
      <div className={`relative border-2 border-dashed border-amber-900/60 bg-[#140e0b]/80 rounded-3xl p-4 sm:p-6 my-4 transition-all opacity-70 hover:opacity-100 group/hidden ${className}`}>
        {/* Banner Penanda Status Hide */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-amber-950/60 text-xs font-medium text-zinc-300">
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              [TERSEMBUNYI] Bagian ini tidak tampil ke pengunjung: <strong className="text-white font-semibold">{label || id}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleHide(id);
            }}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Klik untuk menampilkan kembali ke pengunjung"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Tampilkan Kembali</span>
          </button>
        </div>

        {/* Konten tetap terlihat oleh admin agar bisa tetap diedit */}
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    );
  }

  // Jika mode edit aktif & elemen sedang tampil normal (ada tombol sembunyikan on hover)
  return (
    <div className={`relative group/hideable ${className}`}>
      {/* Floating Hide Toggle Button on Hover */}
      <div className="absolute top-3 right-3 z-30 opacity-0 group-hover/hideable:opacity-100 transition-opacity pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleHide(id);
          }}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 bg-zinc-950/90 hover:bg-zinc-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-xl border border-amber-900/60 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title={`Sembunyikan ${label || id} dari pengunjung`}
        >
          <EyeOff className="w-3.5 h-3.5 text-amber-400" />
          <span>Sembunyikan Bagian Ini</span>
        </button>
      </div>

      {children}
    </div>
  );
}
