export const getPriceDiscountValue = (value: number, discount: number) => {
    return (value - Math.floor(value * (discount/100)))
}