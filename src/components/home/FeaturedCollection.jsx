import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine, RiSparklingFill } from "react-icons/ri";
import { products } from "../../data/products";
import ProductCard from "../ui/ProductCard";

export default function FeaturedCollection() {
  const [filter, setFilter] = useState("all");

  const filteredProducts = products.filter((p) => {
    if (filter === "all") return p.isFeatured;
    if (filter === "sarees") return p.type === "saree";
    if (filter === "readymades") return p.type === "readymade";
    return true;
  }).slice(0, 6);

  return (
    <section className="bg-white py-14 sm:py-20 border-b border-[#C6A15B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#78152B] text-xs font-bold uppercase tracking-wider mb-2">
              <RiSparklingFill className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Timeless Craftsmanship</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#211A19]"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Featured Highlights
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Sample reference catalog. Tap WhatsApp on any design for live colorways &amp; prices.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#FFF9EF] p-1.5 rounded-full border border-[#C6A15B]/30 self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${
                filter === "all"
                  ? "bg-[#78152B] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#78152B]"
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setFilter("sarees")}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${
                filter === "sarees"
                  ? "bg-[#78152B] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#78152B]"
              }`}
            >
              Silk Sarees
            </button>
            <button
              onClick={() => setFilter("readymades")}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${
                filter === "readymades"
                  ? "bg-[#78152B] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#78152B]"
              }`}
            >
              Readymades
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to Full Catalog */}
        <div className="mt-12 text-center">
          <Link
            to="/sarees"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#78152B] hover:text-[#C91D32] border-b-2 border-[#78152B] hover:border-[#C91D32] pb-1 transition-colors"
          >
            <span>View Full Saree &amp; Readymade Catalog</span>
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
