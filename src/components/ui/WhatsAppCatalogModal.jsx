import React, { useState } from "react";
import { RiSearchLine, RiCloseLine, RiShieldCheckFill, RiPhoneLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { products } from "../../data/products";
import { siteConfig } from "../../config/site";
import { buildWhatsAppUrl, buildGeneralWhatsAppUrl } from "../../lib/whatsapp";
import { formatSamplePrice } from "../../lib/utils";

export default function WhatsAppCatalogModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("catalog"); // 'catalog', 'about'
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#ECE5DD] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-stone-300"
        role="dialog"
        aria-modal="true"
        aria-label="WhatsApp Business Catalog Preview"
      >
        {/* WhatsApp App Bar */}
        <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden shrink-0 border border-white/40">
              <img
                src="/images/brand/deepa-silks-logo.png"
                alt="Deepa Silks"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-sm leading-tight text-white">DEEPA SILKS</h3>
                <RiShieldCheckFill className="w-4 h-4 text-emerald-300 shrink-0" />
              </div>
              <p className="text-[11px] text-emerald-100">Official Business Account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-100 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close catalog preview"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        {/* WhatsApp Navigation Tabs */}
        <div className="bg-[#128C7E] text-white flex border-b border-[#075E54] text-xs font-semibold uppercase tracking-wider shrink-0">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeTab === "catalog"
                ? "border-white text-white"
                : "border-transparent text-emerald-100 hover:text-white"
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeTab === "about"
                ? "border-white text-white"
                : "border-transparent text-emerald-100 hover:text-white"
            }`}
          >
            About &amp; Stores
          </button>
        </div>

        {/* Tab 1: Catalog Grid */}
        {activeTab === "catalog" && (
          <div className="flex flex-col flex-1 overflow-hidden bg-[#F0F2F5]">
            {/* Search Input */}
            <div className="p-3 bg-white border-b border-stone-200 shrink-0">
              <div className="relative">
                <RiSearchLine className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search silk sarees, lehengas, kurtis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-100 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#128C7E]"
                />
              </div>
            </div>

            {/* Catalog Items Grid */}
            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-2.5">
              {filteredProducts.map((product) => {
                const whatsappUrl = buildWhatsAppUrl(product);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs flex flex-col hover:border-[#128C7E] transition-all"
                  >
                    <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                        Ask Price
                      </span>
                    </div>

                    <div className="p-2 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-stone-500">
                          {product.categoryName}
                        </p>
                      </div>

                      <div className="mt-2 pt-1 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#78152B]">
                          {formatSamplePrice(product.samplePrice)}
                        </span>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white p-1.5 rounded-full text-xs shadow-xs"
                          title="Ask on WhatsApp"
                        >
                          <FaWhatsapp className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: About & Store Details */}
        {activeTab === "about" && (
          <div className="flex-1 overflow-y-auto p-4 bg-white space-y-4 text-xs text-stone-700">
            <div className="text-center pb-3 border-b border-stone-100">
              <h4 className="font-bold text-sm text-[#78152B]">{siteConfig.name}</h4>
              <p className="text-stone-500 mt-0.5">{siteConfig.tagline}</p>
            </div>

            <div>
              <span className="font-bold text-stone-900 block mb-1">Business Hours:</span>
              <p>Monday – Sunday: 9:30 AM – 9:30 PM</p>
            </div>

            <div>
              <span className="font-bold text-stone-900 block mb-1">Store Locations:</span>
              <ul className="space-y-2">
                {siteConfig.stores.map((store) => (
                  <li key={store.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="font-bold text-[#78152B]">{store.city} ({store.tamilCity})</span>
                    <p className="text-[11px] text-stone-600 mt-0.5">{store.address}</p>
                    <p className="text-[11px] text-stone-600">{store.cityState}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-stone-900 block mb-1">Direct Helpdesk:</span>
              <p className="flex items-center gap-2 text-stone-800">
                <RiPhoneLine className="w-4 h-4 text-emerald-600" />
                <span>{siteConfig.whatsapp.displayNumber}</span>
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp Footer CTA */}
        <div className="bg-white p-3 border-t border-stone-200 shrink-0">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Message Business Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
}
