import { type URLSearchParams } from "url";

/**
 * Extracts specific keys from URLSearchParams and returns them as a plain object.
 * 
 * This utility takes an array of keys and a URLSearchParams object, iterates through the keys,
 * and constructs an object where each key maps to its corresponding value in the search parameters.
 * If a key is not found, it defaults to an empty string.
 * 
 * @param values - An array of strings representing the keys to extract from the search parameters.
 * @param searchParams - The URLSearchParams object to extract values from.
 * @returns An object containing the requested keys and their associated values.
 * 
 * @example
 * const params = new URLSearchParams("?name=John&age=30");
 * const data = getObjectFromSearchParams(["name", "city"], params);
 * // returns { name: "John", city: "" }
 */
export const getObjectFromSearchParams = (
  values: string[],
  searchParams: URLSearchParams
) => {
  const payloadArray: string[][] = [];
  values.map((item) => {
    payloadArray.push([item, searchParams.get(item) ?? ""]);
  });
  return Object.fromEntries(payloadArray);
};
