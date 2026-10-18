import React from "react";
import { Link } from "react-router-dom";
import { FaCrown, FaShirt, FaGem, FaStore, FaArrowRight } from "react-icons/fa6";
import { RiSparklingFill } from "react-icons/ri";
import { homeFeaturedCategories } from "../../data/categories";

export default function FeaturedCategories() {
  // 5 Quick Navigation Circular Badges using React Icons (From UI Reference)
  const quickBadges = [
    {
      id: "kanchipuram",
      title: "Kanchipuram Silks",
      link: "/sarees?category=kanchipuram",
      icon: FaCrown,
    },
    {
      id: "festive",
      title: "Festive Collections",
      link: "/sarees?category=festive",
      icon: RiSparklingFill,
    },
    {
      id: "readymades",
      title: "Readymades for All",
      link: "/readymades",
      icon: FaShirt,
    },
    {
      id: "traditional",
      title: "Traditional & Trendy",
      link: "/collections",
      icon: FaGem,
    },
    {
      id: "store",
      title: "In-store Experience",
      link: "/our-store",
      icon: FaStore,
    },
  ];

  return (
    <section className="bg-[#FFF9EF] relative pt-6 pb-14 border-b border-[#C6A15B]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top 5 Circular Feature Badges (From Reference UI Mockup) */}
        <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 sm:p-6 shadow-sm border border-[#C6A15B]/30 mb-14 -mt-8 relative z-30">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6">
            {quickBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Link
                  key={badge.id}
                  to={badge.link}
                  className="group flex flex-col items-center text-center p-2 rounded-xl hover:bg-[#FFF9EF] transition-all duration-300"
                >
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFF9EF] group-hover:bg-[#78152B] border border-[#C6A15B] flex items-center justify-center text-[#78152B] group-hover:text-white shadow-xs group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#211A19] group-hover:text-[#78152B] mt-2.5 transition-colors line-clamp-1">
                    {badge.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#78152B] mb-2 block">
            Curated For Every Occasion
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#211A19]"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
          >
            Explore Our Silk &amp; Ethnic Categories
          </h2>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto mt-3 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeFeaturedCategories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-[#C6A15B]/30 transition-all duration-500 bg-stone-900"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Text Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] font-medium text-[#DFBF7E] tracking-wider uppercase block">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#DFBF7E] transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#C91D32] flex items-center justify-center text-white transition-all duration-300 shrink-0">
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
