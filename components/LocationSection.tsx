'use client';

import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Wifi,
  Sparkles,
  Car,
  CheckCircle2,
} from 'lucide-react';
import { STORE_INFO } from '@/data/coffeeData';
import { SiteData } from '@/lib/types';
import EditableText from './EditableText';

export default function LocationSection({ data }: { data?: SiteData }) {
  const general = data?.general || STORE_INFO;
  const ui = data?.ui || {};

  const amenities = [
    { label: 'Fast 100 Mbps Fiber Wi-Fi', desc: 'Complimentary access with no time limits' },
    { label: 'Outlets at Every Table', desc: 'Easily charge your laptops and mobile devices' },
    { label: 'Indoor AC & Shaded Garden', desc: 'Separate comfortable non-smoking and outdoor areas' },
    { label: 'Spacious & Secure Parking', desc: 'Designated parking for cars and motorcycles' },
    { label: 'Clean Prayer Room (Musholla)', desc: 'Well-maintained space with prayer amenities' },
    { label: 'Pet-Friendly Outdoor Patio', desc: 'Bring your well-behaved pets to our garden' },
  ];

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#0a0705] border-t border-amber-950/40 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <EditableText
                contentKey="ui.locationBadge"
                initialValue={ui.locationBadge || 'Location & Visit Hours'}
                as="span"
              />
            </div>

            <EditableText
              contentKey="ui.locationTitle"
              initialValue={ui.locationTitle || 'Visit Aroma Coffee & Eatery'}
              as="h2"
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight block"
            />

            <EditableText
              contentKey="ui.locationSubtitle"
              initialValue={
                ui.locationSubtitle ||
                "Conveniently located in the heart of Senopati, easily accessible via public transit or private vehicles. Discover your quiet haven amidst Jakarta's urban pace."
              }
              as="p"
              multiline
              className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed block"
            />

            {/* Address & Hours List */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#140e0b] border border-amber-950/50 flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Cafe Address</h3>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    <EditableText
                      contentKey="general.address"
                      initialValue={general.address}
                      as="span"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140e0b] border border-amber-950/50 flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Opening Hours</h3>
                  <div className="text-xs text-zinc-400 mt-0.5 space-y-1">
                    <p>
                      Senin - Jumat:{' '}
                      <EditableText
                        contentKey="general.openingHoursWeekday"
                        initialValue={
                          ('openingHoursWeekday' in general ? general.openingHoursWeekday : undefined) ||
                          STORE_INFO.openingHours.weekday
                        }
                        as="span"
                        className="text-zinc-300 font-medium"
                      />
                    </p>
                    <p>
                      Sabtu - Minggu:{' '}
                      <EditableText
                        contentKey="general.openingHoursWeekend"
                        initialValue={
                          ('openingHoursWeekend' in general ? general.openingHoursWeekend : undefined) ||
                          STORE_INFO.openingHours.weekend
                        }
                        as="span"
                        className="text-zinc-300 font-medium"
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140e0b] border border-amber-950/50 flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Contact &amp; WhatsApp</h3>
                  <div className="text-xs text-zinc-400 mt-0.5 space-y-1">
                    <p>
                      WhatsApp:{' '}
                      <EditableText
                        contentKey="general.phone"
                        initialValue={general.phone}
                        as="span"
                        className="text-zinc-300 font-medium"
                      />
                    </p>
                    <p>
                      Email:{' '}
                      <EditableText
                        contentKey="general.email"
                        initialValue={general.email}
                        as="span"
                        className="text-zinc-300 font-medium"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <a
              href={general.googleMapsUrl || STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02]"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Right Map & Amenities */}
          <div className="lg:col-span-7 space-y-6">
            {/* Embedded Google Map Box */}
            <div className="rounded-3xl overflow-hidden border border-amber-950/60 shadow-2xl h-[340px] sm:h-[380px] bg-zinc-900 relative">
              <iframe
                title="Location Map Aroma Coffee & Eatery"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.275460598734!2d106.80808837586828!3d-6.227362860986561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f151bb21557d%3A0xbcfc11e64627d09b!2sJl.%20Senopati%2C%20Kec.%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Amenities Checklist */}
            <div className="bg-[#140e0b] border border-amber-950/50 rounded-3xl p-6 sm:p-7">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Amenities for Your Utmost Comfort</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">{item.label}</p>
                      <p className="text-[11px] text-zinc-400 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
