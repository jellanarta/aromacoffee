export interface CuratedMenuItem {
  id: string;
  name: string;
  category: 'signature' | 'manual' | 'pastry' | 'non-coffee';
  price: string;
  description: string;
  origin?: string;
  tastingNotes: string[];
  pairing?: string;
  image: string;
  badge?: string;
}

export interface CafeZone {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  features: string[];
  vibe: string;
  bestFor: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  favoriteSpot: string;
}

export interface ScheduleItem {
  time: string;
  label: string;
  description: string;
  ideal: string;
}

export interface SiteData {
  general: {
    siteName: string;
    tagline: string;
    description: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    googleMapsUrl: string;
    openingHoursWeekday: string;
    openingHoursWeekend: string;
    instagram: string;
    spotify: string;
    logo?: string;
  };
  ui: Record<string, string>;
  zones: CafeZone[];
  menu: CuratedMenuItem[];
  schedule: ScheduleItem[];
  reviews: ReviewItem[];
  hiddenElements?: Record<string, boolean>;
}
