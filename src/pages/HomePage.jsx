import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedCategories from "../components/home/FeaturedCategories";
import FeaturedCollection from "../components/home/FeaturedCollection";
import FestiveCampaignBanner from "../components/home/FestiveCampaignBanner";
import BrandStory from "../components/home/BrandStory";
import StoreGallery from "../components/home/StoreGallery";
import InstagramFeed from "../components/home/InstagramFeed";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Regal Hero Section with South Indian Silk Saree Model */}
      <HeroSection />

      {/* 2. Top 5 Circular Category Badges & Visual Category Grid */}
      <FeaturedCategories />

      {/* 3. Featured Silk & Readymade Highlights with Filter Tabs */}
      <ScrollReveal>
        <FeaturedCollection />
      </ScrollReveal>

      {/* 4. Festive Wedding Season Campaign Banner */}
      <ScrollReveal>
        <FestiveCampaignBanner />
      </ScrollReveal>

      {/* 5. Brand Heritage & Pure Zari Craftsmanship Story */}
      <ScrollReveal>
        <BrandStory />
      </ScrollReveal>

      {/* 6. Showroom Values & Karur/Dharmapuri In-Store Experience */}
      <ScrollReveal>
        <StoreGallery />
      </ScrollReveal>

      {/* 7. Official Instagram Gallery */}
      <ScrollReveal>
        <InstagramFeed />
      </ScrollReveal>
    </div>
  );
}
