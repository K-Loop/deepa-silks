# Deepa Silks & Readymades — Frontend Web Application

> **தீபா சில்க்ஸ் • கரூர் • தருமபுரி**  
> *Tradition Woven in Every Thread*

A modern, production-quality React frontend application built for **Deepa Silks & Readymades**, faithfully recreating the brand’s authentic South Indian textile heritage and matching the provided UI/UX design reference.

---

## 🌟 Key Features

1. **Brand Identity & Real Assets**:
   - Preserves the authentic official Deepa Silks logo (`/images/brand/deepa-silks-logo.png`) with Tamil calligraphy (**தீபா சில்க்ஸ் • கரூர் • தருமபுரி**).
   - Rich color palette: Deep Maroon (`#78152B`), Brand Red (`#C91D32`), Warm Ivory (`#FFF9EF`), Antique Gold (`#C6A15B`), Charcoal (`#211A19`).
   - Royal serif typography (**Cinzel** & **Cormorant Garamond**) paired with clean sans-serif (**Plus Jakarta Sans**).

2. **100% Frontend Architecture (No Backend Required)**:
   - Zero servers, databases, or payment gateways needed.
   - All searching, filtering, and sorting happens instantaneously on the client.

3. **Complete WhatsApp Click-to-Chat Integration**:
   - Reusable `buildWhatsAppUrl(product, note)` generator.
   - Every product card and detail page creates an encoded WhatsApp message prefilled with product title, item code, sample reference price, and availability enquiry.
   - Interactive **WhatsApp Business Catalog Preview Modal** reproducing the official catalog preview.
   - Floating WhatsApp desk with live chat assistance.

4. **Dedicated Pages**:
   - **Home Page**: Editorial hero with South Indian silk saree model, 5 quick-access circular category badges, featured highlights, festive campaign banner, brand legacy story, in-store gallery, and official Instagram feed.
   - **Saree Collections Page**: Full catalog for Kanchipuram, Soft Silk, Designer & Banarasi, Pure Cotton, Festive, and Bridal Sarees with visual category cards and live filter chips.
   - **Readymades & Festive Wear Page**: Flared lehenga sets, kids pure silk pavadai sattai, designer kurtis, bridal aari work blouses, and family matching sets.
   - **Exclusive Collections Page**: Campaign-driven wedding muhurtham edits and family celebration collections.
   - **Our Store Page**: Karur and Dharmapuri showroom showcases, opening hours, facilities, and visiting guides.
   - **Product Detail Page**: Multi-angle image gallery, sample reference pricing with clear disclaimers, fabric purity specifications, color variants, and instant WhatsApp inquiry.
   - **About Us & Contact Pages**: Authentic brand values, branch showroom contacts, and custom styled map visualization.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (JavaScript JSX)
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`, custom `@theme`)
- **Animations**: Framer Motion (`motion/react` & `framer-motion`) with reduced motion accessibility
- **Routing**: React Router v7
- **Icons**: Lucide React + Custom SVG icons

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, code-split production bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ How to Configure Brand Details

All brand contact info, phone numbers, and showroom locations are managed in a single central file:

**Location**: `src/config/site.js`

```javascript
export const siteConfig = {
  // Update official WhatsApp business number here:
  whatsapp: {
    phoneNumber: "919876543210", // Country code + 10-digit number (no '+' or spaces)
    displayNumber: "+91 98765 43210",
  },

  // Update showroom addresses:
  stores: [
    {
      id: "karur",
      city: "Karur",
      tamilCity: "கரூர்",
      address: "Deepa Silks & Readymades, Main Road, Near Bus Stand",
      cityState: "Karur, Tamil Nadu - 639001",
      phone: "+91 98765 43210",
      hours: "Monday – Sunday: 9:30 AM – 9:30 PM",
    },
    {
      id: "dharmapuri",
      city: "Dharmapuri",
      tamilCity: "தருமபுரி",
      address: "Deepa Silks & Readymades, Bazaar Street",
      cityState: "Dharmapuri, Tamil Nadu - 636701",
      phone: "+91 98765 43211",
      hours: "Monday – Sunday: 9:30 AM – 9:30 PM",
    },
  ],

  // Update Instagram link:
  instagram: {
    handle: "@deepasilks.official",
    url: "https://www.instagram.com/deepasilks.official/",
  },
};
```

### Updating Products & Prices
Product data is stored in `src/data/products.js`. You can add new silk sarees, lehengas, or kids pavadais simply by appending an object to the `products` array.

---

## 📁 Project Structure

```
akka1/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── brand/
│       │   └── deepa-silks-logo.png   (Official Deepa Silks Logo)
│       └── reference/
│           └── ui-ux-design-reference.jpg (UI/UX Mockup Board)
├── src/
│   ├── config/
│   │   └── site.js                  (Central Brand & Store Settings)
│   ├── lib/
│   │   ├── whatsapp.js              (WhatsApp Click-to-Chat Deep Links)
│   │   └── utils.js                 (Class merging & Formatting)
│   ├── data/
│   │   ├── products.js              (Curated Sarees & Readymades)
│   │   ├── categories.js            (Taxonomy & Category Banners)
│   │   └── collections.js           (Showroom Values & Gallery)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/
│   │   │   ├── BrandLogo.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   ├── FloatingWhatsAppButton.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── SearchModal.jsx
│   │   │   ├── WhatsAppCatalogModal.jsx
│   │   │   ├── ScrollReveal.jsx
│   │   │   ├── PageTransition.jsx
│   │   │   └── Icons.jsx
│   │   └── home/
│   │       ├── HeroSection.jsx
│   │       ├── FeaturedCategories.jsx
│   │       ├── FeaturedCollection.jsx
│   │       ├── FestiveCampaignBanner.jsx
│   │       ├── BrandStory.jsx
│   │       ├── StoreGallery.jsx
│   │       └── InstagramFeed.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SareesPage.jsx
│   │   ├── ReadymadesPage.jsx
│   │   ├── CollectionsPage.jsx
│   │   ├── OurStorePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── index.css                    (Tailwind CSS v4 & Royal Color Themes)
│   ├── main.jsx                     (React Application Bootstrap)
│   └── App.jsx                      (Router & Layout Assembly)
├── package.json
├── vite.config.js                   (Vite + React + Tailwind v4 Plugins)
└── index.html
```
