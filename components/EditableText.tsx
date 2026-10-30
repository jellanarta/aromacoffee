'use client';

import React, { useState, useEffect } from 'react';
import { useAdminEdit } from './AdminEditContext';
import { Edit3, Check, X, Loader2, Link as LinkIcon } from 'lucide-react';

interface EditableTextProps {
  contentKey: string;
  initialValue: string;
  linkKey?: string;
  initialLink?: string;
  linkPlaceholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'strong' | 'label';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

export default function EditableText({
  contentKey,
  initialValue,
  linkKey,
  initialLink = '',
  linkPlaceholder = 'https://... atau /menu',
  as: Component = 'span',
  className = '',
  multiline = false,
  placeholder = 'Klik untuk mengisi teks...',
  children,
}: EditableTextProps) {
  const { isAuthenticated, isEditMode, updateKey, updateMultipleKeys } = useAdminEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);
  const [currentLink, setCurrentLink] = useState(initialLink);
  const [tempLink, setTempLink] = useState(initialLink);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentValue(initialValue);
    setTempValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setCurrentLink(initialLink);
    setTempLink(initialLink);
  }, [initialLink]);

  // Jika pengunjung biasa atau mode edit dimatikan
  if (!isAuthenticated || !isEditMode) {
    return <Component className={className}>{children || currentValue}</Component>;
  }

  const handleStartEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTempValue(currentValue);
    setTempLink(currentLink);
    setIsEditing(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTempValue(currentValue);
    setTempLink(currentLink);
    setIsEditing(false);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const textChanged = tempValue !== currentValue;
    const linkChanged = linkKey && tempLink !== currentLink;

    if (!textChanged && !linkChanged) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      if (linkKey && linkChanged) {
        const success = await updateMultipleKeys({
          [contentKey]: tempValue,
          [linkKey]: tempLink,
        });
        if (success) {
          setCurrentValue(tempValue);
          setCurrentLink(tempLink);
          setIsEditing(false);
        }
      } else {
        const success = await updateKey(contentKey, tempValue);
        if (success) {
          setCurrentValue(tempValue);
          setIsEditing(false);
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Saat sedang dalam mode form edit inline
  if (isEditing) {
    return (
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="relative inline-block w-full max-w-full my-2 text-left z-40"
      >
        <span className="block p-3.5 rounded-2xl bg-[#140e0b] border border-amber-900/80 shadow-2xl text-white">
          <span className="flex items-center justify-between text-[11px] font-mono text-amber-400 mb-2 font-semibold uppercase tracking-wider">
            <span>Edit: {contentKey}</span>
            {linkKey && (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                <span>+ Link URL</span>
              </span>
            )}
          </span>

          {/* Teks Input */}
          <div className="space-y-1 mb-2">
            <span className="block text-[10px] uppercase font-bold text-zinc-400">
              Teks Konten:
            </span>
            {multiline ? (
              <textarea
                rows={3}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder={placeholder}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl bg-zinc-950 text-white border border-amber-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none leading-relaxed"
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder={placeholder}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl bg-zinc-950 text-white border border-amber-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                autoFocus
              />
            )}
          </div>

          {/* Optional Link Input (hanya muncul jika linkKey diisi) */}
          {linkKey && (
            <div className="space-y-1 mb-2 pt-2 border-t border-amber-950/60">
              <span className="block text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                <span>Link URL Tujuan [{linkKey}]:</span>
              </span>
              <input
                type="text"
                value={tempLink}
                onChange={(e) => setTempLink(e.target.value)}
                placeholder={linkPlaceholder}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl bg-zinc-950 text-white border border-amber-950 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none font-mono"
              />
              <span className="block text-[10px] text-zinc-500">
                Gunakan format lengkap (https://wa.me/...) atau link halaman lokal (/menu, /reservation)
              </span>
            </div>
          )}

          <span className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-amber-950/60">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-zinc-400" />
              <span>Batal</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-950/50 transition-all hover:scale-105 cursor-pointer"
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
          </span>
        </span>
      </span>
    );
  }

  // Saat mode edit aktif tapi belum diklik edit (Persis seperti Melali)
  return (
    <span className="relative group/edit inline-block max-w-full">
      <Component
        className={`${className} transition-all group-hover/edit:outline-dashed group-hover/edit:outline-1 group-hover/edit:outline-amber-500/70 rounded px-1 -mx-1`}
      >
        {currentValue}
      </Component>
      <button
        type="button"
        onClick={handleStartEdit}
        className="opacity-0 group-hover/edit:opacity-100 transition-opacity absolute -top-3 -right-3 z-30 inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md hover:scale-105 cursor-pointer pointer-events-auto"
        title={linkKey ? `Edit teks & URL link [${contentKey}]` : `Edit teks [${contentKey}]`}
      >
        <Edit3 className="w-3 h-3" />
        <span>{linkKey ? 'Edit + Link' : 'Edit'}</span>
      </button>
    </span>
  );
}
