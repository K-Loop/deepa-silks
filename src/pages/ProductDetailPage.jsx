import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiSparklingFill, RiShareLine, RiArrowRightSLine, RiCheckLine, RiArrowLeftLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { useCatalog } from "../context/CatalogContext";
import { formatSamplePrice } from "../lib/utils";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import ProductCard from "../components/ui/ProductCard";

export default function ProductDetailPage() {
  const { products } = useCatalog();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.availableColors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || ""
  );
  const [customNote, setCustomNote] = useState("");
  const [copied, setCopied] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#FFF9EF]">
        <h2 className="font-serif text-2xl font-bold text-[#78152B] mb-2">
          Product Not Found
        </h2>
        <p className="text-sm text-stone-600 mb-6">
          The requested saree or outfit could not be located in our current catalog.
        </p>
        <Link
          to="/sarees"
          className="bg-[#78152B] text-white text-xs font-bold py-2.5 px-6 rounded-full flex items-center gap-1.5"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          <span>Return to Sarees</span>
        </Link>
      </div>
    );
  }

  // Related products from same category or type
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type))
    .slice(0, 3);

  const images = product.images?.length > 0 ? product.images : [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this beautiful ${product.name} at Deepa Silks!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentWhatsAppUrl = buildWhatsAppUrl(
    product,
    [
      selectedColor ? `Preferred Color: ${selectedColor}` : null,
      selectedSize ? `Size: ${selectedSize}` : null,
      customNote ? `Question: ${customNote}` : null,
    ].filter(Boolean).join(" | ")
  );

  return (
    <div className="bg-[#FFF9EF] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#78152B] transition-colors">
            Home
          </Link>
          <RiArrowRightSLine className="w-3.5 h-3.5" />
          <Link
            to={product.type === "saree" ? "/sarees" : "/readymades"}
            className="hover:text-[#78152B] transition-colors"
          >
            {product.type === "saree" ? "Sarees" : "Readymades"}
          </Link>
          <RiArrowRightSLine className="w-3.5 h-3.5" />
          <span className="text-[#78152B] font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#C6A15B]/30">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5EEDB] border border-[#C6A15B]/40 shadow-inner">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#78152B] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <RiSparklingFill className="w-3 h-3 text-[#DFBF7E]" />
                  <span>{product.badge}</span>
                </div>
              )}

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md transition-colors"
                title="Share this design"
              >
                {copied ? <RiCheckLine className="w-4 h-4 text-emerald-600" /> : <RiShareLine className="w-4 h-4" />}
              </button>
            </div>

            {/* Thumbnail Selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-[#78152B] ring-2 ring-[#78152B]/20 scale-102"
                        : "border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Direct WhatsApp Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Item Code */}
              <div className="flex items-center justify-between text-xs text-[#78152B] font-bold uppercase tracking-wider mb-2">
                <span>{product.categoryName}</span>
                {product.code && (
                  <span className="bg-[#FFF9EF] border border-[#C6A15B]/40 text-[#211A19] font-mono px-2 py-0.5 rounded text-[11px]">
                    Item: {product.code}
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#211A19] leading-snug"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                {product.name}
              </h1>

              {/* Sample Price Banner with Clear Disclaimer */}
              <div className="mt-4 p-4 rounded-2xl bg-[#FFF9EF] border border-[#C6A15B]/40 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase">
                    Sample Ref Price:
                  </span>
                  <span className="text-2xl font-bold text-[#78152B]">
                    {formatSamplePrice(product.samplePrice)}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  *Sample catalog reference. Exact festive pricing, available weaving variants, and video call demonstration confirmed directly via WhatsApp.
                </p>
              </div>

              {/* Detailed Description */}
              <div className="mt-5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <p>{product.description}</p>
              </div>

              {/* Color Options */}
              {product.availableColors && product.availableColors.length > 0 && (
                <div className="mt-5">
                  <span className="text-xs font-bold text-stone-800 block mb-2">
                    Available Weft Colors (Select to inquire):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.availableColors.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selectedColor === col
                            ? "border-[#78152B] bg-[#78152B] text-white font-semibold shadow-xs"
                            : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options (for Readymades) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <span className="text-xs font-bold text-stone-800 block mb-2">
                    Available Sizes:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                          selectedSize === sz
                            ? "border-[#78152B] bg-[#78152B] text-white font-semibold shadow-xs"
                            : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Custom Note Input */}
              <div className="mt-5">
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  Have a specific question for the store? (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Can you show a video call? Do you have green pallu?"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-[#78152B]"
                />
              </div>

              {/* Main Primary WhatsApp CTA */}
              <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                <a
                  href={currentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-98"
                >
                  <FaWhatsapp className="w-5 h-5 shrink-0" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <p className="text-center text-[11px] text-stone-500">
                  Opens official WhatsApp chat in new window. Fast response by our showroom team.
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="mt-8 pt-6 border-t border-stone-100 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#211A19] mb-3">
                  Product Details &amp; Specifications
                </h4>
                <div className="grid grid-cols-2 gap-y-2 text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  {product.fabric && (
                    <>
                      <span className="font-semibold text-stone-800">Fabric Purity:</span>
                      <span>{product.fabric}</span>
                    </>
                  )}
                  {product.zariType && (
                    <>
                      <span className="font-semibold text-stone-800">Zari Detail:</span>
                      <span>{product.zariType}</span>
                    </>
                  )}
                  {product.blousePiece && (
                    <>
                      <span className="font-semibold text-stone-800">Blouse Piece:</span>
                      <span>{product.blousePiece}</span>
                    </>
                  )}
                  {product.length && (
                    <>
                      <span className="font-semibold text-stone-800">Length:</span>
                      <span>{product.length}</span>
                    </>
                  )}
                  {product.care && (
                    <>
                      <span className="font-semibold text-stone-800">Care Advice:</span>
                      <span>{product.care}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#211A19] mb-6">
              You May Also Admire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
