import { action, makeObservable, observable } from "mobx";

class ShopBaseStore {
  numberOfProducts: number = 0;
  constructor() {
    makeObservable(this, {
      numberOfProducts: observable,
      setNumberOfProducts: action,
    });
  }

  setNumberOfProducts(value: number) {
    this.numberOfProducts = value;
  }
}

export const shopBaseStore = new ShopBaseStore();
