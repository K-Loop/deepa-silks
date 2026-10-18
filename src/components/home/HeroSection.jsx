import React from "react";
import { Link } from "react-router-dom";
import { RiSparklingFill, RiArrowRightLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { buildGeneralWhatsAppUrl } from "../../lib/whatsapp";

export default function HeroSection() {
  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hi Deepa Silks! I'm interested in exploring your silk saree and festive collections."
  );

  return (
    <section className="relative bg-[#211A19] text-white overflow-hidden">
      {/* Background Ambience with Warm Vignette & Festive Lighting Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#211A19] via-[#350F18]/90 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C91D32]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#C6A15B]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C6A15B]/40 text-[#E0C487] text-xs font-semibold tracking-wider uppercase">
              <RiSparklingFill className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Tradition Meets Modern Style</span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Tradition <br className="hidden sm:inline" />
              Woven in <br />
              <span className="gold-gradient-text">Every Thread</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-light">
              Discover timeless silk sarees, authentic Kanchipuram masterworks, and elegant readymades for every occasion and generation.
            </p>

            {/* Dual CTAs matching UI reference */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary: Explore Collections */}
              <Link
                to="/sarees"
                className="inline-flex items-center gap-2.5 bg-[#C91D32] hover:bg-[#AB1528] text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-full shadow-lg hover:shadow-red-900/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Collections</span>
                <RiArrowRightLine className="w-4 h-4" />
              </Link>

              {/* Secondary: Chat on WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-full shadow-lg hover:shadow-emerald-900/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FaWhatsapp className="w-5 h-5 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md text-stone-300 text-xs">
              <div>
                <span className="font-serif font-bold text-lg text-[#DFBF7E] block">100%</span>
                <span className="text-[11px] text-stone-400">Pure Silk Tested</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#DFBF7E] block">5,000+</span>
                <span className="text-[11px] text-stone-400">Curated Weaves</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#DFBF7E] block">Karur &amp;</span>
                <span className="text-[11px] text-stone-400">Dharmapuri Stores</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Fashion Silk Saree Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Gold Filigree Border Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#C6A15B] via-[#78152B] to-[#C6A15B] opacity-50 blur-xs -z-10" />

              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C6A15B]/50 bg-[#350F18]">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                  alt="Deepa Silks Kanchipuram Silk Saree Model"
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Image Tag Overlay */}
                <div className="absolute bottom-4 inset-x-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#DFBF7E] uppercase font-bold tracking-wider block">
                      Featured Muhurtham Silk
                    </span>
                    <span className="text-xs font-semibold text-white">
                      Crimson &amp; Gold Pure Zari
                    </span>
                  </div>
                  <Link
                    to="/sarees?category=kanchipuram"
                    className="text-xs bg-[#78152B] hover:bg-[#C91D32] text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
