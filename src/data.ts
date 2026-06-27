import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "panjabi-01",
    nameBn: "রাজকীয় মসলিন খাদি পাঞ্জাবি (রয়্যাল মেরুন)",
    nameEn: "Royal Muslin Khadi Panjabi (Royal Maroon)",
    category: "panjabi",
    categoryBn: "পাঞ্জাবি ও পায়জামা",
    price: 3450,
    originalPrice: 4200,
    image: "/images/panjabiF.webp",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600"
    ],
    descriptionBn: "বাঙালির সব উৎসবে আভিজাত্য এনে দিতে প্রস্তুত এই প্রিমিয়াম খাদি কটন পাঞ্জাবি। এতে রয়েছে সূক্ষ্ম হাতের কাজ এবং গর্জিয়াস মেটাল বাটন, যা আপনাকে যেকোনো ভিড়ে আলাদা আভিজাত্য দেবে।",
    descriptionEn: "Bring sheer elegance to your festive moments with this premium Khadi Cotton Panjabi. Featuring subtle hand-embroidery and gorgeous metallic buttons, it stands out in any gathering.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Maroon", hex: "#800000" },
      { name: "Navy Blue", hex: "#000080" },
      { name: "Emerald Green", hex: "#043927" }
    ],
    tags: ["New", "Festive", "Hot Selling"],
    rating: 4.8,
    reviews: [
      { id: "rev-1", userName: "ফারহান আহমেদ", rating: 5, comment: "পাঞ্জাবির কাপড়টা অসাধারণ! ফিটিং একদম পারফেক্ট হয়েছে। ধন্যবাদ ভদ্রলোক ব্র্যান্ডকে।", date: "2026-06-15" },
      { id: "rev-2", userName: "তানভীর হাসান", rating: 4, comment: "রঙটা ছবির মতোই ব্রাইট। ওয়াশ করার পরেও ফেব্রিক সফট আছে।", date: "2026-06-20" }
    ],
    featuresBn: ["১০০% প্রিমিয়াম সুতি খাদি ফেব্রিক", "সূক্ষ্ম হ্যান্ড এমব্রয়ডারি ডিজাইন", "আভিজাত্যপূর্ণ ব্র্যান্ডেড মেটাল বাটন", "উৎসব ও যেকোনো অনুষ্ঠানের জন্য পারফেক্ট"],
    featuresEn: ["100% Premium Khadi Cotton Fabric", "Exquisite Hand-embroidered Design", "Sophisticated Metallic Buttons", "Perfect for Festivals and Occasions"],
    inStock: true
  },
  {
    id: "panjabi-02",
    nameBn: "অভিজাত ডাবল কলার কাবলি সেট (রয়্যাল ব্লু)",
    nameEn: "Royal Blue Double Collar Kabli Set",
    category: "panjabi",
    categoryBn: "পাঞ্জাবি ও পায়জামা",
    price: 4200,
    originalPrice: 4800,
    image: "/images/RoyalBlueKabli.webp",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600"
    ],
    descriptionBn: "আধুনিক বাঙালি তরুণদের প্রিয় স্টাইলিশ কাবলি সেট। একই রঙের আরামদায়ক পায়জামা সহ সম্পূর্ণ সেট হিসেবে পাবেন। এর নিখুঁত কাটিং ও ফিটিংস আপনাকে চমৎকার লুক দিবে।",
    descriptionEn: "A modern trend among young generations. This complete Kabli Set comes with a matching comfortable shalwar. Excellent pattern cuts guarantee a sophisticated masculine shape.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Royal Blue", hex: "#1e3a8a" },
      { name: "Charcoal Gray", hex: "#374151" }
    ],
    tags: ["Eid Special", "Complete Set"],
    rating: 4.9,
    reviews: [
      { id: "rev-3", userName: "শাফায়াত জামিল", rating: 5, comment: "কাবলি সেটের ফিটিংটা অসাধারণ। সেলোয়ারটাও সাথে দেয়াতে আলাদা ঝামেলা পোহাতে হয়নি।", date: "2026-06-18" }
    ],
    featuresBn: ["পাঞ্জাবি ও পায়জামা কম্বো সেট", "প্রিমিয়াম সেমি-ফরমাল লিনেন টেক্সচার", "ডাবল কলার ট্রেন্ডি নেকলাইন", "লং লাস্টিং স্লিম-ফিট ফিনিশিং"],
    featuresEn: ["Complete Panjabi & Pajama Combo Set", "Premium Semi-formal Linen Texture", "Trendy Double Collar Neckline", "Durable Slim-fit Finishing"],
    inStock: true
  },
  {
    id: "shirt-01",
    nameBn: "প্রিমিয়াম কটন ক্যাজুয়াল লিনেন শার্ট (স্কাই ব্লু)",
    nameEn: "Premium Cotton Casual Linen Shirt (Sky Blue)",
    category: "shirt",
    categoryBn: "ক্যাজুয়াল শার্ট",
    price: 1850,
    originalPrice: 2400,
    image: "/images/SkyBlueShirt.webp",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600"
    ],
    descriptionBn: "অত্যন্ত আরামদায়ক প্রিমিয়াম লিনেন-কটন মিক্স কাপড়ে তৈরি আমাদের সিগনেচার শার্ট। গরমের দিনে কিংবা ডে-আউট লুকে এটি দেবে সতেজ অনুভূতি এবং দারুণ স্মার্ট আউটলুক।",
    descriptionEn: "Extremely breathable linen-cotton blended shirt from our signature collection. Perfect for styling on summer days, giving you freshness and an elite casual appearance.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sky Blue", hex: "#bae6fd" },
      { name: "Soft Pink", hex: "#fbcfe8" },
      { name: "Classic White", hex: "#ffffff" }
    ],
    tags: ["Best Seller", "Breathable"],
    rating: 4.7,
    reviews: [
      { id: "rev-4", userName: "সাকিব আল হাসান", rating: 5, comment: "এত আরামদায়ক শার্ট অনেকদিন পরে পরলাম। গরমের দিনে পরার জন্য বেস্ট চয়েস।", date: "2026-06-22" }
    ],
    featuresBn: ["৮০% কটন এবং ২০% লিনেন মিক্সচার", "সুপার লাইটওয়েট এবং এয়ার সার্কুলেশন ফ্রেন্ডলি", "ক্লাসিক স্প্রেড কলার ডিজাইন", "সহজে কুঁচকে যায় না (Easy-iron)"],
    featuresEn: ["80% Cotton, 20% Linen Blend", "Super Lightweight & Breathable", "Classic Spread Collar Design", "Wrinkle-resistant easy-iron finish"],
    inStock: true
  },
  {
    id: "shirt-02",
    nameBn: "অফিসিয়াল প্রিমিয়াম কটন চেক শার্ট (নেভি রেড)",
    nameEn: "Official Premium Cotton Check Shirt",
    category: "shirt",
    categoryBn: "ক্যাজুয়াল শার্ট",
    price: 1990,
    originalPrice: 2500,
    image: "/images/CheckShirt.jpg",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600"
    ],
    descriptionBn: "স্মার্ট সেমি-ফরমাল ক্যাজুয়াল পরার জন্য চমৎকার একটি চেক শার্ট। উন্নত মানের ১০০% কম্বড কটন কাপড়ে তৈরি, যা কালার গ্যারান্টি সহ দীর্ঘস্থায়ী উজ্জ্বলতা নিশ্চিত করে।",
    descriptionEn: "A magnificent checked shirt for smart semi-formal workwear or casual weekends. Built with 100% combed cotton, providing rich color retention and absolute skin comfort.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy Red Check", hex: "#b91c1c" },
      { name: "Green Navy Check", hex: "#065f46" }
    ],
    tags: ["Trending", "Office Wear"],
    rating: 4.6,
    reviews: [
      { id: "rev-5", userName: "মাহমুদুল হাসান", rating: 4, comment: "অফিসে রেগুলার পরার জন্য চমৎকার শার্ট। বাটন এবং সেলাইয়ের ফিনিশিং খুব চমৎকার।", date: "2026-06-12" }
    ],
    featuresBn: ["১০০% কম্বড কটন প্রিমিয়াম ফেব্রিক", "নিখুঁত ডাবল স্টিচ ফিনিশিং", "রঙ এবং কাপড়ের টেক্সচার গ্যারান্টি", "সেমি-ফরমাল ও ক্যাজুয়াল উভয় স্টাইলে উপযোগী"],
    featuresEn: ["100% Premium Combed Cotton", "Exquisite Double-Stitch tailoring", "Premium color fastness guaranteed", "Versatile for both office & weekend styling"],
    inStock: true
  },
  {
    id: "tshirt-01",
    nameBn: "প্রিমিয়াম পিক কটন পোলো শার্ট (জলপাই সবুজ)",
    nameEn: "Premium Pique Cotton Polo Shirt (Olive Green)",
    category: "tshirt",
    categoryBn: "পোলো ও টি-শার্ট",
    price: 1250,
    originalPrice: 1600,
    image: "/images/jolpi_polo.webp",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600"
    ],
    descriptionBn: "আমাদের সিগনেচার পিক কটন পোলো শার্ট। হেভিওয়েট কটন ফেব্রিক এবং ইউনিক কলার ডিটেইল আপনাকে দেবে আভিজাত্যপূর্ণ ক্যাজুয়াল লুক। জিম, ট্র্যাভেল বা বিকেলের আড্ডায় সেরা সঙ্গী।",
    descriptionEn: "Our classic pique cotton polo shirt. Crafted with premium heavyweight mesh pique, it offers structured shape and supreme cooling feel. Great for sports, travel or meetings.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive Green", hex: "#3f4931" },
      { name: "Ash Black", hex: "#1f2937" },
      { name: "Snow White", hex: "#f9fafb" }
    ],
    tags: ["Essential", "Hot Seller"],
    rating: 4.8,
    reviews: [
      { id: "rev-6", userName: "রাসেল আহমেদ", rating: 5, comment: "কলারটা খুব দারুণ, কুঁকড়ে যায় না। কাপড়টা ভারী অথচ পরলে গরম লাগে না।", date: "2026-06-24" }
    ],
    featuresBn: ["২৩০ GSM প্রিমিয়াম ডাবল-পিক ম্যাট কটন", "কালার ও শ্রিংকেজ সম্পূর্ণ গ্যারান্টিড", "স্টাইলিশ ২-বাটন স্লিক প্লাকেট", "হাতের অংশে কমফোর্টেবল রিবড কাফ"],
    featuresEn: ["230 GSM Premium Double-Pique Cotton", "Anti-shrink & anti-fade tested", "Sleek 2-button placket design", "Premium ribbed cuffs"],
    inStock: true
  },
  {
    id: "tshirt-02",
    nameBn: "ওভারসাইজড প্রিমিয়াম হেভিওয়েট টি-শার্ট (জেট ব্ল্যাক)",
    nameEn: "Oversized Premium Heavyweight T-Shirt (Jet Black)",
    category: "tshirt",
    categoryBn: "পোলো ও টি-শার্ট",
    price: 850,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600"
    ],
    descriptionBn: "স্ট্রিট-স্টাইল লাভারদের জন্য প্রিমিয়াম ঢিলেঢালা ওভারসাইজড ব্ল্যাক টি-শার্ট। ২৫০ জিএসএম কটন ফেব্রিক দিয়ে তৈরি যা দেখতে অত্যন্ত ট্রেন্ডি এবং অত্যন্ত আরামদায়ক।",
    descriptionEn: "The essential streetwear item. Crafted from high-density 250 GSM premium cotton, this relaxed drop-shoulder oversized tee is a symbol of youthful fashion and pure comfort.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Jet Black", hex: "#000000" },
      { name: "Sand Beige", hex: "#d7ccc8" }
    ],
    tags: ["Streetwear", "New Arrival"],
    rating: 4.5,
    reviews: [
      { id: "rev-7", userName: "নাবিদ আনজুম", rating: 5, comment: "ড্রপ শোল্ডার লুক টা অস্থির লাগছে। খুবই ভারী কাপড়, কোয়ালিটি এক কথায় ফাটাফাটি।", date: "2026-06-25" }
    ],
    featuresBn: ["২৫০ GSM ১০০% অরগানিক কটন", "ট্রেন্ডি ড্রপ-শোল্ডার রিল্যাক্সড ফিট", "স্ট্রং ডাবল-নিডেল সেলাই", "সিল্কি সফট সিলিকন ওয়াশ ফিনিশিং"],
    featuresEn: ["250 GSM 100% Organic Cotton", "Trendy drop-shoulder relaxed fit", "Durable double-needle stitched hem", "Silky soft silicon washed finishing"],
    inStock: true
  },
  {
    id: "formal-01",
    nameBn: "রয়্যাল ইতালিয়ান টু-পিস ব্লেজার স্যুট (নেভি ব্লু)",
    nameEn: "Royal Italian Two-Piece Blazer Suit (Navy Blue)",
    category: "formal",
    categoryBn: "ফরমাল স্যুট ও ব্লেজার",
    price: 8500,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600"
    ],
    descriptionBn: "যেকোনো কর্পোরেট মিটিং, বিয়ে বা অফিসিয়াল গালা ইভেন্টে আপনার ব্যক্তিত্বকে অন্য উচ্চতায় নিয়ে যাবে এই টু-পিস রয়্যাল ব্লেজার স্যুট। ইতালিয়ান প্যাটার্ন কাটিং এবং প্রিমিয়াম ইনার লাইনিং সহ তৈরি।",
    descriptionEn: "Elevate your executive charisma in any boardroom meeting or wedding gala. Handcrafted with authentic Italian styling, utilizing state-of-the-art shoulder pads and breathable internal satin lining.",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Royal Navy", hex: "#1e3a8a" },
      { name: "Charcoal Black", hex: "#111827" }
    ],
    tags: ["Premium Collection", "Executive Choice"],
    rating: 4.9,
    reviews: [
      { id: "rev-8", userName: "আরাফাত রহমান", rating: 5, comment: "বিয়ের জন্য স্যুট টা কিনেছিলাম। ট্রেইলারিং কোয়ালিটি অত্যন্ত নিখুঁত। অনেক কমপ্লিমেন্ট পেয়েছি।", date: "2026-06-05" }
    ],
    featuresBn: ["টু-পিস কমপ্লিট সেট (ব্লেজার ও ট্রাউজার্স)", "প্রিমিয়াম ইতালিয়ান ভিসকস-উল ব্লেন্ড", "সিল্কি লাইটওয়েট স্যাচিন ইনার লাইনিং", "নিখুঁত স্লিম ফিট স্ট্রাকচার্ড শোল্ডারস"],
    featuresEn: ["Two-piece set (Blazer and matching trousers)", "Premium Italian Viscose-Wool Blend", "Breathable satin inner lining", "Precision-engineered structured slim-fit silhouette"],
    inStock: true
  },
  {
    id: "formal-02",
    nameBn: "মডার্ন ক্যাজুয়াল স্লিম-ফিট ব্লেজার (সান টেক্সচার)",
    nameEn: "Modern Casual Slim-Fit Blazer (Tan)",
    category: "formal",
    categoryBn: "ফরমাল স্যুট ও ব্লেজার",
    price: 4500,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600"
    ],
    descriptionBn: "স্টাইলিশ সেমি-ফরমাল গেটআপের জন্য পারফেক্ট এই কটন ক্যাজুয়াল ব্লেজার। ডেনিম বা গ্যাবার্ডিন প্যান্ট এবং টি-শার্টের ওপর এটি পরলে এক মুহূর্তে লুক বদলে যায়।",
    descriptionEn: "Instantly upgrade your attire. Wear this lightweight unstructured casual blazer over a plain solid tee and chinos for the ultimate smart-casual look.",
    sizes: ["38", "40", "42"],
    colors: [
      { name: "Tan / Camel", hex: "#b45309" },
      { name: "Slate Grey", hex: "#6b7280" }
    ],
    tags: ["Smart Casual", "Winter Wear"],
    rating: 4.7,
    reviews: [
      { id: "rev-9", userName: "ইফতেখারুল আমিন", rating: 4, comment: "ক্যাজুয়াল পরার জন্য অসাধারণ ব্লেজার। হালকা শীত বা এয়ার কন্ডিশনড অফিসে পরতে ভালো লাগে।", date: "2026-06-14" }
    ],
    featuresBn: ["আরামদায়ক ব্রেথেবল সফট কটন ফেব্রিক", "নচ ল্যাপেল এবং স্টাইলিশ প্যাচ পকেটস", "হালকা ওজনের আনস্ট্রাকচার্ড শোল্ডার", "টি-শার্ট ও ডেনিমের সাথে মানানসই"],
    featuresEn: ["Premium Soft Cotton Blend Fabric", "Classic notch lapels and elegant patch pockets", "Lightweight unstructured natural shoulder look", "Great with t-shirts and denim trousers"],
    inStock: true
  },
  {
    id: "pant-01",
    nameBn: "অভিজাত স্লিম-ফিট গ্যাবার্ডিন চিনোস (অলিভ)",
    nameEn: "Premium Slim-Fit Gabardine Chinos (Olive)",
    category: "pant",
    categoryBn: "প্যান্ট ও জিন্স",
    price: 1450,
    originalPrice: 1950,
    image: "/images/Slim-FitGabardineChinos(Olive).jpg",
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600"
    ],
    descriptionBn: "দৈনন্দিন অফিস কিংবা ভ্রমণের জন্য সেরা স্টাইলিশ গ্যাবার্ডিন চিনোস। এতে সামান্য স্ট্রেচ ফেব্রিক দেওয়া আছে যা দীর্ঘক্ষণ পরে থাকলেও আপনাকে দেবে সর্বোচ্চ স্বাচ্ছন্দ্য।",
    descriptionEn: "Designed for premium modern living. These slim-cut chinos are fabricated from high-grade stretch gabardine, ensuring high-flex mobility for active commutes.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Olive Green", hex: "#3f4931" },
      { name: "Khaki Tan", hex: "#c2b280" },
      { name: "Midnight Black", hex: "#1f2937" }
    ],
    tags: ["Stretchable", "Regular Wear"],
    rating: 4.8,
    reviews: [
      { id: "rev-10", userName: "সৈয়দ আদনান", rating: 5, comment: "প্যান্টের ফেব্রিক এবং সেলাই অসাধারণ। একটু স্ট্রেচ হওয়ায় চলাফেরা করতে খুব কমফোর্টেবল।", date: "2026-06-21" }
    ],
    featuresBn: ["৯৮% কটন এবং ২% স্প্যান্ডেক্স স্ট্রেচ", "অভিজাত মেটাল জিপার এবং বোতাম", "স্লিম-ফিট ট্যাপার্ড বডি কাটিং", "সহজে ধোয়া যায় এবং ইস্ত্রি করা সহজ"],
    featuresEn: ["98% Cotton, 2% Spandex Stretch Blend", "Premium metal zipper and button closure", "Sleek tapered slim fit outline", "Easy wash & quick-iron finish"],
    inStock: true
  },
  {
    id: "pant-02",
    nameBn: "প্রিমিয়াম স্ট্রেচ ব্লু ডেনিম জিন্স প্যান্ট",
    nameEn: "Premium Stretch Blue Denim Jeans",
    category: "pant",
    categoryBn: "প্যান্ট ও জিন্স",
    price: 1750,
    originalPrice: 2200,
    image: "/images/BlueDenimJeans.webp",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600"
    ],
    descriptionBn: "অরিজিনাল হেভি ডেনিম সুতা দিয়ে বোনা স্টাইলিশ জিন্স। এর গর্জিয়াস ওয়াশ এবং স্লিম ফিটিং ডেনিম প্রেমীদের জন্য একটি আবশ্যক সংগ্রহ। টেকসই এবং আরামদায়ক কম্বিনেশন।",
    descriptionEn: "Authentic heavy-duty denim weave. Beautiful vintage-indigo distressed washing paired with soft flex-stretch provides durability without feeling restrictive.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Indigo Blue", hex: "#1e3a8a" },
      { name: "Classic Black", hex: "#000000" }
    ],
    tags: ["Heavy Denim", "Classic Wash"],
    rating: 4.6,
    reviews: [
      { id: "rev-11", userName: "রাকিব হাসান", rating: 5, comment: "এই দামে এত ভালো ডেনিম আশা করিনি। ওয়াশ লুকটা খুব গর্জিয়াস এবং আধুনিক।", date: "2026-06-25" }
    ],
    featuresBn: ["১২.৫ Oz অরিজিনাল টুইল ডেনিম", "সফ্ট-স্ট্রেচ ফ্লেক্সিবল মুভমেন্ট", "গর্জিয়াস ওয়াশ ও স্ক্র্যাচ লেভেলিং", "ব্র্যান্ডেড মেটাল রিভেট ও জিপার"],
    featuresEn: ["12.5 Oz Premium Twill Denim", "Comfortable soft-stretch flex", "Distressed vintage indigo wash detailing", "High-grade metal zipper and rivets"],
    inStock: true
  },
  {
    id: "shoe-01",
    nameBn: "হাতে তৈরি জেনুইন লেদার পেনি লোফার্স (হানি ব্রাউন)",
    nameEn: "Handcrafted Genuine Leather Penny Loafers",
    category: "shoe",
    categoryBn: "প্রিমিয়াম জুতো",
    price: 3850,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600"
    ],
    descriptionBn: "অভিজাত রুচির পরিচয় দিতে আসল চামড়ার তৈরি পেনি লোফার্স। পাঞ্জাবি, চিনোস বা ক্যাজুয়াল ব্লেজারের সাথে দারুণ কম্বিনেশন তৈরি করে। এর ইনসোল অত্যন্ত নরম যা হাঁটার সময় পায়ে ব্যথা হতে দেয় না।",
    descriptionEn: "Crafted for the classy gentleman. Made with 100% full-grain authentic leather. Perfect with Panjabis, chinos, or linen suits, featuring an ortholite foam cushioned insole for premium foot comfort.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Honey Brown", hex: "#9a3412" },
      { name: "Classic Black", hex: "#1f2937" }
    ],
    tags: ["100% Leather", "Classy Choice"],
    rating: 4.9,
    reviews: [
      { id: "rev-12", userName: "মেহেদী হাসান", rating: 5, comment: "লোফারটা পায়ে দিয়ে খুব আরাম পেয়েছি। ফিনিশিং এবং লেদারের কোয়ালিটি অনেক দামি জুতোকেও হার মানাবে।", date: "2026-06-23" }
    ],
    featuresBn: ["১০০% জেনুইন ফুল-গ্রেইন এক্সপোর্ট লেদার", "নরম কুশন যুক্ত মেমোরি ফোম ইনসোল", "নন-স্লিপ গ্রিপ ডুরো-রাবার সোল", "পাঞ্জাবি ও ক্যাজুয়াল স্যুটের জন্য মানানসই"],
    featuresEn: ["100% Genuine Full-grain Export Leather", "Orthotic memory-foam padded insole", "Non-slip grip Duro-rubber outsole", "Versatile pairing with Traditional and Western Wear"],
    inStock: true
  },
  {
    id: "shoe-02",
    nameBn: "প্রিমিয়াম ইতালিয়ান চামড়ার অক্সফোর্ড শুজ (ব্ল্যাক)",
    nameEn: "Premium Italian Leather Oxford Shoes",
    category: "shoe",
    categoryBn: "প্রিমিয়াম জুতো",
    price: 4950,
    originalPrice: 6500,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600"
    ],
    descriptionBn: "পারফেক্ট অফিসিয়াল কর্পোরেট লুকের জন্য ঐতিহ্যবাহী অক্সফোর্ড ডিজাইন শুজ। ইতালিয়ান প্রিমিয়াম শাইন লেদার দিয়ে তৈরি, যা ফর্মাল স্যুট ব্লেজারের সাথে রাজকীয় লুক এনে দেয়।",
    descriptionEn: "The absolute standard of formality. Our genuine shiny glazed Oxford features clean-cut closed lacing and double stitching, representing high corporate success.",
    sizes: ["40", "41", "42", "43"],
    colors: [
      { name: "Patent Black", hex: "#000000" },
      { name: "Dark Walnut", hex: "#3b2314" }
    ],
    tags: ["Formal Luxury", "Premium Match"],
    rating: 4.8,
    reviews: [
      { id: "rev-13", userName: "ডাঃ তানিম", rating: 5, comment: "খুব সুন্দর গ্লেজ এবং ফিনিশিং। স্যুট পরার জন্য একদম পারফেক্ট ফরমাল শু।", date: "2026-06-19" }
    ],
    featuresBn: ["প্রিমিয়াম গ্লেজড কাফস্কিন লেদার", "হ্যান্ড ক্রাফটেড ট্র্যাডিশনাল অক্সফোর্ড লেইসিং", "দীর্ঘস্থায়ী ডাবল-স্টিচড ওয়েল্ট সোল", "নিখুঁত রাজকীয় লাস্ট কাটিং ফিট"],
    featuresEn: ["Premium Glazed Calfskin Leather", "Handcrafted traditional closed Oxford lacing", "Highly durable double-stitched welt sole", "Sleek majestic silhouette shape"],
    inStock: true
  },
  {
    id: "accessory-01",
    nameBn: "ক্রোনো গোল্ড মিনিমালিস্ট লাক্সারি ঘড়ি",
    nameEn: "Chrono Gold Minimalist Luxury Watch",
    category: "accessory",
    categoryBn: "বেল্ট, ওয়ালেট ও ঘড়ি",
    price: 2950,
    originalPrice: 3800,
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600"
    ],
    descriptionBn: "সবসময় ক্লাসি এবং আকর্ষণীয় লুকের জন্য আমাদের মিনিমাল ক্রোনোগ্রাফ ঘড়ি। লেদার স্ট্র্যাপ এবং স্ক্র্যাচ-প্রুফ গ্লাস আপনার আভিজাত্যকে ধরে রাখবে দীর্ঘকাল।",
    descriptionEn: "Sleek and highly distinctive. This gold-accented minimalist chronograph wrist watch features a genuine calf-leather strap and water-resistant casing to complete your daily styling.",
    sizes: ["Standard One Size"],
    colors: [
      { name: "Gold Brown", hex: "#b45309" },
      { name: "Black Silver", hex: "#9ca3af" }
    ],
    tags: ["Sophisticated", "Gift Choice"],
    rating: 4.7,
    reviews: [
      { id: "rev-14", userName: "আহনাফ তানজিল", rating: 5, comment: "উপহার দেয়ার জন্য নিয়েছিলাম। ঘড়িটার লুক দারুণ লাক্সারিয়াস। মেহমান পছন্দ করছে খুব।", date: "2026-06-25" }
    ],
    featuresBn: ["জাপানি কোয়ার্টজ ক্রোনোগ্রাফ মুভমেন্ট", "প্রিমিয়াম ৩০ মিটার ওয়াটার রেজিস্ট্যান্স", "আসল লেদার বেল্ট এবং গোল্ড ডায়াল", "স্ক্র্যাচ ও শক প্রতিরোধী মিনারেল গ্লাস"],
    featuresEn: ["Japanese Quartz Chronograph Movement", "Water-resistant casing (up to 30m)", "Genuine calf-leather strap with premium gold dial", "Scratch & shock resistant mineral glass face"],
    inStock: true
  },
  {
    id: "accessory-02",
    nameBn: "১০০% লেদার বেল্ট ও কার্ড হোল্ডার গিফট সেট",
    nameEn: "100% Genuine Leather Belt & Card Holder Set",
    category: "accessory",
    categoryBn: "বেল্ট, ওয়ালেট ও ঘড়ি",
    price: 1850,
    originalPrice: 2400,
    image: "/images/Belt&CardHolderSet.jpg",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600"
    ],
    descriptionBn: "১০০% আসল লেদার দিয়ে তৈরি ট্র্যাডিশনাল বেল্ট এবং একটি মিনিমালিস্ট আরএফআইডি প্রটেক্টেড কার্ড হোল্ডার ওয়ালেট কম্বো। উপহার দেওয়ার জন্য একটি চমৎকার প্যাকেজ।",
    descriptionEn: "The ultimate personal statement or gift bundle. Crafted with 100% authentic cow-hide leather, this kit features an adjustable automatic buckle belt and a sleek RFID-blocking card wallet.",
    sizes: ["32-44 adjustable"],
    colors: [
      { name: "Chocolate Dark", hex: "#451a03" },
      { name: "Classic Onyx Black", hex: "#000000" }
    ],
    tags: ["Gift Combo", "Pure Leather"],
    rating: 4.8,
    reviews: [
      { id: "rev-15", userName: "জুনায়েদ কবির", rating: 4, comment: "বেল্টটা বেশ মোটা এবং ওয়ালেটটা স্লিম পকেটে রাখলে ফুলে থাকে না। জেনুইন লেদার স্মেল আছে।", date: "2026-06-16" }
    ],
    featuresBn: ["১০০% পিওর ফুল-গ্রেইন এক্সপোর্ট লেদার", "অটোমেটিক স্ক্র্যাচ-প্রতিরোধী ব্রাশড মেটাল বাকল", "আরএফআইডি প্রোটেকশনযুক্ত স্লিম কার্ড হোল্ডার", "প্রিমিয়াম ব্র্যান্ডিং বক্স প্যাকেজিং"],
    featuresEn: ["100% Pure cow-hide export quality leather", "Automatic scratch-resistant brushed metal buckle", "RFID-blocking ultra-slim card-holder", "Arrives in an elegant premium magnetic gift box"],
    inStock: true
  },
  {
    id: "panjabi-03",
    nameBn: "অভিজাত জ্যাকার্ড সুতি শেরওয়ানি পাঞ্জাবি (রয়্যাল হোয়াইট)",
    nameEn: "Royal White Jacquard Cotton Sherwani Panjabi",
    category: "panjabi",
    categoryBn: "পাঞ্জাবি ও পায়জামা",
    price: 3850,
    originalPrice: 4500,
    image: "/images/SherwaniPanjabi.jpg",
    images: [
      "https://images.unsplash.com/photo-1597983073492-bc24018b3791?q=80&w=600"
    ],
    descriptionBn: "অনন্য জ্যাকার্ড উইভিং ডিজাইনে বোনা রয়্যাল হোয়াইট পাঞ্জাবি। উৎসব বা বড় জমকালো অনুষ্ঠানে আপনার ব্যক্তিত্ব ফুটিয়ে তুলতে এর জুড়ি নেই।",
    descriptionEn: "Exquisite royal white Panjabi in detailed premium jacquard weave. Designed to capture pure Bengali high-society aesthetics for major celebrations.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Ivory White", hex: "#fafaf9" }
    ],
    tags: ["Premium Weave", "Royal Elite"],
    rating: 4.9,
    reviews: [
      { id: "rev-16", userName: "সাজিদ মাহমুদ", rating: 5, comment: "জ্যাকার্ডের কাজটা খুবই সুন্দর ও গর্জিয়াস। রয়্যাল গেটআপ দেয় একদম!", date: "2026-06-25" }
    ],
    featuresBn: ["১০০% প্রিমিয়াম সুতি জ্যাকার্ড উইভিং", "শেরওয়ানি কলার কাট ও ফিনিশিং", "অভিজাত ডিজাইনার হ্যান্ডমেইড মেটাল বোতাম", "অত্যন্ত আরামদায়ক প্রিমিয়াম স্লিম ফিট"],
    featuresEn: ["100% Premium Jacquard Woven Cotton", "Elite Sherwani Neckline Cut", "Artisanal Designer Handmade Buttons", "Breathable & Highly Soft Custom Slim Fit"],
    inStock: true
  },
  {
    id: "shirt-03",
    nameBn: "প্রিমিয়াম ক্যাজুয়াল সাটিন শার্ট (অলিভ গ্রিন)",
    nameEn: "Premium Casual Satin Cotton Shirt (Olive Green)",
    category: "shirt",
    categoryBn: "ক্যাজুয়াল শার্ট",
    price: 1950,
    originalPrice: 2600,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600"
    ],
    descriptionBn: "হালকা চকচকে সাটিন ফিনিশের সাথে আরামদায়ক কটন কাপড়ের নিখুঁত ব্লেন্ড। যেকোনো গেট-টুগেদার বা ডিনার পার্টিতে আপনার লুকে আভিজাত্য এনে দেবে।",
    descriptionEn: "A subtle lustrous satin weave mixed with natural long-staple cotton fibers. Imparts a luxurious feel and a highly polished look for parties and corporate evenings.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Olive Green", hex: "#3b4d3b" },
      { name: "Onyx Black", hex: "#171717" }
    ],
    tags: ["Satin Soft", "Luxury Wear"],
    rating: 4.8,
    reviews: [
      { id: "rev-17", userName: "ইমতিয়াজ সাজিদ", rating: 5, comment: "শার্টের সাইন এবং ম্যাটেরিয়াল খুবই প্রিমিয়াম। পার্টিতে পরার জন্য বেস্ট চয়েস।", date: "2026-06-24" }
    ],
    featuresBn: ["৭৫% কটন ও ২৫% সাটিন পলিশ ফাইবার", "স্মার্ট স্প্রেড প্রিমিয়াম সেমি-স্টিফ কলার", "চমৎকার ও আরামদায়ক ট্রেইলারিং কাট", "সহজে কুঁচকে যায় না ও ধোয়া সহজ"],
    featuresEn: ["75% long-staple cotton, 25% silky satin fiber", "Semi-stiff spread collar styling", "Slim fit contour pattern lines", "Anti-wrinkle soft-touch breathable finish"],
    inStock: true
  },
  {
    id: "tshirt-03",
    nameBn: "সিগনেচার লাক্সারি এম্ব্রয়ডারি পোলো (রয়্যাল নেভি)",
    nameEn: "Signature Luxury Embroidered Polo (Royal Navy)",
    category: "tshirt",
    categoryBn: "পোলো ও টি-শার্ট",
    price: 1350,
    originalPrice: 1800,
    image: "/images/Polo.webp",
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600"
    ],
    descriptionBn: "আপনার রোজকার আড্ডায় এক অনন্য আভিজাত্য যোগ করতে আমাদের এই প্রিমিয়াম পোলো। এতে রয়েছে নিখুঁত সিগনেচার এমব্রয়ডারি লোগো এবং কন্ট্রাস্ট কলার।",
    descriptionEn: "Upgrade your casual look with this exquisite double pique polo shirt. Features a beautifully detailed chest crown embroidery and premium colorfast contrast trim cuffs.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Navy", hex: "#1e3a8a" },
      { name: "Crimson Red", hex: "#991b1b" }
    ],
    tags: ["Signature Crew", "Luxe Casual"],
    rating: 4.7,
    reviews: [
      { id: "rev-18", userName: "আরিফ বিল্লাহ", rating: 5, comment: "নেভির সাথে বর্ডারের কম্বিনেশনটা খুব চমৎকার। ব্র্যান্ড লোগো এমব্রয়ডারি করা যা হাই কোয়ালিটি দেখায়।", date: "2026-06-26" }
    ],
    featuresBn: ["২৪০ GSM প্রিমিয়াম পিক কটন ম্যাশ", "বুকের অংশে সিগনেচার গোল্ডেন ক্রাউন এমব্রয়ডারি", "কন্ট্রাস্ট টিপিং কলার ও স্লিভ ডিজাইন", "ওয়াশের পরেও কলারের শেপ নষ্ট হয় না"],
    featuresEn: ["240 GSM Premium Mesh Pique Cotton", "Exquisite gold-crown chest embroidery logo", "Contrast colored collar and ribbed cuffs tipping", "Double-stitch hem for shape preservation over washing"],
    inStock: true
  },
  {
    id: "shoe-03",
    nameBn: "হ্যান্ডক্রাফটেড জেনুইন লেদার চেলসি বুটস (ট্যান)",
    nameEn: "Handcrafted Genuine Leather Chelsea Boots (Tan)",
    category: "shoe",
    categoryBn: "প্রিমিয়াম জুতো",
    price: 5450,
    originalPrice: 6990,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600"
    ],
    descriptionBn: "১০০% প্রিমিয়াম কাউহাইড চামড়া দিয়ে তৈরি আমাদের এই সিগনেচার চেলসি বুট। ডেনিম বা চিনোসের সাথে আপনার লুকে আনবে দারুণ সাহসিকতা ও আভিজাত্য।",
    descriptionEn: "Ultimate winter and festive footwear statement. Made of 100% genuine export quality oiled cow-hide leather, featuring heavy elastic side panels and durable Goodyear welted construction.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Rich Tan Brown", hex: "#b45309" },
      { name: "Onyx Black", hex: "#111827" }
    ],
    tags: ["Boots Masterpiece", "Heavy-Duty Leather"],
    rating: 4.9,
    reviews: [
      { id: "rev-19", userName: "রাসেল জামান", rating: 5, comment: "লেদারের গন্ধ এবং কোয়ালিটি অসম্ভব প্রিমিয়াম। ডেনিমের সাথে পরলে সেই লেভেলের লুক দেয়!", date: "2026-06-22" }
    ],
    featuresBn: ["১০০% ফুল-গ্রেইন কাউহাইড চামড়া", "নরম কুশন মেমোরি ফোম ইনসোল", "ফ্লেক্সিবল হেভি-ডিউটি ডাবল সাইড ইলাস্টিক", "নন-স্লিপ গ্রিপ রাবার টো ট্র্যাকশন"],
    featuresEn: ["100% Full-grain cow-hide leather shell", "Comfortable memory-foam supportive insole", "Durable dual-sided heavy elastic pull-tabs", "Robust anti-slip ribbed rubber outsole traction"],
    inStock: true
  },
  {
    id: "accessory-03",
    nameBn: "রয়্যাল ক্রোনোগ্রাফ মেটাল রিস্ট ওয়াচ (মেটালিক সিলভার)",
    nameEn: "Royal Chronograph Metallic Watch (Silver Blue)",
    category: "accessory",
    categoryBn: "বেল্ট, ওয়ালেট ও ঘড়ি",
    price: 3450,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600"
    ],
    descriptionBn: "ভারী মেটালিক চেইন এবং গর্জিয়াস ওশান ব্লু ডায়ালের নিখুঁত মেলবন্ধন। এই ক্রোনোগ্রাফ ঘড়ি আপনার যেকোনো ফরমাল ও ক্যাজুয়াল পোশাকের সাথে দেবে রাজকীয় অনুভূতি।",
    descriptionEn: "A heavy-duty solid stainless steel chain watch featuring a gorgeous ocean-blue chronograph dial. Enhances your formal meetings with elite class and precise timing accuracy.",
    sizes: ["Adjustable Steel Link"],
    colors: [
      { name: "Metallic Blue", hex: "#1e40af" }
    ],
    tags: ["Luxury Metal", "Collector's Item"],
    rating: 4.8,
    reviews: [
      { id: "rev-20", userName: "সৈয়দ তাহমিদ", rating: 5, comment: "চেইনের ওজন এবং মেটালের গ্লেজ অনেক দামি ব্র্যান্ডের ঘড়ির মতো। হাতমোছা ব্লু ওয়াটার রেজিস্ট্যান্সও ভালো কাজ করে।", date: "2026-06-25" }
    ],
    featuresBn: ["১০০% প্রিমিয়াম মরিচাহীন স্টেইনলেস স্টিল বডি", "রয়্যাল ওশান ব্লু ড্যাশিং ডায়াল ডিজাইন", "৫০ মিটার ওয়াটার রেজিস্ট্যান্স রেটিং", "দীর্ঘস্থায়ী ডাবল-লকিং বাটারফ্লাই ক্ল্যাস্প"],
    featuresEn: ["100% Solid corrosion-resistant stainless steel band", "Royal ocean-blue dashboard dial look", "Up to 50m water-resistance certified", "Highly secure double-locking butterfly clasp"],
    inStock: true
  },
  {
    id: "panjabi-04",
    nameBn: "প্রিমিয়াম কাবলি সেট (রয়েল ব্ল্যাক)",
    nameEn: "Premium Kabli Suit Set (Royal Black)",
    category: "panjabi",
    categoryBn: "পাঞ্জাবি ও পায়জামা",
    price: 4250,
    originalPrice: 5200,
    image: "images/KabliSuitSet.webp",
    images: [
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=600"
    ],
    descriptionBn: "অত্যন্ত সূক্ষ্ম সুতি কাপড়ে তৈরি রাজকীয় ব্ল্যাক কাবলি সেট। ঐতিহ্যবাহী ডিজাইনের সাথে আধুনিক ফিটিংয়ের দারুণ সমন্বয় যা যেকোনো অনুষ্ঠানে আপনাকে আলাদা পরিচয় দেবে।",
    descriptionEn: "Masterfully tailored black Kabli suit set crafted from premium long-staple cotton. Boasts a sharp design layout mixed with supreme comfort for high-class events.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Midnight Black", hex: "#0a0a0a" }
    ],
    tags: ["Royal Kabli", "Luxury Suit"],
    rating: 4.9,
    reviews: [
      { id: "rev-21", userName: "তানভীর আহমেদ", rating: 5, comment: "কাপড় খুবই আরামদায়ক আর ফিটিংটা তো জাস্ট অসাধারণ ছিল। রেকমেন্ডেড!", date: "2026-06-25" }
    ],
    featuresBn: ["১০০% ব্রিদেবল প্রিমিয়াম রিচ কটন", "পাজামা সহ সম্পূর্ণ কাবলি সেট", "ক্ল্যাসিক ডাবল ব্রেস্টেড বুক পকেট ডিজাইন", "অত্যন্ত স্টাইলিশ এবং রাজকীয় কাট"],
    featuresEn: ["100% Premium breathable long-staple cotton", "Comes as a full set including matching trousers", "Classic double breast pocket premium layout", "Royal and clean sophisticated tailoring fit"],
    inStock: true
  },
  {
    id: "shirt-04",
    nameBn: "সিগনেচার ফাইন স্ট্রাইপড ফরমাল শার্ট",
    nameEn: "Signature Fine Striped Formal Shirt",
    category: "shirt",
    categoryBn: "ক্যাজুয়াল শার্ট",
    price: 2150,
    originalPrice: 2800,
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=600"
    ],
    descriptionBn: "অভিজাত স্ট্রাইপড ফরমাল শার্ট। আপনার অফিসিয়াল প্রেজেন্টেশন কিংবা গুরুত্বপূর্ণ কর্পোরেট মিটিংয়ে ব্যক্তিত্ব ফুটিয়ে তুলতে এটি আদর্শ চয়েস।",
    descriptionEn: "An executive-class striped shirt woven with high-thread-count Egyptian cotton. Offers a clean, crisp drape that stays wrinkle-free all day.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Ice Blue / Navy Stripe", hex: "#bae6fd" }
    ],
    tags: ["Executive", "Formal Elite"],
    rating: 4.8,
    reviews: [
      { id: "rev-22", userName: "শাফায়াত করিম", rating: 5, comment: "খুবই চমৎকার ফেব্রিক এবং স্টিচিং। কর্পোরেট লুকের জন্য বেস্ট শার্ট।", date: "2026-06-24" }
    ],
    featuresBn: ["১০০% সুপিমা কটন থ্রেড কাউন্ট ১২০", "এন্টি-ক্রিজ কুঁচকানো প্রতিরোধক ফিনিশ", "স্মার্ট কলার ও রিইনফোর্সড বোতাম কাফ", "চমৎকার প্রিমিয়াম ফিটিং ও সেলাই"],
    featuresEn: ["120-thread-count ultra soft Supima cotton", "High-performance wrinkle-resistant finish", "Stiff classic collar and reinforced button cuffs", "Sleek tailors cut with seamless stitch design"],
    inStock: true
  },
  {
    id: "tshirt-04",
    nameBn: "প্রিমিয়াম সুপিমা কটন টি-শার্ট (মিন্ট গ্রিন)",
    nameEn: "Premium Supima Cotton Tee (Mint Green)",
    category: "tshirt",
    categoryBn: "পোলো ও টি-শার্ট",
    price: 950,
    originalPrice: 1300,
    image: "/images/CottonTeeMintGreen.webp",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600"
    ],
    descriptionBn: "স্পর্শে রেশমের মতো নরম এবং টেকসই সুপিমা কটন টি-শার্ট। আমাদের এই মিন্ট গ্রিন কালারটি গ্রীষ্মের তপ্ত দিনে আপনাকে রাখবে শীতল এবং আড়ম্বরহীন স্টাইলিশ।",
    descriptionEn: "Luxuriously soft and extremely durable Supima cotton crewneck. Our unique mint green hue keeps you cool, fresh, and effortlessly handsome.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mint Green", hex: "#a7f3d0" },
      { name: "Heather Grey", hex: "#9ca3af" }
    ],
    tags: ["Supima Cotton", "Daily Luxury"],
    rating: 4.7,
    reviews: [
      { id: "rev-23", userName: "হাসিবুল হাসান", rating: 5, comment: "সাধারণ সুতির চেয়ে অনেক বেশি সফট আর হালকা। গরমে পরার জন্য বেস্ট কোয়ালিটি।", date: "2026-06-26" }
    ],
    featuresBn: ["১০০% অরিজিনাল সার্টিফাইড সুপিমা কটন", "১৮০ GSM অতিরিক্ত নরম ও সিল্কি টেক্সচার", "অর্গানিক কালার যা সহজে বিবর্ণ হয় না", "ডাবল-সুই সিম হেমিং ও লাস্টিং শেপ"],
    featuresEn: ["100% Certified American Supima Cotton", "180 GSM highly silky and smooth texture", "Eco-friendly non-fade reactive dye colors", "Reinforced double-needle hem for shape retention"],
    inStock: true
  },
  {
    id: "shoe-04",
    nameBn: "অরিজিনাল লেদার মঙ্ক স্ট্র্যাপ শু (বারগান্ডি)",
    nameEn: "Original Leather Double Monk Strap (Burgundy)",
    category: "shoe",
    categoryBn: "প্রিমিয়াম জুতো",
    price: 5950,
    originalPrice: 7500,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600"
    ],
    descriptionBn: "উচ্চমানের বারগান্ডি কালারড প্রিমিয়াম কাউহাইড লেদার ও মেটাল বাকলের ডাবল মঙ্ক স্ট্র্যাপ শু। আপনার প্রতিটি পদক্ষেপকে করে তুলবে রাজকীয় ও আত্মবিশ্বাসী।",
    descriptionEn: "Timeless sophistication in rich burgundy oiled cow leather. Detailed with hand-burnished details and double brass buckle monk straps to make every step executive.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Burgundy Wine", hex: "#4c0519" }
    ],
    tags: ["Double Monk", "Italian Class"],
    rating: 4.9,
    reviews: [
      { id: "rev-24", userName: "ফরহাদুল ইসলাম", rating: 5, comment: "পাদুকার ফিনিশিং অসাধারণ, আর বারগান্ডি কালারটা আসলেই খুবই গর্জিয়াস।", date: "2026-06-23" }
    ],
    featuresBn: ["১০০% ফুল-গ্রেইন আমদানিকৃত চামড়া", "হাতে পালিশ করা ক্লাসিক বারগান্ডি শাইন", "নরম অর্থোপেডিক প্রিমিয়াম লেদার কুশন", "দীর্ঘস্থায়ী থ্রেড স্টিচড সোল গ্রিপ"],
    featuresEn: ["100% Imported premium full-grain leather", "Hand-burnished Italian burgundy finish", "Soft orthopedic memory cushioning inside", "Stitch-reinforced high traction hybrid outsole"],
    inStock: true
  },
  {
    id: "accessory-04",
    nameBn: "রয়্যাল ফুল-গ্রেইন লেদার বাইফোল্ড ওয়ালেট",
    nameEn: "Royal Full-Grain Leather Bifold Wallet",
    category: "accessory",
    categoryBn: "বেল্ট, ওয়ালেট ও ঘড়ি",
    price: 1850,
    originalPrice: 2400,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600"
    ],
    descriptionBn: "প্রিমিয়াম ফুল-গ্রেইন চামড়া এবং RFID প্রোটেকশনযুক্ত স্লিম বাইফোল্ড ওয়ালেট। এতে সব প্রয়োজনীয় কার্ড এবং টাকা থাকবে সম্পূর্ণ নিরাপদ ও পরিপাটি।",
    descriptionEn: "Minimalist layout with maximum security. Engineered from premium top-grain oiled leather with embedded RFID shielding to secure your essential credit cards.",
    sizes: ["Sleek Bifold Size"],
    colors: [
      { name: "Vintage Brown", hex: "#78350f" },
      { name: "Classic Charcoal Black", hex: "#1c1917" }
    ],
    tags: ["Full Grain", "RFID Secure"],
    rating: 4.8,
    reviews: [
      { id: "rev-25", userName: "আহনাফ সাকিব", rating: 5, comment: "খুবই স্লিম ওয়ালেট, পকেটে ভারী লাগে না। লেদারের কোয়ালিটি অনেক জোস!", date: "2026-06-25" }
    ],
    featuresBn: ["১০০% অরিজিনাল ভেজিটেবল ট্যানড চামড়া", "নিরাপদ RFID ব্লকিং মেটাল প্রোটেকশন", "৮টি ডেডিকেটেড কার্ড স্লট ও ক্যাশ হোল্ডার", "প্রিমিয়াম ব্র্যান্ডেড প্রেজেন্টেশন গিফট বক্স"],
    featuresEn: ["100% Genuine vegetable-tanned top-grain leather", "Advanced RFID-blocking security mesh built-in", "8 dedicated card chambers and cash compartment", "Arrives in an elegant brand-stamped craft box"],
    inStock: true
  },
  {
    id: "shoe-05",
    nameBn: "প্রিমিয়াম ক্যাজুয়াল হোয়াইট স্নিকার্স",
    nameEn: "Premium Minimalist White Sneakers",
    category: "shoe",
    categoryBn: "প্রিমিয়াম জুতো",
    price: 3250,
    originalPrice: 4200,
    image: "/images/WhiteSneakers.jpg",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600"
    ],
    descriptionBn: "আধুনিক মিনিমালিস্ট ডিজাইনের অল-হোয়াইট প্রিমিয়াম স্নিকার্স। চিনোস, কার্গো কিংবা ডেনিম সবকিছুর সাথেই চমৎকার মানানসই ক্যাজুয়াল জুতো।",
    descriptionEn: "Sleek all-white minimalist sneakers for everyday supreme comfort. Blends seamlessly with your street style, casual denims, or tailored cotton chinos.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Pure Arctic White", hex: "#f8fafc" }
    ],
    tags: ["Minimalist Sneaker", "Everyday Wear"],
    rating: 4.8,
    reviews: [
      { id: "rev-26", userName: "মাহিন চৌধুরী", rating: 5, comment: "সহজে ময়লা পরিষ্কার করা যায় এবং সোলের ফ্লেক্সিবিলিটি দারুণ। দেখতে চমৎকার লাগে।", date: "2026-06-21" }
    ],
    featuresBn: ["উচ্চমানের ডাস্ট-প্রুফ সিন্থেটিক লেদার আর্ট", "নরম কুশনযুক্ত রানিং ইনসোল পলিউরেথেন", "ফ্লেক্সিবল ও দীর্ঘস্থায়ী ভলকানাইজড রাবার সোল", "স্মার্ট ও মার্জিত সেলাইয়ের কারুকাজ"],
    featuresEn: ["Dust-and-water resistant premium vegan leather upper", "Comfortable soft-cushioned running poly-foam insole", "Super-flexible durable vulcanized rubber grip outsole", "Refined minimalism with perfect micro-stitches"],
    inStock: true
  }
];

export const COUPONS = [
  { code: "BHADRA10", discountPercent: 10, label: "১০% ফ্ল্যাট ডিসকাউন্ট" },
  { code: "EIDMUBARAK", discountPercent: 15, label: "ঈদ স্পেশাল ১৫% ডিসকাউন্ট" },
  { code: "FREE99", discountPercent: 5, label: "৫% বাড়তি ছাড়" }
];

export const BANGLADESH_DISTRICTS = [
  "Dhaka (ঢাকা)", "Chittagong (চট্টগ্রাম)", "Sylhet (সিলেট)", "Rajshahi (রাজশাহী)",
  "Khulna (খুলনা)", "Barisal (বরিশাল)", "Rangpur (রংপুর)", "Mymensingh (ময়মনসিংহ)",
  "Comilla (কুমিল্লা)", "Gazipur (গাজীপুর)", "Narayanganj (নারায়ণগঞ্জ)",
  "Brahmanbaria (ব্রাহ্মণবাড়িয়া)", "Chandpur (চাঁদপুর)", "Feni (ফেনী)", 
  "Noakhali (নোয়াখালী)", "Cox's Bazar (কক্সবাজার)", "Jessore (যশোর)", "Bogra (বগুড়া)"
];
