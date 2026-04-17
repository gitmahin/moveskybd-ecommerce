import { action, makeObservable, observable } from "mobx";

/**
 * Represents the summary of items ready for purchase.
 */
type TotalPurchaseAbleItemsType = {
  items_count?: number;
  total_price?: number;
  updated_price?: number;
  discount?: number;
  units?: number;
};

/**
 * Represents an individual item added to the checkout list.
 */
type TotalAddedItemsToBuyType = {
  id: string;
  price: number;
  quantity: number;
  unit: number;
};

class ProductStore {
  /** Summary data for the current purchase selection. */
  totalPurchaseAbleItems: TotalPurchaseAbleItemsType = {};

  /**
   * List of specific items (variants/quantities) added for purchase.
   */
  totalAddedItemsToBuy: TotalAddedItemsToBuyType[] = [];

  constructor() {
    makeObservable(this, {
      totalPurchaseAbleItems: observable,
      setTotalPurchaseAbleItems: action,
      totalAddedItemsToBuy: observable,
      setTotalAddedItemsToBuy: action,
      clearStates: action,
    });
  }

  /**
   * Updates the purchase summary data.
   * @param data - Partial or complete purchase summary object.
   */
  setTotalPurchaseAbleItems(data: TotalPurchaseAbleItemsType) {
    Object.assign(this.totalPurchaseAbleItems, data);
  }

  /**
   * Adds an item to the purchase list or updates it if it already exists.
   * 
   * Matches items based on the `id` property.
   * @param data - The item data to add or update.
   */
  setTotalAddedItemsToBuy(data: TotalAddedItemsToBuyType) {
    const index = this.totalAddedItemsToBuy.findIndex(
      (item) => item.id === data.id
    );

    if (index !== -1) {
      const newItems = [...this.totalAddedItemsToBuy];
      newItems.splice(index, 1, data);
      this.totalAddedItemsToBuy = newItems;
    } else {
      this.totalAddedItemsToBuy = [...this.totalAddedItemsToBuy, data];
    }
  }

  /**
   * Resets the purchase summary state.
   */
  clearStates() {
    this.totalPurchaseAbleItems = {};
  }
}

export const productStore = new ProductStore();
