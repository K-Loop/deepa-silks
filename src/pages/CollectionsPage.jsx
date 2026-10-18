import React from "react";
import { Link } from "react-router-dom";
import { RiSparklingFill, RiArrowRightLine } from "react-icons/ri";
import FestiveCampaignBanner from "../components/home/FestiveCampaignBanner";

export default function CollectionsPage() {
  const campaigns = [
    {
      id: "wedding-muhurtham",
      title: "The Auspicious Muhurtham Collection",
      subtitle: "Royal Kanchipuram Bridal Silks",
      desc: "Heavily adorned Korvai sarees featuring Gandaberunda, Mayil, and temple gold zari borders designed for traditional wedding ceremonies.",
      link: "/sarees?category=bridal",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      tag: "Bridal Exclusive",
    },
    {
      id: "family-celebrations",
      title: "Family Matching Festive Ensembles",
      subtitle: "Coordinated Joy for All Generations",
      desc: "Harmonious festive outfits for mother-daughter, siblings, and family celebrations in synchronized color themes.",
      link: "/readymades?category=family-wear",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80",
      tag: "Family Festive",
    },
    {
      id: "royal-banarasi-designer",
      title: "The Imperial Brocade Edit",
      subtitle: "Banarasi & Contemporary Designer Silks",
      desc: "Ornate floral cutwork jaals, Meenakari motifs, and modern lightweight festive sarees for reception soirees.",
      link: "/sarees?category=designer-silk",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      tag: "Designer Special",
    },
    {
      id: "kids-pattu-pavadai",
      title: "Little Royalty — Kids Pattu Pavadai",
      subtitle: "Pure Silk Ethnic Wear for Children",
      desc: "Vibrant pavadai sattai sets tailored with gentle breathable cotton lining for temple rituals and festive days.",
      link: "/readymades?category=pavadai-sattai",
      image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=800&q=80",
      tag: "Kids Heritage",
    },
  ];

  return (
    <div className="bg-[#FFF9EF] min-h-screen pb-20">
      {/* 1. Page Banner */}
      <section className="relative bg-[#211A19] text-white py-16 sm:py-24 overflow-hidden border-b border-[#C6A15B]/30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#211A19] via-[#4A101C]/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 z-0">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
            alt="Deepa Silks Curated Collections"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-20">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#C6A15B]/40 text-[#DFBF7E] text-xs font-semibold uppercase tracking-wider">
              <RiSparklingFill className="w-3.5 h-3.5" />
              <span>Curated Campaigns &amp; Seasonal Edits</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Exclusive Collections
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Carefully curated festive edits, wedding season muhurtham exclusives, and celebratory outfits designed for the entire family.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Campaign Editorial Showcase Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#C6A15B]/30 hover:border-[#78152B] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Campaign Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
                <img
                  src={camp.image}
                  alt={camp.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700"
                />
                <span className="absolute top-3.5 right-3.5 bg-[#78152B]/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                  {camp.tag}
                </span>
              </div>

              {/* Campaign Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider block mb-1">
                    {camp.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#211A19] group-hover:text-[#78152B] transition-colors leading-snug">
                    {camp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {camp.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    to={camp.link}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#78152B] hover:text-[#C91D32] transition-colors"
                  >
                    <span>Explore This Collection</span>
                    <RiArrowRightLine className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Festive Campaign Banner */}
      <FestiveCampaignBanner />
    </div>
  );
}
