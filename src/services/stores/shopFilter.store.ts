import { ColorFamilyType, FilterCheckboxDataType } from "@/types/shop"
import { action, makeObservable, observable } from "mobx"

type PriceRange = number[]

class ShopFilterStore {
    brand: FilterCheckboxDataType[] = []
    shippingLocations: FilterCheckboxDataType[] = []
    colorFamily: FilterCheckboxDataType[] = []
    priceRange: PriceRange = [0, 20000]
    maxPrice: number = 20000;
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
            clearAllFilters: action

        })
    }

    setBrand(data: FilterCheckboxDataType) {
        if (this.brand.some((b) => b.value === data.value)) {
            this.brand = this.brand.filter((b) => b.value != data.value)
            return
        }
        this.brand = [...this.brand, { ...data }]


    }

    removeBrand(value: string) {
        this.brand = this.brand.filter((b) => b.value != value)

    }

    setShippingLocations(data: FilterCheckboxDataType) {
        if (this.shippingLocations.some((s) => s.value === data.value)) {
            this.shippingLocations = this.shippingLocations.filter((s) => s.value != data.value)
            return
        }

        this.shippingLocations = [...this.shippingLocations, { ...data }]


    }

    removeShippingLocations(value: string) {
        this.shippingLocations = this.shippingLocations.filter((b) => b.value != value)

    }

    setColorFamily(colorData: FilterCheckboxDataType) {
        if (this.colorFamily.some((c) => c.value === colorData.value)) {
            this.colorFamily = this.colorFamily.filter((c) => c.value !== colorData.value)
            return
        }

        this.colorFamily = [...this.colorFamily, { ...colorData }]
    }

    removeColorFamily(value: string) {
        this.colorFamily = this.colorFamily.filter((c) => c.value !== value)
    }

    setPriceRange(range: number[]) {
        this.priceRange = range
    }
    setPriceRangeByIndex(value: number, index: number) {
        this.priceRange[index] = value
    }
    setDefaultPriceRange() {
        this.priceRange = [0, this.maxPrice]
    }

    clearAllFilters() {
        this.brand = []
        this.colorFamily = []
        this.setDefaultPriceRange()
        this.shippingLocations = []
    }
}

export const shopFilterStore = new ShopFilterStore()