import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind class names cleanly.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats price placeholder for Indian Rupee format if needed
 */
export function formatSamplePrice(amount) {
  if (!amount) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
