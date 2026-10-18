import React, { useState, useEffect } from "react";
import { siteConfig } from "../../config/site";
import { RiSparklingFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { buildGeneralWhatsAppUrl } from "../../lib/whatsapp";

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const announcements = siteConfig.announcements;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="bg-[#550E1E] text-white text-[11px] md:text-xs py-2 px-4 border-b border-[#C6A15B]/30 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Branch Cities Quick Tag */}
        <div className="hidden lg:flex items-center gap-2 text-stone-300">
          <span className="inline-block w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
          <span className="font-semibold text-[#DFBF7E]">Karur &amp; Dharmapuri</span>
          <span className="text-stone-400">| Tamil Nadu</span>
        </div>

        {/* Center Animated Announcement with React Icon instead of emoji */}
        <div className="flex-1 text-center truncate font-medium text-amber-50">
          <span className="inline-flex items-center gap-2 transition-all duration-500">
            <RiSparklingFill className="w-3.5 h-3.5 text-[#DFBF7E] shrink-0" />
            <span>{announcements[index]}</span>
          </span>
        </div>

        {/* Quick WhatsApp Link on Desktop */}
        <div className="hidden md:flex items-center gap-3 text-stone-200">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-white transition-colors font-semibold"
          >
            <FaWhatsapp className="w-3.5 h-3.5 shrink-0" />
            <span>Chat: {siteConfig.whatsapp.displayNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
