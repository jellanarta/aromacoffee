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
  accent?: string;
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

export const STORE_INFO = {
  name: 'Aroma Coffee & Eatery',
  tagline: 'Specialty Coffee Roastery & Warm Sanctuary',
  subtagline: 'A peaceful sanctuary designed for souls who need a moment to pause, reflect, and enjoy fine artisanal coffee.',
  whatsapp: '6285941304719',
  phone: '+62 859-4130-4719',
  email: 'jellanarta@gmail.com',
  address: 'Jl. Senopati No. 88, Kebayoran Baru, South Jakarta',
  googleMapsUrl: 'https://maps.google.com/?q=Jl.+Senopati+No.+88+Jakarta',
  openingHours: {
    weekday: '07:30 AM - 10:00 PM WIB',
    weekend: '07:00 AM - 11:00 PM WIB',
  },
  socials: {
    instagram: 'https://instagram.com/aromacoffee.id',
    spotify: 'https://spotify.com',
  },
};

export const CAFE_ZONES: CafeZone[] = [
  {
    id: 'zone-indoor',
    name: 'The Living Room & Co-Work Lounge',
    subtitle: 'Main Indoor Area • Full AC • Non-Smoking',
    tagline: 'Quiet, Cool & Tailored for Deep Focus',
    description:
      'Designed like a warm living room featuring vintage leather sofas, solid reclaimed teak tables, and gentle warm lighting that eases eye strain. Nearly every table has accessible power outlets and high-speed 100 Mbps fiber Wi-Fi with no complex login.',
    features: [
      'Power outlets at every work desk',
      'Chilled AC with fresh filtered air circulation',
      'Gentle lo-fi jazz background music at comfortable volume',
      'Curated art books, design journals & coffee magazines',
    ],
    vibe: 'Focused, Peaceful & Productive',
    bestFor: 'Remote working (WFH), reading books, or quiet one-on-one meetings',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    accent: 'border-amber-700/60',
  },
  {
    id: 'zone-slowbar',
    name: 'The Slow Bar & Roastery Corner',
    subtitle: 'Barista Counter • Interactive Space',
    tagline: 'Witness the Art of Brewing & Smell Fresh Roasts',
    description:
      'Sit on elevated wooden bar stools and watch our baristas pour coffee drop by drop using V60, Origami, or Aeropress methods. Feel free to chat with our head roaster about the origin, terroir, and processing methods of single-origin beans roasted weekly in-house.',
    features: [
      'Direct interaction with certified master baristas',
      'Weekly rotating single-origin micro-lot coffees',
      'Aromatherapy glass jars of freshly roasted Indonesian beans',
      'Aesthetic photography viewpoint facing the La Marzocco machine',
    ],
    vibe: 'Warm, Educational & Soulful',
    bestFor: 'Manual brew enthusiasts, solo coffee explorers, or casual conversations',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
    accent: 'border-amber-600/60',
  },
  {
    id: 'zone-garden',
    name: 'Garden Patio & Shaded Terrace',
    subtitle: 'Semi-Outdoor Garden • Smoking Friendly • Pet-Friendly',
    tagline: 'Cool Foliage Breezes Beneath Shaded Tree Canopies',
    description:
      'An open-air retreat surrounded by tropical greenery, textured gravel, and shaded architectural awnings. In the late afternoon, warm fairy lights illuminate the patio, creating an enchanting environment for chilled cold brews and relaxed conversations alongside your beloved pets.',
    features: [
      'Completely pet-friendly patio with water bowls',
      'Naturally ventilated smoking permitted area',
      'Romantic amber string lighting during evening hours',
      'Round community tables seating 4-6 guests comfortably',
    ],
    vibe: 'Relaxed, Lush & Breezy',
    bestFor: 'Late afternoon catchups, pet owners, fresh air chillouts',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    accent: 'border-emerald-700/60',
  },
  {
    id: 'zone-nook',
    name: 'The Creative Nook & Team Corner',
    subtitle: 'Semi-Private Alcove • Seats up to 8 Guests',
    tagline: 'A Cozy Corner for Brainstorms & Intimate Group Sessions',
    description:
      'Tucked away near the back library wall, this alcove provides privacy without feeling isolated. Features a long natural live-edge teak communal table, wall magnetic boards for sprint planning, and dedicated dual power sockets for collaborative team laptop sessions.',
    features: [
      'Long solid live-edge teakwood communal table',
      'Dedicated power strip with 8 multi-plug outlets',
      'Acoustic wall baffles to keep conversations clear & private',
      'Can be reserved ahead for creative teams or book clubs',
    ],
    vibe: 'Inspiring, Intimate & Collaborative',
    bestFor: 'Sprint planning, book club discussions, creative brainstorming sessions',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    accent: 'border-amber-500/60',
  },
];

export const CURATED_MENU: CuratedMenuItem[] = [
  {
    id: 'menu-1',
    name: 'Signature Palm Sugar Iced Latte',
    category: 'signature',
    price: 'IDR 38,000',
    description:
      'Double ristretto blend of Aceh Gayo & Flores Bajawa, fresh pasteurized dairy milk, and organic melted palm sugar infused with real pandan aroma.',
    origin: 'House Blend (70% Gayo Arabica, 30% Flores)',
    tastingNotes: ['Brown Sugar', 'Creamy Pandan', 'Roasted Almond'],
    pairing: 'Best enjoyed with our warm Almond Frangipane Croissant.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    badge: "Guest Favorite #1",
  },
  {
    id: 'menu-2',
    name: 'Single Origin V60 Kintamani Natural',
    category: 'manual',
    price: 'IDR 40,000',
    description:
      'Slow manual hand-pour over Japanese Hario V60 paper filter. Highlighted by bright citrus acidity, sweet honey notes, and floral jasmine aromatics.',
    origin: 'Kintamani, Bali (1,350 masl)',
    tastingNotes: ['Sweet Orange', 'Wild Honey', 'Jasmine Flower'],
    pairing: 'Perfect for morning focus sessions in the living room lounge.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    badge: 'Artisanal Filter',
  },
  {
    id: 'menu-3',
    name: 'Velvet Flat White',
    category: 'signature',
    price: 'IDR 36,000',
    description:
      'Rich double espresso shot crowned with silky micro-foam steamed milk, served at an optimal 62°C drinking temperature.',
    origin: 'Single Origin Toraja Sapan',
    tastingNotes: ['Dark Cocoa', 'Toasted Hazelnut', 'Silky Body'],
    pairing: 'Ideal companion for reading books on our deep leather armchairs.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop',
    badge: 'Classic Espresso',
  },
  {
    id: 'menu-4',
    name: 'Sparkling Yuzu Cold Brew',
    category: 'signature',
    price: 'IDR 42,000',
    description:
      '18-hour slow-steeped Arabica cold brew concentrate blended with Japanese yuzu citrus puree, artisanal tonic, and fresh rosemary sprig.',
    origin: 'Aceh Gayo Anaerobic Natural',
    tastingNotes: ['Crisp Citrus', 'Effervescent Tonic', 'Clean Herb'],
    pairing: 'The ultimate refresher during sunny afternoons on the garden patio.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    badge: 'Afternoon Refresher',
  },
  {
    id: 'menu-5',
    name: 'Gayo Wine Coffee Manual Drip',
    category: 'manual',
    price: 'IDR 42,000',
    description:
      'Special anaerobic fermentation producing rich aromas of red grapes, ripe cherries, and a complex lingering molasses finish.',
    origin: 'Takengon, Central Aceh (1,500 masl)',
    tastingNotes: ['Red Winey', 'Dark Grape', 'Molasses'],
    pairing: 'An exploratory tasting experience for coffee connoisseurs.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    badge: 'Special Ferment',
  },
  {
    id: 'menu-6',
    name: 'Artisan Uji Ceremonial Matcha',
    category: 'non-coffee',
    price: 'IDR 38,000',
    description:
      'Grade-A ceremonial matcha from Uji, Kyoto whisked with a bamboo chasen and folded into velvety steamed oat milk.',
    origin: 'Uji, Kyoto, Japan',
    tastingNotes: ['Earthy Umami', 'Subtle Sweetness', 'Velvety Body'],
    pairing: 'A mindful, soothing non-coffee drink to center your mind.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
    badge: 'Non-Coffee #1',
  },
  {
    id: 'menu-7',
    name: 'Almond Frangipane Croissant',
    category: 'pastry',
    price: 'IDR 38,000',
    description:
      'Artisanal French butter croissant with flaky layers, filled with rich sweet almond cream and toasted almond flakes.',
    tastingNotes: ['Flaky Crust', 'Buttery Sweet', 'Nutty Aroma'],
    pairing: 'The quintessential match for a hot Americano or Flat White.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    badge: 'Baked Daily 🥐',
  },
  {
    id: 'menu-8',
    name: 'Truffle Mushroom Beef Croissant',
    category: 'pastry',
    price: 'IDR 58,000',
    description:
      'Flaky butter pastry stuffed with smoked beef sirloin, sauteed champignon mushrooms, garlic cream, and aromatic truffle oil.',
    tastingNotes: ['Truffle Aroma', 'Savory Smoked Beef', 'Crispy Pastry'],
    pairing: 'A satisfying, gourmet brunch plate to fuel your productive workday.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    badge: 'Brunch Favorite',
  },
];

export const VIBE_SCHEDULE = [
  {
    time: '07:30 AM - 11:00 AM WIB',
    label: 'Morning Calm & Coffee Ritual',
    description:
      'Crisp morning air, gentle sunlight streaming through floor-to-ceiling glass, fresh roast aromas, and soft acoustic vinyl records.',
    ideal: 'Breakfast coffee + croissant, reading the morning paper, planning your workday.',
  },
  {
    time: '11:00 AM - 04:00 PM WIB',
    label: 'Deep Work & Co-Working Hours',
    description:
      'Pleasantly chilled AC, soothing instrumental lo-fi beats, uninterrupted 100 Mbps Wi-Fi, and convenient power sockets everywhere.',
    ideal: 'Focused laptop sprint, client discussions, collaborative project writing.',
  },
  {
    time: '04:00 PM - 10:00 PM WIB',
    label: 'Golden Hour & Evening Chill',
    description:
      'The outdoor garden patio cools down under amber string lights, evening breezes flow, and warm conversations start over iced brews.',
    ideal: 'Catching up with close friends, casual dates, unwinding after work.',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Aulia Rahmadina',
    role: 'Product Designer & Daily Visitor',
    rating: 5,
    comment:
      'By far the most comfortable cafe to work from in Senopati! The Palm Sugar Latte and Truffle Croissant are heavenly. Fast Wi-Fi, abundant outlets, and the music volume is always spot on.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    favoriteSpot: 'The Living Room (Window Desk)',
  },
  {
    id: 'rev-2',
    name: 'Dimas Prasetyo',
    role: 'Coffee Enthusiast & Software Engineer',
    rating: 5,
    comment:
      'The V60 Kintamani Natural is extracted to perfection. The baristas are genuinely passionate and welcoming. The slow bar counter makes you want to sit and talk coffee for hours.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    favoriteSpot: 'Slow Bar Counter',
  },
  {
    id: 'rev-3',
    name: 'Jessica Tanuwijaya',
    role: 'Author & Creative Freelancer',
    rating: 5,
    comment:
      'The semi-outdoor garden patio is wonderfully shaded in the late afternoon. I love bringing my golden retriever along while working on my drafts. Truly pet-friendly and welcoming staff.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    favoriteSpot: 'Garden Patio Outdoor',
  },
];
