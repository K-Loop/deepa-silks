import React from "react";
import { Link } from "react-router-dom";
import { RiAwardLine, RiShieldCheckLine, RiHandHeartLine, RiArrowRightLine } from "react-icons/ri";

export default function BrandStory() {
  const pillars = [
    {
      title: "Authentic Silk Heritage",
      desc: "Every Kanchipuram and soft silk saree is woven with traditional motifs passed down through generations of master artisans.",
      icon: RiAwardLine,
    },
    {
      title: "Purity & Tested Zari",
      desc: "We stand for absolute transparency. High-grade tested gold and copper zari weaves designed to shine for decades.",
      icon: RiShieldCheckLine,
    },
    {
      title: "Complete Family Destination",
      desc: "Bridal muhurtham sarees, groom dhotis, kids pattu pavadais, and festive lehengas — everything under one roof.",
      icon: RiHandHeartLine,
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20 border-b border-[#C6A15B]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Overlapping Luxury Fabric & Zari Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-2 border-[#C6A15B]/40 bg-[#FFF9EF]">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
                  alt="Deepa Silks Zari Weave Close-up"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Floating Accent Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-3/5 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#C6A15B]/40">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#78152B]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#78152B]">
                    Heritage Brand
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#211A19]">
                  தீபா சில்க்ஸ் • Karur &amp; Dharmapuri
                </h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                  Welcoming families across Tamil Nadu with authentic weaves and warm retail care.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#78152B] mb-2 block">
                The Deepa Silks Legacy
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#211A19] leading-tight"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                Woven with Devotion, <br />
                Cherished for Generations
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              At Deepa Silks &amp; Readymades, every drape tells a story of authentic South Indian artistry. Sourced directly from master weaver clusters, our sarees encapsulate the royal luster of Kanchipuram, the softness of fine silks, and the vibrant festive cheer of contemporary family ensembles.
            </p>

            {/* 3 Pillars */}
            <div className="space-y-4 pt-2">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={pillar.title} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF9EF] border border-[#C6A15B]/40 flex items-center justify-center text-[#78152B] shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#211A19]">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#78152B] hover:text-[#C91D32] transition-colors"
              >
                <span>Read our complete story</span>
                <RiArrowRightLine className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
