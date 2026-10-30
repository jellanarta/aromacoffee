'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Edit3,
  Check,
  X,
  Lock,
  Unlock,
  ExternalLink,
  LogOut,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
} from 'lucide-react';
import { SiteData } from '@/lib/types';
import { uploadImageFile } from '@/lib/imageUpload';

export interface AdminEditContextType {
  isAuthenticated: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  openLoginModal: () => void;
  logout: () => void;
  updateKey: (keyPath: string, value: any) => Promise<boolean>;
  updateMultipleKeys: (updates: Record<string, any>) => Promise<boolean>;
  updateItem: (collectionKey: string, index: number, updatedItem: any) => Promise<boolean>;
  addItem: (collectionKey: string, newItem: any) => Promise<boolean>;
  deleteItem: (collectionKey: string, index: number) => Promise<boolean>;
  hiddenElements: Record<string, boolean>;
  isElementHidden: (elementId: string) => boolean;
  toggleHide: (elementId: string) => Promise<boolean>;
  uploadImage: (file: File) => Promise<string>;
  isSaving: boolean;
  activeStatus: { type: 'success' | 'error' | 'info'; message: string } | null;
  showStatus: (type: 'success' | 'error' | 'info', message: string) => void;
}

const AdminEditContext = createContext<AdminEditContextType | null>(null);

export function useAdminEdit() {
  const ctx = useContext(AdminEditContext);
  if (!ctx) {
    throw new Error('useAdminEdit must be used within an AdminEditProvider');
  }
  return ctx;
}

function setNestedValue(obj: any, path: string, value: any): any {
  const clone = JSON.parse(JSON.stringify(obj || {}));
  const keys = path.split('.');
  let current = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const nextKey = keys[i + 1];
    if (!current[k] || typeof current[k] !== 'object') {
      current[k] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[k];
  }
  current[keys[keys.length - 1]] = value;
  return clone;
}

export function AdminEditProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: SiteData;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hiddenElements, setHiddenElements] = useState<Record<string, boolean>>(
    initialData?.hiddenElements || {}
  );
  const [activeStatus, setActiveStatus] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Check 24-hour session on mount from secure HTTP-only cookie
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/session');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.warn('Session verification check failed', e);
      }
    };
    checkSession();

    // Clean up any legacy plain text passwords in localStorage for safety
    try {
      localStorage.removeItem('aroma_admin_pwd');
      localStorage.removeItem('aroma_admin_pass');
      localStorage.removeItem('melali_admin_pass');
      localStorage.removeItem('aroma_admin_auth');

      const savedMode = localStorage.getItem('aroma_edit_mode');
      if (savedMode !== null) {
        setIsEditMode(savedMode === 'true');
      }
      if (initialData?.hiddenElements) {
        setHiddenElements(initialData.hiddenElements);
      }
    } catch (e) {}
  }, [initialData]);

  const showStatus = (type: 'success' | 'error' | 'info', message: string) => {
    setActiveStatus({ type, message });
    setTimeout(() => {
      setActiveStatus((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('aroma_edit_mode', String(next));
      } catch (e) {}
      return next;
    });
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      localStorage.removeItem('aroma_admin_pwd');
      localStorage.removeItem('aroma_admin_pass');
      localStorage.removeItem('melali_admin_pass');
      localStorage.removeItem('aroma_admin_auth');
      localStorage.removeItem('aroma_edit_mode');
    } catch (e) {}
    setIsAuthenticated(false);
    setIsEditMode(false);
    showStatus('info', 'Anda telah keluar dari mode editor.');
    router.refresh();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSaving(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginInput }),
      });

      const resJson = await res.json();
      if (!res.ok) {
        setLoginError(resJson.error || 'Password admin salah!');
        return;
      }

      setIsAuthenticated(true);
      setIsEditMode(true);
      try {
        localStorage.setItem('aroma_edit_mode', 'true');
      } catch (e) {}

      setIsLoginModalOpen(false);
      setLoginInput('');
      showStatus('success', 'Berhasil masuk! Sesi editor aktif 24 jam.');
      router.refresh();
    } catch (err: any) {
      setLoginError(err.message || 'Gagal terhubung ke server');
    } finally {
      setIsSaving(false);
    }
  };

  const saveContentToServer = async (newContent: any): Promise<boolean> => {
    try {
      setIsSaving(true);
      showStatus('info', 'Menyimpan perubahan ke website...');

      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          setIsLoginModalOpen(true);
        }
        showStatus('error', data.error || 'Gagal menyimpan perubahan');
        return false;
      }

      showStatus(
        'success',
        data.committedToGitHub
          ? 'Perubahan berhasil disimpan & di-commit ke GitHub!'
          : 'Perubahan berhasil disimpan!'
      );
      router.refresh();
      return true;
    } catch (err: any) {
      showStatus('error', err.message || 'Koneksi ke server bermasalah');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const fetchCurrentContent = async (): Promise<any> => {
    const res = await fetch('/api/get-content');
    if (!res.ok) {
      throw new Error('Failed to load current website content');
    }
    return await res.json();
  };

  const updateKey = async (keyPath: string, value: any): Promise<boolean> => {
    try {
      const current = await fetchCurrentContent();
      const updated = setNestedValue(current, keyPath, value);
      return await saveContentToServer(updated);
    } catch (e: any) {
      showStatus('error', e.message);
      return false;
    }
  };

  const updateMultipleKeys = async (updates: Record<string, any>): Promise<boolean> => {
    try {
      let current = await fetchCurrentContent();
      for (const [keyPath, value] of Object.entries(updates)) {
        current = setNestedValue(current, keyPath, value);
      }
      return await saveContentToServer(current);
    } catch (e: any) {
      showStatus('error', e.message);
      return false;
    }
  };

  const updateItem = async (
    collectionKey: string,
    index: number,
    updatedItem: any
  ): Promise<boolean> => {
    try {
      const current = await fetchCurrentContent();
      const list = current[collectionKey] || [];
      if (!Array.isArray(list) || index < 0 || index >= list.length) {
        showStatus('error', 'Item index not found in collection');
        return false;
      }
      list[index] = updatedItem;
      current[collectionKey] = list;
      return await saveContentToServer(current);
    } catch (e: any) {
      showStatus('error', e.message);
      return false;
    }
  };

  const addItem = async (collectionKey: string, newItem: any): Promise<boolean> => {
    try {
      const current = await fetchCurrentContent();
      const list = current[collectionKey] || [];
      list.push(newItem);
      current[collectionKey] = list;
      return await saveContentToServer(current);
    } catch (e: any) {
      showStatus('error', e.message);
      return false;
    }
  };

  const deleteItem = async (collectionKey: string, index: number): Promise<boolean> => {
    try {
      const current = await fetchCurrentContent();
      const list = current[collectionKey] || [];
      if (!Array.isArray(list) || index < 0 || index >= list.length) {
        showStatus('error', 'Invalid item index');
        return false;
      }
      list.splice(index, 1);
      current[collectionKey] = list;
      return await saveContentToServer(current);
    } catch (e: any) {
      showStatus('error', e.message);
      return false;
    }
  };

  const isElementHidden = (elementId: string): boolean => {
    return !!hiddenElements[elementId];
  };

  const toggleHide = async (elementId: string): Promise<boolean> => {
    const nextVal = !hiddenElements[elementId];
    const newMap = { ...hiddenElements, [elementId]: nextVal };
    setHiddenElements(newMap);
    return await updateKey(`hiddenElements.${elementId}`, nextVal);
  };

  const uploadImage = async (file: File): Promise<string> => {
    return await uploadImageFile(file);
  };

  return (
    <AdminEditContext.Provider
      value={{
        isAuthenticated,
        isEditMode,
        toggleEditMode,
        openLoginModal: () => setIsLoginModalOpen(true),
        logout,
        updateKey,
        updateMultipleKeys,
        updateItem,
        addItem,
        deleteItem,
        hiddenElements,
        isElementHidden,
        toggleHide,
        uploadImage,
        isSaving,
        activeStatus,
        showStatus,
      }}
    >
      {children}

      {/* ================= FLOATING ADMIN EDIT TOOLBAR ================= */}
      {isAuthenticated && (
        <aside
          aria-label="Toolbar Mode Editor"
          className="fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-50 flex flex-col gap-2 pointer-events-auto"
        >
          {/* Status Message Pill */}
          {activeStatus && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-xl backdrop-blur-md animate-fade-in ${
                activeStatus.type === 'success'
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : activeStatus.type === 'error'
                  ? 'bg-red-600 text-white shadow-red-600/30'
                  : 'bg-zinc-800 text-white'
              }`}
            >
              {activeStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : activeStatus.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              )}
              <span>{activeStatus.message}</span>
            </div>
          )}

          {/* Main Toolbar Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#120d0a]/95 text-white p-2 rounded-2xl shadow-2xl border border-amber-500/30 backdrop-blur-xl text-xs">
            {/* Editor Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 font-semibold text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="hidden sm:inline">Editor Visual</span>
            </div>

            {/* Mode Toggle Button */}
            <button
              onClick={toggleEditMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                isEditMode
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'bg-white/10 text-zinc-300 hover:text-white hover:bg-white/15'
              }`}
              title={isEditMode ? 'Nonaktifkan mode edit visual' : 'Aktifkan mode edit visual'}
            >
              {isEditMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isEditMode ? 'Edit: ON' : 'Edit: OFF'}</span>
            </button>

            {/* Dashboard Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-zinc-200 hover:text-white hover:bg-white/15 transition-all font-semibold"
              title="Buka Dashboard Admin Lengkap"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-1.5 rounded-xl bg-white/10 text-zinc-300 hover:text-red-400 hover:bg-white/15 transition-all"
              title="Keluar dari Mode Editor"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* ================= LOGIN MODAL ================= */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsLoginModalOpen(false)}
          />
          <div className="relative bg-[#140e0b] text-white border border-amber-900/60 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 animate-fade-in text-left">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-zinc-950 shadow-md">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  Login Editor Website
                </h3>
                <p className="text-xs text-zinc-400">
                  Edit teks, menu, harga, foto, dan jam buka langsung di website Aroma Coffee.
                </p>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Password Admin
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Password admin (default: melali123)"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="w-full text-sm px-4 py-3 rounded-xl bg-zinc-950 border border-amber-950 text-white placeholder-zinc-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/60 border border-red-500/30 p-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-amber-950 text-zinc-300 hover:bg-white/10 font-semibold text-sm transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Masuk Editor</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminEditContext.Provider>
  );
}
