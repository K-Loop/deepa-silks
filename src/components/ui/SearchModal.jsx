import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine, RiCloseLine, RiArrowRightLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { useCatalog } from "../../context/CatalogContext";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import { formatSamplePrice } from "../../lib/utils";

export default function SearchModal({ isOpen, onClose }) {
  const { products } = useCatalog();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          (p.code && p.code.toLowerCase().includes(query.toLowerCase())) ||
          (p.availableColors &&
            p.availableColors.some((c) => c.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#C6A15B]/40 flex flex-col max-h-[80vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Search Collection"
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-[#FFF9EF] border-b border-[#C6A15B]/30 flex items-center gap-3">
          <RiSearchLine className="w-5 h-5 text-[#78152B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by silk name (Kanchipuram, Soft Silk), lehengas, color, or code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base text-[#211A19] placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
          {query.trim() === "" ? (
            <div className="text-center py-8">
              <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-3">
                Suggested Searches
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Kanchipuram Silk", "Soft Silk", "Bridal Saree", "Pavadai Sattai", "Lehenga Sets", "Temple Border"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs bg-stone-100 hover:bg-[#FFF9EF] hover:border-[#C6A15B] border border-stone-200 px-3 py-1.5 rounded-full text-stone-700 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map((product) => {
              const whatsappUrl = buildWhatsAppUrl(product);

              return (
                <div
                  key={product.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-[#FFF9EF]/50 px-2 rounded-xl transition-colors"
                >
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-lg bg-stone-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[#78152B] bg-red-50 px-1.5 py-0.5 rounded">
                          {product.categoryName}
                        </span>
                        {product.code && (
                          <span className="text-[10px] text-stone-400 font-mono">
                            {product.code}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#211A19] truncate mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium">
                        Ref Price: {formatSamplePrice(product.samplePrice)}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full transition-colors"
                      title="Ask on WhatsApp"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                    <Link
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="p-2 bg-stone-100 hover:bg-[#78152B] hover:text-white text-stone-700 rounded-full transition-colors"
                      title="View Details"
                    >
                      <RiArrowRightLine className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-stone-800">No items found matching "{query}"</p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching for "Kanchipuram", "Cotton", "Lehenga", or enquire with our store team directly on WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
