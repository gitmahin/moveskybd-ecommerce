export type BadgeType = "HOT" | "NEW" | "SALE" | null;

export type ProductType = {
  id: number;
  title: string;
  brand?: string;
  image?: string;
  regular_price: number;
  discount?: number; // percentage
  badge?: BadgeType;
};

export type CategoryType = {
  id: number;
  label: string;
  description: string;
  icon: LucideIcon;
};
