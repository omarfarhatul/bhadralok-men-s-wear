export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  category: "panjabi" | "shirt" | "tshirt" | "formal" | "pant" | "shoe" | "accessory";
  categoryBn: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  descriptionBn: string;
  descriptionEn: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  tags: string[];
  rating: number;
  reviews: Review[];
  featuresBn: string[];
  featuresEn: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  district: string;
  paymentMethod: "bkash" | "nagad" | "cod" | "card";
  paymentStatus: "paid" | "pending";
  items: {
    productId: string;
    nameBn: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  statusTimeline: {
    status: "pending" | "confirmed" | "shipped" | "delivered";
    time: string;
    completed: boolean;
  }[];
}

export interface StylistPreferences {
  skinTone: string;
  occasion: string;
  preferredStyle: string;
  budget: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  district?: string;
  password?: string; // For mock registration persistence
}
