import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import FloatingWhatsAppButton from "./components/ui/FloatingWhatsAppButton";
import SearchModal from "./components/ui/SearchModal";
import WhatsAppCatalogModal from "./components/ui/WhatsAppCatalogModal";
import PageTransition from "./components/ui/PageTransition";

// Lazy-loaded routes for optimized bundle chunking & instant initial load
const HomePage = lazy(() => import("./pages/HomePage"));
const SareesPage = lazy(() => import("./pages/SareesPage"));
const ReadymadesPage = lazy(() => import("./pages/ReadymadesPage"));
const CollectionsPage = lazy(() => import("./pages/CollectionsPage"));
const OurStorePage = lazy(() => import("./pages/OurStorePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Elegant Silk Loader Component
function SilkPageLoader() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#FFF9EF]">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#C6A15B]/30 animate-ping" />
        <div className="w-8 h-8 rounded-full border-2 border-[#78152B] border-t-transparent animate-spin" />
      </div>
      <span className="font-serif text-xs font-bold text-[#78152B] tracking-widest uppercase mt-4">
        Deepa Silks
      </span>
    </div>
  );
}

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#FFF9EF] text-[#211A19]">
        {/* Top Slim Announcement Bar */}
        <AnnouncementBar />

        {/* Sticky Luxury Header Navigation */}
        <Header
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenCatalog={() => setCatalogModalOpen(true)}
        />

        {/* Main Content Area with Suspense and Route Transitions */}
        <div className="flex-1">
          <Suspense fallback={<SilkPageLoader />}>
            <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sarees" element={<SareesPage />} />
                <Route path="/readymades" element={<ReadymadesPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/our-store" element={<OurStorePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </div>

        {/* Global Rich Footer */}
        <Footer />

        {/* Global Floating WhatsApp Quick Action Button */}
        <FloatingWhatsAppButton onOpenCatalog={() => setCatalogModalOpen(true)} />

        {/* Global Search Modal (Ctrl+K or Header Search Icon) */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />

        {/* Interactive WhatsApp Business Catalog Preview Modal */}
        <WhatsAppCatalogModal
          isOpen={catalogModalOpen}
          onClose={() => setCatalogModalOpen(false)}
        />
      </div>
    </Router>
  );
}
