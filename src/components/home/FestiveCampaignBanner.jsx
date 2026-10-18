import React from "react";
import { Link } from "react-router-dom";
import { RiSparklingFill, RiArrowRightLine } from "react-icons/ri";

export default function FestiveCampaignBanner() {
  return (
    <section className="bg-[#FFF9EF] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#550E1E] via-[#78152B] to-[#420B17] text-white shadow-xl border border-[#C6A15B]/40">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 dark-textile-pattern opacity-10 pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
            {/* Left Model Photo */}
            <div className="md:col-span-5 relative order-2 md:order-1">
              <div className="relative mx-auto max-w-xs md:max-w-none">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#C6A15B]/40">
                  <img
                    src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80"
                    alt="Festive Celebrations at Deepa Silks"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Editorial Copy (From Reference UI) */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left order-1 md:order-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#C6A15B]/50 text-[#DFBF7E] text-xs font-semibold">
                <RiSparklingFill className="w-3.5 h-3.5 text-[#DFBF7E]" />
                <span>Wedding &amp; Festival Season Special</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                From Everyday Wear to <br className="hidden sm:inline" />
                Grand Occasions
              </h2>

              <p className="text-sm sm:text-base text-stone-200 max-w-lg leading-relaxed font-light">
                All your fashion needs under one roof. Handpicked pure silk sarees, bride &amp; groom family matching sets, designer lehengas, and children's festive pavadais.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 bg-[#C6A15B] hover:bg-[#DFBF7E] text-[#211A19] font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explore Collections</span>
                  <RiArrowRightLine className="w-4 h-4" />
                </Link>

                <Link
                  to="/our-store"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                >
                  <span>Visit Our Store</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
