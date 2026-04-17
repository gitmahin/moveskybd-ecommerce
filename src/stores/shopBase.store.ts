import { action, makeObservable, observable } from "mobx";

class ShopBaseStore {
  /**
   * The total count of products available in the current view or category.
   */
  numberOfProducts: number = 0;
  constructor() {
    makeObservable(this, {
      numberOfProducts: observable,
      setNumberOfProducts: action,
    });
  }

  /**
   * Updates the total number of products.
   * @param value - The new product count.
   */
  setNumberOfProducts(value: number) {
    this.numberOfProducts = value;
  }
}

export const shopBaseStore = new ShopBaseStore();
