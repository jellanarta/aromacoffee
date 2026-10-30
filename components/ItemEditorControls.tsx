'use client';

import React, { useState } from 'react';
import { useAdminEdit } from './AdminEditContext';
import EditableItemModal, { ItemType } from './EditableItemModal';
import { Plus, Edit3, Trash2 } from 'lucide-react';

interface AddItemButtonProps {
  type: ItemType;
  collectionKey: string;
  label?: string;
  className?: string;
}

export function AddItemButton({
  type,
  collectionKey,
  label,
  className = '',
}: AddItemButtonProps) {
  const { isAuthenticated, isEditMode } = useAdminEdit();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated || !isEditMode) return null;

  const defaultLabels: Record<ItemType, string> = {
    zone: '+ Tambah Zona Kafe',
    menu: '+ Tambah Menu Kopi',
    schedule: '+ Tambah Ritme Harian',
    review: '+ Tambah Ulasan',
    gallery: '+ Tambah Foto Galeri',
    faq: '+ Tambah Pertanyaan FAQ',
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg shadow-amber-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer ${className}`}
        title={`Tambah item baru ke ${collectionKey}`}
      >
        <Plus className="w-4 h-4" />
        <span>{label || defaultLabels[type]}</span>
      </button>

      {isOpen && (
        <EditableItemModal
          type={type}
          collectionKey={collectionKey}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

interface ItemCardActionsProps {
  type: ItemType;
  collectionKey: string;
  item: any;
  index: number;
  className?: string;
}

export function ItemCardActions({
  type,
  collectionKey,
  item,
  index,
  className = '',
}: ItemCardActionsProps) {
  const { isAuthenticated, isEditMode, deleteItem, isSaving } = useAdminEdit();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated || !isEditMode) return null;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const name = item.name || item.title || 'item ini';
    if (!confirm(`Yakin ingin menghapus ${name}?`)) return;
    await deleteItem(collectionKey, index);
  };

  return (
    <>
      <div
        className={`flex items-center gap-1.5 pointer-events-auto z-30 ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="inline-flex items-center gap-1 bg-zinc-950/90 hover:bg-amber-500 hover:text-zinc-950 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-amber-900/60 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          title={`Edit ${item.name || item.title || 'item'}`}
        >
          <Edit3 className="w-3 h-3 text-amber-400 group-hover:text-zinc-950" />
          <span>Edit Item</span>
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isSaving}
          className="inline-flex items-center p-1 rounded-full bg-zinc-950/90 hover:bg-zinc-800 text-white text-[11px] shadow-lg border border-amber-900/60 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          title="Hapus Item"
        >
          <Trash2 className="w-3 h-3 text-zinc-400 hover:text-red-400" />
        </button>
      </div>

      {isOpen && (
        <EditableItemModal
          type={type}
          collectionKey={collectionKey}
          initialItem={item}
          itemIndex={index}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
