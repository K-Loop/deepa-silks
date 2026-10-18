import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { buildWhatsAppUrl, buildGeneralWhatsAppUrl } from "../../lib/whatsapp";

/**
 * Reusable WhatsApp CTA Button using React Icons (FaWhatsapp)
 */
export default function WhatsAppButton({
  product = null,
  customMessage = "",
  variant = "primary", // 'primary' (green), 'maroon', 'gold', 'outline'
  size = "md", // 'sm', 'md', 'lg'
  showIcon = true,
  label = null,
  className = "",
}) {
  const url = product ? buildWhatsAppUrl(product, customMessage) : buildGeneralWhatsAppUrl(customMessage);
  
  const defaultLabel = product ? "Enquire on WhatsApp" : "Chat on WhatsApp";
  const displayLabel = label || defaultLabel;

  // Variants styling
  const variantStyles = {
    primary: "bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm hover:shadow-md",
    maroon: "bg-[#78152B] hover:bg-[#550E1E] text-white shadow-sm hover:shadow-md",
    gold: "bg-[#C6A15B] hover:bg-[#A6823E] text-[#211A19] font-semibold shadow-sm hover:shadow-md",
    outline: "border-2 border-[#25D366] text-[#1EBE5D] hover:bg-[#25D366] hover:text-white bg-transparent",
  };

  // Sizes styling
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 rounded-full",
    md: "text-sm px-4 py-2.5 gap-2 rounded-full",
    lg: "text-base px-6 py-3.5 gap-2.5 rounded-full font-semibold",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-medium transition-all duration-300 transform active:scale-95 cursor-pointer ${
        variantStyles[variant] || variantStyles.primary
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
      aria-label={`Send WhatsApp enquiry for ${product ? product.name : "Deepa Silks"}`}
    >
      {showIcon && <FaWhatsapp className="w-4 h-4 shrink-0" />}
      <span>{displayLabel}</span>
    </a>
  );
}
