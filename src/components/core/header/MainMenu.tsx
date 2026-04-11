"use client";
import React from "react";
import Link from "next/link";
import { MenuItemType } from "@/types/menus";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui";

const HEADER_MENU_CONSTANTS: MenuItemType[] = [
  { label: "New Arrivals", slug: "new-arrivals" },
  { label: "Popular", slug: "popular" },
  { label: "Smart Living", slug: "smart-living" },
  { label: "Accessories", slug: "accessories" },
];

const CATEGORIES = [
  {
    title: "Bags",
    value: "bags",
    list: [
      { label: "Purse", value: "purse" },
      { label: "Bags", value: "bag" },
      { label: "Briefcases", value: "briefcase" },
      { label: "Money Clip", value: "money-clip" },
      { label: "Wallet", value: "wallet" },
      { label: "Backpack", value: "backpack" },
      { label: "Travel Bag", value: "travel-bag" },
      { label: "Card Holder", value: "card-holder" },
      { label: "Laptop Bag", value: "laptop-bag" },
      { label: "Suitcase", value: "suitcase" },
      { label: "Waist Bag", value: "waist-bag" },
      { label: "Hand Bag", value: "hand-bag" },
      { label: "Gift Box", value: "gift-box" },
    ],
  },
  {
    title: "Jewelry",
    value: "jewelry",
    list: [
      { label: "Bracelet", value: "bracelet" },
      { label: "Earrings", value: "earrings" },
      { label: "Jewelry Case", value: "jewelry-case" },
      { label: "Necklace", value: "necklace" },
      { label: "Bridal Jewelry", value: "bridal-jewelry" },
      { label: "Crown", value: "crown" },
      { label: "Pendant", value: "pendant" },
      { label: "Bangle", value: "bangle" },
      { label: "Ring", value: "ring" },
      { label: "Anklet", value: "anklet" },
      { label: "Tiara", value: "tiara" },
      { label: "Belly Chain", value: "belly-chain" },
      { label: "Jewelry Box", value: "jewelry-box" },
      { label: "Pin Brooch", value: "pin-brooch" },
      { label: "Fashion Jewelry", value: "fashion-jewelry" },
    ],
  },
  {
    title: "Shoes",
    value: "shoes",
    list: [
      { label: "Men Shoes", value: "men-shoes" },
      { label: "Men Boot", value: "men-boot" },
      { label: "Ladies Shoes", value: "ladies-shoes" },
      { label: "Ladies Boot", value: "ladies-boot" },
      { label: "High Heels", value: "high-heels" },
      { label: "Formal Shoes", value: "formal-shoes" },
      { label: "Sandals", value: "sandals" },
      { label: "Running Shoes", value: "running-shoes" },
      { label: "Casual Shoes", value: "casual-shoes" },
      { label: "Loafers", value: "loafers" },
      { label: "Sports Shoe", value: "sports-shoe" },
      { label: "Baby Shoes", value: "baby-shoes" },
      { label: "Low Top Shoe", value: "low-top-shoe" },
      { label: "Rain Boot", value: "rain-boot" },
      { label: "Football Shoes", value: "football-shoes" },
      { label: "Slippers", value: "slippers" },
    ],
  },
  {
    title: "Beauty",
    value: "beauty-products",
    list: [
      { label: "Eyeshadow", value: "eyeshadow" },
      { label: "Eyeliner", value: "eyeliner" },
      { label: "Face Powder", value: "face-cream" },
      { label: "Makeup Remover", value: "makeup-remover" },
      { label: "Eye Brushes", value: "eye-brushes" },
      { label: "Hair Removal", value: "hair-removal" },
      { label: "Mirror", value: "mirror" },
      { label: "Teeth Whitening", value: "teeth-whitening" },
      { label: "Nail Polish", value: "nail-polish" },
      { label: "Lip Gloss", value: "lip-gloss" },
      { label: "Lip Liner", value: "lip-liner" },
      { label: "Lipstick", value: "lipstick" },
      { label: "Anti Hair Loss", value: "anti-hair-loss" },
      { label: "Hairspray", value: "hairspray" },
      { label: "Hair Dryer", value: "hair-dryer" },
      { label: "Hair Dye", value: "hair-dye" },
      { label: "Hair Oil", value: "hair-oil" },
      { label: "Shower Gel", value: "shower-gel" },
      { label: "Candles", value: "candles" },
      { label: "Lotion", value: "lotion" },
      { label: "Perfume", value: "perfume" },
      { label: "Perfume Set", value: "perfume-set" },
      { label: "Deodorant", value: "deodorant" },
      { label: "Soap", value: "soap" },
      { label: "Body Wash", value: "body-wash" },
      { label: "Hair Conditioner", value: "hair-conditioner" },
      { label: "Toner", value: "toner" },
      { label: "Facial Mask", value: "facial-mask" },
      { label: "Face Moisturizer", value: "face-moisturizer" },
      { label: "Face Serum", value: "face-serum" },
      { label: "Sunscreen", value: "sunscreen" },
    ],
  },
  {
    title: "Mens Wear",
    value: "clothing-men",
    list: [
      { label: "Casual Pants For Men", value: "casual-pants-men" },
      { label: "Mens Jeans Pant", value: "jeans-men" },
      { label: "Men Suit", value: "suit-men" },
      { label: "Leather Jackets For Men", value: "leather-jacket-men" },
      { label: "Trouser", value: "trousers-men" },
      { label: "Shirt", value: "shirt-men" },
      { label: "Shorts", value: "shorts-men" },
      { label: "Tie Clip", value: "tie-clip" },
      { label: "Mens Sweater", value: "mens-sweater" },
      { label: "Boxers", value: "underwear-boxer" },
      { label: "Mens Hat", value: "hat-men" },
      { label: "Leather Gloves", value: "leather-gloves" },
      { label: "Men Sweatpants", value: "sweatpants-men" },
      { label: "Socks", value: "socks-men" },
      { label: "Tie", value: "tie-men" },
      { label: "Bow Ties", value: "bow-ties" },
      { label: "Gloves", value: "gloves" },
    ],
  },
  {
    title: "Women Wear",
    value: "womens-clothing",
    list: [
      { label: "Hoodies & Sweatshirts", value: "hoodies-women" },
      { label: "Womens Suits Blazers", value: "suits-women" },
      { label: "Bodysuits", value: "bodysuits-women" },
      { label: "Coats Jackets", value: "jacket-women" },
      { label: "Swimwear", value: "swimwear-women" },
      { label: "Bikini Set", value: "bikini-set" },
      { label: "Skirt", value: "skirt" },
      { label: "Womens Jeans", value: "womens-jeans" },
      { label: "Wedding Dresses", value: "wedding-dresses" },
      { label: "Prom Dresses", value: "prom-dresses" },
      { label: "Evening Dresses", value: "evening-dresses" },
      { label: "Cosplay Costumes", value: "cosplay-costumes" },
      { label: "Bra", value: "bra" },
      { label: "Panties", value: "panties" },
      { label: "Women Socks", value: "women-socks" },
      { label: "Bucket Hats", value: "bucket-hat" },
      { label: "Belts", value: "belt-women" },
    ],
  },
  {
    title: "Eyewear",
    value: "eyewear",
    list: [
      { label: "Sunglass", value: "sunglass" },
      { label: "Women Sunglass", value: "women-sunglasses" },
      { label: "Baby Sunglasses", value: "baby-sunglasses" },
      { label: "Party Sunglass", value: "party-sunglass" },
      { label: "Goggles", value: "goggles" },
      { label: "Reading Glasses", value: "reading-glasses" },
    ],
  },
  {
    title: "Baby Items",
    value: "baby-items",
    list: [
      { label: "Baby Bottle", value: "baby-bottle" },
      { label: "Diapers", value: "diapers" },
      { label: "Potty & Washing", value: "potty-&-washing" },
      { label: "Water Toys", value: "water-toys" },
      { label: "Remote Control Toys", value: "remote-control-toys" },
      { label: "Baby Gift Set", value: "baby-gift-set" },
      { label: "Baby Dress", value: "baby-dress" },
      { label: "Baby Socks", value: "baby-socks" },
      { label: "Baby Swimsuit", value: "baby-swimsuit" },
      { label: "Baby Jacket", value: "baby-jacket" },
      { label: "Baby Skirt", value: "baby-skirt" },
      { label: "Baby Sweater", value: "baby-sweater" },
      { label: "Baby Shoes", value: "baby-shoes" },
      { label: "Baby Sports Shoes", value: "baby-sports-shoes" },
    ],
  },
  {
    title: "Watches",
    value: "watches",
    list: [
      { label: "Watch", value: "watch" },
      { label: "Womens Watch", value: "women-watches" },
      { label: "Mens Watches", value: "mens-watches" },
      { label: "Smart Watch", value: "smart-watch" },
      { label: "Gshock", value: "gshock" },
      { label: "Apple Watch", value: "apple-watch" },
      { label: "Fit Band", value: "fit-band" },
    ],
  },
  {
    title: "Gadgets",
    value: "gadgets",
    list: [
      { label: "Xiaomi", value: "xiaomi" },
      { label: "Apple", value: "apple" },
      { label: "Huawei", value: "huawei" },
      { label: "Realme", value: "realme" },
      { label: "One Plus", value: "one-plus" },
      { label: "Samsung", value: "samsung" },
      { label: "Google", value: "google" },
      { label: "Vivo", value: "vivo-smartphone" },
      { label: "Nokia", value: "nokia" },
      { label: "LG", value: "lg" },
      { label: "Tecno", value: "tecno" },
      { label: "HTC", value: "htc" },
      { label: "Motorola", value: "motorola" },
      { label: "Asus", value: "asus" },
    ],
  },
];

export const MainMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <NavigationMenuLink>
                  {" "}
                  <p>Categories</p>
                </NavigationMenuLink>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]" align="start">
                {Object.entries(CATEGORIES).map(([key, value], i) => {
                  return (
                    <DropdownMenuGroup key={i}>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {value.title}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-[300px]">
                            {value.list.map((item, j) => {
                              return (
                                <DropdownMenuItem key={j} className="w-full">
                                  <Link
                                    href={`/shop/?group-category=${value.value}&category=${item.value}`}
                                    className="w-full"
                                  >
                                    {item.label}
                                  </Link>
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {HEADER_MENU_CONSTANTS.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink>
                <Link href={item.slug}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
