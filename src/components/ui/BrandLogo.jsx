import React from "react";
import { Link } from "react-router-dom";

export default function BrandLogo({ variant = "default", className = "", showTagline = true }) {
  const isLight = variant === "light";

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C91D32]/50 rounded-lg p-1 transition-all ${className}`}
      aria-label="Deepa Silks & Readymades Home"
    >
      {/* Official Deepa Silks Logo Image */}
      <div className="relative flex-shrink-0 w-11 h-11 md:w-13 md:h-13 bg-white rounded-lg p-0.5 shadow-sm border border-[#C6A15B]/30 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
        <img
          src="/images/brand/deepa-silks-logo.png"
          alt="Deepa Silks & Readymades Official Logo"
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback in case of image load delay
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        {/* Red Badge with Deepa Silks text */}
        <div className="flex items-center gap-1.5">
          <div className="bg-[#C91D32] px-2.5 py-0.5 rounded shadow-xs">
            <span
              className="text-white font-extrabold tracking-wider text-sm md:text-base leading-none block"
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              DEEPA SILKS
            </span>
          </div>
          <span
            className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase ${
              isLight ? "text-[#E0C487]" : "text-[#78152B]"
            }`}
          >
            &amp; Readymades
          </span>
        </div>

        {/* Tamil Script & Branch text from official logo */}
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`text-[10px] md:text-[11px] font-semibold tracking-wide ${
              isLight ? "text-amber-200" : "text-[#78152B]"
            }`}
          >
            தீபா சில்க்ஸ்
          </span>
          <span className="text-[10px] text-[#C6A15B]">•</span>
          <span
            className={`text-[9px] md:text-[10px] font-medium tracking-wider ${
              isLight ? "text-stone-300" : "text-stone-600"
            }`}
          >
            கரூர் • தருமபுரி
          </span>
        </div>
      </div>
    </Link>
  );
}
