import React, { useState } from "react";
import { X, Mail, Phone, Lock, Eye, EyeOff, User, LogIn, UserPlus, CheckCircle, AlertCircle } from "lucide-react";
import { User as UserType } from "../types";
import { BANGLADESH_DISTRICTS } from "../data";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "bn" | "en";
  onAuthSuccess: (user: UserType) => void;
}

export default function AuthModal({ isOpen, onClose, language, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login form states
  const [loginIdentifier, setLoginIdentifier] = useState(""); // Email or Phone
  const [loginPassword, setLoginPassword] = useState("");

  // Register form states
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regDistrict, setRegDistrict] = useState("Dhaka (ঢাকা)");

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setError("");
    setSuccess("");
    
    setSuccess(language === "bn" ? "গুগল অ্যাকাউন্ট সংযোগ করা হচ্ছে..." : "Connecting Google Account...");
    
    setTimeout(() => {
      const googleUser: UserType = {
        id: "USR-GGL888",
        name: "Omar Farhatul",
        email: "omarfarhatul420@gmail.com",
        phone: "01712345678",
        password: "google_oauth_bypass",
        address: "House 12, Road 4, Dhanmondi",
        district: "Dhaka (ঢাকা)"
      };
      
      const usersJson = localStorage.getItem("bhadralok_users");
      const users: UserType[] = usersJson ? JSON.parse(usersJson) : [];
      if (!users.some(u => u.email.toLowerCase() === googleUser.email.toLowerCase())) {
        users.push(googleUser);
        localStorage.setItem("bhadralok_users", JSON.stringify(users));
      }
      
      setSuccess(language === "bn" ? "গুগল দিয়ে সফলভাবে সাইন-ইন হয়েছে!" : "Successfully signed in with Google!");
      setTimeout(() => {
        onAuthSuccess(googleUser);
        onClose();
        setSuccess("");
      }, 1000);
    }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginIdentifier || !loginPassword) {
      setError(language === "bn" ? "দয়া করে সব ঘর পূরণ করুন।" : "Please fill in all fields.");
      return;
    }

    // Load registered users
    const usersJson = localStorage.getItem("bhadralok_users");
    const users: UserType[] = usersJson ? JSON.parse(usersJson) : [];

    const foundUser = users.find(
      (u) =>
        (u.email.toLowerCase() === loginIdentifier.toLowerCase() || u.phone === loginIdentifier) &&
        u.password === loginPassword
    );

    if (foundUser) {
      setSuccess(language === "bn" ? "সফলভাবে লগইন হয়েছে!" : "Successfully logged in!");
      setTimeout(() => {
        onAuthSuccess(foundUser);
        onClose();
        // Reset states
        setLoginIdentifier("");
        setLoginPassword("");
        setSuccess("");
      }, 1000);
    } else {
      setError(
        language === "bn"
          ? "ভুল মোবাইল/ইমেইল অথবা পাসওয়ার্ড। আবার চেষ্টা করুন।"
          : "Invalid email/phone or password. Please try again."
      );
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!regName || !regPhone || !regEmail || !regPassword) {
      setError(language === "bn" ? "দয়া করে প্রয়োজনীয় ঘরগুলো পূরণ করুন।" : "Please fill in all required fields.");
      return;
    }

    if (regPhone.length !== 11) {
      setError(language === "bn" ? "মোবাইল নম্বরটি অবশ্যই ১১ ডিজিটের হতে হবে।" : "Phone number must be exactly 11 digits.");
      return;
    }

    // Load users
    const usersJson = localStorage.getItem("bhadralok_users");
    const users: UserType[] = usersJson ? JSON.parse(usersJson) : [];

    // Check if duplicate email or phone exists
    const isDuplicate = users.some(
      (u) => u.email.toLowerCase() === regEmail.toLowerCase() || u.phone === regPhone
    );

    if (isDuplicate) {
      setError(
        language === "bn"
          ? "এই ইমেইল বা মোবাইল নম্বরটি ইতিমধ্যে ব্যবহার করা হয়েছে।"
          : "This email or phone number is already registered."
      );
      return;
    }

    const newUser: UserType = {
      id: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      address: regAddress,
      district: regDistrict,
    };

    const nextUsers = [...users, newUser];
    localStorage.setItem("bhadralok_users", JSON.stringify(nextUsers));

    setSuccess(language === "bn" ? "অ্যাকাউন্ট তৈরি সফল হয়েছে! লগইন করুন।" : "Account created successfully! Please log in.");
    setTimeout(() => {
      // Switch to login tab and populate with newly created user identifier
      setLoginIdentifier(newUser.email);
      setActiveTab("login");
      // Reset registration inputs
      setRegName("");
      setRegPhone("");
      setRegEmail("");
      setRegPassword("");
      setRegAddress("");
      setSuccess("");
    }, 1500);
  };

  const t = {
    loginTab: language === "bn" ? "লগইন করুন" : "Sign In",
    registerTab: language === "bn" ? "নতুন অ্যাকাউন্ট" : "Register",
    welcomeTitle: language === "bn" ? "ভদ্রলোক ক্লাবে স্বাগতম" : "Welcome to Bhadralok Club",
    welcomeSubtitle: language === "bn" ? "আপনার আভিজাত্যপূর্ণ পোশাকের জগতে প্রবেশ করুন" : "Enter the gateway of aristocrat clothing",
    loginLabel: language === "bn" ? "মোবাইল নম্বর বা ইমেইল" : "Mobile Number or Email",
    loginPlaceholder: language === "bn" ? "উদা: 01712345678 বা mail@example.com" : "e.g., 01712345678 or mail@example.com",
    password: language === "bn" ? "পাসওয়ার্ড" : "Password",
    passwordPlaceholder: language === "bn" ? "আপনার পাসওয়ার্ড দিন" : "Enter password",
    required: language === "bn" ? "প্রয়োজনীয়" : "Required",
    fullName: language === "bn" ? "আপনার পুরো নাম" : "Your Full Name",
    fullNamePlaceholder: language === "bn" ? "উদা: ওমর ফারুক" : "e.g., Omar Farooq",
    phone: language === "bn" ? "মোবাইল নম্বর (১১ ডিজিট)" : "Mobile Number (11 Digits)",
    phonePlaceholder: language === "bn" ? "উদা: 01712345678" : "e.g., 01712345678",
    email: language === "bn" ? "ইমেইল অ্যাড্রেস" : "Email Address",
    emailPlaceholder: language === "bn" ? "উদা: name@example.com" : "e.g., name@example.com",
    address: language === "bn" ? "বিস্তারিত ঠিকানা (ডেলিভারির জন্য)" : "Detailed Address (For Delivery)",
    addressPlaceholder: language === "bn" ? "উদা: বাসা-১২, রোড-০৪, ধানমণ্ডি" : "e.g., House-12, Road-4, Dhanmondi",
    district: language === "bn" ? "জেলা" : "District",
    submitLogin: language === "bn" ? "লগইন করুন" : "Sign In to Account",
    submitRegister: language === "bn" ? "রেজিস্ট্রেশন সম্পন্ন করুন" : "Complete Registration",
    noAccount: language === "bn" ? "নতুন গ্রাহক?" : "New to Bhadralok?",
    createAccount: language === "bn" ? "নতুন অ্যাকাউন্ট খুলুন" : "Create an Account",
    hasAccount: language === "bn" ? "ইতিমধ্যে অ্যাকাউন্ট আছে?" : "Already have an account?",
    loginNow: language === "bn" ? "লগইন করুন" : "Sign In Now",
  };

  return (
    <div className="fixed inset-0 z-55 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 rounded-2xl w-full max-w-lg shadow-2xl relative flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner Block */}
        <div className="p-6 bg-neutral-900 text-white text-center space-y-2 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-48 h-48 bg-emerald-800/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-48 h-48 bg-emerald-700/10 rounded-full blur-2xl"></div>
          
          <span className="font-serif tracking-[0.2em] text-emerald-400 text-xl font-bold block">BHADRALOK</span>
          <h3 className="font-serif font-bold text-lg">{t.welcomeTitle}</h3>
          <p className="text-xs text-neutral-400 font-light">{t.welcomeSubtitle}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-100 dark:border-neutral-800 text-sm font-semibold">
          <button
            onClick={() => {
              setActiveTab("login");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
              activeTab === "login"
                ? "border-emerald-800 text-emerald-800 dark:text-emerald-400 dark:border-emerald-500 bg-emerald-50/10"
                : "border-transparent text-gray-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            <LogIn className="w-4 h-4 inline-block mr-1.5" />
            {t.loginTab}
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
              activeTab === "register"
                ? "border-emerald-800 text-emerald-800 dark:text-emerald-400 dark:border-emerald-500 bg-emerald-50/10"
                : "border-transparent text-gray-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            <UserPlus className="w-4 h-4 inline-block mr-1.5" />
            {t.registerTab}
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Alerts */}
          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-xs font-medium p-3.5 rounded-xl border border-rose-100 dark:border-rose-900/40 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 text-xs font-medium p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Google Sign In option */}
          <div className="pt-1 pb-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 border border-gray-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-850 text-neutral-700 dark:text-neutral-200 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center space-x-3 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 focus:outline-none"
              id="google-signin-btn"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.15 2.83-2.45 3.71v3.08h3.96c2.31-2.13 3.63-5.27 3.63-8.64z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.96-3.08c-1.1.74-2.51 1.18-3.97 1.18-3.05 0-5.63-2.06-6.55-4.83H1.38v3.18C3.36 21.48 7.37 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.45 14.36c-.24-.74-.38-1.53-.38-2.36s.14-1.62.38-2.36V6.46H1.38C.5 8.21 0 10.15 0 12s.5 3.79 1.38 5.54l4.07-3.18z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.91 1.19 15.22 0 12 0 7.37 0 3.36 2.52 1.38 6.46l4.07 3.18c.92-2.77 3.5-4.83 6.55-4.83z"
                />
              </svg>
              <span>{language === "bn" ? "গুগল অ্যাকাউন্ট দিয়ে এগিয়ে যান" : "Continue with Google"}</span>
            </button>
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-150 dark:border-neutral-800"></div>
              <span className="flex-shrink mx-3 text-[10px] font-extrabold text-gray-400 dark:text-neutral-500 uppercase tracking-widest bg-white dark:bg-neutral-900 px-2">
                {language === "bn" ? "অথবা" : "Or"}
              </span>
              <div className="flex-grow border-t border-gray-150 dark:border-neutral-800"></div>
            </div>
          </div>

          {/* Login Form */}
          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  <span>{t.loginLabel}</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder={t.loginPlaceholder}
                  className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center">
                    <Lock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    <span>{t.password}</span>
                    <span className="text-rose-500 ml-1">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-800 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/10 mt-6"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.submitLogin}</span>
              </button>

              <div className="text-center pt-2 text-xs text-gray-500 dark:text-neutral-400">
                <span>{t.noAccount} </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="text-emerald-800 dark:text-emerald-450 font-bold hover:underline cursor-pointer"
                >
                  {t.createAccount}
                </button>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  <span>{t.fullName}</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    <span>{t.phone}</span>
                    <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{11}"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder={t.phonePlaceholder}
                    className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    <span>{t.email}</span>
                    <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center">
                    <Lock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    <span>{t.password}</span>
                    <span className="text-rose-500 ml-1">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                    {t.district}
                  </label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                  >
                    {BANGLADESH_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist} className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100">
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                    {t.address}
                  </label>
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder={t.addressPlaceholder}
                    className="w-full text-sm border border-gray-200 dark:border-neutral-800 rounded-xl p-3 bg-gray-50/50 dark:bg-neutral-950 text-gray-800 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-800 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/10 mt-6"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.submitRegister}</span>
              </button>

              <div className="text-center pt-2 text-xs text-gray-500 dark:text-neutral-400">
                <span>{t.hasAccount} </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-emerald-800 dark:text-emerald-450 font-bold hover:underline cursor-pointer"
                >
                  {t.loginNow}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
