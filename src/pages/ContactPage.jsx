import React, { useState } from "react";
import { RiMapPinLine, RiPhoneLine, RiTimeLine, RiSendPlaneFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "../config/site";
import { buildGeneralWhatsAppUrl } from "../lib/whatsapp";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("karur");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const branchName = selectedBranch === "karur" ? "Karur Showroom" : "Dharmapuri Showroom";
    const textLines = [
      `Hi Deepa Silks!`,
      `My name is ${name || "Customer"}.`,
      phone ? `Phone: ${phone}` : null,
      `Showroom Branch: ${branchName}`,
      message ? `Enquiry: ${message}` : "I would like to inquire about your saree collections.",
    ].filter(Boolean);

    const waUrl = `https://wa.me/${siteConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(textLines.join("\n"))}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="bg-[#FFF9EF] min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative bg-[#211A19] text-white py-14 sm:py-20 border-b border-[#C6A15B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold text-[#DFBF7E] uppercase tracking-widest block mb-2">
            Get in Touch
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
          >
            We'd Love to Hear From You
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto mt-2 font-light">
            Visit our Karur and Dharmapuri showrooms or connect instantly via WhatsApp for customized wedding drapes and bridal orders.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid (From Reference Mockup Contact Section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Store Details & Interactive Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C6A15B]/30 shadow-xs space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#211A19]">
                Showroom Details
              </h2>

              {/* Showroom Cards */}
              <div className="space-y-4">
                {siteConfig.stores.map((store) => (
                  <div
                    key={store.id}
                    className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#C6A15B]/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-base text-[#78152B]">
                        {store.city} ({store.tamilCity})
                      </h3>
                      <span className="text-[10px] text-stone-500 font-semibold bg-white px-2 py-0.5 rounded border border-stone-200">
                        {store.hours}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 flex items-start gap-1.5 pt-1">
                      <RiMapPinLine className="w-3.5 h-3.5 text-[#78152B] shrink-0 mt-0.5" />
                      <span>{store.address}, {store.cityState}</span>
                    </p>
                    <p className="text-xs text-stone-600 flex items-center gap-1.5">
                      <RiPhoneLine className="w-3.5 h-3.5 text-[#78152B] shrink-0" />
                      <span>{store.phone}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct WhatsApp Action Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      Direct WhatsApp Desk
                    </h4>
                    <p className="text-[11px] text-emerald-800">
                      Fastest replies for price &amp; video calls
                    </p>
                  </div>
                </div>
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  Chat Now
                </a>
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C6A15B]/30 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#211A19] mb-4">
                Send an Enquiry Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-[#78152B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Contact Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-[#78152B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Preferred Showroom
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-[#78152B]"
                    >
                      <option value="karur">Karur Showroom</option>
                      <option value="dharmapuri">Dharmapuri Showroom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    What are you looking for?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Wedding Kanchipuram silk sarees in crimson color, kids pavadai sattai, or bridal party lehengas..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-[#78152B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#78152B] hover:bg-[#550E1E] text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <RiSendPlaneFill className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp Enquiry</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Styled Map Mockup (Matching Reference Mockup Contact Section) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C6A15B]/30 shadow-xs h-full flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#211A19] mb-2">
                  Store Location Map
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Centrally located in Karur and Dharmapuri textile hubs with customer parking and accessibility.
                </p>

                {/* Stylized Vector Map Visual matching Reference Mockup */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 bg-[#E8ECEF] shadow-inner flex items-center justify-center">
                  <svg
                    viewBox="0 0 600 450"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-cover"
                  >
                    <rect width="600" height="450" fill="#F4F3F0" />
                    <path d="M0 60 Q 150 90, 300 40 T 600 80 L 600 0 L 0 0 Z" fill="#E2EBE2" />
                    <path d="M380 300 Q 480 340, 600 310 L 600 450 L 380 450 Z" fill="#E4ECEF" />
                    <path d="M0 225 H 600" stroke="#FFFFFF" strokeWidth="20" />
                    <path d="M0 225 H 600" stroke="#E5E0D8" strokeWidth="16" />
                    <path d="M300 0 V 450" stroke="#FFFFFF" strokeWidth="22" />
                    <path d="M300 0 V 450" stroke="#E5E0D8" strokeWidth="18" />
                    <path d="M80 0 L 520 450" stroke="#FFFFFF" strokeWidth="12" />
                    <path d="M520 0 L 80 450" stroke="#FFFFFF" strokeWidth="10" />

                    <rect x="120" y="80" width="140" height="100" rx="6" fill="#EDE9E3" />
                    <rect x="340" y="80" width="160" height="100" rx="6" fill="#EDE9E3" />
                    <rect x="120" y="270" width="140" height="120" rx="6" fill="#EDE9E3" />
                    <rect x="340" y="270" width="160" height="120" rx="6" fill="#EDE9E3" />

                    <g transform="translate(300, 225)">
                      <circle cx="0" cy="0" r="28" fill="#C91D32" fillOpacity="0.2" className="animate-ping" />
                      <circle cx="0" cy="0" r="14" fill="#C91D32" fillOpacity="0.3" />
                      <path
                        d="M0 -36 C -12 -36, -20 -24, -20 -12 C -20 6, 0 16, 0 16 C 0 16, 20 6, 20 -12 C 20 -24, 12 -36, 0 -36 Z"
                        fill="#C91D32"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                      />
                      <circle cx="0" cy="-14" r="6" fill="#FFFFFF" />
                    </g>
                  </svg>

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-stone-200">
                    <span className="text-[10px] font-bold text-[#78152B] uppercase tracking-wider block">
                      Deepa Silks &amp; Readymades
                    </span>
                    <span className="text-xs font-semibold text-stone-800">
                      Karur &amp; Dharmapuri Showrooms
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Parking available for cars &amp; two-wheelers</span>
                <span className="font-semibold text-[#78152B]">Open all 7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
