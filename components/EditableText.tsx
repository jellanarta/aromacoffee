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
  linkPlaceholder = 'https://... or /menu',
  as: Component = 'span',
  className = '',
  multiline = false,
  placeholder = 'Click to edit text...',
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

  // Standard view for regular visitors or when edit mode is toggled off
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

  const handleSave = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsSaving(true);

    try {
      if (linkKey && tempLink !== currentLink) {
        await updateMultipleKeys({
          [contentKey]: tempValue,
          [linkKey]: tempLink,
        });
        setCurrentLink(tempLink);
      } else {
        await updateKey(contentKey, tempValue);
      }
      setCurrentValue(tempValue);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTempValue(currentValue);
    setTempLink(currentLink);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="inline-block relative z-50 p-2 bg-[#1c140f] border-2 border-amber-500 rounded-xl shadow-2xl text-left min-w-[240px] max-w-full"
      >
        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
          Editing: {contentKey}
        </span>

        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            rows={3}
            className="w-full p-2 bg-[#261c16] border border-amber-900/60 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2 bg-[#261c16] border border-amber-900/60 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
            placeholder={placeholder}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel(e as any);
            }}
          />
        )}

        {linkKey && (
          <div className="mt-2 flex items-center gap-1.5 bg-[#261c16] border border-amber-900/40 rounded-lg px-2 py-1">
            <LinkIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <input
              type="text"
              value={tempLink}
              onChange={(e) => setTempLink(e.target.value)}
              placeholder={linkPlaceholder}
              className="w-full bg-transparent text-[11px] text-zinc-300 focus:outline-none"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-1.5 mt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            title="Cancel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
            title="Save"
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            <span>Save</span>
          </button>
        </div>
      </span>
    );
  }

  return (
    <Component
      onClick={handleStartEdit}
      className={`group/edit cursor-pointer transition-all relative ${className}`}
      title="Click to edit"
    >
      {children || currentValue}
      <span className="inline-flex items-center ml-1.5 p-0.5 rounded bg-amber-500/20 text-amber-400 opacity-0 group-hover/edit:opacity-100 transition-opacity">
        <Edit3 className="w-3 h-3" />
      </span>
    </Component>
  );
}
