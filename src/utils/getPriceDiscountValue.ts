export const getPriceDiscountValue = (value: number, discount: number) => {
    return Math.floor(value - (value * (1/discount)))
}