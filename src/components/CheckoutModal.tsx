import React, { useState, useEffect } from "react";
import { X, CheckCircle, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { CartItem, Order, User as UserType } from "../types";
import { BANGLADESH_DISTRICTS } from "../data";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "bn" | "en";
  cartItems: CartItem[];
  discountPercent: number;
  couponCode: string;
  onPlaceOrder: (order: Order) => void;
  currentUser: UserType | null;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  language,
  cartItems,
  discountPercent,
  couponCode,
  onPlaceOrder,
  currentUser,
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka (ঢাকা)");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");

  // Mobile payment credentials
  const [walletNumber, setWalletNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  // Auto-fill details if user is logged in
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name || "");
      setPhone(currentUser.phone || "");
      setAddress(currentUser.address || "");
      if (currentUser.district) {
        setDistrict(currentUser.district);
      }
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  
  // Dynamic Delivery Charge: Dhaka is BDT 80, outside Dhaka is BDT 150
  const isDhaka = district.toLowerCase().includes("dhaka");
  const deliveryCharge = isDhaka ? 80 : 150;

  const total = subtotal - discountAmount + deliveryCharge;

  const formatPrice = (p: number) => {
    return language === "bn"
      ? `৳${p.toLocaleString("bn-BD")}`
      : `BDT ${p.toLocaleString()}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !district) return;

    const orderId = `BL-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();

    const newOrder: Order = {
      id: orderId,
      date: `${currentDate} ${currentTime}`,
      customerName,
      phone,
      address,
      district,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      items: cartItems.map((item) => ({
        productId: item.product.id,
        nameBn: item.product.nameBn,
        price: item.product.price,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
      })),
      subtotal,
      discount: discountAmount,
      deliveryCharge,
      total,
      status: "pending",
      statusTimeline: [
        { status: "pending", time: `${currentDate} ${currentTime}`, completed: true },
        { status: "confirmed", time: "", completed: false },
        { status: "shipped", time: "", completed: false },
        { status: "delivered", time: "", completed: false },
      ],
    };

    onPlaceOrder(newOrder);
    setOrderComplete(newOrder);
  };

  const t = {
    title: language === "bn" ? "অর্ডার চেকআউট" : "Order Checkout",
    infoSec: language === "bn" ? "১. শিপিং ও ডেলিভারি তথ্য" : "1. Shipping & Delivery Info",
    paySec: language === "bn" ? "২. পেমেন্ট পদ্ধতি নির্বাচন করুন" : "2. Choose Payment Method",
    summarySec: language === "bn" ? "৩. অর্ডার সারসংক্ষেপ" : "3. Order Summary",
    nameLabel: language === "bn" ? "আপনার পুরো নাম:" : "Full Name:",
    phoneLabel: language === "bn" ? "মোবাইল নম্বর (১১ ডিজিট):" : "Mobile Number (11 digits):",
    addressLabel: language === "bn" ? "সম্পূর্ণ ডেলিভারি ঠিকানা:" : "Detailed Delivery Address:",
    districtLabel: language === "bn" ? "জেলা নির্বাচন করুন:" : "Select District:",
    cod: language === "bn" ? "ক্যাশ অন ডেলিভারি (পণ্য পেয়ে টাকা দিন)" : "Cash On Delivery (COD)",
    bkash: language === "bn" ? "বিকাশ পেমেন্ট (bKash)" : "bKash Mobile Wallet",
    nagad: language === "bn" ? "নগদ পেমেন্ট (Nagad)" : "Nagad Mobile Wallet",
    walletNo: language === "bn" ? "বিকাশ/নগদ অ্যাকাউন্ট নম্বর:" : "Account Number:",
    txId: language === "bn" ? "ট্রানজেকশন আইডি (TxID):" : "Transaction ID (TxID):",
    subtotal: language === "bn" ? "পণ্যের মোট মূল্য:" : "Subtotal:",
    discount: language === "bn" ? "ডিসকাউন্ট ছাড়:" : "Discount Savings:",
    deliveryCharge: language === "bn" ? "ডেলিভারি চার্জ:" : "Delivery Charge:",
    grandTotal: language === "bn" ? "সর্বমোট পরিশোধযোগ্য বিল:" : "Grand Total Payable:",
    placeOrderBtn: language === "bn" ? "অর্ডার কনফার্ম করুন (৳)" : "Place Order & Confirm",
    successTitle: language === "bn" ? "আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!" : "Order Placed Successfully!",
    successText: language === "bn" ? "অভিনন্দন! আপনার অর্ডার আইডি সংরক্ষিত হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি কল করে কনফার্ম করবেন।" : "Congratulations! Your order has been registered. Our manager will call you shortly to confirm.",
    trackId: language === "bn" ? "অর্ডার ট্র্যাকিং আইডি:" : "Order Tracking ID:",
    closeSuccess: language === "bn" ? "কেনাকাটা চালিয়ে যান" : "Continue Shopping",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 text-gray-805 dark:text-neutral-100 rounded-2xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
          <span className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">{t.title}</span>
          {!orderComplete && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form or Success Block */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {orderComplete ? (
            /* Success screen state */
            <div className="max-w-md mx-auto text-center py-8 space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-450 rounded-full">
                <CheckCircle className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">
                  {t.successText}
                </p>
              </div>

              {/* Box Details */}
              <div className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-neutral-400">{t.trackId}</span>
                  <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">{orderComplete.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-neutral-400">গ্রাহক:</span>
                  <span className="font-medium text-gray-800 dark:text-neutral-200">{orderComplete.customerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-neutral-400">মোট মূল্য:</span>
                  <span className="font-bold text-gray-900 dark:text-neutral-100">{formatPrice(orderComplete.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-neutral-400">পদ্ধতি:</span>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300 uppercase">{orderComplete.paymentMethod}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setOrderComplete(null);
                }}
                className="px-8 py-3 bg-emerald-800 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 transition cursor-pointer w-full"
              >
                {t.closeSuccess}
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
              
              {/* Form Input fields - 7 cols */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Address Section */}
                <div className="space-y-4">
                  <h3 className="font-serif font-semibold text-base text-emerald-800 dark:text-emerald-455 border-b border-emerald-100 dark:border-neutral-800 pb-2">
                    {t.infoSec}
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        {t.nameLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="উদা: ওমর ফারুক"
                        className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-lg p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                          {t.phoneLabel} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{11}"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="উদা: 01712345678"
                          className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-lg p-3 bg-gray-50/50 dark:bg-neutral-955 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                          {t.districtLabel} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-lg p-3 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                        >
                          {BANGLADESH_DISTRICTS.map((dist) => (
                            <option key={dist} value={dist} className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100">
                              {dist}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                        {t.addressLabel} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="উদা: বাসা-১২, রোড-০৪, ধানমণ্ডি, ঢাকা"
                        className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-lg p-3 bg-gray-50/50 dark:bg-neutral-955 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Section */}
                <div className="space-y-4">
                  <h3 className="font-serif font-semibold text-base text-emerald-800 dark:text-emerald-455 border-b border-emerald-100 dark:border-neutral-800 pb-2">
                    {t.paySec}
                  </h3>

                  <div className="space-y-3">
                    {/* COD Option */}
                    <label className={`flex items-start space-x-3 p-3.5 border rounded-xl cursor-pointer transition ${
                      paymentMethod === "cod" ? "border-emerald-800 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20" : "border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-850"
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1 text-emerald-800 focus:ring-emerald-800"
                      />
                      <div>
                        <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{t.cod}</p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">অর্ডার করার পর ডেলিভারিম্যান যখন আপনার বাসায় পণ্যটি নিয়ে যাবে, তখন পণ্যটি দেখে টাকা পরিশোধ করবেন।</p>
                      </div>
                    </label>

                    {/* bKash Option */}
                    <label className={`flex items-start space-x-3 p-3.5 border rounded-xl cursor-pointer transition ${
                      paymentMethod === "bkash" ? "border-pink-600 dark:border-pink-500 bg-pink-50/20 dark:bg-pink-950/10" : "border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-850"
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bkash"}
                        onChange={() => setPaymentMethod("bkash")}
                        className="mt-1 text-pink-600 focus:ring-pink-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{t.bkash}</p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">আমাদের পার্সোনাল বিকাশ নম্বরে (01700-000000) সেন্ট মানি করুন।</p>
                      </div>
                    </label>

                    {/* Nagad Option */}
                    <label className={`flex items-start space-x-3 p-3.5 border rounded-xl cursor-pointer transition ${
                      paymentMethod === "nagad" ? "border-amber-600 dark:border-amber-500 bg-amber-50/20 dark:bg-amber-950/10" : "border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-850"
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "nagad"}
                        onChange={() => setPaymentMethod("nagad")}
                        className="mt-1 text-amber-600 focus:ring-amber-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{t.nagad}</p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">আমাদের পার্সোনাল নগদ নম্বরে (01800-000000) সেন্ট মানি করুন।</p>
                      </div>
                    </label>
                  </div>

                  {/* Transaction Inputs for bKash/Nagad */}
                  {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                    <div className="bg-gray-50 dark:bg-neutral-950 p-4 rounded-xl border border-gray-150 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top duration-200">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                          {t.walletNo} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={walletNumber}
                          onChange={(e) => setWalletNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="e.g. 01712XXXXXX"
                          className="w-full text-xs border border-gray-200 dark:border-neutral-800 rounded-lg p-2.5 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                          {t.txId} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. 9H8K2L5N"
                          className="w-full text-xs border border-gray-200 dark:border-neutral-800 rounded-lg p-2.5 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800"
                        />
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Order summary - 5 cols */}
              <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-5 h-fit">
                <h3 className="font-serif font-semibold text-sm text-neutral-900 dark:text-neutral-100 border-b border-gray-200 dark:border-neutral-800 pb-2">
                  {t.summarySec}
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs text-gray-700 dark:text-neutral-300">
                      <div className="flex-1 text-left line-clamp-1 pr-2">
                        <span>{language === "bn" ? item.product.nameBn : item.product.nameEn}</span>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider block">
                          সাইজ: {item.selectedSize} | রঙ: {item.selectedColor}
                        </span>
                      </div>
                      <span className="font-medium flex-shrink-0">
                        {item.quantity} x {formatPrice(item.product.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing values */}
                <div className="space-y-2.5 pt-3 border-t border-gray-200 dark:border-neutral-800 text-xs">
                  <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                    <span>{t.subtotal}</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                      <span>{t.discount} {couponCode && `(${couponCode})`}</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                    <span className="flex items-center space-x-1">
                      <Truck className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-500" />
                      <span>{t.deliveryCharge}</span>
                    </span>
                    <span className="font-mono">+{formatPrice(deliveryCharge)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm font-bold text-neutral-900 dark:text-neutral-100 pt-3 border-t border-dashed border-gray-200 dark:border-neutral-800">
                    <span>{t.grandTotal}</span>
                    <span className="font-mono text-base text-emerald-800 dark:text-emerald-400">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-700 transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-900/10"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.placeOrderBtn}</span>
                </button>

                {/* Assurances */}
                <div className="pt-2 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-center space-x-2 text-[11px] text-gray-400 dark:text-neutral-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>১০% পিওর অরগানিক কাপড় ও আসল চামড়া গ্যারান্টি</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );

}
