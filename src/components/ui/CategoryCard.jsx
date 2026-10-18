import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

export default function CategoryCard({ category, basePath = "/sarees" }) {
  if (!category) return null;

  const targetUrl = category.link || `${basePath}?category=${category.slug || category.id}`;

  return (
    <Link
      to={targetUrl}
      className="group block bg-white rounded-2xl overflow-hidden border border-[#C6A15B]/30 hover:border-[#C6A15B] shadow-xs hover:shadow-lg transition-all duration-300"
    >
      {/* Category Image */}
      <div className="relative aspect-[4/3] bg-[#F5EEDB] overflow-hidden">
        <img
          src={category.image}
          alt={category.name || category.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {category.badge && (
          <span className="absolute top-2.5 right-2.5 bg-[#78152B]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
            {category.badge}
          </span>
        )}
      </div>

      {/* Category Bottom Title & Arrow */}
      <div className="p-3.5 md:p-4 flex items-center justify-between bg-white group-hover:bg-[#FFF9EF] transition-colors">
        <div>
          <h4 className="font-serif text-sm md:text-base font-bold text-[#211A19] group-hover:text-[#78152B] transition-colors leading-tight">
            {category.name || category.title}
          </h4>
          {category.tagline && (
            <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
              {category.tagline}
            </p>
          )}
        </div>
        <div className="w-7 h-7 rounded-full bg-[#FFF9EF] group-hover:bg-[#78152B] text-[#78152B] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 ml-2">
          <RiArrowRightLine className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
