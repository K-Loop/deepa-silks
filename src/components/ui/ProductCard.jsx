import React from "react";
import { Link } from "react-router-dom";
import { RiEyeLine, RiSparklingFill } from "react-icons/ri";
import WhatsAppButton from "./WhatsAppButton";
import { formatSamplePrice } from "../../lib/utils";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#C6A15B]/25 hover:border-[#C6A15B]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] bg-[#F5EEDB] overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#78152B]/90 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white/20">
            <RiSparklingFill className="w-3 h-3 text-[#E0C487]" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Item Code Tag */}
        {product.code && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#211A19] text-[10px] font-bold tracking-widest px-2 py-0.5 rounded shadow-xs">
            {product.code}
          </div>
        )}

        {/* Quick View Hover Action */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Link
            to={`/product/${product.id}`}
            className="w-full bg-white/95 hover:bg-white text-[#78152B] font-semibold text-xs py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 backdrop-blur-xs transition-colors"
          >
            <RiEyeLine className="w-4 h-4" />
            <span>View Full Details</span>
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 md:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category & Color Dots */}
          <div className="flex items-center justify-between text-xs text-[#C6A15B] font-medium mb-1">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-[#78152B]">
              {product.categoryName || product.category}
            </span>
            {product.availableColors && product.availableColors.length > 0 && (
              <span className="text-stone-500 text-[11px]">
                {product.availableColors.length} colors
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base md:text-lg font-bold text-[#211A19] group-hover:text-[#78152B] transition-colors line-clamp-1 leading-snug">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          {product.shortDesc && (
            <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
              {product.shortDesc}
            </p>
          )}
        </div>

        {/* Pricing & WhatsApp Actions */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col gap-2.5">
          {/* Price with transparent sample disclaimer */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-stone-600 block leading-tight">Sample Ref Price:</span>
              <span className="text-sm md:text-base font-bold text-[#78152B]">
                {formatSamplePrice(product.samplePrice)}
              </span>
            </div>
            <span className="text-[10px] text-stone-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
              Ask for live price
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Link
              to={`/product/${product.id}`}
              className="text-center text-xs font-semibold py-2 px-3 rounded-lg border border-[#78152B]/30 text-[#78152B] hover:bg-[#78152B] hover:text-white transition-colors flex items-center justify-center"
            >
              Details
            </Link>
            <WhatsAppButton
              product={product}
              variant="primary"
              size="sm"
              label="WhatsApp"
              className="w-full text-xs py-2 px-2.5 rounded-lg justify-center font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
