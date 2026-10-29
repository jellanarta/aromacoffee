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
} from 'lucide-react';
import { SiteData } from '@/lib/types';

export interface AdminEditContextType {
  isAuthenticated: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  openLoginModal: () => void;
  logout: () => void;
  updateKey: (keyPath: string, value: any) => Promise<boolean>;
  updateMultipleKeys: (updates: Record<string, any>) => Promise<boolean>;
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
  const [isSaving, setIsSaving] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeStatus, setActiveStatus] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Load session from localStorage
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('aroma_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
      const savedMode = localStorage.getItem('aroma_edit_mode');
      if (savedMode !== null) {
        setIsEditMode(savedMode === 'true');
      }
    } catch (e) {
      console.warn('localStorage not available', e);
    }
  }, []);

  const showStatus = (type: 'success' | 'error' | 'info', message: string) => {
    setActiveStatus({ type, message });
    setTimeout(() => {
      setActiveStatus((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Incorrect admin password');
        setIsLoggingIn(false);
        return;
      }

      localStorage.setItem('aroma_admin_auth', 'true');
      localStorage.setItem('aroma_admin_pwd', passwordInput);
      setIsAuthenticated(true);
      setIsEditMode(true);
      setIsLoginModalOpen(false);
      setPasswordInput('');
      showStatus('success', 'Admin mode enabled! Click any text to edit.');
      router.refresh();
    } catch (err: any) {
      setLoginError(err.message || 'Login connection failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('aroma_admin_auth');
    localStorage.removeItem('aroma_admin_pwd');
    setIsAuthenticated(false);
    showStatus('info', 'Logged out of admin mode');
    router.refresh();
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      localStorage.setItem('aroma_edit_mode', String(next));
      showStatus('info', next ? 'Edit mode enabled' : 'Preview mode enabled');
      return next;
    });
  };

  const saveContentToServer = async (updatedData: any): Promise<boolean> => {
    setIsSaving(true);
    try {
      const pwd = localStorage.getItem('aroma_admin_pwd') || 'aroma123';
      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedData, password: pwd }),
      });

      const result = await res.json();
      if (!res.ok) {
        showStatus('error', result.error || 'Failed to save changes');
        return false;
      }

      showStatus('success', 'Changes saved successfully!');
      router.refresh();
      return true;
    } catch (err: any) {
      showStatus('error', err.message || 'Error saving changes');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateKey = async (keyPath: string, value: any): Promise<boolean> => {
    try {
      const getRes = await fetch('/api/get-content');
      const current = await getRes.json();
      const updated = setNestedValue(current, keyPath, value);
      return await saveContentToServer(updated);
    } catch (e: any) {
      showStatus('error', 'Failed to fetch current content');
      return false;
    }
  };

  const updateMultipleKeys = async (updates: Record<string, any>): Promise<boolean> => {
    try {
      const getRes = await fetch('/api/get-content');
      let current = await getRes.json();
      for (const [keyPath, value] of Object.entries(updates)) {
        current = setNestedValue(current, keyPath, value);
      }
      return await saveContentToServer(current);
    } catch (e: any) {
      showStatus('error', 'Failed to fetch current content');
      return false;
    }
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
        isSaving,
        activeStatus,
        showStatus,
      }}
    >
      {children}

      {/* Floating Admin Toolbar (Visible when logged in) */}
      {isAuthenticated && (
        <aside
          aria-label="Admin Edit Toolbar"
          className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center gap-2 bg-[#19120e]/95 backdrop-blur-md border border-amber-500/40 px-3.5 py-2 rounded-2xl shadow-2xl text-xs"
        >
          <div className="flex items-center gap-1.5 pr-2 border-r border-white/10 font-bold text-amber-400">
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Mode</span>
          </div>

          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-semibold transition-colors ${
              isEditMode ? 'bg-amber-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            {isEditMode ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{isEditMode ? 'Editing Active' : 'Preview'}</span>
          </button>

          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 text-zinc-400 hover:text-red-400 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Status Toast Notification */}
      {activeStatus && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4 ${
            activeStatus.type === 'success'
              ? 'bg-emerald-600 text-white'
              : activeStatus.type === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-amber-600 text-white'
          }`}
        >
          {activeStatus.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{activeStatus.message}</span>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div
            className="bg-[#19120e] border border-amber-900/60 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-950/60 mb-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Admin Login</span>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="text-zinc-500 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full bg-[#201611] border border-amber-950 text-xs text-white p-2.5 rounded-xl focus:outline-none focus:border-amber-500"
                />
                {loginError && <p className="text-[11px] text-red-400 mt-1">{loginError}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              >
                {isLoggingIn && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Log In &amp; Edit Content</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminEditContext.Provider>
  );
}
