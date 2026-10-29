'use client';

import React, { useState, useEffect } from 'react';
import { useAdminEdit } from './AdminEditContext';
import { Camera, Upload, Check, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface EditableImageProps {
  contentKey: string;
  initialSrc: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  asBackground?: boolean;
  triggerOnly?: boolean;
  buttonLabel?: string;
  buttonClassName?: string;
  onImageChange?: (newSrc: string) => void;
  children?: React.ReactNode;
}

export default function EditableImage({
  contentKey,
  initialSrc,
  alt = 'Aroma Coffee Imagery',
  className = '',
  containerClassName = '',
  asBackground = false,
  triggerOnly = false,
  buttonLabel,
  buttonClassName,
  onImageChange,
  children,
}: EditableImageProps) {
  const { isAuthenticated, isEditMode, updateKey, uploadImage, showStatus } = useAdminEdit();
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [tempSrc, setTempSrc] = useState(initialSrc);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentSrc(initialSrc);
    setTempSrc(initialSrc);
  }, [initialSrc]);

  // Regular visitor or edit mode is off
  if (!isAuthenticated || !isEditMode) {
    if (triggerOnly) return null;
    if (asBackground) {
      return (
        <div
          className={containerClassName}
          style={{ backgroundImage: `url('${currentSrc}')` }}
        >
          {children}
        </div>
      );
    }
    return <img src={currentSrc} alt={alt} className={className} />;
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTempSrc(currentSrc);
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setTempSrc(currentSrc);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadImage(file);
      setTempSrc(uploadedUrl);
      showStatus('success', 'Image uploaded successfully! Click Save to apply.');
    } catch (err: any) {
      showStatus('error', err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!tempSrc.trim() || tempSrc === currentSrc) {
      setIsOpenModal(false);
      return;
    }

    try {
      setIsSaving(true);
      const ok = await updateKey(contentKey, tempSrc.trim());
      if (ok) {
        setCurrentSrc(tempSrc.trim());
        onImageChange?.(tempSrc.trim());
        setIsOpenModal(false);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const renderModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#140e0b] text-white border border-amber-900/60 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl z-10 animate-fade-in text-left"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-zinc-950 shadow-md">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">
              Update Photography
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              {contentKey}
            </p>
          </div>
        </div>

        {/* Preview Box */}
        <div className="mb-4 rounded-2xl overflow-hidden border border-amber-950/80 bg-zinc-950 aspect-video relative flex items-center justify-center">
          {tempSrc ? (
            <img
              src={tempSrc}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-zinc-500">No image specified</span>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
              <span className="text-xs text-white font-semibold">
                Compressing &amp; Uploading...
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Upload File Button */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              1. Upload from Computer / Phone
            </label>
            <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-dashed border-amber-900/60 hover:border-amber-500 hover:bg-amber-950/20 cursor-pointer text-xs font-semibold text-zinc-200 transition-all">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>{isUploading ? 'Uploading...' : 'Choose File (.jpg, .png, .webp)'}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif,.jpg,.jpeg,.png,.webp,.avif,.gif"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <p className="text-[11px] text-zinc-400 mt-1">
              Max 4MB. Automatically compressed to sharp WebP format (~50-80% smaller).
            </p>
          </div>

          {/* Or Direct URL */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              2. Or Provide Image URL
            </label>
            <input
              type="text"
              value={tempSrc}
              onChange={(e) => setTempSrc(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-amber-950 text-white placeholder-zinc-500 focus:border-amber-500 outline-none font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-amber-950/80">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="py-2.5 px-4 rounded-xl border border-amber-950 text-zinc-300 hover:bg-zinc-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading || !tempSrc.trim()}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Photo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (triggerOnly) {
    return (
      <>
        <button
          type="button"
          onClick={handleOpen}
          className={
            buttonClassName
              ? buttonClassName
              : 'inline-flex items-center gap-1.5 bg-zinc-950/95 hover:bg-amber-500 hover:text-zinc-950 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-2xl border border-amber-500/30 backdrop-blur-md transition-all hover:scale-105 pointer-events-auto cursor-pointer'
          }
          title={`Update image [${contentKey}]`}
        >
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>{buttonLabel || 'Change Hero Image'}</span>
        </button>

        {isOpenModal && renderModal()}
      </>
    );
  }

  return (
    <>
      <div className={`relative group/img-edit inline-block ${containerClassName}`}>
        {asBackground ? (
          <div
            className={className}
            style={{ backgroundImage: `url('${currentSrc}')` }}
          >
            {children}
          </div>
        ) : (
          <img
            src={currentSrc}
            alt={alt}
            className={`${className} transition-all group-hover/img-edit:brightness-90`}
          />
        )}

        <button
          type="button"
          onClick={handleOpen}
          className={`absolute ${
            buttonClassName
              ? buttonClassName
              : asBackground
              ? 'top-24 right-4 sm:right-8 z-30'
              : 'top-3 right-3 z-30'
          } inline-flex items-center gap-1.5 bg-zinc-950/95 hover:bg-amber-500 hover:text-zinc-950 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-2xl border border-amber-500/30 backdrop-blur-md transition-all hover:scale-105 pointer-events-auto cursor-pointer`}
          title={`Update image [${contentKey}]`}
        >
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>{buttonLabel || 'Change Photo'}</span>
        </button>
      </div>

      {isOpenModal && renderModal()}
    </>
  );
}
