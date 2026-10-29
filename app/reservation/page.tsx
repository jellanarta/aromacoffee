import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TableReservation from '@/components/TableReservation';
import { HelpCircle, CheckCircle2, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { getSiteContent } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const currentYear = new Date().getFullYear();
  return {
    title: `Table Reservation & Space Booking - Aroma Coffee & Eatery ${currentYear}`,
    description:
      `Reserve your spot for remote work, casual meetups, or group discussions at Aroma Coffee Senopati in ${currentYear}. Instant confirmation via WhatsApp.`,
    keywords: [
      'cafe reservation Senopati',
      'book work table coffee shop Jakarta',
      'meeting space cafe South Jakarta',
      'Aroma Coffee table reservation',
    ],
  };
}

export default async function ReservationPage() {
  const data = await getSiteContent();
  const { general } = data;
  const currentYear = new Date().getFullYear();

  const faqs = [
    {
      q: 'Do I need a reservation, or are walk-ins welcome?',
      a: 'Walk-ins are always warmly welcomed! We keep ample seating open for spontaneous visits. Reservations are recommended if you are bringing a group (>4 people), desire a specific table near power sockets, or plan to visit during weekend peak hours.',
    },
    {
      q: 'How long will my table be held if I run into traffic?',
      a: 'Reserved tables are held for up to 15 minutes past your scheduled arrival. If you encounter Jakarta traffic, simply send a quick WhatsApp to our barista and we will happily hold it for you.',
    },
    {
      q: 'Is there a minimum spend or room rental fee?',
      a: 'There is zero room rental fee for our indoor lounge, reading armchairs, or garden patio. Simply order any beverage or pastry of your choice while you work and enjoy the space.',
    },
    {
      q: 'Are pets allowed in the cafe?',
      a: 'Yes, absolutely! Our shaded Garden Patio is completely pet-friendly. We even provide fresh water bowls for well-behaved dogs and cats.',
    },
    {
      q: 'Can I host a team meeting or workshop?',
      a: 'Yes! The Creative Meeting Nook is designed for collaborative sessions of up to 8 people, featuring wide reclaimed teak tables, power outlets, and comfortable acoustic separation.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] flex flex-col selection:bg-amber-600 selection:text-white">
      <Navbar data={data} />

      <main className="flex-1">
        {/* Table Reservation Component */}
        <TableReservation />

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 bg-[#0a0705] border-t border-amber-950/40 text-left">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
              Everything You Need to Know About Visiting
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#140e0b] border border-amber-950/60 space-y-2 hover:border-amber-700/40 transition-colors"
                >
                  <h3 className="font-bold text-white text-base flex items-start gap-2.5">
                    <span className="text-amber-500 shrink-0 font-mono">0{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Help Box */}
            <div className="mt-10 p-6 rounded-2xl bg-[#16100d] border border-amber-700/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-white text-sm">Have a special custom inquiry?</h4>
                <p className="text-xs text-zinc-400 font-light">
                  Need private space rental for private events or commercial photoshoots? Speak directly with our cafe manager.
                </p>
              </div>

              <a
                href={`https://wa.me/${general.whatsapp}?text=Hello%20Aroma%20Coffee,%20I%20have%20a%20special%20inquiry%20regarding%20space%20booking.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-4 py-3 rounded-xl transition-colors shrink-0 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
