/**
 * Calculates the discounted price of a value.
 *
 * @param value - The original price.
 * @param discount - The discount percentage (0–100).
 *
 * @returns The discounted price, floored to the nearest integer.
 *
 * @example
 * getPriceDiscountValue(1000, 20); // 800
 * getPriceDiscountValue(199, 15);  // 169
 */
export const getPriceDiscountValue = (value: number, discount: number) => {
  return value - Math.floor(value * (discount / 100));
};
