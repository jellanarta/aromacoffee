'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Armchair, Coffee, MapPin, LayoutGrid } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Synchronize drawer status with Navbar
  useEffect(() => {
    const handleMenuState = (e: any) => {
      if (e.detail && typeof e.detail.open === 'boolean') {
        setIsMenuOpen(e.detail.open);
      }
    };
    window.addEventListener('aroma-menu-state', handleMenuState);
    return () => window.removeEventListener('aroma-menu-state', handleMenuState);
  }, []);

  const handleToggleMore = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('aroma-toggle-menu'));
  };

  const mainItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Ambiance', href: '/ambiance', icon: Armchair },
    { label: 'Menu', href: '/menu', icon: Coffee },
    { label: 'Location', href: '/location', icon: MapPin },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' && !isMenuOpen;
    return pathname.startsWith(href) && !isMenuOpen;
  };

  // Hide on login or admin page (called after all hooks to obey Rules of Hooks)
  if (pathname.startsWith('/login') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#120d0a]/95 backdrop-blur-xl border-t border-amber-950/80 px-2 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,0.6)] pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {mainItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                active
                  ? 'text-amber-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  active ? 'bg-amber-500/15 scale-105' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {active && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute -top-0.5" />
              )}
            </Link>
          );
        })}

        {/* "More" button to toggle the full navigation drawer */}
        <button
          type="button"
          onClick={handleToggleMore}
          aria-label="Toggle more navigation options"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative cursor-pointer ${
            isMenuOpen
              ? 'text-amber-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-transform ${
              isMenuOpen
                ? 'bg-amber-500/20 scale-105 rotate-90 duration-300'
                : 'transition-transform duration-300'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            More
          </span>
          {isMenuOpen && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute -top-0.5" />
          )}
        </button>
      </div>
    </aside>
  );
}
