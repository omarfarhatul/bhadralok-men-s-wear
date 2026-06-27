import React, { useState, useEffect } from "react";
import { Sparkles, ShoppingBag, Heart, ShieldCheck, ChevronRight, MessageSquare, Star, ArrowUpRight, HelpCircle, X } from "lucide-react";
import { Product, CartItem, Order, Review, User as UserType } from "./types";
import { PRODUCTS } from "./data";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import AiStylist from "./components/AiStylist";
import OrderTracker from "./components/OrderTracker";
import AuthModal from "./components/AuthModal";

export default function App() {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dark mode state and persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("bhadralok_dark_mode");
      return saved === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("bhadralok_dark_mode", String(darkMode));
  }, [darkMode]);

  // Storage / Persistence in Local State
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]); // product IDs
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals / Drawer toggles
  const [activeProductDetails, setActiveProductDetails] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [footerInfoModal, setFooterInfoModal] = useState<{ title: string; content: React.ReactNode } | null>(null);

  // User authentication states
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Checkout arguments
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutCouponCode, setCheckoutCouponCode] = useState("");

  // Load persistence if available (Standard client-side persistence is great for prototypes)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("bhadralok_cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("bhadralok_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("bhadralok_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUser = localStorage.getItem("bhadralok_current_user");
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Localstorage load error:", e);
    }
  }, []);

  // Save cart changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("bhadralok_cart", JSON.stringify(items));
  };

  const handleAuthSuccess = (user: UserType) => {
    setCurrentUser(user);
    localStorage.setItem("bhadralok_current_user", JSON.stringify(user));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("bhadralok_current_user");
  };

  // Save wishlist changes
  const saveWishlist = (list: string[]) => {
    setWishlist(list);
    localStorage.setItem("bhadralok_wishlist", JSON.stringify(list));
  };

  // Save orders changes
  const saveOrders = (list: Order[]) => {
    setOrders(list);
    localStorage.setItem("bhadralok_orders", JSON.stringify(list));
  };

  // Add review to products list
  const handleAddReview = (productId: string, review: Review) => {
    const updated = productsList.map((prod) => {
      if (prod.id === productId) {
        const nextReviews = [review, ...prod.reviews];
        // Re-calculate rating
        const sum = nextReviews.reduce((acc, r) => acc + r.rating, 0);
        const avg = Number((sum / nextReviews.length).toFixed(1));
        return {
          ...prod,
          reviews: nextReviews,
          rating: avg,
        };
      }
      return prod;
    });
    setProductsList(updated);
    // Update active details modal if currently viewing
    if (activeProductDetails && activeProductDetails.id === productId) {
      const updatedDetails = updated.find((p) => p.id === productId);
      if (updatedDetails) setActiveProductDetails(updatedDetails);
    }
  };

  // Add / Remove from Wishlist
  const handleToggleWishlist = (product: Product) => {
    if (wishlist.includes(product.id)) {
      const next = wishlist.filter((id) => id !== product.id);
      saveWishlist(next);
    } else {
      const next = [...wishlist, product.id];
      saveWishlist(next);
    }
  };

  // Add to Shopping bag
  const handleAddToCart = (product: Product, quantity: number, size: string, color: string) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (existingIndex > -1) {
      const next = [...cartItems];
      next[existingIndex].quantity += quantity;
      saveCart(next);
    } else {
      const next = [...cartItems, { product, quantity, selectedSize: size, selectedColor: color }];
      saveCart(next);
    }
    // Automatically trigger visual feedback (e.g. open cart sidebar so they see it)
    setIsCartOpen(true);
  };

  // Update Cart quantities
  const handleUpdateCartQuantity = (productId: string, size: string, color: string, nextQuantity: number) => {
    if (nextQuantity < 1) {
      handleRemoveFromCart(productId, size, color);
      return;
    }
    const next = cartItems.map((item) => {
      if (
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
      ) {
        return { ...item, quantity: nextQuantity };
      }
      return item;
    });
    saveCart(next);
  };

  // Remove single item from cart
  const handleRemoveFromCart = (productId: string, size: string, color: string) => {
    const next = cartItems.filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
        )
    );
    saveCart(next);
  };

  // Proceed checkout helper
  const handleProceedToCheckout = (appliedDiscount: number, couponCode: string) => {
    setCheckoutDiscount(appliedDiscount);
    setCheckoutCouponCode(couponCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Place order
  const handlePlaceOrder = (newOrder: Order) => {
    const next = [newOrder, ...orders];
    saveOrders(next);
    // Clear Shopping cart upon successful order registration
    saveCart([]);
  };

  // Update order status timeline (Used by simulation)
  const handleUpdateOrderStatus = (orderId: string, nextStatus: "pending" | "confirmed" | "shipped" | "delivered") => {
    const next = orders.map((o) => {
      if (o.id === orderId) {
        const updatedTimeline = o.statusTimeline.map((item) => {
          if (item.status === nextStatus) {
            return { ...item, time: new Date().toLocaleString(), completed: true };
          }
          // Also mark any intermediate statuses as completed
          const indexMap = ["pending", "confirmed", "shipped", "delivered"];
          const itemIndex = indexMap.indexOf(item.status);
          const nextIndex = indexMap.indexOf(nextStatus);
          if (itemIndex < nextIndex) {
            return { ...item, completed: true };
          }
          return item;
        });

        return {
          ...o,
          status: nextStatus,
          statusTimeline: updatedTimeline,
        };
      }
      return o;
    });
    saveOrders(next);
  };

  // Quick add - choosing default sizes/colors to prevent blocker
  const handleQuickAdd = (product: Product) => {
    const defSize = product.sizes[0] || "M";
    const defColor = product.colors[0]?.name || "Default";
    handleAddToCart(product, 1, defSize, defColor);
  };

  const openFooterInfo = (key: string) => {
    let title = "";
    let content: React.ReactNode = null;

    if (key === "about") {
      title = language === "bn" ? "আমাদের সম্পর্কে" : "About Us";
      content = (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "'ভদ্রলোক' একটি আভিজাত্যপূর্ণ ও প্রিমিয়াম লাইফস্টাইল ব্র্যান্ড, যা বাঙালির ঐতিহ্যবাহী পোশাকের সাথে আধুনিক ট্রেইলরিংয়ের মেলবন্ধন ঘটায়।" 
              : "Bhadralok is a premium lifestyle clothing brand in Bangladesh, dedicated to weaving traditional subcontinental clothing with modern European fits."}
          </p>
          <p>
            {language === "bn" 
              ? "আমাদের উদ্দেশ্য প্রতিটি কারিগরি সুতো এবং সূক্ষ্ম ফিনিশিংয়ের মাধ্যমে গ্রাহকের আত্মবিশ্বাস ও ব্যক্তিত্বকে শতভাগ ফুটিয়ে তোলা। আমরা কঠোর কোয়ালিটি কন্ট্রোল বজায় রাখি।" 
              : "We take immense pride in our quality control, meticulous fabric selections, and ergonomic stitching pattern to help you feel royal and comfortable."}
          </p>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-400">
            <strong>{language === "bn" ? "ভদ্রলোক আভিজাত্য:" : "Bhadralok Heritage:"}</strong>{" "}
            {language === "bn" ? "১০০% খাঁটি সুতা ও দেশীয় কারিগর দ্বারা প্রস্তুত পোশাক।" : "Crafted with 100% fine cotton khadi, linen, and pure leather."}
          </div>
        </div>
      );
    } else if (key === "career") {
      title = language === "bn" ? "ক্যারিয়ার (আমাদের সাথে কাজ করুন)" : "Career Opportunities";
      content = (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "আপনি কি ফ্যাশন বা আধুনিক ডিজাইনিং নিয়ে স্বপ্ন দেখেন? ভদ্রলোক পরিবারে আপনাকে স্বাগতম!" 
              : "Are you passionate about premium men's clothing and sustainable fashion? Join the Bhadralok family!"}
          </p>
          <p>
            {language === "bn" 
              ? "আমরা ফ্যাশন ডিজাইনার, প্রোডাক্ট মার্চেন্ডাইজার, ডিজিটাল মার্কেটার ও কাস্টমার রিলেশনস পজিশনে লোক নিচ্ছি।" 
              : "We currently have open opportunities in fashion design, digital marketing, store operations, and client relations."}
          </p>
          <div className="bg-gray-50 dark:bg-neutral-950 p-4 rounded-xl border border-gray-100 dark:border-neutral-800">
            <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200 uppercase block mb-1">{language === "bn" ? "আবেদন করুন:" : "How to Apply:"}</span>
            <p className="text-xs text-gray-500 dark:text-neutral-400">
              {language === "bn" ? "আপনার সিভি মেল করুন:" : "Drop your resume at:"}{" "}
              <strong className="text-emerald-800 dark:text-emerald-400 font-bold">career@bhadralok.com</strong>
            </p>
          </div>
        </div>
      );
    } else if (key === "contact") {
      title = language === "bn" ? "যোগাযোগ ও ঠিকানা" : "Contact Us";
      content = (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{language === "bn" ? "সরাসরি যোগাযোগ করুন:" : "Reach Out to Us:"}</p>
          <ul className="space-y-2.5">
            <li className="flex items-center space-x-2.5 text-xs text-gray-600 dark:text-neutral-350">
              <span className="w-5 h-5 bg-emerald-100 dark:bg-emerald-950/45 text-emerald-800 dark:text-emerald-400 rounded-full flex items-center justify-center text-[10px] font-bold">☏</span>
              <span><strong>{language === "bn" ? "হটলাইন:" : "Hotline:"}</strong> 09613-800800 ({language === "bn" ? "সকাল ৯ টা - রাত ১০ টা" : "9 AM - 10 PM"})</span>
            </li>
            <li className="flex items-center space-x-2.5 text-xs text-gray-600 dark:text-neutral-350">
              <span className="w-5 h-5 bg-emerald-100 dark:bg-emerald-950/45 text-emerald-800 dark:text-emerald-400 rounded-full flex items-center justify-center text-[10px] font-bold">@</span>
              <span><strong>{language === "bn" ? "ইমেইল:" : "Email:"}</strong> support@bhadralok.com</span>
            </li>
            <li className="flex items-center space-x-2.5 text-xs text-gray-600 dark:text-neutral-350">
              <span className="w-5 h-5 bg-emerald-100 dark:bg-emerald-950/45 text-emerald-800 dark:text-emerald-400 rounded-full flex items-center justify-center text-[10px] font-bold">⌖</span>
              <span><strong>{language === "bn" ? "হেড অফিস:" : "Head Office:"}</strong> {language === "bn" ? "বাড়ি-১২, রোড-০৪, ধানমণ্ডি আর/এ, ঢাকা, বাংলাদেশ।" : "House-12, Road-04, Dhanmondi R/A, Dhaka, Bangladesh."}</span>
            </li>
          </ul>
        </div>
      );
    } else if (key === "privacy") {
      title = language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy";
      content = (
        <div className="space-y-3 text-xs text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "ভদ্রলোক ডটকম তার গ্রাহকদের ডেটা সুরক্ষায় প্রতিশ্রুতিবদ্ধ। আপনার নাম, মোবাইল নম্বর, ইমেইল এবং ঠিকানা সম্পূর্ণ এনক্রিপ্ট করে সুরক্ষিত রাখা হয়।" 
              : "Bhadralok.com is committed to safeguarding client details. Your purchase records, name, address, and mobile number are heavily encrypted and saved securely."}
          </p>
          <p>
            {language === "bn" 
              ? "১. আমরা কখনোই কোনো ব্যক্তিগত তথ্য বা ট্রানজেকশন ডেটা তৃতীয় কোনো বাণিজ্যিক পক্ষ বা বিজ্ঞাপনী নেটওয়ার্কের সাথে শেয়ার করি না।" 
              : "1. We never sell, rent, or lease your personally identifiable records to third-party marketing companies."}
          </p>
          <p>
            {language === "bn" 
              ? "২. কুকিজ শুধুমাত্র আপনার শপিং কার্ট এবং লগইন সেশন সচল রাখার জন্য ব্যবহৃত হয়।" 
              : "2. Browser cookies are strictly applied for holding your shopping basket state and authorization preferences."}
          </p>
        </div>
      );
    } else if (key === "certified") {
      title = language === "bn" ? "ভদ্রলোক সার্টিফাইড গ্যারান্টি" : "Bhadralok Certified Apparel";
      content = (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "'ভদ্রলোক সার্টিফাইড' লোগোযুক্ত প্রতিটি ড্রেস আমাদের কারখানায় ৫টি কঠোর ধাপের পর ছাড়পত্র পায়।" 
              : "Any apparel with our signature 'Bhadralok Certified' stamp passes through a strict five-point quality control loop before shipping."}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>{language === "bn" ? "ফ্যাব্রিক শ্রিনকেজ টেস্ট (কাপড় কুঁচকে যাওয়া প্রতিরোধ)" : "Pre-shrunk fabric analysis"}</li>
            <li>{language === "bn" ? "কালার ব্লিডিং রেজিস্ট্যান্স (রং ওঠার গ্যারান্টি)" : "100% Color bleeding testing"}</li>
            <li>{language === "bn" ? "ডাবল নিডল সিম স্টিচিং (মজবুত সেলাই)" : "Double needle reinforced lock-stitch"}</li>
            <li>{language === "bn" ? "প্রিমিয়াম বাটন প্লেসমেন্ট ও ফিটিংস" : "Hand-sewn custom brass buttons"}</li>
          </ul>
        </div>
      );
    } else if (key === "terms") {
      title = language === "bn" ? "ব্যবহারের শর্তাবলী" : "Terms & Conditions";
      content = (
        <div className="space-y-3 text-xs text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "আমাদের ওয়েবসাইট ভিজিট বা পোশাক ক্রয়ের মাধ্যমে আপনি নিচের শর্তাবলীতে সম্মত হচ্ছেন:" 
              : "By using our platform and ordering outfits, you agree to comply with our commercial terms:"}
          </p>
          <p>
            {language === "bn" 
              ? "১. অর্ডারের সত্যতা যাচাইয়ের জন্য আমাদের কাস্টমার প্রতিনিধি আপনার নম্বরে কল দিতে পারেন।" 
              : "1. We may call your phone number to verify cash-on-delivery orders before processing."}
          </p>
          <p>
            {language === "bn" 
              ? "২. দাম এবং প্রমোশন অফার যেকোনো সময় স্টকের লভ্যতার ওপর ভিত্তি করে পরিবর্তিত হতে পারে।" 
              : "2. Product prices and discount coupons might change based on availability and stock limits."}
          </p>
          <p>
            {language === "bn" 
              ? "৩. Delivery এর পর গ্রাহক ড্রেসটি খুলে ট্রায়াল দিয়ে দেখতে পারেন (কুরিয়ার প্রতিনিধির উপস্থিতিতে)।" 
              : "3. Customers can unbox and verify sizing in front of the courier agent upon cash on delivery."}
          </p>
        </div>
      );
    } else if (key === "delivery") {
      title = language === "bn" ? "একই দিনে ও দ্রুত ডেলিভারি পলিসি" : "Next/Same-Day Delivery Policy";
      content = (
        <div className="space-y-3 text-xs text-gray-600 leading-relaxed text-left">
          <p className="font-bold text-neutral-900 dark:text-neutral-100">{language === "bn" ? "ডেলিভারি সময়সীমা:" : "Estimated Lead Times:"}</p>
          <div className="grid grid-cols-2 gap-3 bg-gray-50 dark:bg-neutral-950 p-3 rounded-xl border border-gray-100 dark:border-neutral-800">
            <div>
              <p className="font-bold text-emerald-800 dark:text-emerald-400 text-xs">{language === "bn" ? "ঢাকা সিটি মেট্রো" : "Dhaka City"}</p>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400">{language === "bn" ? "১২ - ২৪ ঘণ্টা (১২০ টাকা)" : "12 - 24 Hours (120 BDT)"}</p>
            </div>
            <div>
              <p className="font-bold text-emerald-800 dark:text-emerald-400 text-xs">{language === "bn" ? "ঢাকার বাইরে (সমগ্র বাংলাদেশ)" : "Outside Dhaka"}</p>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400">{language === "bn" ? "২ - ৩ দিন (১৫০ টাকা)" : "2 - 3 Days (150 BDT)"}</p>
            </div>
          </div>
          <p>
            {language === "bn" 
              ? "সকাল ১০টার পূর্বে ঢাকা মেট্রোর ভেতর কনফার্মকৃত অর্ডারসমূহ একই দিনে বিকেল বা সন্ধ্যার মধ্যে ডেলিভারি সম্পন্ন করার জন্য আমরা সর্বোচ্চ চেষ্টা করি।" 
              : "Orders finalized inside Dhaka Metropolitan areas before 10 AM qualify for same-day delivery by dusk."}
          </p>
        </div>
      );
    } else if (key === "payment") {
      title = language === "bn" ? "নিরাপদ মূল্য পরিশোধ পদ্ধতি" : "Payment Methods & Safety";
      content = (
        <div className="space-y-3 text-sm text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "আমরা ডিজিটাল এবং অফলাইন উভয় পেমেন্ট অত্যন্ত গুরুত্ব ও নিরাপত্তার সাথে সাপোর্ট করি।" 
              : "We prioritize complete payment encryption. We accept multiple modes of payment."}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong>{language === "bn" ? "ক্যাশ অন ডেলিভারি (COD):" : "Cash on Delivery:"}</strong> {language === "bn" ? "পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।" : "Pay our delivery partner in cash once you get the parcel."}</li>
            <li><strong>{language === "bn" ? "মোবাইল ব্যাংকিং:" : "Mobile Financial Services:"}</strong> bKash (বিকাশ) & Nagad (নগদ)</li>
            <li><strong>{language === "bn" ? "কার্ড পেমেন্ট:" : "Debit & Credit Cards:"}</strong> Visa, MasterCard, American Express ({language === "bn" ? "১২৮-বিট এনক্রিপশন প্রোটোকল" : "Protected by 128-bit SSL secured payment gateway"}).</li>
          </ul>
        </div>
      );
    } else if (key === "support") {
      title = language === "bn" ? "গ্রাহক সহায়তা ও সাপোর্ট" : "Customer Support Center";
      content = (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "ভরের পোশাক নিয়ে কোনো প্রশ্ন বা পরামর্শ আছে? আমাদের সাপোর্ট টিম সবসময় প্রস্তুত।" 
              : "Got any questions regarding stitching or fabrics? Our Support Specialists are here to guide you."}
          </p>
          <p className="text-xs">
            {language === "bn" 
              ? "অর্ডার বাতিল, সাইজ পরিবর্তন, অথবা পণ্য এক্সচেঞ্জের জন্য সরাসরি সকাল ৯টা থেকে রাত ১০টার মধ্যে কল করুন হটলাইন নম্বরে বা ইমেইল করুন।" 
              : "For immediate order modifications, returns, or replacement requests, please dial our helpline or use our direct email channels."}
          </p>
          <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl border border-emerald-100 text-xs font-bold text-center">
            {language === "bn" ? "হটলাইন নম্বর: ০৯৬১৩-৮০০৮০০" : "Direct Helpline: 09613-800800"}
          </div>
        </div>
      );
    } else if (key === "howtoshoppe") {
      title = language === "bn" ? "কিভাবে অর্ডার সম্পন্ন করবেন?" : "How to Shop on Bhadralok";
      content = (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
          <div className="space-y-3">
            <div className="flex items-start space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">১</span>
              <div>
                <p className="font-bold text-xs text-neutral-900">{language === "bn" ? "পোশাক পছন্দ করুন" : "Pick Your Attire"}</p>
                <p className="text-xs text-gray-500">{language === "bn" ? "পাঞ্জাবি, কাবলি বা ব্লেজার পেজ থেকে আপনার পছন্দের মডেলটি সিলেক্ট করুন।" : "Browse our royal collections and tap on your chosen apparel."}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">২</span>
              <div>
                <p className="font-bold text-xs text-neutral-900">{language === "bn" ? "সাইজ ও কালার সিলেক্ট করুন" : "Select Size & Color"}</p>
                <p className="text-xs text-gray-500">{language === "bn" ? "আপনার মানানসই কলার সাইজ (উদা: ৪০, ৪২, ৪৪) ও রঙ সিলেক্ট করে কার্ট-এ যোগ করুন।" : "Ensure you check our size chart, select colors, and click Add to Bag."}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">৩</span>
              <div>
                <p className="font-bold text-xs text-neutral-900">{language === "bn" ? "চেকআউট ও অর্ডার কনফার্ম" : "Checkout and Complete"}</p>
                <p className="text-xs text-gray-500">{language === "bn" ? "ডেলিভারি ঠিকানা ও মোবাইল নম্বর প্রদান করে 'অর্ডার প্লেস করুন' বাটনে ক্লিক করুন!" : "Input your mobile, detailed address, apply discount coupon, and complete your order!"}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (key === "refund") {
      title = language === "bn" ? "রিটার্ন এবং রিফান্ড পলিসি" : "Return & Refund Policy";
      content = (
        <div className="space-y-3 text-xs text-gray-600 leading-relaxed text-left">
          <p>
            {language === "bn" 
              ? "আমরা বিশ্বাস করি ভদ্রলোকের কেনাকাটা হবে সম্পূর্ণ ঝুঁকিমুক্ত। তাই আমাদের রয়েছে সহজ ৩ দিনের রিটার্ন গ্যারান্টি।" 
              : "We offer an industry-leading 3-day hassle-free return and exchange policy for any sizing issue or fabrication fault."}
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>{language === "bn" ? "পোশাকের ট্যাগ অক্ষত থাকতে হবে এবং ব্যবহার করা যাবে না।" : "Apparel must remain unused, unwashed, and with all tags intact."}</li>
            <li>{language === "bn" ? "ঢাকার মধ্যে আমরা কুরিয়ারের মাধ্যমে ফ্রি সাইজ এক্সচেঞ্জ পিকআপ করে থাকি।" : "Inside Dhaka, we can arrange replacement delivery at your doorstep."}</li>
            <li>{language === "bn" ? "পণ্যের ত্রুটির ক্ষেত্রে শতভাগ রিফান্ড বা মূল্য ফেরত দেওয়া হয়।" : "In case of product defects, we issue 100% money refund to your bKash/Bank within 5 working days."}</li>
          </ul>
        </div>
      );
    }

    setFooterInfoModal({ title, content });
  };

  // Filter products by category tab & search input text
  const filteredProducts = productsList.filter((prod) => {
    const matchesCategory = selectedCategory === "all" || prod.category === selectedCategory;
    const matchesSearch =
      prod.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Bengali Translations
  const t = {
    featuresTitle: language === "bn" ? "ভদ্রলোক সিগনেচার স্পেশাল" : "Bhadralok Signature Specials",
    offerTitle: language === "bn" ? "সীমিত সময়ের অফারসমূহ:" : "Limited Time Exciting Promos:",
    offerSub: language === "bn" ? "আভিজাত্যপূর্ণ পোশাকের ওপর বিশেষ ছাড় উপভোগ করুন" : "Enjoy flat savings on our premium outfits",
    bestSeller: language === "bn" ? "সেরা বিক্রিত পোশাকসমূহ" : "Best Selling Royal Attires",
    bestSellerSub: language === "bn" ? "বাঙালি বাবুদের সবচেয়ে পছন্দের আভিজাত্যপূর্ণ পোশাক" : "Curated best-sellers selected by gentlemen",
    howWeCraft: language === "bn" ? "ভদ্রলোক যেভাবে আভিজাত্য বুনে তোলে" : "How We Weave Elegance",
    storyDesc: language === "bn" ? "ভদ্রলোক কেবল একটি ফ্যাশন ব্র্যান্ড নয়, এটি বাঙালির নিজস্ব ঐতিহ্য এবং আভিজাত্যের প্রতীক। আমরা সুতো থেকে শুরু করে প্রতিটি বোতামের ফিনিশিং নিখুঁতভাবে নজরদারি করি, যাতে আপনি প্রতিটি পরিধানে আত্মবিশ্বাস ও রাজকীয় আরাম অনুভব করেন।" : "Bhadralok is more than a fashion brand; it is a symbol of self-respect and cultural aristocracy. From selected cotton khadi fibers to precise Italian cutting patterns, every item is manufactured to give you outstanding personality and utmost comfort.",
    craft1Title: language === "bn" ? "খাঁটি দেশীয় খাদি সুতা" : "Pure Traditional Khadi Yarn",
    craft1Desc: language === "bn" ? "১০০% কটন খাদি ও মসলিন কাপড় ব্যবহারের ফলে গরমে অত্যন্ত আরামদায়ক অনুভূতি।" : "Ensures breathable flow on warm days, holding majestic textures.",
    craft2Title: language === "bn" ? "হাতে তৈরি প্রিমিয়াম চামড়া" : "Handcrafted Full-grain Leather",
    craft2Desc: language === "bn" ? "আমাদের লোফার ও অক্সফোর্ড জুতো আসল রপ্তানিযোগ্য চামড়া দিয়ে অভিজ্ঞ কারিগর দ্বারা তৈরি।" : "Finely hand-lasted penny loafers made with genuine cowhide.",
    craft3Title: language === "bn" ? "নিখুঁত ইতালিয়ান ট্রেইলরিং" : "Precision Italian Tailoring",
    craft3Desc: language === "bn" ? "ব্লেজার ও স্যুটের নিখুঁত কাঠামোর জন্য সুক্ষ শোল্ডার প্যাড ও প্যাটার্ন ফিটিংস।" : "Unstructured blazer linings that instantly update your silhouette.",
    aiInviteTitle: language === "bn" ? "পোশাকের সঠিক কম্বিনেশন নিয়ে চিন্তিত?" : "Confused About Styling Match?",
    aiInviteDesc: language === "bn" ? "আমাদের কৃত্রিম বুদ্ধিমত্তা চালিত 'ভদ্রলোক AI' স্টাইলিস্ট আপনার গায়ের রঙ ও বাজেট অনুযায়ী সঠিক পায়জামা, বেল্ট ও জুতো মিলিয়ে দেওয়ার জন্য তৈরি আছে।" : "Our deep-trained Gemini 'Bhadralok AI' personal stylist is online 24/7. Ask for the perfect pajama, matching belts or shoes customized for your budget.",
    aiInviteBtn: language === "bn" ? "এআই পার্সোনাল স্টাইলিস্টের সাথে কথা বলুন" : "Chat with AI Personal Stylist",
    testimonialsTitle: language === "bn" ? "ভদ্রলোক পরিবারের গ্রাহকদের রিভিউ" : "Feedbacks From Our Distinguished Customers",
    testi1Name: language === "bn" ? "মুস্তাফিজুর রহমান (ঢাকা)" : "Mustafizur Rahman (Dhaka)",
    testi1Comment: language === "bn" ? "পাঞ্জাবির কাটিংটা চমৎকার। আমি ঈদে কাবলি সেট আর লোফারটা নিয়েছিলাম, কাপড়ের মান এবং জুতোর ফিনিশিং রয়্যাল ক্লাসের মতো।" : "The cutting of the Kabli set and the brown leather loafers are absolute top-tier. Highly recommended!",
    testi2Name: language === "bn" ? "আহনাফ সাকিব (সিলেট)" : "Ahnaf Sakib (Sylhet)",
    testi2Comment: language === "bn" ? "এআই স্টাইলিস্টের পরামর্শ অনুযায়ী জলপাই রঙের পোলোর সাথে গ্যাবার্ডিন প্যান্ট কিনেছিলাম, কম্বিনেশনটা চমৎকার হয়েছে! ডেলিভারিও ২ দিনে সিলেট পেয়েছি।" : "The AI Stylist suggested matching the olive polo shirt with tan gabardine chinos. The combo looks perfect. Fast delivery!",
    footerAbout: language === "bn" ? "ভদ্রলোক সম্পর্কে" : "About Bhadralok",
    footerAboutDesc: language === "bn" ? "বাঙালির ঐতিহ্য ও আধুনিক ফ্যাশনের মেলবন্ধনে 'ভদ্রলোক' একটি প্রিমিয়াম লাইফস্টাইল ব্র্যান্ড। আমাদের লক্ষ্য প্রতিটি পোশাকে আভিজাত্য ফুটিয়ে তোলা।" : "Bhadralok is a premium Bangladeshi lifestyle brand aiming to express aristocrat heritage through modern tailoring.",
    footerHotline: language === "bn" ? "গ্রাহক সেবা ও হটলাইন:" : "Customer Care Helpline:",
    footerSecurity: language === "bn" ? "১০০% নিরাপদ ডেলিভারি ও পেমেন্ট পার্টনারস:" : "100% Safe Delivery & Payment Partners:",
    allRights: language === "bn" ? "© ২০২৬ ভদ্রলোক মেনস ফ্যাশন লিমিটেড। সর্বস্বত্ব সংরক্ষিত।" : "© 2026 Bhadralok Men's Wear Ltd. All Rights Reserved.",
    wishlistTitle: language === "bn" ? "আপনার ইচ্ছা তালিকা (Wishlist)" : "Distinguished Wishlist Items",
    wishlistEmpty: language === "bn" ? "ইচ্ছা তালিকা খালি! পছন্দের পণ্য সংরক্ষণ করতে হার্ট আইকনে ক্লিক করুন।" : "Your wishlist is empty. Add items to save for later.",
    noProductsFound: language === "bn" ? "দুঃখিত, আপনার খোঁজা পাঞ্জাবি বা পণ্যটি এই মুহূর্তে কালেকশনে পাওয়া যায়নি।" : "No apparel matches your query. Try another keyword.",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex flex-col font-sans text-gray-800 dark:text-neutral-100 transition-colors duration-300">
      
      {/* 1. Header & Navigation */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        openOrders={() => setIsOrdersOpen(true)}
        openAiStylist={() => setIsStylistOpen(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* 2. Hero Section Banner */}
      <HeroSection
        language={language}
        openAiStylist={() => setIsStylistOpen(true)}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 3. Limited promos & discount highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-left mb-6">
          <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">{t.offerTitle}</p>
          <h2 className="text-xl sm:text-2xl font-serif font-medium mt-1">{t.offerSub}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 rounded-2xl text-white text-left relative overflow-hidden shadow-md">
            <span className="bg-emerald-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">ঈদ ধামাকা</span>
            <h3 className="font-serif font-semibold text-lg sm:text-xl mt-3 leading-snug">ফ্ল্যাট ১৫% ডিসকাউন্ট ছাড়!</h3>
            <p className="text-xs text-emerald-200 mt-2 font-light">পাঞ্জাবি ও পায়জামা কম্বো অর্ডারে প্রযোজ্য। কোড: EIDMUBARAK</p>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <Sparkles className="w-32 h-32" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900 to-amber-950 p-6 rounded-2xl text-white text-left relative overflow-hidden shadow-md">
            <span className="bg-amber-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">লাক্সারি সুজ</span>
            <h3 className="font-serif font-semibold text-lg sm:text-xl mt-3 leading-snug">১০% ফ্ল্যাট ডিসকাউন্ট কোড!</h3>
            <p className="text-xs text-amber-200 mt-2 font-light">হাতে তৈরি জেনুইন লেদার পেনি লোফারে প্রযোজ্য। কোড: BHADRA10</p>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <ShoppingBag className="w-32 h-32" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-2xl text-white text-left relative overflow-hidden shadow-md">
            <span className="bg-neutral-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">ডেলিভারি অফার</span>
            <h3 className="font-serif font-semibold text-lg sm:text-xl mt-3 leading-snug">৫% বাড়তি ছাড় + ফ্রি শিপিং!</h3>
            <p className="text-xs text-neutral-400 mt-2 font-light">সব কালেকশন অর্ডারে ফ্রি শিপিং পেতে ব্যবহার করুন কোড: FREE99</p>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <Heart className="w-32 h-32" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products grid Catalog display */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-gray-100 dark:border-neutral-800 pb-5">
          <div className="text-left">
            <p className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">{t.bestSeller}</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-gray-900 dark:text-neutral-100 mt-1">
              {selectedCategory === "all" ? t.bestSellerSub : `${language === "bn" ? "সংগ্রহশালা" : "Collection"} • ${selectedCategory.toUpperCase()}`}
            </h2>
          </div>
          <span className="text-xs font-semibold text-gray-400 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-850 px-3 py-1.5 rounded-full font-mono">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {/* Catalog grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                language={language}
                isWishlisted={wishlist.includes(prod.id)}
                onViewDetails={(p) => setActiveProductDetails(p)}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
            <p className="text-gray-500 font-medium">{t.noProductsFound}</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              সব কালেকশন আবার দেখান
            </button>
          </div>
        )}
      </main>

      {/* 5. AI Stylist Invitation Interactive banner banner */}
      <section className="bg-neutral-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex p-3 bg-neutral-800 text-emerald-400 rounded-full animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            {t.aiInviteTitle}
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
            {t.aiInviteDesc}
          </p>
          <button
            onClick={() => setIsStylistOpen(true)}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950 transition cursor-pointer"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <span>{t.aiInviteBtn}</span>
          </button>
        </div>
      </section>

      {/* 6. Why Bhadralok - Brand Craftsmanship story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-neutral-800 p-2 bg-white dark:bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600"
                alt="Crafting men wear"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">About Our Brand Craftsmanship</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-neutral-100 leading-tight">
                {t.howWeCraft}
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                {t.storyDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
              <div className="space-y-1.5">
                <span className="font-serif font-bold text-lg text-emerald-800 dark:text-emerald-400">০১.</span>
                <h4 className="font-bold text-sm text-gray-900 dark:text-neutral-100">{t.craft1Title}</h4>
                <p className="text-xs text-gray-500 dark:text-neutral-400 font-light leading-relaxed">{t.craft1Desc}</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-serif font-bold text-lg text-emerald-800 dark:text-emerald-400">০২.</span>
                <h4 className="font-bold text-sm text-gray-900 dark:text-neutral-100">{t.craft2Title}</h4>
                <p className="text-xs text-gray-500 dark:text-neutral-400 font-light leading-relaxed">{t.craft2Desc}</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-serif font-bold text-lg text-emerald-800 dark:text-emerald-400">০৩.</span>
                <h4 className="font-bold text-sm text-gray-900 dark:text-neutral-100">{t.craft3Title}</h4>
                <p className="text-xs text-gray-500 dark:text-neutral-400 font-light leading-relaxed">{t.craft3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Review section */}
      <section className="bg-neutral-50 dark:bg-neutral-900/40 py-16 border-y border-gray-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Happy Gentlemen</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              {t.testimonialsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-4 shadow-xs">
              <div className="flex justify-between items-center">
                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{t.testi1Name}</p>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-light italic">
                "{t.testi1Comment}"
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-4 shadow-xs">
              <div className="flex justify-between items-center">
                <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{t.testi2Name}</p>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-light italic">
                "{t.testi2Comment}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Elegant Footer */}
      <footer className="bg-white dark:bg-neutral-900 text-gray-600 dark:text-neutral-450 pt-16 pb-8 px-4 border-t border-gray-150 dark:border-neutral-800 font-sans transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-left pb-12 border-b border-gray-100 dark:border-neutral-800">
          
          {/* Column 1: Logo & Slogan */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif tracking-[0.15em] text-emerald-800 dark:text-emerald-500 text-2xl font-extrabold">BHADRALOK</span>
              <span className="text-[10px] bg-emerald-800 text-white font-bold px-1.5 py-0.5 rounded ml-1 font-mono">.com</span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-neutral-400 font-light leading-relaxed">
              {language === "bn" 
                ? "কোনো প্রশ্ন আছে? আমাদের কল করুন সকাল ৯টা - রাত ১০টা" 
                : "Got Question? Call us 9 AM- 10 PM"}
            </p>
            
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight font-mono">
              09613-800800
            </p>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-gray-400 dark:text-neutral-500 tracking-wider">
                {language === "bn" ? "আমাদের অনুসরণ করুন" : "Follow Us"}
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-neutral-400 hover:bg-[#1877F2] hover:text-white transition cursor-pointer"
                  title="Facebook"
                  id="footer-social-fb"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5C13 5.3 13.8 5 14.5 5H16V2h-2.5C10.5 2 9 3.5 9 6.5V8z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-neutral-400 hover:bg-neutral-950 hover:text-white transition cursor-pointer"
                  title="Twitter"
                  id="footer-social-tw"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.3 2.4h6.9l4.7 6.2 5.3-6.2zm-1.2 17.6h1.8L7.1 4.1H5.1l11.9 15.9z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-neutral-400 hover:bg-[#0077B5] hover:text-white transition cursor-pointer"
                  title="LinkedIn"
                  id="footer-social-li"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-neutral-400 hover:bg-[#FF0000] hover:text-white transition cursor-pointer"
                  title="YouTube"
                  id="footer-social-yt"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 2 1 9.3 1 9.3 1s7.3 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 pt-2 text-xs text-gray-500 dark:text-neutral-400">
              <span>{language === "bn" ? "আমাদের রিভিউ দেখুন" : "See our reviews on"}</span>
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-extrabold text-[13px] font-sans">
                <span className="text-emerald-500 mr-0.5">★</span>Trustpilot
              </span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2 space-y-4 text-xs">
            <h4 className="text-neutral-800 dark:text-neutral-200 font-bold uppercase tracking-wider text-sm">{language === "bn" ? "কোম্পানি" : "COMPANY"}</h4>
            <ul className="space-y-2.5 text-gray-500 dark:text-neutral-400 font-medium">
              <li>
                <button onClick={() => openFooterInfo("about")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("career")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "ক্যারিয়ার" : "Career"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("contact")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "যোগাযোগ" : "Contact Us"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("privacy")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("certified")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "ভদ্রলোক সার্টিফাইড" : "Bhadralok Certified"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("terms")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "শর্তাবলী (Terms & Condition)" : "Terms & Condition (শর্তাবলী)"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("delivery")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "পরবর্তী/একই দিনে ডেলিভারি শর্তাবলী" : "Next/Same day delivery TC"}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: My Account */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="text-neutral-800 dark:text-neutral-200 font-bold uppercase tracking-wider text-sm">{language === "bn" ? "আমার অ্যাকাউন্ট" : "MY ACCOUNT"}</h4>
            <ul className="space-y-2.5 text-gray-500 dark:text-neutral-400 font-medium">
              <li>
                {currentUser ? (
                  <span className="text-emerald-800 dark:text-emerald-400 font-bold text-left block">
                    {language === "bn" ? `লগইন আছেন: ${currentUser.name.split(" ")[0]}` : `Hi, ${currentUser.name.split(" ")[0]}`}
                  </span>
                ) : (
                  <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                    {language === "bn" ? "লগইন করুন" : "Sign In"}
                  </button>
                )}
              </li>
              <li>
                <button onClick={() => setIsOrdersOpen(true)} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "অর্ডারসমূহ" : "Orders"}
                </button>
              </li>
              <li>
                <button onClick={() => {
                  if (currentUser) {
                    openFooterInfo("contact");
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "ঠিকানা" : "Addresses"}
                </button>
              </li>
              <li>
                <button onClick={() => setIsWishlistOpen(true)} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "আমার ইচ্ছা তালিকা" : "My Wishlist"}
                </button>
              </li>
              <li>
                <button onClick={() => setIsOrdersOpen(true)} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "অর্ডার ইতিহাস" : "Order History"}
                </button>
              </li>
              <li>
                <button onClick={() => setIsOrdersOpen(true)} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "আমার অর্ডার ট্র্যাক করুন" : "Track My Order"}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Service */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="text-neutral-800 dark:text-neutral-200 font-bold uppercase tracking-wider text-sm">{language === "bn" ? "গ্রাহক সেবা" : "CUSTOMER SERVICE"}</h4>
            <ul className="space-y-2.5 text-gray-500 dark:text-neutral-400 font-medium">
              <li>
                <button onClick={() => openFooterInfo("payment")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "মূল্য পরিশোধ পদ্ধতি" : "Payment Methods"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("support")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "সহায়তা কেন্দ্র" : "Support Center"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("howtoshoppe")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "কিভাবে শপিং করবেন" : "How To Shop On Bhadralok"}
                </button>
              </li>
              <li>
                <button onClick={() => {
                  setSelectedCategory("Premium");
                  const el = document.getElementById("shop-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "বিশেষ সুপারিশমালা" : "Featured Recommendation"}
                </button>
              </li>
              <li>
                <button onClick={() => openFooterInfo("refund")} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer text-left">
                  {language === "bn" ? "বাতিলকরণ, রিটার্ন এবং রিফান্ড" : "Cancellation, Return & Refund (বাতিলকরণ এবং ফেরত)"}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar containing copyright and safe payment methods */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-neutral-400 space-y-4 md:space-y-0 relative">
          
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700 dark:text-neutral-300">Bhadralok.com Pvt Ltd</span>
            <span>|</span>
            <p>{t.allRights}</p>
          </div>

          {/* We're using safe payment for */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <span className="text-gray-400 dark:text-neutral-500 text-[11px] font-medium">{language === "bn" ? "আমাদের নিরাপদ পেমেন্ট গেটওয়ে সমূহ:" : "We're using safe payment for"}</span>
            <div className="flex flex-wrap items-center gap-2">
              {/* bKash */}
              <div className="bg-[#E2125D] text-white px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase font-mono h-6 flex items-center">
                bKash
              </div>
              {/* VISA */}
              <div className="bg-[#1A1F71] text-white px-2.5 py-1 rounded text-[10px] font-extrabold tracking-wider uppercase font-sans h-6 flex items-center">
                Visa
              </div>
              {/* MasterCard */}
              <div className="bg-[#222] text-white px-2 py-1 rounded text-[10px] font-bold uppercase font-sans h-6 flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block -ml-2"></span>
                <span>MC</span>
              </div>
              {/* AMEX */}
              <div className="bg-[#016FD0] text-white px-2 py-1 rounded text-[10px] font-extrabold uppercase font-sans h-6 flex items-center">
                Amex
              </div>
              {/* Nagad */}
              <div className="bg-[#F05A24] text-white px-2 py-1 rounded text-[10px] font-bold uppercase font-sans h-6 flex items-center">
                Nagad
              </div>
              {/* Upay */}
              <div className="bg-[#002B49] text-white px-2 py-1 rounded text-[10px] font-extrabold uppercase font-sans h-6 flex items-center">
                Upay
              </div>
            </div>
          </div>

          {/* Elegant Back to Top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 bg-neutral-950 dark:bg-neutral-800 hover:bg-emerald-800 text-white p-3 rounded-full shadow-xl transition-all hover:scale-105 duration-200 cursor-pointer"
            title={language === "bn" ? "উপরে যান" : "Scroll to Top"}
            id="footer-back-to-top"
          >
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </footer>

      {/* 9. MODALS & SLIDE DRAWER DRAWERS */}

      {/* Product Details Modal */}
      {activeProductDetails && (
        <ProductModal
          isOpen={true}
          product={activeProductDetails}
          language={language}
          onClose={() => setActiveProductDetails(null)}
          isWishlisted={wishlist.includes(activeProductDetails.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onAddReview={handleAddReview}
        />
      )}

      {/* Shopping Bag Drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Sidebar / Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs" onClick={() => setIsWishlistOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white dark:bg-neutral-900 flex flex-col shadow-2xl h-full border-l border-gray-100 dark:border-neutral-850">
              
              <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
                <span className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">{t.wishlistTitle}</span>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.map((id) => {
                  const prod = productsList.find((p) => p.id === id);
                  if (!prod) return null;
                  return (
                    <div key={prod.id} className="flex items-center space-x-4 p-3 border border-gray-100 dark:border-neutral-800 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-850/55 bg-white dark:bg-neutral-900/40">
                      <img src={prod.image} alt={prod.nameEn} className="w-16 h-16 object-cover rounded-lg bg-gray-50 dark:bg-neutral-950" />
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-xs sm:text-sm line-clamp-1 text-gray-900 dark:text-neutral-100">{language === "bn" ? prod.nameBn : prod.nameEn}</h4>
                        <p className="font-bold text-xs text-emerald-800 dark:text-emerald-400 mt-1">
                          {language === "bn" ? `৳${prod.price.toLocaleString("bn-BD")}` : `BDT ${prod.price.toLocaleString()}`}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => {
                            handleQuickAdd(prod);
                            setIsWishlistOpen(false);
                          }}
                          className="px-2.5 py-1.5 bg-emerald-800 text-white font-bold text-[10px] rounded hover:bg-emerald-700 cursor-pointer"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => handleToggleWishlist(prod)}
                          className="text-[10px] text-rose-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}

                {wishlist.length === 0 && (
                  <p className="text-xs text-gray-400 dark:text-neutral-500 italic text-center py-20">{t.wishlistEmpty}</p>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Checkout Form Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={true}
          onClose={() => setIsCheckoutOpen(false)}
          language={language}
          cartItems={cartItems}
          discountPercent={checkoutDiscount}
          couponCode={checkoutCouponCode}
          onPlaceOrder={handlePlaceOrder}
          currentUser={currentUser}
        />
      )}

      {/* Auth Modal for Sign In / Register */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* AI Stylist Panel Drawer */}
      <AiStylist
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        language={language}
      />

      {/* Order Status Tracking timeline modal */}
      <OrderTracker
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        language={language}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Footer Info Popup Modal */}
      {footerInfoModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setFooterInfoModal(null)}
          ></div>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 dark:border-neutral-800 relative z-10 transform transition-all p-6 text-left animate-in fade-in zoom-in-95 duration-150 text-gray-850 dark:text-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-neutral-800 mb-4">
              <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100">{footerInfoModal.title}</h3>
              <button
                onClick={() => setFooterInfoModal(null)}
                className="p-1.5 rounded-full hover:bg-gray-150 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-100 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto pr-1">
              {footerInfoModal.content}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setFooterInfoModal(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                {language === "bn" ? "ঠিক আছে" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
