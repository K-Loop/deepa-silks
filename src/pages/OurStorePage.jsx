import React from "react";
import { Link } from "react-router-dom";
import { RiMapPinLine, RiTimeLine, RiPhoneLine, RiStoreLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "../config/site";
import { storeValues, storeGallery } from "../data/collections";
import { buildGeneralWhatsAppUrl } from "../lib/whatsapp";

export default function OurStorePage() {
  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hi Deepa Silks! I am planning to visit your store and would like to know more about parking, location, or special wedding appointments."
  );

  return (
    <div className="bg-[#FFF9EF] min-h-screen pb-20">
      {/* 1. Store Hero Banner (Matching Reference Mockup 4) */}
      <section className="relative bg-[#211A19] text-white py-16 sm:py-24 overflow-hidden border-b border-[#C6A15B]/30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#211A19] via-[#4A101C]/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 z-0">
          <img
            src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80"
            alt="Deepa Silks Store Experience"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-20">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#C6A15B]/40 text-[#DFBF7E] text-xs font-semibold uppercase tracking-wider">
              <RiStoreLine className="w-3.5 h-3.5" />
              <span>Shop the Experience</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Visit Our Store
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Experience a wide range of collections and readymades in person. Touch authentic handwoven silk textures, witness tested zari sheens, and enjoy warm South Indian hospitality.
            </p>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C91D32] hover:bg-[#AB1528] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Plan Your Visit / Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Showroom Locations & Branch Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#211A19]"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
          >
            Showrooms at Karur &amp; Dharmapuri
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Open 7 days a week with dedicated saree drapers and bridal assistants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C6A15B]/40 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <span className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider block">
                      Tamil Nadu Branch
                    </span>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#78152B]">
                      {store.city} Showroom ({store.tamilCity})
                    </h3>
                  </div>
                  {store.isMain && (
                    <span className="text-xs bg-[#78152B] text-white px-3 py-1 rounded-full font-semibold">
                      Flagship
                    </span>
                  )}
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                  <div className="flex items-start gap-3">
                    <RiMapPinLine className="w-4 h-4 text-[#78152B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800 block">Address:</span>
                      <p>{store.address}</p>
                      <p>{store.cityState}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RiTimeLine className="w-4 h-4 text-[#78152B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800 block">Showroom Timings:</span>
                      <p>{store.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RiPhoneLine className="w-4 h-4 text-[#78152B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-800 block">Direct Assistance:</span>
                      <p>{store.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(
                    `Hi Deepa Silks! I'm planning to visit your ${store.city} showroom.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center flex items-center justify-center gap-2 shadow-2xs"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  <span>Notify Store on WhatsApp</span>
                </a>

                <Link
                  to="/contact"
                  className="bg-stone-100 hover:bg-[#78152B] hover:text-white text-stone-700 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors"
                >
                  View Map
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Photo Gallery of Showroom & Stacks of Silks (From Reference Mockup 4) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h3 className="font-serif text-xl font-bold text-[#211A19]">
            In-Store Gallery &amp; Ambience
          </h3>
          <p className="text-xs text-stone-500">
            Spacious, organized textile display racks and festive collection wings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {storeGallery.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 border border-[#C6A15B]/30 shadow-xs relative group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 text-white">
                <span className="font-serif text-xs sm:text-sm font-bold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
