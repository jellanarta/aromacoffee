import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { AdminEditProvider } from '@/components/AdminEditContext';
import MobileBottomNav from '@/components/MobileBottomNav';
import TopProgressBar from '@/components/TopProgressBar';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export function generateMetadata(): Metadata {
  const currentYear = new Date().getFullYear();
  return {
    title: {
      default: `Aroma Coffee & Eatery - Specialty Roastery & Warm Sanctuary ${currentYear}`,
      template: `%s | Aroma Coffee & Eatery`,
    },
    description:
      `Aroma Coffee & Eatery offers artisanal Indonesian specialty coffee, fresh bakery brunch, and a quiet, cozy atmosphere designed for focus, reading, and meaningful conversations in ${currentYear}.`,
    keywords: [
      'aroma coffee',
      'specialty coffee roastery jakarta',
      'cozy cafe senopati',
      'laptop friendly cafe jakarta',
      'pet friendly garden cafe',
      `best coffee shop ${currentYear}`,
    ],
    openGraph: {
      title: 'Aroma Coffee & Eatery - A Warm Sanctuary Amidst the Bustling City',
      description:
        'More than just a coffee shop. Experience a cozy haven steeped in natural teak wood, soulful lo-fi jazz, and artisanal single-origin brews.',
      type: 'website',
      locale: 'en_US',
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/logo.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] antialiased flex flex-col selection:bg-amber-600 selection:text-white">
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        <AdminEditProvider>
          {children}
          <MobileBottomNav />
        </AdminEditProvider>
      </body>
    </html>
  );
}
