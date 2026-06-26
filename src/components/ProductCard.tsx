import React from "react";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string;
  product: Product;
  language: "bn" | "en";
  isWishlisted: boolean;
  onViewDetails: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export default function ProductCard({
  product,
  language,
  isWishlisted,
  onViewDetails,
  onToggleWishlist,
  onQuickAdd,
}: ProductCardProps) {
  // Format prices with Bangladeshi currency (৳) format
  const formatPrice = (p: number) => {
    return language === "bn"
      ? `৳${p.toLocaleString("bn-BD")}`
      : `BDT ${p.toLocaleString()}`;
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800/80 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-neutral-950">
        <img
          src={product.image}
          alt={language === "bn" ? product.nameBn : product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Tags/Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col space-y-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-rose-500 text-white font-bold text-[10px] px-2 py-0.5 rounded font-mono">
              -{discountPercent}%
            </span>
          )}
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-emerald-800 text-white font-semibold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {!product.inStock && (
            <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
              {language === "bn" ? "স্টক শেষ" : "Out of Stock"}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md backdrop-blur-md transition-all duration-300 z-10 cursor-pointer ${
            isWishlisted
              ? "bg-rose-50 dark:bg-rose-950/40 text-rose-500"
              : "bg-white/80 dark:bg-neutral-900/85 text-gray-500 dark:text-neutral-400 hover:text-rose-500 hover:bg-white dark:hover:bg-neutral-800"
          }`}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 z-10">
          <button
            onClick={() => onViewDetails(product)}
            className="p-3 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-emerald-800 hover:text-white dark:hover:bg-emerald-700 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            title={language === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
          >
            <Eye className="w-4 h-4" />
          </button>
          {product.inStock && (
            <button
              onClick={() => onQuickAdd(product)}
              className="p-3 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-emerald-800 hover:text-white dark:hover:bg-emerald-700 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
              title={language === "bn" ? "ব্যাগে যোগ করুন" : "Add to Bag"}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1 text-left">
        {/* Category & Ratings */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-wider mb-1">
          <span>{language === "bn" ? product.categoryBn : product.category}</span>
          <div className="flex items-center space-x-0.5 text-amber-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-gray-600 dark:text-neutral-400 font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-neutral-100 line-clamp-2 hover:text-emerald-800 dark:hover:text-emerald-400 transition duration-200 flex-1">
          <button onClick={() => onViewDetails(product)} className="text-left w-full focus:outline-none cursor-pointer">
            {language === "bn" ? product.nameBn : product.nameEn}
          </button>
        </h3>

        {/* Prices */}
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-base sm:text-lg font-bold text-emerald-800 dark:text-emerald-400">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 dark:text-neutral-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Footer Quick Action - For better visibility */}
        <div className="mt-4 pt-3 border-t border-gray-50 dark:border-neutral-800/60 flex items-center justify-between">
          <button
            onClick={() => onViewDetails(product)}
            className="text-xs font-semibold text-gray-500 dark:text-neutral-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer"
          >
            {language === "bn" ? "বিস্তারিত দেখুন →" : "View Details →"}
          </button>
          {product.inStock ? (
            <button
              onClick={() => onQuickAdd(product)}
              className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 transition flex items-center space-x-1 cursor-pointer"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>{language === "bn" ? "কিনুন" : "Buy"}</span>
            </button>
          ) : (
            <span className="text-xs font-semibold text-red-500">
              {language === "bn" ? "স্টক শেষ" : "Out of Stock"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
