export const getPriceDiscountValue = (value: number, discount: number) => {
    return value - (value * (1/discount))
}