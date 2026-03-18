import { FilterCheckboxDataType } from "@/types/shop"
import { action, makeObservable, observable } from "mobx"


class ShopFilterStore {
    brand: FilterCheckboxDataType[] = []
    shippingLocations: FilterCheckboxDataType[] = []
    constructor() {
        makeObservable(this, {
            brand: observable,
          
            setBrand: action,
            removeBrand: action,
            shippingLocations: observable,
            setShippingLocations: action,

        })
    }

    setBrand(data: FilterCheckboxDataType) {
        if (this.brand.some((b) => b.value === data.value)) {
            this.brand = this.brand.filter((b) => b.value != data.value)

        } else {
            this.brand = [...this.brand, { ...data }]
        }
     
    }

    removeBrand(value: string) {
        this.brand = this.brand.filter((b) => b.value != value)
      
    }

    setShippingLocations(data: FilterCheckboxDataType) {
        if (this.shippingLocations.some((s) => s.value === data.value)) {
            this.shippingLocations = this.shippingLocations.filter((s) => s.value != data.value)
        } else {

            this.shippingLocations = [...this.shippingLocations, { ...data }]
        }

    }

    removeShippingLocations(value: string) {
        this.shippingLocations = this.shippingLocations.filter((b) => b.value != value)
       
    }
}

export const shopFilterStore = new ShopFilterStore()