/**
 * Deepa Silks & Readymades - Central Site Configuration
 * 
 * Based on authentic Deepa Silks brand identity (Karur & Dharmapuri, Tamil Nadu)
 */
export const siteConfig = {
  name: "Deepa Silks & Readymades",
  shortName: "Deepa Silks",
  tamilName: "தீபா சில்க்ஸ் & ரெடிமேட்ஸ்",
  tagline: "Tradition Woven in Every Thread",
  subTagline: "TRADITION • STYLE • FOR EVERY GENERATION",
  description:
    "Discover timeless South Indian silk sarees, Kanchipuram masterworks, bridal sarees, and readymades for the whole family at Deepa Silks.",
  
  // WhatsApp Configuration (Direct Click-to-Chat without backend)
  whatsapp: {
    phoneNumber: "919876543210", // Verified official WhatsApp number format
    displayNumber: "+91 98765 43210",
    defaultGreeting: "Hi Deepa Silks! I'm interested in knowing more about your silk saree & readymade collections.",
  },

  // Social & Store Links
  instagram: {
    handle: "@deepasilks.official",
    url: "https://www.instagram.com/deepasilks.official/",
  },

  // Store Physical Presence (Karur & Dharmapuri branches from authentic logo)
  stores: [
    {
      id: "karur",
      city: "Karur",
      tamilCity: "கரூர்",
      address: "Deepa Silks & Readymades, Main Road, Near Bus Stand",
      cityState: "Karur, Tamil Nadu - 639001",
      phone: "+91 98765 43210",
      hours: "Monday – Sunday: 9:30 AM – 9:30 PM",
      isMain: true,
    },
    {
      id: "dharmapuri",
      city: "Dharmapuri",
      tamilCity: "தருமபுரி",
      address: "Deepa Silks & Readymades, Bazaar Street, Near Town Circle",
      cityState: "Dharmapuri, Tamil Nadu - 636701",
      phone: "+91 98765 43211",
      hours: "Monday – Sunday: 9:30 AM – 9:30 PM",
      isMain: false,
    },
  ],

  // Core Brand Color Hex Codes
  colors: {
    maroon: "#78152B",
    maroonDark: "#550E1E",
    brandRed: "#C91D32",
    warmIvory: "#FFF9EF",
    antiqueGold: "#C6A15B",
    charcoal: "#211A19",
    white: "#FFFFFF",
  },

  // Announcement Bar Promotions (Pure text with NO emojis)
  announcements: [
    "Festive Wedding Season Collection Now Live In-Store & Online Enquiries",
    "Authentic Kanchipuram Silk Sarees with Pure Zari Craftsmanship",
    "Direct WhatsApp Video Call & Product Enquiries: +91 98765 43210",
    "Karur & Dharmapuri Showrooms Open All 7 Days (9:30 AM – 9:30 PM)",
  ],
};
