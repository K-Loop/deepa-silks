import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { RiHeartFill, RiExternalLinkLine } from "react-icons/ri";
import { siteConfig } from "../../config/site";
import { instagramMoments } from "../../data/collections";

export default function InstagramFeed() {
  return (
    <section className="bg-white py-14 border-b border-[#C6A15B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[#78152B] mb-2 font-bold text-xs uppercase tracking-wider">
            <FaInstagram className="w-4 h-4 shrink-0" />
            <span>Official Instagram</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#211A19]"
            style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', serif" }}
          >
            Follow Us {siteConfig.instagram.handle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Catch real-time new arrivals, customer styling stories, and festival updates.
          </p>
        </div>

        {/* Instagram Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {instagramMoments.map((item) => (
            <a
              key={item.id}
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square bg-stone-100 border border-[#C6A15B]/30 shadow-xs block"
              aria-label={`View Instagram post: ${item.caption}`}
            >
              <img
                src={item.image}
                alt="Deepa Silks Instagram Saree Showcase"
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
              />

              {/* Hover Dark Overlay with Likes & Caption */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <RiExternalLinkLine className="w-4 h-4 text-[#DFBF7E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-300 mb-1">
                    <RiHeartFill className="w-3.5 h-3.5" />
                    <span className="font-bold">{item.likes}</span>
                  </div>
                  <p className="text-[11px] line-clamp-2 text-stone-200">
                    {item.caption}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA Button */}
        <div className="mt-8 text-center">
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFF9EF] hover:bg-[#78152B] text-[#78152B] hover:text-white border border-[#C6A15B] font-bold text-xs py-2.5 px-6 rounded-full transition-all duration-300 shadow-2xs"
          >
            <FaInstagram className="w-4 h-4 shrink-0" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
