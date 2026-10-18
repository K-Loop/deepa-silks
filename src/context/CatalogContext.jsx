import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { products as initialProducts } from "../data/products";
import { storeGallery as initialStoreGallery, instagramMoments as initialInstagramMoments } from "../data/collections";
import { sareeCategories as initialSareeCategories } from "../data/categories";

const STORAGE_KEYS = {
  PRODUCTS: "deepa_silks_catalog_products_v1",
  STORE_GALLERY: "deepa_silks_catalog_store_gallery_v1",
  INSTAGRAM: "deepa_silks_catalog_instagram_v1",
  CATEGORIES: "deepa_silks_catalog_categories_v1",
  CUSTOM_PHOTOS: "deepa_silks_catalog_custom_photos_v1",
};

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  // 1. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      console.warn("Failed to read products from localStorage:", e);
      return initialProducts;
    }
  });

  // 2. Store Showroom Gallery State
  const [storeGallery, setStoreGallery] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_GALLERY);
      return saved ? JSON.parse(saved) : initialStoreGallery;
    } catch (e) {
      console.warn("Failed to read store gallery from localStorage:", e);
      return initialStoreGallery;
    }
  });

  // 3. Instagram Feed State
  const [instagramMoments, setInstagramMoments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTAGRAM);
      return saved ? JSON.parse(saved) : initialInstagramMoments;
    } catch (e) {
      console.warn("Failed to read instagram moments from localStorage:", e);
      return initialInstagramMoments;
    }
  });

  // 4. Categories State
  const [sareeCategories, setSareeCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : initialSareeCategories;
    } catch (e) {
      console.warn("Failed to read categories from localStorage:", e);
      return initialSareeCategories;
    }
  });

  // 5. Custom Standalone Photos
  const [customPhotos, setCustomPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_PHOTOS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to read custom photos from localStorage:", e);
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn("Error saving products:", e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORE_GALLERY, JSON.stringify(storeGallery));
    } catch (e) {
      console.warn("Error saving storeGallery:", e);
    }
  }, [storeGallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTAGRAM, JSON.stringify(instagramMoments));
    } catch (e) {
      console.warn("Error saving instagramMoments:", e);
    }
  }, [instagramMoments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(sareeCategories));
    } catch (e) {
      console.warn("Error saving sareeCategories:", e);
    }
  }, [sareeCategories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_PHOTOS, JSON.stringify(customPhotos));
    } catch (e) {
      console.warn("Error saving customPhotos:", e);
    }
  }, [customPhotos]);

  // Unified index of all photos in the entire platform
  const allPhotos = useMemo(() => {
    const list = [];

    // From Products
    products.forEach((prod) => {
      (prod.images || []).forEach((imgUrl, idx) => {
        list.push({
          id: `prod_${prod.id}_${idx}`,
          url: imgUrl,
          title: `${prod.name} ${prod.images.length > 1 ? `(#${idx + 1})` : ""}`,
          section: prod.type === "saree" ? "Sarees" : "Readymades",
          category: prod.categoryName || prod.category,
          parentId: prod.id,
          parentType: "product",
          parentName: prod.name,
          parentCode: prod.code,
          imageIndex: idx,
          isPrimary: idx === 0,
          badge: prod.badge || (idx === 0 ? "Cover Photo" : ""),
          price: prod.samplePrice,
        });
      });
    });

    // From Store Gallery
    storeGallery.forEach((item) => {
      list.push({
        id: `store_${item.id}`,
        url: item.image,
        title: item.title,
        subtitle: item.subtitle,
        section: "Store Showroom",
        category: item.category || "Showroom",
        parentId: item.id,
        parentType: "store",
        parentName: item.title,
        isPrimary: true,
        badge: "Showroom",
      });
    });

    // From Instagram Moments
    instagramMoments.forEach((item) => {
      list.push({
        id: `insta_${item.id}`,
        url: item.image,
        title: item.caption || "Instagram Moment",
        subtitle: `${item.likes} likes`,
        section: "Instagram Feed",
        category: "Social Feed",
        parentId: item.id,
        parentType: "instagram",
        parentName: item.caption,
        isPrimary: true,
        badge: "Instagram",
      });
    });

    // From Categories
    sareeCategories.forEach((cat) => {
      if (cat.image) {
        list.push({
          id: `cat_${cat.id}`,
          url: cat.image,
          title: `${cat.name} Banner`,
          subtitle: cat.tagline,
          section: "Category Banners",
          category: cat.name,
          parentId: cat.id,
          parentType: "category",
          parentName: cat.name,
          isPrimary: true,
          badge: cat.badge || "Banner",
        });
      }
    });

    // From Custom Uploads / Gallery
    customPhotos.forEach((c) => {
      list.push({
        id: c.id,
        url: c.url,
        title: c.title,
        subtitle: c.subtitle || "Custom Gallery",
        section: c.section || "Showcase Gallery",
        category: c.category || "General",
        parentId: c.id,
        parentType: "custom",
        parentName: c.title,
        isPrimary: true,
        badge: c.badge || "Custom",
      });
    });

    return list;
  }, [products, storeGallery, instagramMoments, sareeCategories, customPhotos]);

  // ==================== CRUD OPERATIONS ====================

  /**
   * Add a new photo to the catalog
   */
  const addPhoto = useCallback(({
    url,
    title,
    section = "Sarees",
    category = "General",
    targetProductId = null,
    badge = "",
    subtitle = "",
  }) => {
    if (!url) return { success: false, message: "Image URL or data is required." };

    const newId = `custom_${Date.now()}`;

    // Case 1: Attaching to existing product
    if (targetProductId) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === targetProductId) {
            return {
              ...p,
              images: [...(p.images || []), url],
            };
          }
          return p;
        })
      );
      return { success: true, message: "Photo added to product successfully!" };
    }

    // Case 2: New Store Gallery photo
    if (section === "Store Showroom") {
      const newStoreItem = {
        id: `gallery-${Date.now()}`,
        title: title || "New Store Exhibit",
        subtitle: subtitle || "Deepa Silks Showroom Display",
        image: url,
        category: category || "Showroom",
      };
      setStoreGallery((prev) => [newStoreItem, ...prev]);
      return { success: true, message: "Showroom photo added successfully!" };
    }

    // Case 3: New Instagram Moment
    if (section === "Instagram Feed") {
      const newInstaItem = {
        id: `insta-${Date.now()}`,
        image: url,
        likes: "1.2k",
        caption: title || "Latest festive collection highlight",
      };
      setInstagramMoments((prev) => [newInstaItem, ...prev]);
      return { success: true, message: "Instagram photo added successfully!" };
    }

    // Case 4: Saree or Readymade product photo creation
    if (section === "Sarees" || section === "Readymades") {
      const isSaree = section === "Sarees";
      const slugId = (title || "silk-ensemble")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 30) + `-${Date.now().toString().slice(-4)}`;

      const newProduct = {
        id: slugId,
        code: `DS-${isSaree ? "SAR" : "RDY"}-${Math.floor(100 + Math.random() * 900)}`,
        name: title || (isSaree ? "Curated Heritage Silk Saree" : "Festive Readymade Ensemble"),
        category: category.toLowerCase().replace(/\s+/g, "-") || (isSaree ? "kanchipuram" : "lehengas"),
        categoryName: category || (isSaree ? "Curated Silks" : "Readymades"),
        type: isSaree ? "saree" : "readymade",
        samplePrice: isSaree ? 9999 : 4499,
        priceNote: "Sample Ref Price (Ask on WhatsApp for live price)",
        badge: badge || "New Arrival",
        rating: 5.0,
        images: [url],
        shortDesc: `${title || "Exquisite hand-finished garment"} from the latest Deepa Silks collection.`,
        description: `Hand-selected pure textile work featuring traditional motifs and rich craftsmanship. Available for immediate WhatsApp consultation.`,
        fabric: isSaree ? "Pure Silk Weave" : "Art Silk & Georgette",
        zariType: "Tested Fine Zari",
        blousePiece: isSaree ? "Matching blouse piece included" : undefined,
        length: isSaree ? "6.2 meters" : undefined,
        care: "Dry clean recommended.",
        availableColors: ["Classic Maroon", "Temple Gold", "Peacock Blue"],
        isFeatured: true,
        isBestSeller: false,
        isNewArrival: true,
      };

      setProducts((prev) => [newProduct, ...prev]);
      return { success: true, message: `New ${section} photo & item published successfully!` };
    }

    // Case 5: Standalone Custom Photo
    const customItem = {
      id: newId,
      url,
      title: title || "Showcase Photo",
      subtitle: subtitle || "Catalog Showcase",
      section: section || "Showcase Gallery",
      category: category || "General",
      badge: badge || "Showcase",
    };
    setCustomPhotos((prev) => [customItem, ...prev]);
    return { success: true, message: "Photo added to Showcase Gallery!" };
  }, []);

  /**
   * Update an existing photo
   */
  const updatePhoto = useCallback((photoId, updatedFields) => {
    const { url, title, category, badge, isPrimary } = updatedFields;

    // 1. Check if it's a product photo
    if (photoId.startsWith("prod_")) {
      const parts = photoId.split("_");
      // Format: prod_{productId}_{idx}
      const idx = parseInt(parts[parts.length - 1], 10);
      const prodId = parts.slice(1, -1).join("_");

      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === prodId) {
            let nextImages = [...(p.images || [])];
            if (url) {
              nextImages[idx] = url;
            }
            // If marked primary, move to first position
            if (isPrimary && idx > 0) {
              const [selected] = nextImages.splice(idx, 1);
              nextImages.unshift(selected);
            }
            return {
              ...p,
              images: nextImages,
              name: title || p.name,
              categoryName: category || p.categoryName,
              badge: badge !== undefined ? badge : p.badge,
            };
          }
          return p;
        })
      );
      return { success: true, message: "Product photo updated successfully!" };
    }

    // 2. Check if it's a store gallery photo
    if (photoId.startsWith("store_")) {
      const storeId = photoId.replace("store_", "");
      setStoreGallery((prev) =>
        prev.map((item) =>
          item.id === storeId
            ? {
                ...item,
                image: url || item.image,
                title: title || item.title,
                category: category || item.category,
              }
            : item
        )
      );
      return { success: true, message: "Showroom photo updated successfully!" };
    }

    // 3. Check if it's an instagram photo
    if (photoId.startsWith("insta_")) {
      const instaId = photoId.replace("insta_", "");
      setInstagramMoments((prev) =>
        prev.map((item) =>
          item.id === instaId
            ? {
                ...item,
                image: url || item.image,
                caption: title || item.caption,
              }
            : item
        )
      );
      return { success: true, message: "Instagram photo updated successfully!" };
    }

    // 4. Check if it's a category banner photo
    if (photoId.startsWith("cat_")) {
      const catId = photoId.replace("cat_", "");
      setSareeCategories((prev) =>
        prev.map((item) =>
          item.id === catId
            ? {
                ...item,
                image: url || item.image,
                name: title || item.name,
              }
            : item
        )
      );
      return { success: true, message: "Category banner updated successfully!" };
    }

    // 5. Custom photo
    setCustomPhotos((prev) =>
      prev.map((c) =>
        c.id === photoId
          ? {
              ...c,
              url: url || c.url,
              title: title || c.title,
              category: category || c.category,
              badge: badge !== undefined ? badge : c.badge,
            }
          : c
      )
    );
    return { success: true, message: "Photo updated successfully!" };
  }, []);

  /**
   * Delete an existing photo
   */
  const deletePhoto = useCallback((photoId) => {
    // 1. Product photo
    if (photoId.startsWith("prod_")) {
      const parts = photoId.split("_");
      const idx = parseInt(parts[parts.length - 1], 10);
      const prodId = parts.slice(1, -1).join("_");

      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === prodId) {
            const nextImages = (p.images || []).filter((_, i) => i !== idx);
            // If no images left, provide a stylish placeholder image so card doesn't break
            if (nextImages.length === 0) {
              nextImages.push(
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
              );
            }
            return {
              ...p,
              images: nextImages,
            };
          }
          return p;
        })
      );
      return { success: true, message: "Photo removed from product!" };
    }

    // 2. Store gallery
    if (photoId.startsWith("store_")) {
      const storeId = photoId.replace("store_", "");
      setStoreGallery((prev) => prev.filter((item) => item.id !== storeId));
      return { success: true, message: "Showroom photo deleted!" };
    }

    // 3. Instagram photo
    if (photoId.startsWith("insta_")) {
      const instaId = photoId.replace("insta_", "");
      setInstagramMoments((prev) => prev.filter((item) => item.id !== instaId));
      return { success: true, message: "Instagram moment deleted!" };
    }

    // 4. Category photo
    if (photoId.startsWith("cat_")) {
      const catId = photoId.replace("cat_", "");
      setSareeCategories((prev) =>
        prev.map((c) => (c.id === catId ? { ...c, image: "" } : c))
      );
      return { success: true, message: "Category banner reset!" };
    }

    // 5. Custom photo
    setCustomPhotos((prev) => prev.filter((c) => c.id !== photoId));
    return { success: true, message: "Photo deleted from Showcase Gallery!" };
  }, []);

  /**
   * Reset all catalog data to factory defaults
   */
  const resetToDefaults = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setProducts(initialProducts);
    setStoreGallery(initialStoreGallery);
    setInstagramMoments(initialInstagramMoments);
    setSareeCategories(initialSareeCategories);
    setCustomPhotos([]);
    return { success: true, message: "Catalog reset to factory default photos!" };
  }, []);

  /**
   * Export all catalog data as JSON string for backup
   */
  const exportData = useCallback(() => {
    const payload = {
      timestamp: new Date().toISOString(),
      products,
      storeGallery,
      instagramMoments,
      sareeCategories,
      customPhotos,
    };
    return JSON.stringify(payload, null, 2);
  }, [products, storeGallery, instagramMoments, sareeCategories, customPhotos]);

  /**
   * Import data from JSON backup
   */
  const importData = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.storeGallery) setStoreGallery(parsed.storeGallery);
      if (parsed.instagramMoments) setInstagramMoments(parsed.instagramMoments);
      if (parsed.sareeCategories) setSareeCategories(parsed.sareeCategories);
      if (parsed.customPhotos) setCustomPhotos(parsed.customPhotos);
      return { success: true, message: "Catalog backup restored successfully!" };
    } catch (e) {
      return { success: false, message: "Invalid JSON backup format: " + e.message };
    }
  }, []);

  const value = {
    products,
    storeGallery,
    instagramMoments,
    sareeCategories,
    customPhotos,
    allPhotos,
    addPhoto,
    updatePhoto,
    deletePhoto,
    resetToDefaults,
    exportData,
    importData,
  };

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
}
