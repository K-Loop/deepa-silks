import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  RiAddLine,
  RiSearchLine,
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiFileCopyLine,
  RiCheckLine,
  RiArrowLeftLine,
  RiRestartLine,
  RiDownload2Line,
  RiUpload2Line,
  RiSparklingFill,
  RiImageAddLine,
  RiCloseLine,
  RiInformationLine,
  RiExternalLinkLine,
  RiLayoutGridLine,
  RiListCheck2,
  RiStarFill,
  RiShieldCheckLine,
  RiPaletteLine,
} from "react-icons/ri";
import { useCatalog } from "../context/CatalogContext";

// Sample high-quality textile presets for 1-click test photos
const SAMPLE_PRESETS = [
  {
    title: "Golden Mustard Kanchipuram Brocade",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    section: "Sarees",
    category: "Kanchipuram Silks",
  },
  {
    title: "Peacock Blue Dual Tone Soft Silk",
    url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    section: "Sarees",
    category: "Soft Silks",
  },
  {
    title: "Royal Crimson Temple Border Silk",
    url: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1000&q=80",
    section: "Sarees",
    category: "Bridal Collection",
  },
  {
    title: "Showroom VIP Bridal Lounge Display",
    url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80",
    section: "Store Showroom",
    category: "Showroom",
  },
  {
    title: "Traditional Kids Pattu Pavadai Ensemble",
    url: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1000&q=80",
    section: "Readymades",
    category: "Pavadai Sattai",
  },
];

export default function AdminDashboardPage() {
  const {
    allPhotos,
    products,
    addPhoto,
    updatePhoto,
    deletePhoto,
    resetToDefaults,
    exportData,
    importData,
  } = useCatalog();

  // State
  const [activeSection, setActiveSection] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("default");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editPhotoItem, setEditPhotoItem] = useState(null);
  const [deletePhotoItem, setDeletePhotoItem] = useState(null);
  const [previewPhotoItem, setPreviewPhotoItem] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fileInputRef = useRef(null);
  const importFileRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Section Counts
  const counts = useMemo(() => {
    return {
      all: allPhotos.length,
      sarees: allPhotos.filter((p) => p.section === "Sarees").length,
      readymades: allPhotos.filter((p) => p.section === "Readymades").length,
      store: allPhotos.filter((p) => p.section === "Store Showroom").length,
      instagram: allPhotos.filter((p) => p.section === "Instagram Feed").length,
      custom: allPhotos.filter((p) => p.section === "Showcase Gallery" || p.parentType === "custom").length,
    };
  }, [allPhotos]);

  // Filtered & Sorted Photos
  const filteredPhotos = useMemo(() => {
    let list = allPhotos;

    // Filter section
    if (activeSection !== "all") {
      if (activeSection === "sarees") list = list.filter((p) => p.section === "Sarees");
      else if (activeSection === "readymades") list = list.filter((p) => p.section === "Readymades");
      else if (activeSection === "store") list = list.filter((p) => p.section === "Store Showroom");
      else if (activeSection === "instagram") list = list.filter((p) => p.section === "Instagram Feed");
      else if (activeSection === "custom")
        list = list.filter((p) => p.section === "Showcase Gallery" || p.parentType === "custom");
    }

    // Filter search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.parentName && p.parentName.toLowerCase().includes(q)) ||
          (p.parentCode && p.parentCode.toLowerCase().includes(q)) ||
          (p.section && p.section.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "name-asc") {
      list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "name-desc") {
      list = [...list].sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    } else if (sortBy === "primary-first") {
      list = [...list].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
    }

    return list;
  }, [allPhotos, activeSection, searchQuery, sortBy]);

  // Copy photo link handler
  const handleCopyUrl = (photo) => {
    navigator.clipboard.writeText(photo.url);
    setCopiedId(photo.id);
    showToast("Photo link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export JSON handler
  const handleExportJson = () => {
    const json = exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deepa-silks-catalog-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Catalog backup downloaded successfully!");
  };

  // Import JSON handler
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importData(event.target.result);
      if (res.success) {
        showToast(res.message);
      } else {
        alert(res.message);
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#211A19] pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#78152B] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#C6A15B] flex items-center gap-3 animate-bounce">
          <RiSparklingFill className="w-5 h-5 text-[#DFBF7E]" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Breadcrumb */}
      <div className="bg-[#550E1E] text-white border-b-2 border-[#C6A15B] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#DFBF7E] hover:text-white transition-colors"
            >
              <RiArrowLeftLine className="w-4 h-4" />
              <span>Back to Storefront</span>
            </Link>
            <span className="text-stone-400">|</span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-stone-200">
                Live Photo Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Export & Import Backup */}
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#DFBF7E] text-xs font-bold py-1.5 px-3 rounded-lg border border-[#C6A15B]/40 transition-colors"
              title="Download catalog JSON backup"
            >
              <RiDownload2Line className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backup JSON</span>
            </button>

            <button
              onClick={() => importFileRef.current?.click()}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-bold py-1.5 px-3 rounded-lg border border-white/20 transition-colors"
              title="Import catalog backup"
            >
              <RiUpload2Line className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <input
              ref={importFileRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportFile}
            />

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-900/40 py-1.5 px-2.5 rounded-lg transition-colors ml-1"
              title="Reset all photos to factory defaults"
            >
              <RiRestartLine className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Header with Stats */}
      <div className="bg-white border-b border-[#C6A15B]/30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Title & Small Description */}
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="bg-[#78152B] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#C6A15B]">
                  Admin Studio
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  Deepa Silks &amp; Readymades
                </span>
              </div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#78152B]"
                style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
              >
                Photo Management Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Add, preview, edit, and delete catalog photos with real-time website synchronization.
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#78152B] hover:bg-[#5e1022] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md border border-[#C6A15B] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <RiImageAddLine className="w-5 h-5 text-[#DFBF7E]" />
                <span>+ Add New Photo</span>
              </button>

              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#FFF9EF] hover:bg-[#f6ebd4] text-[#78152B] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-[#C6A15B]/50 transition-colors"
                title="Open customer storefront in new tab"
              >
                <span>Live View</span>
                <RiExternalLinkLine className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-6 pt-6 border-t border-stone-200">
            <div
              onClick={() => setActiveSection("all")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeSection === "all"
                  ? "bg-[#78152B] text-white border-[#78152B] shadow-sm"
                  : "bg-[#FFF9EF]/60 hover:bg-[#FFF9EF] border-[#C6A15B]/30"
              }`}
            >
              <span className={`text-[11px] block font-semibold ${activeSection === "all" ? "text-stone-200" : "text-stone-500"}`}>
                Total Photos
              </span>
              <span className={`text-xl font-bold font-serif ${activeSection === "all" ? "text-[#DFBF7E]" : "text-[#78152B]"}`}>
                {counts.all}
              </span>
            </div>

            <div
              onClick={() => setActiveSection("sarees")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeSection === "sarees"
                  ? "bg-[#78152B] text-white border-[#78152B] shadow-sm"
                  : "bg-white hover:bg-stone-50 border-stone-200"
              }`}
            >
              <span className={`text-[11px] block font-semibold ${activeSection === "sarees" ? "text-stone-200" : "text-stone-500"}`}>
                Saree Photos
              </span>
              <span className={`text-xl font-bold font-serif ${activeSection === "sarees" ? "text-[#DFBF7E]" : "text-[#78152B]"}`}>
                {counts.sarees}
              </span>
            </div>

            <div
              onClick={() => setActiveSection("readymades")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeSection === "readymades"
                  ? "bg-[#78152B] text-white border-[#78152B] shadow-sm"
                  : "bg-white hover:bg-stone-50 border-stone-200"
              }`}
            >
              <span className={`text-[11px] block font-semibold ${activeSection === "readymades" ? "text-stone-200" : "text-stone-500"}`}>
                Readymades
              </span>
              <span className={`text-xl font-bold font-serif ${activeSection === "readymades" ? "text-[#DFBF7E]" : "text-[#78152B]"}`}>
                {counts.readymades}
              </span>
            </div>

            <div
              onClick={() => setActiveSection("store")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeSection === "store"
                  ? "bg-[#78152B] text-white border-[#78152B] shadow-sm"
                  : "bg-white hover:bg-stone-50 border-stone-200"
              }`}
            >
              <span className={`text-[11px] block font-semibold ${activeSection === "store" ? "text-stone-200" : "text-stone-500"}`}>
                Store Showroom
              </span>
              <span className={`text-xl font-bold font-serif ${activeSection === "store" ? "text-[#DFBF7E]" : "text-[#78152B]"}`}>
                {counts.store}
              </span>
            </div>

            <div
              onClick={() => setActiveSection("instagram")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeSection === "instagram"
                  ? "bg-[#78152B] text-white border-[#78152B] shadow-sm"
                  : "bg-white hover:bg-stone-50 border-stone-200"
              }`}
            >
              <span className={`text-[11px] block font-semibold ${activeSection === "instagram" ? "text-stone-200" : "text-stone-500"}`}>
                Instagram Feed
              </span>
              <span className={`text-xl font-bold font-serif ${activeSection === "instagram" ? "text-[#DFBF7E]" : "text-[#78152B]"}`}>
                {counts.instagram}
              </span>
            </div>

            <div
              onClick={() => setActiveSection("custom")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeSection === "custom"
                  ? "bg-[#78152B] text-white border-[#78152B] shadow-sm"
                  : "bg-white hover:bg-stone-50 border-stone-200"
              }`}
            >
              <span className={`text-[11px] block font-semibold ${activeSection === "custom" ? "text-stone-200" : "text-stone-500"}`}>
                Custom Showcase
              </span>
              <span className={`text-xl font-bold font-serif ${activeSection === "custom" ? "text-[#DFBF7E]" : "text-[#78152B]"}`}>
                {counts.custom}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filter & Search Control Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl border border-[#C6A15B]/30 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by photo title, product name, code (e.g. DS-KNC-01), or category..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] focus:ring-1 focus:ring-[#78152B] bg-stone-50 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <RiCloseLine className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All" },
              { id: "sarees", label: "Sarees" },
              { id: "readymades", label: "Readymades" },
              { id: "store", label: "Showroom" },
              { id: "instagram", label: "Instagram" },
              { id: "custom", label: "Custom" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeSection === tab.id
                    ? "bg-[#78152B] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {tab.label} ({counts[tab.id]})
              </button>
            ))}
          </div>

          {/* Sort & View Mode Controls */}
          <div className="flex items-center gap-2 justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 text-stone-700 rounded-xl px-3 py-2 focus:outline-none focus:border-[#78152B]"
            >
              <option value="default">Default Order</option>
              <option value="name-asc">Title: A to Z</option>
              <option value="name-desc">Title: Z to A</option>
              <option value="primary-first">Cover Photos First</option>
            </select>

            <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-[#78152B] shadow-xs" : "text-stone-500 hover:text-stone-800"
                }`}
                title="Grid View"
              >
                <RiLayoutGridLine className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white text-[#78152B] shadow-xs" : "text-stone-500 hover:text-stone-800"
                }`}
                title="Table/List View"
              >
                <RiListCheck2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-stone-600">
        <span>
          Showing <strong>{filteredPhotos.length}</strong> {filteredPhotos.length === 1 ? "photo" : "photos"}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-[#78152B] font-bold hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {filteredPhotos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#C6A15B]/30 p-12 text-center my-6">
            <RiImageAddLine className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#78152B]">No Photos Found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              We couldn't find any photos matching your current search or section filter.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveSection("all");
                }}
                className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 px-4 rounded-xl transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="text-xs bg-[#78152B] hover:bg-[#5e1022] text-white font-bold py-2 px-4 rounded-xl transition-colors"
              >
                + Add Photo Now
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* ==================== GRID VIEW ==================== */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo) => {
              const isCopied = copiedId === photo.id;
              return (
                <div
                  key={photo.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Section Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-[#78152B]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#C6A15B]/50 shadow-xs">
                        {photo.section}
                      </span>
                      {photo.isPrimary && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs" title="Cover Photo">
                          <RiStarFill className="w-2.5 h-2.5" />
                          <span>Cover</span>
                        </span>
                      )}
                    </div>

                    {/* Top Right Quick Action Buttons */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setPreviewPhotoItem(photo)}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                        title="Preview Fullscreen"
                      >
                        <RiEyeLine className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopyUrl(photo)}
                        className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                        title="Copy Photo URL"
                      >
                        {isCopied ? <RiCheckLine className="w-3.5 h-3.5 text-emerald-400" /> : <RiFileCopyLine className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Category overlay pill */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="bg-white/95 backdrop-blur-xs text-[#78152B] text-[10px] font-bold px-2 py-0.5 rounded-md line-clamp-1 shadow-xs">
                        {photo.category}
                      </span>
                    </div>
                  </div>

                  {/* Photo Details */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#211A19] line-clamp-2 leading-snug">
                        {photo.title}
                      </h4>
                      {photo.parentName && photo.parentName !== photo.title && (
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                          In: {photo.parentName}
                        </p>
                      )}
                      {photo.parentCode && (
                        <span className="inline-block font-mono text-[10px] text-[#78152B] font-semibold mt-1">
                          Code: {photo.parentCode}
                        </span>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setEditPhotoItem(photo)}
                        className="flex-1 inline-flex items-center justify-center gap-1 bg-[#FFF9EF] hover:bg-[#f3e7ce] text-[#78152B] text-xs font-bold py-1.5 px-3 rounded-lg border border-[#C6A15B]/40 transition-colors"
                      >
                        <RiEditLine className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeletePhotoItem(photo)}
                        className="inline-flex items-center justify-center p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Photo"
                      >
                        <RiDeleteBinLine className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ==================== LIST / TABLE VIEW ==================== */
          <div className="bg-white rounded-2xl border border-[#C6A15B]/30 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-[#FFF9EF] text-[#78152B] font-serif font-bold uppercase tracking-wider text-[11px] border-b border-[#C6A15B]/20">
                  <tr>
                    <th className="py-3 px-4">Thumbnail</th>
                    <th className="py-3 px-4">Title / Label</th>
                    <th className="py-3 px-4">Section</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Parent / Code</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPhotos.map((photo) => (
                    <tr key={photo.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-2.5 px-4">
                        <div
                          className="w-12 h-12 rounded-lg bg-stone-900 overflow-hidden cursor-pointer border border-[#C6A15B]/30 shrink-0"
                          onClick={() => setPreviewPhotoItem(photo)}
                        >
                          <img
                            src={photo.url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-[#211A19]">
                        <div className="flex items-center gap-1.5">
                          <span>{photo.title}</span>
                          {photo.isPrimary && (
                            <span className="text-amber-500" title="Primary Cover Photo">
                              <RiStarFill className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="bg-[#78152B]/10 text-[#78152B] font-bold text-[10px] px-2 py-0.5 rounded-full">
                          {photo.section}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-stone-700">{photo.category}</td>
                      <td className="py-2.5 px-4">
                        <span className="text-[11px] text-stone-500 block">
                          {photo.parentName || "—"}
                        </span>
                        {photo.parentCode && (
                          <span className="font-mono text-[10px] text-[#78152B] font-bold">
                            {photo.parentCode}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewPhotoItem(photo)}
                            className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-600 transition-colors"
                            title="Preview"
                          >
                            <RiEyeLine className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCopyUrl(photo)}
                            className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-600 transition-colors"
                            title="Copy URL"
                          >
                            <RiFileCopyLine className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditPhotoItem(photo)}
                            className="p-1.5 hover:bg-stone-100 rounded-lg text-[#78152B] transition-colors"
                            title="Edit Photo"
                          >
                            <RiEditLine className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletePhotoItem(photo)}
                            className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600 transition-colors"
                            title="Delete Photo"
                          >
                            <RiDeleteBinLine className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ADD PHOTO MODAL */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <AddPhotoModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(data) => {
            const res = addPhoto(data);
            if (res.success) {
              showToast(res.message);
              setIsAddModalOpen(false);
            } else {
              alert(res.message);
            }
          }}
          products={products}
        />
      )}

      {/* ========================================================================= */}
      {/* EDIT PHOTO MODAL */}
      {/* ========================================================================= */}
      {editPhotoItem && (
        <EditPhotoModal
          photo={editPhotoItem}
          onClose={() => setEditPhotoItem(null)}
          onSave={(updatedFields) => {
            const res = updatePhoto(editPhotoItem.id, updatedFields);
            if (res.success) {
              showToast(res.message);
              setEditPhotoItem(null);
            } else {
              alert(res.message);
            }
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* FULL PREVIEW LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {previewPhotoItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#C6A15B] flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 bg-[#78152B] text-white flex items-center justify-between border-b border-[#C6A15B]">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#C6A15B] text-[#78152B] font-bold px-2 py-0.5 rounded-full uppercase">
                  {previewPhotoItem.section}
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base line-clamp-1">
                  {previewPhotoItem.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewPhotoItem(null)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview Container */}
            <div className="bg-stone-950 flex-1 min-h-[300px] flex items-center justify-center p-4 overflow-hidden relative">
              <img
                src={previewPhotoItem.url}
                alt={previewPhotoItem.title}
                className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Footer Details */}
            <div className="p-4 bg-[#FFF9EF] border-t border-[#C6A15B]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-stone-700 block">
                  Category: <span className="text-[#78152B]">{previewPhotoItem.category}</span>
                </span>
                {previewPhotoItem.parentName && (
                  <span className="text-stone-500 block">
                    Parent: {previewPhotoItem.parentName}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyUrl(previewPhotoItem)}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-[#78152B] font-bold py-2 px-3 rounded-lg border border-[#C6A15B]/40 transition-colors"
                >
                  <RiFileCopyLine className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </button>
                <a
                  href={previewPhotoItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#78152B] hover:bg-[#5e1022] text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <span>Open Full Image</span>
                  <RiExternalLinkLine className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {deletePhotoItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <RiDeleteBinLine className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-lg font-bold text-[#211A19] mb-1">
              Delete This Photo?
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Are you sure you want to remove <strong>"{deletePhotoItem.title}"</strong> from the {deletePhotoItem.section}?
            </p>

            <div className="w-24 h-24 rounded-xl overflow-hidden mx-auto mb-5 border border-stone-200 shadow-xs bg-stone-100">
              <img
                src={deletePhotoItem.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeletePhotoItem(null)}
                className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const res = deletePhoto(deletePhotoItem.id);
                  if (res.success) {
                    showToast(res.message);
                    setDeletePhotoItem(null);
                  }
                }}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RESET CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-amber-300 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <RiRestartLine className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-lg font-bold text-[#78152B] mb-2">
              Restore Factory Catalog Photos?
            </h3>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              This will restore all default Deepa Silks sarees, readymades, and showroom photographs. Any custom photos or edits will be reset.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setIsResetConfirmOpen(false);
                  showToast("Catalog restored to factory defaults!");
                }}
                className="flex-1 py-2.5 px-4 bg-[#78152B] hover:bg-[#5e1022] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                Yes, Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Add Photo Modal Component
 */
function AddPhotoModal({ onClose, onAdd, products }) {
  const [sourceType, setSourceType] = useState("url"); // "url" | "upload" | "preset"
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("Sarees");
  const [category, setCategory] = useState("Kanchipuram Silks");
  const [attachMode, setAttachMode] = useState("new"); // "new" | "existing"
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [badge, setBadge] = useState("New Arrival");
  const [previewError, setPreviewError] = useState(false);

  const fileInputRef = useRef(null);

  // Handle local file upload & convert to base64 data url
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("Image is larger than 8MB. Please select an optimized image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUrl(event.target.result);
      setPreviewError(false);
      if (!title) {
        // Default title to filename without extension
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPreset = (preset) => {
    setUrl(preset.url);
    setTitle(preset.title);
    setSection(preset.section);
    setCategory(preset.category);
    setPreviewError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      alert("Please provide an image URL or upload an image file.");
      return;
    }

    onAdd({
      url,
      title: title.trim() || "Deepa Silks Exhibit",
      section,
      category,
      badge,
      targetProductId: attachMode === "existing" ? selectedProductId : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#C6A15B] my-8 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#78152B] text-white p-5 flex items-center justify-between border-b border-[#C6A15B]">
          <div className="flex items-center gap-2">
            <RiImageAddLine className="w-5 h-5 text-[#DFBF7E]" />
            <h3
              className="font-serif font-bold text-base sm:text-lg"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Add New Photo to Catalog
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Source Type Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Photo Source
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSourceType("url")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  sourceType === "url"
                    ? "bg-[#78152B] text-white border-[#78152B] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                Web Image URL
              </button>
              <button
                type="button"
                onClick={() => setSourceType("upload")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  sourceType === "upload"
                    ? "bg-[#78152B] text-white border-[#78152B] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                Upload Device File
              </button>
              <button
                type="button"
                onClick={() => setSourceType("preset")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  sourceType === "preset"
                    ? "bg-[#78152B] text-white border-[#78152B] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                Curated Presets
              </button>
            </div>
          </div>

          {/* Conditional Input based on Source Type */}
          {sourceType === "url" && (
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Image Web Address (HTTPS URL)
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setPreviewError(false);
                }}
                placeholder="https://images.unsplash.com/... or cloud storage URL"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] focus:ring-1 focus:ring-[#78152B]"
                required
              />
            </div>
          )}

          {sourceType === "upload" && (
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Select Photo from Computer / Phone
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#C6A15B]/50 hover:border-[#78152B] rounded-2xl p-6 text-center cursor-pointer bg-[#FFF9EF]/40 hover:bg-[#FFF9EF] transition-colors"
              >
                <RiUpload2Line className="w-8 h-8 text-[#78152B] mx-auto mb-2" />
                <span className="text-xs font-bold text-stone-800 block">
                  Click to Browse Photo
                </span>
                <span className="text-[11px] text-stone-500 block mt-0.5">
                  Supports JPG, PNG, WebP (Instant preview)
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {sourceType === "preset" && (
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-2">
                Click any sample textile to auto-fill:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {SAMPLE_PRESETS.map((preset, i) => (
                  <div
                    key={i}
                    onClick={() => handleApplyPreset(preset)}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-stone-200 hover:border-[#78152B] bg-stone-50 hover:bg-white cursor-pointer transition-all"
                  >
                    <img
                      src={preset.url}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-stone-800 block truncate">
                        {preset.title}
                      </span>
                      <span className="text-[10px] text-[#78152B] font-semibold block">
                        {preset.section} · {preset.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Preview & Title Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div className="sm:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Live Preview
              </span>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 border border-stone-300 relative">
                {url && !previewError ? (
                  <img
                    src={url}
                    alt="Preview"
                    onError={() => setPreviewError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-stone-400">
                    <RiImageAddLine className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">
                      {previewError ? "Invalid Image URL" : "No image selected"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Photo Title / Caption *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Maroon Gold Brocade Saree"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Kanchipuram, Soft Silk, Showroom, Pavadai"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] bg-white"
                />
              </div>
            </div>
          </div>

          {/* Destination Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Target Section
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#78152B]"
              >
                <option value="Sarees">Sarees Collection</option>
                <option value="Readymades">Readymades &amp; Ethnic</option>
                <option value="Store Showroom">Store Showroom Gallery</option>
                <option value="Instagram Feed">Instagram Social Feed</option>
                <option value="Showcase Gallery">Custom Showcase Gallery</option>
              </select>
            </div>

            {/* If Saree or Readymade: Attach to existing or create new */}
            {(section === "Sarees" || section === "Readymades") && (
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Publish Option
                </label>
                <select
                  value={attachMode}
                  onChange={(e) => setAttachMode(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#78152B]"
                >
                  <option value="new">Create as New Product Item</option>
                  <option value="existing">Add to Existing Product's Photos</option>
                </select>
              </div>
            )}
          </div>

          {/* Existing Product Dropdown if attachMode === "existing" */}
          {attachMode === "existing" && (section === "Sarees" || section === "Readymades") && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Select Existing Product
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#78152B]"
              >
                {products
                  .filter((p) => (section === "Sarees" ? p.type === "saree" : p.type === "readymade"))
                  .map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.code ? `[${prod.code}] ` : ""}{prod.name} ({prod.images?.length || 0} photos)
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#78152B] hover:bg-[#5e1022] text-white text-xs font-bold rounded-xl shadow-md border border-[#C6A15B] transition-colors"
            >
              Publish Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Edit Photo Modal Component
 */
function EditPhotoModal({ photo, onClose, onSave }) {
  const [url, setUrl] = useState(photo.url || "");
  const [title, setTitle] = useState(photo.title || "");
  const [category, setCategory] = useState(photo.category || "");
  const [badge, setBadge] = useState(photo.badge || "");
  const [isPrimary, setIsPrimary] = useState(photo.isPrimary || false);
  const [previewError, setPreviewError] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUrl(event.target.result);
      setPreviewError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      alert("Image URL or upload cannot be empty.");
      return;
    }

    onSave({
      url,
      title: title.trim(),
      category: category.trim(),
      badge: badge.trim(),
      isPrimary,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#C6A15B] my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-[#78152B] text-white p-5 flex items-center justify-between border-b border-[#C6A15B]">
          <div className="flex items-center gap-2">
            <RiEditLine className="w-5 h-5 text-[#DFBF7E]" />
            <h3
              className="font-serif font-bold text-base sm:text-lg"
              style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
            >
              Edit Photo Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Current Image & Replace Option */}
          <div className="flex items-center gap-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-900 border border-stone-300 shrink-0">
              <img
                src={url}
                alt="Preview"
                onError={() => setPreviewError(true)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <span className="text-xs font-bold text-stone-700 block">
                Replace Current Image
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 text-[#78152B] text-xs font-bold py-1.5 px-3 rounded-lg border border-stone-200 transition-colors"
                >
                  <RiUpload2Line className="w-3.5 h-3.5" />
                  <span>Upload Replacement</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setPreviewError(false);
              }}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Photo Title / Caption
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Featured, Heritage"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#78152B] bg-white"
              />
            </div>
          </div>

          {photo.parentType === "product" && (
            <div className="bg-[#FFF9EF] p-3 rounded-xl border border-[#C6A15B]/30 flex items-center gap-2">
              <input
                type="checkbox"
                id="isPrimaryCheck"
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
                className="rounded text-[#78152B] focus:ring-[#78152B] w-4 h-4"
              />
              <label htmlFor="isPrimaryCheck" className="text-xs font-bold text-[#78152B] cursor-pointer">
                Set as Primary / Main Cover Image for this product
              </label>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#78152B] hover:bg-[#5e1022] text-white text-xs font-bold rounded-xl shadow-md border border-[#C6A15B] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
