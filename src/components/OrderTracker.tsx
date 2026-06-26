import React, { useState } from "react";
import { X, Search, CheckCircle2, Circle, Truck, Clock, PackageCheck, ClipboardCheck } from "lucide-react";
import { Order } from "../types";

interface OrderTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  language: "bn" | "en";
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: "pending" | "confirmed" | "shipped" | "delivered") => void;
}

export default function OrderTracker({
  isOpen,
  onClose,
  language,
  orders,
  onUpdateOrderStatus,
}: OrderTrackerProps) {
  const [searchId, setSearchId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState("");

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSelectedOrder(null);

    const found = orders.find((o) => o.id.trim().toUpperCase() === searchId.trim().toUpperCase());

    if (found) {
      setSelectedOrder(found);
    } else {
      setSearchError(
        language === "bn"
          ? "দুঃখিত, এই আইডি দিয়ে কোনো অর্ডার খুঁজে পাওয়া যায়নি। সঠিক আইডিটি দিন।"
          : "Sorry, no order found with this tracking ID. Please try again."
      );
    }
  };

  const formatPrice = (p: number) => {
    return language === "bn"
      ? `৳${p.toLocaleString("bn-BD")}`
      : `BDT ${p.toLocaleString()}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "confirmed":
        return <ClipboardCheck className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-indigo-500" />;
      case "delivered":
        return <PackageCheck className="w-5 h-5 text-emerald-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getStatusText = (status: string) => {
    if (language === "bn") {
      switch (status) {
        case "pending": return "যাচাই করা হচ্ছে (Pending)";
        case "confirmed": return "অর্ডার কনফার্ম হয়েছে (Confirmed)";
        case "shipped": return "শিপমেন্টে পাঠানো হয়েছে (Shipped)";
        case "delivered": return "ডেলিভারি সম্পন্ন (Delivered)";
        default: return "অজানা";
      }
    } else {
      switch (status) {
        case "pending": return "Order Pending Verification";
        case "confirmed": return "Order Confirmed & Prepared";
        case "shipped": return "Out for Delivery / Shipped";
        case "delivered": return "Delivered Successfully";
        default: return "Unknown";
      }
    }
  };

  const t = {
    title: language === "bn" ? "অর্ডার ট্র্যাকিং ও ইতিহাস" : "Order Tracking & History",
    searchPlaceholder: language === "bn" ? "আপনার ৬ সংখ্যার অর্ডার আইডি লিখুন (যেমন: BL-123456)..." : "Enter 6-digit Order ID (e.g. BL-123456)...",
    searchBtn: language === "bn" ? "খুঁজুন" : "Track Order",
    recentOrders: language === "bn" ? "আপনার সাম্প্রতিক অর্ডারের তালিকা:" : "Your Recent Orders List:",
    clickToTrack: language === "bn" ? "ট্র্যাক করতে অর্ডারের ওপর ক্লিক করুন" : "Click on any order to track its status",
    empty: language === "bn" ? "আপনি এখনও কোনো অর্ডার করেননি।" : "You haven't placed any orders yet.",
    detailsTitle: language === "bn" ? "অর্ডার বিবরণী:" : "Order Details:",
    date: language === "bn" ? "অর্ডারের তারিখ:" : "Order Date:",
    name: language === "bn" ? "গ্রাহকের নাম:" : "Customer Name:",
    phone: language === "bn" ? "মোবাইল নম্বর:" : "Mobile:",
    address: language === "bn" ? "ডেলিভারি ঠিকানা:" : "Delivery Address:",
    payment: language === "bn" ? "পেমেন্ট পদ্ধতি:" : "Payment Method:",
    total: language === "bn" ? "মোট পরিশোধিত মূল্য:" : "Total Paid Amount:",
    timelineTitle: language === "bn" ? "ডেলিভারি টাইমলাইন ট্র্যাকার:" : "Real-time Delivery Timeline Tracker:",
    adminSimTitle: language === "bn" ? "⚙️ অ্যাডমিন সিমুলেশন কন্ট্রোল (টেস্টিং উদ্দেশ্যে):" : "⚙️ Admin Simulation Control (Testing only):",
    updateStatusBtn: language === "bn" ? "অর্ডারের বর্তমান অবস্থা পরিবর্তন করুন" : "Simulate Next Status Transition",
  };

  const statuses: ("pending" | "confirmed" | "shipped" | "delivered")[] = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
  ];

  const handleSimulateNextStatus = () => {
    if (!selectedOrder) return;
    const currentIndex = statuses.indexOf(selectedOrder.status);
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1];
      onUpdateOrderStatus(selectedOrder.id, nextStatus);
      // Refresh current selected order ref with updated status
      const updatedOrder = orders.find((o) => o.id === selectedOrder.id);
      if (updatedOrder) {
        setSelectedOrder({
          ...updatedOrder,
          status: nextStatus,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 rounded-2xl w-full max-w-3xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
          <span className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">{t.title}</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              required
              placeholder={t.searchPlaceholder}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 border border-gray-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm bg-white dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800 dark:focus:border-emerald-650 uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-neutral-900 dark:bg-neutral-850 hover:bg-neutral-800 dark:hover:bg-neutral-750 text-white font-bold text-xs rounded-xl flex items-center space-x-2 transition cursor-pointer border dark:border-neutral-700"
            >
              <Search className="w-4 h-4" />
              <span>{t.searchBtn}</span>
            </button>
          </form>

          {searchError && (
            <p className="text-xs font-semibold text-rose-500 dark:text-rose-450 bg-rose-50 dark:bg-rose-950/20 p-3 rounded-lg text-left border dark:border-rose-900/40">
              {searchError}
            </p>
          )}

          {/* Searched Order View details */}
          {selectedOrder ? (
            <div className="space-y-6 text-left border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/10 dark:bg-emerald-950/5 p-5 sm:p-6 rounded-2xl animate-in fade-in duration-200">
              
              {/* Main Summary block */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-wider">অর্ডার আইডি:</span>
                  <h3 className="font-mono text-xl font-bold text-emerald-800 dark:text-emerald-450">{selectedOrder.id}</h3>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-wider">বর্তমান অবস্থা:</span>
                  <div className="flex items-center space-x-2 mt-0.5 font-bold text-sm text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 px-3 py-1.5 rounded-lg">
                    {getStatusIcon(selectedOrder.status)}
                    <span>{getStatusText(selectedOrder.status)}</span>
                  </div>
                </div>
              </div>

              {/* District & Shipping Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">{t.name}</p>
                  <p className="font-bold text-sm text-gray-800 dark:text-neutral-200 mt-1">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">{t.phone}</p>
                  <p className="font-bold text-sm text-gray-800 dark:text-neutral-200 mt-1">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">{t.date}</p>
                  <p className="font-semibold text-gray-700 dark:text-neutral-300 mt-1">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">{t.payment}</p>
                  <p className="font-bold text-gray-800 dark:text-neutral-200 mt-1 uppercase">{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">{t.address}</p>
                  <p className="font-medium text-gray-700 dark:text-neutral-300 mt-1">{selectedOrder.address}, {selectedOrder.district}</p>
                </div>
              </div>

              {/* Items List inside tracking */}
              <div className="border-t border-gray-100 dark:border-neutral-800 pt-4 space-y-2">
                <p className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-2">ক্রয়কৃত পণ্যের তালিকা:</p>
                {selectedOrder.items.map((it, index) => (
                  <div key={index} className="flex justify-between items-center text-xs text-neutral-800 dark:text-neutral-200 py-2 bg-white dark:bg-neutral-950 px-3 rounded-lg border border-gray-100 dark:border-neutral-800">
                    <span className="font-medium">{it.nameBn} <span className="text-gray-400 dark:text-neutral-500">({it.size} | {it.color})</span></span>
                    <span className="font-mono font-bold">{it.quantity} x {formatPrice(it.price)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs font-bold text-emerald-800 dark:text-emerald-450 pt-2 text-right">
                  <span>সর্বমোট বিল:</span>
                  <span className="text-sm font-mono">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Delivery Timeline graphic display */}
              <div className="border-t border-gray-100 dark:border-neutral-800 pt-5 space-y-4">
                <p className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">{t.timelineTitle}</p>
                
                <div className="grid grid-cols-4 gap-2 relative">
                  {/* Gray background line joining icons */}
                  <div className="absolute top-4 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200 dark:bg-neutral-800 -z-10"></div>
                  {/* Dynamic green progress line */}
                  <div
                    className="absolute top-4 left-[12.5%] h-0.5 bg-emerald-600 -z-10 transition-all duration-500"
                    style={{
                      width:
                        selectedOrder.status === "pending"
                          ? "0%"
                          : selectedOrder.status === "confirmed"
                          ? "33%"
                          : selectedOrder.status === "shipped"
                          ? "66%"
                          : "75%",
                    }}
                  ></div>

                  {statuses.map((st, i) => {
                    const orderStatusIndex = statuses.indexOf(selectedOrder.status);
                    const isPassed = i <= orderStatusIndex;
                    const isCurrent = st === selectedOrder.status;

                    return (
                      <div key={st} className="flex flex-col items-center text-center space-y-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          isCurrent
                            ? "bg-emerald-800 border-emerald-800 text-white scale-110 shadow-md ring-4 ring-emerald-800/20"
                            : isPassed
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-white dark:bg-neutral-950 border-gray-200 dark:border-neutral-800 text-gray-300 dark:text-neutral-600"
                        }`}>
                          {isPassed ? <CheckCircle2 className="w-4.5 h-4.5" /> : <Circle className="w-4.5 h-4.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <p className={`text-[10px] font-bold uppercase ${isPassed ? "text-emerald-800 dark:text-emerald-400" : "text-gray-400 dark:text-neutral-500"}`}>
                            {st === "pending" ? "Placed" : st === "confirmed" ? "Confirmed" : st === "shipped" ? "Shipped" : "Delivered"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TESTING SIMULATOR BUTTON (Allows user to play with status changes) */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-xl space-y-2">
                <p className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                  <span>{t.adminSimTitle}</span>
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <p className="text-xs text-amber-900 dark:text-amber-300 font-medium">ডেলিভারি পর্যায় পরিবর্তন টেস্ট করতে ডানপাশের বোতামটি টিপুন।</p>
                  <button
                    type="button"
                    disabled={selectedOrder.status === "delivered"}
                    onClick={handleSimulateNextStatus}
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-700 disabled:bg-gray-200 dark:disabled:bg-neutral-800 disabled:text-gray-400 dark:disabled:text-neutral-600 text-white font-bold text-xs rounded-lg transition cursor-pointer flex-shrink-0"
                  >
                    {t.updateStatusBtn}
                  </button>
                </div>
              </div>

            </div>
          ) : null}

          {/* List of Recent Orders to click */}
          <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <h3 className="font-semibold text-sm text-gray-800 dark:text-neutral-200 text-left">{t.recentOrders}</h3>
            <p className="text-xs text-gray-400 dark:text-neutral-500 text-left">{t.clickToTrack}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setSelectedOrder(o);
                    setSearchId(o.id);
                  }}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                    selectedOrder?.id === o.id
                      ? "border-emerald-800 dark:border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/10"
                      : "border-gray-100 dark:border-neutral-850 bg-gray-50/50 dark:bg-neutral-950 hover:bg-gray-100 dark:hover:bg-neutral-850"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-450">{o.id}</span>
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-neutral-450">{o.customerName} | {o.date.split(" ")[0]}</p>
                  </div>
                  <span className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-850 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {o.status}
                  </span>
                </button>
              ))}

              {orders.length === 0 && (
                <div className="sm:col-span-2 py-6 text-center text-xs text-gray-400 dark:text-neutral-500 italic">
                  {t.empty}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
