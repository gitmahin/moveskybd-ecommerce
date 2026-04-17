import { ColorFamilyType, FilterCheckboxDataType } from "@/types/shop";
import { action, makeObservable, observable } from "mobx";

type PriceRange = number[];

/**
 * Store for managing product filtering state in the shop.
 * 
 * Handles state for brands, shipping locations, color families, and price ranges,
 * providing actions to update or reset these filters.
 */
class ShopFilterStore {
  /** Selected brands for filtering. */
  brand: FilterCheckboxDataType[] = [];
  /** Selected shipping locations for filtering. */
  shippingLocations: FilterCheckboxDataType[] = [];
  /** Selected color families for filtering. */
  colorFamily: FilterCheckboxDataType[] = [];
  /** The maximum possible price for the price range slider. */
  maxPrice: number = 20000;
  /** The current selected [min, max] price range. */
  priceRange: PriceRange = [0, this.maxPrice];

  constructor() {
    makeObservable(this, {
      brand: observable,
      setBrand: action,
      removeBrand: action,
      shippingLocations: observable,
      setShippingLocations: action,
      colorFamily: observable,
      setColorFamily: action,
      priceRange: observable,
      setPriceRange: action,
      setDefaultPriceRange: action,
      clearAllFilters: action,
    });
  }

  /**
   * Toggles a brand in the filter list.
   * @param data - The brand filter data to add or remove.
   */
  setBrand(data: FilterCheckboxDataType) {
    if (this.brand.some((b) => b.value === data.value)) {
      this.brand = this.brand.filter((b) => b.value != data.value);
      return;
    }
    this.brand = [...this.brand, { ...data }];
  }

  /**
   * Removes a brand from the filter list by its value.
   * @param value - The unique value of the brand to remove.
   */
  removeBrand(value: string) {
    this.brand = this.brand.filter((b) => b.value != value);
  }

  /**
   * Toggles a shipping location in the filter list.
   * @param data - The location filter data to add or remove.
   */
  setShippingLocations(data: FilterCheckboxDataType) {
    if (this.shippingLocations.some((s) => s.value === data.value)) {
      this.shippingLocations = this.shippingLocations.filter(
        (s) => s.value != data.value
      );
      return;
    }

    this.shippingLocations = [...this.shippingLocations, { ...data }];
  }

  /**
   * Removes a shipping location from the filter list by its value.
   * @param value - The unique value of the location to remove.
   */
  removeShippingLocations(value: string) {
    this.shippingLocations = this.shippingLocations.filter(
      (b) => b.value != value
    );
  }

  /**
   * Toggles a color family in the filter list.
   * @param colorData - The color filter data to add or remove.
   */
  setColorFamily(colorData: FilterCheckboxDataType) {
    if (this.colorFamily.some((c) => c.value === colorData.value)) {
      this.colorFamily = this.colorFamily.filter(
        (c) => c.value !== colorData.value
      );
      return;
    }

    this.colorFamily = [...this.colorFamily, { ...colorData }];
  }

  /**
   * Removes a color family from the filter list by its value.
   * @param value - The unique value of the color to remove.
   */
  removeColorFamily(value: string) {
    this.colorFamily = this.colorFamily.filter((c) => c.value !== value);
  }

  /**
   * Sets the entire price range array.
   * @param range - An array containing [min, max] values.
   */
  setPriceRange(range: number[]) {
    this.priceRange = range;
  }

  /**
   * Updates a specific boundary (min or max) of the price range.
   * @param value - The new price value.
   * @param index - The index to update (0 for min, 1 for max).
   */
  setPriceRangeByIndex(value: number, index: number) {
    const updated = [...this.priceRange];
    updated[index] = value;
    this.priceRange = updated;
  }

  /**
   * Resets the price range to the default [0, maxPrice].
   */
  setDefaultPriceRange() {
    this.priceRange = [0, this.maxPrice];
  }

  /**
   * Resets all filters (brands, colors, locations, and price) to their initial states.
   */
  clearAllFilters() {
    this.brand = [];
    this.colorFamily = [];
    this.setDefaultPriceRange();
    this.shippingLocations = [];
  }
}

export const shopFilterStore = new ShopFilterStore();
