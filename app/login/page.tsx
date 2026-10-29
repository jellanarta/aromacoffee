'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Home,
  CheckCircle2,
  LogOut,
  Coffee,
  Sparkles,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aroma_admin_pwd');
    if (saved) {
      setIsAlreadyLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!password.trim()) {
      setErrorMessage('Please enter the administrator password.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'The password you entered is incorrect!');
        setIsLoading(false);
        return;
      }

      // Save administrator session in browser
      localStorage.setItem('aroma_admin_auth', 'true');
      localStorage.setItem('aroma_admin_pwd', password);
      localStorage.setItem('aroma_edit_mode', 'true');

      // Trigger redirect to home or destination page
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setErrorMessage('Network connection error. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aroma_admin_auth');
    localStorage.removeItem('aroma_admin_pwd');
    localStorage.removeItem('aroma_edit_mode');
    setIsAlreadyLoggedIn(false);
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-md">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block group mb-4">
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 mx-auto shadow-2xl shadow-amber-950/70 border border-amber-500/40 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <img
              src="/logo.svg"
              alt="Aroma Coffee & Eatery"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </Link>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/25 text-amber-400 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Private Administration Portal</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Aroma Coffee &amp; Eatery
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Log in to manage site content, menu items, and photography
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#140e0b]/95 border border-amber-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left">
        {/* Ambient Glow accents */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

        {isAlreadyLoggedIn ? (
          <div className="space-y-5 text-center py-2 relative z-10">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">Administrator Session Active</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Your editing privileges are currently active on this device.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Live Content Editor</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <button
                onClick={handleLogout}
                type="button"
                className="w-full py-2.5 px-4 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out / Switch Account</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-zinc-300 mb-2"
              >
                Administrator Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password (default: aroma123)"
                  autoFocus
                  disabled={isLoading}
                  className="w-full bg-[#1e1510] border border-amber-950 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Log In to Editor</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Back to Home Link */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Aroma Coffee Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0a0705] flex flex-col items-center justify-center p-4 sm:p-6 text-zinc-200 selection:bg-amber-600 selection:text-white">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
            <span>Loading admin portal...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
