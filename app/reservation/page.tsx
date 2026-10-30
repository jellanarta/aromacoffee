import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TableReservation from '@/components/TableReservation';
import EditableText from '@/components/EditableText';
import Hideable from '@/components/Hideable';
import { AddItemButton, ItemCardActions } from '@/components/ItemEditorControls';
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

export const dynamic = 'force-dynamic';

export default async function ReservationPage() {
  const data = await getSiteContent();
  const { general, faqs = [], ui = {} } = data;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#f5ede6] flex flex-col selection:bg-amber-600 selection:text-white">
      <Navbar data={data} />

      <main className="flex-1">
        {/* Table Reservation Component */}
        <Hideable id="reservation.form" label="Formulir Reservasi Meja">
          <TableReservation data={data} />
        </Hideable>

        {/* FAQ Section */}
        <Hideable id="reservation.faq" label="Pertanyaan Sering Diajukan (FAQ)">
          <section className="py-16 sm:py-20 bg-[#0a0705] border-t border-amber-950/40 text-left">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-amber-950/40 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Frequently Asked Questions</span>
                  </div>

                  <EditableText
                    contentKey="ui.faqTitle"
                    initialValue={ui.faqTitle || 'Everything You Need to Know About Visiting'}
                    as="h2"
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight block"
                  />
                </div>

                <AddItemButton type="faq" collectionKey="faqs" label="+ Tambah FAQ Baru" />
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="p-6 rounded-2xl bg-[#140e0b] border border-amber-950/60 space-y-2 hover:border-amber-700/40 transition-colors relative group"
                  >
                    <div className="absolute top-4 right-4 z-20">
                      <ItemCardActions
                        type="faq"
                        collectionKey="faqs"
                        item={faq}
                        index={idx}
                      />
                    </div>

                    <h3 className="font-bold text-white text-base flex items-start gap-2.5 pr-14">
                      <span className="text-amber-500 shrink-0 font-mono">0{idx + 1}.</span>
                      <EditableText
                        contentKey={`faqs.${idx}.q`}
                        initialValue={faq.q}
                        as="span"
                      />
                    </h3>
                    <div className="pl-7 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      <EditableText
                        contentKey={`faqs.${idx}.a`}
                        initialValue={faq.a}
                        as="p"
                        multiline
                      />
                    </div>
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
        </Hideable>
      </main>

      <Footer />
    </div>
  );
}
