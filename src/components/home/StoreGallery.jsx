import React from "react";
import { Link } from "react-router-dom";
import { RiStackLine, RiSparklingFill, RiGroupLine, RiHandHeartLine, RiArrowRightLine, RiMapPinLine, RiTimeLine } from "react-icons/ri";
import { storeValues, storeGallery } from "../../data/collections";
import { siteConfig } from "../../config/site";

export default function StoreGallery() {
  const iconMap = {
    Layers: RiStackLine,
    Sparkles: RiSparklingFill,
    Users: RiGroupLine,
    HeartHandshake: RiHandHeartLine,
  };

  return (
    <section className="bg-[#FFF9EF] py-14 sm:py-20 border-b border-[#C6A15B]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#78152B] mb-2 block">
            Shop the Experience
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#211A19]"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
          >
            Visit Our Showrooms
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Experience our opulent silks in person across our Karur and Dharmapuri destinations.
          </p>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto mt-3 rounded-full" />
        </div>

        {/* 4 Value Propositions with React Icons (From Reference Mockup Page 4) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {storeValues.map((value) => {
            const IconComponent = iconMap[value.icon] || RiSparklingFill;
            return (
              <div
                key={value.id}
                className="bg-white rounded-2xl p-5 text-center border border-[#C6A15B]/30 shadow-xs hover:shadow-md hover:border-[#78152B] transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF9EF] border border-[#C6A15B]/40 group-hover:bg-[#78152B] flex items-center justify-center text-[#78152B] group-hover:text-white mx-auto mb-3 transition-colors">
                  <IconComponent className="w-5 h-5 shrink-0" />
                </div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#211A19] group-hover:text-[#78152B] transition-colors">
                  {value.title}
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Store Image Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {storeGallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 border border-[#C6A15B]/30 shadow-xs"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                <span className="text-[10px] text-[#DFBF7E] font-semibold uppercase tracking-wider block">
                  {item.category}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Store Locations Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl p-6 border border-[#C6A15B]/40 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#78152B]" />
                    <h4 className="font-serif font-bold text-lg text-[#78152B]">
                      {store.city} Showroom ({store.tamilCity})
                    </h4>
                  </div>
                  {store.isMain && (
                    <span className="text-[10px] bg-red-100 text-[#78152B] font-bold px-2 py-0.5 rounded-full">
                      Heritage Flagship
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-stone-600">
                  <p className="flex items-start gap-2">
                    <RiMapPinLine className="w-4 h-4 text-[#78152B] shrink-0 mt-0.5" />
                    <span>{store.address}, {store.cityState}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <RiTimeLine className="w-4 h-4 text-[#78152B] shrink-0" />
                    <span>{store.hours}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="text-xs font-bold text-[#78152B] hover:text-[#C91D32] flex items-center gap-1.5"
                >
                  <span>Get Directions</span>
                  <RiArrowRightLine className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/our-store"
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FFF9EF] text-[#78152B] border border-[#C6A15B]/30 hover:bg-[#78152B] hover:text-white transition-colors"
                >
                  Plan Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
