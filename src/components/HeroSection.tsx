import React, { useState, useEffect } from "react";
import { Sparkles, ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  language: "bn" | "en";
  openAiStylist: () => void;
  setSelectedCategory: (cat: string) => void;
}

export default function HeroSection({ language, openAiStylist, setSelectedCategory }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const t = {
    sub: language === "bn" ? "প্রিমিয়াম দেশীয় ঐতিহ্য ও আধুনিকতা" : "Premium Traditional Heritage & Modernity",
    title: language === "bn" ? "বাঙালির আভিজাত্য ও ঐতিহ্যের সেরা কালেকশন" : "The Pinnacle of Bengali Royal Persona",
    feature1Title: language === "bn" ? "সারাদেশে ফ্রি কুরিয়ার ডেলিভারি" : "Free Courier Delivery Nationwide",
    feature1Desc: language === "bn" ? "৯৯৯ টাকার ওপরে অর্ডারে" : "On orders above 999 BDT",
    feature2Title: language === "bn" ? "৩ দিনের সহজ এক্সচেঞ্জ" : "3 Days Easy Exchange",
    feature2Desc: language === "bn" ? "কোনো প্রশ্ন ছাড়াই পরিবর্তন" : "No questions asked",
    feature3Title: language === "bn" ? "১০০% সার্টিফাইড আভিজাত্য" : "100% Certified Premium Wear",
    feature3Desc: language === "bn" ? "রপ্তানি মানের প্রিমিয়াম ফিনিশিং" : "Export quality & premium stitch",
  };

  const totalSlides = 5;

  // Autoplay function
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative bg-neutral-50 dark:bg-neutral-950 py-8 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans transition-colors duration-300">
      <div 
        className="max-w-7xl mx-auto relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides container with horizontal slide transition */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white dark:bg-neutral-900 border dark:border-neutral-800 min-h-[320px] md:min-h-[400px]">
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1: The New Minimal */}
            <div className="w-full flex-shrink-0 relative h-[320px] md:h-[400px] bg-[#FAF9F5] dark:bg-neutral-900/60 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 overflow-hidden select-none">
              
              {/* Left Models (Desktop Only) */}
              <div className="hidden md:flex items-center space-x-3 w-1/4 h-full relative z-10">
                <div className="w-24 h-[85%] rounded-2xl overflow-hidden shadow-md transform -rotate-2 hover:rotate-0 transition duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600" 
                    alt="Polo model" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-24 h-[85%] rounded-2xl overflow-hidden shadow-md transform rotate-3 hover:rotate-0 transition duration-300 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600" 
                    alt="Tee model" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-2 z-20">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-2.5">
                  {language === "bn" ? "পুরুষদের আধুনিক ফ্যাশন" : "MEN'S FASHION"}
                </span>
                <div className="bg-[#004B3E] text-white py-6 px-6 sm:py-8 sm:px-12 rounded-[2.5rem] shadow-xl w-full max-w-lg flex flex-col items-center justify-center relative overflow-hidden border border-emerald-950">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-black tracking-[0.1em] font-sans relative z-10 leading-tight">
                    THE NEW MINIMAL
                  </h2>
                  <p className="text-[9px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-emerald-300 mt-2 relative z-10">
                    STYLISH, SLEEK & CLASSIC
                  </p>
                </div>
                
                {/* Mobile Shop Action */}
                <button
                  onClick={() => {
                    setSelectedCategory("panjabi");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 md:mt-6 px-6 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition duration-200 cursor-pointer md:hidden"
                >
                  {language === "bn" ? "কালেকশন দেখুন" : "SHOP COLLECTION"}
                </button>
              </div>

              {/* Right Models (Desktop Only) */}
              <div className="hidden md:flex items-center space-x-3 w-1/4 h-full justify-end relative z-10">
                <div className="w-24 h-[85%] rounded-2xl overflow-hidden shadow-md transform -rotate-3 hover:rotate-0 transition duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600" 
                    alt="Shirt model" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-24 h-[85%] rounded-2xl overflow-hidden shadow-md transform rotate-2 hover:rotate-0 transition duration-300 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600" 
                    alt="Kurta model" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>

            {/* Slide 2: T-Shirt Collection */}
            <div className="w-full flex-shrink-0 relative h-[320px] md:h-[400px] bg-[#E5E6EB] dark:bg-neutral-950 flex items-center justify-between p-6 sm:p-10 md:p-12 overflow-hidden select-none">
              
              {/* Left Title */}
              <div className="flex-1 text-left relative z-20 pl-2">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
                  {language === "bn" ? "প্রিমিয়াম কমফোর্ট" : "PREMIUM COMFORT"}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#2D2A26] dark:text-neutral-100 leading-none tracking-tight font-sans">
                  T-SHIRT<br />COLLECTION
                </h2>
                
                {/* Mobile Shop Action */}
                <button
                  onClick={() => {
                    setSelectedCategory("shirt");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 px-5 py-2 bg-[#2D2A26] dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-750 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-md transition duration-200 cursor-pointer sm:hidden"
                >
                  {language === "bn" ? "এখনই কিনুন" : "SHOP NOW"}
                </button>
              </div>

              {/* Center Glowing Neon Frame & Model */}
              <div className="relative w-[150px] sm:w-[220px] md:w-[320px] h-full flex items-center justify-center z-10">
                {/* Glowing neon bars behind the model */}
                <div className="absolute inset-y-12 right-0 sm:right-6 w-36 sm:w-56 flex flex-col justify-center space-y-4 sm:space-y-6 opacity-90">
                  <div className="h-3 sm:h-4.5 rounded-full border border-fuchsia-400 bg-fuchsia-950/20 shadow-[0_0_12px_#d946ef,inset_0_0_6px_#d946ef]"></div>
                  <div className="h-3 sm:h-4.5 rounded-full border border-fuchsia-400 bg-fuchsia-950/20 shadow-[0_0_12px_#d946ef,inset_0_0_6px_#d946ef]"></div>
                  <div className="h-3 sm:h-4.5 rounded-full border border-blue-400 bg-blue-950/20 shadow-[0_0_12px_#3b82f6,inset_0_0_6px_#3b82f6]"></div>
                </div>

                {/* Leaning Model - Beautiful High Resolution Colorful Fashion T-shirt Model */}
                <div className="absolute bottom-0 h-[85%] sm:h-[95%] aspect-square flex items-end justify-center overflow-visible">
                  <img 
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600" 
                    alt="T-shirt model avatar" 
                    className="h-[90%] object-contain filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.18)] transform hover:scale-105 transition duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Shop Button (Desktop/Tablet) */}
              <div className="hidden sm:block text-right z-20">
                <button
                  onClick={() => {
                    setSelectedCategory("shirt");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs md:text-sm font-black uppercase tracking-widest text-[#2D2A26] dark:text-neutral-200 border-b-2 border-[#2D2A26] dark:border-neutral-200 pb-1 hover:text-emerald-800 dark:hover:text-emerald-400 hover:border-emerald-800 dark:hover:border-emerald-400 transition cursor-pointer"
                >
                  {language === "bn" ? "এখনই কিনুন" : "SHOP NOW"}
                </button>
              </div>

            </div>

            {/* Slide 3: Timeless Perfection */}
            <div className="w-full flex-shrink-0 relative h-[320px] md:h-[400px] bg-[#0A0505] flex items-center justify-between p-6 sm:p-10 md:p-12 overflow-hidden select-none">
              
              {/* Bottom burgundy visual band */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[#230407]/30 border-t border-neutral-900/40"></div>

              {/* Left stacked text */}
              <div className="flex-1 text-left relative z-20 hidden sm:block">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-red-500 mb-2 block">
                  {language === "bn" ? "অ্যারিস্টোক্রেসি ঘড়ি" : "LUXURY ACCESSORIES"}
                </span>
                <h2 className="text-2xl md:text-5xl font-black tracking-[0.25em] text-white font-sans">
                  TIMELESS
                </h2>
              </div>

              {/* Center Watch against Stark Red block */}
              <div className="flex-1 flex flex-col items-center justify-center relative z-10 h-full">
                {/* Solid red background square */}
                <div className="absolute w-24 sm:w-36 md:w-40 aspect-square bg-[#E30613] rounded-xl shadow-2xl animate-pulse opacity-90"></div>
                
                {/* Realistic Steel Watch */}
                <div className="relative w-28 sm:w-44 md:w-48 h-40 sm:h-56 flex items-center justify-center z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600" 
                    alt="Luxury watch model" 
                    className="h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] transform hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Hand-written script overlay */}
                <p className="absolute bottom-1 sm:bottom-4 md:bottom-5 text-xs sm:text-sm md:text-base font-serif italic text-amber-200/90 tracking-wider font-light">
                  It's Your Time
                </p>
              </div>

              {/* Right text and Shop Now */}
              <div className="flex-1 text-right relative z-20">
                <h2 className="text-2xl md:text-5xl font-black tracking-[0.2em] text-white font-sans hidden sm:block">
                  PERFECTION
                </h2>
                
                <button
                  onClick={() => {
                    setSelectedCategory("shoes");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 sm:mt-6 px-5 py-2 sm:px-6 sm:py-2.5 border border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                >
                  {language === "bn" ? "এখনই কিনুন" : "SHOP NOW"}
                </button>
              </div>

            </div>

            {/* Slide 4: Royal Heritage */}
            <div className="w-full flex-shrink-0 relative h-[320px] md:h-[400px] bg-[#F7F4EB] dark:bg-neutral-900/40 flex items-center justify-between p-6 sm:p-10 md:p-12 overflow-hidden select-none">
              
              {/* Decorative border vector line overlay */}
              <div className="absolute inset-4 border border-amber-900/10 rounded-2xl pointer-events-none"></div>

              {/* Left details */}
              <div className="flex-1 text-left relative z-20 pl-2">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-emerald-800 dark:text-emerald-450 mb-2 block">
                  {language === "bn" ? "বাঙালিয়ানা হেরিটেজ" : "BENGALI HERITAGE"}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-extrabold text-[#1c1917] dark:text-neutral-100 leading-tight">
                  ROYAL<br />PANJABI
                </h2>
                <p className="text-[11px] sm:text-xs text-amber-900/80 dark:text-amber-500 font-medium tracking-wide mt-2 font-serif italic">
                  {language === "bn" ? "উৎসবের রঙে দেশী আভিজাত্য" : "Artisanal elegance for festive celebrations"}
                </p>
                
                {/* Mobile/Tablet Shop Action */}
                <button
                  onClick={() => {
                    setSelectedCategory("panjabi");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-md transition duration-200 cursor-pointer sm:hidden"
                >
                  {language === "bn" ? "কালেকশন দেখুন" : "VIEW COLLECTION"}
                </button>
              </div>

              {/* Center Model wearing gorgeous outfit */}
              <div className="relative w-[150px] sm:w-[220px] md:w-[320px] h-full flex items-center justify-center z-10">
                <div className="absolute w-32 sm:w-48 aspect-square bg-[#E0D8C3] rounded-full opacity-40 blur-xl"></div>
                <div className="absolute bottom-0 h-[85%] sm:h-[95%] aspect-square flex items-end justify-center overflow-visible">
                  <img 
                    src="https://images.unsplash.com/photo-1597983073492-bc24018b3791?q=80&w=600" 
                    alt="Heritage model" 
                    className="h-full object-contain filter drop-shadow-[0_15px_18px_rgba(40,30,10,0.15)] transform hover:scale-105 transition duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right View Button */}
              <div className="hidden sm:block text-right z-20">
                <button
                  onClick={() => {
                    setSelectedCategory("panjabi");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg hover:shadow-emerald-900/20 transition-all duration-200 cursor-pointer"
                >
                  {language === "bn" ? "কালেকশন দেখুন" : "VIEW HERITAGE"}
                </button>
              </div>

            </div>

            {/* Slide 5: Executive Footwear */}
            <div className="w-full flex-shrink-0 relative h-[320px] md:h-[400px] bg-[#FAF8F5] dark:bg-neutral-950 flex items-center justify-between p-6 sm:p-10 md:p-12 overflow-hidden select-none">
              
              {/* Top horizontal luxury divider style */}
              <div className="absolute inset-y-0 left-0 w-3 bg-amber-800/20"></div>

              {/* Left stacked text */}
              <div className="flex-1 text-left relative z-20 pl-2">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2 block">
                  {language === "bn" ? "হ্যান্ডক্রাফটেড শুজ" : "EXECUTIVE CLASS"}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-none tracking-tight font-sans">
                  PREMIUM<br />FOOTWEAR
                </h2>
                
                {/* Mobile Shop Action */}
                <button
                  onClick={() => {
                    setSelectedCategory("shoes");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 px-5 py-2 bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-850 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-md transition duration-200 cursor-pointer sm:hidden"
                >
                  {language === "bn" ? "এখনই কিনুন" : "SHOP NOW"}
                </button>
              </div>

              {/* Center Shoes against Premium Layout */}
              <div className="relative w-[150px] sm:w-[220px] md:w-[320px] h-full flex items-center justify-center z-10">
                <div className="absolute w-28 sm:w-40 aspect-square bg-[#D97706]/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 h-[75%] sm:h-[85%] aspect-square flex items-end justify-center overflow-visible">
                  <img 
                    src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600" 
                    alt="Monk strap shoes" 
                    className="h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] transform hover:scale-105 transition duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Shop Button */}
              <div className="hidden sm:block text-right z-20">
                <button
                  onClick={() => {
                    setSelectedCategory("shoes");
                    const el = document.getElementById("shop-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs md:text-sm font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 border-b-2 border-neutral-850 dark:border-neutral-300 pb-1 hover:text-amber-800 dark:hover:text-amber-400 hover:border-amber-800 dark:hover:border-amber-400 transition cursor-pointer"
                >
                  {language === "bn" ? "সংগ্রহ দেখুন" : "BROWSE COLLECTION"}
                </button>
              </div>

            </div>

          </div>

          {/* Left arrow trigger button (Only visible on group-hover/desktop) */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white dark:bg-neutral-900/90 dark:hover:bg-neutral-800 text-gray-800 dark:text-neutral-100 flex items-center justify-center shadow-lg cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition duration-300 z-30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow trigger button (Only visible on group-hover/desktop) */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white dark:bg-neutral-900/90 dark:hover:bg-neutral-800 text-gray-800 dark:text-neutral-100 flex items-center justify-center shadow-lg cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition duration-300 z-30"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator dots at the bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? "bg-emerald-800 dark:bg-emerald-500 w-6" 
                    : "bg-gray-300 dark:bg-neutral-700 hover:bg-gray-400 dark:hover:bg-neutral-600"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid at the bottom of the section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-150 dark:border-neutral-800 text-left shadow-xs transition-colors duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/45 rounded-xl text-emerald-800 dark:text-emerald-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm">{t.feature1Title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5">{t.feature1Desc}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/45 rounded-xl text-emerald-800 dark:text-emerald-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm">{t.feature2Title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5">{t.feature2Desc}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/45 rounded-xl text-emerald-800 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm">{t.feature3Title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5">{t.feature3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
