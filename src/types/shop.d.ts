export type FilterCheckboxDataType = {label: string, value: string} & ColorFamilyType
export type ColorFamilyType = {
  label: string;
  value: string;
  hex?: string;
};

export type ShopProductType = {
  id: number;
  title: string;
  brand: string;
  image: string;
  regular_price: number;
  discount: number;
  badge: BadgeType;
  rating: number;
  category: string;
  color: string;
  rating_count?: number;
  shipped_from: string;
};