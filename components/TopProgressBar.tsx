'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // When route / URL finishes changing, complete the progress bar and fade out
  useEffect(() => {
    if (visible) {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Listen to clicks on all internal Next.js <Link> or <a> tags to trigger progress bar
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Only handle internal relative links
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        targetAttr !== '_blank' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        try {
          const targetUrl = new URL(target.href, window.location.href);
          // If only hash link on current page, ignore
          if (
            targetUrl.pathname === window.location.pathname &&
            targetUrl.search === window.location.search
          ) {
            return;
          }
        } catch {
          // Ignore URL parsing errors
        }

        // Start progress bar animation
        setVisible(true);
        setProgress(28);

        clearInterval(interval);
        interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 85) {
              clearInterval(interval);
              return 85;
            }
            return prev + Math.floor(Math.random() * 12) + 6;
          });
        }, 120);
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      clearInterval(interval);
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Warm Amber / Golden Roasted Glow Top Loading Bar */}
      <div
        className="h-[3px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_14px_rgba(245,158,11,0.95)] transition-all duration-200 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Glowing Head Point */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </div>
    </div>
  );
}
