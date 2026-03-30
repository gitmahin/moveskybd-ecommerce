import { action, makeObservable, observable } from "mobx";


type TotalPurchaseAbleItemsType = {
    items_count?: number
    total_price?: number
    updated_price?: number
    discount?: number,
    units?: number
}

type TotalAddedItemsToBuyType = {
    id: string
    price: number
    quantity: number
    unit: number
}

class ProductStore {
    totalPurchaseAbleItems: TotalPurchaseAbleItemsType = {}

    totalAddedItemsToBuy: TotalAddedItemsToBuyType[] = []

    constructor() {
        makeObservable(this, {
            totalPurchaseAbleItems: observable,
            setTotalPurchaseAbleItems: action,
            totalAddedItemsToBuy: observable,
            setTotalAddedItemsToBuy: action,
            clearStates: action
        })
    }

    setTotalPurchaseAbleItems(data: TotalPurchaseAbleItemsType) {
        Object.assign(this.totalPurchaseAbleItems, data)
    }

    setTotalAddedItemsToBuy(data: TotalAddedItemsToBuyType) {
        const index = this.totalAddedItemsToBuy.findIndex(item => item.id === data.id);

        if (index !== -1) {
            const newItems = [...this.totalAddedItemsToBuy];
            newItems.splice(index, 1, data); 
            this.totalAddedItemsToBuy = newItems;
        } else {
            this.totalAddedItemsToBuy = [...this.totalAddedItemsToBuy, data];
        }
    }

    clearStates() {
        this.totalPurchaseAbleItems = {}
    }
}

export const productStore = new ProductStore()