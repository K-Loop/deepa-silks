import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { RiSparklingFill, RiSearchLine, RiRestartLine } from "react-icons/ri";
import { products } from "../data/products";
import ProductCard from "../components/ui/ProductCard";
import CategoryCard from "../components/ui/CategoryCard";

export default function ReadymadesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Readymade categories matching Reference Mockup 3
  const readymadeCategoriesList = [
    {
      id: "all",
      name: "All Readymades",
      slug: "all",
    },
    {
      id: "pavadai-sattai",
      name: "Pavadai Sattai",
      slug: "pavadai-sattai",
      image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=600&q=80",
      tagline: "Kids Silk Sets",
    },
    {
      id: "lehengas",
      name: "Lehenga Sets",
      slug: "lehengas",
      image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=600&q=80",
      tagline: "Grand Flairs",
    },
    {
      id: "kurtis",
      name: "Kurtis & Readymades",
      slug: "kurtis",
      image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=80",
      tagline: "Modern Ethnic Sets",
    },
    {
      id: "blouses",
      name: "Blouse Collection",
      slug: "blouses",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      tagline: "Bridal Aari Work",
    },
    {
      id: "family-wear",
      name: "Family Occasion Wear",
      slug: "family-wear",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80",
      tagline: "Coordinated Festive Attire",
    },
    {
      id: "festive",
      name: "Festival Collections",
      slug: "festive",
      image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
      tagline: "Celebration Special",
    },
  ];

  // All readymades
  const allReadymades = useMemo(() => {
    return products.filter((p) => p.type === "readymade" || p.category === "festive");
  }, []);

  const filteredItems = useMemo(() => {
    let list = allReadymades;

    if (currentCategory !== "all") {
      list = list.filter((p) => p.category === currentCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          (p.code && p.code.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => (a.samplePrice || 0) - (b.samplePrice || 0));
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => (b.samplePrice || 0) - (a.samplePrice || 0));
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [allReadymades, currentCategory, searchQuery, sortBy]);

  const handleCategoryChange = (slug) => {
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-[#FFF9EF] min-h-screen pb-20">
      {/* 1. Page Editorial Banner (Matching Reference Mockup 3) */}
      <section className="relative bg-[#211A19] text-white py-14 sm:py-20 overflow-hidden border-b border-[#C6A15B]/30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#211A19] via-[#350F18]/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 z-0">
          <img
            src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1200&q=80"
            alt="Deepa Silks Readymades"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-20">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#C6A15B]/40 text-[#DFBF7E] text-xs font-semibold uppercase tracking-wider">
              <RiSparklingFill className="w-3.5 h-3.5" />
              <span>For Every Occasion, For Every Generation</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Readymades &amp; Festive Wear
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Trendy • Traditional • For the Whole Family. Ready-to-wear flared lehengas, pure silk kids pavadais, handcrafted aari blouses, and coordinated festive outfits.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visual Category Cards Grid (From Reference Mockup 3) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#211A19]">
            Explore Ethnic Ensembles
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Tap to view category
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {readymadeCategoriesList
            .filter((c) => c.id !== "all")
            .map((cat) => (
              <CategoryCard key={cat.id} category={cat} basePath="/readymades" />
            ))}
        </div>
      </div>

      {/* 3. Filter Chips & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#C6A15B]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {readymadeCategoriesList.map((cat) => {
              const isSelected = currentCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? "bg-[#78152B] text-white shadow-xs"
                      : "bg-[#FFF9EF] text-stone-700 hover:bg-[#F3E9D5] border border-stone-200"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-56">
              <RiSearchLine className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search lehengas, pavadais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#78152B]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 text-stone-700 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#78152B]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#C6A15B]/30 max-w-lg mx-auto shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#78152B] mb-2">
              No Readymades Found
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              We couldn't find any readymade pieces matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategoryChange("all");
                setSortBy("featured");
              }}
              className="inline-flex items-center gap-2 bg-[#78152B] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#550E1E] transition-colors"
            >
              <RiRestartLine className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
