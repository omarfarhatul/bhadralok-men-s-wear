import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, User, Brain, AlertCircle, Loader2 } from "lucide-react";
import { ChatMessage, StylistPreferences } from "../types";

interface AiStylistProps {
  isOpen: boolean;
  onClose: () => void;
  language: "bn" | "en";
}

export default function AiStylist({ isOpen, onClose, language }: AiStylistProps) {
  const [preferences, setPreferences] = useState<StylistPreferences>({
    skinTone: "উজ্জ্বল শ্যামবর্ণ (Medium-tan)",
    occasion: "ঈদ উৎসব (Eid Festival)",
    preferredStyle: "ঐতিহ্যবাহী পাঞ্জাবি (Traditional Panjabi)",
    budget: "২৫০০ - ৫০০০ ৳",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "নমস্কার/সালাম! আমি 'ভদ্রলোক' এআই ফ্যাশন স্টাইলিস্ট (Bhadralok AI Stylist)। আপনি কোন ধরণের অনুষ্ঠানের জন্য কেমন লুক তৈরি করতে চাচ্ছেন তা আমাকে জানান। আমি আপনার গায়ের রঙ, উপলক্ষ ও বাজেট অনুযায়ী সবচেয়ে মানানসই কালেকশন ও স্টাইল সাজেশন দেব।",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrefForm, setShowPrefForm] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || inputMessage;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customMessage) setInputMessage("");
    setIsLoading(true);

    try {
      // Map existing messages to structural chat history for API endpoint
      const chatHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch("/api/ai-stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: chatHistory,
          preferences: showPrefForm ? preferences : null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-reply`,
            role: "model",
            text: data.text,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else {
        throw new Error(data.message || "Failed to fetch response");
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          role: "model",
          text: "দুঃখিত, এই মুহূর্তে জেমিনি এআই স্টাইলিস্টের সাথে যোগাযোগ করতে সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQueries = [
    { bn: "ঈদের মেরুন পাঞ্জাবির সাথে কোন জুতো মানাবে?", en: "What shoes go with Maroon Eid Panjabi?" },
    { bn: "বিয়ে বাড়ির অনুষ্ঠানের জন্য স্যুট নাকি কাবলি সেট ভালো?", en: "Suit or Kabli Set for a wedding guest?" },
    { bn: "অফিসের সেমি-ফরমাল স্টাইলের জন্য পরামর্শ দিন", en: "Suggest smart casual options for office wear" },
    { bn: "গরমের দিনে আরামদায়ক অথচ স্টাইলিশ ড্রেস কোড কী?", en: "Breathable but stylish dress code for hot days?" },
  ];

  const t = {
    title: language === "bn" ? "ভদ্রলোক AI পার্সোনাল স্টাইলিস্ট" : "Bhadralok AI Personal Stylist",
    prefTitle: language === "bn" ? "আপনার স্টাইল প্রোফাইল" : "Your Styling Profile",
    prefDesc: language === "bn" ? "প্রোফাইল সেট করলে জেমিনি এআই আপনাকে একদম নিখুঁত রিকমেন্ডেশন দিবে।" : "Helps the AI make perfect recommendations for you.",
    skinTone: language === "bn" ? "গায়ের রঙ (Skin Tone):" : "Skin Tone:",
    occasion: language === "bn" ? "উপলক্ষ (Occasion):" : "Occasion:",
    style: language === "bn" ? "পছন্দনীয় পোশাক (Style):" : "Preferred Outfit Style:",
    budget: language === "bn" ? "আনুমানিক বাজেট (Budget):" : "Approximate Budget:",
    chatLabel: language === "bn" ? "বার্তা টাইপ করুন..." : "Ask your personal stylist...",
    send: language === "bn" ? "পাঠান" : "Send",
    quickTitle: language === "bn" ? "দ্রুত প্রশ্ন করুন:" : "Quick Questions:",
    togglePrefShow: language === "bn" ? "প্রোফাইল সেটিং লুকান" : "Hide Profile Settings",
    togglePrefHide: language === "bn" ? "প্রোফাইল সেটিং দেখান" : "Show Profile Settings",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs" onClick={onClose}></div>

      {/* Slide Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-lg bg-white dark:bg-neutral-900 text-gray-800 dark:text-white flex flex-col shadow-2xl h-full border-l border-gray-150 dark:border-neutral-800 transition-colors duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-800 dark:text-emerald-400 animate-pulse" />
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-neutral-900 dark:text-neutral-100">{t.title}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-neutral-50/50 dark:bg-neutral-900/10">
            
            {/* Toggle Pref Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowPrefForm(!showPrefForm)}
                className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition flex items-center space-x-1 cursor-pointer"
              >
                <span>{showPrefForm ? t.togglePrefShow : t.togglePrefHide}</span>
              </button>
            </div>

            {/* 1. Preference Profile Form */}
            {showPrefForm && (
              <div className="bg-white dark:bg-neutral-950/80 p-4 rounded-xl border border-gray-150 dark:border-neutral-800/80 space-y-4 animate-in slide-in-from-top duration-300 shadow-xs">
                <div className="flex items-start space-x-2.5">
                  <Brain className="w-5 h-5 text-emerald-800 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{t.prefTitle}</h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{t.prefDesc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      {t.skinTone}
                    </label>
                    <select
                      value={preferences.skinTone}
                      onChange={(e) => setPreferences({ ...preferences, skinTone: e.target.value })}
                      className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded p-1.5 text-[11px] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option>ফর্সা (Fair)</option>
                      <option>উজ্জ্বল শ্যামবর্ণ (Medium-tan)</option>
                      <option>শ্যামবর্ণ (Tan/Dark)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      {t.occasion}
                    </label>
                    <select
                      value={preferences.occasion}
                      onChange={(e) => setPreferences({ ...preferences, occasion: e.target.value })}
                      className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded p-1.5 text-[11px] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option>ঈদ উৎসব (Eid Festival)</option>
                      <option>বিয়ে বাড়ি (Wedding / Party)</option>
                      <option>অফিসিয়াল কর্পোরেট (Corporate)</option>
                      <option>ক্যাজুয়াল আড্ডা (Casual Hangout)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      {t.style}
                    </label>
                    <select
                      value={preferences.preferredStyle}
                      onChange={(e) => setPreferences({ ...preferences, preferredStyle: e.target.value })}
                      className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded p-1.5 text-[11px] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option>ঐতিহ্যবাহী পাঞ্জাবি (Traditional)</option>
                      <option>ক্যাজুয়াল ও জিন্স (Casual / Jeans)</option>
                      <option>ফরমাল স্যুট ও ব্লেজার (Formal)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                      {t.budget}
                    </label>
                    <select
                      value={preferences.budget}
                      onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                      className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded p-1.5 text-[11px] text-gray-700 dark:text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option>১০০০ - ২৫০০ ৳</option>
                      <option>২৫০০ - ৫০০০ ৳</option>
                      <option>৫০০০+ ৳</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="space-y-4">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start space-x-2.5 ${isUser ? "flex-row-reverse space-x-reverse" : "text-left"}`}
                  >
                    {/* Icon */}
                    <div className={`p-2 rounded-full ${isUser ? "bg-emerald-800 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-emerald-800 dark:text-emerald-400"}`}>
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                    </div>

                    {/* Speech Box */}
                    <div className={`max-w-[78%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                      isUser
                        ? "bg-emerald-800 text-white rounded-tr-none"
                        : "bg-white dark:bg-neutral-800/80 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-150 dark:border-neutral-800 text-left"
                    }`}>
                      <p className="whitespace-pre-line">{m.text}</p>
                      <span className={`block text-[9px] mt-1.5 font-medium ${isUser ? "text-emerald-200 text-right" : "text-gray-400 text-right"}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex items-start space-x-2.5 text-left">
                  <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-emerald-800 dark:text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="max-w-[78%] bg-white dark:bg-neutral-800/80 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-500 dark:text-gray-400 border border-gray-150 dark:border-neutral-800 flex items-center space-x-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-800 dark:text-emerald-400" />
                    <span>ভদ্রলোক এআই চিন্তা করছে...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts selection */}
            <div className="space-y-2 text-left">
              <p className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">{t.quickTitle}</p>
              <div className="flex flex-wrap gap-2">
                {quickQueries.map((query, i) => (
                  <button
                    key={i}
                    disabled={isLoading}
                    onClick={() => handleSendMessage(language === "bn" ? query.bn : query.en)}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-850 hover:bg-gray-50 dark:hover:bg-neutral-800 text-[11px] text-gray-700 dark:text-gray-300 hover:text-emerald-800 dark:hover:text-white transition text-left cursor-pointer border border-gray-150 dark:border-neutral-800 shadow-2xs"
                  >
                    {language === "bn" ? query.bn : query.en}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Input Area */}
          <div className="p-4 border-t border-gray-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center space-x-2">
            <input
              type="text"
              disabled={isLoading}
              placeholder={t.chatLabel}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-xs text-gray-900 dark:text-white rounded-xl px-3.5 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
            />
            <button
              disabled={isLoading || !inputMessage.trim()}
              onClick={() => handleSendMessage()}
              className="p-3 bg-emerald-800 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
