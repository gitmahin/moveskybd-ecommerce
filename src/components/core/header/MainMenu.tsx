import React from "react";
import Link from "next/link";
import { MenuItemType } from "@/types/menus";
const HEADER_MENU_CONSTANTS: MenuItemType[] = [
  { label: "Categories", slug: "categories" },
  { label: "New Arrivals", slug: "new-arrivals" },
  { label: "Popular", slug: "popular" },
  { label: "Smart Living", slug: "smart-living" },
  { label: "Accessories", slug: "accessories" },
];
export const MainMenu = () => {
  return (
    <div className="flex justify-center w-fit items-center gap-5 font-medium text-sm">
      {HEADER_MENU_CONSTANTS.map((item, i) => {
        return (
          <Link
            href={item.slug}
            key={i}
            className="text-neutral-600 hover:text-black "
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
