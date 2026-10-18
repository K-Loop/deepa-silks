import React from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine, RiSearchLine, RiShoppingBagLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import BrandLogo from "../ui/BrandLogo";
import { siteConfig } from "../../config/site";
import { buildGeneralWhatsAppUrl } from "../../lib/whatsapp";

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  onOpenSearch,
  onOpenCatalog,
}) {
  if (!isOpen) return null;

  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-4/5 max-w-sm bg-[#FFF9EF] h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-r border-[#C6A15B]/40">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#C6A15B]/30 flex items-center justify-between bg-white">
          <BrandLogo />
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg"
            aria-label="Close menu"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Search Action */}
        <div className="p-4 border-b border-stone-200">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl border border-stone-200 text-stone-500 text-xs shadow-2xs hover:border-[#78152B]"
          >
            <RiSearchLine className="w-4 h-4 text-stone-400" />
            <span>Search silk sarees, readymades...</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#78152B] text-white shadow-xs"
                    : "text-stone-700 hover:bg-[#F3E9D5]"
                }`
              }
            >
              <span>{link.name}</span>
            </NavLink>
          ))}

          {/* Catalog Preview Button */}
          {onOpenCatalog && (
            <button
              onClick={() => {
                onClose();
                onOpenCatalog();
              }}
              className="w-full mt-2 flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#78152B] bg-[#FFF9EF] border border-[#C6A15B]/40 hover:bg-[#F3E9D5]"
            >
              <span className="flex items-center gap-2">
                <RiShoppingBagLine className="w-4 h-4" />
                <span>WhatsApp Catalog View</span>
              </span>
              <span className="text-xs bg-amber-100 px-2 py-0.5 rounded-full text-[#78152B]">
                Quick
              </span>
            </button>
          )}
        </div>

        {/* Showrooms & WhatsApp Footer Info */}
        <div className="p-4 bg-white border-t border-[#C6A15B]/30 space-y-3">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <RiMapPinLine className="w-4 h-4 text-[#78152B] shrink-0" />
            <span>Showrooms at Karur &amp; Dharmapuri</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <RiPhoneLine className="w-4 h-4 text-[#78152B] shrink-0" />
            <span>Helpdesk: {siteConfig.whatsapp.displayNumber}</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
