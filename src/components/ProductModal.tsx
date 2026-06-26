import React, { useState } from "react";
import { X, Star, Heart, ShoppingBag, Check, Plus, Minus } from "lucide-react";
import { Product, Review } from "../types";

interface ProductModalProps {
  product: Product;
  language: "bn" | "en";
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, quantity: number, size: string, color: string) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export default function ProductModal({
  product,
  language,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onAddReview,
}: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);

  // New review form states
  const [reviewerName, setReviewerName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!isOpen) return null;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const formatPrice = (p: number) => {
    return language === "bn"
      ? `৳${p.toLocaleString("bn-BD")}`
      : `BDT ${p.toLocaleString()}`;
  };

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split("T")[0],
    };

    onAddReview(product.id, newReview);
    setReviewerName("");
    setReviewComment("");
    setReviewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const t = {
    sizes: language === "bn" ? "সাইজ নির্বাচন করুন:" : "Choose Size:",
    colors: language === "bn" ? "রঙ নির্বাচন করুন:" : "Choose Color:",
    qty: language === "bn" ? "পরিমাণ:" : "Quantity:",
    addToBag: language === "bn" ? "শপিং ব্যাগে যোগ করুন" : "Add to Shopping Bag",
    wishlistAdd: language === "bn" ? "ইচ্ছা তালিকায় যোগ করুন" : "Add to Wishlist",
    wishlistRemove: language === "bn" ? "ইচ্ছা তালিকা থেকে সরান" : "Remove from Wishlist",
    specs: language === "bn" ? "প্রোডাক্টের বৈশিষ্ট্যসমূহ:" : "Product Features:",
    desc: language === "bn" ? "বিস্তারিত বিবরণ:" : "Detailed Description:",
    reviews: language === "bn" ? "গ্রাহকদের মতামত ও রিভিউ" : "Customer Reviews & Feedbacks",
    writeReview: language === "bn" ? "একটি নতুন রিভিউ লিখুন" : "Write a Customer Review",
    nameLabel: language === "bn" ? "আপনার নাম" : "Your Name",
    commentLabel: language === "bn" ? "রিভিউ মন্তব্য" : "Your Review Comment",
    ratingLabel: language === "bn" ? "রেটিং দিন" : "Rating",
    submitReview: language === "bn" ? "রিভিউ জমা দিন" : "Submit Review",
    successMsg: language === "bn" ? "রিভিউটি সফলভাবে যুক্ত হয়েছে!" : "Review added successfully!",
    inStock: language === "bn" ? "স্টকে আছে" : "In Stock",
    outStock: language === "bn" ? "স্টক নেই" : "Out of Stock",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 rounded-2xl w-full max-w-5xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Gallery Left - 5 cols */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-neutral-950 border border-gray-100 dark:border-neutral-850">
                <img
                  src={activeImage}
                  alt={product.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition cursor-pointer flex-shrink-0 ${
                        activeImage === img ? "border-emerald-800 dark:border-emerald-500" : "border-gray-200 dark:border-neutral-800 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Right - 7 cols */}
            <div className="md:col-span-7 space-y-6 text-left">
              <div>
                <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {language === "bn" ? product.categoryBn : product.category}
                </span>

                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 dark:text-neutral-100 mt-3 leading-snug">
                  {language === "bn" ? product.nameBn : product.nameEn}
                </h2>

                {/* Stars */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-current" : "text-gray-250 dark:text-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-neutral-300">
                    {product.rating} ({product.reviews.length} reviews)
                  </span>
                  <span className="text-gray-355 dark:text-neutral-750">|</span>
                  <span className={`text-xs font-bold ${product.inStock ? "text-emerald-700 dark:text-emerald-400" : "text-rose-500"}`}>
                    ● {product.inStock ? t.inStock : t.outStock}
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline space-x-3 bg-gray-50 dark:bg-neutral-950 p-4 rounded-xl">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-400">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-gray-400 dark:text-neutral-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 text-xs font-bold px-2 py-0.5 rounded">
                      -{discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Colors selection */}
              <div>
                <p className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  {t.colors} <span className="text-neutral-900 dark:text-neutral-200 font-normal">{selectedColor}</span>
                </p>
                <div className="flex items-center space-x-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition relative cursor-pointer ${
                        selectedColor === color.name ? "border-emerald-800 dark:border-emerald-500 scale-110 shadow-md" : "border-gray-200 dark:border-neutral-800 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes selection */}
              <div>
                <p className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  {t.sizes} <span className="text-neutral-900 dark:text-neutral-200 font-normal">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-bold border rounded-lg transition uppercase cursor-pointer ${
                        selectedSize === size
                          ? "border-emerald-800 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 shadow-sm"
                          : "border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-gray-400 dark:hover:border-neutral-600 text-gray-700 dark:text-neutral-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty & Cart buttons */}
              {product.inStock && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center justify-between border border-gray-200 dark:border-neutral-800 rounded-lg p-1.5 w-full sm:w-32 bg-white dark:bg-neutral-900">
                    <button
                      onClick={() => handleQuantityChange("dec")}
                      className="p-1.5 rounded text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-gray-800 dark:text-neutral-100">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("inc")}
                      className="p-1.5 rounded text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedSize, selectedColor);
                      onClose();
                    }}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/10 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.addToBag}</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      isWishlisted
                        ? "bg-rose-50 dark:bg-rose-950/35 border-rose-200 dark:border-rose-900/40 text-rose-500 hover:bg-rose-100"
                        : "border-gray-200 dark:border-neutral-850 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-850 hover:border-gray-300 dark:hover:border-neutral-700"
                    }`}
                    title={isWishlisted ? t.wishlistRemove : t.wishlistAdd}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2 border-t border-gray-100 dark:border-neutral-800 pt-5">
                <h4 className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider">{t.desc}</h4>
                <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed">
                  {language === "bn" ? product.descriptionBn : product.descriptionEn}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider">{t.specs}</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-neutral-300">
                  {(language === "bn" ? product.featuresBn : product.featuresEn).map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-700 dark:text-emerald-400 mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews Area */}
              <div className="border-t border-gray-100 dark:border-neutral-800 pt-6 space-y-6">
                <h3 className="font-serif font-semibold text-lg text-gray-900 dark:text-neutral-100">{t.reviews}</h3>
                
                {/* Review List */}
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="bg-gray-50 dark:bg-neutral-950 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-gray-800 dark:text-neutral-200">{rev.userName}</span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500 font-medium">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-current" : "text-gray-200 dark:text-neutral-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400 font-light">{rev.comment}</p>
                    </div>
                  ))}
                  {product.reviews.length === 0 && (
                    <p className="text-sm text-gray-400 dark:text-neutral-500 italic">No reviews yet. Be the first one!</p>
                  )}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-neutral-50 dark:bg-neutral-950/60 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800/80 space-y-4">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-200">{t.writeReview}</h4>

                  {reviewSuccess && (
                    <div className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 p-2.5 rounded-lg text-xs font-semibold">
                      {t.successMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. ফারহান চৌধুরী"
                        className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-lg p-2 bg-white dark:bg-neutral-905 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        {t.ratingLabel}
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-lg p-2 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800"
                      >
                        {[5, 4, 3, 2, 1].map((n) => (
                          <option key={n} value={n} className="bg-white dark:bg-neutral-900">
                            {n} ★
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                      {t.commentLabel}
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="e.g. কাপড়টা অনেক ভালো লেগেছে..."
                      className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-lg p-2 bg-white dark:bg-neutral-905 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2 rounded-lg bg-neutral-900 dark:bg-emerald-800 text-white font-bold text-xs hover:bg-neutral-800 dark:hover:bg-emerald-700 transition cursor-pointer"
                  >
                    {t.submitReview}
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
