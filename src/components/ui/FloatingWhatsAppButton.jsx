import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { RiCloseLine } from "react-icons/ri";
import { buildGeneralWhatsAppUrl } from "../../lib/whatsapp";
import { siteConfig } from "../../config/site";

export default function FloatingWhatsAppButton({ onOpenCatalog }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hi Deepa Silks! I'm browsing your online collection and would like quick assistance."
  );

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="bg-white rounded-2xl p-3.5 shadow-xl border border-amber-200/60 max-w-[260px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#78152B]">Deepa Silks Helpdesk</span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-stone-600 p-0.5 rounded"
              aria-label="Close tooltip"
            >
              <RiCloseLine className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            Need color options, video call preview, or prices? Chat with our saree experts directly on WhatsApp!
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold py-1.5 px-3 rounded-full transition-colors flex items-center justify-center gap-1.5"
            >
              <FaWhatsapp className="w-3.5 h-3.5 shrink-0" />
              <span>Start Chat</span>
            </a>
            {onOpenCatalog && (
              <button
                onClick={() => {
                  setShowTooltip(false);
                  onOpenCatalog();
                }}
                className="text-xs text-[#78152B] hover:text-[#C91D32] font-medium py-1.5 px-2 underline"
              >
                View Catalog
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowTooltip((prev) => !prev)}
          className="hidden md:inline-flex items-center gap-1.5 bg-white/95 text-[#78152B] font-semibold text-xs py-2 px-3.5 rounded-full shadow-md border border-[#C6A15B]/30 hover:bg-[#FFF9EF] transition-all hover:scale-105"
        >
          <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Ask on WhatsApp</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
          aria-label="Contact Deepa Silks on WhatsApp"
        >
          {/* Subtle Radar Ripple */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none" />
          <FaWhatsapp className="w-7 h-7 relative z-10" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
