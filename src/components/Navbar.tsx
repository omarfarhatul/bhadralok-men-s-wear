import React, { useState } from "react";
import { Search, ShoppingBag, Heart, Sparkles, History, Globe, Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { Product, User as UserType } from "../types";

interface NavbarProps {
  language: "bn" | "en";
  setLanguage: (lang: "bn" | "en") => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  cartCount: number;
  wishlistCount: number;
  openCart: () => void;
  openWishlist: () => void;
  openOrders: () => void;
  openAiStylist: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser: UserType | null;
  onSignOut: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({
  language,
  setLanguage,
  darkMode,
  toggleDarkMode,
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  openOrders,
  openAiStylist,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  currentUser,
  onSignOut,
  onOpenAuth,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: "all", bn: "সব কালেকশন", en: "All Collections" },
    { id: "panjabi", bn: "পাঞ্জাবি ও কাবলি", en: "Panjabi & Kabli" },
    { id: "shirt", bn: "ক্যাজুয়াল শার্ট", en: "Casual Shirts" },
    { id: "tshirt", bn: "টি-শার্ট ও পোলো", en: "Polo & T-Shirts" },
    { id: "formal", bn: "ফরমাল ও ব্লেজার", en: "Formal Blazers" },
    { id: "pant", bn: "প্যান্ট ও জিন্স", en: "Pants & Jeans" },
    { id: "shoe", bn: "প্রিমিয়াম জুতো", en: "Premium Shoes" },
    { id: "accessory", bn: "এক্সেসরিজ", en: "Accessories" },
  ];

  const t = {
    freeShipping: language === "bn" ? "সারাদেশে ফ্রি ডেলিভারি অফার! কোড: FREE99" : "Free Shipping Nationwide! Code: FREE99",
    searchPlaceholder: language === "bn" ? "পাঞ্জাবি, শার্ট বা এক্সেসরিজ খুঁজুন..." : "Search Panjabi, Shirts, Accessories...",
    stylistButton: language === "bn" ? "ভদ্রলোক AI স্টাইলিস্ট" : "Bhadralok AI Stylist",
    trackButton: language === "bn" ? "অর্ডার ট্র্যাকিং" : "Track Order",
    cartLabel: language === "bn" ? "ব্যাগ" : "Bag",
    wishlistLabel: language === "bn" ? "ইচ্ছা তালিকা" : "Wishlist",
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-900 shadow-sm border-b border-gray-100 dark:border-neutral-800 transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t.freeShipping}</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-1 hover:text-emerald-400 transition cursor-pointer text-[11px] uppercase tracking-wider font-semibold"
            title={language === "bn" ? (darkMode ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন") : (darkMode ? "Switch to Light Mode" : "Switch to Dark Mode")}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-400" />}
            <span>{language === "bn" ? (darkMode ? "লাইট মোড" : "ডার্ক মোড") : (darkMode ? "Light" : "Dark")}</span>
          </button>

          <span className="text-neutral-700">|</span>

          <button
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="flex items-center space-x-1 hover:text-emerald-400 transition cursor-pointer text-[11px] uppercase tracking-wider font-semibold"
          >
            <Globe className="w-3 h-3" />
            <span>{language === "bn" ? "English" : "বাংলা"}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 hover:opacity-90 transition focus:outline-none cursor-pointer flex flex-col items-start leading-none"
          >
            <span className="font-serif tracking-widest text-emerald-800 dark:text-emerald-500">BHADRALOK</span>
            <span className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.35em] text-gray-500 dark:text-neutral-400 font-sans uppercase mt-1 hidden xs:block">ভদ্রলোক • Men's Premium</span>
          </button>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-neutral-700 rounded-full bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition"
          />
          <Search className="absolute left-3.5 top-2.5 text-gray-400 dark:text-neutral-500 w-4 h-4" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-neutral-200 focus:outline-none text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Action Icons */}
        <div className="flex items-center space-x-1.5 xs:space-x-2.5 sm:space-x-4 md:space-x-5 flex-shrink-0">
          {/* Sign In / Register / Profile */}
          {currentUser ? (
            <div className="hidden sm:flex items-center space-x-1.5 sm:space-x-2 text-xs text-gray-700 dark:text-neutral-300 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-100/60 dark:border-emerald-900/40 rounded-full py-1.5 px-3 transition">
              <div className="w-5.5 h-5.5 bg-emerald-800 dark:bg-emerald-600 text-white font-extrabold rounded-full flex items-center justify-center text-[10px] shadow-sm uppercase">
                {currentUser.name.slice(0, 1)}
              </div>
              <span className="font-semibold hidden lg:inline max-w-[80px] truncate text-emerald-900 dark:text-emerald-400">{currentUser.name.split(" ")[0]}</span>
              <button
                onClick={onSignOut}
                className="p-1 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-full transition cursor-pointer"
                title={language === "bn" ? "লগআউট" : "Sign Out"}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold text-gray-700 dark:text-neutral-300 bg-gray-50 dark:bg-neutral-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-gray-200 dark:border-neutral-700 hover:border-emerald-200 transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-gray-500 dark:text-neutral-400" />
              <span className="hidden sm:inline">{language === "bn" ? "লগইন" : "Sign In"}</span>
            </button>
          )}

          {/* AI Stylist Prompt */}
          <button
            onClick={openAiStylist}
            className="flex items-center space-x-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 transition shadow-sm font-medium text-xs sm:text-sm animate-pulse cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{t.stylistButton}</span>
            <span className="sm:hidden xs:inline hidden">AI</span>
          </button>

          {/* Order Tracking / History - Desktop/Tablet */}
          <button
            onClick={openOrders}
            className="hidden sm:block p-1.5 sm:p-2 text-gray-700 dark:text-neutral-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-neutral-850 rounded-full transition relative cursor-pointer"
            title={t.trackButton}
          >
            <History className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={openWishlist}
            className="p-1.5 sm:p-2 text-gray-700 dark:text-neutral-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-neutral-850 rounded-full transition relative cursor-pointer"
            title={t.wishlistLabel}
          >
            <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white font-sans text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="p-1.5 sm:p-2 text-gray-700 dark:text-neutral-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-neutral-850 rounded-full transition relative cursor-pointer"
            title={t.cartLabel}
          >
            <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-emerald-800 dark:bg-emerald-600 text-white font-sans text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-gray-700 dark:text-neutral-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-neutral-850 rounded-full transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5 sm:w-6 sm:h-6" /> : <Menu className="w-5.5 h-5.5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Categories Bar - Desktop */}
      <nav className="hidden md:block border-t border-gray-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center space-x-6 py-3 overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery(""); // Clear search when category changes
                    }}
                    className={`px-3 py-1 text-xs font-semibold tracking-wider uppercase transition cursor-pointer rounded-full ${
                      isActive
                        ? "bg-emerald-800 text-white shadow-sm"
                        : "text-gray-600 dark:text-neutral-400 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-neutral-800"
                    }`}
                  >
                    {language === "bn" ? cat.bn : cat.en}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu & Search - Underneath Header */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-inner py-4 px-4 space-y-4">
          {/* Mobile Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-neutral-700 rounded-full bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition"
            />
            <Search className="absolute left-3.5 top-2.5 text-gray-400 dark:text-neutral-500 w-4 h-4" />
          </div>

          {/* Mobile Categories Scroll */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
              {language === "bn" ? "ক্যাটাগরি" : "Categories"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery("");
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 text-left text-xs font-semibold rounded-lg transition ${
                      isActive
                        ? "bg-emerald-800 text-white"
                        : "bg-gray-50 dark:bg-neutral-850 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {language === "bn" ? cat.bn : cat.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Order History / Track Order Button */}
          <div className="border-t border-gray-150 dark:border-neutral-800 pt-3">
            <button
              onClick={() => {
                openOrders();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-950/40 transition cursor-pointer text-xs font-semibold"
            >
              <History className="w-4 h-4" />
              <span>{t.trackButton}</span>
            </button>
          </div>

          {/* Mobile User Profile Section */}
          <div className="border-t border-gray-150 dark:border-neutral-800 pt-3 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-800 dark:bg-emerald-600 text-white font-bold rounded-full flex items-center justify-center text-sm uppercase">
                    {currentUser.name.slice(0, 1)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900 dark:text-neutral-100">{currentUser.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-neutral-400">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-800 font-bold bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 px-3 py-1.5 rounded-lg cursor-pointer transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === "bn" ? "লগআউট" : "Logout"}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-neutral-900 dark:bg-neutral-800 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-750 transition cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>{language === "bn" ? "লগইন করুন / নতুন অ্যাকাউন্ট" : "Sign In / Register"}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
