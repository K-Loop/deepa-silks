import React from "react";
import { Link } from "react-router-dom";
import { RiAwardLine, RiShieldCheckLine, RiHandHeartLine, RiSparklingFill, RiArrowRightLine } from "react-icons/ri";

export default function AboutPage() {
  return (
    <div className="bg-[#FFF9EF] min-h-screen pb-20">
      {/* 1. About Hero Banner */}
      <section className="relative bg-[#211A19] text-white py-16 sm:py-24 overflow-hidden border-b border-[#C6A15B]/30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#211A19] via-[#4A101C]/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
            alt="Deepa Silks Heritage"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-20">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#C6A15B]/40 text-[#DFBF7E] text-xs font-semibold uppercase tracking-wider">
              <RiSparklingFill className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Heritage &amp; Craftsmanship</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              About Deepa Silks
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Rooted in the timeless textile traditions of Tamil Nadu, celebrating the majesty of pure silk and welcoming families for every celebration.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Narrative Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C6A15B]/30 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#78152B] tracking-widest uppercase">
              Our Vision
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#211A19]"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Tradition Woven in Every Thread
            </h2>
            <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto rounded-full" />
          </div>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Deepa Silks &amp; Readymades (தீபா சில்க்ஸ்) is dedicated to bringing authentic South Indian textile artistry to families celebrating life’s most auspicious milestones. From pure Kanchipuram wedding drapes crafted with traditional temple zari borders to contemporary readymades designed for modern festive ease, our collections honor our deep cultural roots while embracing effortless style.
          </p>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            With prominent showroom destinations in <strong>Karur</strong> and <strong>Dharmapuri</strong>, we have earned the trust of generations of shoppers who seek authentic fabrics, genuine tested zari craftsmanship, and warm personal attention.
          </p>
        </div>

        {/* 3. Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#C6A15B]/30 shadow-xs text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF9EF] border border-[#C6A15B]/40 text-[#78152B] flex items-center justify-center mx-auto mb-4">
              <RiAwardLine className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#211A19] mb-2">
              Authentic Weaving
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Direct connection with hereditary weaver clusters across Kanchipuram, Coimbatore, and Banaras.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C6A15B]/30 shadow-xs text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF9EF] border border-[#C6A15B]/40 text-[#78152B] flex items-center justify-center mx-auto mb-4">
              <RiShieldCheckLine className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#211A19] mb-2">
              Zari &amp; Silk Assurance
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every pure silk piece is tested for fiber purity and zari richness so your heirloom drapes remain lustrous.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C6A15B]/30 shadow-xs text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF9EF] border border-[#C6A15B]/40 text-[#78152B] flex items-center justify-center mx-auto mb-4">
              <RiHandHeartLine className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#211A19] mb-2">
              Family Hospitality
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              A welcoming shopping environment where our staff takes pride in helping you match colors and select perfect sets.
            </p>
          </div>
        </div>

        {/* 4. CTA to Visit Showroom */}
        <div className="text-center pt-6">
          <Link
            to="/our-store"
            className="inline-flex items-center gap-2 bg-[#78152B] hover:bg-[#550E1E] text-white text-xs sm:text-sm font-semibold px-8 py-3.5 rounded-full shadow-md transition-colors"
          >
            <span>Visit Our Showrooms in Karur &amp; Dharmapuri</span>
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
