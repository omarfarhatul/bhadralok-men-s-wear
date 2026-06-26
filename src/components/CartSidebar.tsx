import React, { useState } from "react";
import { X, Trash2, Plus, Minus, Tag, Check, Sparkles } from "lucide-react";
import { CartItem } from "../types";
import { COUPONS } from "../data";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: "bn" | "en";
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  onProceedToCheckout: (appliedDiscountPercent: number, couponCode: string) => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  language,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartSidebarProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.percent) / 100) : 0;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    setCouponError("");
    const trimmed = couponCode.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === trimmed);

    if (found) {
      setAppliedCoupon({ code: found.code, percent: found.discountPercent });
      setCouponError("");
    } else {
      setCouponError(language === "bn" ? "ভুল কুপন কোড! আবার চেষ্টা করুন।" : "Invalid coupon! Please try again.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const formatPrice = (p: number) => {
    return language === "bn"
      ? `৳${p.toLocaleString("bn-BD")}`
      : `BDT ${p.toLocaleString()}`;
  };

  const t = {
    title: language === "bn" ? "শপিং ব্যাগ" : "Shopping Bag",
    empty: language === "bn" ? "আপনার শপিং ব্যাগটি খালি!" : "Your shopping bag is empty!",
    subtotal: language === "bn" ? "উপ-মোট:" : "Subtotal:",
    discount: language === "bn" ? "ডিসকাউন্ট:" : "Discount:",
    total: language === "bn" ? "সর্বমোট বিল:" : "Total Amount:",
    checkoutBtn: language === "bn" ? "অর্ডার সম্পন্ন করতে এগিয়ে যান" : "Proceed to Checkout",
    couponLabel: language === "bn" ? "ডিসকাউন্ট কুপন কোড:" : "Discount Coupon:",
    applyBtn: language === "bn" ? "প্রয়োগ করুন" : "Apply",
    removeBtn: language === "bn" ? "মুছুন" : "Remove",
    savedMsg: language === "bn" ? "ডিসকাউন্ট সেভড!" : "Discount Applied!",
    colorLabel: language === "bn" ? "রঙ:" : "Color:",
    sizeLabel: language === "bn" ? "সাইজ:" : "Size:",
    itemLabel: language === "bn" ? "টি পণ্য" : "items",
    checkoutSafe: language === "bn" ? "🔒 নিরাপদ এবং সিকিউর ক্যাশ অন ডেলিভারি" : "🔒 100% Safe Checkout",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      {/* Slide Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-900 flex flex-col shadow-2xl h-full border-l border-gray-100 dark:border-neutral-800">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">{t.title}</span>
              <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full font-sans">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex items-start space-x-4 p-3 border border-gray-100 dark:border-neutral-800/80 rounded-xl hover:border-gray-200 dark:hover:border-neutral-700 transition bg-white dark:bg-neutral-900/40"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 dark:bg-neutral-955 border border-gray-100 dark:border-neutral-800 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.nameEn} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1.5 text-left">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-neutral-100 line-clamp-1">
                    {language === "bn" ? item.product.nameBn : item.product.nameEn}
                  </h4>
                  
                  {/* Selection tags */}
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-wider">
                    <span className="bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                      {t.sizeLabel} {item.selectedSize}
                    </span>
                    <span className="bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                      {t.colorLabel} {item.selectedColor}
                    </span>
                  </div>

                  {/* Quantity adjustment & Price */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-gray-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-1 text-gray-500 dark:text-neutral-400 hover:bg-gray-55 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800 dark:text-neutral-200">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-1 text-gray-500 dark:text-neutral-400 hover:bg-gray-55 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-sm text-emerald-800 dark:text-emerald-400">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Remove Trash */}
                <button
                  onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                  className="p-1 text-gray-400 dark:text-neutral-500 hover:text-rose-600 dark:hover:text-rose-450 transition cursor-pointer"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="p-4 bg-gray-50 dark:bg-neutral-950 rounded-full text-gray-400 dark:text-neutral-600">
                  <X className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700 dark:text-neutral-300">{t.empty}</p>
                  <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">আমাদের কালেকশন থেকে পোশাক যোগ করুন</p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Checkout Block - Bottom */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-5">
              
              {/* Coupon inputs */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest text-left">
                  {t.couponLabel}
                </label>

                {!appliedCoupon ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g. BHADRA10, EIDMUBARAK"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-gray-805 dark:text-neutral-100 focus:outline-none focus:border-emerald-800 uppercase"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-neutral-900 dark:bg-neutral-800 text-white font-bold text-xs rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-700 transition cursor-pointer"
                    >
                      {t.applyBtn}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-400 px-3 py-2 rounded-lg text-xs font-bold">
                    <div className="flex items-center space-x-1">
                      <Check className="w-4 h-4" />
                      <span>
                        {appliedCoupon.code} - {appliedCoupon.percent}% {t.savedMsg}
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      {t.removeBtn}
                    </button>
                  </div>
                )}

                {couponError && <p className="text-[11px] text-rose-500 text-left font-semibold">{couponError}</p>}
              </div>

              {/* Price Details */}
              <div className="space-y-2.5 pt-3 border-t border-gray-200/50 dark:border-neutral-800 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>{t.subtotal}</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center space-x-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{t.discount}</span>
                    </span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-neutral-900 dark:text-neutral-100 pt-2 border-t border-dashed border-gray-200 dark:border-neutral-800">
                  <span>{t.total}</span>
                  <span className="font-mono text-emerald-800 dark:text-emerald-400">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-3">
                <button
                  onClick={() => onProceedToCheckout(appliedCoupon?.percent || 0, appliedCoupon?.code || "")}
                  className="w-full py-4 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/15 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.checkoutBtn}</span>
                </button>
                <p className="text-[11px] text-gray-400 dark:text-neutral-500 text-center font-medium">
                  {t.checkoutSafe}
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
