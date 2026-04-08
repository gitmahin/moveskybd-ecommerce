import { CategoryType, ProductType } from "@/types/product";
import {
  Watch,
  Headphones,
  BatteryCharging,
  Home,
  Keyboard,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const CATEGORIES: CategoryType[] = [
  {
    id: 1,
    label: "Smart Watches",
    description: "Wearable Tech",
    icon: Watch,
  },
  {
    id: 2,
    label: "Audio Gear",
    description: "Premium Sound",
    icon: Headphones,
  },
  {
    id: 3,
    label: "Power Banks",
    description: "Fast Charging",
    icon: BatteryCharging,
  },
  {
    id: 4,
    label: "Smart Home",
    description: "Connected Living",
    icon: Home,
  },
  {
    id: 5,
    label: "Peripherals",
    description: "PC Essentials",
    icon: Keyboard,
  },
  {
    id: 6,
    label: "Mobile Accs",
    description: "Cases & More",
    icon: Smartphone,
  },
];

export const NEW_ARRIVALS: ProductType[] = [
  {
    id: 5,
    title: "Nova RGB Mechanical Keyboard",
    brand: "Nova",
    image: "/products/na_1.jpg",
    regular_price: 129,
    discount: 0,
  },
  {
    id: 6,
    title: "Glide Precision Mouse",
    brand: "Glide",
    image: "/products/na_2.jpg",
    regular_price: 59,
    discount: 0,
  },
  {
    id: 7,
    title: "Lumina S24 Ultra",
    brand: "Lumina",
    image: "/products/na_3.jpg",
    regular_price: 1099,
    discount: 0,
  },
  {
    id: 8,
    title: "Aura Pods Elite",
    brand: "Aura",
    image: "/products/na_4.jpg",
    regular_price: 199,
    discount: 0,
  },
  {
    id: 9,
    title: "Steel Desk Phone Stand",
    brand: "Steel",
    image: "/products/na_5.jpg",
    regular_price: 35,
    discount: 0,
  },
];

export const PRODUCTS: ProductType[] = [
  {
    id: 1,
    title: "Ultra Retina X-1 Tablet",
    brand: "MoveSky Prime",
    image: "/products/fs_1.png",
    regular_price: 999,
    discount: 25,
    badge: "SALE",
  },
  {
    id: 2,
    title: "Pure Sound ANC Headphones",
    brand: "Acoustix",
    image: "/products/fs_2.png",
    regular_price: 399,
    discount: 25,
    badge: "HOT",
  },
  {
    id: 3,
    title: "Active Pro Series 5 Watch",
    brand: "Vitalis",
    image: "/products/fs_3.png",
    regular_price: 240,
    discount: 21,
    badge: null,
  },
  {
    id: 4,
    title: "Titan 20K PD Power Bank",
    brand: "VoltX",
    image: "/products/fs_4.png",
    regular_price: 79,
    discount: 38,
    badge: null,
  },
];
