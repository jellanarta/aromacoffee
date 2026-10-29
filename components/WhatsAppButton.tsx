'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsapp?: string;
  siteName?: string;
}

export default function WhatsAppButton({
  whatsapp = '6285941304719',
  siteName = 'Aroma Coffee & Eatery',
}: WhatsAppButtonProps) {
  const pathname = usePathname();

  // Normalize WhatsApp number (strip +, spaces, dashes, leading 0 to 62)
  const cleanNumber = (whatsapp || '6285941304719').replace(/[^0-9]/g, '');
  const formattedNumber = cleanNumber.startsWith('0')
    ? '62' + cleanNumber.slice(1)
    : cleanNumber || '6285941304719';

  // Don't show on admin or login pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  const encodedMsg = encodeURIComponent(
    `Halo ${siteName}, saya ingin tanya ketersediaan meja / reservasi.`
  );
  const waUrl = `https://wa.me/${formattedNumber}?text=${encodedMsg}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-20 lg:bottom-8 right-4 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-500"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat langsung via WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-[#20ba5a] to-[#25D366] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulsing online indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-[#0f0c0a]" />
        </span>

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white/20 text-white" />
        <span className="sr-only">Chat via WhatsApp</span>

        {/* Desktop Hover Tooltip */}
        <span className="hidden lg:flex items-center gap-1.5 absolute right-16 bg-[#140e0b]/95 text-white border border-amber-900/60 text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl pointer-events-none -translate-x-1 group-hover:translate-x-0 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Chat Barista & Reservasi</span>
        </span>
      </a>
    </aside>
  );
}
