import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiSearchLine, RiMenuLine, RiShoppingBagLine, RiCameraLensLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import BrandLogo from "../ui/BrandLogo";
import MobileMenu from "./MobileMenu";
import { buildGeneralWhatsAppUrl } from "../../lib/whatsapp";

export default function Header({ onOpenSearch, onOpenCatalog }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sarees", path: "/sarees" },
    { name: "Readymades", path: "/readymades" },
    { name: "Collections", path: "/collections" },
    { name: "Our Store", path: "/our-store" },
    { name: "Contact", path: "/contact" },
  ];

  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hi Deepa Silks! I'm browsing your online collection and would like quick assistance."
  );

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#C6A15B]/30"
            : "bg-[#FFF9EF] py-3.5 border-b border-[#C6A15B]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <BrandLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors relative py-1 hover:text-[#78152B] ${
                    isActive
                      ? "text-[#78152B] font-bold"
                      : "text-stone-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#78152B] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons (Search, WhatsApp, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 text-stone-700 hover:text-[#78152B] hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Open search dialog"
              title="Search collection (Ctrl+K)"
            >
              <RiSearchLine className="w-5 h-5" />
            </button>

            {/* Admin Studio Shortcut Link */}
            <Link
              to="/admin"
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#C6A15B]/40 hover:border-[#78152B] text-stone-700 hover:text-[#78152B] text-xs font-semibold transition-colors bg-[#FFF9EF]/80 shadow-2xs"
              title="Admin Photo Studio"
            >
              <RiCameraLensLine className="w-3.5 h-3.5 text-[#78152B]" />
              <span className="text-[11px]">Admin</span>
            </Link>

            {/* Quick WhatsApp Catalog Preview Icon Button */}
            {onOpenCatalog && (
              <button
                onClick={onOpenCatalog}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 hover:border-[#78152B] text-stone-700 hover:text-[#78152B] text-xs font-semibold transition-colors bg-white shadow-2xs"
                title="Preview WhatsApp Catalog"
              >
                <RiShoppingBagLine className="w-3.5 h-3.5 text-[#78152B]" />
                <span>Catalog</span>
              </button>
            )}

            {/* Direct WhatsApp Chat CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 sm:px-3.5 sm:py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xs hover:shadow-md transition-all active:scale-95"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline-block ml-1.5 text-xs font-bold tracking-wide">
                WhatsApp
              </span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-stone-800 hover:text-[#78152B] rounded-lg focus:outline-none"
              aria-label="Open navigation menu"
            >
              <RiMenuLine className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        onOpenSearch={onOpenSearch}
        onOpenCatalog={onOpenCatalog}
      />
    </>
  );
}
