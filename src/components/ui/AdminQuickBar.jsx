import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiShieldCheckLine, RiCameraLensLine, RiArrowRightUpLine, RiCloseLine, RiSparklingFill } from "react-icons/ri";
import { useCatalog } from "../../context/CatalogContext";

export default function AdminQuickBar() {
  const location = useLocation();
  const { allPhotos } = useCatalog();
  const [minimized, setMinimized] = useState(false);

  // Don't show floating shortcut if we are already on the /admin dashboard page
  if (location.pathname === "/admin") {
    return null;
  }

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 left-5 z-40 bg-[#78152B] text-white p-2.5 rounded-full shadow-lg border border-[#C6A15B] hover:scale-110 transition-transform"
        title="Open Admin Photo Manager"
      >
        <RiCameraLensLine className="w-5 h-5 text-[#DFBF7E]" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 animate-fadeIn">
      <div className="bg-[#550E1E]/95 backdrop-blur-md text-white border border-[#C6A15B] shadow-xl rounded-2xl py-2 px-3.5 flex items-center gap-3">
        <Link
          to="/admin"
          className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg bg-[#78152B] border border-[#C6A15B]/50 flex items-center justify-center text-[#DFBF7E]">
            <RiCameraLensLine className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-[11px] font-bold text-white block group-hover:text-[#DFBF7E] transition-colors leading-tight">
              Admin Photo Studio
            </span>
            <span className="text-[9px] text-[#DFBF7E] block leading-none">
              {allPhotos.length} photos live · Manage CRUD
            </span>
          </div>
          <RiArrowRightUpLine className="w-4 h-4 text-[#DFBF7E] ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <button
          onClick={() => setMinimized(true)}
          className="p-1 text-stone-400 hover:text-white rounded-md transition-colors"
          title="Minimize shortcut"
        >
          <RiCloseLine className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
