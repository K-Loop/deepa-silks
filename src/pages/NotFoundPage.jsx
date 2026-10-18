import React from "react";
import { Link } from "react-router-dom";
import { RiHomeLine, RiArrowRightLine } from "react-icons/ri";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#FFF9EF]">
      <span className="text-6xl font-serif font-bold text-[#78152B]">404</span>
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A19] mt-3 mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-stone-600 max-w-md mb-8">
        The silk weave or page you are looking for is not available. Please explore our sarees or contact us directly on WhatsApp.
      </p>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#78152B] hover:bg-[#550E1E] text-white text-xs font-semibold px-6 py-3 rounded-full shadow-sm transition-colors"
        >
          <RiHomeLine className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/sarees"
          className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <span>Explore Sarees</span>
          <RiArrowRightLine className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
