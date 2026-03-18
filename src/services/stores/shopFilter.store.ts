import { action, makeObservable, observable } from "mobx"
type BrandType = {
    label: string;
    value: string
}

class ShopFilterStore {
    brand: BrandType[] = []
    isFilterActive: boolean = false
    constructor() {
        makeObservable(this, {
            brand: observable,
            isFilterActive: observable,
            setBrand: action,
            removeBrand: action
        })
    }

    setBrand(brand: BrandType) {

        this.brand = [...this.brand, { ...brand }]
        this.isFilterActive = this.brand.length > 0
    }

    removeBrand(value: string) {
        this.brand = this.brand.filter((b) => b.value != value)
        this.isFilterActive = this.brand.length > 0
    }
}

export const shopFilterStore = new ShopFilterStore()