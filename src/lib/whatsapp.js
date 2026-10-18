import { siteConfig } from "../config/site";

/**
 * Builds the official WhatsApp click-to-chat URL for product-specific enquiries.
 * 
 * Format: https://wa.me/COUNTRYCODEPHONENUMBER?text=ENCODED_MESSAGE
 * 
 * @param {Object} product - Product details (name, category, id, priceSample, etc.)
 * @param {string} [customMessage] - Optional custom note
 * @returns {string} WhatsApp web / app redirect link
 */
export function buildWhatsAppUrl(product, customMessage = "") {
  const phone = siteConfig.whatsapp.phoneNumber;

  if (!product) {
    return buildGeneralWhatsAppUrl(customMessage);
  }

  // Construct courteous enquiry message (No emojis)
  const lines = [
    "Namaste Deepa Silks!",
    "",
    "I am interested in this piece from your collection:",
    `• Product: ${product.name}`,
    `• Category: ${product.category || "Ethnic Collection"}`,
    product.code ? `• Item Code: ${product.code}` : null,
    product.samplePrice ? `• Sample Ref Price: ${product.samplePrice}` : null,
    "",
    customMessage ? `Note: ${customMessage}\n` : null,
    "Could you please share:",
    "1. Exact pricing and festival offers",
    "2. Available color options and real photographs/video",
    "3. Availability and showroom pickup/shipping options?",
    "",
    "Thank you!",
  ].filter(Boolean);

  const fullText = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Builds general WhatsApp enquiry link for quick customer support.
 * 
 * @param {string} [customText] 
 * @returns {string}
 */
export function buildGeneralWhatsAppUrl(customText) {
  const phone = siteConfig.whatsapp.phoneNumber;
  const message = customText || siteConfig.whatsapp.defaultGreeting;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
