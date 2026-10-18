import React from "react";
import { Link } from "react-router-dom";
import { RiMapPinLine, RiPhoneLine, RiTimeLine, RiSparklingFill } from "react-icons/ri";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import BrandLogo from "../ui/BrandLogo";
import { siteConfig } from "../../config/site";
import { buildGeneralWhatsAppUrl } from "../../lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <footer className="bg-[#550E1E] text-stone-200 border-t-2 border-[#C6A15B] relative overflow-hidden">
      {/* Background Textile Texture Effect */}
      <div className="absolute inset-0 dark-textile-pattern opacity-15 pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-[#C6A15B]/25">
          {/* Column 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-xs md:text-sm text-stone-300 leading-relaxed max-w-sm mt-3">
              Deepa Silks &amp; Readymades celebrates the timeless splendor of South Indian handloom heritage. From auspicious Kanchipuram wedding silks to contemporary festive readymades for the whole family.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#DFBF7E] uppercase tracking-wider">
                Direct WhatsApp Support
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs py-2 px-4 rounded-full w-fit shadow-xs transition-colors"
              >
                <FaWhatsapp className="w-4 h-4 shrink-0" />
                <span>Chat with our Saree Specialist</span>
              </a>
            </div>

            {/* Instagram Link with React Icon */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#DFBF7E] hover:text-white transition-colors"
              >
                <FaInstagram className="w-4 h-4 shrink-0" />
                <span>Follow {siteConfig.instagram.handle}</span>
              </a>
            </div>
          </div>

          {/* Column 3: Saree Collections */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C6A15B] pl-2.5">
              Silk Sarees
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link to="/sarees?category=kanchipuram" className="hover:text-[#DFBF7E] transition-colors">
                  Kanchipuram Silk Sarees
                </Link>
              </li>
              <li>
                <Link to="/sarees?category=soft-silk" className="hover:text-[#DFBF7E] transition-colors">
                  Soft Silk Drapes
                </Link>
              </li>
              <li>
                <Link to="/sarees?category=bridal" className="hover:text-[#DFBF7E] transition-colors">
                  Bridal Muhurtham Sarees
                </Link>
              </li>
              <li>
                <Link to="/sarees?category=designer-silk" className="hover:text-[#DFBF7E] transition-colors">
                  Banarasi &amp; Designer Silks
                </Link>
              </li>
              <li>
                <Link to="/sarees?category=cotton" className="hover:text-[#DFBF7E] transition-colors">
                  Handloom Coimbatore Cotton
                </Link>
              </li>
              <li>
                <Link to="/sarees?category=festive" className="hover:text-[#DFBF7E] transition-colors">
                  Festive Silk Sarees
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Readymades */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C6A15B] pl-2.5">
              Readymades &amp; Ethnic
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link to="/readymades?category=pavadai-sattai" className="hover:text-[#DFBF7E] transition-colors">
                  Kids Pavadai Sattai
                </Link>
              </li>
              <li>
                <Link to="/readymades?category=lehengas" className="hover:text-[#DFBF7E] transition-colors">
                  Bridal &amp; Festive Lehengas
                </Link>
              </li>
              <li>
                <Link to="/readymades?category=kurtis" className="hover:text-[#DFBF7E] transition-colors">
                  Kurtis &amp; Suit Sets
                </Link>
              </li>
              <li>
                <Link to="/readymades?category=blouses" className="hover:text-[#DFBF7E] transition-colors">
                  Bridal Aari Work Blouses
                </Link>
              </li>
              <li>
                <Link to="/readymades?category=family-wear" className="hover:text-[#DFBF7E] transition-colors">
                  Family Matching Ensembles
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#DFBF7E] transition-colors">
                  Wedding Season Edits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Showrooms & Timings */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C6A15B] pl-2.5">
              Store Locations
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              {siteConfig.stores.map((store) => (
                <div key={store.id} className="bg-[#420B17] p-2.5 rounded-lg border border-[#C6A15B]/20">
                  <span className="font-bold text-[#DFBF7E] block text-xs">
                    {store.city} ({store.tamilCity})
                  </span>
                  <p className="text-[11px] text-stone-300 mt-0.5">{store.address}</p>
                </div>
              ))}

              <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-300">
                <RiTimeLine className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>Mon – Sun: 9:30 AM – 9:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-3 flex-wrap">
            <p>
              © {currentYear} Deepa Silks &amp; Readymades (தீபா சில்க்ஸ்). All rights reserved.
            </p>
            <span className="text-stone-600">·</span>
            <Link
              to="/admin"
              className="text-[#DFBF7E] hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              <span>Admin Portal</span>
            </Link>
          </div>

          <p className="text-[11px] text-stone-400 text-center md:text-right">
            Note: All displayed product prices and colors are sample catalog references. Exact pricing &amp; availability confirmed via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
