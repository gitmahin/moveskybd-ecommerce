import { LucideIcon } from "lucide-react";

export type MenuItemType = {
  label: string;
  slug: string;
};

export type IconButtonType = {
  icon: LucideIcon;
};

export type MenuWithIconType = {
  icon?: LucideIcon;
} & Partial<MenuItemType>;
