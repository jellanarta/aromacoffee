'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { STORE_INFO } from '@/data/coffeeData';

import { SiteData } from '@/lib/types';
import EditableText from './EditableText';

export default function TableReservation({ data }: { data?: SiteData }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [guests, setGuests] = useState('2 People');
  const [area, setArea] = useState('Indoor AC Lounge');

  const siteName = data?.general?.siteName || STORE_INFO.name;
  const whatsappNumber = data?.general?.whatsapp || STORE_INFO.whatsapp || '6285941304719';

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let text = `*TABLE RESERVATION - ${siteName.toUpperCase()}*\n`;
    text += `👤 *Name:* ${name || '-'}\n`;
    text += `📅 *Date:* ${date || 'Today'}\n`;
    text += `⏰ *Time:* ${time} WIB\n`;
    text += `👥 *Guests:* ${guests}\n`;
    text += `📍 *Preferred Area:* ${area}\n`;
    text += `\nPlease confirm table availability for this reservation. Thank you!`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="reservation" className="py-16 sm:py-24 bg-[#0c0907] relative border-t border-amber-950/40 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <EditableText
                contentKey="ui.reservationBadge"
                initialValue={data?.ui?.reservationBadge || 'Table & Space Reservation'}
                as="span"
              />
            </div>

            <EditableText
              contentKey="ui.reservationTitle"
              initialValue={data?.ui?.reservationTitle || 'Secure Your Cozy Spot at Aroma Coffee'}
              as="h2"
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight block"
            />

            <EditableText
              contentKey="ui.reservationSubtitle"
              initialValue={
                data?.ui?.reservationSubtitle ||
                'Whether you are meeting a client for coffee, settling in for a focused remote workday, or catching up with cherished friends, we prepare a seating space tailored to your needs.'
              }
              as="p"
              multiline
              className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed block"
            />

            {/* Feature highlights */}
            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Abundant Power Sockets',
                  desc: 'Convenient power outlets accessible at nearly every indoor and patio desk.',
                },
                {
                  title: 'High-Speed 100 Mbps Wi-Fi',
                  desc: 'Fast, reliable fiber internet with seamless connectivity for video calls and uploads.',
                },
                {
                  title: 'Flexible Seating Zones',
                  desc: 'Choose between the cool indoor lounge or the refreshing garden patio breeze.',
                },
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#140e0b] border border-amber-950/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{feat.title}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-light">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Phone / Callout */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90">
              Planning a group gathering of &gt;12 people for workshops or celebrations? Contact our team directly via WhatsApp for custom arrangements.
            </div>
          </div>

          {/* Right Form Card - Streamlined, Fast & Clean */}
          <div className="lg:col-span-7">
            <div className="bg-[#16100d] border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden coffee-glow">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">Quick Table Booking</h3>
              <p className="text-xs text-zinc-400 mb-6">
                Simple 4-field booking. Directly confirmed by our barista team via WhatsApp.
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* 1. Name */}
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Jonathan Lee"
                    className="w-full bg-[#1e1510] border border-amber-950 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* 2. Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Date of Visit *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#1e1510] border border-amber-950 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Arrival Time *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#1e1510] border border-amber-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="09:00">09:00 AM (Morning Calm)</option>
                      <option value="11:30">11:30 AM (Lunch Hour)</option>
                      <option value="14:00">02:00 PM (Afternoon Focus)</option>
                      <option value="16:30">04:30 PM (Golden Hour)</option>
                      <option value="19:00">07:00 PM (Dinner &amp; Chill)</option>
                      <option value="20:30">08:30 PM (Late Night Hangout)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Guests & Seating Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Party Size *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#1e1510] border border-amber-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="1 Person">1 Person (Solo Work / Read)</option>
                      <option value="2 People">2 People</option>
                      <option value="3-4 People">3 - 4 People</option>
                      <option value="5-8 People">5 - 8 People (Group Table)</option>
                      <option value=">8 People">&gt; 8 People (Communal Nook)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Preferred Area *
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-[#1e1510] border border-amber-950 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Indoor AC Lounge">Indoor AC Lounge (Non-Smoking)</option>
                      <option value="Garden Patio">Garden Patio (Outdoor &amp; Pet-Friendly)</option>
                      <option value="Barista Slow Bar">Barista Slow Bar Counter</option>
                      <option value="Creative Meeting Nook">Creative Meeting Nook</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-xl shadow-emerald-950/40 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Confirm Table Reservation via WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-zinc-400 text-center mt-2 font-light">
                    Instant confirmation directly with our barista on duty.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
